'use client'
import { useState, useEffect } from 'react'
import moment from 'moment'
import Header from './header'
import buildCalendar from './build'
import MiniRowTournament from '../tournament/MiniRowTournament'
import { getDateText } from '../../lib/utils'
import './styles.css'

export default function Calendar(props) {
    const { torneos, value } = props

    const [selectedDate, setSelectedDate] = useState(
        value ? moment(value) : moment()
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
        if (beforeToday(day)) return 'before'
        if (isToday(day)) return 'today'
        if (isSelected(day)) return 'selected'
        return ''
    }

    function currMonthName() {
        return selectedDate.format('MMMM')
    }

    function currYear() {
        return selectedDate.format('YYYY')
    }

    return (
        <div className="calendar">
            <Header value={selectedDate} onChange={setSelectedDate} />

            <div className="body">
                <div className="day-names">
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
                            <div key={'day-' + wi + '-' + di} className="day">
                                <div className={dayStyles(day)}>
                                    <span className="numday">
                                        {day.format('D').toString()}
                                    </span>
                                    <div className="events overflow-scroll space-y-0.5">
                                        {torneos
                                            .filter(
                                                (t) =>
                                                    getDateText(t.date) ==
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
