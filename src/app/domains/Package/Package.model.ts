export enum PACKAGE_NAMES {
  MAD_START = 'MAD_START',
  MAD_PRO = 'MAD_PRO',
  MAD_ENTERPRISE = 'MAD_ENTERPRISE'
}

export enum PACKAGE_PERIODS {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export type PackageNames = keyof typeof PACKAGE_NAMES
export type PackagePeriods = keyof typeof PACKAGE_PERIODS

export interface Package {
  objectId: PackageNames
  name: string
  prices: number[]
  period: string
  periodKey: PackagePeriods
  inherits: string | null
  functions: {
    name: string
    subItems?: string[]
    url?: string
  }[]
  action: { isFree: boolean; text: string }
  caption: string
  mostPopular: boolean
}
