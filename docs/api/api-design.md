# API Design

> **Status:** Complete — planning document. **No Laravel routes created yet.**

## Overview

RESTful API served by Laravel under `/api`. All communication is JSON over HTTP. The frontend consumes this API exclusively — it never touches MySQL directly.

**Decision Status:** Planned (actual routes defined when implementation begins)

---

## API Categories

### `/auth`

**Responsibilities:** authentication and session management
- Teacher login / student login
- Logout (token revocation)
- Current authenticated user profile
- Password management (if in scope)

### `/classes`

**Responsibilities:** class CRUD and management (teacher-authorized)
- Create, read, update, delete class
- List classes owned by the teacher
- Class details with enrolled students

### `/students`

**Responsibilities:** student enrollment and roster management
- Enroll student into class
- Remove student from class
- List students in a class
- Student's own class list

### `/lessons`

**Responsibilities:** lesson lifecycle management
- Create, update, delete lesson
- List lessons for a class
- Update lesson status (scheduled → active → completed / cancelled)
- Lesson detail with component overview

### `/attendance`

**Responsibilities:** attendance recording and retrieval
- Record attendance for a lesson (per student)
- Update attendance record
- Retrieve attendance for a lesson
- Retrieve attendance history for a student

### `/activities`

**Responsibilities:** activity creation and submission
- Create, update, delete activity (teacher)
- List activities for a lesson
- Submit activity (student)
- Mark activity complete / add remarks (teacher)
- Manage groups for group activities

### `/quizzes`

**Responsibilities:** quiz creation, assignment, and submission
- Create quiz with questions and options (teacher)
- Update quiz / questions (teacher)
- Assign quiz to class or specific students (teacher)
- Start quiz attempt (student)
- Submit quiz answers (student)
- Retrieve score / results (when permitted)
- Retrieve quiz for taking (student)

### `/lectures`

**Responsibilities:** recorded lecture management and viewing
- Create lecture record with video reference (teacher)
- Update lecture metadata / required-viewing settings (teacher)
- Retrieve lecture for a lesson
- Update viewing progress (student)
- Mark lecture completed (student)

### `/progress`

**Responsibilities:** student progress monitoring
- Retrieve progress summary for a lesson (teacher)
- Retrieve progress summary for a student (teacher)
- Retrieve own progress (student, when permitted)
- Aggregated dashboard data (teacher)

### `/synchronization`

**Responsibilities:** offline synchronization endpoints
- Bulk sync of queued operations
- Retrieve server changes since a timestamp/version
- Conflict detection and resolution endpoints
- Device registration

**Decision Status:** Planned / To Be Finalized (exact endpoint shapes)

---

## Cross-Cutting Concerns

### Authentication

- Laravel Sanctum Bearer token authentication
- Token sent as `Authorization: Bearer <token>`
- Unauthenticated requests rejected with `401 Unauthorized`

### Authorization

- Role-based (teacher / student) enforced via Middleware and Policies
- Teachers: management operations within owned classes only
- Students: read/submit operations within enrolled classes only
- Unauthorized access rejected with `403 Forbidden`

### Request Validation

- Declarative FormRequest validation per endpoint
- Validation failures rejected with `422 Unprocessable Entity`
- Validation error responses include field-level messages

### Response Format

Successful responses follow a consistent JSON envelope:

```json
{
  "success": true,
  "data": { },
  "message": "optional"
}
```

List responses include pagination metadata:

```json
{
  "success": true,
  "data": [ ],
  "meta": { "current_page": 1, "per_page": 15, "total": 100 }
}
```

**Decision Status:** Planned / To Be Finalized (exact envelope shape)

### Error Handling

Error responses follow a consistent JSON shape:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": { }
  }
}
```

**Decision Status:** Planned / To Be Finalized (exact error shape)

### HTTP Status Conventions

| Status | Usage |
|--------|-------|
| `200 OK` | Successful read/update |
| `201 Created` | Successful create |
| `204 No Content` | Successful delete |
| `400 Bad Request` | Malformed request |
| `401 Unauthorized` | Missing/invalid authentication |
| `403 Forbidden` | Authenticated but not authorized |
| `404 Not Found` | Resource not found |
| `409 Conflict` | Conflict (e.g., sync version conflict) |
| `422 Unprocessable Entity` | Validation failure |
| `429 Too Many Requests` | Rate limiting |
| `500 Internal Server Error` | Server error |

**Decision Status:** Planned

---

## Rules

1. All endpoints live under `/api`
2. All endpoints require Sanctum authentication (except login)
3. Teachers cannot access other teachers' classes
4. Students cannot access resources outside enrolled classes
5. The frontend never connects to MySQL — only to this API

**Do not write actual Laravel routes yet.**