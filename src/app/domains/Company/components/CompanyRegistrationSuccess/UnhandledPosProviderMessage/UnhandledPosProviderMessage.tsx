import React from 'react'

export interface UnhandledPosProviderMessageProps {
  t: {
    title: string
    messages: string[]
  }
}

const UnhandledPosProviderMessage: React.FC<
  UnhandledPosProviderMessageProps
> = ({ t: { title, messages } }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '350px'
      }}
    >
      <h1 className="subtitle text-center" style={{ marginBottom: '24px' }}>
        {title}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {messages.map((message, index) => (
          <span
            key={index}
            style={{ minHeight: '20px' }}
            className="text text-center"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}

export default UnhandledPosProviderMessage
