// ActivityDetail.tsx — activity information + student submission workflow.
// Frontend-only prototype: draft & submit in session state, local file preview
// only. No backend, no permanent storage, no server upload.
//
import { useRef, useState } from 'react'
import { ArrowLeftIcon, ClockIcon, PaperclipIcon, UploadIcon } from '../../components/common/Icons'
import { formatLongDate, isToday } from '../../utils/dates'
import { useAssignments } from './useAssignments'
import { assignmentStatusMeta } from './statusMeta'
import type { Activity } from './types'

const ACCEPT_LABELS: Record<string, string> = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/webp': 'WebP',
  'application/pdf': 'PDF',
  'application/zip': 'ZIP',
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

interface ActivityDetailProps {
  activity: Activity
  onBack: () => void
}

export default function ActivityDetail({ activity, onBack }: ActivityDetailProps) {
  const { getStatus, getActivitySubmission, saveActivityDraft, submitActivity } = useAssignments()
  const existing = getActivitySubmission(activity.id)
  const status = getStatus(activity.id)
  const submitted = Boolean(existing?.submittedAt)

  const [text, setText] = useState(existing?.text ?? '')
  const [file, setFile] = useState<{ name: string; size: number } | undefined>(existing?.file)
  const [fileError, setFileError] = useState<string | null>(null)
  const [textError, setTextError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptsText = activity.submissionMethods.includes('text')
  const acceptsFile = activity.submissionMethods.includes('file')

  const validate = (): boolean => {
    let ok = true
    setTextError(null)
    setFileError(null)
    if (activity.requireText && acceptsText && text.trim().length === 0) {
      setTextError('A written response is required for this activity.')
      ok = false
    }
    if (activity.requireFile && acceptsFile && !file) {
      setFileError('A file attachment is required for this activity.')
      ok = false
    }
    return ok
  }

  const handleSaveDraft = () => {
    saveActivityDraft(activity.id, { text, file })
    setNotice('Draft saved for this session. It is not stored permanently.')
  }

  const handleSubmit = () => {
    if (!validate()) return
    submitActivity(activity.id, { text, file })
    setNotice(null)
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    event.target.value = ''
    if (!selected) return
    setFileError(null)
    if (activity.acceptedFileTypes && !activity.acceptedFileTypes.includes(selected.type)) {
      setFileError('Unsupported file type for this activity.')
      return
    }
    if (activity.maxFileSizeBytes && selected.size > activity.maxFileSizeBytes) {
      setFileError(`File is too large. Maximum ${formatBytes(activity.maxFileSizeBytes)}.`)
      return
    }
    setFile({ name: selected.name, size: selected.size })
  }
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-neutral-600 transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Activities &amp; Quizzes
      </button>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Activity
            </span>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {activity.title}
            </h1>
          </div>
          <span
            className={`inline-flex flex-none rounded-full px-3 py-1 text-xs font-semibold ${assignmentStatusMeta[status].chipClass}`}
          >
            {assignmentStatusMeta[status].label}
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-3 border-y border-neutral-100 py-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-neutral-500">Subject</dt>
            <dd className="mt-0.5 font-medium text-neutral-900">{activity.subject}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-neutral-500">Teacher</dt>
            <dd className="mt-0.5 font-medium text-neutral-900">{activity.teacher}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-neutral-500">Assigned</dt>
            <dd className="mt-0.5 font-medium text-neutral-900">
              {formatLongDate(parseISODate(activity.assignedDate))}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-neutral-500">Due</dt>
            <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-neutral-900">
              {activity.dueDate ? (
                <>
                  <ClockIcon className="h-4 w-4 text-neutral-400" />
                  {formatLongDate(parseISODate(activity.dueDate))}
                  {isToday(activity.dueDate) && <span className="text-amber-600">(today)</span>}
                </>
              ) : (
                'No due date'
              )}
            </dd>
          </div>
          {typeof activity.maxPoints === 'number' && (
            <div>
              <dt className="text-xs font-medium text-neutral-500">Points</dt>
              <dd className="mt-0.5 font-medium text-neutral-900">{activity.maxPoints} pts</dd>
            </div>
          )}
        </dl>

        <div className="mt-5">
          <h2 className="text-sm font-semibold text-neutral-900">Instructions</h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{activity.instructions}</p>
        </div>
      </div>


      {/* Submission area */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">Your submission</h2>

        {submitted ? (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Submitted — awaiting review</p>
              <p className="mt-1 text-xs text-emerald-700">
                {existing?.submittedAt
                  ? `Submitted ${new Date(existing.submittedAt).toLocaleString()}`
                  : 'Submitted'}
                . There is no grade yet — this prototype does not store submissions or scores.
              </p>
            </div>
            {acceptsText && existing?.text && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Your response
                </h3>
                <p className="mt-1 whitespace-pre-wrap rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                  {existing.text}
                </p>
              </div>
            )}
            {existing?.file && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Attachment
                </h3>
                <p className="mt-1 flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
                  <PaperclipIcon className="h-4 w-4" />
                  {existing.file.name} · {formatBytes(existing.file.size)}
                </p>
              </div>
            )}
          </div>
        ) : (

          <div className="mt-4 space-y-5">
            {acceptsText && (
              <div>
                <label htmlFor="activity-response" className="text-sm font-medium text-neutral-700">
                  Written response
                  {activity.requireText && <span className="text-red-600"> *</span>}
                </label>
                <textarea
                  id="activity-response"
                  rows={6}
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value)
                    if (textError) setTextError(null)
                  }}
                  aria-invalid={Boolean(textError)}
                  aria-describedby={textError ? 'activity-response-error' : undefined}
                  placeholder="Type your answer here…"
                  className={`mt-1.5 w-full rounded-xl border bg-white p-3.5 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                    textError
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-neutral-200 hover:border-neutral-300 focus:border-indigo-500 focus:ring-indigo-500/30'
                  }`}
                />
                {textError && (
                  <p id="activity-response-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                    {textError}
                  </p>
                )}
              </div>
            )}

            {acceptsFile && (
              <div>
                <span className="text-sm font-medium text-neutral-700">
                  File attachment
                  {activity.requireFile && <span className="text-red-600"> *</span>}
                </span>
                <div className="mt-1.5">
                  <input
                    ref={fileInputRef}
                    id="activity-file"
                    type="file"
                    accept={(activity.acceptedFileTypes ?? []).join(',')}
                    onChange={handleFile}
                    className="sr-only"
                  />
                  <label
                    htmlFor="activity-file"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500"
                  >
                    <UploadIcon className="h-4 w-4" />
                    {file ? 'Replace file' : 'Choose file'}
                  </label>
                  {file && (
                    <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                      <span className="flex min-w-0 items-center gap-2 text-sm text-neutral-700">
                        <PaperclipIcon className="h-4 w-4 flex-none text-neutral-400" />
                        <span className="truncate">{file.name}</span>
                        <span className="flex-none text-xs text-neutral-500">
                          {formatBytes(file.size)}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFile(undefined)}
                        className="flex-none rounded-md text-xs font-medium text-red-600 transition-colors duration-150 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {activity.acceptedFileTypes && (
                    <p className="mt-1.5 text-xs text-neutral-500">
                      Allowed:{' '}
                      {activity.acceptedFileTypes.map((type) => ACCEPT_LABELS[type] ?? type).join(', ')}
                      {activity.maxFileSizeBytes ? ` · max ${formatBytes(activity.maxFileSizeBytes)}` : ''}
                    </p>
                  )}
                  {fileError && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {fileError}
                    </p>
                  )}
                </div>
              </div>
            )}

            {notice && (
              <p role="status" className="rounded-xl bg-sky-50 p-3 text-xs font-medium text-sky-700">
                {notice}
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t border-neutral-100 pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Submit activity
              </button>
            </div>
            <p className="text-xs text-neutral-500">
              Frontend prototype — drafts and submissions are kept only in this browser session and
              are never uploaded or stored permanently.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

