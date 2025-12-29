const getFacebookPixelInstance = (): typeof fbq | null => {
  if (typeof fbq === 'undefined') {
    return null
  }

  return fbq
}

export default getFacebookPixelInstance
