import React, { useCallback } from 'react'

import CalendarWidget from '../../../CalendarWidget/CalendarWidget'
import MadStart from '../MadStart/MadStart'
import Player from '@vimeo/player'
import VideoPlayer from '../../../../components/VideoPlayer/VideoPlayer'
import useDemoVideoContext from '../../../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoModalTranslations {
  dividerLabel: string
  madStart: {
    title: string
    subtitle: string
    features: string[]
    buttonText: string
    signupUrl: string
  }
  calendar: {
    title: string
    description: string
    buttonText: string
    url?: string
  }
}

export interface DemoVideoModalProps {
  t: DemoVideoModalTranslations
  onError: (message: string) => void
}

const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ t }) => {
  const {
    isModalOpen,
    closeModal,
    videoLink,
    isCheckPointReached,
    setIsCheckPointReached,
    isCalendarVisible,
    setIsCalendarVisible
  } = useDemoVideoContext()

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const progressCallback = useCallback(
    (percent: number, _seconds: number, player: Player) => {
      if (_seconds >= 60) {
        setIsCheckPointReached((prev) => {
          if (prev) return prev
          player?.exitFullscreen()
          player?.exitPictureInPicture()
          // player?.pause()
          return true
        })
      }
    },
    [setIsCheckPointReached]
  )

  const isGate = isCheckPointReached
  const showVideo = !isGate

  const backdropClassName = `demo-video-modal__backdrop${
    isGate ? ' demo-video-modal__backdrop--gate' : ''
  }`
  const contentClassName = `demo-video-modal__content${
    isGate ? ' demo-video-modal-wrapper' : ''
  }${isCalendarVisible ? ' demo-video-modal__content--calendar' : ''}`

  return (
    <div
      style={{
        display: isModalOpen ? 'flex' : 'none'
      }}
      className={backdropClassName}
      onClick={handleBackdropClick}
    >
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {isGate && !isCalendarVisible && (
          <div className="demo-video-modal__gate demo-video-modal__gate--choices">
            <MadStart
              title={t.madStart.title}
              subtitle={t.madStart.subtitle}
              features={t.madStart.features}
              buttonText={t.madStart.buttonText}
              signupUrl={t.madStart.signupUrl}
            />
            <div
              className="demo-video-modal__gate-divider"
              aria-hidden={false}
              role="separator"
            >
              <span className="demo-video-modal__gate-divider-label">
                {t.dividerLabel}
              </span>
            </div>
            <CalendarWidget
              title={t.calendar.title}
              description={t.calendar.description}
              buttonText={t.calendar.buttonText}
              url={t.calendar.url}
              onBookClick={() => setIsCalendarVisible(true)}
            />
          </div>
        )}
        {isGate && (
          <div
            style={{ display: isCalendarVisible ? 'flex' : 'none' }}
            className="demo-video-modal__gate demo-video-modal__gate--calendar"
          >
            <CalendarWidget showEmbed url={t.calendar.url} />
          </div>
        )}
        <div style={{ display: showVideo ? 'flex' : 'none' }}>
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
