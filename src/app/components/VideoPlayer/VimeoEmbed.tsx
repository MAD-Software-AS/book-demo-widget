import Player, { type VimeoUrl } from '@vimeo/player'
import React, { useEffect, useRef } from 'react'

import { trackDemoVideoPlay } from '../../utils/demoVideoAnalytics'
import {
  onVimeoDemoPlayStarted,
  onVimeoDemoPlayerReady
} from './vimeoPlayerApi'
import useDemoVideoContext from '../../contexts/DemoVideo/useDemoVideoContext'

export interface VimeoEmbedProps {
  videoUrl: string
  recordProgress: (percent: number, seconds: number, player: Player) => void
}

function sizeVimeoToContainer(container: HTMLElement) {
  container.style.position = 'relative'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.overflow = 'hidden'

  for (const child of Array.from(container.children)) {
    const wrap = child as HTMLElement
    wrap.style.position = 'absolute'
    wrap.style.top = '0'
    wrap.style.left = '0'
    wrap.style.width = '100%'
    wrap.style.height = '100%'
    wrap.style.padding = '0'
    wrap.style.margin = '0'
    wrap.style.boxSizing = 'border-box'
  }

  const iframe = container.querySelector('iframe')
  if (iframe) {
    iframe.removeAttribute('width')
    iframe.removeAttribute('height')
    iframe.style.position = 'absolute'
    iframe.style.top = '0'
    iframe.style.left = '0'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.border = '0'
    iframe.style.display = 'block'
  }
}

export const VimeoEmbed: React.FC<VimeoEmbedProps> = ({
  videoUrl,
  recordProgress
}) => {
  const { setPlayer } = useDemoVideoContext()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) {
      return
    }

    let player: Player | null = null
    let cancelled = false

    const init = async () => {
      try {
        player = new Player(el, {
          url: videoUrl.trim() as VimeoUrl,
          autoplay: false,
          // Required for reliable programmatic play on iOS (modal open calls player.play()).
          muted: true,
          playsinline: true,
          responsive: true,
          vimeo_logo: false,
          byline: false
        })
        await player.ready()
        if (cancelled) {
          await player.destroy()
          return
        }
        sizeVimeoToContainer(el)
        onVimeoDemoPlayerReady(player)

        const trimmed = videoUrl.trim()
        let playTracked = false
        player.on('play', () => {
          if (playTracked) {
            return
          }
          playTracked = true
          trackDemoVideoPlay(trimmed)
          onVimeoDemoPlayStarted(trimmed)
        })

        setPlayer(player)

        player.on('timeupdate', (data) => {
          recordProgress(data.percent * 100, data.seconds, player!)
        })
        player.on('ended', (data) => {
          recordProgress(100, data.seconds, player!)
        })
      } catch {}
    }

    void init()

    return () => {
      cancelled = true
      void player?.destroy()
      const c = containerRef.current
      if (c) {
        c.removeAttribute('data-vimeo-initialized')
        while (c.firstChild) {
          c.removeChild(c.firstChild)
        }
      }
    }
  }, [videoUrl, recordProgress])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        position: 'relative',
        background: '#000'
      }}
    />
  )
}
