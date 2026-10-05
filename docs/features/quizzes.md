# Quizzes

> **Status:** Complete — planning document. **No quiz engine implemented.**

## Overview

Quizzes assess student understanding within a lesson. Teachers create and assign quizzes; students take them.

## Supported Question Types (Initial)

```text
Multiple Choice
Identification
```

| Type | Answering |
|------|-----------|
| **Multiple Choice** | Student selects one option from `quiz_options` |
| **Identification** | Student types a free-text answer |

**Decision Status:** Planned (additional types — e.g., true/false, essay — not yet discussed)

## Quiz Creation

- Teacher creates a quiz attached to a lesson
- Quiz fields: title, description, time limit (optional), availability window, correct-answer visibility
- One quiz per lesson (initially)

## Question Management

- Teacher adds questions to the quiz
- Each question: type, question text, points, sort order
- Multiple-choice questions have options with one correct answer
- Identification questions have a `correct_answer` reference

## Assignment

- Quiz can be assigned to the whole class or specific students (`quiz_assignments`)
- Assignment has an assigned time and due time

## Timer

- Optional time limit per quiz (`time_limit_seconds`)
- Timer starts when the student begins the attempt
- Behavior on timeout (auto-submit vs discard) — **Decision Status: To Be Finalized**

## Submission

- Student starts an attempt → `quiz_submissions` record created
- Answers stored per question (`quiz_answers`)
- One submission per student per quiz (unique constraint)

## Automatic Scoring

- **Multiple Choice:** scored automatically (compare selected option to correct answer)
- **Identification:** scored automatically if the answer matches the reference (`correct_answer`); otherwise may require teacher review
- **Decision Status:** Planned (exact matching rules for identification — e.g., case sensitivity, tolerance — To Be Finalized)

## Results

- After submission, score is calculated and stored
- Score visibility to the student is controlled by `show_correct_answers` (per-quiz setting)
- Teacher can view all submissions and scores for the quiz

## Correct Answer Visibility

- Controlled per quiz (`show_correct_answers`)
- When enabled: student can see correct answers after submission
- When disabled: student sees score only (or nothing until teacher releases)
- **Decision Status:** Planned

## Student Completion

- A student's quiz is complete once the submission is finalized
- Completion recorded in `student_progress.quiz_completed`
- Quiz completion is independent of attendance (see `attendance.md`)

## Rules

1. Quizzes are scoped to a lesson
2. Teachers manage quizzes only within owned classes
3. Students take only assigned quizzes within enrolled classes
4. One submission per student per quiz
5. Quiz submission supports offline operation with queued sync (for already-synchronized quizzes)

**Do not implement the quiz engine.**