
// 微信相关API类
export default class WxApi {
  // 获取机型状态栏高度
  static wxGetTelStatusHeight() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success(res) {
          resolve(res.statusBarHeight)
        },
        fail() {
          reject(Error)
        }
      })
    })
  }
}
