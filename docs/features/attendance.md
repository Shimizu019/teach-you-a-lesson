# Attendance

> **Status:** Complete — planning document. **No implementation yet.**

## Overview

Attendance records each student's presence for a lesson. The teacher records attendance; students do not self-mark.

## Attendance Statuses

```text
Present
Absent
Late
Excused
```

| Status | Meaning |
|--------|---------|
| `Present` | Student attended |
| `Absent` | Student did not attend |
| `Late` | Student attended but arrived late |
| `Excused` | Absence is excused (with remarks) |

**Decision Status:** Planned

## Fields

- `lesson_id` — the lesson
- `student_id` — the student
- `status` — one of the four values above
- `remarks` — optional teacher note (especially for excused/absent)
- `recorded_at` — when the record was made

## Independence from Completion

**Attendance is independent from quiz and activity completion.**

A student may be marked `Absent` and still have completed a quiz or activity. This is a valid, expected state:

```text
Absent
+
Quiz Completed
= Valid State
```

The system must **not** couple attendance status with academic completion status. They are tracked and evaluated separately.

## Teacher Workflow

1. Teacher opens attendance for a lesson
2. Teacher marks each enrolled student's status
3. Records are saved (offline-capable)
4. Records sync to server when online

## Rules

1. Only teachers can record attendance (within owned classes)
2. One attendance record per student per lesson (unique constraint)
3. Attendance never gates or reflects quiz/activity completion
4. Attendance supports offline recording with queued sync

**Do not implement it.**