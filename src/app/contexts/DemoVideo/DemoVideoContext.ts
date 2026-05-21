import Player from '@vimeo/player'
import { createContext } from 'react'

export interface DemoVideoFormData {
  email: string
  name: string
  role: string | null
}

export interface DemoVideoState {
  formData: DemoVideoFormData
  errors: Record<string, string | null>
  isLoading: boolean
  isModalOpen: boolean
}

export interface DemoVideoContextValues {
  isFormSubmitted: boolean
  formData: DemoVideoFormData
  errors: Record<string, string | null>
  isLoading: boolean
  isModalOpen: boolean
  setFormData: React.Dispatch<React.SetStateAction<DemoVideoFormData>>
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  openModal: () => void
  closeModal: () => void
  reset: () => void
  env: string
  videoLink: string
  isCheckPointReached: boolean
  setIsCheckPointReached: React.Dispatch<React.SetStateAction<boolean>>
  isCalendarVisible: boolean
  setIsCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>
  player: Player | null
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>
}

export const initialFormData: DemoVideoFormData = {
  email: '',
  name: '',
  role: null
}

export const initialDemoVideoState: DemoVideoState = {
  formData: initialFormData,
  errors: {},
  isLoading: false,
  isModalOpen: false
}

const DemoVideoContext = createContext<DemoVideoContextValues>({
  isFormSubmitted: false,
  formData: initialFormData,
  errors: {},
  isLoading: false,
  isModalOpen: false,
  setFormData: () => {},
  setErrors: () => {},
  setIsLoading: () => {},
  openModal: () => {},
  closeModal: () => {},
  setIsFormSubmitted: () => {},
  reset: () => {},
  env: 'dev',
  videoLink: '',
  isCheckPointReached: false,
  setIsCheckPointReached: () => {},
  isCalendarVisible: false,
  setIsCalendarVisible: () => {},
  player: null,
  setPlayer: () => {}
})

export default DemoVideoContext
