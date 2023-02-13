'use client'
import { GoogleAnalytics } from 'nextjs-google-analytics'

export function GoogleAnalyticsWrapper() {
    return (
        <>
            <GoogleAnalytics trackPageViews />
        </>
    )
}
