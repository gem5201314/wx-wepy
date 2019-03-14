import { ASYNCTEST } from '../types/counter'
import { createAction } from 'redux-actions'

export const asyncInc = createAction(ASYNCTEST, () => { // 这里搞异步函数
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('邓紫棋')
    }, 1000)
  })
})
