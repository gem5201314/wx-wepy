/**
 * 时间相关类
 */
class Time {
  constructor() {
    this.timeInter = false
  }
 // 倒计时
  static downTime(time='no', callback) { // 倒计时时长time  回调
    if(isNaN(Number(time))) return 0
    let ss = Number(time)
    this.timeInter = setInterval(() => {
      let data={
        time:this.ssToTime(ss),  //格式化的时间
        ss:ss,                   //原始秒数
        timeInter:this.timeInter //定时器
      }
      if(ss===0){ this.clearTime()}//清除倒计时
      ss--
      callback(data) 
    }, 1000)
  }


 // 计时函数
  static startTime(callback) { // 参数为回调函数
    let ss = 0
    this.timeInter = setInterval(() => {
      ss++
      let data={
        time:this.ssToTime(ss),  //格式化的时间
        ss:ss,                   //原始秒数
        timeInter:this.timeInter //定时器
      }
      callback(data) // 回调函数
    }, 1000)
  }


 // 关闭计时 清除定时器
  static clearTime() {
    clearInterval(this.timeInter)
  }


  // 秒数转正常时间
  static ssToTime(ss) {
    let strTime = `00:00`
    if (ss < 60) {
      let currentSs = ss
      strTime = `00:${this.zeroize(currentSs)}`// 最后时间
    }
    if (ss > 60 && ss < 3600) { // 60分钟内
      let currentMin = parseInt(ss / 60)// 当前时间余多少分钟
      let currentSs = ss - (currentMin * 60) // 当前时间余多少秒钟
      strTime = `${this.zeroize(currentMin)}:${this.zeroize(currentSs)}`// 最后时间
    }
    if (ss < 86400 && ss > 3600) { // 超过一小时小余1天
      let currentHour = parseInt(parseInt(ss / 60) / 60)// 当前时间余多少小时
      let currentMin = parseInt((ss - (currentHour * 3600)) / 60)// 当前时间余多少分钟
      let currentSs = ss - ((currentHour * 3600) + (currentMin * 60)) // 当前时间余多少秒钟
      strTime = `${this.zeroize(currentHour)}:${this.zeroize(currentMin)}:${this.zeroize(currentSs)}`// 最后时间
    }
    if (ss > 86400) { // 超过一天
      let currentDay = parseInt(ss / 86400)// 当前时间剩余多少天
      let currentHour = parseInt((ss - (currentDay * 86400)) / 3600)// 当前时间余多少小时
      let currentMin = parseInt((ss - currentDay * 86400 - currentHour * 3600) / 60)// 当前时间余多少分钟
      let currentSs = ss - ((currentDay * 86400) + (currentHour * 3600) + (currentMin * 60)) // 当前时间余多少秒钟
      strTime = `${this.zeroize(currentDay)}:${this.zeroize(currentHour)}:${this.zeroize(currentMin)}:${this.zeroize(currentSs)}`// 最后时间
    }
    return strTime
  }

  //  格式化
  static zeroize(num) {
    return Number(num) < 10 ? `0${num}` : num
  }

  //时间格式化函数  timeStamp日期/时间戳
 static timeFormat(timeStamp=false,ishour=false,type){
    if(!timeStamp) return '未传入时间'
    timeStamp=this.timeTamp(timeStamp)
    let data=new Date(timeStamp)
    let dataArr=data.toLocaleDateString().replace(/\//g, "-").split('-')
    let newDataArr=dataArr.map(v=>{ return Number(v) < 10 ? `0${v}` : v})//月日年
    let defaultData=`${newDataArr[2]}-${newDataArr[0]}-${newDataArr[1]}`
    let defaultDataTime=`${newDataArr[2]}-${newDataArr[0]}-${newDataArr[1]} ${data.toTimeString().substr(0, 8)}`
    if(type==='A') return data //A款 2019-02-28T09:23:16.000Z
    if(type==='B') return data.toLocaleString().replace(/,/g, " ") // B款 2/28/2019  5:23:16 PM
    return ishour?defaultDataTime:defaultData  //默认款 2019-02-28 17:23:16
  }

  //时间转化成时间戳 传入时间，时间 13位时间戳
 static timeTamp(time){  
      if(!time) return '未传入时间'
      if(!isNaN(Number(time))){
        time=time.toString().length===10?Number(time*1000):Number(time)
      }
      let data=new Date(time).getTime()
      let stamp=Number(data)
      return stamp
    }
  // 时间转文字
 static timeToWord(timestamp) {
    let timeNew = this.timeTamp(timestamp)//参数时间时间戳
    let curTimestamp = new Date().getTime() // 当前时间时间戳
    let timestampDiff = curTimestamp - timeNew // 参数时间戳与当前时间戳相差秒数
    let curDate = new Date() // 当前时间日期对象
    let tmDate = new Date(timeNew)  // 参数时间日期对象
    console.log('我的时间', timeNew, curTimestamp,tmDate)
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
        return `昨天${this.zeroize(H)}:${this.zeroize(i)}`
      } else if (curDate.getFullYear() === Y) {
        return `${this.zeroize(m)}月${this.zeroize(d)}日${this.zeroize(H)}:${this.zeroize(i)}`
      } else {
        return `${Y}-${this.zeroize(m)}-${this.zeroize(d)}-${this.zeroize(H)}:${this.zeroize(i)}:${this.zeroize(s)}`
      }
    }
  }
}
export default Time

