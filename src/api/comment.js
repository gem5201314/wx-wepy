import base from './base'
import Time from '@/utils/Time'
import wepy from 'wepy'
// import Page from '@/utils/Page'
// import Util from '@/utils/Util'
/**
 * 评论类
 */
const COMID = {
  companyId: '-1',
  projectId: wepy.getStorageSync('pid')
}
export default class Comment extends base {
  /**
   * 获取评论列表
   */
  static commentList(urlquery, query) {
    const url = `/app/v1/comment/list/${urlquery}`
    const param = {
      ...query,
      ...COMID
    }
    return this.get(url, param).then(res => {
      return this.dealCommentList(res)
    })
  }
  /**
   * 新增评论
   */
  static addComment(query) {
    const url = `/app/v1/comment`
    const param = {
      ...query,
      ...COMID
    }
    return this.post(url, param, 'json')
  }
   /**
   * 删除评论
   */
  static delComment(queryUrl, query) {
    const url = `/app/v1/comment/${queryUrl}?companyId=${COMID.companyId}&projectId=${COMID.projectId}`
    const param = {
      ...query
    }
    return this.delete(url, param, 'json')
  }
    /**
   * 获取对应的评论数
   */
  static commentNum(query) {
    const url = `/app/v1/comment/count`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
  // 数据处理---->
  static dealCommentList(data) { // 处理评论列表
    let newData = JSON.parse(JSON.stringify(data))
    newData = newData.item
    newData.map((v, i) => {
      v.cTimeMe = Time.timeToWord(v.cTime)
      v.responseMe = v.response === null ? false : v.response
      v.avatar = v.avatar ? v.avatar : '409b70ba066d302ac050051629b6014a4253ed3e.jpg'
      v.username = v.username ? v.username : '邓紫棋的人'
    })
    return newData
  }
}
