import React from 'react'

export interface DemoVideoTriggerProps {
  onClick: () => void
  text: string
  style?: React.CSSProperties
  isPlayButton?: boolean
}

const DemoVideoTrigger: React.FC<DemoVideoTriggerProps> = ({
  onClick,
  text = 'Se demo',
  style,
  isPlayButton = false
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

  if (isPlayButton) {
    return (
      <button
        type="button"
        className="demo-video-trigger demo-video-trigger--play"
        style={style}
        onClick={onClick}
        aria-label={text}
      >
        <span className="demo-video-trigger__play-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    )
  }

  return (
    <button type="button" style={style || defaultStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default DemoVideoTrigger
