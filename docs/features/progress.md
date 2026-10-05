# Student Progress

> **Status:** Complete — planning document. **No dashboards implemented.**

## Overview

The system monitors each student's participation and completion across a lesson's components, giving the teacher a centralized view.

## Monitored Dimensions

```text
Attendance
Lecture completion
Activity completion
Quiz completion
Quiz scores
Submission times
Overall lesson progress
```

| Dimension | Source |
|-----------|--------|
| **Attendance** | `attendance.status` |
| **Lecture completion** | `lecture_progress.completed` |
| **Activity completion** | activity completion status |
| **Quiz completion** | `quiz_submissions.status` |
| **Quiz scores** | `quiz_submissions.score` |
| **Submission times** | `quiz_submissions.submitted_at`, activity submission timestamps |
| **Overall lesson progress** | `student_progress` aggregation |

## Aggregation

- `student_progress` is a derived record per (`lesson_id`, `student_id`)
- Aggregates component statuses into a single summary row
- Updated as components are completed (or recalculated on demand)

## Teacher Centralized View

The teacher has a centralized view of student participation:
- Per-lesson: list of students with their component statuses
- Per-student: progress across lessons
- Filtering by status (e.g., students who haven't completed the quiz)

**Decision Status:** Planned (exact view composition not finalized)

## Student View

- Students can view their own progress (when permitted)
- Students see their own completion status and permitted scores
- Students do not see other students' data

## Independence Reminder

Progress dimensions are tracked independently:
- A student can be `Absent` yet have `quiz_completed = true`
- Attendance does not gate or reflect completion (see `attendance.md`)

## Rules

1. Progress data is read-only for students (their own data only)
2. Teachers view progress only within owned classes
3. Progress derives from component records — it is not the source of truth
4. Offline: progress updates queue locally and sync when online

**Do not implement dashboards yet.**