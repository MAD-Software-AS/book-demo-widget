import { CompanyType } from '../../../Company.constants'

const dataTransform = (item: any): CompanyType => {
  return {
    name: item.navn,
    orgNumber: item.organisasjonsnummer,
    phoneNumber: item.telefon,
    mobileNumber: item.mobil,
    email: item.epostadresse,
    address: {
      postalCode: item.forretningsadresse.postnummer,
      country: item.forretningsadresse.land,
      countryCode: item.forretningsadresse.landkode,
      municipality: item.forretningsadresse.kommune,
      addresses: item.forretningsadresse.adresse
    }
  }
}

const searchCompanies = async (value: string): Promise<CompanyType[]> => {
  const apiUrl = `https://data.brreg.no/enhetsregisteret/api`
  const endPoint = 'enheter'
  const query = `?navn=${encodeURIComponent(value)}&size=3`

  const res = await fetch(`${apiUrl}/${endPoint}${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()

  const options = data._embedded?.enheter?.map(dataTransform) || []

  return options
}

export default searchCompanies
