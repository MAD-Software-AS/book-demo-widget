import DemoVideo from './features/DemoVideo/DemoVideo'
import DemoVideoProvider from './contexts/DemoVideo/DemoVideoProvider'
import React from 'react'

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
  triggerStyle?: React.CSSProperties
}

const App: React.FC<AppProps> = ({ env, t, videoLink, triggerStyle }) => {
  return (
    <DemoVideoProvider env={env} videoLink={videoLink}>
      <DemoVideo t={t} triggerStyle={triggerStyle} />
    </DemoVideoProvider>
  )
}

export default App
