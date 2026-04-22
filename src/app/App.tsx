import DemoVideo, { DemoVideoProps } from './features/DemoVideo/DemoVideo'

import DemoVideoProvider from './contexts/DemoVideo/DemoVideoProvider'
import React from 'react'

interface AppProps {
  t?: DemoVideoProps['t']
  env?: 'dev' | 'prod' | 'dev-local' | 'prod-local'
  triggerStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
}

const App: React.FC<AppProps> = ({
  env = 'prod',
  t,
  triggerStyle,
  containerStyle
}) => {
  return (
    <DemoVideoProvider env={env}>
      <DemoVideo
        t={t}
        triggerStyle={triggerStyle}
        containerStyle={containerStyle}
      />
    </DemoVideoProvider>
  )
}

export default App
