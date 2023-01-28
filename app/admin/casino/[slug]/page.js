import CardCasino from '../../../../components/casino/CardCasino'
import { getCasino } from '../../../../lib/prisma'
import ReactMarkdown from 'react-markdown'
import EditCasino from '../../../../components/admin/EditCasino'

export default async function Page({ params }) {
    const casino = await getCasino(params.slug)

    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-100 md:w-4/12 mt-6">
                    <CardCasino casino={casino} />
                    <div className="mt-4">
                        <div className="p-2 prose">
                            <ReactMarkdown>{casino.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
                <div className="md:w-8/12">
                    <EditCasino currentcasino={casino} />
                </div>
            </div>
        </main>
    )
}
