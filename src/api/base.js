import http from '@/utils/Http'

export default class base {
  static get = http.get.bind(http);
  static put = http.put.bind(http);
  static post = http.post.bind(http);
  static delete = http.delete.bind(http);

  // 各服务分页参数汇总
    // php  资讯
  static phpKey={
    keysend: {// 发送参数-key
      pageKey: 'page',  // 当前页码
      perPageKey: 'perPage'// 每页数据加载条数
    },
    keyback: { // ---获取的参数
      currentPageKey: 'currentPage', // 当前页码
      pageCountKey: 'pageCount', // 总页码
      totalKey: 'totalCount', // 总数据条数
      itemKey: 'item'// 数据集合
    }
  }
  // java 店铺
  static javaKey={
    keysend: {
      pageKey: 'page',
      perPageKey: 'pageSize'
    },
    keyback: {
      currentPageKey: 'currentPage',
      pageCountKey: 'pages',
      totalKey: 'total',
      itemKey: 'list'
    }
  }
  // python
  static pythonKey={
    keysend: {
      pageKey: 'page',
      perPageKey: 'perPage'
    },
    keyback: {
      currentPageKey: 'currentPage',
      pageCountKey: 'pages',
      totalKey: 'total',
      itemKey: 'list'
    }
  }
}
