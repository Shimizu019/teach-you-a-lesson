// AssignmentsContext — shared SESSION-ONLY state for the interactive Activities &
// Quizzes prototype. Frontend-only; no backend, no persistence.
//
// Purpose: a single source of truth for the student's live progress (activity
// drafts/submissions and quiz attempts) so the listing page, submission/quiz
// flows, and the dashboard never contradict each other during a session.
//
// This state lives in memory only and resets on reload. It does NOT store
// drafts, attachments, or submissions permanently, and makes no API calls.
//
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { activities, allAssignments, quizzes, quizTotalPoints } from './mockData'
import { DUE_SOON_DAYS, daysUntilDue, isFinishedStatus, normalizeAnswer } from './assignmentUtils'
import {
  AssignmentsContext,
  type AssignmentsContextValue,
} from './assignmentsState'
import type { ActivitySubmission, QuizAttempt } from './types'

export function AssignmentsProvider({ children }: { children: ReactNode }) {
  const [activitySubmissions, setActivitySubmissions] = useState<Record<string, ActivitySubmission>>({})
  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>({})

  const getActivitySubmission = useCallback(
    (id: string) => activitySubmissions[id],
    [activitySubmissions],
  )
  const getQuizAttempt = useCallback((id: string) => quizAttempts[id], [quizAttempts])

  const saveActivityDraft = useCallback<AssignmentsContextValue['saveActivityDraft']>((id, data) => {
    setActivitySubmissions((prev) => ({
      ...prev,
      [id]: {
        text: data.text,
        file: data.file,
        savedDraftAt: new Date().toISOString(),
        submittedAt: prev[id]?.submittedAt,
      },
    }))
  }, [])

  const submitActivity = useCallback<AssignmentsContextValue['submitActivity']>((id, data) => {
    setActivitySubmissions((prev) => ({
      ...prev,
      [id]: {
        text: data.text,
        file: data.file,
        savedDraftAt: prev[id]?.savedDraftAt,
        submittedAt: new Date().toISOString(),
      },
    }))
  }, [])

  const startQuiz = useCallback((id: string) => {
    setQuizAttempts((prev) => (prev[id] ? prev : { ...prev, [id]: { answers: {}, startedAt: new Date().toISOString() } }))
  }, [])

  const setQuizAnswer = useCallback((id: string, questionId: string, value: string) => {
    setQuizAttempts((prev) => {
      const existing = prev[id] ?? { answers: {}, startedAt: new Date().toISOString() }
      return { ...prev, [id]: { ...existing, answers: { ...existing.answers, [questionId]: value } } }
    })
  }, [])

  const gradeQuiz = useCallback<AssignmentsContextValue['gradeQuiz']>((quiz, attempt) => {
    let score = 0
    let correctCount = 0
    for (const question of quiz.questions) {
      const answer = attempt.answers[question.id]
      if (answer === undefined) continue
      let correct = false
      if (question.type === 'multiple-choice') {
        correct = Number(answer) === question.correctChoice
      } else {
        correct = question.acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer))
      }
      if (correct) {
        score += question.points
        correctCount += 1
      }
    }
    return {
      score,
      totalPoints: quizTotalPoints(quiz),
      correctCount,
      totalQuestions: quiz.questions.length,
      autoGraded: quiz.grading === 'auto',
    }
  }, [])

  const submitQuiz = useCallback<AssignmentsContextValue['submitQuiz']>(
    (id) => {
      const quiz = quizzes.find((entry) => entry.id === id)
      const attempt = quizAttempts[id]
      if (!quiz || !attempt) return null
      const grade = gradeQuiz(quiz, attempt)
      setQuizAttempts((prev) => ({
        ...prev,
        [id]: {
          ...attempt,
          submittedAt: new Date().toISOString(),
          score: quiz.grading === 'auto' ? grade.score : undefined,
          correctCount: quiz.grading === 'auto' ? grade.correctCount : undefined,
          totalPoints: grade.totalPoints,
        },
      }))
      return grade
    },
    [gradeQuiz, quizAttempts],
  )

  const getStatus = useCallback<AssignmentsContextValue['getStatus']>(
    (id) => {
      const activity = activities.find((entry) => entry.id === id)
      if (activity) {
        const submission = activitySubmissions[id]
        if (submission?.submittedAt) return 'awaiting-review'
        if (submission?.savedDraftAt) return 'draft'
        return activity.baseStatus
      }
      const quiz = quizzes.find((entry) => entry.id === id)
      if (quiz) {
        const attempt = quizAttempts[id]
        if (attempt?.submittedAt) return quiz.grading === 'auto' ? 'completed' : 'awaiting-review'
        if (attempt) return 'in-progress'
        return quiz.baseStatus
      }
      return 'not-started'
    },
    [activitySubmissions, quizAttempts],
  )

  const isOverdue = useCallback<AssignmentsContextValue['isOverdue']>(
    (item) => {
      if (!item.dueDate) return false
      if (isFinishedStatus(getStatus(item.id))) return false
      return daysUntilDue(item.dueDate) < 0
    },
    [getStatus],
  )

  const counts = useMemo(() => {
    let pending = 0
    let dueSoon = 0
    let completed = 0
    let overdue = 0
    for (const item of allAssignments) {
      if (isFinishedStatus(getStatus(item.id))) {
        completed += 1
        continue
      }
      pending += 1
      if (item.dueDate) {
        const days = daysUntilDue(item.dueDate)
        if (days < 0) overdue += 1
        else if (days <= DUE_SOON_DAYS) dueSoon += 1
      }
    }
    return { pending, dueSoon, completed, overdue }
  }, [getStatus])

  const value = useMemo<AssignmentsContextValue>(
    () => ({
      activities,
      quizzes,
      allAssignments,
      getStatus,
      getActivitySubmission,
      getQuizAttempt,
      saveActivityDraft,
      submitActivity,
      startQuiz,
      setQuizAnswer,
      submitQuiz,
      gradeQuiz,
      isOverdue,
      counts,
    }),
    [
      getStatus,
      getActivitySubmission,
      getQuizAttempt,
      saveActivityDraft,
      submitActivity,
      startQuiz,
      setQuizAnswer,
      submitQuiz,
      gradeQuiz,
      isOverdue,
      counts,
    ],
  )

  return <AssignmentsContext.Provider value={value}>{children}</AssignmentsContext.Provider>
}


