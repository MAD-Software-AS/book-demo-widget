import { InlineWidget } from 'react-calendly'
import React from 'react'

const DEFAULT_CALENDLY_URL =
  'https://calendly.com/eivind-madsoftware/demo?hide_gdpr_banner=1&background_color=fafaf6&text_color=3c3c3c&primary_color=00c2b7'

export interface CalendarWidgetProps {
  url?: string
  showEmbed?: boolean
  embedHeight?: number
  title?: string
  description?: string
  buttonText?: string
  onBookClick?: () => void
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  url = DEFAULT_CALENDLY_URL,
  showEmbed = false,
  embedHeight = 700,
  title = 'Ønsker du mer informasjon?',
  description = 'Book en uforpliktende gjennomgang av MAD.',
  buttonText = 'Book gjennomgang',
  onBookClick
}) => {
  if (showEmbed) {
    return (
      <div className="demo-video-calendar-embed">
        <InlineWidget
          url={url}
          styles={{
            minWidth: '280px',
            width: '100%',
            height: `${embedHeight}px`,
            padding: '0px',
            margin: '0px'
          }}
        />
      </div>
    )
  }

  return (
    <section className="demo-video-gate-panel demo-video-gate-panel--calendar">
      <div className="demo-video-gate-panel__icon demo-video-gate-panel__icon--blue">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M3 10h18M8 2v4M16 2v4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="m9 14 2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="demo-video-gate-panel__title">{title}</h2>
      <p className="demo-video-gate-panel__subtitle demo-video-gate-panel__subtitle--centered">
        {description}
      </p>
      <button
        type="button"
        className="btn demo-video-gate-panel__cta demo-video-gate-panel__cta--blue"
        onClick={onBookClick}
      >
        {buttonText}
        <span className="demo-video-gate-panel__cta-arrow" aria-hidden>
          →
        </span>
      </button>
    </section>
  )
}

export default CalendarWidget
