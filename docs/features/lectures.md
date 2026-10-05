# Lectures

> **Status:** Complete — planning document. **No video functionality implemented.**

## Overview

Lectures represent recorded video material (and/or lecture materials) attached to a lesson. Students watch lectures to progress toward quiz completion.

## Lecture Materials

- Reference material attached to a lecture (links, documents)
- **Decision Status:** Planned (material types not yet finalized)

## Recorded Video

- A lecture references a recorded video (`video_url`)
- Video hosting/storage approach — **Decision Status: To Be Finalized** (external host vs self-hosted)

## Lesson Relationship

- A lecture belongs to exactly one lesson (`lectures.lesson_id`)
- One lesson → one lecture (initially)

## Viewing Progress

- Per-student progress tracked in `lecture_progress`
- `watched_percent` — how much of the video the student has watched
- `last_watched_at` — when the student last watched
- Unique per lecture + student

## Required Viewing

- A lecture can be marked `required_viewing`
- When required: the student must reach `min_watch_percent` to mark the lecture complete
- When not required: viewing is optional/for review

## Video Completion

- The lecture is marked `completed` when `watched_percent` reaches the required threshold
- Completion recorded in `lecture_progress.completed` and reflected in `student_progress.lecture_completed`

## Quiz Dependency (Planned Flow)

```text
Lecture
  ↓
Required viewing
  ↓
Lecture completed
  ↓
Quiz unlocked
  ↓
Quiz completed
  ↓
Lecture becomes reviewable
```

- The quiz for a lesson may be **gated** behind lecture completion
- Once the lecture is completed, the quiz becomes available
- Once the quiz is completed, the lecture becomes available for review (re-watching)
- **Decision Status:** Planned / To Be Finalized (exact gating rules)

## Video Restrictions — Important Note

Video restrictions (required viewing, gating) are **configurable behaviors**, not an absolute anti-cheating mechanism.

- Restrictions guide the intended learning flow
- They should **not** be treated as a guarantee against skipping or cheating
- Settings are per-lecture and configurable by the teacher
- The system should avoid over-promising enforcement guarantees

**Decision Status:** Planned

## Offline Behavior

- Recorded lectures may be **cached/downloaded while online** before they can be viewed offline
- Without prior caching, offline lecture viewing is not available
- See `offline-architecture.md`

## Rules

1. Lectures are scoped to a lesson
2. Teachers manage lectures only within owned classes
3. Students view lectures only within enrolled classes
4. Viewing progress is per-student and unique per lecture

**Do not implement video functionality.**