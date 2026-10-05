# Synchronization

> **Status:** Complete — planning document. **No synchronization implemented.**

## Overview

Synchronization reconciles local (IndexedDB) changes with the server (MySQL) when connectivity is available. This is a core requirement of the system.

See also: `docs/architecture/offline-architecture.md`

## Local Change Metadata

Every locally-modified record carries:

```text
record_id      ← stable identifier
device_id      ← device that made the change
created_at     ← creation timestamp
updated_at     ← last-modified timestamp
version        ← integer, incremented per edit
sync_status    ← current synchronization state
```

## Sync Status States

```text
Pending
Syncing
Synced
Failed
Conflict
```

| State | Meaning |
|-------|---------|
| `Pending` | Saved locally, awaiting upload |
| `Syncing` | Currently uploading |
| `Synced` | Confirmed on server |
| `Failed` | Upload failed after retries |
| `Conflict` | Server and local diverged |

## Scenario Responses

### Internet Disappears

- API requests fail or are intercepted
- Supported operations continue against local IndexedDB data
- Changes written to IndexedDB with `sync_status = Pending`
- UI indicates offline state and pending change count

### Internet Returns

- Connectivity detection triggers the sync queue
- Queue processes `Pending` entries in order
- Each entry: `Pending → Syncing → Synced` (on success)
- Server applies validated changes to MySQL
- Local record marked `Synced`

### Sync Fails

- Network errors → retry with exponential backoff
- Validation errors → mark `Failed` (no retry; requires attention)
- Exceeding max retries → mark `Failed`
- Failed items surfaced in a sync-status UI

### Same Record Changed on Multiple Devices

- Each device increments its own `version`
- Server detects version mismatch on upload
- Mismatch → mark `Conflict`
- Conflict resolution follows the strategy in `offline-architecture.md` (To Be Finalized)

### Record Deleted Offline

- Local deletion queued as a `delete` operation
- On sync: server performs the deletion (subject to authorization)
- If the record was already deleted server-side → treat as `Synced` (idempotent) or `Conflict`
- **Decision Status:** Planned / To Be Finalized (exact delete-conflict handling)

### Record Updated Both Locally and Remotely

- Server version differs from the client's last-known version
- Detected as a conflict on upload
- Resolution strategy applies (last-write-wins / server-wins / manual / merge — To Be Finalized)

## Sync Flow

```text
Local change
  ↓
Pending
  ↓ (connectivity returns)
Syncing
  ↓ (server validates + applies)
Database updated
  ↓
Synced
  ↓ (on mismatch)
Conflict → resolution
```

## Rules

1. Local changes are never silently discarded
2. Every local record carries full sync metadata
3. Conflicts are detected explicitly, not resolved silently
4. Sync is idempotent where possible (safe to retry)
5. Offline is a first-class state, not an error

**Do not implement synchronization.**