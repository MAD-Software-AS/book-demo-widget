import { InlineWidget } from 'react-calendly'
import React from 'react'

const CalendarWidget = () => {
  return (
    <InlineWidget
      url="https://calendly.com/eivind-madsoftware/demo?hide_gdpr_banner=1&background_color=fafaf6&text_color=3c3c3c&primary_color=00c2b7"
      styles={{ minWidth: '320px', height: '700px' }}
    />
  )
}

export default CalendarWidget
