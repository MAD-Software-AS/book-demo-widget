import FormField from '../../../../components/FormField/FormField'
import React from 'react'
import useDemoVideoContext from '../../../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoFormProps {
  /** When true, email field shows only placeholder (gate / lead form layout). */
  hideEmailLabel?: boolean
  t?: {
    emailLabel: string
    emailPlaceholder: string
    nameLabel: string
    namePlaceholder: string
    roleLabel: string
    rolePlaceholder: string
    roles: string[][]
  }
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
  t = {
    roles: [
      ['owner', 'Eier'],
      ['manager', 'Manager'],
      ['employee', 'Ansatt']
    ],
    emailLabel: 'E-post',
    emailPlaceholder: 'Din e-post',
    nameLabel: 'Salong',
    namePlaceholder: 'Navn på salong',
    roleLabel: 'Rolle',
    rolePlaceholder: 'Hva beskriver deg best?'
  }
}) => {
  const { formData, setFormData, errors, setErrors } = useDemoVideoContext()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, email: value }))
    if (errors.email) setErrors((prev) => ({ ...prev, email: null }))
  }

  return (
    <div>
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
    </div>
  )
}

export default DemoVideoForm
