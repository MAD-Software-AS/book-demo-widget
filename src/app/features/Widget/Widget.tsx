import CompanyRegistrationError, {
  CompanyRegistrationErrorProps
} from '../../domains/Company/components/CompanyRegistrationError/CompanyRegistrationError'
import CompanyRegistrationForm, {
  CompanyRegistrationFormProps
} from '../CompanyRegistrationForm/CompanyRegistrationForm'
import CompanyRegistrationSuccess, {
  CompanyRegistrationSuccessProps
} from '../../domains/Company/components/CompanyRegistrationSuccess/CompanyRegistrationSuccess'

import Loading from '../../components/Loading/Loading'
import React from 'react'
import useWidgetContext from '../../contexts/Widget/useWidgetContext'

export interface WidgetProps {
  t: {
    companyRegistrationForm: CompanyRegistrationFormProps['t']
    companyRegistrationSuccess: CompanyRegistrationSuccessProps['t']
    companyRegistrationError: CompanyRegistrationErrorProps['t']
  }
}

const Widget: React.FC<WidgetProps> = ({
  t: {
    companyRegistrationForm,
    companyRegistrationSuccess,
    companyRegistrationError
  }
}) => {
  const { submitState } = useWidgetContext()

  return (
    <div className="section-content">
      {submitState.success ? (
        <CompanyRegistrationSuccess t={companyRegistrationSuccess} />
      ) : submitState.error ? (
        <CompanyRegistrationError
          t={companyRegistrationError}
          errorType={submitState.errorType}
        />
      ) : submitState.isLoading ? (
        <Loading />
      ) : (
        <CompanyRegistrationForm t={companyRegistrationForm} />
      )}
    </div>
  )
}

export default Widget
