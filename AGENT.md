# AGENT.md

This guide helps any AI coding assistant (Claude, Cursor, GPT) work effectively in this repository.

Use it as the canonical quick reference for commands, common workflows, and guardrails.

## Project Purpose

A production‑ready full‑stack template (FastAPI + SQLModel + PostgreSQL, React + Vite + Chakra UI + shadcn/ui) used here to build a pet health tracking MVP. Core flows: account signup/login, pet profiles, health metrics and symptom logging, timeline, CSV/Text export, and settings. See `docs/Use Case MVP 1.0.md` and `docs/User Story.md` for the detailed scope.


## Golden Rules for Assistants

- Prefer commands that are non-interactive and idempotent. Avoid prompts that block.
- Use the repository root as the working directory unless a step says otherwise.
- When running local servers, assume default ports from `development.md`.
- After changing backend models, always create and apply an Alembic migration.
- After backend API changes, regenerate the frontend API client.
- Keep edits small and run tests. If breaking, revert and propose an alternative.

## Quickstart Workflows

When you're given a new feature, follow this sequence:
1. Models + Migrations (CRUD + optional List/Search)
2. API Routes (CRUD + optional List/Search)
3. Generate Client (CRUD + optional List/Search)
4. Frontend (CRUD + optional List/Search)
5. Testing

### Detailed Development Workflow

For new features, follow this specific sequence:

**1. Models + Migrations**
```bash
# Edit backend/app/models.py
cd backend && alembic revision --autogenerate -m "describe change"
cd backend && alembic upgrade head
cd backend && bash scripts/test.sh
```

**2. API Routes**
```bash
# Implement/update endpoints in backend/app/api/routes/
# Test the API endpoints
```

**3. Generate Client**
```bash
# Ensure backend is running on http://localhost:8000
./scripts/generate-client.sh
# Or manually:
# cd frontend && npm run generate-client
```

**4. Frontend**
```bash
# Implement UI components and pages
# Use generated client from frontend/src/client/
```

**5. Testing**
```bash
# Backend tests
cd backend && bash scripts/test.sh

# Frontend tests (optional E2E)
cd frontend && npx playwright test
```


### New model: scope only what you need (CRUD + optional List/Search)

- **Required (always implement):**
  - Schema and migration: update `backend/app/models.py` + Alembic revision/upgrade
  - Minimal CRUD in `backend/app/crud.py`: `create`, `get_by_id`, `update`, `delete`
  - Routes in `backend/app/api/routes/RESOURCE.py`:
    - `POST /resource`, `GET /resource/{id}`, `PATCH /resource/{id}`, `DELETE /resource/{id}`
  - Auth/permissions via `deps.py` as appropriate; unit tests

- **Optional (only if the use case needs it):**
  - List endpoint: `GET /resource?skip&limit` (pagination)
  - Search/filter/sort: add `q`, `filters`, `order_by`, `order_dir` and only index fields you actually query
  - Scoped listing when it’s a child resource: e.g. `GET /parents/{parent_id}/resource`
  - Bulk ops, soft-delete, export, etc., when justified by requirements

- **Frontend implications:**
  - Minimal (no search): form pages for create/edit and a detail page; list page optional
  - With list/search: table + search input + filters + pagination; reuse `frontend/src/components/ui/`

- **PR checklist (suggested to include):**
  - [ ] Model + migration
  - [ ] CRUD + routes
  - [ ] List/Search needed? If yes, params defined and indexed; if no, omitted
  - [ ] Client regenerated (`./scripts/generate-client.sh`)
  - [ ] UI added/updated
  - [ ] Tests pass (backend and, if applicable, frontend E2E)

- **Conventions to follow (backend):**
  - Router per resource in `backend/app/api/routes/resource.py`, e.g. `router = APIRouter(prefix="/resources", tags=["resources"])`
  - Use `uuid.UUID` as id type when applicable; path `/{resource_id}`
  - Prefer `PATCH` for updates; return `...Public` models
  - List responses return an envelope with `data` and `count` (e.g. `UsersPublic`)
  - Model naming: `Thing` (table), `ThingCreate`, `ThingUpdate`, `ThingPublic`, `ThingsPublic`


