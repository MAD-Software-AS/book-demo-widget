import React, { useState } from 'react'

import DemoVideoModal from './DemoVideoModal'
import DemoVideoTrigger from './DemoVideoTrigger'
import Toast from '../../components/Toast/Toast'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoProps {
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
}

interface ToastState {
  message: string
  type: 'success' | 'error'
}

const DemoVideo: React.FC<DemoVideoProps> = ({ t }) => {
  const { openModal } = useDemoVideoContext()
  const [toast, setToast] = useState<ToastState | null>(null)

  const handleSuccess = (message: string) => {
    setToast({
      message,
      type: 'success'
    })
  }

  const handleError = (message: string) => {
    setToast({
      message,
      type: 'error'
    })
  }

  const handleCloseToast = () => {
    setToast(null)
  }

  return (
    <>
      <DemoVideoTrigger onClick={openModal} text={t.triggerButton} />
      <DemoVideoModal
        t={t.modal}
        onSuccess={handleSuccess}
        onError={handleError}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  )
}

export default DemoVideo
