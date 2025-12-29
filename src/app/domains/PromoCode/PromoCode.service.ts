import {
  VerifyPromoCodeRequest,
  VerifyPromoCodeResponse
} from './PromoCode.model'

import getApiUrl from '../../utils/getApiUrl'

export class PromoCodeService {
  static async verifyPromoCode(
    request: VerifyPromoCodeRequest,
    env: string
  ): Promise<VerifyPromoCodeResponse> {
    try {
      const API_URL = getApiUrl(env)
      const response = await fetch(`${API_URL}/promo-codes/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error verifying promo code:', error)
      throw error
    }
  }
}
