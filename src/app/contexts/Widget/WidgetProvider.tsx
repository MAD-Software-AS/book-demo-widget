import React, { useState } from 'react'
import WidgetContext, {
  WidgetProviderState,
  initialSubmitState,
  initialWidgetState
} from './WidgetContext'

interface WidgetProviderProps {
  children: React.ReactElement | React.ReactElement[] | string
  env: string
}

const WidgetProvider: React.FC<WidgetProviderProps> = ({ children, env }) => {
  const [state, setState] = useState<WidgetProviderState>(initialWidgetState)
  const [submitState, setSubmitState] = useState(initialSubmitState)

  const reset = () => {
    setState(initialWidgetState)
    setSubmitState(initialSubmitState)
  }

  return (
    <WidgetContext.Provider
      value={{
        formData: state.formData,
        setState,
        submitState,
        setSubmitState,
        step: state.step,
        errors: state.errors,
        reset,
        env
      }}
    >
      {children}
    </WidgetContext.Provider>
  )
}

export default WidgetProvider
