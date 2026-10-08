// DataSection — backup, export and import controls (prototype only).
// Buttons respond with placeholder dialogs; nothing is persisted.
import SettingsCard from './SettingsCard'
import { DownloadIcon, LayersIcon, UploadIcon } from '../../../components/common/Icons'

export type DataAction = 'backup' | 'export' | 'import'

interface DataSectionProps {
  onAction: (action: DataAction) => void
}

const primaryBtnClass =
  'rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
const secondaryBtnClass =
  'rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

export default function DataSection({ onAction }: DataSectionProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        icon={LayersIcon}
        title="Backup"
        description="Backup your learning data."
      >
        <div className="flex justify-end">
          <button type="button" onClick={() => onAction('backup')} className={primaryBtnClass}>
            Create Backup
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={DownloadIcon}
        title="Export"
        description="Export your profile and learning data."
      >
        <div className="flex justify-end">
          <button type="button" onClick={() => onAction('export')} className={primaryBtnClass}>
            Export Data
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={UploadIcon}
        title="Import"
        description="Import previously exported data (prototype control)."
      >
        <div className="flex justify-end">
          <button type="button" onClick={() => onAction('import')} className={secondaryBtnClass}>
            Import Data
          </button>
        </div>
      </SettingsCard>
    </div>
  )
}