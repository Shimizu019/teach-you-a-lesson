# Database Design

> **Status:** Complete — planning document. **No migrations created yet.**

## Overview

MySQL relational schema designed to support the complete lesson lifecycle, offline synchronization, and role-based access. All tables will use `id` (BIGINT UNSIGNED AUTO_INCREMENT) as primary key unless noted. All timestamps are stored as `DATETIME` / `TIMESTAMP`.

**Decision Status:** Planned (schema finalized in Phase 1)

---

## Entities

### `users`

- **Purpose:** Teacher and Student accounts
- **Fields:** `id`, `name`, `email` (unique), `password`, `role` (enum: `teacher` | `student`), `remember_token`, `created_at`, `updated_at`
- **Relationships:** owns classes (teacher); enrolled in class_members (student)
- **Constraints:** `email` unique; `role` must be `teacher` or `student`

### `classes`

- **Purpose:** A class/section created and owned by a teacher
- **Fields:** `id`, `teacher_id` (FK → users), `name`, `section`, `subject`, `description`, `created_at`, `updated_at`
- **Relationships:** belongs to teacher (`users`); has many `class_members`, `lessons`
- **Constraints:** `teacher_id` FK; `name`, `section`, `subject` required

### `class_members`

- **Purpose:** Student enrollment in a class (class membership)
- **Fields:** `id`, `class_id` (FK → classes), `student_id` (FK → users), `joined_at`, `created_at`, `updated_at`
- **Relationships:** belongs to class; belongs to student
- **Constraints:** unique (`class_id`, `student_id`) — a student cannot enroll twice

### `lessons`

- **Purpose:** Individual scheduled lesson within a class
- **Fields:** `id`, `class_id` (FK → classes), `title`, `description`, `lesson_date`, `start_time`, `end_time`, `status` (enum: `scheduled` | `active` | `completed` | `cancelled`), `auto_completed` (bool), `completed_at`, `created_at`, `updated_at`
- **Relationships:** belongs to class; has one attendance set; has one activity; has one lecture; has one quiz
- **Constraints:** `class_id` FK; `status` in allowed enum values; `lesson_date` required

### `attendance`

- **Purpose:** Per-student attendance record for a lesson
- **Fields:** `id`, `lesson_id` (FK → lessons), `student_id` (FK → users), `status` (enum: `present` | `absent` | `late` | `excused`), `remarks`, `recorded_at`, `created_at`, `updated_at`
- **Relationships:** belongs to lesson; belongs to student
- **Constraints:** unique (`lesson_id`, `student_id`); **independent** of quiz/activity completion

### `activities`

- **Purpose:** Class activity (individual or group)
- **Fields:** `id`, `lesson_id` (FK → lessons), `title`, `description`, `type` (enum: `individual` | `group`), `start_at`, `deadline`, `status` (enum: `draft` | `open` | `closed`), `created_at`, `updated_at`
- **Relationships:** belongs to lesson; has many `activity_groups` (if group type); has one `activity_group_members` or individual submissions
- **Constraints:** `lesson_id` FK; `type` in allowed values

### `activity_groups`

- **Purpose:** A group container for group activities
- **Fields:** `id`, `activity_id` (FK → activities), `name`, `created_at`, `updated_at`
- **Relationships:** belongs to activity; has many `activity_group_members`
- **Constraints:** `activity_id` FK

### `activity_group_members`

- **Purpose:** Students belonging to an activity group
- **Fields:** `id`, `activity_group_id` (FK → activity_groups), `student_id` (FK → users), `created_at`, `updated_at`
- **Relationships:** belongs to activity_group; belongs to student
- **Constraints:** unique (`activity_group_id`, `student_id`)

### `quizzes`

- **Purpose:** Quiz attached to a lesson
- **Fields:** `id`, `lesson_id` (FK → lessons), `title`, `description`, `time_limit_seconds` (nullable), `available_from`, `available_until`, `show_correct_answers` (bool), `created_at`, `updated_at`
- **Relationships:** belongs to lesson; has many `quiz_questions`; has many `quiz_assignments`; has many `quiz_submissions`
- **Constraints:** `lesson_id` FK

### `quiz_questions`

- **Purpose:** Individual question in a quiz
- **Fields:** `id`, `quiz_id` (FK → quizzes), `type` (enum: `multiple_choice` | `identification`), `question_text`, `points`, `correct_answer`, `sort_order`, `created_at`, `updated_at`
- **Relationships:** belongs to quiz; has many `quiz_options` (if multiple choice); referenced by `quiz_answers`
- **Constraints:** `quiz_id` FK; `type` in allowed values; `points` > 0

