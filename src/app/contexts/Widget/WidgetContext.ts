import { CompanyType } from 'src/app/domains/Company/Company.constants'
import { PromoCode } from 'src/app/domains/PromoCode/PromoCode.model'
import { createContext } from 'react'

export const STEPS = {
  PLAN_SELECT: 'planSelect',
  COMPANY_DETAILS: 'companyDetails',
  COMPANY_CREDENTIALS: 'companyCredentials'
} as const

export type StepType = (typeof STEPS)[keyof typeof STEPS]

export interface WidgetState {
  packageId: string | null
  packagePeriod: string | null
  companyData: CompanyType | null
  posProvider: string | null
  posProviderName: string | null
  password: string | null
  fullName: string | null
  email: string | null
  termsAccepted: boolean
  appliedPromoCode: PromoCode | null
}

export interface SubmitState {
  isLoading: boolean
  success: boolean
  error: boolean
  errorType: string | null
}

export interface WidgetProviderState {
  errors: Record<string, string | null>
  formData: WidgetState
  step: StepType
}

interface WidgetContextValues {
  formData: WidgetState
  setState: React.Dispatch<React.SetStateAction<WidgetProviderState>>
  submitState: SubmitState
  setSubmitState: React.Dispatch<React.SetStateAction<SubmitState>>
  step: StepType
  errors: Record<string, string | null>
  reset: () => void
  env: string
}

export const initialFormData: WidgetState = {
  packageId: null,
  packagePeriod: null,
  termsAccepted: false,
  companyData: null,
  posProvider: null,
  posProviderName: null,
  password: null,
  fullName: null,
  email: null,
  appliedPromoCode: null
}
export const initialSubmitState: SubmitState = {
  isLoading: false,
  success: false,
  error: false,
  errorType: null
}
export const initialWidgetState: WidgetProviderState = {
  errors: {},
  formData: initialFormData,
  step: STEPS.PLAN_SELECT
}

const WidgetContext = createContext<WidgetContextValues>({
  ...initialWidgetState,
  submitState: initialSubmitState,
  setState: () => {},
  setSubmitState: () => {},
  reset: () => {},
  env: 'dev'
})

export default WidgetContext
