import qs from 'querystringify'
import remote from './remote'

const URL = {
  ADD: '/va/advertMetaExtractor/content/',
  ANALYSIS: '/va/advertMetaExtractor',
}

export default {
  contentUpload(param, uploadProgressHandler) {
    console.log('type ', param.contentName)
    return remote.request({
      url: remote.getUrl(URL.ADD) + encodeURIComponent(param.contentName),
      method: remote.METHOD.PUT,
      // headers: {
      //     'Content-Type':param.file.type
      // },
      data: param.file,
      timeout: 3600000,
      onUploadProgress: uploadProgressHandler,
    })
  },
  doAnalysis(param) {
    return remote.request({
      url: remote.getUrl(URL.ANALYSIS),
      method: remote.METHOD.POST,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data: param,
    })
  },
  getResultData(param) {
    console.log(qs.stringify(param))
    return remote.request({
      url: remote.getUrl(URL.ANALYSIS) + '?' + qs.stringify(param),
    })
  },
}
