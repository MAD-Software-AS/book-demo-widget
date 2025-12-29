import React from 'react'
import replaceVariablesInTranslations from '../../../../../utils/replaceVariablesInTranslations'

export interface SuccessMessageProps {
  t: {
    title: string
    messages: string[]
  }
  email: string
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  t: { title, messages },
  email
}) => {
  const _messages = messages.map((message) => {
    return replaceVariablesInTranslations(message, {
      email: email || ''
    })
  })

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
        {_messages.map((message, index) => (
          <span key={index} className="text text-center">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SuccessMessage
