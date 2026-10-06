# Authentication

> **Status:** Complete — planning document. **No authentication code implemented.**

## Roles

The system has two initial core roles:

```text
Teacher
Student
```

No additional roles (Administrator, etc.) are part of the initial implementation. The authentication architecture remains extensible for future roles if needed.

---

## Teacher

- Has access to management functions: create classes, add students, manage lessons, record attendance, create activities/quizzes, upload lectures, monitor progress
- Only manages classes they own (`classes.teacher_id`)
- Can view scores, completion status, and progress for students within their classes

## Student

- Has restricted access — only resources they are authorized to access
- Can view lessons in enrolled classes
- Can submit activities, take quizzes, view permitted scores
- Can view own progress
- Cannot access management functions or other students' data

## Role / Permission Concept

- Role stored on the `users` table as `role` (`teacher` | `student`)
- Route groups enforce role boundaries (teacher routes vs student routes)
- Per-resource authorization handled by **Policies** (e.g., `ClassPolicy`, `LessonPolicy`)

| Function | Teacher | Student |
|----------|---------|---------|
| Create/edit class | ✅ (own classes only) | ❌ |
| Enroll/remove student | ✅ (own classes only) | ❌ |
| Create/edit lessons | ✅ (own classes) | ❌ |
| Record attendance | ✅ (own classes) | ❌ |
| Create activities/quizzes | ✅ (own classes) | ❌ |
| View lessons | ✅ (own classes) | ✅ (enrolled only) |
| Submit activities | ❌ | ✅ (enrolled only) |
| Take quizzes | ❌ | ✅ (enrolled only) |
| View own scores | ❌ | ✅ (when permitted) |
| View class progress | ✅ (own classes) | ❌ |

## Laravel Sanctum (Planned Use)

- **Token-based authentication** for the REST API (SPA/mobile-friendly)
- On login: verify credentials → issue personal access token
- Token attached to requests as `Authorization: Bearer <token>`
- Frontend stores the token securely (memory + IndexedDB for offline)
- Token revocation on logout
- **Decision Status:** Planned (finalization with implementation)

## Access Control Rules

1. Unauthenticated users cannot access protected endpoints (`401`)
2. Authenticated users can only access resources within their role's scope (`403`)
3. Teachers can only manage their own classes
4. Students can only access enrolled classes and their own data
5. Authorization enforced in Middleware + Policies — never trusted from the client

**Do not implement authentication.**