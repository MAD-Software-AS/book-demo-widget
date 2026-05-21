import FormField from '../../../../components/FormField/FormField'
import React from 'react'
import sendDemoVideo from '../../DemoVideo.service'
import useDemoVideoContext from '../../../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoFormProps {
  /** When true, email field shows only placeholder (gate / lead form layout). */
  hideEmailLabel?: boolean
  t: {
    gateTitle?: string
    gateDescription?: string
    formErrors: {
      emailRequired: string
      emailInvalid: string
      nameRequired: string
      roleRequired: string
    }
    emailLabel: string
    emailPlaceholder: string
    nameLabel: string
    namePlaceholder: string
    roleLabel: string
    rolePlaceholder: string
    roles: string[][]
    closeButton: string
    submitButton: string
    submitLoading?: string
    successMessage: string
    errorMessage: string
  }
  onError: (message: string) => void
}

export interface DemoVideoFormErrors {
  email?: string | null
  name?: string | null
  role?: string | null
}

export const validateDemoVideoForm = (email: string): DemoVideoFormErrors => {
  const errors: DemoVideoFormErrors = {}

  if (!email || email.trim() === '') {
    errors.email = 'required'
  } else {
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      errors.email = 'invalid'
    }
  }

  return errors
}

const DemoVideoForm: React.FC<DemoVideoFormProps> = ({
  hideEmailLabel = false,
  onError,
  t
}) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    closeModal,
    env,
    videoLink,
    setIsFormSubmitted,
    player
  } = useDemoVideoContext()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, email: value }))
    if (errors.email) setErrors((prev) => ({ ...prev, email: null }))
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

  const dismissButtonClassName = `demo-video-modal__dismiss-button${
    isLoading ? ' demo-video-modal__dismiss-button--disabled' : ''
  }`

  return (
    <div>
      <h2 className="title-1 text-center demo-video-modal__gate-title">
        {t.gateTitle}
      </h2>
      <p className="demo-video-modal__gate-description">{t.gateDescription}</p>
      <FormField
        label={hideEmailLabel ? undefined : t.emailLabel}
        error={errors.email || null}
      >
        <input
          type="email"
          className={`input ${errors.email ? 'input-error' : ''}`}
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={handleEmailChange}
        />
      </FormField>
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
  )
}

export default DemoVideoForm
