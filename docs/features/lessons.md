# Lessons

> **Status:** Complete — planning document. **No implementation yet.**

## Overview

A lesson is the central unit of instruction within a class. Each lesson can include attendance, a lecture, an activity, and a quiz.

## Lesson Fields

| Field | Description |
|-------|-------------|
| **Title** | Lesson title (required) |
| **Description** | Optional lesson description |
| **Date** | Scheduled date (`lesson_date`) |
| **Time** | Start and end time (`start_time`, `end_time`) |
| **Status** | Current lifecycle state |

## Lesson Status

```text
Scheduled
Active
Completed
Cancelled
```

| Status | Meaning |
|--------|---------|
| `Scheduled` | Created but not yet started |
| `Active` | Currently ongoing |
| `Completed` | Finished; all components closed |
| `Cancelled` | Will not take place |

**Decision Status:** Planned

## Lesson Components

A lesson can contain:

- **Attendance** — per-student attendance record for this lesson
- **Lecture** — recorded video/material attached to this lesson
- **Activity** — one activity (individual or group) for this lesson
- **Quiz** — one quiz attached to this lesson

Components are optional; a lesson may contain any subset.

## Automatic Completion

The system may eventually mark lessons as `Completed` automatically based on configured rules (e.g., when a scheduled end time passes and components are closed).

- Automatic completion is a **configurable rule**, not a hard-coded behavior
- The **teacher retains override capability** — a teacher can manually set status at any time
- Automatic rules must never override an explicit teacher action

**Decision Status:** Planned / To Be Finalized (exact auto-completion rules)

## Teacher Override

- Teachers can manually change lesson status (Scheduled → Active → Completed, or → Cancelled)
- Manual override always takes precedence over automatic rules
- Override is recorded in audit history (planned)

## Rules

1. A lesson belongs to exactly one class
2. Component content is scoped to the lesson
3. Teachers manage lessons only within owned classes
4. Students view lessons only within enrolled classes

**Do not implement it.**