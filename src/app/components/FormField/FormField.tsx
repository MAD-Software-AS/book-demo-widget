import React from 'react'

export interface FormFieldProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  label?: string
  error?: string | null
}

const defaultStyle: {
  wrapper: React.CSSProperties
  error: React.CSSProperties
  label: React.CSSProperties
} = {
  wrapper: {
    marginBottom: '20px',
    position: 'relative'
  },
  error: {
    fontSize: '12px',
    position: 'absolute',
    bottom: '-16px',
    left: '0'
  },
  label: {
    marginBottom: '4px'
  }
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  className,
  style
}) => {
  return (
    <div style={{ ...defaultStyle.wrapper, ...style }}>
      {label && (
        <label className="text-label" style={{ ...defaultStyle.label }}>
          {label}
        </label>
      )}
      <div className={className}>{children}</div>
      {error && (
        <span className="text-error" style={{ ...defaultStyle.error }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default FormField
