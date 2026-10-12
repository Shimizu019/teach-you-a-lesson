// useAssignments — access the shared assignments session state from any
// component (must be rendered within AssignmentsProvider).
//
import { useContext } from 'react'
import { AssignmentsContext, type AssignmentsContextValue } from './assignmentsState'

export function useAssignments(): AssignmentsContextValue {
  const context = useContext(AssignmentsContext)
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentsProvider')
  }
  return context
}