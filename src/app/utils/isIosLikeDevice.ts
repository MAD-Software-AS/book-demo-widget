export function isIosLikeDevice(): boolean {
  if (typeof navigator === 'undefined') {
    return false
  }

  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''

  if (/iPad|iPhone|iPod/.test(ua)) {
    return true
  }

  // iPadOS 13+ may report as Mac with touch
  if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true
  }

  return false
}
