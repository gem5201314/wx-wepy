const WxNotificationCenter = require('./WxNotificationCenter.js');

export default class Event {
  // 订单中的卡券信息更新
  static TRADE_COUPON_UPDATE = 'TRADE_COUPON_UPDATE';
  // 订单中的地址信息更新
  static TRADE_ADDRESS_UPDATE = 'TRADE_ADDRESS_UPDATE';
  // 购物面板
  static GOODS_PANEL_OPEN = 'GOOD_PANEL_OPEN';
  static GOODS_PANEL_CLOSE = 'GOOD_PANEL_CLOSE';
  // 路由跳转Tab页面
  static NAVIGATE_SWITCH_TAB = 'NAVIGATE_SWITCH_TAB';
  // 更新用户信息
  static UPDATE_USERINFO = 'UPDATE_USERINFO';
  // 更新购物车数据
  static CART_UPDATE = 'CART_UPDATE';
  // 订单列表更新
  static ORDER_LIST_UPDATE = 'ORDER_LIST_UPDATE';
  static listen(eventName, callback, observer) {
    // 先移除监听
    this.remove(eventName, observer);
    WxNotificationCenter.addNotification(eventName, callback, observer);
  }

  static emit(eventName, params) {
    WxNotificationCenter.postNotificationName(eventName, params);
  }

  static remove(eventName, observer) {
    WxNotificationCenter.removeNotification(eventName, observer);
  }
}
