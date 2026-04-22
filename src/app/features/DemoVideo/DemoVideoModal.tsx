import DemoVideoForm, {
  DemoVideoFormProps,
  validateDemoVideoForm
} from '../../domains/DemoVideo/components/DemoVideoForm/DemoVideoForm'
import React, { useCallback } from 'react'

import Player from '@vimeo/player'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import sendDemoVideo from '../../domains/DemoVideo/DemoVideo.service'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoModalProps {
  t?: {
    form?: DemoVideoFormProps['t'] | undefined
    gateTitle?: string
    gateDescription?: string
    closeButton: string
    submitButton: string
    submitLoading?: string
    formErrors: {
      emailRequired: string
      emailInvalid: string
      nameRequired: string
      roleRequired: string
    }
    successMessage: string
    errorMessage: string
  }
  onError: (message: string) => void
}

const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  t = {
    form: undefined,
    gateTitle: 'Se resten av demoen',
    gateDescription:
      'Se hvordan salonger får full kontroll, sparer tid og skaper ny motivasjon i teamet.',
    submitButton: 'Se hele demoen',
    submitLoading: 'Laster...',
    closeButton: 'Ikke nå',
    formErrors: {
      emailRequired: 'E-post er påkrevet',
      emailInvalid: 'E-posten er ugyldig',
      nameRequired: 'Navn er påkrevd',
      roleRequired: 'Rolle er påkrevd'
    },
    successMessage: 'Demovideo sendt!',
    errorMessage: 'Kunne ikke sende demovideo. Vennligst prøv igjen.'
  },
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
    setIsFormSubmitted,
    isCheckPointReached,
    setIsCheckPointReached,
    player
  } = useDemoVideoContext()

  const progressCallback = useCallback(
    (percent: number, seconds: number, player: Player) => {
      if (seconds >= 33) {
        setIsCheckPointReached((prev) => {
          if (prev) return prev
          player.pause()
          return true
        })
      }
    },
    []
  )

  if (!isModalOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validateDemoVideoForm(formData.email)

    const formattedErrors: Record<string, string | null> = {}
    if (validationErrors.email === 'required') {
      formattedErrors.email = t.formErrors.emailRequired
    } else if (validationErrors.email === 'invalid') {
      formattedErrors.email = t.formErrors.emailInvalid
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
        player?.play()
      } else {
        onError(result.error || t.errorMessage)
      }
    } catch (error) {
      onError(t.errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const isGateForm = isCheckPointReached && !isFormSubmitted

  const backdropClassName = `demo-video-modal__backdrop${
    isGateForm ? ' demo-video-modal__backdrop--gate' : ''
  }`
  const contentClassName = `demo-video-modal__content${
    isGateForm ? ' demo-video-modal__content--gate' : ''
  }`
  const dismissButtonClassName = `demo-video-modal__dismiss-button${
    isLoading ? ' demo-video-modal__dismiss-button--disabled' : ''
  }`

  return (
    <div className={backdropClassName} onClick={handleBackdropClick}>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {isGateForm && (
          <div className="demo-video-modal__gate">
            <h2 className="title-1 text-center demo-video-modal__gate-title">
              {t.gateTitle}
            </h2>
            <p className="demo-video-modal__gate-description">
              {t.gateDescription}
            </p>
            <DemoVideoForm hideEmailLabel t={t.form} />
            <button
              type="button"
              className="btn btn-primary demo-video-modal__primary-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? t.submitLoading : t.submitButton}
            </button>
            <div className="demo-video-modal__dismiss-row">
              <span className="demo-video-modal__dismiss-divider" />
              <button
                type="button"
                className={dismissButtonClassName}
                onClick={closeModal}
                disabled={isLoading}
              >
                {t.closeButton}
              </button>
              <span className="demo-video-modal__dismiss-divider" />
            </div>
          </div>
        )}
        <div
          style={{
            display: isGateForm ? 'none' : 'block'
          }}
        >
          <VideoPlayer
            videoUrl={videoLink}
            progressCallback={progressCallback}
          />
        </div>
      </div>
    </div>
  )
}

export default DemoVideoModal
