// StudentClassroomView — student's view of a joined classroom.
// Shows lessons, quizzes, activities, My Scores, and My Attendance.
// Students only ever see their own results — never other students' data.
//
import { useState } from 'react';
import ProgressBar from '../../components/common/ProgressBar';
import StatCard from '../../components/common/StatCard';
import {
  BookOpenIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  CloseIcon,
  FlaskIcon,
  TrophyIcon,
} from '../../components/common/Icons';
import type { Classroom } from './types';

interface StudentClassroomViewProps {
  classroom?: Classroom;
  onBack: () => void;
}

type TabId = 'lessons' | 'quizzes' | 'activities' | 'scores' | 'attendance';

interface LessonRow {
  id: string;
  title: string;
  subject: string;
  duration: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'upcoming';
}

interface QuizRow {
  id: string;
  title: string;
  subject: string;
  questions: number;
  status: 'in-progress' | 'completed' | 'upcoming';
}

interface ActivityRow {
  id: string;
  title: string;
  time: string;
  status: 'completed' | 'pending' | 'in-progress';
}

interface ScoreRow {
  id: string;
  title: string;
  type: 'Quiz' | 'Assignment';
  score: number;
  total: number;
}

interface AttendanceSession {
  id: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

// Frontend-only mock data for the signed-in student (their own results).
const MY_LESSONS: LessonRow[] = [
  { id: 'l1', title: 'Introduction to Programming', subject: 'Computer Science', duration: '45 min', progress: 70, status: 'in-progress' },
  { id: 'l2', title: 'Basic Algorithms', subject: 'Computer Science', duration: '60 min', progress: 100, status: 'completed' },
  { id: 'l3', title: 'Data Structures Overview', subject: 'Computer Science', duration: '50 min', progress: 0, status: 'upcoming' },
  { id: 'l4', title: 'Problem Solving Basics', subject: 'Mathematics', duration: '40 min', progress: 45, status: 'in-progress' },
];

const MY_QUIZZES: QuizRow[] = [
  { id: 'q1', title: 'Programming Fundamentals Quiz', subject: 'Computer Science', questions: 10, status: 'in-progress' },
  { id: 'q2', title: 'Math Basics Quiz', subject: 'Mathematics', questions: 8, status: 'completed' },
  { id: 'q3', title: 'Science Fundamentals Quiz', subject: 'Science', questions: 12, status: 'upcoming' },
];

const MY_ACTIVITIES: ActivityRow[] = [
  { id: 'a1', title: 'Submitted: Introduction to Programming', time: '2 hours ago', status: 'completed' },
  { id: 'a2', title: 'Quiz: Programming Fundamentals', time: 'Yesterday', status: 'in-progress' },
  { id: 'a3', title: 'Lesson: Basic Algorithms', time: '3 days ago', status: 'completed' },
  { id: 'a4', title: 'Attendance Tracking', time: '4 days ago', status: 'pending' },
];

const MY_SCORES: ScoreRow[] = [
  { id: 's1', title: 'Programming Fundamentals Quiz', type: 'Quiz', score: 9, total: 10 },
  { id: 's2', title: 'Math Basics Quiz', type: 'Quiz', score: 7, total: 8 },
  { id: 's3', title: 'Intro to Programming Assignment', type: 'Assignment', score: 18, total: 20 },
  { id: 's4', title: 'Problem Solving Worksheet', type: 'Assignment', score: 16, total: 20 },
];

const MY_ATTENDANCE: AttendanceSession[] = [
  { id: 'at1', date: 'October 7, 2026', status: 'Present' },
  { id: 'at2', date: 'October 6, 2026', status: 'Present' },
  { id: 'at3', date: 'October 2, 2026', status: 'Late' },
  { id: 'at4', date: 'October 1, 2026', status: 'Present' },
  { id: 'at5', date: 'September 30, 2026', status: 'Absent' },
];

const TABS: { id: TabId; label: string }[] = [
  { id: 'lessons', label: 'Lessons' },
  { id: 'quizzes', label: 'Quizzes' },
  { id: 'activities', label: 'Activities' },
  { id: 'scores', label: 'My Scores' },
  { id: 'attendance', label: 'My Attendance' },
];

const chipClass = (status: string) =>
  status === 'completed' || status === 'Present'
    ? 'bg-green-50 text-green-700'
    : status === 'in-progress' || status === 'Late'
      ? 'bg-amber-50 text-amber-700'
      : status === 'Absent'
        ? 'bg-red-50 text-red-700'
        : 'bg-neutral-100 text-neutral-600';

function ChatPlaceholder() {
  return (
    <section className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Classroom Chat</h3>
      <p className="mt-2 text-sm text-neutral-500">Chat will be available in a future version.</p>
      <p className="mt-1 text-sm text-neutral-500">
        Teacher controls will determine which students can participate.
      </p>
    </section>
  );
}

export default function StudentClassroomView({ classroom, onBack }: StudentClassroomViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('lessons');

  if (!classroom) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-neutral-900">Classroom not found</p>
        <p className="mt-1 text-sm text-neutral-500">
          You have not joined this classroom, or the class code is no longer valid.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Back to classrooms
        </button>
      </div>
    );
  }

  const presentCount = MY_ATTENDANCE.filter((session) => session.status === 'Present').length;
  const lateCount = MY_ATTENDANCE.filter((session) => session.status === 'Late').length;
  const absentCount = MY_ATTENDANCE.filter((session) => session.status === 'Absent').length;
  const attendanceRate = Math.round(
    ((presentCount + lateCount) / MY_ATTENDANCE.length) * 100,
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page header */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <ChevronRightIcon className="h-4 w-4 rotate-180" />
          Back to classrooms
        </button>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {classroom.name}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Grade {classroom.grade} • Section {classroom.section}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
            Class Code: {classroom.joinCode}
          </span>
          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
            Joined
          </span>
        </div>
      </section>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Classroom sections"
        className="flex flex-wrap gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lessons */}
      {activeTab === 'lessons' && (
        <section aria-label="Lessons" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900">
              <BookOpenIcon className="h-5 w-5 text-indigo-600" />
              Lessons
            </h3>
            <span className="text-xs font-medium text-neutral-500">{MY_LESSONS.length} total</span>
          </div>
          <div className="space-y-4">
            {MY_LESSONS.map((lesson) => (
              <div key={lesson.id} className="rounded-xl border border-neutral-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{lesson.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {lesson.subject} • {lesson.duration}
                    </p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${chipClass(lesson.status)}`}>
                    {lesson.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={lesson.progress} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quizzes */}
      {activeTab === 'quizzes' && (
        <section aria-label="Quizzes" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900">
              <FlaskIcon className="h-5 w-5 text-indigo-600" />
              Quizzes
            </h3>
            <span className="text-xs font-medium text-neutral-500">{MY_QUIZZES.length} total</span>
          </div>
          <div className="space-y-3">
            {MY_QUIZZES.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4 transition-colors duration-150 hover:bg-neutral-50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{quiz.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {quiz.subject} • {quiz.questions} questions
                  </p>
                </div>
                <span className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${chipClass(quiz.status)}`}>
                  {quiz.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {activeTab === 'activities' && (
        <section aria-label="Activities" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Activities</h3>
            <span className="text-xs font-medium text-neutral-500">Last 7 days</span>
          </div>
          <ul className="divide-y divide-neutral-100">
            {MY_ACTIVITIES.map((activity) => (
              <li key={activity.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-900">{activity.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{activity.time}</p>
                </div>
                <span className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${chipClass(activity.status)}`}>
                  {activity.status.replace('-', ' ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* My Scores — only the signed-in student's own results */}
      {activeTab === 'scores' && (
        <section aria-label="My scores" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900">
              <TrophyIcon className="h-5 w-5 text-indigo-600" />
              My Scores
            </h3>
            <span className="text-xs font-medium text-neutral-500">
              Average:{' '}
              {Math.round(
                (MY_SCORES.reduce((total, row) => total + (row.score / row.total) * 100, 0) /
                  MY_SCORES.length),
              )}
              %
            </span>
          </div>
          <div className="space-y-3">
            {MY_SCORES.map((row) => {
              const percent = Math.round((row.score / row.total) * 100);
              return (
                <div key={row.id} className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-900">{row.title}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">{row.type}</p>
                    </div>
                    <span className="flex-none text-sm font-semibold text-neutral-900">
                      {row.score}/{row.total}{' '}
                      <span className="font-medium text-neutral-500">({percent}%)</span>
                    </span>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={percent} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            You can only see your own scores. Other students&apos; results are never shown here.
          </p>
        </section>
      )}

      {/* My Attendance — only the signed-in student's own attendance */}
      {activeTab === 'attendance' && (
        <section aria-label="My attendance" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">My Attendance</h3>
            <span className="text-xs font-medium text-neutral-500">This term</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Present"
              value={String(presentCount)}
              hint="Sessions"
              hintClass="text-neutral-500"
              iconChipClass="bg-green-50"
              icon={CheckCircleIcon}
            />
            <StatCard
              label="Late"
              value={String(lateCount)}
              hint="Sessions"
              hintClass="text-neutral-500"
              iconChipClass="bg-amber-50"
              icon={ClockIcon}
            />
            <StatCard
              label="Absent"
              value={String(absentCount)}
              hint="Sessions"
              hintClass="text-neutral-500"
              iconChipClass="bg-red-50"
              icon={CloseIcon}
            />
            <StatCard
              label="Attendance Rate"
              value={`${attendanceRate}%`}
              hint="Present + late"
              hintClass="text-neutral-500"
              iconChipClass="bg-indigo-50"
              icon={TrophyIcon}
            />
          </div>
          <ul className="mt-5 divide-y divide-neutral-100 border-t border-neutral-100">
            {MY_ATTENDANCE.map((session) => (
              <li key={session.id} className="flex items-center justify-between gap-4 py-3">
                <p className="min-w-0 truncate text-sm font-medium text-neutral-900">
                  {session.date}
                </p>
                <span className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${chipClass(session.status)}`}>
                  {session.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-neutral-500">
            You can only see your own attendance. Other students&apos; attendance is never shown
            here.
          </p>
        </section>
      )}

      {/* Classroom Chat placeholder */}
      <ChatPlaceholder />
    </div>
  );
}
