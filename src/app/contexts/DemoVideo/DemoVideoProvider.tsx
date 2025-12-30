import React, { useState } from 'react'
import DemoVideoContext, { initialFormData, initialDemoVideoState } from './DemoVideoContext'

interface DemoVideoProviderProps {
  children: React.ReactElement | React.ReactElement[] | string
  env: string
  videoLink: string
}

const DemoVideoProvider: React.FC<DemoVideoProviderProps> = ({
  children,
  env,
  videoLink
}) => {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        videoLink
      }}
    >
      {children}
    </DemoVideoContext.Provider>
  )
}

export default DemoVideoProvider

