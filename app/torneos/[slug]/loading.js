import { Skeleton } from '../../../components/ui/skeleton'

export default function Loading() {
    return (
        <main className="md:flex gap-4 space-y-4 md:space-y-0 mx-5 mt-10">
            <div className="md:w-8/12">
                <Skeleton className="w-full h-20 rounded-sm bg-slate-200" />
                <div className="p-5">
                    <Skeleton className="w-32 h-6 rounded-sm bg-slate-200" />

                    <div className="mt-6 space-y-1">
                        <Skeleton className="w-60 h-6 rounded-sm bg-slate-200" />
                        <Skeleton className="w-52 h-6 rounded-sm bg-slate-200" />
                        <Skeleton className="w-60 h-6 rounded-sm bg-slate-200" />
                        <Skeleton className="w-48 h-6 rounded-sm bg-slate-200" />
                        <Skeleton className="w-32 h-6 rounded-sm bg-slate-200" />
                        <Skeleton className="w-60 h-6 rounded-sm bg-slate-200" />
                    </div>
                </div>
            </div>
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
        </main>
    )
}
