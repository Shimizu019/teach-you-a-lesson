// AuthRoute — explicit role guard for protected page logic.
//
// Defense-in-depth: the app shell already renders different views per role,
// and this adds a consistent check so a role can never render another role's
// page even if navigation state is manipulated. CLIENT-SIDE ONLY — this is not
// production security; the backend must enforce authorization server-side.
//
import type { ReactNode } from 'react'
import { useAuth } from './useAuth'
import type { UserRole } from './types'

interface AuthRouteProps {
  allow: UserRole[]
  children: ReactNode
}

export default function AuthRoute({ allow, children }: AuthRouteProps) {
  const { user } = useAuth()

  if (!user || !allow.includes(user.role)) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
          Access restricted
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          You do not have permission to view this page.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
