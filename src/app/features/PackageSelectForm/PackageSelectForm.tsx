import CompanySizeSelect from '../../domains/Company/components/CompanySizeSelect/CompanySizeSelect'
import { Package } from '../../domains/Package/Package.model'
import PackageSelect from '../../domains/Package/components/PackageSelect/PackageSelect'
import PromoCodeInput from '../../domains/PromoCode/components/PromoCodeInput/PromoCodeInput'
import React from 'react'
import { STEPS } from '../../contexts/Widget/WidgetContext'
import useWidgetContext from '../../contexts/Widget/useWidgetContext'

export interface PackageSelectFormProps {
  t: {
    packages: Package[]
    companySizes: string[]
    title: string
    subtitle: string
    pricesDescription: string
    mostPopular: string
    currency?: string
    promoCode?: {
      label: string
      placeholder: string
      applyButton: string
      notFoundError: string
      removeButton: string
    }
  }
}

const PackageSelectForm: React.FC<PackageSelectFormProps> = ({
  t: {
    companySizes,
    packages,
    title,
    subtitle,
    currency,
    pricesDescription,
    mostPopular,
    promoCode
  }
}) => {
  const [priceIndex, setPriceIndex] = React.useState(0)

  const { formData, setState, env } = useWidgetContext()

  const handlePackageSelect = (id: string, period: string) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        packageId: id,
        packagePeriod: period
      },
      step: STEPS.COMPANY_DETAILS
    }))
  }

  const handlePromoCodeApplied = (promoCode: any) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        appliedPromoCode: promoCode
      }
    }))
  }

  return (
    <>
      <h1 className="subtitle text-center">{title}</h1>
      <span
        className="text text-center"
        style={{ marginTop: '12px', marginBottom: '16px' }}
      >
        {subtitle}
      </span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px'
        }}
      >
        <CompanySizeSelect
          companySizes={companySizes}
          onChange={setPriceIndex}
          value={priceIndex}
        />
      </div>
      <div>
        <PackageSelect
          t={{ mostPopular }}
          currency={currency}
          onSelect={handlePackageSelect}
          priceIndex={priceIndex}
          packages={packages}
          appliedPromoCode={formData.appliedPromoCode}
        />
      </div>
      <div className="text-center" style={{ marginTop: '24px' }}>
        <span className="text">{pricesDescription}</span>
      </div>
      {promoCode && (
        <div style={{ marginTop: '12px' }}>
          <PromoCodeInput
            t={promoCode}
            onPromoCodeApplied={handlePromoCodeApplied}
            appliedPromoCode={formData.appliedPromoCode}
            env={env}
          />
        </div>
      )}
    </>
  )
}

export default PackageSelectForm
