import DemoVideoContext, { initialFormData } from './DemoVideoContext'
import React, { useState } from 'react'

import Player from '@vimeo/player'
import { isIosLikeDevice } from '../../utils/isIosLikeDevice'

// const VIDEO_URL = 'https://vimeo.com/753580183'
const VIDEO_URL =
  'https://player.vimeo.com/video/1183401796?h=bbc384be2f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'

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
  const [isCheckPointReached, setIsCheckPointReached] = useState(false)
  const [player, setPlayer] = useState<Player | null>(null)

  const openModal = () => {
    setIsModalOpen(true)
    if (!isCheckPointReached || isFormSubmitted) {
      if (isIosLikeDevice()) return
      player?.play()
    }
  }
  const closeModal = () => {
    setIsModalOpen(false)
    player?.pause()
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
        videoLink: VIDEO_URL,
        isCheckPointReached,
        setIsCheckPointReached,
        player,
        setPlayer
      }}
    >
      {children}
    </DemoVideoContext.Provider>
  )
}

export default DemoVideoProvider
