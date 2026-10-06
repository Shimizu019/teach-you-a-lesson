# Frontend Architecture

> **Status:** Complete — architecture planning document.

## Overview

Vite-powered React + TypeScript application using feature-oriented organization. The frontend is structured as a single-page application with React Router client-side routing, offline support via IndexedDB, and centralized API communication.

**Decision Status:** Final

## Directory Responsibilities

```text
frontend/src/
├── components/        ← reusable UI components
├── features/          ← feature modules (auth, classes, lessons, etc.)
├── pages/             ← page-level containers
├── layouts/           ← layout wrappers (teacher layout, student layout)
├── hooks/             ← custom React hooks
├── services/
│   ├── api/           ← centralized REST API client
│   ├── storage/       ← IndexedDB wrapper
│   └── synchronization/ ← sync queue management
├── database/
│   └── indexeddb/     ← IndexedDB schema definitions
├── stores/            ← TanStack Query data management
├── routes/            ← route definitions and guards
├── types/             ← shared TypeScript types/interfaces
├── utils/             ← pure utility functions
├── constants/         ← application constants
├── config/            ← environment-aware configuration
└── workers/           ← Web Workers (planned)
```

## Component Organization

### `components/`

Reusable, framework-agnostic UI primitives:
- `common/` — Buttons, inputs, modals, tables, badges
- `layout/` — Sidebar, header, footer containers
- `navigation/` — Menu, breadcrumbs, tabs
- `forms/` — Form fields, validation wrappers, error displays
- `feedback/` — Toasts, alerts, spinners, empty states
- `media/` — Video player placeholders, image viewers

### `features/`

Feature-oriented modules, one directory per feature domain:
- `auth/` — Login, logout, token handling, session state
- `classes/` — Class browsing, creation, management UI
- `students/` — Student enrollment, roster display
- `lessons/` — Lesson list, scheduling, status display
- `attendance/` — Attendance marking interface
- `activities/` — Activity listing and submission UI
- `quizzes/` — Quiz display, timer, submission UI
- `lectures/` — Lecture materials, video player UI
- `progress/` — Progress indicators, status displays
- `dashboard/` — Teacher/student dashboard views
- `synchronization/` — Sync status UI, offline indicators

### `pages/`

Page-level route containers that compose features and components:
- `auth/` — Login page, registration placeholders
- `teacher/` — Teacher dashboard, class pages, lesson pages
- `student/` — Student dashboard, class pages, lesson pages
- `errors/` — 403, 404, 500 error pages

### `layouts/`

Layout wrappers for different application shells (teacher shell, student shell, auth shell).

## API Client (`services/api/`)

Centralized HTTP client with:
- Base URL configuration
- Authentication header injection (Bearer token)
- Request/response interceptors
- Offline queue enqueueing for failed requests
- Error normalization

## Offline Storage (`database/indexeddb/`)

IndexedDB schema definitions and accessors:
- Store definitions (records, sync queue, metadata)
- CRUD operations for offline-first records
- Sync status tracking per record

## State Management (`stores/`)

TanStack Query is the finalized state management solution.

TanStack Query handles:
- Server-state synchronization (caching, background refetching, optimistic updates)
- Offline data caching via IndexedDB integration
- Request deduplication and automatic retry
- Query mutation with optimistic UI updates

UI-only state (form inputs, modal visibility) uses React's built-in `useState`/`useReducer` hooks.

Redux and Zustand are not part of the initial architecture and are not planned unless a future requirement specifically justifies them.

## Routing (`routes/`)

Route definitions with:
- Role-based guards (teacher vs student)
- Public vs protected routes
- Offline fallback routes

## Types (`types/`)

Shared TypeScript interfaces for:
- User/role types
- Domain entities (class, lesson, attendance, etc.)
- API request/response shapes
- Sync record shapes

## Utilities (`utils/`)

Pure helper functions:
- Date formatting
- Validation helpers
- Formatting utilities

## Constants (`constants/`)

Application-wide constants:
- API endpoints (base URL)
- Status enums
- Configuration keys

## Configuration (`config/`)

Environment-aware configuration:
- API base URL (dev/staging/production)
- Feature flags
- Sync intervals

## Web Workers (`workers/`)

Planned heavy computation offloading (sync processing, data export).

## Offline Interaction

When offline:
1. `services/api/` intercepts requests
2. Requests are enqueued in IndexedDB with sync metadata
3. UI shows offline indicators via `features/synchronization/`
4. Supported operations continue with local data
5. On reconnection, `services/synchronization/` processes the queue

**Decision Status:** Planned (PWA path)