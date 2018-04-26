import *as constants from '../code/constants.js'
import {token} from 'token.js'

class NetWork {
  constructor(){
    'use strict'
    this.baseRestUrl = constants.url
    this.onPay = constants.onPay
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, noRefech) {
    let url = this.baseRestUrl + params.funcode
    if(params.setUpUrl==false){
      //不需要再次组装地址
      url = params.url
    }

    wx.request({
      url: url,
      data:params.data,
      method: 'POST',
      header:{
        'content-type': 'application/json',
        'token':wx.getStorageInfoSync('token')
      },
      success:(res)=>{
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        let code = res.statusCode.toString()
        let startChar = code.charAt(0)
        if(startChar == '2'){
          params.sCallback && params.sCallback(res.data)
        }else{
          if(code == '401'){
            if(!noRefetch){
              this._refetch(params)
            }
          }
          this._processError(res)
          params.eCallback && params.eCallback(res.data)
        }
      },
      fail:(err)=>{
        this._processError(err)
      }
    })
  }

  _processError(err){
    wx.showModal({
      title: '提示',
      content: err.retMsg,
    })
  }

  _refetch(param){
    let token = new token()
    token.getTokenFromServer((token)=>{
      this.request(param,true)
    })
  }

  //获得元素上的绑定的值
  getDataSet(event,key){
    return event.currentTarget.dataset[key]
  }
}
var network = new NetWork()
module.exports = {network }