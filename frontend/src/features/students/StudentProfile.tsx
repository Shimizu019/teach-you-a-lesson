// StudentProfile — read-only view of the registered student profile.
// Students never see teacher-only management controls here.
//
// Profile picture: LOCAL PREVIEW ONLY. There is no upload endpoint and no
// persistence in this prototype, so the image lives in component state and is
// lost on reload. Nothing is uploaded and nothing is stored permanently.
//
import { useEffect, useState } from 'react'
import { CameraIcon, UserIcon } from '../../components/common/Icons'
import type { StudentProfile as StudentProfileType } from './types'

/** Accepted image formats and the maximum size we will preview. */
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB

interface ProfileRowProps {
  label: string
  value: string
}

function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-100 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="text-sm font-medium text-neutral-500">{label}</dt>
      <dd className="break-words text-sm font-semibold text-neutral-900 sm:text-right">{value}</dd>
    </div>
  )
}

/** Profile picture picker — local preview only, no upload. */
function ProfilePicture({ fullName, initials }: { fullName: string; initials: string }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoName, setPhotoName] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)

  // Release the object URL when the component unmounts or the photo changes.
  useEffect(() => {
    if (!photoUrl) return
    return () => URL.revokeObjectURL(photoUrl)
  }, [photoUrl])

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // Reset so picking the same file again still fires a change event.
    event.target.value = ''
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setPhotoError('Unsupported file type. Please choose a PNG, JPEG, or WebP image.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setPhotoError('That image is too large. Please choose a file smaller than 2 MB.')
      return
    }

    setPhotoError(null)
    setPhotoName(file.name)
    setPhotoUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous)
      return URL.createObjectURL(file)
    })
  }

  const removePhoto = () => {
    setPhotoUrl(null)
    setPhotoName(null)
    setPhotoError(null)
  }

  return (
    <div className="mt-6 border-t border-neutral-100 pt-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${fullName} profile picture`}
            className="h-20 w-20 flex-none rounded-full object-cover ring-4 ring-indigo-100"
          />
        ) : (
          <span className="grid h-20 w-20 flex-none place-items-center rounded-full bg-indigo-600 text-xl font-semibold text-white ring-4 ring-indigo-100">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900">Profile picture</h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">
            PNG, JPEG, or WebP up to 2 MB. Previewed in your browser only — there is no upload
            storage in this prototype, so the image is not kept after you reload.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              id="profile-picture"
              type="file"
              accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
              onChange={handlePhotoChange}
              className="sr-only"
            />
            <label
              htmlFor="profile-picture"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500"
            >
              <CameraIcon className="h-4 w-4" />
              {photoUrl ? 'Replace picture' : 'Choose picture'}
            </label>
            {photoUrl && (
              <button
                type="button"
                onClick={removePhoto}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Remove
              </button>
            )}
          </div>
          {photoError && (
            <p role="alert" className="mt-2 text-xs font-medium text-red-600">
              {photoError}
            </p>
          )}
          {photoName && !photoError && (
            <p className="mt-2 text-xs text-neutral-500">Selected: {photoName}</p>
          )}
        </div>
      </div>
    </div>
  )
}


export default function StudentProfile({ profile }: { profile: StudentProfileType }) {
  const fullName = [profile.firstName, profile.middleName, profile.lastName]
    .filter(Boolean)
    .join(' ')
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
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

        <ProfilePicture fullName={fullName} initials={initials} />

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
