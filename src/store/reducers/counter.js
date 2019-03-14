
// 函数 数据处理
import { handleActions } from 'redux-actions'
import { TESTEDIT, SETCITY } from '../types/counter'

export default handleActions({
  [TESTEDIT] (state, action) { // state原来的数据  action 页面函数传过来的数据
    // console.log('redux函数里发生的state', state, action)
    return {
      ...state,
      testData: action.payload
    }
  },
  [SETCITY] (state, action) { // 地址--首页定位
    return {
      ...state,
      city: action.payload
    }
  }
}, { // 这里定义初始数据
  testData: 333, // 测试数据
  city: '' // 自动定位
})
