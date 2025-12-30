export const DEBOUNCE_DELAY = 300 // ms

export type CompanyType = {
  name: string
  orgNumber: string
  phoneNumber: string
  mobileNumber: string
  email: string
  address: {
    postalCode: string
    country: string
    countryCode: string
    municipality: string
    addresses: string[]
  }
}
