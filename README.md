# Be-calander Backend

NestJS backend for the calendar/team workload app. This README is written as a quick map for future AI agents and maintainers.

## Stack

- NestJS 11 monorepo layout under `apps/` and `libs/`
- Sequelize + sequelize-typescript
- MySQL via `mysql2`
- JWT auth stored in an HTTPOnly cookie named `token`
- Global API prefix: `/api/v1`
- Global validation: `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })`

Because `forbidNonWhitelisted` is enabled, every request body property must exist in the matching DTO.

## Important Paths

- App entry: `apps/api/src/main.ts`
- Root module: `apps/api/src/api.module.ts`
- Feature modules: `apps/api/src/modules/*`
- Shared models/guards/decorators: `libs/common/src/*`
- Sequelize config: `sequelize.config.js`
- Migrations: `migrations/`
- Uploaded files: `uploads/`

## Environment

`sequelize.config.js` loads `.env.development` by default.

Common env vars:

```env
PORT=3100
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=...
DB_PASSWORD=...
DB_NAME=...
DB_DIALECT=mysql
JWT_SECRET=...
COOKIE_DOMAIN=
NODE_ENV=development
```

The frontend currently expects the API at `http://localhost:3100/api/v1`.

## Commands

```bash
npm install
npm run start:dev
npm run build
npm run migration:run
npm run migration:undo
```

Build output is generated under `dist/`; do not treat generated `dist/apps/api/main.js` changes as source changes.

## Auth And Guards

- Login: `POST /api/v1/auth/login`
- Logout: `POST /api/v1/auth/logout`
- Current user: `GET /api/v1/auth/me`
- `JwtAuthGuard` reads JWT from the HTTPOnly `token` cookie.
- `RolesGuard` uses `@Roles(...)`.
- Role values used in app logic are string values like `admin` and `user`.

## Core Models

Models live in `libs/common/src/models`.

- `User`: auth identity, has `role`, belongs to teams through `UserTeamRole`.
- `Team`: team container.
- `UserTeamRole`: join table between users, teams, and roles.
- `Calendar`: task/event record.
- `FileModel`: uploaded completion-report attachment metadata.

Calendar fields that matter most:

- `name`
- `type`: work location. Current values are `home` and `outside`.
- `start_time`, `end_time`
- `status`: derived from progress. Current values are `pending` and `completed`.
- `progress_percent`
- `estimate_hours`, `actual_hours`
- `user_id`: creator/owner
- `assigner_id`: assignee
- `team_id`
- `file_id`

## Calendar API

Controller: `apps/api/src/modules/calendars/calendars.controller.ts`
Service: `apps/api/src/modules/calendars/calendars.service.ts`

Endpoints:

```http
GET    /api/v1/calendars/admin
GET    /api/v1/calendars/user
GET    /api/v1/calendars/user?user_id={id}
GET    /api/v1/calendars/assignees
GET    /api/v1/calendars/workload?user_id={id}&week_start=YYYY-MM-DD
POST   /api/v1/calendars
PUT    /api/v1/calendars/:id
PATCH  /api/v1/calendars/:id/status
DELETE /api/v1/calendars/:id
```

Calendar filter behavior:

- `GET /calendars/admin`: admin-only, returns all calendars.
- `GET /calendars/user`: for user, returns current user's visible calendars. For admin, returns all calendars.
- `GET /calendars/user?user_id={id}`: returns calendars for that target user after checking the token user's permission.
- `admin` can view all target users.
- normal `user` can view self or users sharing at least one team.
- Unauthorized target access throws `ForbiddenException`.

Calendar creation/update rules:

- `CalendarDto` and `UpdateCalendarDto` must include every property FE sends.
- Non-admin creates calendars for themselves; service clears admin-only fields.
- Admin may set `team_id` and `assigner_id`.
- `status` is normalized from `progress_percent`: `100 -> completed`, otherwise `pending`.
- Completion attachments use `file_id`.

## Team API

Controller: `apps/api/src/modules/teams/teams.controller.ts`
Service: `apps/api/src/modules/teams/teams.service.ts`

Endpoints:

```http
POST   /api/v1/team/create
GET    /api/v1/team/getteams
GET    /api/v1/team/user-teams
POST   /api/v1/team/:teamId/members
DELETE /api/v1/team/:teamId/members/:userId
PATCH  /api/v1/team/:teamId/members/:userId/demote
```

`getteams` and `user-teams` currently both return teams for the current token user.

## Upload API

Endpoint:

```http
POST /api/v1/upload
```

- Requires JWT cookie.
- Field name: `file`
- Stored under `uploads/`.
- Current file filter accepts image extensions only: jpg, jpeg, png, gif.
- Returns `file_id`, `file_path`, and `file_url`.

## Migrations

Run migrations from `Be-calander`:

```bash
npm run migration:run
```

Current notable migrations:

- `00000000000000-baseline-init.js`: creates baseline tables.
- `20260416203000-add-file-and-calendar-relation.js`: adds file relation.
- `20260417065153-make-team-id-nullable.js`: makes `Calendars.team_id` nullable.
- `20260619090000-add-task-progress-and-hours-to-calendars.js`: adds workload fields.
- `20260707033000-normalize-calendar-work-location-values.js`: converts old priority values `low`, `normal`, `hight`, `high` in `Calendars.type` to work-location value `home`.

## Frontend Contract Notes

Frontend repository: `../calander`.

Calendar screen expects:

- `GET /calendars/admin` for admin "all people".
- `GET /calendars/user?user_id={id}` when selecting a specific person.
- `GET /calendars/user` for normal user default visibility.
- `GET /calendars/assignees` or team data to populate permitted people.

The UI label "Lam viec tai" maps to `Calendar.type`:

- `home`: work from home
- `outside`: work outside

## Common Gotchas

- If API says `property X should not exist`, add `X` to the DTO or stop FE from sending it.
- If admin "all people" only shows current user, check that FE calls `/calendars/admin`; BE also handles admin fallback on `/calendars/user`.
- Do not edit generated `dist/` files as source.
- Existing Vietnamese comments/text may appear mojibaked in some files; avoid unrelated copy churn.
