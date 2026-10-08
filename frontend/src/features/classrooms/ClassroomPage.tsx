// ClassroomPage — teacher view of a single classroom: students, lessons, quizzes, activity feed.
import { useState } from 'react';
import PlaceholderDialog from '../../components/common/PlaceholderDialog';
import ProgressBar from '../../components/common/ProgressBar';
import StatCard from '../../components/common/StatCard';
import { BookOpenIcon, FlaskIcon, TrophyIcon, UsersIcon } from '../../components/common/Icons';
import CLASSES from './mockData';

interface Student {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  assignments: number;
  assignmentsSubmitted: number;
}

interface Lesson {
  id: string;
  title: string;
  subject: string;
  duration: string;
  status: 'in-progress' | 'completed' | 'upcoming';
  progress: number;
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: number;
  attempts: number;
  status: 'in-progress' | 'completed' | 'upcoming';
}

interface Activity {
  id: string;
  title: string;
  time: string;
  type: 'assignment' | 'quiz' | 'lesson' | 'attendance';
  status: 'completed' | 'pending' | 'in-progress';
}

interface ClassroomPageProps {
  classId?: string;
}

export default function ClassroomPage({ classId }: ClassroomPageProps) {
  const classroom = CLASSES.find((entry) => entry.id === classId) ?? CLASSES[0];

  const [students] = useState<Student[]>([
    { id: 's1', name: 'Maria Santos', email: 'maria.santos@school.edu.ph', avatarColor: 'bg-pink-500', assignments: 12, assignmentsSubmitted: 9 },
    { id: 's2', name: 'John Deo', email: 'john.deo@school.edu.ph', avatarColor: 'bg-blue-500', assignments: 12, assignmentsSubmitted: 10 },
    { id: 's3', name: 'Ana Cruz', email: 'ana.cruz@school.edu.ph', avatarColor: 'bg-green-500', assignments: 12, assignmentsSubmitted: 8 },
    { id: 's4', name: 'Pedro Lim', email: 'pedro.lim@school.edu.ph', avatarColor: 'bg-yellow-500', assignments: 12, assignmentsSubmitted: 11 },
    { id: 's5', name: 'Liza Manda', email: 'liza.manda@school.edu.ph', avatarColor: 'bg-purple-500', assignments: 12, assignmentsSubmitted: 7 },
    { id: 's6', name: 'Carlos Reyes', email: 'carlos.reyes@school.edu.ph', avatarColor: 'bg-red-500', assignments: 12, assignmentsSubmitted: 9 },
  ]);

  const [lessons] = useState<Lesson[]>([
    { id: 'l1', title: 'Introduction to Programming', subject: 'Computer Science', duration: '45 min', status: 'in-progress', progress: 70 },
    { id: 'l2', title: 'Basic Algorithms', subject: 'Computer Science', duration: '60 min', status: 'completed', progress: 100 },
    { id: 'l3', title: 'Data Structures Overview', subject: 'Computer Science', duration: '50 min', status: 'upcoming', progress: 0 },
    { id: 'l4', title: 'Problem Solving Basics', subject: 'Mathematics', duration: '40 min', status: 'in-progress', progress: 45 },
  ]);

  const [quizzes] = useState<Quiz[]>([
    { id: 'q1', title: 'Programming Fundamentals Quiz', subject: 'Computer Science', questions: 10, attempts: 8, status: 'in-progress' },
    { id: 'q2', title: 'Math Basics Quiz', subject: 'Mathematics', questions: 8, attempts: 6, status: 'completed' },
    { id: 'q3', title: 'Science Fundamentals Quiz', subject: 'Science', questions: 12, attempts: 5, status: 'upcoming' },
  ]);

  const [activities] = useState<Activity[]>([
    { id: 'a1', title: 'Submitted: Introduction to Programming', time: '2 hours ago', type: 'assignment', status: 'completed' },
    { id: 'a2', title: 'Quiz: Programming Fundamentals', time: 'Yesterday', type: 'quiz', status: 'in-progress' },
    { id: 'a3', title: 'Lesson: Basic Algorithms', time: '3 days ago', type: 'lesson', status: 'completed' },
    { id: 'a4', title: 'Attendance Tracking', time: '4 days ago', type: 'attendance', status: 'pending' },
  ]);

  const [showStudentRegister, setShowStudentRegister] = useState(false);

  const openStudentRegister = () => setShowStudentRegister(true);
  const closeStudentRegister = () => setShowStudentRegister(false);

  const chipClass = (status: string) =>
    status === 'completed'
      ? 'bg-green-50 text-green-700'
      : status === 'in-progress'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-neutral-100 text-neutral-600';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page header */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
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
                Open Class
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openStudentRegister}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <UsersIcon className="mr-2 h-4 w-4" />
              Add Student
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Invite Parents
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Students"
          value={String(classroom.students)}
          hint="Total enrolled"
          hintClass="text-neutral-500"
          iconChipClass="bg-indigo-50"
          icon={UsersIcon}
        />
        <StatCard
          label="Lessons"
          value={String(classroom.lessons)}
          hint="Published lessons"
          hintClass="text-neutral-500"
          iconChipClass="bg-green-50"
          icon={BookOpenIcon}
        />
        <StatCard
          label="Quizzes"
          value={String(classroom.quizzes)}
          hint="Assigned quizzes"
          hintClass="text-neutral-500"
          iconChipClass="bg-yellow-50"
          icon={FlaskIcon}
        />
        <StatCard
          label="Attendance"
          value="92%"
          hint="This week"
          hintClass="text-neutral-500"
          iconChipClass="bg-pink-50"
          icon={TrophyIcon}
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Students */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Students</h3>
            <button
              type="button"
              onClick={openStudentRegister}
              className="rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Add Student
            </button>
          </div>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition-colors duration-150 hover:bg-neutral-50"
              >
                <div className={`grid h-10 w-10 flex-none place-items-center rounded-full text-white ${student.avatarColor}`}>
                  <span className="text-sm font-semibold">{student.name.charAt(0)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900">{student.name}</p>
                  <p className="truncate text-xs text-neutral-500">{student.email}</p>
                </div>
                <div className="flex-none text-right text-xs text-neutral-500">
                  <p>Assignments</p>
                  <p className="font-medium text-neutral-700">
                    {student.assignmentsSubmitted}/{student.assignments}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons + Quizzes */}
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Lessons</h3>
              <span className="text-xs font-medium text-neutral-500">{lessons.length} total</span>
            </div>
            <div className="space-y-4">
              {lessons.map((lesson) => (
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
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Quizzes</h3>
              <span className="text-xs font-medium text-neutral-500">{quizzes.length} total</span>
            </div>
            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4 transition-colors duration-150 hover:bg-neutral-50"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{quiz.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {quiz.subject} • {quiz.questions} questions • {quiz.attempts} attempts
                    </p>
                  </div>
                  <span className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${chipClass(quiz.status)}`}>
                    {quiz.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Activity feed */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Recent Activity</h3>
          <span className="text-xs font-medium text-neutral-500">Last 7 days</span>
        </div>
        <ul className="divide-y divide-neutral-100">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-900">{activity.title}</p>
                <p className="mt-0.5 text-xs capitalize text-neutral-500">
                  {activity.type} • {activity.time}
                </p>
              </div>
              <span className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${chipClass(activity.status)}`}>
                {activity.status.replace('-', ' ')}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Add Student dialog (prototype) */}
      {showStudentRegister && (
        <PlaceholderDialog
          title="Add Student"
          description="Student registration is a frontend prototype — no data is saved yet. In the full app you would enter the student's name, email, and section here."
          onClose={closeStudentRegister}
        />
      )}
    </div>
  );
}






