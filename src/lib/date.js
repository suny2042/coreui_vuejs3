/**
 * http://usejsdoc.org/
 */
'use strict'

const MONTH_FULL_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  MONTH_SHORT_NAMES = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  DATE_FULL_NAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  DATE_SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  MERIDIEM = {
    AM: 'AM',
    PM: 'PM',
  },
  MASK = Object.create(null, {
    HOUR: { enumerable: true, value: 24 },
    MINUTE: { enumerable: true, value: 60 },
    SECONDS: { enumerable: true, value: 60 },
    MILLISECONDS: { enumerable: true, value: 1000 },
  }),
  CRITERIA = Object.create(null, {
    YEAR: { enumerable: true, value: 0 },
    MONTH: { enumerable: true, value: 1 },
    DAY: { enumerable: true, value: 2 },
    HOUR: { enumerable: true, value: 3 },
    MINUTE: { enumerable: true, value: 4 },
    SECONDS: { enumerable: true, value: 5 },
    MILLISECONDS: { enumerable: true, value: 6 },
  })

function _pad(target) {
  return /^[0-9]{1}$/.test(target) ? '0' + target : target
}

function _toFormat(date, format) {
  return format
    .replace(/yyyy/gi, date.getFullYear())
    .replace(/yy/gi, String(date.getFullYear()).slice(2, 4))
    .replace(/MI/gi, _pad(date.getMinutes()))
    .replace(/MMMM/gi, MONTH_FULL_NAMES[date.getMonth()])
    .replace(/MMM/gi, MONTH_SHORT_NAMES[date.getMonth()])
    .replace(/MM/gi, _pad(date.getMonth() + 1))
    .replace(/M/gi, date.getMonth() + 1)
    .replace(/DDDD/gi, DATE_FULL_NAMES[date.getDay()])
    .replace(/DDD/gi, DATE_SHORT_NAMES[date.getDay()])
    .replace(/DD/gi, _pad(date.getDate()))
    .replace(/D/gi, date.getDate())
    .replace(/HH24/gi, _pad(date.getHours()))
    .replace(/HH/gi, _pad(date.getHours() % 12))
    .replace(/H/gi, date.getHours() % 12)
    .replace(/SS/gi, _pad(date.getSeconds()))
    .replace(/PP/gi, date.getHours() <= 12 ? MERIDIEM.AM : MERIDIEM.PM)
    .replace(
      /P/gi,
      (date.getHours() <= 12 ? MERIDIEM.AM : MERIDIEM.PM).toLowerCase(),
    )
}

function toFormat(dateObject, format) {
  let temp,
    date = new Date()

  typeof dateObject === 'string'
    ? ((temp = new Date(dateObject)),
      isNaN(temp) ? (format = dateObject) : (dateObject = temp))
    : null
  typeof format !== 'string' ? (format = 'YYYY-MM-DD HH24:MI:SS') : null

  switch (true) {
    case dateObject instanceof Date:
      date = dateObject
      break
    case dateObject && typeof dateObject === 'object':
      // eslint-disable-next-line no-case-declarations
      let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        milliseconds = date.getMilliseconds()

      date =
        (Number.isInteger(dateObject.year) ? (year = dateObject.year) : null,
        Number.isInteger(dateObject.month) ? (month = dateObject.month) : null,
        Number.isInteger(dateObject.day) ? (day = dateObject.day) : null,
        Number.isInteger(dateObject.hours) ? (hours = dateObject.hours) : null,
        Number.isInteger(dateObject.minutes)
          ? (minutes = dateObject.minutes)
          : null,
        Number.isInteger(dateObject.seconds)
          ? (seconds = dateObject.seconds)
          : null,
        Number.isInteger(dateObject.milliseconds)
          ? (milliseconds = dateObject.milliseconds)
          : null,
        new Date(year, month, day, hours, minutes, seconds, milliseconds))
      break
  }

  return _toFormat(date, format)
}

function parseUTC(date) {
  date = date instanceof Date ? date : new Date(date)

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
    milliseconds: date.getMilliseconds(),
  }
}

function dateCompareTo(date1, date2, criteria) {
  typeof criteria === 'number' ? null : (criteria = CRITERIA.MILLISECONDS)

  date1 = Date.UTC.apply(null, getArgs(parseUTC(date1)))
  date2 = Date.UTC.apply(null, getArgs(parseUTC(date2)))

  return (date1 - date2) / getMask(criteria)
}

function getMask(criteria) {
  return Object.keys(CRITERIA)
    .filter((_key) => criteria < CRITERIA[_key.toUpperCase()])
    .reduce((_mask, _key) => _mask * MASK[_key], 1)
}

function getArgs(date) {
  return Object.keys(date).map((key) => date[key])
}

export default {
  MASK,
  CRITERIA,
  parseUTC,
  dateCompareTo,
  toFormat,
}
