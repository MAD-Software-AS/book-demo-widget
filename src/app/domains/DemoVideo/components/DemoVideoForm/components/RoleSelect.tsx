import React, { useState } from 'react'

import FormField from '../../../../../components/FormField/FormField'

export interface RoleSelectProps {
  selectedItem?: string | null
  setSelectedItem: (value: string | null) => void
  error?: string | null
  t: {
    fieldLabel?: string
    selectPlaceholder: string
    noData: string
    roles: string[][] // [['owner', 'Eier'], ['manager', 'Manager'], ['employee', 'Ansatt']],
  }
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  t: { selectPlaceholder, noData, fieldLabel, roles },
  error,
  setSelectedItem,
  selectedItem
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handleOpenDropdown = () => {
    setIsDropdownVisible(true)
  }

  const handleSelect = (value: string) => {
    setSelectedItem(value)
    setIsDropdownVisible(false)
  }

  const isSelected = (role: string) => {
    if (!selectedItem) return false
    return selectedItem === role
  }

  const selectedRoleName =
    roles.find((role: string[]) => role[0] === selectedItem)?.[1] || ''

  return (
    <FormField className="custom-select" error={error} label={fieldLabel}>
      <div className="relative">
        <input
          onFocus={handleOpenDropdown}
          type="text"
          className={`input ${error ? 'input-error' : ''}`}
          value={selectedRoleName}
          placeholder={selectPlaceholder}
        />
      </div>
      {isDropdownVisible && (
        <div className="select-options">
          {roles.length ? (
            roles.map((role: string[]) => (
              <div
                key={role[0]}
                className={`option${isSelected(role[0]) ? ' selected' : ''}`}
                onClick={() => handleSelect(role[0])}
              >
                <div className="text">{role[1]}</div>
              </div>
            ))
          ) : (
            <div className="no-data">{noData}</div>
          )}
        </div>
      )}
    </FormField>
  )
}

export default RoleSelect
