import React, { useState } from 'react'

import FormField from '../../../../../../components/FormField/FormField'
import { POS_PROVIDERS } from '../../../../Company.constants'

export interface PosProviderSelectProps {
  selectedItem?: string | null
  setSelectedItem: (value: string) => void
  error?: string | null
  inputError?: string | null
  setInputValue: (value: string) => void
  t: {
    fieldLabel?: string
    posProviders: {
      fixitOnline: string
      com2gether: string
      easyUpdate: string
      egHano: string
      handelsdata: string
      norskButikkdata: string
      sharpWellness: string
      suppler: string
      timma: string
      touchSoft: string
      other: string
    }
    selectPlaceholder: string
    otherPlaceholder: string
  }
}

const PosProviderSelect: React.FC<PosProviderSelectProps> = ({
  t: {
    posProviders: {
      fixitOnline,
      com2gether,
      easyUpdate,
      egHano,
      handelsdata,
      norskButikkdata,
      sharpWellness,
      suppler,
      timma,
      touchSoft,
      other
    },
    selectPlaceholder,
    fieldLabel,
    otherPlaceholder
  },
  error,
  setSelectedItem,
  selectedItem,
  inputError,
  setInputValue
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const items = [
    { name: fixitOnline, value: POS_PROVIDERS.FIXIT_ONLINE },
    { name: com2gether, value: POS_PROVIDERS.COM2GETHER },
    { name: easyUpdate, value: POS_PROVIDERS.EASY_UPDATE },
    { name: egHano, value: POS_PROVIDERS.EG_HANO },
    { name: handelsdata, value: POS_PROVIDERS.HANDELSDATA },
    { name: norskButikkdata, value: POS_PROVIDERS.NORSK_BUTIKKDATA },
    { name: sharpWellness, value: POS_PROVIDERS.SHARP_WELLNESS },
    { name: suppler, value: POS_PROVIDERS.SUPPLER },
    { name: timma, value: POS_PROVIDERS.TIMMA },
    { name: touchSoft, value: POS_PROVIDERS.TOUCH_SOFT },
    { name: other, value: POS_PROVIDERS.OTHER }
  ]

  const onDropdownButtonClick = () => setIsDropdownVisible((prev) => !prev)

  const currentlySelected = selectedItem ? (
    items.find(({ value }) => value === selectedItem)?.name
  ) : (
    <span className="text-disabled">{selectPlaceholder}</span>
  )

  const isSelected = (objectId: string) => {
    return objectId === selectedItem
  }

  const isOtherSelected = selectedItem === POS_PROVIDERS.OTHER

  const onItemSelect = (salonId: string) => () => {
    setSelectedItem?.(salonId)
    setIsDropdownVisible(false)
  }

  return (
    <>
      <FormField className="custom-select" label={fieldLabel} error={error}>
        <div className="select-trigger" onClick={onDropdownButtonClick}>
          <div className="selected-option">{currentlySelected}</div>
          <span className={selectedItem ? 'icon' : 'icon icon-placeholder'}>
            &#9662;
          </span>
        </div>
        {isDropdownVisible ? (
          <div className="select-options">
            {items.map(({ name, value }) => (
              <div
                key={value}
                className={`option${isSelected(value) ? ' selected' : ''}`}
                onClick={onItemSelect(value)}
              >
                {name}
              </div>
            ))}
          </div>
        ) : null}
      </FormField>
      {isOtherSelected && (
        <FormField error={inputError}>
          <div className="other-input">
            <input
              type="text"
              className="input"
              placeholder={otherPlaceholder}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </FormField>
      )}
    </>
  )
}

export default PosProviderSelect
