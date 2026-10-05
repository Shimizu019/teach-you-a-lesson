# Classes

> **Status:** Complete — planning document. **No implementation yet.**

## Overview

A class is the top-level organizational unit. A teacher creates classes; students are enrolled into them.

## Teacher Creates Class

- Only authenticated **teachers** can create classes
- A class is owned by exactly one teacher (`classes.teacher_id`)
- The teacher owns all content created within the class (lessons, activities, quizzes, lectures)

## Class Fields

| Field | Description |
|-------|-------------|
| **Name** | Class name (required) |
| **Section** | Section identifier (required) |
| **Subject** | Subject taught (required) |
| **Description** | Optional additional description |

**Decision Status:** Planned (final field set may expand)

## Student Enrollment

- Teacher adds/removes students from the class
- Enrollment creates a `class_members` record (unique per class + student)
- A student can be enrolled in multiple classes
- Enrollment is the boundary for student access — a student only sees enrolled classes

## Class Membership

```text
Teacher (owner)
  │ 1
  │
  ├── Class
  │     │ M
  │     ├── Class Members (students)
  │     └── Lessons
  │           ├── Attendance
  │           ├── Activity
  │           ├── Lecture
  │           └── Quiz
  │
  └── (students access only enrolled classes)
```

## Teacher Ownership

- The teacher who created the class is its owner
- Only the owning teacher can modify the class and its content
- Ownership enforced by `ClassPolicy`

## Rules

1. Teachers can only manage their own classes
2. Students can only access enrolled classes
3. Removing a student revokes their access to class content (retains historical records)

**Do not implement it.**