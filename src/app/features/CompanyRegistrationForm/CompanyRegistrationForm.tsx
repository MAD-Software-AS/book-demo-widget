import CompanyCredentialsForm, {
  CompanyCredentialsFormErrors,
  CompanyCredentialsFormProps
} from '../../domains/Company/components/CompanyCredentialsForm/CompanyCredentialsForm'
import CompanyDetailsForm, {
  CompanyDetailsFormErrors,
  CompanyDetailsFormProps
} from '../../domains/Company/components/CompanyDetailsForm/CompanyDetailsForm'
import PackageSelectForm, {
  PackageSelectFormProps
} from '../PackageSelectForm/PackageSelectForm'

import CompanyRegistrationActions from '../../domains/Company/components/CompanyRegistrationActions/CompanyRegistrationActions'
import CompanyRegistrationHeader from '../../domains/Company/components/CompanyRegistrationHeader/CompanyRegistrationHeader'
import FormLayout from '../../components/FormLayout/FormLayout'
import React from 'react'
import { STEPS } from '../../contexts/Widget/WidgetContext'
import useWidgetContext from '../../contexts/Widget/useWidgetContext'

export interface CompanyRegistrationFormProps {
  t: {
    packageSelectForm: PackageSelectFormProps['t']
    companyDetailsForm: CompanyDetailsFormProps['t']
    companyCredentialsForm: CompanyCredentialsFormProps['t']
    companyCredentialsFormErrors: CompanyCredentialsFormErrors
    companyDetailsFormErrors: CompanyDetailsFormErrors
    formImage: string
    subtitle: string
    resetAction: string
    nextAction: string
    submitAction: string
  }
}

const CompanyRegistrationForm: React.FC<CompanyRegistrationFormProps> = ({
  t: {
    packageSelectForm,
    companyDetailsForm,
    companyCredentialsForm,
    companyCredentialsFormErrors,
    companyDetailsFormErrors,
    formImage,
    subtitle,
    nextAction,
    resetAction,
    submitAction
  }
}) => {
  const { step } = useWidgetContext()

  switch (step) {
    case STEPS.COMPANY_DETAILS: {
      return (
        <FormLayout
          t={{ formImage }}
          head={<CompanyRegistrationHeader subtitle={subtitle} />}
          children={<CompanyDetailsForm t={companyDetailsForm} />}
          actions={
            <CompanyRegistrationActions
              t={{
                resetAction,
                submitAction,
                nextAction,
                companyCredentialsFormErrors,
                companyDetailsFormErrors
              }}
            />
          }
        />
      )
    }

    case STEPS.COMPANY_CREDENTIALS: {
      return (
        <FormLayout
          t={{ formImage }}
          head={<CompanyRegistrationHeader subtitle={subtitle} />}
          children={<CompanyCredentialsForm t={companyCredentialsForm} />}
          actions={
            <CompanyRegistrationActions
              t={{
                resetAction,
                submitAction,
                nextAction,
                companyCredentialsFormErrors,
                companyDetailsFormErrors
              }}
            />
          }
        />
      )
    }

    default:
      return <PackageSelectForm t={packageSelectForm} />
  }
}

export default CompanyRegistrationForm
