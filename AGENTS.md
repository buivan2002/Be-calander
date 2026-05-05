---
trigger: always_on
---

# Be-calander — Agent Rules

Strict behavioral rules that apply to every change in this repository.
Violating any of these rules requires explicit user confirmation before proceeding.

---

## R1 — Monorepo Boundaries

- **Models belong in `libs/common/src/models/`**. Never create `@Table` entities inside `apps/`.
- **Shared code belongs in `libs/common/src/`**. Import it only via `@app/common`.
- **Never import from `apps/` inside `libs/`**.
- Business logic (Service classes) lives under `apps/api/src/modules/<domain>/`.

## R2 — Database Migrations

- **`sequelize.sync()` must never be re-enabled in production**.
- Every schema change requires a new migration file under `migrations/`.
- Migration filenames follow: `YYYYMMDDHHMMSS-<description>.js`.
- **Never edit a migration that has already run in production** — write a new one.
- Destructive operations (DROP COLUMN, RENAME TABLE, data loss) must be called out explicitly and confirmed by the user before writing any file.

## R3 — Authentication & Security

- **Passwords must use argon2** — never bcrypt or plain hashing.
- **All protected routes must have `JwtAuthGuard`**. Do not leave endpoints unguarded unless explicitly requested.
- JWT secret is always read from `process.env.JWT_SECRET` — never hardcode it.
- **Never commit `.env` files containing real secrets** to version control.

## R4 — Environment Variables

- Environment is loaded via `dotenv` in `main.ts`. **Do not introduce `ConfigModule`** unless asked.
- Local: `.env.development`. Production: `.env.production` (injected by CI/CD from GitHub Secrets).
- Reading config → always `process.env.VAR_NAME`, no wrappers.

## R5 — Code Style

- **Thin Controllers**: Controllers only extract request data and call Service methods. No business logic in controllers.
- **Fat Services**: All DB queries, validation logic, and domain rules live in Service classes.
- Inputs **must** be validated through DTOs decorated with `class-validator`. The global `ValidationPipe` handles rejection.
- Error responses go through `GlobalExceptionFilter`. Do not manually format error JSON in controllers.
- No `console.log` left in production code paths.

## R6 — Surgical Changes Only

- Touch **only** what the task requires. Do not refactor adjacent code unless explicitly asked.
- No speculative abstractions — no extra layers, generic wrappers, or flexibility patterns without a concrete, immediate second use case.
- **Match existing module style**. Before writing a new module, read an existing one (e.g. `teams/`) and mirror its structure exactly.

## R7 — Surface Tradeoffs Before Acting

- If multiple valid implementation paths exist, briefly present them and state which one you are picking and why — before writing any code.
- If a task is ambiguous or could break existing behavior, stop and ask rather than assuming.

## R8 — CI/CD Awareness

- The deploy pipeline runs `sequelize db:migrate` automatically. Do not add manual DB sync steps.
- Docker image tagging uses the branch name (slashes replaced with `-`).
- The backend container must **not** expose a host port — traffic routes through `calendar_internal_network` via Nginx.

## R9 — Circular References in Sequelize Models

- Always use lazy thunk syntax for cross-model associations to avoid circular dependency errors:
  ```typescript
  @BelongsToMany(() => User, () => UserTeamRole)
  ```
  Never use direct class references in association decorators.

## R10 — RBAC

- Role enforcement uses `RolesGuard` + `@Roles(RoleEnum.XXX)`.
- Valid roles: `RoleEnum.USER`, `RoleEnum.ADMIN`, `RoleEnum.MANAGER`.
- Always apply `JwtAuthGuard` **before** `RolesGuard` in the guard stack.
# Be-calander — System Reliability Rules (Optimized)

---

## R11 — Concurrency

* Writes must be **safe under high concurrency (≥1000 req/s)**.
* Use **atomic ops OR distributed lock (Redis SET NX + TTL)** when updating shared state.
* Prevent race conditions on same entity updates.
* If risk exists → explicitly choose: **lock / queue / idempotent design**.

---

## R12 — Idempotency

* All critical ops must be **idempotent** (API, webhook, MQTT, jobs).
* Duplicate requests must NOT:

  * create duplicates
  * corrupt state
* Use at least one:

  * idempotency key
  * Redis/DB dedup
* Retries must be **safe**:

  * no inconsistent state
  * define retry limit + fallback

---

## R13 — Crash Safety

* System must survive **crash/restart at any point**.
* Always release resources:

  * Redis locks → **TTL required**
  * DB → safe commit/rollback
* Use `try/catch/finally` for cleanup.
* Avoid deadlocks:

  * no circular locks
  * keep lock scope minimal

---

## R14 — Zero Trust

* **Never trust input** (API, MQTT, webhook).
* Validate all:

  * DTO (`class-validator`)
  * types
  * business rules
* Reject:

  * invalid format
  * invalid timestamps
  * non-existent IDs
* Fail safely (no crash), return controlled errors.

---

## R15 — Observability

* Critical flows must be traceable:

  * structured logs (no console.log)
  * include requestId / correlationId
* Errors must include:

  * safe input snapshot
  * execution step
* **No silent failures**
