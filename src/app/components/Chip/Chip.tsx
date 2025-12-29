import React from 'react'

const Chip = ({
  label,
  selected,
  onClick
}: {
  label: string
  selected: boolean
  onClick: () => void
}) => {
  return (
    <div className={`chip ${selected ? 'selected' : ''}`} onClick={onClick}>
      {label}
    </div>
  )
}

export default Chip
