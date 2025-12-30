import React from 'react'

export interface DemoVideoTriggerProps {
  onClick: () => void
  text: string
}

const DemoVideoTrigger: React.FC<DemoVideoTriggerProps> = ({
  onClick,
  text
}) => {
  const triggerStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontFamily: 'var(--font-demo-button, inherit)',
    color: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit'
  }

  return (
    <button style={triggerStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default DemoVideoTrigger
