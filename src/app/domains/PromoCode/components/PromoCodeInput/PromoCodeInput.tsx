import React, { useState } from 'react'

import FormField from '../../../../components/FormField/FormField'
import { PromoCode } from '../../PromoCode.model'
import { PromoCodeService } from '../../PromoCode.service'

export interface PromoCodeInputProps {
  onPromoCodeApplied: (promoCode: PromoCode | null) => void
  appliedPromoCode: PromoCode | null
  env: string
  t: {
    label: string
    placeholder: string
    applyButton: string
    notFoundError: string
    removeButton: string
  }
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  onPromoCodeApplied,
  appliedPromoCode,
  env,
  t
}) => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApplyCode = async () => {
    if (!code.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await PromoCodeService.verifyPromoCode(
        { code: code.trim() },
        env
      )

      if (response.success && response.data.valid) {
        onPromoCodeApplied(response.data.promoCode)
        setCode('')
        setError(null)
      } else {
        setError(t.notFoundError)
        onPromoCodeApplied(null)
      }
    } catch (err) {
      setError(t.notFoundError)
      onPromoCodeApplied(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveCode = () => {
    onPromoCodeApplied(null)
    setError(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCode()
    }
  }

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
    setError(null)
  }

  if (appliedPromoCode) {
    return (
      <div className="promo-code-applied">
        <div className="promo-code-info">
          <span className="text">
            <strong>{appliedPromoCode.name}</strong>
          </span>
          <span className="text-caption">
            {appliedPromoCode.type === 'percentage'
              ? `${appliedPromoCode.discount}% rabatt`
              : `${appliedPromoCode.discount} kr rabatt`}
          </span>
        </div>
        <button
          className="promo-code-btn-remove"
          onClick={handleRemoveCode}
          type="button"
        >
          {t.removeButton}
        </button>
      </div>
    )
  }

  return (
    <div className="promo-code-input">
      <FormField label={t.label} error={error}>
        <div className="promo-code-field">
          <input
            type="text"
            className="input"
            placeholder={t.placeholder}
            value={code}
            onChange={handleChangeCode}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          {code && (
            <button
              className="btn btn-primary"
              onClick={handleApplyCode}
              disabled={!code.trim() || isLoading}
              type="button"
            >
              {isLoading ? '...' : t.applyButton}
            </button>
          )}
        </div>
      </FormField>
    </div>
  )
}

export default PromoCodeInput
