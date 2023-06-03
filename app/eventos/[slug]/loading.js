import { Skeleton } from '../../../components/ui/skeleton'

export default function Loading() {
    const tournaments = [1, 2, 3, 4, 5, 6]

    return (
        <main className="md:flex gap-4 space-y-4 md:space-y-0 mx-5 mt-10">
            <div className="md:w-4/12 space-y-4">
                <div className="indicator">
                    <div className="grid card w-full bg-base-10 border border-slate-200">
                        <Skeleton className="w-full h-32 md:h-40 rounded-sm bg-slate-200" />
                        <div className="card-body items-center text-center p-4 md:p-8">
                            <div className="flex justify-between mb-4 w-full">
                                <Skeleton className="w-20 h-5 rounded-sm bg-slate-200" />
                                <Skeleton className="w-20 h-5 rounded-sm bg-slate-200" />
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <Skeleton className="w-56 h-5 rounded-sm bg-slate-200" />
                                <Skeleton className="w-40 h-5 rounded-sm bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="indicator">
                    <div className="grid card w-full bg-base-10 border border-slate-200">
                        <Skeleton className="w-full h-32 md:h-40 rounded-sm bg-slate-200" />
                        <div className="card-body items-center text-center p-4 md:p-8">
                            <div className="space-y-2 flex flex-col items-center">
                                <Skeleton className="w-56 h-5 rounded-sm bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-8/12">
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
