/**
 * Analytics stub - emits events to dataLayer or window.analytics.
 * Replace with production analytics (GA, Segment, etc.) without UI changes.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    analytics?: { track: (event: string, props?: Record<string, unknown>) => void }
  }
}

export type AnalyticsEvent =
  | 'cta_click'
  | 'demo_open'
  | 'signup_start'
  | 'signup_success'
  | 'login_success'

export function trackEvent(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  try {
    if (typeof window === 'undefined') return

    // Google Analytics / GTM
    if (window.dataLayer) {
      window.dataLayer.push({ event, ...props })
    }

    // Segment / generic analytics
    if (window.analytics?.track) {
      window.analytics.track(event, props)
    }

    // Development logging (strip in production)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, props)
    }
  } catch {
    // Silently fail - analytics should never break the app
  }
}
