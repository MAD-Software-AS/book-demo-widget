interface Timestamp {
  seconds: number
  nanoseconds: number
}

export enum PROMO_CODE_TYPE {
  PERCENTAGE = 'percentage'
}

export enum PROMO_CODE_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired'
}

export enum PROMO_CODE_ERROR_CODES {
  PROMO_CODE_REQUIRED = 'PROMO_CODE_REQUIRED',
  PROMO_CODE_NOT_FOUND = 'PROMO_CODE_NOT_FOUND',
  PROMO_CODE_INACTIVE = 'PROMO_CODE_INACTIVE',
  PROMO_CODE_EXPIRED = 'PROMO_CODE_EXPIRED',
  PROMO_CODE_NOT_YET_VALID = 'PROMO_CODE_NOT_YET_VALID',
  PROMO_CODE_USAGE_LIMIT_EXCEEDED = 'PROMO_CODE_USAGE_LIMIT_EXCEEDED'
}

export interface PromoCode {
  objectId: string
  createdAt: Timestamp
  updatedAt: Timestamp | null
  createdBy: string // User ID who created the promo code

  // Basic info
  code: string // Promo code string
  name: string
  description: string | null

  // Discount configuration
  type: PROMO_CODE_TYPE
  discount: number // Percentage or fixed amount

  // Validity
  validFrom: Timestamp | null // null means valid from creation
  validTo: Timestamp | null // null means no expiration

  // Usage limits
  usageLimit: number | null // null means no limit
  currentUsage: number

  // Status
  status: PROMO_CODE_STATUS

  // Analytics
  totalDiscountGiven: number
}

export interface VerifyPromoCodeRequest {
  code: string
}

export interface VerifyPromoCodeSuccessResponse {
  success: true
  data: {
    valid: true
    promoCode: PromoCode
  }
}

export interface VerifyPromoCodeErrorResponse {
  success: false
  error: string
  errorCode: PROMO_CODE_ERROR_CODES
  data: {
    valid: false
  }
}

export type VerifyPromoCodeResponse =
  | VerifyPromoCodeSuccessResponse
  | VerifyPromoCodeErrorResponse
