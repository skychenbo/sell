import axios from 'axios'

const urlMap = {
  // 开发时候的状态
  development: '/',
  // 生产环境
  production: 'http://www.com/sell'
}

const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0

export function get (url) {
  return function (params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {})
  }
}
