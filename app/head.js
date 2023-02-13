import DefaultTags from './defaultTags'
import { GoogleAnalyticsWrapper } from '../components/googleanalytics'

export default function Head() {
    return (
        <>
            <title>Torneos Poker Live</title>
            <DefaultTags />
            <GoogleAnalyticsWrapper />
        </>
    )
}
