# Offline Architecture

> **Status:** Complete — architecture planning document. **Core requirement.**

## Offline-First Behavior

```text
ONLINE
  ↓
Local data + server data synchronized
  ↓
OFFLINE
  ↓
Application continues supported operations
  ↓
Changes stored locally
  ↓
INTERNET RETURNS
  ↓
Synchronization queue
  ↓
Server validation
  ↓
Database update
  ↓
Local record marked synchronized
```

## Key Components

### IndexedDB

Browser-native local database used for:
- **Cached records** — read-only snapshots of server data for offline display
- **Local changes** — records created/edited while offline, with sync metadata
- **Sync queue** — ordered list of pending operations awaiting upload
- **Metadata store** — device id, last sync timestamps, schema version

The frontend reads from IndexedDB when offline and from the API when online; the UI treats them as one data source via `services/storage/`.

### Local Records

Each locally-modified record carries sync metadata:

```text
record_id      ← stable client-generated or server-assigned identifier
device_id      ← device that created/modified the record
created_at     ← local creation timestamp
updated_at     ← local last-modified timestamp
version        ← integer, incremented on each local edit
sync_status    ← Pending | Syncing | Synced | Failed | Conflict
```

### Sync Queue

A FIFO queue of operations stored in IndexedDB:
- Each entry: `{ operation_id, record_id, action (create/update/delete), payload, attempts, status }`
- Processed sequentially when connectivity returns
- Entries remain in the queue until confirmed synced or explicitly failed

### Sync Status (per record)

| State | Meaning |
|-------|---------|
| `Pending` | Change saved locally, waiting to upload |
| `Syncing` | Currently being sent to server |
| `Synced` | Confirmed on server; local matches remote |
| `Failed` | Upload failed after retries; needs attention |
| `Conflict` | Server and local diverged; requires resolution |

### Retry Handling

- Failed uploads retry with exponential backoff
- Max retry threshold before marking `Failed`
- Network errors → auto-retry; validation errors → mark `Failed` (no retry)
- Failed items surface in a sync-status UI for user visibility

### Timestamps

- Every record stores `created_at` and `updated_at`
- Server timestamps are authoritative after sync
- Local timestamps preserve offline ordering

### Device Identification

- Each device registers a `device_id` on first launch (stored in IndexedDB)
- `device_id` is attached to every outgoing sync payload
- Enables conflict detection and audit trails

### Record Versions

- `version` is an integer incremented on every local modification
- Server compares versions to detect concurrent edits
- Version mismatch on upload → potential conflict

### Conflict Detection

A conflict is detected when:
- An incoming sync request references a record whose server `version` differs from the version the client last saw
- Or the same record was modified on two different devices since last sync

### Conflict Resolution Concept

**Decision Status: Planned / To Be Finalized**

Options being considered (not yet chosen):
- **Last-write-wins** — most recent timestamp takes precedence (simple, may lose data)
- **Server-wins** — server state is authoritative; local change is discarded/overwritten
- **Manual resolution** — present conflict to user, require explicit choice
- **Field-level merge** — merge non-overlapping field changes

The final strategy must be decided before Phase 12 (Synchronization) implementation.

## Supported Offline Operations (Initial Scope)

| Operation | Offline Support |
|-----------|-----------------|
| View cached lessons/materials | Yes |
| Mark attendance | Yes (queued) |
| Complete activities | Yes (queued) |
| Take already-synchronized quizzes | Yes (queued submission) |
| View recorded lectures | Only if cached/downloaded while online |
| Create/edit classes, enroll students | Pending decision |
| Upload new video/material | No (requires connectivity) |

**Decision Status:** Final (subject to review per feature)

## Rules

1. Offline changes are never silently discarded
2. The sync queue is the single source of truth for pending operations
3. Every local record carries sync metadata
4. Conflicts are detected explicitly, not resolved silently
5. The UI must indicate offline status and pending sync count

**Do not implement synchronization yet.**