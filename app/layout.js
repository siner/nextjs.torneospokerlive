import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AnalyticsWrapper } from '../components/analytics'

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head />
            <body>
                <div className="flex flex-col h-screen justify-between">
                    <Header />
                    <div className="mb-auto">{children}</div>
                    <Footer />
                </div>
                <AnalyticsWrapper />
            </body>
        </html>
    )
}
