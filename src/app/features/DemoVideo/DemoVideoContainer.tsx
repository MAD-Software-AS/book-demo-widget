import React from 'react'

const DemoVideoContainer = ({
  children,
  onClick,
  containerStyle
}: {
  children: React.ReactNode
  onClick?: () => void
  containerStyle?: React.CSSProperties
}) => {
  return (
    <div
      className="demo-video-container"
      style={containerStyle}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default DemoVideoContainer
