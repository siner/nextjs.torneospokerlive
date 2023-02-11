'use client'
import { useState, useEffect } from 'react'
import moment from 'moment'
import Header from './header'
import buildCalendar from './build'
import MiniRowTournament from '../tournament/MiniRowTournament'
import { getDateText } from '../../lib/utils'
import './styles.css'
import SuperJSON from 'superjson'

export default function Calendar(props) {
    var { torneos, value } = props
    torneos = SuperJSON.parse(torneos)
    const [selectedDate, setSelectedDate] = useState(
        value ? moment(SuperJSON.parse(value)) : moment()
    )

    const [calendar, setCalendar] = useState([])

    useEffect(() => {
        setCalendar(buildCalendar(selectedDate))
    }, [selectedDate])

    function isSelected(day) {
        return selectedDate.isSame(day, 'day')
    }

    function beforeToday(day) {
        return moment(day).isBefore(new Date(), 'day')
    }

    function isToday(day) {
        return moment(new Date()).isSame(day, 'day')
    }

    function dayStyles(day) {
        if (beforeToday(day)) return 'bg-base-200'
        if (isToday(day)) return 'bg-warning'
        if (isSelected(day)) return 'bg-base-300'
        return 'bg-base-200'
    }

    function currMonthName() {
        return selectedDate.format('MMMM')
    }

    function currYear() {
        return selectedDate.format('YYYY')
    }

    return (
        <div className="calendar dark:bg-neutral dark:neutral-content">
            <Header value={selectedDate} onChange={setSelectedDate} />

            <div className="body">
                <div className="day-names bg-neutral text-neutral-content dark:bg-secondary dark:text-secondary-content px-2">
                    {['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'].map(
                        (d) => (
                            <div key={d} className="week">
                                {d}
                            </div>
                        )
                    )}
                </div>
                {calendar.map((week, wi) => (
                    <div key={'week-' + wi}>
                        {week.map((day, di) => (
                            <div
                                key={'day-' + wi + '-' + di}
                                className="day dark:bg-neutral dark:text-neutral-content"
                            >
                                <div className={dayStyles(day)}>
                                    <span className="numday bg-base-300 text-base-content dark:bg-secondary dark:text-secondary-content px-2">
                                        {day.format('D').toString()}
                                    </span>
                                    <div className="events overflow-scroll">
                                        {torneos
                                            .filter(
                                                (t) =>
                                                    getDateText(
                                                        SuperJSON.parse(t).date
                                                    ) ==
                                                    day.format('YYYY-MM-DD')
                                            )
                                            .map((torneo) => (
                                                <MiniRowTournament
                                                    key={torneo.id}
                                                    torneo={torneo}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
