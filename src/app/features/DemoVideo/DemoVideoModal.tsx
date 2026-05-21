import DemoVideoForm, {
  DemoVideoFormProps
} from '../../domains/DemoVideo/components/DemoVideoForm/DemoVideoForm'
import React, { useCallback } from 'react'

import Player from '@vimeo/player'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoModalProps {
  t: {
    emailForm: DemoVideoFormProps['t']
  }
  onError: (message: string) => void
}

const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ t, onError }) => {
  const {
    isModalOpen,
    closeModal,
    videoLink,
    isFormSubmitted,
    isCheckPointReached,
    setIsCheckPointReached
  } = useDemoVideoContext()

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const progressCallback = useCallback(
    (percent: number, seconds: number, player: Player) => {
      // if (seconds >= 33) {
      if (percent >= 100) {
        setIsCheckPointReached((prev) => {
          if (prev) return prev
          player.exitFullscreen()
          player.exitPictureInPicture()
          player.pause()
          return true
        })
      }
    },
    []
  )

  const isGateForm = isCheckPointReached && !isFormSubmitted

  const backdropClassName = `demo-video-modal__backdrop${
    isGateForm ? ' demo-video-modal__backdrop--gate' : ''
  }`
  const contentClassName = `demo-video-modal__content${
    isGateForm ? ' demo-video-modal__content--gate' : ''
  }`

  return (
    <div
      style={{
        display: isModalOpen ? 'flex' : 'none'
      }}
      className={backdropClassName}
      onClick={handleBackdropClick}
    >
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {isGateForm && (
          <div className="demo-video-modal__gate">
            <DemoVideoForm hideEmailLabel t={t.emailForm} onError={onError} />
          </div>
        )}
        <div
          style={{
            display: isGateForm ? 'none' : 'block'
          }}
        >
          <VideoPlayer
            videoUrl={videoLink}
            progressCallback={progressCallback}
          />
        </div>
      </div>
    </div>
  )
}

export default DemoVideoModal
