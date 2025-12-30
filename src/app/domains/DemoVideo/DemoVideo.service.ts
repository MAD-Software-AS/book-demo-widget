import getApiUrl from '../../utils/getApiUrl'

export interface SendDemoVideoData {
  customerEmail: string
  customerName?: string
  customerOrgNumber?: string
  videoLink: string
}

export interface SendDemoVideoResponse {
  success: boolean
  error?: string
}

const sendDemoVideo = async (
  data: SendDemoVideoData,
  env: string
): Promise<SendDemoVideoResponse> => {
  try {
    const apiUrl = getApiUrl(env)
    const response = await fetch(`${apiUrl}/companies/send-demo-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.error || 'Failed to send demo video'
      }
    }

    const result = await response.json()
    return {
      success: result.success !== false,
      error: result.error
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred'
    }
  }
}

export default sendDemoVideo
