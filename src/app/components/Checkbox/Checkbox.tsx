// import './CheckboxWithArrow.css'

import React, { useEffect } from 'react'

import { useState } from 'react'

interface CheckboxProps {
  checked?: boolean
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  checked: initialChecked,
  onChange
}) => {
  const [checked, setChecked] = useState(initialChecked ?? false)

  useEffect(() => {
    if (initialChecked) setChecked(initialChecked)
  }, [initialChecked])

  const handleChange = () => {
    setChecked((prev) => {
      const newChecked = !prev
      if (onChange) onChange(newChecked)
      return newChecked
    })
  }

  const classes = `checkbox ${checked ? 'checked' : ''}`

  return (
    <div className="checkbox-container">
      <div className={classes} onClick={handleChange}>
        {checked && (
          <svg
            className="check-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {children}
    </div>
  )
}

export default Checkbox
