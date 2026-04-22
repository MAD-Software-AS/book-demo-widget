import React, { memo, useCallback } from 'react'

import Player from '@vimeo/player'
import { VimeoEmbed } from './VimeoEmbed'
import { getVimeoEmbedSrc } from './vimeoVideoUrl'
import { useVimeoMilestones } from './vimeoPlayerApi'

export type { VimeoProgressMilestone } from './vimeoPlayerApi'
export {
  onVimeoDemoProgressMilestone,
  onVimeoDemoPlayerReady,
  onVimeoDemoPlayStarted
} from './vimeoPlayerApi'

export interface VideoPlayerProps {
  videoUrl: string
  progressCallback: (percent: number, seconds: number, player: Player) => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  progressCallback
}) => {
  const embedSrc = getVimeoEmbedSrc(videoUrl)
  const { recordProgress } = useVimeoMilestones(videoUrl)

  const handleProgress = useCallback(
    (percent: number, seconds: number, player: Player) => {
      recordProgress(percent, seconds)
      progressCallback(percent, seconds, player)
    },
    [recordProgress, progressCallback]
  )

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        aspectRatio: '16 / 9',
        position: 'relative',
        background: '#000'
      }}
    >
      {embedSrc && (
        <VimeoEmbed videoUrl={videoUrl} recordProgress={handleProgress} />
      )}

      {!embedSrc && (
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
          Vimeo link required.
        </div>
      )}
    </div>
  )
}

export default memo(VideoPlayer)
