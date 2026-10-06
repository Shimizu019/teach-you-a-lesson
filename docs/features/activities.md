# Activities

> **Status:** Complete — planning document. **No implementation yet.**

## Overview

Activities are tasks assigned to students within a lesson. They can be individual or group-based.

## Individual Activities

- Each enrolled student works on the activity independently
- Completion tracked per student
- Submission recorded per student

## Group Activities

- Teacher organizes students into **groups**
- Each group has members (`activity_groups` + `activity_group_members`)
- Completion tracked at the group level
- Unique membership: a student belongs to one group per activity

## Activity Fields

| Field | Description |
|-------|-------------|
| **Title** | Activity name (required) |
| **Description** | Instructions / details |
| **Type** | `individual` or `group` |
| **Start date/time** | When the activity opens |
| **Deadline** | When submissions close |

## Start Date / Deadline

- **Start date/time:** activity becomes available at this time
- **Deadline:** submissions close at this time
The system should support teacher-controlled late submission behavior:

- Teacher decides whether late submissions are accepted
- If accepted, teacher can set penalty policies (e.g., 10% per day)
- If not accepted, submissions after the deadline are rejected
- Late submissions are queued for synchronization when connectivity returns

This approach is particularly important for the offline-first nature of the system, where students may complete work offline and submit when connectivity is restored.

**Decision Status:** Final (teacher-controlled)

## Extension / Continuation

- Teacher may extend the deadline or reopen an activity (continuation)
- Extensions apply to all assigned students/groups
- Prior submissions remain valid
- **Decision Status:** Planned / To Be Finalized (extension workflow details)

## Completion Status

Tracked per student (individual) or per group (group):

```text
Not Started
In Progress
Completed
```

**Decision Status:** Planned (exact status set may vary)

## Teacher Remarks

- Teacher can add remarks to a student's or group's activity
- Remarks visible to the student (when permitted)
- Remarks are part of the activity record

## Rules

1. Activities are scoped to a lesson
2. Teachers manage activities only within owned classes
3. Students submit only within enrolled classes and within the open window
4. Activities support offline completion with queued sync

**Do not implement activity functionality.**