export const POS_PROVIDERS = {
  FIXIT_ONLINE: 'fixitOnline',
  COM2GETHER: 'com2gether',
  EASY_UPDATE: 'easyUpdate',
  EG_HANO: 'egHano',
  HANDELSDATA: 'handelsdata',
  NORSK_BUTIKKDATA: 'norskButikkdata',
  SHARP_WELLNESS: 'sharpWellness',
  SUPPLER: 'suppler',
  TIMMA: 'timma',
  TOUCH_SOFT: 'touchSoft',
  OTHER: 'other'
} as const

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
