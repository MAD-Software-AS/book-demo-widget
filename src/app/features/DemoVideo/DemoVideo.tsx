import DemoVideoModal, { DemoVideoModalProps } from './DemoVideoModal'
import React, { useState } from 'react'

import DemoVideoContainer from './DemoVideoContainer'
import DemoVideoTrigger from './DemoVideoTrigger'
import Toast from '../../components/Toast/Toast'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface DemoVideoProps {
  t: {
    triggerButton: string
    modal: DemoVideoModalProps['t']
  }
  triggerStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
}

interface ToastState {
  message: string
  type: 'success' | 'error'
}

const DemoVideo: React.FC<DemoVideoProps> = ({
  t,
  triggerStyle,
  containerStyle
}) => {
  const { openModal } = useDemoVideoContext()
  const [toast, setToast] = useState<ToastState | null>(null)

  const handleSuccess = (message: string) => {
    setToast({
      message,
      type: 'success'
    })
  }

  const handleError = (message: string) => {
    setToast({
      message,
      type: 'error'
    })
  }

  const handleCloseToast = () => {
    setToast(null)
  }

  return (
    <>
      <DemoVideoContainer onClick={openModal} containerStyle={containerStyle}>
        <DemoVideoTrigger
          onClick={openModal}
          text={t.triggerButton}
          style={triggerStyle}
        />
      </DemoVideoContainer>
      <DemoVideoModal
        t={t.modal}
        onSuccess={handleSuccess}
        onError={handleError}
      />
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
