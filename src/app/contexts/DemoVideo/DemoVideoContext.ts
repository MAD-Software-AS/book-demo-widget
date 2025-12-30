import { CompanyType } from '../../domains/Company/Company.constants'
import { createContext } from 'react'

export interface DemoVideoFormData {
  email: string
  companyName: string
  selectedCompany: CompanyType | null
}

export interface DemoVideoState {
  formData: DemoVideoFormData
  errors: Record<string, string | null>
  isLoading: boolean
  isModalOpen: boolean
}

export interface DemoVideoContextValues {
  formData: DemoVideoFormData
  errors: Record<string, string | null>
  isLoading: boolean
  isModalOpen: boolean
  setFormData: React.Dispatch<React.SetStateAction<DemoVideoFormData>>
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  openModal: () => void
  closeModal: () => void
  reset: () => void
  env: string
  videoLink: string
}

export const initialFormData: DemoVideoFormData = {
  email: '',
  companyName: '',
  selectedCompany: null
}

export const initialDemoVideoState: DemoVideoState = {
  formData: initialFormData,
  errors: {},
  isLoading: false,
  isModalOpen: false
}

const DemoVideoContext = createContext<DemoVideoContextValues>({
  formData: initialFormData,
  errors: {},
  isLoading: false,
  isModalOpen: false,
  setFormData: () => {},
  setErrors: () => {},
  setIsLoading: () => {},
  openModal: () => {},
  closeModal: () => {},
  reset: () => {},
  env: 'dev',
  videoLink: ''
})

export default DemoVideoContext
