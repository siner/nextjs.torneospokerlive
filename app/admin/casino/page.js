import EditCasino from '../../../components/admin/EditCasino'

export default async function Page() {
    return (
        <main className="mx-5">
            <div className="md:flex gap-4">
                <div className="w-full">
                    <EditCasino />
                </div>
            </div>
        </main>
    )
}
