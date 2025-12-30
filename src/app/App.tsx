import React from 'react'
import DemoVideoProvider from './contexts/DemoVideo/DemoVideoProvider'
import DemoVideo from './features/DemoVideo/DemoVideo'

interface AppProps {
  t: {
    triggerButton: string
    modal: {
      modalTitle: string
      closeButton: string
      submitButton: string
      form: {
        emailLabel: string
        emailPlaceholder: string
        companyNameLabel: string
        companyNamePlaceholder: string
        organizationNumber: string
        noData: string
      }
      formErrors: {
        emailRequired: string
        emailInvalid: string
        companyNameRequired: string
      }
      successMessage: string
      errorMessage: string
    }
  }
  env: string
  videoLink: string
}

const App: React.FC<AppProps> = ({ env, t, videoLink }) => {
  return (
    <DemoVideoProvider env={env} videoLink={videoLink}>
      <DemoVideo t={t} />
    </DemoVideoProvider>
  )
}

export default App
