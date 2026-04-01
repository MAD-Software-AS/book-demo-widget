import DemoVideoForm, {
  DemoVideoFormProps,
  validateDemoVideoForm
} from '../../domains/DemoVideo/components/DemoVideoForm/DemoVideoForm'

import React from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import sendDemoVideo from '../../domains/DemoVideo/DemoVideo.service'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoModalProps {
  t: {
    modalTitle: string
    closeButton: string
    submitButton: string
    form: DemoVideoFormProps['t']
    formErrors: {
      emailRequired: string
      emailInvalid: string
      nameRequired: string
      roleRequired: string
    }
    successMessage: string
    errorMessage: string
  }
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  t,
  onSuccess,
  onError
}) => {
  const {
    formData,
    setErrors,
    isLoading,
    setIsLoading,
    isModalOpen,
    closeModal,

    env,
    videoLink,
    isFormSubmitted,
    setIsFormSubmitted
  } = useDemoVideoContext()

  if (!isModalOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validateDemoVideoForm(
      formData.email,
      formData.name,
      formData.role
    )

    const formattedErrors: Record<string, string | null> = {}
    if (validationErrors.email === 'required') {
      formattedErrors.email = t.formErrors.emailRequired
    } else if (validationErrors.email === 'invalid') {
      formattedErrors.email = t.formErrors.emailInvalid
    }

    if (validationErrors.name === 'required') {
      formattedErrors.name = t.formErrors.nameRequired
    }
    if (validationErrors.role === 'required') {
      formattedErrors.role = t.formErrors.roleRequired
    }

    if (Object.keys(formattedErrors).length > 0) {
      setErrors(formattedErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const result = await sendDemoVideo(
        {
          customerEmail: formData.email,
          customerName: formData.name,
          customerRole: formData.role,
          videoLink: videoLink
        },
        env
      )

      if (result.success) {
        setIsFormSubmitted(true)
        // closeModal()
        // reset()
        // onSuccess(t.successMessage)
      } else {
        onError(result.error || t.errorMessage)
      }
    } catch (error) {
      onError(t.errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    cursor: 'default'
  }

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-accent)',
    borderRadius: 'var(--border-radius-default)',
    maxWidth: '600px',
    width: '90%',
    padding: '24px',
    position: 'relative'
  }

  const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '32px'
  }

  return (
    <div style={backdropStyle} onClick={handleBackdropClick}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {!isFormSubmitted && (
          <h2 className="subtitle text-center" style={{ marginBottom: '24px' }}>
            {t.modalTitle}
          </h2>
        )}

        {isFormSubmitted ? (
          <VideoPlayer videoUrl={videoLink} />
        ) : (
          <DemoVideoForm t={t.form} />
        )}

        {!isFormSubmitted && (
          <div style={buttonsContainerStyle}>
            <button
              className="btn btn-dark"
              onClick={closeModal}
              disabled={isLoading}
            >
              {t.closeButton}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Laster...' : t.submitButton}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DemoVideoModal
