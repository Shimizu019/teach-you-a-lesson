# System Architecture

> **Status:** Complete — architecture planning document.

## Architecture Overview

```text
React + TypeScript
        │
        ├── Tailwind CSS
        ├── IndexedDB
        └── REST API
                │
        Laravel + PHP
                │
              MySQL
```

## Layer Responsibilities

### Frontend Layer — React + TypeScript

- Provides the entire user interface for teachers and students
- Manages UI state, routing, and component rendering
- TypeScript enforces type safety across the application
- Communicates with the backend exclusively through the REST API
- **Never** connects directly to MySQL or any database

**Decision Status:** Final

### Styling Layer — Tailwind CSS

- Utility-first CSS framework for consistent, responsive UI design
- Maintains design system consistency across all screens
- Decision Status: Final

### Offline Storage Layer — IndexedDB

- Browser-based NoSQL database for local data persistence
- Stores offline-capable records when connectivity is lost
- Feeds the local synchronization queue
- Decision Status: Planned (PWA path)

### Communication Layer — REST API

- HTTP-based contract between frontend and backend
- Stateless request/response exchange
- JSON request and response payloads
- Decision Status: Final

### Backend Layer — Laravel + PHP

- Receives and validates API requests
- Enforces authentication and authorization
- Contains all business logic (via Services)
- Orchestrates database operations through Eloquent ORM
- Decision Status: Final

### Data Layer — MySQL

- Relational database for durable data storage
- Enforces data integrity through schema constraints
- Serves as the source of truth for the system
- Decision Status: Final

---

## Separation of Concerns

```
┌─────────────────────────────────────────┐
│          React + TypeScript             │  ← UI / offline client
│          (frontend/)                    │
│  IndexedDB: local cache and sync queue  │
└───────────────────┬─────────────────────┘
                    │ REST API (HTTP/JSON)
                    │ Laravel Sanctum auth
┌───────────────────▼─────────────────────┐
│        Laravel + PHP                    │  ← business logic
│            (backend/)                   │  ← auth + validation
└───────────────────┬─────────────────────┘
                    │ Eloquent ORM / PDO
┌───────────────────▼─────────────────────┐
│               MySQL                     │  ← source of truth
│            (database/)                  │
└─────────────────────────────────────────┘
```

**Rule:** The frontend must **never** directly access MySQL. All data access flows through the Laravel REST API.

---

## Teacher Application Flow

```text
1. Teacher logs in (Laravel Sanctum)
2. System verifies Teacher role/permissions
3. Teacher view loads (React + Tailwind)
4. Teacher requests classes via REST API
5. Server returns authorized classes
6. Teacher creates/edits classes, lessons, students
7. Teacher assigns activities, quizzes, lectures
8. Teacher monitors attendance, progress, scores
9. (Offline) Changes saved locally, queued for sync
10. (Online) Queue syncs to server on connection return
```

## Student Application Flow

```text
1. Student logs in (Laravel Sanctum)
2. System verifies Student role/permissions
3. Student view loads (React + Tailwind)
4. Student requests only their own accessible resources
5. Student views lessons, materials, recorded lectures
6. Student completes attendance, activities, quizzes
7. Student views scores when permitted
8. (Offline) Supported work saved locally, queued for sync
9. (Online) Queue syncs to server on connection return
```

## API Communication

- All frontend-to-backend communication uses HTTP requests through a centralized `services/api/` client
- The API client handles authentication headers, error normalization, and offline queuing
- Responses are standardized JSON; errors follow a consistent error-format convention
- Decision Status: Final

## Local Data vs Server Data

- **Server data:** authoritative records stored in MySQL, accessible when online
- **Local data:** copies cached in IndexedDB for offline use and sync staging
- Local data is considered stale/expiring; server data is always preferred for authoritative reads
- The `services/synchronization/` layer manages reconciliation (details in `offline-architecture.md`)

## Authentication

- Laravel Sanctum issues API tokens upon successful login
- Tokens are attached to API requests as `Authorization: Bearer <token>`
- Teachers receive management-level policies; students receive read/enrollment-scoped policies
- Session-less API authentication; the frontend stores the token in memory and optionally IndexedDB

## Synchronization

- Online: local data and server data are synchronized
- Offline: the application continues with supported operations; changes are stored locally
- When connectivity returns: the synchronization queue processes pending changes
  - sync queue → server validation → database update → local record marked synced
- Detailed model in `offline-architecture.md`

## Access Control Summary

| Layer | Responsibility |
|-------|----------------|
| Frontend (React) | UI only; no direct data access |
| API client (`services/api/`) | Request construction, token injection, error handling |
| Backend (Laravel) | Authentication, authorization, validation, business logic |
| Database (MySQL) | Durable storage with referential integrity |