### Run everything with Docker (Only for deployment)
```bash
docker compose watch
```
Then open:
- Backend API docs: http://localhost:8000/docs
- Frontend: http://localhost:5173

Logs and service control:
```bash
docker compose logs backend
docker compose logs frontend
docker compose stop
docker compose down
```

### Local-only backend
```bash
cd backend
uv sync && source .venv/bin/activate
fastapi dev app/main.py
```

### Local-only frontend
```bash
cd frontend
npm install
npm run dev
```

## Common Commands

### Backend
```bash
# Tests (with repo script)
cd backend && bash scripts/test.sh

# Lint and format
cd backend && bash scripts/lint.sh
cd backend && bash scripts/format.sh

# Database migrations
cd backend && alembic revision --autogenerate -m "short message"
cd backend && alembic upgrade head
```

### Frontend

Before writing frontend code, review the following files to ensure consistent UI/UX:
  - `frontend/DESIGN_TOKENS.md` (Design tokens and UI strategy)
  - `frontend/src/theme.tsx` (Chakra UI theme)
  - `frontend/tailwind.config.ts` (TailwindCSS configuration)
  - `frontend/src/components/ui/` (UI components)
  - `frontend/src/routes/` (Routes)
  - `frontend/src/client/` (API client)
  
  **UI Libraries**:
  - **Existing components**: `Chakra UI` (continue using for current components)
  - **New components**: `shadcn/ui` + `TailwindCSS` (use for all new UI development)
  
  **Icon Libraries**:
  - `react-icons` (Feather `Fi*`, Font Awesome `Fa*`, Heroicons v2 `Hi2*`, Bootstrap `Bs*`)
  - `lucide-react` (for shadcn/ui components)

### New Component Development Guidelines

**For new UI components, use shadcn/ui + TailwindCSS**:

```bash
# Install shadcn/ui component (example: button)
npx shadcn-ui@latest add button

# Use the installed component
import { Button } from "@/components/ui/button"
```

**Component file structure**:
- Chakra UI components: `frontend/src/components/ui/` (existing)
- shadcn/ui components: `frontend/src/components/ui/` (new, auto-generated)
- Custom TailwindCSS utilities: `frontend/src/lib/utils.ts`

```bash
# Dev server / build / lint
cd frontend && npm run dev
cd frontend && npm run build
cd frontend && npm run lint

# Regenerate API client (ensure backend is running on http://localhost:8000)
cd frontend && npm run generate-client

# E2E tests (install browsers first if needed)
cd frontend && npx playwright install
cd frontend && npx playwright test
cd frontend && npx playwright test tests/login.spec.ts
cd frontend && npx playwright test --headed
```

### Docker utilities
```bash
# Rebuild and restart cleanly
docker compose down -v
docker compose build --no-cache
docker compose watch

# Tail a specific service
docker compose logs -f backend
```

## Architecture map

### Backend (FastAPI + SQLModel + PostgreSQL)
- Entry: `backend/app/main.py`
- Router setup: `backend/app/api/main.py`
- Config: `backend/app/core/config.py`
- DB: `backend/app/core/db.py`
- Models: `backend/app/models.py`
- CRUD: `backend/app/crud.py`
- Deps: `backend/app/api/deps.py`
- Migrations: `backend/app/alembic/versions/`

### Frontend (React + TS + Vite + Chakra UI + shadcn/ui)
- Entry: `frontend/src/main.tsx`
- Routes: `frontend/src/routes/`
- Generated API client: `frontend/src/client/`
- UI components: `frontend/src/components/ui/`
- TailwindCSS config: `frontend/tailwind.config.ts`
- Utility functions: `frontend/src/lib/utils.ts`

## Project Facts

