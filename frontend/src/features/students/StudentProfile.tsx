// StudentProfile — read-only view of the registered student profile.
// Students never see teacher-only management controls here.
//
import { UserIcon } from '../../components/common/Icons';
import type { StudentProfile as StudentProfileType } from './types';

interface StudentProfileProps {
  profile: StudentProfileType;
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-100 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="text-sm font-medium text-neutral-500">{label}</dt>
      <dd className="break-words text-sm font-semibold text-neutral-900 sm:text-right">{value}</dd>
    </div>
  );
}

export default function StudentProfile({ profile }: StudentProfileProps) {
  const fullName = [profile.firstName, profile.middleName, profile.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-indigo-600 text-base font-semibold text-white ring-4 ring-indigo-100">
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {fullName}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
              <UserIcon className="h-4 w-4" />
              Student profile
            </p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-neutral-100 border-t border-neutral-100">
          <ProfileRow label="First Name" value={profile.firstName} />
          <ProfileRow label="Middle Name" value={profile.middleName || '—'} />
          <ProfileRow label="Last Name" value={profile.lastName} />
          <ProfileRow label="Section" value={profile.section} />
          <ProfileRow label="Grade" value={`Grade ${profile.grade}`} />
        </dl>
      </section>

      <p className="text-center text-xs text-neutral-500">
        Frontend prototype — profile data lives only in local React state.
      </p>
    </div>
  );
}
