import DefaultTags from './defaultTags'
import { GoogleAnalyticsWrapper } from '../components/googleanalytics'

export default function Head() {
    return (
        <>
            <title>Torneos Poker Live</title>

            <meta
                property="description"
                content="Toda la información sobre los torneos de poker en vivo en todos los casinos de España."
            />
            <meta property="og:image" content="/logo.png" />
            <meta property="og:title" content="Torneos Poker Live" />
            <meta
                property="og:description"
                content="Toda la información sobre los torneos de poker en vivo en todos los casinos de España."
            />
            <meta
                property="twitter:image"
                content="https://torneospokerlive.com/logo.png"
            />

            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content="Torneos Poker Live" />

            <meta
                property="twitter:description"
                content="Toda la información sobre los torneos de poker en vivo en todos los casinos de España."
            />

            <DefaultTags />
            <GoogleAnalyticsWrapper />
        </>
    )
}
