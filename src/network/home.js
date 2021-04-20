import {request, requestLocal} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return requestLocal({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}