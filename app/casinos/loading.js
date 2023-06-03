import { Skeleton } from '../../components/ui/skeleton'

export default async function Loading() {
    const casinos = [1, 2, 3, 4, 5, 6]

    return (
        <main className="mx-5">
            <div className="py-4">
                <Skeleton className="w-48 h-8 rounded-sm bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {casinos.map((casino) => (
                    <div className="indicator" key={casino}>
                        <div className="grid card w-full bg-base-10 border border-slate-200">
                            <Skeleton className="w-full h-32 md:h-40 rounded-sm bg-slate-200" />
                            <div className="card-body items-center text-center p-4 md:p-8">
                                <div className="space-y-2 flex flex-col items-center">
                                    <Skeleton className="w-56 h-5 rounded-sm bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
