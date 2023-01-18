import remote from './remote'

const URL = {
  LOGIN: '/cms/login/auth',
  REQUEST_PERMISSION: '/cms/users/req',
  ALLOW_PERMISSION: '/cms/users/req',
  REFUSE_PERMISSION: '/cms/users/req',
  GET: '/cms/users',
  ADD: '/cms/users',
  UPDATE: '/cms/users',
  DELETE: '/cms/users',
  GET_FROM_ORGANS: '/cms/users/req',
}

export default {
  login(loginInfo) {
    return remote.request({
      url: remote.getUrl(URL.LOGIN),
      method: remote.METHOD.POST,
      data: loginInfo,
    })
  },
  requestPermission(data) {
    return remote.request({
      url: remote.getUrl(URL.REQUEST_PERMISSION),
      method: remote.METHOD.POST,
      data: data,
    })
  },
  allowRequestedPermission(data) {
    return remote.request({
      url: remote.getUrl(URL.ALLOW_PERMISSION),
      method: remote.METHOD.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
  },
  refuseRequestedPermission(data) {
    return remote.request({
      url: remote.getUrl(URL.REFUSE_PERMISSION),
      method: remote.METHOD.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
  },
  getUser() {
    return remote.request({
      url: remote.getUrl(URL.GET),
    })
  },
  getRequestPermission() {
    return remote.request({
      url: remote.getUrl(URL.REQUEST_PERMISSION),
      method: remote.METHOD.GET,
    })
  },
  getUserInfo(userId, byPrevPage) {
    let url =
      byPrevPage == 0
        ? remote.getUrl(URL.GET_FROM_ORGANS)
        : remote.getUrl(URL.GET)

    if (userId) {
      url = url + '/' + userId
    }

    return remote.request({
      url: url,
    })
  },
  addUser(data) {
    return remote.request({
      url: remote.getUrl(URL.ADD),
      method: remote.METHOD.POST,
      data: data,
    })
  },
  updateUser(data) {
    return remote.request({
      url: remote.getUrl(URL.UPDATE),
      method: remote.METHOD.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
  },
  deleteUser(userId) {
    let url = remote.getUrl(URL.DELETE)

    if (userId) {
      url = url + '/' + userId
    }

    return remote.request({
      url: url,
      method: remote.METHOD.DELETE,
    })
  },
}
