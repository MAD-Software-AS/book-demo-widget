import Checkbox from '../../../../components/Checkbox/Checkbox'
import FormField from '../../../../components/FormField/FormField'
import React from 'react'
import useWidgetContext from '../../../../contexts/Widget/useWidgetContext'

export interface CompanyCredentialsFormProps {
  t: {
    emailPlaceholder: string
    passwordPlaceholder: string
    fullNamePlaceholder: string
    termsPlaceholder: string
    termsLabel: string
    termsLink: string
  }
}

export type CompanyCredentialsFormErrors = {
  emailRequired: string
  emailInvalid: string
  passwordRequired: string
  fullNameRequired: string
  passwordToShort: string
  termsAccepted: string
}

export const validateCompanyCredentialsForm = (
  email: string | null,
  password: string | null,
  fullName: string | null,
  termsAccepted: boolean,
  t: CompanyCredentialsFormErrors = {
    emailRequired: 'Email is required',
    emailInvalid: 'Email is invalid',
    passwordRequired: 'Password is required',
    fullNameRequired: 'Full name is required',
    passwordToShort: 'Password must be at least 6 characters long',
    termsAccepted: 'You must accept the terms and conditions'
  }
) => {
  const errors: Record<string, string> = {}

  if (!email) {
    errors.email = t.emailRequired
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = t.emailInvalid
  }

  if (!password) {
    errors.password = t.passwordRequired
  } else if (password.length < 6) {
    errors.password = t.passwordToShort
  }

  if (!fullName) {
    errors.fullName = t.fullNameRequired
  }

  if (!termsAccepted) {
    errors.termsAccepted = t.termsAccepted
  }

  return Object.keys(errors).length > 0 ? errors : null
}

const CompanyCredentialsForm: React.FC<CompanyCredentialsFormProps> = ({
  t
}) => {
  const { formData, errors, setState } = useWidgetContext()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, email: value },
      errors: { ...prev.errors, email: null }
    }))
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, password: value },
      errors: { ...prev.errors, password: null }
    }))
  }
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, fullName: value },
      errors: { ...prev.errors, fullName: null }
    }))
  }
  const handleTermsChange = (value: boolean) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, termsAccepted: value },
      errors: { ...prev.errors, termsAccepted: null }
    }))
  }

  return (
    <>
      <FormField error={errors.fullName}>
        <input
          type="text"
          className="input"
          value={formData.fullName || ''}
          placeholder={t?.fullNamePlaceholder}
          onChange={handleFullNameChange}
        />
      </FormField>
      <FormField error={errors.email}>
        <input
          type="text"
          className="input"
          value={formData.email || ''}
          placeholder={t?.emailPlaceholder}
          onChange={handleEmailChange}
        />
      </FormField>
      <FormField error={errors.password}>
        <input
          type="password"
          className="input"
          value={formData.password || ''}
          placeholder={t?.passwordPlaceholder}
          onChange={handlePasswordChange}
        />
      </FormField>
      <FormField error={errors.termsAccepted}>
        <Checkbox checked={formData.termsAccepted} onChange={handleTermsChange}>
          <span className="text-caption">
            {t.termsPlaceholder}{' '}
            <a
              className="text-caption"
              href={t.termsLink}
              target="_blank"
              rel="noreferrer"
            >
              {t?.termsLabel}
            </a>
            .
          </span>
        </Checkbox>
      </FormField>
    </>
  )
}

export default CompanyCredentialsForm
