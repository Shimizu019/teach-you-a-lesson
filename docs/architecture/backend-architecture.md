# Backend Architecture

> **Status:** Complete — architecture planning document.

## Overview

Laravel + PHP backend structured in three layers: the HTTP/API layer, the business logic layer, and the data layer. A service-oriented approach is used for complex business logic rather than placing all logic directly inside controllers.

**Decision Status:** Final

## Directory Responsibilities

```text
backend/
├── app/
│   ├── Console/          ← scheduled tasks and commands (planned)
│   ├── Exceptions/       ← exception handlers
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/     ← authentication endpoints
│   │   │   ├── Teacher/  ← teacher-only management endpoints
│   │   │   └── Student/  ← student-scope endpoints
│   │   ├── Middleware/   ← authentication, authorization, role guards
│   │   └── Requests/     ← FormRequest validation
│   ├── Models/           ← Eloquent models
│   ├── Policies/         ← authorization rules (per model)
│   ├── Services/         ← business logic
│   └── Support/          ← shared helpers and value objects
├── bootstrap/            ← application bootstrap
├── config/               ← configuration files
├── database/
│   ├── factories/        ← model factories (planned)
│   ├── migrations/       ← schema migrations (planned)
│   └── seeders/          ← seed data (planned)
├── routes/
│   ├── api/              ← REST API routes
│   └── web/              ← web routes (minimal)
├── storage/              ← logs, cache, uploads (gitignored)
└── tests/
    ├── Feature/          ← integration tests (planned)
    └── Unit/             ← unit tests (planned)
```

## Three-Layer Separation

```
HTTP/API Layer
    Controllers + Requests + Middleware
         ↓ delegates to
Business Logic Layer
    Services (pure business rules, orchestration)
         ↓ uses
Data Layer
    Models + Eloquent + MySQL
```

### 1. HTTP/API Layer

Responsible for:
- Receiving requests
- Delegating validation to FormRequest classes
- Delegating authorization to Policies/Middleware
- Delegating business logic to Services
- Formatting JSON responses

**Controllers must stay thin.** They handle HTTP concerns only — no complex business logic.

- **Controllers** — HTTP request/response handling, orchestration of Services
- **Requests** (`Http/Requests/`) — declarative input validation rules per endpoint
- **Middleware** (`Http/Middleware/`) — cross-cutting concerns (auth checks, role enforcement, sync validation)
- **API Routes** (`routes/api/`) — RESTful resource definitions, grouped by domain

### 2. Business Logic Layer

Responsible for:
- Implementing business rules (e.g., lesson status transitions, quiz scoring)
- Orchestration across multiple models
- State transitions and invariants

**Services** (`app/Services/`) hold the core business logic. Controllers call Services; Services never know about HTTP.

- Keeps business logic testable in isolation (Unit tests)
- Prevents controllers from becoming "god objects"
- Example: `LessonCompletionService` decides when a lesson can be marked completed

**Decision Status:** Final (service-oriented approach)

### 3. Data Layer

Responsible for:
- Persisting and retrieving data
- Referential integrity
- Query optimization

- **Models** (`app/Models/`) — Eloquent models with relationships, casts, scopes
- **Policies** (`app/Policies/`) — per-model authorization (who can view/edit/delete)
- **Database** — MySQL schema, constraints, indexes (migrations created later)

## Middleware Stack (Planned)

| Middleware | Purpose |
|-----------|---------|
| Sanctum auth | Validates Bearer token |
| Role guard | Enforces teacher/student route groups |
| Request validation | Ensures payload shape |

## Policies (Authorization)

Policies enforce per-resource authorization:
- Teacher: full management within owned classes
- Student: read/submit only within enrolled classes

Policies are consulted automatically by Laravel before controller execution.

## API Routing (Planned)

Routes grouped by domain under `routes/api/`:
- `/auth/*` — login, logout, profile
- `/classes/*`, `/lessons/*`, etc. — resource endpoints

**Decision Status:** Planned (actual routes defined in the API design phase)

## Rules

1. Controllers stay thin — delegate to Services
2. Business logic lives in Services, not Controllers
3. Data access lives in Models/Services — no raw SQL in Controllers
4. Validation lives in FormRequests
5. Authorization lives in Policies and Middleware
6. The frontend never talks to MySQL directly — only via this API