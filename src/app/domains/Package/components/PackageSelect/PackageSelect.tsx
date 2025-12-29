import PackageView, { PackageViewProps } from '../PackageView/PackageView'

import { Package } from '../../Package.model'
import React from 'react'

export interface PackageSelectProps {
  t: PackageViewProps['t']
  packages: Package[]
  priceIndex: number
  onSelect?: PackageViewProps['onSelect']
  currency?: string
  appliedPromoCode?: PackageViewProps['appliedPromoCode']
}

const PackageSelect: React.FC<PackageSelectProps> = ({
  t,
  packages,
  priceIndex,
  onSelect,
  currency,
  appliedPromoCode
}) => {
  return (
    <div className="packages-wrapper">
      {packages.map((pkg: Package, index: number) => (
        <div key={index}>
          <PackageView
            currency={currency}
            onSelect={onSelect}
            priceIndex={priceIndex}
            t={t}
            appliedPromoCode={appliedPromoCode}
            {...pkg}
          />
        </div>
      ))}
    </div>
  )
}

export default PackageSelect
