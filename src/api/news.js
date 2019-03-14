import base from './base'
import Time from '@/utils/Time'
import Page from '@/utils/Page'
// import Util from '@/utils/Util'
/**
 * 资讯服务类
 */
export default class News extends base {
  /**
   * 获取资讯类型列表
   */
  static newsTypelist(query) {
    const url = `/app/v1/news/type/list`
    const param = {
      ...query
    }
    return this.get(url, param).then(res => {
      return this.dealNewsTypelist(res)
    })
  }
  /**
   * 获取资讯列表
   */
  static newsList(query) {
    const url = `/app/v2/news`
    return new Page(
      url,
      this.dealNewsList.bind(this),
      null,
      base.phpKey,

    )
  }
   /**
   * 获取资讯详情
   */
  static newsInfo(query) {
    const url = `/app/v1/news/${query}`
    return this.get(url, {}).then(res => {
      return this.dealNewsInfo(res)
    })
  }
    /**
   * 收藏的资讯列表
   */
  static favorNewsList(query) {
    const url = `/app/v1/news-collection`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
  /**
   * 新增收藏·
   */
  static addFavor(query) {
    const url = `/app/v1/favor/collection/add`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
   /**
   * 取消收藏
   */
  static delFavor(query) {
    const url = `/app/v1/favor/collection/del`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
   /**
   * 检测是否收藏
   */
  static isFavor(query) {
    const url = `/app/v1/favor/collection/check`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
    /**
   * 获取收藏数
   */
  static favorNum(query) {
    const url = `/app/v1/favor/collection/count`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
   /**
   * 检测是否点赞
   */
  static isLike(query) {
    const url = `/app/v1/like/check`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
  /**
   * 取消点赞
   */
  static delLike(query) {
    const url = `/app/v1/like/del`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
   /**
   * 新增点赞
   */
  static addLike(query) {
    const url = `/app/v1/like/add`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
    /**
   * 获取目标点赞数
   */
  static LikeNum(query) {
    const url = `/app/v1/like/count`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
  // 数据处理---->
  // 资讯类型处理
  static dealNewsTypelist(data) {
    let newData = JSON.parse(JSON.stringify(data))
    // newData.unshift({
    //   id: '0',
    //   name: '推荐'
    // })
    newData.map((v, i) => {
      v.title = v.name
    })
    return newData
  }
  // 资讯列表处理
  static dealNewsList(data) {
    data.myTime = Time.timeToWord(data.createdAt)
  }
  // 资讯详情处理
  static dealNewsInfo(data) {
    let newData = JSON.parse(JSON.stringify(data))
    newData.myTime = Time.timeToWord(newData.createdAt)
    return newData
  }
}
