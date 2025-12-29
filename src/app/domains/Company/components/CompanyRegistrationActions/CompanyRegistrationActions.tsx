import {
  CompanyCredentialsFormErrors,
  validateCompanyCredentialsForm
} from '../CompanyCredentialsForm/CompanyCredentialsForm'
import {
  CompanyDetailsFormErrors,
  validateCompanyDetailsForm
} from '../CompanyDetailsForm/CompanyDetailsForm'
import { STEPS, StepType } from '../../../../contexts/Widget/WidgetContext'

import { POS_PROVIDERS } from '../../Company.constants'
import React from 'react'
import camelize from '../../../../utils/camelize'
import getApiUrl from '../../../../utils/getApiUrl'
import getFacebookPixelInstance from '../../../../utils/getFacebookPixelInstance'
import useWidgetContext from '../../../../contexts/Widget/useWidgetContext'

interface CompanyRegistrationActionsProps {
  t: {
    resetAction: string
    nextAction: string
    submitAction: string
    companyCredentialsFormErrors?: CompanyCredentialsFormErrors
    companyDetailsFormErrors?: CompanyDetailsFormErrors
  }
}

const CompanyRegistrationActions: React.FC<CompanyRegistrationActionsProps> = ({
  t: {
    resetAction,
    nextAction,
    submitAction,
    companyCredentialsFormErrors,
    companyDetailsFormErrors
  }
}) => {
  const { formData, reset, setState, submitState, setSubmitState, step, env } =
    useWidgetContext()

  const handleNext = () => {
    setState((prev) => {
      const errors = validateCompanyDetailsForm(
        prev.formData.companyData,
        prev.formData.posProvider,
        prev.formData.posProviderName,
        companyDetailsFormErrors
      )

      if (errors) {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            companyData: errors.companyData,
            posProvider: errors.posProvider,
            posProviderName: errors.posProviderName
          }
        }
      }

      return { ...prev, step: STEPS.COMPANY_CREDENTIALS }
    })
  }

  const registerCompany = async (): Promise<string | null> => {
    const posProvider =
      formData.posProvider === POS_PROVIDERS.OTHER
        ? camelize(formData.posProviderName!)
        : formData.posProvider!

    const data = {
      companyData: {
        organizationNumber: formData.companyData?.orgNumber,
        posProvider: posProvider,
        phone: formData.companyData?.phoneNumber,
        name: formData.companyData?.name,
        promoCode: formData.appliedPromoCode?.code || null
      },
      userData: {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      },
      packageData: {
        objectId: formData.packageId,
        period: formData.packagePeriod
      }
    }

    const API_URL = getApiUrl(env)

    const res = await fetch(`${API_URL}/companies/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const resData = await res.json()

    if (!res.ok) {
      return resData?.error || 'Unexpected Error'
    }

    // Track facebook pixel events
    const fbq = getFacebookPixelInstance()
    if (fbq) {
      fbq('track', 'CompleteRegistration')
    }

    return null
  }

  const handleSubmit = async () => {
    const errors = validateCompanyCredentialsForm(
      formData.email,
      formData.password,
      formData.fullName,
      formData.termsAccepted,
      companyCredentialsFormErrors
    )

    if (errors) {
      return setState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          email: errors.email,
          password: errors.password,
          confirmPassword: errors.confirmPassword,
          fullName: errors.fullName,
          termsAccepted: errors.termsAccepted
        }
      }))
    }

    try {
      setSubmitState({
        isLoading: true,
        error: false,
        success: false,
        errorType: null
      })

      const error = await registerCompany()

      if (error) {
        return setSubmitState({
          errorType: error,
          isLoading: false,
          error: true,
          success: false
        })
      }

      setSubmitState({
        isLoading: false,
        success: true,
        error: false,
        errorType: null
      })
    } catch (error) {
      setSubmitState({
        isLoading: false,
        error: true,
        success: false,
        errorType: 'Unexpected Error'
      })
    }
  }

  const renderTargetAction = (_step: StepType) => {
    switch (_step) {
      case STEPS.COMPANY_DETAILS: {
        return (
          <button
            className="btn btn-primary"
            disabled={submitState.isLoading}
            onClick={handleNext}
          >
            {nextAction}
          </button>
        )
      }
      case STEPS.COMPANY_CREDENTIALS: {
        return (
          <button
            className="btn btn-primary"
            disabled={submitState.isLoading}
            onClick={handleSubmit}
          >
            {submitAction}
          </button>
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className="flex-between">
      <button className="btn btn-dark" onClick={reset}>
        {resetAction}
      </button>

      {renderTargetAction(step)}
    </div>
  )
}

export default CompanyRegistrationActions
