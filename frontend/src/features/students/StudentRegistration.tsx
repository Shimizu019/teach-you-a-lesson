// StudentRegistration — frontend-only student sign-up form.
// Stores the profile in local React state via onSubmit; no backend/auth.
//
import { useState, type FormEvent } from 'react';
import { GraduationCapIcon } from '../../components/common/Icons';
import type { StudentProfile } from './types';

interface StudentRegistrationProps {
  onSubmit: (profile: StudentProfile) => void;
}

const GRADE_OPTIONS = Array.from({ length: 12 }, (_, index) => String(index + 1));

const inputClass =
  'block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30';

const labelClass = 'mb-1 block text-sm font-medium text-neutral-700';

export default function StudentRegistration({ onSubmit }: StudentRegistrationProps) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [section, setSection] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const profile: StudentProfile = {
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      section: section.trim(),
      grade,
    };
    if (!profile.firstName || !profile.lastName || !profile.section || !profile.grade) return;
    onSubmit(profile);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <GraduationCapIcon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Student Registration
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Create your student profile to join classrooms. This is a frontend prototype — no
              backend or account is required.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="student-first-name" className={labelClass}>
                First Name
              </label>
              <input
                id="student-first-name"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="e.g., Maria"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="student-middle-name" className={labelClass}>
                Middle Name
              </label>
              <input
                id="student-middle-name"
                type="text"
                value={middleName}
                onChange={(event) => setMiddleName(event.target.value)}
                placeholder="(optional)"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="student-last-name" className={labelClass}>
                Last Name
              </label>
              <input
                id="student-last-name"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="e.g., Santos"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="student-section" className={labelClass}>
                Section
              </label>
              <input
                id="student-section"
                type="text"
                value={section}
                onChange={(event) => setSection(event.target.value)}
                placeholder="e.g., 1-1"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="student-grade" className={labelClass}>
                Grade
              </label>
              <select
                id="student-grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select grade</option>
                {GRADE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    Grade {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
