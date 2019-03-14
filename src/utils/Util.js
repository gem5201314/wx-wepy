import wepy from 'wepy'
import md5 from 'crypto-js/md5'

export default class Util {
  // 判断字符串是否为空
  static isEmpty(str) {
    return str === '' || str == null || str === 'null'
  }
  // 判断字符串是否不为空
  static isNotEmpty(str) {
    return !this.isEmpty(str)
  }
  // 浮点求和
  static sum(numbers, toFixed = 2) {
    let sum = 0
    for (const str of numbers) {
      if (!this.isNumber(str)) {
        return NaN
      }
      const num = parseFloat(str)
      if (isNaN(num)) {
        return NaN
      }
      sum += num
    }
    return sum.toFixed(toFixed)
  }
  // 数字判断
  static isNumber(value) {
    const patrn = /^[-+]?\d+(\.\d+)?$/
    return patrn.test(value)
  }

  // 数字判断
  static isPositiveNumber(value) {
    const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/
    return patrn.test(value)
  }
  // 数组判断
  static isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
  }
  // 时间转日期
  static convertTimestapeToDay(timestape) {
    return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.')
  }

  // 格式化日期
  static dateFormate(date, fmt) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }

  // 时间字符串如2017-09-30 15:30:20转时间戳
  static dateToTimeStamp(str) {
    str = str.replace(/-/g, '/')
    return (new Date(str)).getTime()
  }

  // 七牛图片拼接
  static getQiniuUrl(path) {
    const qiniu = wepy.$appConfig.qiniuUrl
    return `${qiniu}${path}`
  }

  // 密码MD5加密
  static cryptPwd(text) {
    if (!text || text.length <= 0) {
      return ''
    }
    return md5(text).toString()
  }

  // 软判断是否登录
  static isLogin() {
    if (!wepy.getStorageSync('user') || !wepy.getStorageSync('token')) { return false } else { return true }
  }

  // 给手机号中间四位加***
  static starPhone(phone) {
    console.log('phone', phone)

    return phone.substr(0, 3) + '****' + phone.substr(7)
  }

  // 路由判断
  static isInArrayMap(page, map) {
    const res = map.filter(item => {
      if (page.indexOf(item) > -1) {
        return item
      }
    })
    if (res.length > 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * 倒计时时间渲染
   * @param {*} t 时间
   */
  static countFormat(t) {
    // let day = Math.floor(t / 86400000)
    // let hour = Math.floor((t / 3600000) % 24)
    let hour = Math.floor((t / 3600000))
    let min = Math.floor((t / 60000) % 60)
    let sec = Math.floor((t / 1000) % 60)
    // day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec
    let format = ''
    // format = `${day}天${hour}时${min}分${sec}秒`
    format = `${hour}:${min}:${sec}`
    return format
  }

  /**
   * 解析二维码scene
   * scene = ${projectId}_${inviteUser}_${productId}_${type}_${activityId}_${headId}
   * projectId 项目ID
   * inviteUser 邀请人ID/
   * productId 商品ID/接龙活动商品ID
   * type 类型 1普通 2社区团购（接龙） 3 多人团购 4 限时购 5 返现
   * activityId 活动ID如: 接龙ID
   * headId 社区团购团长ID
   * */
  static analyseQrcodeScene(query) {
    const scene = query.scene ? decodeURIComponent(query.scene) : ''
    const param = scene ? scene.split('_') : null
    if (param) {
      const pid = param[0] || null
      const userId = param[1] || null
      const productId = param[2] || null
      const type = param[3] || 1
      const activityId = param[4] || null
      const headId = param[5] || null
      return {
        pid,
        userId,
        productId,
        type,
        activityId,
        headId
      }
    }
    return param
  }

   /**
   * 时间转文字传入时间戳
   * @param {*} timestamp
   */
   // 时间转文字
  static timeToWord(timestamp) {
    let timeNew = (timestamp + '').length === 13 ? timestamp : timestamp * 1000
    let curTimestamp = parseInt(new Date().getTime() / 1000) // 当前时间戳
    let timestampDiff = curTimestamp - timeNew / 1000 // 参数时间戳与当前时间戳相差秒数

    let curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
    let tmDate = new Date(timeNew)  // 参数时间戳转换成的日期对象
    console.log('我的时间', timeNew, curTimestamp)
    let Y = tmDate.getFullYear()
    let m = tmDate.getMonth() + 1
    let d = tmDate.getDate()
    let H = tmDate.getHours()
    let i = tmDate.getMinutes()
    let s = tmDate.getSeconds()

    if (timestampDiff < 60) { // 一分钟以内
      return '刚刚'
    } else if (timestampDiff < 3600) { // 一小时前之内
      return Math.floor(timestampDiff / 60) + '分钟前'
    } else if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
      return `今天${this.zeroize(H)}:${this.zeroize(i)}`
    } else {
      let newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
      if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
        return `昨天'${this.zeroize(H)}:${this.zeroize(i)}`
      } else if (curDate.getFullYear() === Y) {
        return `${this.zeroize(m)}月${this.zeroize(d)}日${this.zeroize(H)}:${this.zeroize(i)}`
      } else {
        return `${Y}年${this.zeroize(m)}月${this.zeroize(d)}日${this.zeroize(H)}:${this.zeroize(i)}:${this.zeroize(s)}`
      }
    }
  }
  /**
   * 倒计时(单项)
   * 用法
   * this.timer = setInterval(Util.counterDown.bind(
   *    this, // 当前页面实例 this
   *    this.cashBack.bargainEndTime, // 结束时间
   *    (format) => this.counterCallBack(format)), // 回调方法，用于给倒计时赋值
   * 1000)  // 计时器间隙
   */
  static counterDown(endTime, callback, isTimeStamp = false) {
    let end = !isTimeStamp ? Util.dateToTimeStamp(endTime) : endTime
    let t = end - new Date().getTime()
    let format = ''
    if (t > 0) {
      format = Util.countFormat(t)
    } else {
      format = ''
    }
    if (callback) {
      callback(format)
    } else {
      return format
    }
  }

  /**
   * 清除计时器
   * @param {*} timer
   */
  static clearCounter(timer) {
    if (timer) {
      clearInterval(timer)
    }
  }

  /**
   * 判断arr1数组是否包含arr2
   * @param {*} arr1
   * @param {*} arr2
   */
  static isContain(arr1, arr2) {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false
    for (var i = arr2.length - 1; i >= 0; i--) {
      if (!arr1.includes(arr2[i])) {
        return false
      }
    }
    return true
  }

  /**
   * 获取百分比
   * @param {*} num1
   * @param {*} num2
   */
  static getPercent(num1, num2) {
    return (Math.round(num1 / num2 * 10000) / 100.00 + '%')
  }
}
