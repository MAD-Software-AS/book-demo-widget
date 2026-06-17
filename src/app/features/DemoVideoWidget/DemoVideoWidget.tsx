import React, { useState } from 'react'
import initializeT, { WidgetTranslations } from '../../initializeT'

import DemoVideoContainer from './components/DemoVideoContainer/DemoVideoContainer'
import DemoVideoModal from './components/DemoVideoModal/DemoVideoModal'
import DemoVideoTrigger from './components/DemoVideoTrigger/DemoVideoTrigger'
import Toast from '../../components/Toast/Toast'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoWidgetProps {
  t: Partial<WidgetTranslations>
  triggerStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
  isPlayButton?: boolean
}

interface ToastState {
  message: string
  type: 'success' | 'error'
}

const DemoVideo: React.FC<DemoVideoWidgetProps> = ({
  t,
  triggerStyle,
  containerStyle,
  isPlayButton
}) => {
  const translations = initializeT(t)
  const { openModal } = useDemoVideoContext()
  const [toast, setToast] = useState<ToastState | null>(null)

  const handleError = (message: string) => {
    setToast({ message, type: 'error' })
  }

  const handleCloseToast = () => setToast(null)

  return (
    <>
      <DemoVideoContainer onClick={openModal} containerStyle={containerStyle}>
        <DemoVideoTrigger
          onClick={openModal}
          text={translations.triggerButton}
          style={triggerStyle}
          isPlayButton={isPlayButton}
        />
      </DemoVideoContainer>
      <DemoVideoModal t={translations.modal} onError={handleError} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  )
}

export default DemoVideo
