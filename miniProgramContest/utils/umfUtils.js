/**
 * created by cuilijuan on 2018/2/28
 * 初始版本 各种工具
 */

//从array中获取指定长度的随机串
export function getRandom(array, length) {
  let str = "", range = length, arr = array

  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}


export function randomNumber(length) {
  let randomNum = "";
  for (let i = 0; i < length; i++) {
    randomNum = randomNum + Math.floor(Math.random() * 10);
  }
  return randomNum;
}

export function randomString(length){
  return Math.random().toString(32).substr(2)
}


/** +++++++++++++++++++++++++++++++++字符转换功能++++++++++++++++++++++++++++ */

export function hexToString(c){
  let b = ""
  for(let a=0;a<c.length-1; a+=2){
    b += String.fromCharCode(parseInt(c.substr(a,2),16))
  }
  return b
}

//字符转字节
export function stringToBytes(str){
  let bytes = []
  for(let i=0;i<str.length;i++){
    bytes.push(str.charCodeAt(i))
  }
  return bytes
}

//字符转16进制
export function stringToHex(str){
  let bytes = stringToBytes(str)

  var result = ''
  for(let i=0;i<bytes.length;i++){
    result = result.concat(bytes[i].toString(16))
  }
  return result
}

//设置同步缓存
export function setStorageSync(key, value){
  if(key){
    try{
      if(!value){
        wx.removeStorageSync(key)
      }else{
        wx.setStorageSync(key, value)
      }
    }catch(e){}
  }
}

//同步获取缓存
export function getStorageSync(key){
  try{
    let value = wx.getStorageSync(key)
    if(value)
    {
      return value
    }
  }catch (e){}
  return ''
}

export function shareApp(){

  return {
    title: '健康守护神',
    path: '/page/homePage',
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
}