- **API base**: `settings.API_V1_STR` → `/api/v1`; OpenAPI JSON at `/api/v1/openapi.json`.
- **Routers included**: `login`, `users`, `utils` (items removed); `private` only when `ENVIRONMENT == local`.
- **Auth**: OAuth2 Password flow at `POST /api/v1/login/access-token`; JWT HS256, bearer token, expiry `ACCESS_TOKEN_EXPIRE_MINUTES = 60*24*8`.
- **Health check**: `GET /api/v1/utils/health-check/` → `true`.
- **Admin utils**: `POST /api/v1/utils/test-email/` (superuser only, 201 Created).
- **Local-only router**: `/api/v1/private/*` included only when `ENVIRONMENT == "local"`.
- **CORS**: `allow_origins = BACKEND_CORS_ORIGINS + [FRONTEND_HOST]`; default `FRONTEND_HOST = http://localhost:5173`.
- **Sentry**: enabled only if `SENTRY_DSN` is set and `ENVIRONMENT != local`.
- **Passwords**: bcrypt via Passlib; user password length 8–40.
- **Database**: PostgreSQL via SQLModel; DSN scheme `postgresql+psycopg`.
- **IDs**: `User.id` is `uuid.UUID` primary key.
- **Env vars (required)**: `SECRET_KEY`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `FIRST_SUPERUSER`, `FIRST_SUPERUSER_PASSWORD`.
- **Env vars (common optional)**: `BACKEND_CORS_ORIGINS`, `FRONTEND_HOST`, `ENVIRONMENT`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAILS_FROM_EMAIL`, `SENTRY_DSN`, `DOMAIN`.
- **Ports (dev)**: Frontend `5173`, Backend `8000`, Adminer `8080`, Traefik UI `8090`, MailCatcher `1080`.
- **Codegen**: `@hey-api/openapi-ts` → outputs to `frontend/src/client` (axios legacy client, class-based SDK);
  run with `./scripts/generate-client.sh` or `cd frontend && npm run generate-client`; method names strip leading service name and lower-case first char.
- **Frontend tooling**: TanStack Router, TanStack React Query, Vite alias `@ -> src`, Chakra UI (existing), shadcn/ui (new), TailwindCSS, `react-icons`, `lucide-react`.
- **Frontend API base/token**: `OpenAPI.BASE = import.meta.env.VITE_API_URL`; `OpenAPI.TOKEN` pulls `localStorage.access_token`.
- **Frontend auth UX**: on `401/403` API errors, clears `access_token` and redirects to `/login`.
- **Email**: MJML templates in `backend/app/email-templates/src`; local dev uses MailCatcher (`mailcatcher:1080`).
- **Python**: `>=3.10,<4.0`.
- **OpenAPI ids**: unique operation ids generated as `"{route.tags[0]}-{route.name}"`.
- **Docker defaults**: frontend build arg `VITE_API_URL` is `http://localhost:8000` in dev override; `https://api.${DOMAIN}` in main compose.

## Typical change flows

### 1) Update backend models
```bash
# edit: backend/app/models.py
cd backend && alembic revision --autogenerate -m "describe change" && alembic upgrade head
cd backend && bash scripts/test.sh
```

### 2) Update backend API schema and regenerate client
```bash
# ensure backend running at http://localhost:8000
cd frontend && npm run generate-client
cd frontend && npm run lint
```

### 3) Run focused tests
```bash
cd backend && pytest app/tests/api/routes/test_users.py::test_create_user -q
cd frontend && npx playwright test tests/reset-password.spec.ts -g "happy path"
```

## Troubleshooting

- Ports busy: stop local dev servers and run `docker compose down` before `watch`.
- DB drift: run `alembic upgrade head`; for a clean slate: `docker compose down -v` then `docker compose watch`.
- Playwright failures locally: run `npx playwright install` once; use `--headed` to debug.
- Env values: see `.env` (and `development.md`) for required keys (`SECRET_KEY`, `FIRST_SUPERUSER_PASSWORD`, `POSTGRES_PASSWORD`).

## References

- Root docs: `README.md`
- Backend docs: `backend/README.md`
- Dev environment & URLs: `development.md`
- Deployment: `deployment.md`

