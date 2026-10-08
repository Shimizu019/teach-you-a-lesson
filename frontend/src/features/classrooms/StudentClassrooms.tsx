// StudentClassrooms — student's joined classrooms + Join Classroom form.
// Frontend-only: join codes are validated against local mock classrooms.
//
import { useState, type FormEvent } from 'react';
import { ArrowRightIcon, GraduationCapIcon, PlusIcon } from '../../components/common/Icons';
import type { Classroom } from './types';

interface StudentClassroomsProps {
  classrooms: Classroom[];
  joinedIds: string[];
  onJoin: (classId: string) => void;
  onOpenClass: (classId: string) => void;
}

export default function StudentClassrooms({
  classrooms,
  joinedIds,
  onJoin,
  onOpenClass,
}: StudentClassroomsProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const joinedClasses = classrooms.filter((cls) => joinedIds.includes(cls.id));

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    setError('');
    setNotice('');
    if (!normalized) {
      setError('Please enter a classroom code.');
      return;
    }
    const match = classrooms.find((cls) => cls.joinCode.toUpperCase() === normalized);
    if (!match) {
      setError(`“${code.trim()}” is not a valid classroom code. Check the code and try again.`);
      return;
    }
    if (joinedIds.includes(match.id)) {
      setError(`You have already joined ${match.name}.`);
      return;
    }
    onJoin(match.id);
    setCode('');
    setNotice(`You joined ${match.name}. It is now in your classrooms.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Join Classroom */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <PlusIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Join Classroom
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Enter the class code shared by your teacher to join a classroom.
            </p>
          </div>
        </div>

        <form onSubmit={handleJoin} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <label htmlFor="join-class-code" className="mb-1 block text-sm font-medium text-neutral-700">
              Classroom Code
            </label>
            <input
              id="join-class-code"
              type="text"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError('');
                setNotice('');
              }}
              placeholder="e.g., BSIT1A"
              className="block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm uppercase tracking-wider text-neutral-900 transition-colors duration-150 placeholder:normal-case placeholder:tracking-normal placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <button
            type="submit"
            className="mt-0.5 inline-flex flex-none items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:mt-6"
          >
            Join Classroom
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="mt-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {notice}
          </p>
        )}
      </section>

      {/* Joined classrooms */}
      <section aria-label="Joined classrooms">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
          My Classrooms{' '}
          <span className="text-sm font-medium text-neutral-500">({joinedClasses.length})</span>
        </h2>
        {joinedClasses.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {joinedClasses.map((cls) => (
              <article
                key={cls.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-150 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold tracking-tight text-neutral-900">
                      {cls.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      Grade {cls.grade} • Section {cls.section}
                    </p>
                  </div>
                  <span className="inline-flex flex-none items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                    <GraduationCapIcon className="h-3.5 w-3.5" />
                    {cls.joinCode}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-500">
                  <div>
                    <p className="font-medium text-neutral-700">{cls.lessons}</p>
                    <p>Lessons</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-700">{cls.quizzes}</p>
                    <p>Quizzes</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenClass(cls.id)}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <ArrowRightIcon className="mr-1 h-3 w-3" />
                  Open Class
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-neutral-900">No classrooms yet</p>
            <p className="mt-1 text-sm text-neutral-500">
              Enter a classroom code above to join your first classroom.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
