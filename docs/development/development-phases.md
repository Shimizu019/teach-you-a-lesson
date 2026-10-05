# Development Phases

> **Status:** Complete — planning document. **No phases implemented yet.**

## Overview

The project will be developed in sequence. Each phase builds on the previous one. Phases are not started until the project owner approves.

**Decision Status:** Planned (phases may be reordered or refined by the project owner)

---

## Phase 1 — Foundation

- Project foundation: Laravel + React scaffolding, base configuration
- Database schema (initial migrations)
- Shared types, API client skeleton, coding guidelines in effect

## Phase 2 — Authentication and Roles

- Laravel Sanctum token authentication
- Teacher / Student roles
- Login, logout, role-based route guards

## Phase 3 — Class Management

- Teacher creates/edits/deletes classes
- Class listing and details

## Phase 4 — Student Enrollment

- Teacher enrolls/removes students
- Class membership management

## Phase 5 — Lesson Management

- Teacher creates/schedules lessons
- Lesson status lifecycle (Scheduled / Active / Completed / Cancelled)

## Phase 6 — Attendance

- Teacher records attendance per lesson
- Present / Absent / Late / Excused

## Phase 7 — Activities

- Individual and group activities
- Deadlines, completion, teacher remarks

## Phase 8 — Quizzes

- Quiz creation (multiple choice + identification)
- Assignment, timer, submission, automatic scoring, results

## Phase 9 — Student Monitoring

- Student progress aggregation
- Teacher centralized progress view

## Phase 10 — Recorded Lectures

- Lecture records, video reference
- Viewing progress, required viewing, quiz gating

## Phase 11 — Offline Capability

- IndexedDB local storage
- Offline-capable operations (attendance, activities, cached quizzes)

## Phase 12 — Synchronization

- Sync queue, status tracking, retry handling
- Conflict detection and resolution

## Phase 13 — Reports and Refinement

- Reports (if in scope)
- UX refinement, performance improvements

## Phase 14 — Testing and Deployment

- Test coverage (Feature + Unit)
- Deployment pipeline

---

## Rules

1. One phase at a time, approved by the project owner
2. Each phase verified before commit
3. One task → implement/document → verify → one commit → one push → stop

**Do not implement these phases now.**