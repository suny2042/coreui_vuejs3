import axios from 'axios'

const remote = {
    //host: '192.168.56.3:9999',
    host: '61.84.12.8:83',
    wsServer: '/va/advertMetaExtractor',
    // timeout: 120000
    //timeout: 10000
  },
  METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
  }

export default {
  METHOD,
  getUrl(url) {
    return (
      (typeof remote.host === 'string' ? 'http://' + remote.host : '') + url
    )
  },
  request(option) {
    if (typeof option.timeout !== 'number') {
      option.timeout = remote.timeout
    }

    return axios(option)
  },
  // socketIO port : 10000
  wsServer:
    typeof remote.wsServer === 'string' ? remote.host + remote.wsServer : '',
}
