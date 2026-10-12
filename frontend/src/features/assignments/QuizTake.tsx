// QuizTake.tsx — interactive quiz-taking workflow.
// Frontend-only prototype: intro → questions → review → submit → results.
// Answer keys are DEMO client-side data (not secure). No backend, no persistence.
//
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '../../components/common/Icons'
import { formatLongDate } from '../../utils/dates'
import { quizTotalPoints } from './mockData'
import { useAssignments } from './useAssignments'
import type { QuizGrade } from './assignmentsState'
import { assignmentStatusMeta } from './statusMeta'
import type { Quiz, QuizAttempt } from './types'

type Phase = 'intro' | 'taking' | 'review' | 'results'

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

interface QuizTakeProps {
  quiz: Quiz
  onBack: () => void
}

export default function QuizTake({ quiz, onBack }: QuizTakeProps) {
  const { getStatus, getQuizAttempt, startQuiz, setQuizAnswer, submitQuiz } = useAssignments()
  const attempt = getQuizAttempt(quiz.id)
  const status = getStatus(quiz.id)
  const alreadySubmitted = Boolean(attempt?.submittedAt)

  const [phase, setPhase] = useState<Phase>(alreadySubmitted ? 'results' : 'intro')
  const [current, setCurrent] = useState(0)
  const [grade, setGrade] = useState<QuizGrade | null>(null)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    quiz.timeLimitMinutes ? quiz.timeLimitMinutes * 60 : null,
  )
  const submittedRef = useRef(false)

  const totalPoints = useMemo(() => quizTotalPoints(quiz), [quiz])
  const answers = attempt?.answers ?? {}
  const answeredCount = quiz.questions.filter((question) => answers[question.id] !== undefined).length
  const unanswered = quiz.questions.length - answeredCount

  const ensureAttempt = () => {
    if (!getQuizAttempt(quiz.id)) startQuiz(quiz.id)
  }

  const handleSubmit = () => {
    if (submittedRef.current) return
    submittedRef.current = true
    const result = submitQuiz(quiz.id)
    setGrade(result)
    setPhase('results')
  }

  // Countdown for timed quizzes (browser-only; not enforceable security).
  useEffect(() => {
    if (phase !== 'taking' || secondsLeft === null) return
    if (secondsLeft <= 0) {
      handleSubmit()
      return
    }
    const timer = window.setTimeout(
      () => setSecondsLeft((value) => (value === null ? null : value - 1)),
      1000,
    )
    return () => window.clearTimeout(timer)
    // handleSubmit depends on submit results; intentionally run on tick only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft])

  const formatClock = (total: number) => {
    const m = Math.floor(total / 60)
    const s = total % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  // ---- Intro screen --------------------------------------------------------
  if (phase === 'intro') {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <BackLink onBack={onBack} />
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Quiz
              </span>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                {quiz.title}
              </h1>
            </div>
            <span
              className={`inline-flex flex-none rounded-full px-3 py-1 text-xs font-semibold ${assignmentStatusMeta[status].chipClass}`}
            >
              {assignmentStatusMeta[status].label}
            </span>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-neutral-100 py-4 text-sm sm:grid-cols-4">
            <Fact label="Subject" value={quiz.subject} />
            <Fact label="Teacher" value={quiz.teacher} />
            <Fact label="Questions" value={String(quiz.questions.length)} />
            <Fact label="Points" value={String(totalPoints)} />
          </dl>

          <div className="mt-5 space-y-1.5 text-sm text-neutral-600">
            {quiz.dueDate && (
              <p>
                <span className="font-medium text-neutral-700">Due:</span>{' '}
                {formatLongDate(parseISODate(quiz.dueDate))}
              </p>
            )}
            {quiz.timeLimitMinutes && (
              <p className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4 text-neutral-400" />
                Time limit: {quiz.timeLimitMinutes} minutes
              </p>
            )}
            {quiz.grading === 'manual' && (
              <p className="text-amber-700">This quiz is graded manually by your teacher.</p>
            )}
          </div>

          <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="text-sm font-semibold text-neutral-900">Instructions</h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{quiz.instructions}</p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                ensureAttempt()
                setPhase('taking')
              }}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Start quiz
            </button>
          </div>
        </div>
        <TimerNotice />
      </div>
    )
  }

  // ---- Results screen ------------------------------------------------------
  if (phase === 'results') {
    return (
      <QuizResults
        quiz={quiz}
        attempt={attempt}
        grade={grade}
        totalPoints={totalPoints}
        onBack={onBack}
        onRetake={() => {
          setPhase('intro')
          setCurrent(0)
          setGrade(null)
          submittedRef.current = false
          setSecondsLeft(quiz.timeLimitMinutes ? quiz.timeLimitMinutes * 60 : null)
        }}
      />
    )
  }


  // ---- Taking / review -----------------------------------------------------
  const question = quiz.questions[current]
  const isLast = current === quiz.questions.length - 1

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <BackLink onBack={onBack} />

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Progress header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-neutral-500">
            Question {current + 1} of {quiz.questions.length}
          </p>
          {secondsLeft !== null && (
            <p
              className={`flex items-center gap-1.5 text-sm font-semibold ${
                secondsLeft <= 30 ? 'text-red-600' : 'text-neutral-700'
              }`}
            >
              <ClockIcon className="h-4 w-4" />
              {formatClock(secondsLeft)}
            </p>
          )}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">{question.text}</h2>
            <span className="flex-none text-xs font-medium text-neutral-500">
              {question.points} {question.points === 1 ? 'pt' : 'pts'}
            </span>
          </div>

          {question.type === 'multiple-choice' ? (
            <div role="radiogroup" aria-label="Answer choices" className="mt-4 space-y-2">
              {question.choices.map((choice, index) => {
                const selected = answers[question.id] === String(index)
                return (
                  <label
                    key={index}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors duration-150 ${
                      selected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={String(index)}
                      checked={selected}
                      onChange={() => setQuizAnswer(quiz.id, question.id, String(index))}
                      className="h-4 w-4 flex-none accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                    {choice}
                  </label>
                )
              })}
            </div>
          ) : (
            <div className="mt-4">
              <label htmlFor={`answer-${question.id}`} className="text-sm font-medium text-neutral-700">
                Your answer
              </label>
              <input
                id={`answer-${question.id}`}
                type="text"
                value={answers[question.id] ?? ''}
                onChange={(event) => setQuizAnswer(quiz.id, question.id, event.target.value)}
                placeholder="Type your answer…"
                className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          )}
        </div>

        {/* Question navigator */}
        <div className="mt-6 border-t border-neutral-100 pt-4">
          <p className="text-xs font-medium text-neutral-500">Jump to question</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quiz.questions.map((q, index) => {
              const answered = answers[q.id] !== undefined
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-current={index === current ? 'true' : undefined}
                  aria-label={`Question ${index + 1}${answered ? ' (answered)' : ' (unanswered)'}`}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    index === current
                      ? 'bg-indigo-600 text-white'
                      : answered
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </div>


        {/* Navigation / review footer */}
        {phase === 'taking' ? (
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setCurrent((value) => Math.max(0, value - 1))}
              disabled={current === 0}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Previous
            </button>
            {isLast ? (
              <button
                type="button"
                onClick={() => setPhase('review')}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Review &amp; submit
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrent((value) => Math.min(quiz.questions.length - 1, value + 1))}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-4 border-t border-neutral-100 pt-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-sm font-semibold text-amber-900">Review before submitting</h3>
              <p className="mt-1 text-sm text-amber-800">
                {answeredCount} answered · {unanswered} unanswered
                {unanswered > 0 && ' — unanswered questions will be scored as incorrect.'}
              </p>
              {unanswered > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const firstUnanswered = quiz.questions.findIndex(
                      (q) => answers[q.id] === undefined,
                    )
                    setCurrent(firstUnanswered === -1 ? 0 : firstUnanswered)
                    setPhase('taking')
                  }}
                  className="mt-2 text-sm font-medium text-amber-900 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                >
                  Go to first unanswered question
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPhase('taking')}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Back to questions
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Submit quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-neutral-500">{label}</dt>
      <dd className="mt-0.5 font-medium text-neutral-900">{value}</dd>
    </div>
  )
}

function BackLink({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-neutral-600 transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back to Activities &amp; Quizzes
    </button>
  )
}

function TimerNotice() {
  return (
    <p className="text-center text-xs text-neutral-500">
      Note: any timer runs in your browser only. It is not enforced assessment security.
    </p>
  )
}


function QuizResults({
  quiz,
  attempt,
  grade,
  totalPoints,
  onBack,
  onRetake,
}: {
  quiz: Quiz
  attempt: QuizAttempt | undefined
  grade: QuizGrade | null
  totalPoints: number
  onBack: () => void
  onRetake: () => void
}) {
  const reveal = quiz.resultVisibility !== 'never'
  const showScore = reveal && quiz.grading === 'auto' && grade !== null
  const answers = attempt?.answers ?? {}

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <BackLink onBack={onBack} />
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Quiz submitted
        </span>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {quiz.title}
        </h1>

        {quiz.grading === 'manual' ? (
          <div className="mt-5 rounded-xl border border-purple-200 bg-purple-50 p-4">
            <p className="text-sm font-semibold text-purple-900">Awaiting review</p>
            <p className="mt-1 text-sm text-purple-800">
              This quiz is graded by your teacher. Your score will appear here once it is reviewed.
            </p>
          </div>
        ) : showScore ? (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="text-4xl font-semibold tracking-tight text-emerald-700">
              {grade.score}
              <span className="text-xl text-emerald-600"> / {totalPoints}</span>
            </p>
            <p className="mt-1 text-sm font-medium text-emerald-800">
              {grade.correctCount} of {grade.totalQuestions} correct
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm text-neutral-700">
              Your responses were recorded. Scores for this quiz are kept private.
            </p>
          </div>
        )}

        {/* Answer review */}
        {reveal && (
          <div className="mt-6 space-y-3">
            <h2 className="text-sm font-semibold text-neutral-900">Your answers</h2>
            {quiz.questions.map((question, index) => {
              const answer = answers[question.id]
              let correct: boolean | null = null
              if (quiz.grading === 'auto') {
                if (question.type === 'multiple-choice') {
                  correct = Number(answer) === question.correctChoice
                } else {
                  correct =
                    answer !== undefined &&
                    question.acceptedAnswers.some(
                      (accepted) => accepted.trim().toLowerCase() === answer.trim().toLowerCase(),
                    )
                }
              }
              const correctText =
                question.type === 'multiple-choice'
                  ? question.choices[question.correctChoice]
                  : question.acceptedAnswers[0]
              const answerText =
                question.type === 'multiple-choice' && answer !== undefined
                  ? question.choices[Number(answer)]
                  : answer || '—'
              return (
                <div key={question.id} className="rounded-xl border border-neutral-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-neutral-900">
                      {index + 1}. {question.text}
                    </p>
                    {correct === true && (
                      <CheckCircleIcon className="h-5 w-5 flex-none text-emerald-600" />
                    )}
                    {correct === false && (
                      <XCircleIcon className="h-5 w-5 flex-none text-red-500" />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    Your answer: <span className="font-medium text-neutral-800">{answerText}</span>
                  </p>
                  {quiz.grading === 'auto' && correct === false && (
                    <p className="mt-1 text-sm text-emerald-700">
                      Correct answer: <span className="font-medium">{correctText}</span>
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 border-t border-neutral-100 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Back to Activities &amp; Quizzes
          </button>
          {quiz.grading === 'auto' && (
            <button
              type="button"
              onClick={onRetake}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Retake quiz
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-neutral-500">
          Frontend prototype — this attempt is kept only in this browser session. Client-side
          answer keys are demo data and are not secure for real examinations.
        </p>
      </div>
    </div>
  )
}

