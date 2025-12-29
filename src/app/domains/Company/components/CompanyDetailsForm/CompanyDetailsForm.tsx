import CompanySelect, {
  CompanySelectProps
} from './components/CompanySelect/CompanySelect'
import { CompanyType, POS_PROVIDERS } from '../../Company.constants'
import PosProviderSelect, {
  PosProviderSelectProps
} from './components/PosProviderSelect/PosProviderSelect'

import React from 'react'
import useWidgetContext from '../../../../contexts/Widget/useWidgetContext'

export interface CompanyDetailsFormProps {
  t: {
    posProviderSelect: PosProviderSelectProps['t']
    companySelect: CompanySelectProps['t']
  }
}

export type CompanyDetailsFormErrors = {
  companyRequired: string
  posProviderRequired: string
  posProviderNameRequired: string
}

export const validateCompanyDetailsForm = (
  companyData: CompanyType | null,
  posProvider: string | null,
  posProviderName: string | null,
  t: CompanyDetailsFormErrors = {
    companyRequired: 'Company is required',
    posProviderRequired: 'POS provider is required',
    posProviderNameRequired: 'POS provider name is required'
  }
) => {
  const errors: Record<string, string> = {}

  if (!companyData) {
    errors.companyData = t.companyRequired
  }

  if (!posProvider) {
    errors.posProvider = t.posProviderRequired
  }

  if (posProvider === POS_PROVIDERS.OTHER && !posProviderName) {
    errors.posProviderName = t.posProviderNameRequired
  }

  return Object.keys(errors).length > 0 ? errors : null
}

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({ t }) => {
  const { formData, errors, setState } = useWidgetContext()

  const handleCompanySelect = (value: CompanyType | null) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        companyData: value,
        email: value?.email || null
      },
      errors: { ...prev.errors, companyData: null }
    }))
  }

  const handlePosProviderSelect = (value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, posProvider: value, posProviderName: null },
      errors: { ...prev.errors, posProvider: null, posProviderName: null }
    }))
  }

  const handlePosProviderChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, posProviderName: value },
      errors: { ...prev.errors, posProviderName: null }
    }))
  }

  return (
    <>
      <CompanySelect
        selectedItem={formData.companyData}
        setSelectedItem={handleCompanySelect}
        error={errors?.companyData}
        t={t.companySelect}
      />
      <PosProviderSelect
        selectedItem={formData.posProvider}
        setSelectedItem={handlePosProviderSelect}
        setInputValue={handlePosProviderChange}
        inputError={errors?.posProviderName}
        error={errors?.posProvider}
        t={t.posProviderSelect}
      />
    </>
  )
}

export default CompanyDetailsForm
