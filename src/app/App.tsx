import DemoVideo, { DemoVideoProps } from './features/DemoVideo/DemoVideo'

import DemoVideoProvider from './contexts/DemoVideo/DemoVideoProvider'
import React from 'react'

interface AppProps {
  t: DemoVideoProps['t']
  env: string
  videoLink: string
  triggerStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
}

const App: React.FC<AppProps> = ({
  env,
  t,
  videoLink,
  triggerStyle,
  containerStyle
}) => {
  return (
    <DemoVideoProvider env={env} videoLink={videoLink}>
      <DemoVideo
        t={t}
        triggerStyle={triggerStyle}
        containerStyle={containerStyle}
      />
    </DemoVideoProvider>
  )
}

export default App
