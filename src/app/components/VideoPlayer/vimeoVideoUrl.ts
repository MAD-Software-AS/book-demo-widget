const VIMEO_HOSTS = new Set(['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'])

const getVimeoEmbedUrl = (url: URL): string | null => {
  const playerMatch = url.pathname.match(/^\/video\/(\d+)/)
  if (playerMatch?.[1]) {
    return `https://player.vimeo.com/video/${playerMatch[1]}`
  }

  const directMatch = url.pathname.match(/^\/(\d+)/)
  if (directMatch?.[1]) {
    return `https://player.vimeo.com/video/${directMatch[1]}`
  }

  return null
}

export function getVimeoEmbedSrc(videoUrl: string): string | null {
  const trimmedUrl = videoUrl.trim()
  if (!trimmedUrl) {
    return null
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    const host = parsedUrl.hostname.toLowerCase()

    if (!VIMEO_HOSTS.has(host)) {
      return null
    }

    const src = getVimeoEmbedUrl(parsedUrl)
    if (!src) {
      return null
    }

    const embedUrl = new URL(src)
    const privacyHash = parsedUrl.searchParams.get('h')
    if (privacyHash) {
      embedUrl.searchParams.set('h', privacyHash)
    }
    embedUrl.searchParams.set('autoplay', '1')
    embedUrl.searchParams.set('muted', '1')
    embedUrl.searchParams.set('playsinline', '1')
    embedUrl.searchParams.set('api', '1')

    return embedUrl.toString()
  } catch (_error) {
    return null
  }
}