### `quiz_options`

- **Purpose:** Answer options for multiple-choice questions
- **Fields:** `id`, `quiz_question_id` (FK → quiz_questions), `option_text`, `is_correct` (bool), `sort_order`, `created_at`, `updated_at`
- **Relationships:** belongs to quiz_question
- **Constraints:** `quiz_question_id` FK; at least one option marked `is_correct` for MC questions

### `quiz_assignments`

- **Purpose:** Assigns a quiz to specific students (or the whole class)
- **Fields:** `id`, `quiz_id` (FK → quizzes), `student_id` (FK → users, nullable — null = whole class), `assigned_at`, `due_at`, `created_at`, `updated_at`
- **Relationships:** belongs to quiz; belongs to student
- **Constraints:** `quiz_id` FK; unique (`quiz_id`, `student_id`)

### `quiz_submissions`

- **Purpose:** A student's submission of a quiz
- **Fields:** `id`, `quiz_id` (FK → quizzes), `student_id` (FK → users), `started_at`, `submitted_at`, `score` (nullable), `status` (enum: `in_progress` | `submitted` | `graded`), `created_at`, `updated_at`
- **Relationships:** belongs to quiz; belongs to student; has many `quiz_answers`
- **Constraints:** unique (`quiz_id`, `student_id`) — one submission per student per quiz

### `quiz_answers`

- **Purpose:** A student's answer to a single quiz question
- **Fields:** `id`, `quiz_submission_id` (FK → quiz_submissions), `quiz_question_id` (FK → quiz_questions), `answer_text`, `is_correct` (bool, nullable), `awarded_points`, `created_at`, `updated_at`
- **Relationships:** belongs to quiz_submission; belongs to quiz_question
- **Constraints:** unique (`quiz_submission_id`, `quiz_question_id`)

### `lectures`

- **Purpose:** Recorded lecture / video material attached to a lesson
- **Fields:** `id`, `lesson_id` (FK → lessons), `title`, `description`, `video_url`, `duration_seconds`, `required_viewing` (bool), `min_watch_percent` (int), `created_at`, `updated_at`
- **Relationships:** belongs to lesson; has many `lecture_progress`
- **Constraints:** `lesson_id` FK; `min_watch_percent` 0–100

### `lecture_progress`

- **Purpose:** Per-student viewing progress on a lecture
- **Fields:** `id`, `lecture_id` (FK → lectures), `student_id` (FK → users), `watched_percent`, `completed` (bool), `last_watched_at`, `created_at`, `updated_at`
- **Relationships:** belongs to lecture; belongs to student
- **Constraints:** unique (`lecture_id`, `student_id`)

### `student_progress`

- **Purpose:** Aggregated per-student, per-lesson progress summary
- **Fields:** `id`, `lesson_id` (FK → lessons), `student_id` (FK → users), `attendance_status`, `lecture_completed` (bool), `activity_completed` (bool), `quiz_completed` (bool), `quiz_score`, `overall_status`, `updated_at`
- **Relationships:** belongs to lesson; belongs to student
- **Constraints:** unique (`lesson_id`, `student_id`); derived/updated as components complete

### `sync_records`

- **Purpose:** Tracks synchronization state for offline-modified records
- **Fields:** `id`, `record_id`, `record_type`, `device_id`, `action` (enum: `create` | `update` | `delete`), `version`, `sync_status` (enum: `pending` | `syncing` | `synced` | `failed` | `conflict`), `payload` (JSON), `last_error`, `attempts`, `created_at`, `updated_at`, `synced_at`
- **Relationships:** polymorphic reference to any synced record
- **Constraints:** `sync_status` in allowed values; `version` >= 1

---

## Conventions

- All foreign keys use `ON DELETE RESTRICT` (or `CASCADE` where appropriate) — decided per migration
- Soft deletes for `classes` and `lessons` — soft deletes preserve historical records and are particularly important for synchronization and academic history. These tables use `deleted_at` column with application-level queries that filter out deleted records by default. Hard (permanent) deletes are not supported for these entities.
- Enum statuses stored as `VARCHAR` (e.g., `status` varchar(20)) with application-level validation and constraints. This provides schema flexibility while requirements evolve. Laravel model casts and database constraints enforce valid values (e.g., `scheduled`, `active`, `completed`, `cancelled`). Native MySQL `ENUM` is not used to avoid migration complexity when adding new status values.
- Indexes on all FK columns and frequently queried fields (`lesson_date`, `status`, `role`)

**Do not create migrations yet.**