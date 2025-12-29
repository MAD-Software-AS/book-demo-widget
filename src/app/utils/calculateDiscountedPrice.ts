import { PromoCode } from '../domains/PromoCode/PromoCode.model'

const calculateDiscountedPrice = (
  originalPrice: number,
  promoCode: PromoCode | null
) => {
  if (!promoCode) return originalPrice

  if (promoCode.type === 'percentage') {
    return Math.round(originalPrice * (1 - promoCode.discount / 100))
  }

  return originalPrice
}

export default calculateDiscountedPrice
