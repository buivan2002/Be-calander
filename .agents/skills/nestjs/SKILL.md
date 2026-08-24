---
name: NestJS Monorepo – Be-calander
description: >
  Project-specific behavioral guidelines for working on the Be-calander
  NestJS monorepo backend. Read this file before making any code changes.
---

# Be-calander — Agent Skill

## 1. Project Snapshot

| Item | Detail |
|---|---|
| Framework | **NestJS 11** (Monorepo via `nest-cli.json`) |
| Language | **TypeScript 5** — CommonJS, `ts-node` for scripts |
| ORM | **sequelize-typescript** + **sequelize-cli** for migrations |
| Database | **MySQL** (`mysql2` driver) |
| Auth | JWT (`@nestjs/jwt`, `passport-jwt`) + **argon2** password hashing |
| Runtime | Node.js 18 |
| Container | Docker + `docker-compose.prod.yml` |
| CI/CD | GitHub Actions → Docker Hub → VPS via SSH |
| Env Loading | `dotenv` in `main.ts` — **no** `ConfigModule`; read `process.env` directly |

---

## 2. Monorepo Layout

```
apps/api/src/
  main.ts                    # Bootstrap: global pipes, cookie-parser, dotenv
  modules/
    auth/                    # Login / register, JWT strategy
    todos/                   # Todo CRUD
    teams/                   # Team management + UserTeamRole
    calendars/               # Calendar scheduling + file uploads
    upload/                  # File upload controller

libs/common/src/
  database/                  # SequelizeModule config (reads .env)
  models/                    # ALL Sequelize models — only place for @Table entities
    user.model.ts
    team.model.ts
    user-team-role.model.ts  # Junction table: User ↔ Team (with role)
    role.model.ts
    calendar.model.ts
    file.model.ts
    todo.model.ts
  guards/
    jwt-auth.guard.ts        # Protects routes requiring a valid JWT
    jwt.strategy.ts          # Passport JWT strategy
    roles.guard.ts           # RBAC guard (reads @Roles() metadata)
  exceptions/
    global-exception.filter.ts
  decorator/
    get-user.decorator.ts    # @CurrentUser()
    roles.decorator.ts       # @Roles(RoleEnum.ADMIN, ...)
  enums/
    role.enum.ts             # RoleEnum { USER, ADMIN, MANAGER }
  index.ts                   # Barrel export for @app/common
```

### Hard Rules on Structure
- **New models → `libs/common/src/models/`** only. Never put `@Table` entities in `apps/`.
- **Shared utilities → `libs/common/src/`**, import via `@app/common`.
- **Business logic → `apps/api/src/modules/<domain>/`** (Controller + Service + DTO + Module).
- **Never** import from `apps/` inside `libs/`.

---

## 3. Request Lifecycle

```
HTTP Request
  → JwtAuthGuard (passport-jwt — validates Bearer token)
  → RolesGuard   (checks @Roles() decorator metadata against RoleEnum)
  → Controller   (thin: extract params, call Service)
  → Service      (fat: all business logic, DB queries via Sequelize model)
  → GlobalExceptionFilter (formats all errors to uniform JSON)
```

---

## 4. Auth & RBAC

- **Guard stack**: `JwtAuthGuard` (from `@app/common/guards`) + `RolesGuard`.
- **Decorators**: `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles(RoleEnum.ADMIN)`.
- **Current user**: `@CurrentUser()` from `@app/common/decorator`.
- **Roles**: `RoleEnum.USER | ADMIN | MANAGER` (defined in `libs/common/src/enums/role.enum.ts`).
- JWT secret from `process.env.JWT_SECRET`.

---

## 5. Database & Migrations

- **`sequelize.sync()` is DISABLED in production**. All schema changes must go through `migrations/`.
- Migration files: `YYYYMMDDHHMMSS-<name>.js`, config in `sequelize.config.js` + `.sequelizerc`.
- **Never edit** a migration already run in production — write a new one instead.
- CI/CD runs `sequelize db:migrate` on every deploy (idempotent).
- **Circular refs in models**: Use lazy thunks — `@BelongsToMany(() => User, ...)`.

### Migration commands
```bash
npm run migration:generate -- --name <what-changed>
npm run migration:run
npm run migration:undo
```

---

## 6. Environment Variables

| Variable | Used by |
|---|---|
| `PORT` | `main.ts` (default `3100`) |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DIALECT` | `database.module.ts` |
| `JWT_SECRET` | `jwt.strategy.ts` |
| `NODE_ENV` | Docker / CI/CD |

- Local dev: `.env.development`
- Production: `.env.production` (generated from GitHub Secrets in CI/CD — **never commit secrets**).

---

## 7. CI/CD Pipeline

Workflow: `.github/workflows/deploy-be.yml`

| Stage | What happens |
|---|---|
| `test-and-lint` | `npm ci` → lint → `tsc --noEmit` → `jest` |
| `build-and-push` | Docker Buildx multi-arch (`amd64`+`arm64`) → Docker Hub |
| `deploy` | SSH to VPS → write `.env` → pull image → DB up → **migrations** → compose up |
| `rollback` | Prints manual rollback instructions on failure |

- Image tagged by branch name (slashes → `-`). E.g. `convert/nestjs` → `convert-nestjs`.
- Backend container: **`calendar_api_prod`**
- DB container: **`calendar_db_prod`**
- Network: **`calendar_internal_network`** (external — must exist on VPS)
- Nginx reverse proxy — backend never exposes a host port.

---

## 8. Coding Conventions

- **Validation**: DTOs use `class-validator`. Global `ValidationPipe` in `main.ts` rejects bad input (HTTP 400).
- **Error responses**: Use `GlobalExceptionFilter`; do **not** manually format error JSON in controllers.
- **Module alias**: `@app/common` (configured in `tsconfig.json` and `jest.moduleNameMapper`).
- **No `console.log` in production code** — use proper logging if needed.
- **Passwords**: Always hash with `argon2`, never `bcrypt`.
- **Thin Controllers / Fat Services**: Controllers extract params and call service. All logic lives in the Service.

---

## 9. Adding a New Feature (Canonical Flow)

```
1. Define model in libs/common/src/models/  →  register in DatabaseModule
2. Generate migration: npm run migration:generate -- --name add-<feature>
3. Write migration UP/DOWN  →  verify: npm run migration:run locally
4. Create/update DTO in apps/api/src/modules/<domain>/dto/
5. Implement Service logic  →  unit test
6. Expose via Controller with Guards (@UseGuards, @Roles)
7. Export from libs/common/src/index.ts if needed elsewhere
```

---

## 10. Quick Commands

```bash
# Dev
npm run start:dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Test
npm run test

# Docker (prod)
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml logs -f backend
```