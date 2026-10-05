# Coding Guidelines

> **Status:** Complete — planning document. **Not yet enforced through tooling.**

## Overview

Project rules for consistent, secure, and maintainable code. These guidelines apply to future implementation; they are not enforced by tooling yet.

**Decision Status:** Planned (linting/formatting tooling deferred to implementation)

---

## TypeScript Strictness

- TypeScript in **strict mode**
- No `any` unless explicitly justified
- Prefer explicit types over inference where clarity improves
- Shared types live in `frontend/src/types/`

## Component Organization

- Reusable UI primitives in `components/`
- Feature logic in `features/`
- Page containers in `pages/`
- Keep components small and focused (single responsibility)

## Naming Conventions

- **Files:** PascalCase for components (`LessonCard.tsx`), camelCase for utilities (`formatDate.ts`)
- **Variables/functions:** camelCase
- **Classes/Components:** PascalCase
- **Constants:** SCREAMING_SNAKE_CASE
- **Database tables:** snake_case, plural (`quiz_submissions`)
- **PHP classes:** PascalCase; methods camelCase (Laravel/PSR convention)

## API Separation

- Frontend talks to the backend **only** through `services/api/`
- **No direct frontend-to-database connection** — ever
- Backend exposes REST endpoints only; no business logic leaks to the client

## Validation

- Backend: FormRequest validation for every endpoint
- Frontend: mirror validation for UX (never as the sole enforcement)
- Validate on both sides; **server-side is authoritative**

## Error Handling

- Consistent error response format (see `api-design.md`)
- Frontend normalizes errors through the API client
- Never expose internal errors/stack traces to clients
- Log server-side errors

## Security

- Laravel Sanctum for authentication
- Authorization via Policies — never trust client-provided role/ownership
- Sanitize/escape user input
- Protect against CSRF/XSS/injection (Laravel defaults + review)
- **No sensitive information committed to Git** (`.env`, secrets, keys)

## Database Integrity

- Foreign keys on all relationships
- Unique constraints where applicable
- Index frequently queried columns
- Migrations are the source of schema truth (no manual DB edits)

## Accessibility

- Semantic HTML
- Keyboard navigability
- Sufficient color contrast
- ARIA labels where needed

## Responsive Design

- Mobile-first with Tailwind breakpoints
- All primary flows usable on small screens

## Offline Safety

- Every offline write carries sync metadata
- Offline is a first-class state — never treat as an error
- No data loss: local changes queue until synced
- Show offline/sync status in the UI

## No Direct Frontend-to-Database Connection

- The frontend **never** connects to MySQL or any database directly
- All data access flows: React → REST API → Laravel → MySQL

## No Sensitive Information in Git

- `.env` and secrets are gitignored
- Never commit API keys, passwords, or tokens

## No Unnecessary Dependencies

- Add a dependency only when it solves a real problem
- Prefer standard library / existing dependencies
- Justify every new package

## Clear Separation of Concerns

- Frontend: UI + offline client only
- Backend: business logic + API + auth
- Database: durable storage
- Services hold business logic; Controllers stay thin

---

**Do not enforce these through tooling yet.**