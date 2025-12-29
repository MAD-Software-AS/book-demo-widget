import Chip from '../../../../components/Chip/Chip'
import React from 'react'

interface CompanySizeSelectProps {
  companySizes: string[]
  onChange: (size: number) => void
  value: number
}

const CompanySizeSelect: React.FC<CompanySizeSelectProps> = ({
  companySizes,
  onChange,
  value
}) => {
  const handleChipClick = (index: number) => () => {
    onChange(index)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      {companySizes.map((size, index) => (
        <Chip
          key={index}
          label={size}
          selected={value === index}
          onClick={handleChipClick(index)}
        />
      ))}
    </div>
  )
}

export default CompanySizeSelect
