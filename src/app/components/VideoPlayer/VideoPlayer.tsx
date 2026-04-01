import React from 'react'

export interface VideoPlayerProps {
  videoUrl: string
}

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be'
])

const VIMEO_HOSTS = new Set(['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'])

const getYouTubeEmbedUrl = (url: URL): string | null => {
  if (url.hostname.includes('youtu.be')) {
    const id = url.pathname.replace('/', '').trim()
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  const videoId = url.searchParams.get('v')
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  const shortsMatch = url.pathname.match(/^\/shorts\/([^/?]+)/)
  if (shortsMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`
  }

  const embedMatch = url.pathname.match(/^\/embed\/([^/?]+)/)
  if (embedMatch?.[1]) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`
  }

  return null
}

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

const getEmbedData = (
  videoUrl: string
): {
  type: 'iframe' | 'native' | 'unsupported'
  src?: string
} => {
  const trimmedUrl = videoUrl.trim()
  if (!trimmedUrl) {
    return { type: 'unsupported' }
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    const host = parsedUrl.hostname.toLowerCase()

    if (YOUTUBE_HOSTS.has(host)) {
      const src = getYouTubeEmbedUrl(parsedUrl)
      if (!src) {
        return { type: 'unsupported' }
      }

      const embedUrl = new URL(src)
      embedUrl.searchParams.set('autoplay', '1')
      embedUrl.searchParams.set('mute', '1')
      embedUrl.searchParams.set('playsinline', '1')
      embedUrl.searchParams.set('rel', '0')

      return { type: 'iframe', src: embedUrl.toString() }
    }

    if (VIMEO_HOSTS.has(host)) {
      const src = getVimeoEmbedUrl(parsedUrl)
      if (!src) {
        return { type: 'unsupported' }
      }

      const embedUrl = new URL(src)
      embedUrl.searchParams.set('autoplay', '1')
      embedUrl.searchParams.set('muted', '1')
      embedUrl.searchParams.set('playsinline', '1')

      return { type: 'iframe', src: embedUrl.toString() }
    }

    const isNativeVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmedUrl)
    if (isNativeVideo) {
      return { type: 'native', src: trimmedUrl }
    }
  } catch (_error) {
    return { type: 'unsupported' }
  }

  return { type: 'unsupported' }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const embedData = getEmbedData(videoUrl)

  return (
    <div style={{ width: '100%', maxWidth: '100%', aspectRatio: '16 / 9' }}>
      {embedData.type === 'iframe' && embedData.src && (
        <iframe
          src={embedData.src}
          title="Demo video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0 }}
        />
      )}

      {embedData.type === 'native' && embedData.src && (
        <video
          src={embedData.src}
          controls
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {embedData.type === 'unsupported' && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            color: '#fff',
            padding: '12px',
            textAlign: 'center'
          }}
        >
          This video link format is not supported.
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
