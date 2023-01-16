import Vue from 'vue'
import VueLogger from 'vuejs-logger'

/**
 * @since       0.0.1
 * @desc        log 설정<br/>
 *              log levels
 *                  * debug
 *                  * info
 *                  * warn
 *                  * error
 *                  * fatal
 * @author      예장해
 * @see         {@link https://www.npmjs.com/package/vuejs-logger vuejs-logger}
 */

Vue.use(VueLogger, {
  logLevel: 'info',
  stringifyArguments: false, // true 인 경우 모든 입력은 JSON.stringify ()를 통해 전달
  showLogLevel: true, // true 인 경우 loglevel이 표시됨
  separator: '|', // 출력 구분자
  showConsoleColors: true, // true 인 경우 해당하는 loglevels에 대해 console.warn, console.fatal, console.error를 활성화
})
