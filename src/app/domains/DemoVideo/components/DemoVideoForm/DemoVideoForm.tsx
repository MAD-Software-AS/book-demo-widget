import CompanySelect from '../../../../domains/Company/components/CompanySelect/CompanySelect'
import { CompanyType } from '../../../Company/Company.constants'
import FormField from '../../../../components/FormField/FormField'
import React from 'react'
import useDemoVideoContext from '../../../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoFormProps {
  t: {
    emailLabel: string
    emailPlaceholder: string
    companyNameLabel: string
    companyNamePlaceholder: string
    organizationNumber: string
    noData: string
  }
}

export interface DemoVideoFormErrors {
  email?: string | null
  companyName?: string | null
}

export const validateDemoVideoForm = (
  email: string,
  selectedCompany: CompanyType | null
): DemoVideoFormErrors => {
  const errors: DemoVideoFormErrors = {}

  if (!email || email.trim() === '') {
    errors.email = 'required'
  } else {
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      errors.email = 'invalid'
    }
  }

  if (!selectedCompany) {
    errors.companyName = 'required'
  }

  return errors
}

const DemoVideoForm: React.FC<DemoVideoFormProps> = ({ t }) => {
  const { formData, setFormData, errors, setErrors } = useDemoVideoContext()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, email: value }))
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: null }))
    }
  }

  const handleCompanySelect = (company: CompanyType | null) => {
    setFormData((prev) => ({
      ...prev,
      selectedCompany: company,
      companyName: company?.name || ''
    }))
    if (errors.companyName) {
      setErrors((prev) => ({ ...prev, companyName: null }))
    }
  }

  return (
    <div>
      <FormField label={t.emailLabel} error={errors.email || null}>
        <input
          type="email"
          className={`input ${errors.email ? 'input-error' : ''}`}
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={handleEmailChange}
        />
      </FormField>

      <CompanySelect
        selectedItem={formData.selectedCompany}
        setSelectedItem={handleCompanySelect}
        error={errors.companyName || null}
        t={{
          fieldLabel: t.companyNameLabel,
          selectPlaceholder: t.companyNamePlaceholder,
          organizationNumber: t.organizationNumber,
          noData: t.noData
        }}
      />
    </div>
  )
}

export default DemoVideoForm
