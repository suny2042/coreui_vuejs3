/**
 * @module      config~utils
 * @since       0.0.1
 * @desc        유틸리티 모듈
 * @author      예장해
 */

import date from './date'

//const DISPLAY_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS',
const DISPLAY_DATE_FORMAT = 'YYYY-MM-DD',
  DISPLAY_DATE_FORMAT_EVENT = 'MM.DD'

export default {
  cookie: {
    addCookie(key, value, expires) {
      let str = key + '=' + value + '; expires=',
        date

      str += expires
        ? expires
        : ((date = new Date()),
          date.setFullYear(date.getFullYear() + 10),
          date.toUTCString())

      document.cookie = str
    },
    getCookie(key) {
      let value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
      return value ? value[2] : null
    },
    removeCookie(key) {
      document.cookie = key + '=; expires=' + new Date().toUTCString()
    },
  },
  date: {
    toFormat(dateObject, format) {
      return date.toFormat(dateObject, format)
    },
    dateToFormat(dateStr, format) {
      let _date,
        _dateFormat = format ? DISPLAY_DATE_FORMAT_EVENT : DISPLAY_DATE_FORMAT

      switch (true) {
        case typeof dateStr === 'string':
          var y = dateStr.substr(0, 4)
          var m = dateStr.substr(4, 2)
          var d = dateStr.substr(6, 2)
          _date = new Date(y, m - 1, d)
          // yyyymmddHHmiss
          //_date.setFullYear(parseInt(dateStr.substring(0, 4)))
          //_date.setMonth(parseInt(dateStr.substring(4, 6)) - 1)
          //_date.setDate(parseInt(dateStr.substring(6, 8)))
          //_date.setHours(parseInt(dateStr.substring(8, 10)))
          //_date.setMinutes(parseInt(dateStr.substring(10, 12)))
          //_date.setSeconds(parseInt(dateStr.substring(12, 14)))
          break
        case dateStr instanceof Date:
          _date = dateStr
          break
      }

      return date.toFormat(_date, _dateFormat)
    },
    toDate(dateStr) {
      let _date = new Date()

      // yyyymmddHHmiss
      _date.setFullYear(parseInt(dateStr.substring(0, 4)))
      _date.setMonth(parseInt(dateStr.substring(4, 6)) - 1)
      _date.setDate(parseInt(dateStr.substring(6, 8)))
      _date.setHours(0)
      _date.setMinutes(0)
      _date.setSeconds(0)
      //            _date.setHours(parseInt(dateStr.substring(8, 10)))
      //            _date.setMinutes(parseInt(dateStr.substring(10, 12)))
      //            _date.setSeconds(parseInt(dateStr.substring(12, 14)))

      return _date
    },
  },
}
