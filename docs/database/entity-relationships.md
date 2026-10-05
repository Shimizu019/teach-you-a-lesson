# Entity Relationships

> **Status:** Complete — planning document. **No migrations created yet.**

## High-Level Relationships

```text
Teacher
  ↓
Classes
  ↓
Students

Class
  ↓
Lessons

Lesson
  ├── Attendance
  ├── Activity
  ├── Lecture
  └── Quiz

Quiz
  ↓
Questions
  ↓
Student Submissions

Activity
  ├── Individual Student
  └── Group
```

## Detailed Relationships

### Teacher → Classes → Students

```text
users (role=teacher)
  │  1
  │  └───────┐
  │    1     │ owns
  │          ▼
  │        classes
  │          │ 1
  │          │ └──── enrollment
  │          │    M
  │          ▼
  │      class_members  M
  │          │
  │          ▼ 1
  └──── users (role=student)
```

- A **teacher** owns **many classes** (`classes.teacher_id`)
- A **class** has **many students** through `class_members`
- A **student** can belong to **many classes**
- `class_members` unique (`class_id`, `student_id`)

### Class → Lessons

- A **class** has **many lessons** (`lessons.class_id`)
- A **lesson** belongs to exactly **one class**

### Lesson → Components

A **lesson** is the container for all lesson-scoped content:

| Component | Cardinality | Table |
|-----------|-------------|-------|
| Attendance | 1 lesson → many student records | `attendance` |
| Activity | 1 lesson → 0..1 activity | `activities` |
| Lecture | 1 lesson → 0..1 lecture | `lectures` |
| Quiz | 1 lesson → 0..1 quiz | `quizzes` |

- **Attendance:** 1 lesson → M attendance rows (one per student)
- **Activity:** 1 lesson → 1 activity (optional)
- **Lecture:** 1 lesson → 1 lecture (optional)
- **Quiz:** 1 lesson → 1 quiz (optional)

### Quiz → Questions → Student Submissions

```text
quizzes
  │ 1
  │ └──── questions (M)
  │         │ 1
  │         │ └──── options (M, for multiple choice)
  │
  └──── quiz_assignments (M)
  │
  └──── quiz_submissions (M)
            │ 1
            └──── quiz_answers (M)
```

- A **quiz** has **many questions** (`quiz_questions.quiz_id`)
- A **question** (multiple choice) has **many options** (`quiz_options.quiz_question_id`)
- A **quiz** has **many submissions** (`quiz_submissions.quiz_id`)
- A **submission** has **many answers** (`quiz_answers.quiz_submission_id`)
- Each answer references exactly **one question**
- One submission per student per quiz (unique `quiz_id`, `student_id`)

### Activity → Individual Student / Group

```text
activities
  │
  ├── type = individual
  │     └──── (submissions tracked per student)
  │
  └── type = group
        └──── activity_groups (M)
                 │ 1
                 └──── activity_group_members (M)
                          │
                          └──── students
```

- **Individual activity:** completion tracked directly against the student
- **Group activity:** has **many groups** (`activity_groups.activity_id`)
- A **group** has **many members** (`activity_group_members.activity_group_id`)
- Unique (`activity_group_id`, `student_id`)

### Lecture → Viewing Progress

- A **lecture** has **many lecture_progress** rows (one per student)
- Unique (`lecture_id`, `student_id`)
- Tracks `watched_percent` and `completed` status

### Student Progress Aggregation

- `student_progress` is a **derived summary** per (`lesson_id`, `student_id`)
- Aggregates: attendance status, lecture completion, activity completion, quiz completion, quiz score
- Updated as components are completed

### Sync Records

- `sync_records` references any record **polymorphically** via `record_id` + `record_type`
- Not a hard FK — used for synchronization bookkeeping

## Cardinality Summary

| Relationship | Type |
|--------------|------|
| Teacher → Classes | 1 : M |
| Class → Class Members | 1 : M |
| Student → Class Members | 1 : M |
| Class → Lessons | 1 : M |
| Lesson → Attendance | 1 : M |
| Lesson → Activity | 1 : 0..1 |
| Lesson → Lecture | 1 : 0..1 |
| Lesson → Quiz | 1 : 0..1 |
| Quiz → Questions | 1 : M |
| Question → Options | 1 : M |
| Quiz → Submissions | 1 : M |
| Submission → Answers | 1 : M |
| Activity → Groups | 1 : M |
| Group → Members | 1 : M |
| Lecture → Progress | 1 : M |
| Lesson → Student Progress | 1 : M |

This document should be sufficient to author the database schema during Phase 1.