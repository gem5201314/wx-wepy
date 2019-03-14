import wepy from 'wepy'
import Tips from '@/utils/Tips'
// HTTP工具类
export default class http {
  static queue = []

  static async request(method, url, data, contentType = 'form', loading = true) {
    const baseUrl = wepy.$appConfig.configData.httpUrl
    // 拼接固定参数
    data = Object.assign(data, {
      companyId: '8680a402cf4b430db85e6233b19758e3',
      projectId: '100295'
    })
    // return
    const param = {
      url: baseUrl + url,
      method: method,
      data: data,
      header: {
        'Accept': '*/*',
        'content-type': contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8',
        ...this.createAuthHeader()
      }
    }

    if (loading) {
      Tips.loading()
    }
    const res = await wepy.request(param)
    Tips.loaded()
    if (this.isSuccess(res)) {
      return res.data.data
    } else {
      throw this.requestException(res)
    }
  }

  /**
   * 判断请求是否成功
   */

  static isSuccess(res) {
    const wxCode = res.statusCode
    // 微信请求错误
    if (wxCode !== 200) {
      return false
    }
    const wxData = res.data
    // 服务器请求错误
    return !(wxData && wxData.code !== 0)
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {}
    error.statusCode = res.statusCode
    const wxData = res.data
    if (wxData) {
      error.code = wxData.code ? wxData.code : 'error'
      error.message = wxData.message ? wxData.message : '未知错误'
    }
    if (error.statusCode === 401) {
      console.log('401')
      wepy.navigateTo({
        url: '/pages/login'
      })
    } else {
      Tips.toast(error.message, null, 'none', 1500)
    }
    return error
  }

  /**
   * 构造授权头部
   */
  static createAuthHeader() {
    const token = wepy.getStorageSync('token')
    const header = {}
    if (token) {
      header['Authorization'] = token
    }
    return header
  }

  static get(url, data, contentType = 'form', loading = true) {
    return this.request('GET', url, data, contentType, loading)
  }

  static put(url, data, contentType = 'form', loading = true) {
    return this.request('PUT', url, data, contentType, loading)
  }

  static post(url, data, contentType = 'form', loading = true) {
    return this.request('POST', url, data, contentType, loading)
  }

  static patch(url, data, contentType = 'form', loading = true) {
    return this.request('PATCH', url, data, contentType, loading)
  }

  static delete(url, data, contentType = 'form', loading = true) {
    return this.request('DELETE', url, data, contentType, loading)
  }
}
