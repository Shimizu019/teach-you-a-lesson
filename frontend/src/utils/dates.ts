// dates.ts — shared date helpers for the UI prototype.
// All "today" comparisons use the browser/device local date, never a hardcoded date.
//

/** Start of the local day for the given date (local midnight). */
export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** ISO calendar date (YYYY-MM-DD) in the device's local timezone. */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * ISO calendar date `offset` days from today (0 = today, -1 = yesterday).
 * Demo mock data uses this so dated records stay meaningful whenever the app is opened.
 */
export function isoDaysFromNow(offset: number): string {
  const date = startOfLocalDay(new Date())
  date.setDate(date.getDate() + offset)
  return toLocalISODate(date)
}

/** True when the ISO date string equals the device's current local day. */
export function isToday(isoDate: string, today = new Date()): boolean {
  return isoDate === toLocalISODate(today)
}

/** Local-time ISO timestamp for chronological sorting of demo activity feeds. */
export function localTimestamp(isoDate: string, hour: number, minute = 0): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day, hour, minute).toISOString()
}

/** Human-readable long date, e.g. "Thursday, October 8, 2026". */
export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/** Human-readable short date, e.g. "Oct 15". */
export function formatShortDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
    new Date(year, month - 1, day),
  )
}
