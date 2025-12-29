import React from 'react'
import SuccessMessage from './SuccessMessage/SuccessMessage'
import UnhandledPosProviderMessage from './UnhandledPosProviderMessage/UnhandledPosProviderMessage'
import useWidgetContext from '../../../../contexts/Widget/useWidgetContext'

export interface CompanyRegistrationSuccessProps {
  t: {
    supportedPosProviders: string[]
    successMessage: {
      title: string
      messages: string[]
    }
    unhandledPosProviderMessage: {
      title: string
      messages: string[]
    }
  }
}

const CompanyRegistrationSuccess: React.FC<CompanyRegistrationSuccessProps> = ({
  t: { supportedPosProviders, successMessage, unhandledPosProviderMessage }
}) => {
  const {
    formData: { email, posProvider }
  } = useWidgetContext()

  const isPosProviderHandled = supportedPosProviders.includes(posProvider!)

  return isPosProviderHandled ? (
    <SuccessMessage t={successMessage} email={email!} />
  ) : (
    <UnhandledPosProviderMessage t={unhandledPosProviderMessage} />
  )
}

export default CompanyRegistrationSuccess
