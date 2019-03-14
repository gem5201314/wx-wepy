import http from './Http'
import Tips from '@/utils/Tips'
import api from '@/api/base'

export default class Pagination {
  constructor(url, processFunc, opt, key = api.javaKey) {
    const options = {
      pageSize: opt && opt.pageSize ? opt.pageSize : 10
    }

    // 当前接口Key参数
    this._keySend = key.keysend
    this._keyBack = key.keyback

    this.url = url // 数据访问地址
    this.list = [] // 数据集合
    this.start = 0 // 加载数据量
    this.nativeData = ''// 原生数据
    this[this._keySend['perPageKey']] = options.pageSize  // 每页数据条数 发送参数-key
    this[this._keySend['pageKey']] = 0// 当前页码 发送参数-key
    this[this._keyBack['currentPageKey']] = 0// 返回值0-当前页码  value
    this[this._keyBack['pageCountKey']] = 0// 返回值-总页码 key-value
    this[this._keyBack['totalKey']] = 0  // 返回值-总数据条数 key-value

    this.processFunc = processFunc  // 数据处理函数
    this.loading = false // 正在加载中
    this.params = []  // 参数
    this.reachBottom = false   // 是否底部
    this.empty = true // 是否为空
    this.toClear = false // 是否需要清除
  }

  /**
   * 加载下一页数据
   */
  async next(args) {
    console.log('Page This == >', this)
    if (this.reachBottom) return
    if (this.loading) {
      return this
    }
    // 页码增加
    this[this._keyBack['currentPageKey']]++
    const param = {
      [this._keySend['pageKey']]: this[this._keyBack['currentPageKey']], // 分页参数 当前页码
      [this._keySend['perPageKey']]: this[this._keySend['perPageKey']] // 每页请求数据量
    }
    console.log('ppp', param)

    // 附加参数
    this.loading = true
    Tips.loading()
    try {
      Object.assign(param, args)
      // 储存参数
      this.params = param
      let data = await http.get(this.url, param)
      let currentList = []// 当前数据集
      this.nativeData = data// 原生数据集
      currentList = this.reponseSearch(data, [this._keyBack['itemKey']])// 处理数据 需要有返回值
      this[this._keyBack['pageCountKey']] = this.reponseSearch(data, [this._keyBack['pageCountKey']]) // 赋值总页码
      this[this._keyBack['totalKey']] = this.reponseSearch(data, [this._keyBack['totalKey']])// 赋值总条数
      // 底部判断，数据为空加载不出更多
      if (currentList === null || currentList.length < 1) {
        if (this.toClear) { // 是否需要清除
          this.clear()
        } else {
          this.reachBottom = true
        }
        return this
      }
      this.empty = false
      // 处理数据
      this._processData(currentList)
      // 设置数据
      if (this.toClear) {
        this.list = [].concat(currentList)
        this.toClear = false
      } else {
        this.list = this.list.concat(currentList)
      }
      this.start += this[this._keySend['perPageKey']] // 计算当前页码最大数据
      if (this[this._keyBack['totalKey']] && this[this._keyBack['totalKey']] <= this.start) {
        this.reachBottom = true
      }
      return this
    } finally {
      this.loading = false
    }
  }

  /**
   * 恢复到第一页
   */
  reset() {
    this.empty = true
    this.toClear = true
    this.start = 0
    this[this._keyBack['currentPageKey']] = 0
    this.reachBottom = false
    this.list = []
  }
  clear() {
    this.toClear = false
    this.start = 0
    this.list = []
  }

  // 查找数据键
  reponseSearch(res, obj) {
    let data = res
    let key = obj[0] // 得到键的字符串
    let value = ''// 查找的数据
    searchKey(data, key)
    function searchKey(data, key) {
      let type = Object.prototype.toString.call(data)
      let typeNumStr = ['[object String]', '[object Number]', '[object Array]']
      if (type === '[object Array]') {
        console.log('第一层为数组，暂无操作')
      }
      if (type === '[object Object]') {
        for (let val in data) {
          // 判断该键值是否为引用类型和数组
          if (typeNumStr.includes(Object.prototype.toString.call(data[val]))) {
            if (val === key) {
              value = data[val] // 找到想要的键之后立即跳出
              return '找到了'
            }
          }
          if (!typeNumStr.includes(Object.prototype.toString.call(data[val]))) { // 对象数据再跑一次
            searchKey(data[val], key)
          }
        }
      }
    }

    return value
  }

  /**
   * 处理数据（私有）
   */
  _processData(data) {
    if (this.processFunc) {
      for (let i in data) {
        const result = this.processFunc(data[i])
        if (result) {
          data[i] = result
        }
      }
      return data
    }
  }
}
