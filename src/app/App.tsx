import DemoVideoWidget, {
  DemoVideoWidgetProps
} from './features/DemoVideoWidget/DemoVideoWidget'

import DemoVideoProvider from './contexts/DemoVideo/DemoVideoProvider'
import React from 'react'

interface AppProps {
  t: DemoVideoWidgetProps['t']
  env?: 'dev' | 'prod' | 'dev-local' | 'prod-local'
  triggerStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
  videoLink?: string
}

const App: React.FC<AppProps> = ({
  containerStyle,
  triggerStyle,
  env = 'prod',
  videoLink,
  t
}) => {
  return (
    <DemoVideoProvider env={env} videoLink={videoLink}>
      <DemoVideoWidget
        containerStyle={containerStyle}
        triggerStyle={triggerStyle}
        t={t}
      />
    </DemoVideoProvider>
  )
}

export default App
