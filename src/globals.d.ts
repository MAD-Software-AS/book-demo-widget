declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }

  const fbq: (...args: any[]) => void
}

export {}
