/* eslint-disable no-console */
export type DemoVideoMilestone = 25 | 50 | 75 | 100

const POLL_MS = 250
const MAX_POLLS = 10

const GA_PLAY = 'video_play'
const GA_PROGRESS = 'video_progress'
const META_PLAY = 'VideoPlay'
const META_PROGRESS = 'VideoProgress'

const LOG_NS = '[MAD demo video analytics]'

function logDebug(message: string, data?: unknown): void {
  if (typeof console !== 'undefined' && typeof console.debug === 'function') {
    console.debug(LOG_NS, message, data ?? '')
  }
}

function logWarn(message: string, data?: unknown): void {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(LOG_NS, message, data ?? '')
  }
}

function pollUntil(
  predicate: () => boolean,
  run: () => void,
  onTimeout?: () => void
): void {
  if (typeof window === 'undefined') {
    return
  }
  if (predicate()) {
    run()
    return
  }
  let n = 0
  const id = window.setInterval(() => {
    if (predicate()) {
      window.clearInterval(id)
      run()
    } else if (++n >= MAX_POLLS) {
      window.clearInterval(id)
      onTimeout?.()
    }
  }, POLL_MS)
}

function isFbqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

function isGaReady(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return typeof window.gtag === 'function' || Array.isArray(window.dataLayer)
}

function sendMetaCustom(event: string, payload: Record<string, unknown>): void {
  pollUntil(
    isFbqReady,
    () => {
      window.fbq!('trackCustom', event, payload)
      logDebug('Meta trackCustom sent', { event, payload })
    },
    () => {
      logWarn('Meta skipped: fbq not ready within window', {
        event,
        polls: MAX_POLLS,
        pollMs: POLL_MS
      })
    }
  )
}

function sendGa(eventName: string, params: Record<string, unknown>): void {
  pollUntil(
    isGaReady,
    () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params)
        logDebug('GA gtag event sent', { eventName, params })
        return
      }
      if (Array.isArray(window.dataLayer)) {
        const row = { event: eventName, ...params }
        window.dataLayer.push(row)
        logDebug('GA dataLayer push', row)
      }
    },
    () => {
      logWarn('GA skipped: gtag / dataLayer not ready within window', {
        eventName,
        polls: MAX_POLLS,
        pollMs: POLL_MS
      })
    }
  )
}

export function trackDemoVideoPlay(videoUrl: string): void {
  logDebug('trackDemoVideoPlay queued', { videoUrl })
  const payload = {
    video_provider: 'vimeo',
    video_url: videoUrl
  }
  sendMetaCustom(META_PLAY, payload)
  sendGa(GA_PLAY, payload)
}

export function trackDemoVideoProgressMilestone(
  videoUrl: string,
  milestone: DemoVideoMilestone
): void {
  logDebug('trackDemoVideoProgressMilestone queued', { videoUrl, milestone })
  const payload = {
    video_provider: 'vimeo',
    video_url: videoUrl,
    video_percent: milestone
  }
  sendMetaCustom(META_PROGRESS, payload)
  sendGa(GA_PROGRESS, payload)
}
