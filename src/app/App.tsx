import Widget, { WidgetProps } from './features/Widget/Widget'

import React from 'react'
import WidgetProvider from './contexts/Widget/WidgetProvider'

interface AppProps {
  t: WidgetProps['t']
  env: string
}

const App: React.FC<AppProps> = ({ env, t }) => {
  return (
    <WidgetProvider env={env}>
      <Widget t={t} />
    </WidgetProvider>
  )
}

export default App
