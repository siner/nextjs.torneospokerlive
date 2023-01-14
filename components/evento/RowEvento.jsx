/* eslint-disable @next/next/no-img-element */
import { getSimpleDate } from '../../lib/utils'

export default function RowEvento(props) {
    const { evento } = props
    let datestringfrom = getSimpleDate(evento.from)
    let datestringto = getSimpleDate(evento.to)
    const backgroundColor = evento.casino.color

    return (
        <a href={'/eventos/' + evento.slug}>
            <div className="rowcasino flex bg-slate-300">
                <div className="p-2 w-2/12 md:w-1/12 flex items-center justify-center">
                    <img
                        className="mx-auto max-h-12"
                        src={evento.tour.logo}
                        alt={evento.name}
                    />
                </div>
                <div className="w-8/12 md:w-10/12 flex flex-col gap-4 md:flex-row md:items-center p-5 py-2">
                    <div className="flex justify-between text-xs md:text-base mr-10">
                        <div className="flex content-center space-x-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                />
                            </svg>
                            <span>
                                {datestringfrom} - {datestringto}
                            </span>
                        </div>
                    </div>
                    <div className="font-bold text-sm md:text-lg w-100 text-left md:text-left">
                        {evento.name}
                    </div>
                </div>
                <div
                    className="p-2 w-2/12 md:w-1/12 flex items-center"
                    style={{ backgroundColor: backgroundColor }}
                >
                    <img
                        className="mx-auto block max-h-6"
                        src={evento.casino.logo}
                        alt={evento.casino.name}
                    />
                </div>
            </div>
        </a>
    )
}
