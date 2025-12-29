import React from 'react'
import useWidgetContext from '../../../../contexts/Widget/useWidgetContext'

export interface ErrorMessage {
  userAlreadyExists: string[]
  unexpectedError: string[]
  companyAlreadyRegistered: string[]
  invalidPromoCode: string[]
}

export interface CompanyRegistrationErrorProps {
  t: {
    title: string
    continueAction: string
    messages: ErrorMessage
  }
  errorType: string | null
}

const getErrorMessage = ({
  type,
  t
}: {
  type: string | null
  t: ErrorMessage
}): string[] => {
  switch (type) {
    case 'auth/email-already-exists':
      return t.userAlreadyExists
    case 'company_already_exists':
      return t.companyAlreadyRegistered
    case 'invalid_promo_code':
      return t.invalidPromoCode
    default:
      return t.unexpectedError
  }
}

const CompanyRegistrationError: React.FC<CompanyRegistrationErrorProps> = ({
  t: { title, messages, continueAction },
  errorType
}) => {
  const { reset } = useWidgetContext()

  const _messages = getErrorMessage({ type: errorType, t: messages })

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

      <button
        className="btn btn-primary"
        style={{
          marginTop: '24px'
        }}
        onClick={reset}
      >
        {continueAction}
      </button>
    </div>
  )
}

export default CompanyRegistrationError
