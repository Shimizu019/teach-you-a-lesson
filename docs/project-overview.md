# Project Overview

> **Status:** Complete — planning document.

## Project Codename

```text
Teach You a Lesson
```

**Note:** "Teach You a Lesson" is the temporary repository/project codename. The final product name is still undecided and is decided by the project owner.

## Purpose

An offline-capable **learning continuity and classroom management system** for teachers and students.

The system helps teachers continue and manage lessons when normal face-to-face classes are disrupted by:

- Typhoons
- Extreme heat index
- Class suspensions
- Emergencies
- Internet interruptions
- Other situations where normal classroom teaching is difficult

## Scope

This is **not** a simple Google Classroom clone. The system manages the complete lifecycle of a lesson and supports learning continuity when connectivity or normal classroom conditions are unavailable.

### Eventually Manages

- Classes
- Students
- Lessons
- Attendance
- Activities
- Quizzes
- Recorded lectures
- Student progress
- Lesson completion
- Offline data
- Automatic synchronization

## Planned Technology Stack

| Area | Technology |
|------|------------|
| Frontend | React + TypeScript |
| Build tooling | Vite |
| Routing | React Router |
| Styling | Tailwind CSS |
| State/data management | TanStack Query |
| Backend | Laravel + PHP |
| Database | MySQL |
| API | REST API |
| Authentication | Laravel Sanctum |
| Offline storage | IndexedDB |
| Video storage | Server-managed (abstraction-ready) |
| Conflict resolution | Server-wins |
| PWA | Planned |
| Development | Laragon |
| UI/UX | Figma |
| Version control | Git + GitHub |

## System Architecture

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

The frontend must never directly access MySQL.

## Core Roles

- **Teacher** — creates classes, manages students/lessons, records attendance, creates activities/quizzes, uploads lectures, monitors progress
- **Student** — joins classes, views lessons/materials, completes activities/quizzes, views permitted scores, continues supported work offline

## Lesson Lifecycle

```text
Scheduled Lesson
       ↓
Attendance
       ↓
Lecture
       ↓
Activity
       ↓
Quiz
       ↓
Student Completion
       ↓
Teacher Monitoring
       ↓
Lesson Completed
```

## Key Documentation

| Document | Location |
|----------|----------|
| System Architecture | `docs/architecture/system-architecture.md` |
| Frontend Architecture | `docs/architecture/frontend-architecture.md` |
| Backend Architecture | `docs/architecture/backend-architecture.md` |
| Offline Architecture | `docs/architecture/offline-architecture.md` |
| Database Design | `docs/database/database-design.md` |
| Entity Relationships | `docs/database/entity-relationships.md` |
| API Design | `docs/api/api-design.md` |
| Feature Specs | `docs/features/*.md` |
| Development Phases | `docs/development/development-phases.md` |
| Coding Guidelines | `docs/development/coding-guidelines.md` |

## Current Status

**Planning stage.** No application code has been initialized. React, Laravel, and dependencies have not been set up. Documentation defines the intended architecture before implementation begins.

## Decision-Making

The project owner is the final decision-maker for:
- Project direction
- Feature additions
- Architecture choices
- Project naming

Any undecided architectural decision is labeled with `Decision Status: Planned / To Be Finalized` in the relevant document.