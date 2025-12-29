import { Package } from '../../Package.model'
import { PromoCode } from '../../../PromoCode/PromoCode.model'
import React from 'react'
import calculateDiscountedPrice from '../../../../utils/calculateDiscountedPrice'

export interface PackageViewProps extends Package {
  t: {
    mostPopular: string
  }
  onSelect?: (id: string, period: string) => void
  priceIndex: number
  currency?: string
  appliedPromoCode?: PromoCode | null
}

const PackageView: React.FC<PackageViewProps> = ({
  t,
  objectId,
  periodKey,
  name,
  prices,
  period,
  inherits,
  functions,
  priceIndex,
  caption,
  action,
  currency = 'kr',
  mostPopular,
  onSelect,
  appliedPromoCode
}) => {
  const originalPrice = prices[priceIndex]

  const finalPrice = calculateDiscountedPrice(
    originalPrice,
    appliedPromoCode || null
  )
  const hasDiscount = appliedPromoCode && finalPrice !== originalPrice

  const handleSelect = () => onSelect?.(objectId, periodKey)

  return (
    <div className="package-view">
      {mostPopular && (
        <div className="package-popular-badge">{t.mostPopular}</div>
      )}

      <div>
        <div className="text-center">
          <h3 className="text" style={{ marginBottom: '24px' }}>
            <strong>{name}</strong>
          </h3>
          <h1
            className="title"
            style={{ marginBottom: hasDiscount ? '4px' : '12px' }}
          >
            {finalPrice} {currency}
          </h1>
          {hasDiscount && (
            <div style={{ marginBottom: '8px' }}>
              <span
                className="text-caption"
                style={{ textDecoration: 'line-through' }}
              >
                {originalPrice} {currency}
              </span>
            </div>
          )}
          <span className="text-caption">{period}</span>
        </div>
        <div className="divider" />
        {inherits && (
          <div className="text" style={{ marginBottom: '24px' }}>
            <strong>{inherits}</strong>
          </div>
        )}
        <div>
          {functions.map(({ name, subItems, url }, idx) => (
            <div
              key={idx}
              className="package-function"
              style={{ marginBottom: '8px' }}
            >
              <div>
                <span className="package-icon-check" />
                <span className="text" style={{ cursor: 'pointer' }}>
                  <a
                    href={url}
                    target="_blank"
                    className="unset-all"
                    rel="noopener noreferrer"
                  >
                    <strong>{name}</strong>
                  </a>
                </span>
              </div>
              {subItems?.length && (
                <ul style={{ marginBlock: '4px' }}>
                  {subItems.map((subItem, subIdx) => (
                    <li key={subIdx} className="text">
                      <span className="package-icon-check" />
                      <span className="text-caption">
                        <strong>{subItem}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {action.isFree ? (
          <button
            style={{ minWidth: '140px' }}
            className="btn btn-primary"
            onClick={handleSelect}
          >
            {action.text}
          </button>
        ) : (
          <button
            style={{ minWidth: '140px' }}
            className="btn btn-dark"
            onClick={handleSelect}
          >
            {action.text}
          </button>
        )}
        <div className="text-center text-caption" style={{ marginTop: '16px' }}>
          {caption}
        </div>
      </div>
    </div>
  )
}

export default PackageView
