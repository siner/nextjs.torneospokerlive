const options = {
    month: 'long',
    day: 'numeric',
}

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function getTodayText() {
    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    return yyyy + '-' + mm + '-' + dd
}

export function getDateText(datestring) {
    var date = new Date(datestring)
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.getMonth() + 1).padStart(2, '0')
    var yyyy = date.getFullYear()
    return yyyy + '-' + mm + '-' + dd
}

export function localeDateString(date) {
    return date.toLocaleDateString('es-ES', options)
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}

export function formatDate(date) {
    let newdate = new Date(date)
    let datestring = newdate.toLocaleDateString('es-ES', options)
    let hour =
        newdate.getHours() + ':' + String(newdate.getMinutes()).padStart(2, 0)
    return { datestring, hour }
}

export function getMobileDate(date) {
    let newdate = new Date(date)
    return [
        padTo2Digits(newdate.getDate()),
        padTo2Digits(newdate.getMonth() + 1),
        newdate.getFullYear(),
    ].join('/')
}

export function getSimpleDate(date) {
    let newdate = new Date(date)
    return [
        padTo2Digits(newdate.getDate()),
        padTo2Digits(newdate.getMonth() + 1),
        padTo2Digits(newdate.getFullYear()),
    ].join('/')
}

export function getPagination(page, size) {
    const limit = size ? +size : 5
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1
    return { from, to }
}

function getRGB(c) {
    return parseInt(c, 16) || c
}

function getsRGB(c) {
    return getRGB(c) / 255 <= 0.03928
        ? getRGB(c) / 255 / 12.92
        : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
    return (
        0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(-2))
    )
}

function getContrast(f, b) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

export function getTextColor(bgColor) {
    const whiteContrast = getContrast(bgColor, '#ffffff')
    const blackContrast = getContrast(bgColor, '#000000')

    return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}
