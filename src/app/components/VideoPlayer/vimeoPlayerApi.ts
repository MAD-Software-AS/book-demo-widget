import type Player from '@vimeo/player'
import { useCallback, useEffect, useRef } from 'react'

import { trackDemoVideoProgressMilestone } from '../../utils/demoVideoAnalytics'

export const MILESTONES = [25, 50, 75, 100] as const
export type VimeoProgressMilestone = (typeof MILESTONES)[number]

/** Розширення точки входу (викликається після відправки в GA / Meta). */
export function onVimeoDemoProgressMilestone(
  _milestone: VimeoProgressMilestone,
  _videoUrl: string
): void {}

export function onVimeoDemoPlayerReady(_player: Player): void {}

export function onVimeoDemoPlayStarted(_videoUrl: string): void {}

export function useVimeoMilestones(videoUrl: string) {
  const fired = useRef<Set<VimeoProgressMilestone>>(new Set())

  const reset = useCallback(() => {
    fired.current = new Set()
  }, [])

  useEffect(() => {
    reset()
  }, [videoUrl, reset])

  const recordProgress = useCallback(
    (percent: number) => {
      if (!Number.isFinite(percent)) {
        return
      }
      const url = videoUrl.trim()
      for (const m of MILESTONES) {
        if (percent >= m && !fired.current.has(m)) {
          fired.current.add(m)
          trackDemoVideoProgressMilestone(url, m)
          onVimeoDemoProgressMilestone(m, url)
        }
      }
    },
    [videoUrl]
  )

  return { recordProgress }
}
