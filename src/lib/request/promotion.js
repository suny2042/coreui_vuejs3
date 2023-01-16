import qs from 'querystringify'
import remote from './remote'

const URL = {
  ADD: '/va/advertMetaExtractor/content/',
  SEARCH: '/cms/promo',
  DELETE: '/cms/promo',
  UPDATE: '/cms/promo',
}

export default {
  promotionAdd(promotion, uploadProgressHandler) {
    console.log('type) ', promotion.get('contentName'))
    return remote.request({
      url:
        remote.getUrl(URL.ADD) +
        encodeURIComponent(promotion.get('contentName')),
      method: remote.METHOD.PUT,
      headers: {
        'Content-Type': promotion.get('file').type,
      },
      data: promotion,
      timeout: 3600000,
      onUploadProgress: uploadProgressHandler,
    })
  },
  searchPromotion(option) {
    let url = remote.getUrl(URL.SEARCH)

    if (option) {
      url = url + '?' + qs.stringify(option)
    }

    return remote.request({
      url: url,
    })
  },
  searchPromotionDetail(contentId) {
    return remote.request({
      url: remote.getUrl(URL.SEARCH) + '/' + contentId,
    })
  },
  removePromotion(contentId) {
    return remote.request({
      url: remote.getUrl(URL.DELETE),
      method: remote.METHOD.DELETE,
      headers: {
        'Content-Type': 'application/json',
      },
      data: Array.isArray(contentId) ? contentId : [contentId],
    })
  },
}
