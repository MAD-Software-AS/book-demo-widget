import React from 'react'

export interface DemoVideoTriggerProps {
  onClick: () => void
  text?: string
  style?: React.CSSProperties
}

const DemoVideoTrigger: React.FC<DemoVideoTriggerProps> = ({
  onClick,
  text = 'Se demo',
  style
}) => {
  const defaultStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontFamily: 'var(--font-demo-button, inherit)',
    color: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    textDecoration: 'underline'
  }

  return (
    <button style={style || defaultStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default DemoVideoTrigger
