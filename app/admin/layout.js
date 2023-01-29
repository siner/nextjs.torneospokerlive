import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default async function AdminLayout({ children }) {
    const env = process.env.NODE_ENV

    return (
        <>{env == 'development' && <div className="mb-auto">{children}</div>}</>
    )
}
