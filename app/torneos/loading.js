import { Skeleton } from '../../components/ui/skeleton'

export default async function Loading() {
    const tournaments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <main className="mx-5">
            <div>
                <div className="py-4">
                    <Skeleton className="w-48 h-8 rounded-sm bg-slate-200" />
                </div>
                <div className="space-y-0.5">
                    {tournaments.map((tournament) => (
                        <div
                            className="flex flex-col w-full bg-base-100 base-content border-solid border shadow-sm"
                            key={tournament}
                        >
                            <div className="flex flex-row w-full">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="w-20 h-10 rounded-sm bg-slate-200 mr-2" />
                                        <Skeleton className="w-10 h-10 rounded-sm bg-slate-200 mr-5" />
                                        <Skeleton className="w-96 h-4 rounded-sm bg-slate-200 mr-5" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="w-20 h-4 rounded-sm bg-slate-200 mr-5" />
                                        <Skeleton className="w-20 h-6 rounded-sm bg-slate-200 mr-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
