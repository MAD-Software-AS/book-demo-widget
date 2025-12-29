import { CompanyType, DEBOUNCE_DELAY } from '../../../../Company.constants'
import React, { useRef, useState } from 'react'

import FormField from '../../../../../../components/FormField/FormField'
import searchCompanies from '../../helpers/searchCompanies'

export interface CompanySelectProps {
  selectedItem?: CompanyType | null
  setSelectedItem: (value: CompanyType | null) => void
  error?: string | null
  t: {
    fieldLabel?: string
    selectPlaceholder: string
    organizationNumber: string
    noData: string
  }
}

const CompanySelect: React.FC<CompanySelectProps> = ({
  t: { selectPlaceholder, organizationNumber, noData, fieldLabel },
  error,
  setSelectedItem,
  selectedItem
}) => {
  const [state, setState] = useState({
    query: '',
    options: [] as CompanyType[],
    isDropdownVisible: false
  })

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setState((prev) => ({ ...prev, query: value }))
    if (value.length <= 2) {
      return setState((prev) => ({ ...prev, isDropdownVisible: false }))
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      search(value)
    }, DEBOUNCE_DELAY)
  }

  const search = async (value: string) => {
    if (value.length <= 2) return

    try {
      const options = await searchCompanies(value)

      setState((prev) => ({ ...prev, options, isDropdownVisible: true }))
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  const handleSelect = (value: CompanyType) => {
    setSelectedItem(value)
    setState((prev) => ({
      ...prev,
      query: value.name,
      isDropdownVisible: false
    }))
  }

  const handleClear = () => {
    selectedItem && setSelectedItem(null)
    setState((prev) => ({
      ...prev,
      query: '',
      options: [],
      isDropdownVisible: false
    }))
  }

  const isSelected = (orgNumber: string) => {
    if (!selectedItem) return false
    return selectedItem.orgNumber === orgNumber
  }

  return (
    <FormField className="custom-select" error={error} label={fieldLabel}>
      <div className="relative">
        <input
          type="text"
          className="input"
          placeholder={selectPlaceholder}
          value={state.query}
          onChange={handleChange}
        />
        {state.query && (
          <span className="icon pressable" onClick={handleClear}>
            &times;
          </span>
        )}
      </div>
      {state.isDropdownVisible ? (
        <div className="select-options">
          {state.options.length ? (
            state.options.map((option) => (
              <div
                key={option.orgNumber}
                className={`option${isSelected(option.orgNumber) ? ' selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="text">{option.name}</div>
                  <div className="text-caption">
                    {organizationNumber} {option.orgNumber}
                  </div>
                </div>
                <div className="text-caption">
                  {option.address.postalCode} {option.address.municipality}
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">{noData}</div>
          )}
        </div>
      ) : null}
    </FormField>
  )
}

export default CompanySelect
