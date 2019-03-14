import base from './base'
import wepy from 'wepy'
import Event from '@/utils/Event'
import Util from '@/utils/Util'
/**
 * 登录
 */
export default class auth extends base {
  /**
   * 检查登录
   */
  static async checkLogin() {
    const token = this.getConfig('token')
    if (token != null && token != '') {
      try {
        // token存在
        console.warn('token is working', token)
        // await this.checkLoginCode(loginCode);
      } catch (e) {
        console.warn('check token fail', token)
        await this.doLogin()
      }
    } else {
      console.warn('token not exists', token)
      await this.doLogin()
    }
  }

  /**
   * 修改用户信息
   */
  static update(param) {
    const url = `/app/v1/user/businessCustomerUser/app/update`
    return this.put(url, {
      ...param,
      companyId: -1
    })
  }

  /**
   * 登录
   */
  static async login(userInfo) {
    const url = `/app/v1/user/agency/wechat/check`
    const param = {
      code: userInfo.code,
      iv: userInfo.iv,
      rawData: userInfo.rawData,
      signature: userInfo.signature,
      encryptedData: userInfo.encryptedData
    }
    return this.post(url, param)
  }

  /**
   * 登录
   */
  static async doLogin(userInfo) {
    const res = await this.login(userInfo)
    console.log('doLogin res', res)
    if (!res) { // 新用户
      await this.removeConfig('user')
    } else {
      if (res.token) await this.setConfig('token', res.token)
      res.avatar = res.headPortrait && res.headPortrait.indexOf('wx.qlogo.cn') <= -1 ? Util.getQiniuUrl(res.headPortrait) : res.headPortrait
      await this.setConfig('user', {
        ...res,
        weChat: res.weChat || ''
      })
      Event.emit('UPDATE_USERINFO')
    }
  }

  /**
   * 获取验证码
   */
  static getCode(param) {
    const url = `/app/v1/user/code/by/bind`
    const params = {
      ...param,
      type: 1, // 1微信
      companyId: -1
    }
    return this.get(url, params)
  }
  /**
   * 加入项目
   */
  static joinProject(param) {
    const url = `/app/v1/agency/agent/user/joinProject`
    return this.post(url, param)
  }
  /**
   * 绑定手机号
   * @param {*} param
   */
  static async bindPhone(param) {
    const d = await wepy.login()
    const url = `/app/v1/user/bind/weChat`
    const params = {
      ...param,
      inviteUser: wepy.getStorageSync('inviteUser'),
      code: d.code
    }
    return this.post(url, params, 'json')
  }

  /**
  * 设置权限值
  */
  static getConfig(key) {
    return wepy.getStorageSync(key)
  }

  /**
   * 检查是否存在权限制
   */
  static hasConfig(key) {
    const value = this.getConfig(key)
    return value != null && value != ''
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({ key: key, data: value })
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`)
    await wepy.removeStorage({ key: key })
  }
  /**
   * 检查用户
   */
  static check(param) {
    const url = `/app/v1/user/agency/wechat/check`
    return this.get(url, param)
  }
}
