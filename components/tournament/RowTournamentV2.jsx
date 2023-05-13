/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { formatDate, getMobileDate, getTextColor } from '../../lib/utils'

export default function RowTournamentV2(props) {
    var { torneo, casino, event } = props

    const backgroundColor = torneo.casino.color
    const textColor = getTextColor(backgroundColor)
    let date = torneo.date
    if (torneo.hour) date = torneo.date + ' ' + torneo.hour
    let { datestring, hour } = formatDate(date)
    let datetorneo = new Date(torneo.date)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let opacity = datetorneo < today ? '0.6' : '1'

    const now = new Date()
    const lastday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 2
    ).getTime()
    const created_at = new Date(torneo.created_at).getTime()

    //    const isnew = created_at > lastday
    const isnew = false

    return (
        <div
            className="flex flex-col w-full bg-base-100 base-content hover:bg-base-200 border-solid border shadow-sm"
            style={{
                opacity: opacity,
            }}
        >
            <div
                className="flex flex-row w-full md:hidden justify-between px-1"
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                }}
            >
                {casino && (
                    <div className="text-xs md:hidden">
                        {torneo.casino.name}
                    </div>
                )}
                <div className="text-xs">
                    {datestring} - {hour}
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex items-center justify-between flex-1 cursor-pointer select-none w-full">
                    {casino && (
                        <div
                            className="hidden md:flex flex-col items-center justify-center w-20 mr-4 p-2 h-10"
                            style={{
                                backgroundColor: backgroundColor,
                            }}
                        >
                            <Link
                                href={'/casinos/' + torneo.casino.slug}
                                className="relative block"
                            >
                                <Image
                                    src={`https://wsrv.nl/?url=${torneo.casino.logo}&w=100&h=40&fit=contain`}
                                    width={100}
                                    height={40}
                                    alt={'Logo ' + torneo.casino.name}
                                    className="mx-auto"
                                />
                            </Link>
                        </div>
                    )}
                    {event && (
                        <div className="flex flex-col items-center justify-center w-14 h-10 mr-4 p-2">
                            {torneo.evento && (
                                <Link
                                    href={'/eventos/' + torneo.evento.slug}
                                    className="relative block"
                                >
                                    <Image
                                        src={`https://wsrv.nl/?url=${torneo.evento.tour.logo}&w=100&h=100&fit=contain`}
                                        width={100}
                                        height={100}
                                        alt={'Icono ' + torneo.evento.name}
                                        className="mx-auto"
                                    />
                                </Link>
                            )}
                        </div>
                    )}
                    <div className="grow pl-1 mr-2 md:mr-5 p-2">
                        <a href={'/torneos/' + torneo.slug}>
                            <div className="font-medium text-sm md:text-base">
                                {torneo.name}
                                {isnew && (
                                    <span className="badge badge-warning warning-content ml-2">
                                        New
                                    </span>
                                )}
                            </div>
                        </a>
                    </div>

                    <div className="pl-1 mr-2 md:mr-5 text-right p-2 w-40">
                        <a href={'/torneos/' + torneo.slug}>
                            <div className="text-xs hidden md:block">
                                {datestring} - {hour}
                            </div>
                            <div className="text-base font-bold md:hidden">
                                {parseInt(torneo.price) > 0 && (
                                    <span>{torneo.price}€</span>
                                )}
                            </div>
                        </a>
                    </div>

                    <div className="pl-1 mr-2 md:mr-5 text-right p-2 hidden md:block w-20">
                        <a href={'/torneos/' + torneo.slug}>
                            <div className="text-xl font-bold">
                                {parseInt(torneo.price) > 0 && (
                                    <span>{torneo.price}€</span>
                                )}
                            </div>
                        </a>
                    </div>

                    <a
                        href={'/torneos/' + torneo.slug}
                        className="flex justify-end w-4 md:w-8 text-right"
                    >
                        <svg
                            className="w-5 md:w-10"
                            width="20"
                            fill="currentColor"
                            height="20"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
