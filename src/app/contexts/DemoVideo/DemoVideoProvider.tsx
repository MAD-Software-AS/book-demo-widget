import DemoVideoContext, { initialFormData } from './DemoVideoContext'
import React, { useState } from 'react'

const VIDEO_URL =
  'https://player.vimeo.com/video/1180278253?h=bdafd62d33&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'

interface DemoVideoProviderProps {
  children: React.ReactElement | React.ReactElement[] | string
  env: string
}

const DemoVideoProvider: React.FC<DemoVideoProviderProps> = ({
  children,
  env
}) => {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const reset = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsLoading(false)
  }

  return (
    <DemoVideoContext.Provider
      value={{
        isFormSubmitted,
        setIsFormSubmitted,
        formData,
        errors,
        isLoading,
        isModalOpen,
        setFormData,
        setErrors,
        setIsLoading,
        openModal,
        closeModal,
        reset,
        env,
        videoLink: VIDEO_URL
      }}
    >
      {children}
    </DemoVideoContext.Provider>
  )
}

export default DemoVideoProvider
