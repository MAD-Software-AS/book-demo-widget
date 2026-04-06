import React from 'react'

import { VimeoEmbed } from './VimeoEmbed'
import { useVimeoMilestones } from './vimeoPlayerApi'
import { getVimeoEmbedSrc } from './vimeoVideoUrl'

export type { VimeoProgressMilestone } from './vimeoPlayerApi'
export {
  onVimeoDemoProgressMilestone,
  onVimeoDemoPlayerReady,
  onVimeoDemoPlayStarted
} from './vimeoPlayerApi'

export interface VideoPlayerProps {
  videoUrl: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const embedSrc = getVimeoEmbedSrc(videoUrl)
  const { recordProgress } = useVimeoMilestones(videoUrl)

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
        <VimeoEmbed videoUrl={videoUrl} recordProgress={recordProgress} />
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

export default VideoPlayer
