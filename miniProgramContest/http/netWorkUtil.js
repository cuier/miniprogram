import * as constants from '../code/constants.js'
import * as requestInfoUtils from './requestInfoUtil.js'
import * as responseInfoUtils from './responseInfoUtil.js'
import umfLog from '../utils/umfLog.js'

function requestConfig() {
  //url
  this.url = ""
  //请求头
  this.header = {
    'Content-Type': 'application/json',
  }
  //请求参数
  this.params = {}
  //是否显示等待对话框
  this.loading = true
  this.netMethod = 'POST'
  //通信加解密数据
  this.safeSdk = {}
  this.callback = {
    httpCallPreFilter: () => {
      //网络请求前处理
      this.loading && wx.showToast({
        title: '加载中',
        icon: 'loading',
        mask: true,
        duration: 30000
      })
    },
    httpCallBackPreFilter: (response) => {

    },
    doHttpSuccess: (response) => {
      //网络请求成功--公共处理
      if (constants.retCodes.SUCCESS !== response['retCode']) {
        wx.showModal({
          title: '提示',
          content: response.retMsg,
          showCancel: false
        })
      }
    },
    doHttpFailure: (response) => {
      //网络请求失败--公共处理
      wx.showModal({
        title: '提示',
        content: response.retMsg,
        showCancel: false
      })
    },
    doComplete: () => {
      //网络请求结束--公共处理
      this.loading && setTimeout(() => {
        wx.hideToast()
      }, 500)
    }
  }

  this.setMethodGet = function () {
    this.netMethod = 'GET'
    return this
  }

  this.send = function () {
    _request(this)
  }

  this.upload = function () {
    _upload(this, filePath)
  }
}

function httpResponse() {
  //服务器返回结果数据
  this.result = ''
  //rpid
  this.rpid = ''
  this.retMsg = ''
  this.retCode = ''
  //请求配置信息
  this.requestConfig = {}

  this.isSuccess = () => {
    return constants.retCode.SUCCESS === this.retCode
  }

  this.create = (retCode, retMsg, rpid, result) => {
    this.result = result
    this.rpid = rpid
    this.retMsg = retMsg
    this.retCode = retCode
    return this
  }
}

/**
 * 注意,此方法调用后还要调用.send()才是发送出去.
 * @param Interfaces
 * @param protocol
 * @param params
 * @param callback  拷贝上方注释区的代码使用
 * @param loading
 * @returns {requestConfig}
 */
function buildRequest(funCode, params, callback, loading) {
  umfLog.log('=================umfHttp request====================')
  // params.funCode = funCode
  // params.protocal = funCode

  let config = new requestConfig()
  config.loading = typeof loading === 'undefined' ? true : loading
  config.url = constants.url+funCode 
  config.params = params
  if(_isFunction(callback.httpCallPreFilter)){
    let pubHttpCallPreFilter = config.callback.httpCallBackFilter
    config.callback.httpCallPreFilter = () => {
      if (!callback.httpCallPreFilter()){
        pubHttpCallPreFilter()
      }
    }
  }
  if(_isFunction(callback.httpCallBackPreFilter)){
    let pubHttpCallBackPreFilter = config.callback.httpCallBackPreFilter
    config.callback.httpCallBackPreFilter = (response) = (response) => {
      if(!callback.httpCallBackPreFilter(response)) {
        pubHttpCallBackPreFilter(response)
      }
    }
  }
  if(_isFunction(callback.doHttpSuccess)){
    let pubDoHttpSuccess = config.callback.doHttpSuccess
    config.callback.doHttpSuccess = (response) =>{
      if(!callback.doHttpSuccess(response)){
        pubDoHttpSuccess(response)
      }
    }
  }
  if(_isFunction(callback.doHttpFailure)){
    let pubDoHttpFailure = config.callback.doHttpFailure
    config.callback.doHttpFailure = (response) =>{
      if(!callback.doHttpFailure(response)){
        pubDoHttpFailure(response)
      }
    }
  }
  if(_isFunction(callback.doComplete)){
    let pubDoComplete = config.callback.doComplete
    config.callback.doComplete = () =>{
      if(!callback.doComplete()){
        pubDoComplete()
      }
    }
  }
  return config
}

//请求数据
function _request(requestConfig){
  //发出请求之前
  requestConfig.callback.httpCallPreFilter()
  umfLog.log("[HTTP] url:"+requestConfig.url)
  let secretData = processRequest(requestConfig)
  let formData = {
    secretData:secretData['secretData']
  }
  wx.request({
    url: requestConfig.url,
    method: requestConfig.netMethod,
    data: formData,
    header: requestConfig.header,
    success: (res)=>{
      _requestSuccess(res,requestConfig)
    },
    fail: (res) =>{
      _requestFailed(res, requestConfig)
    },
    complete: (res) =>{
      requestConfig.callback.doComplete()
    }
  })
}

//上传文件
function _upload(requestConfig,filePath){

}

function processRequest(requestConfig) {
  // 处理参数
  requestInfoUtils.processParam(requestConfig.params)
  //转化为请求的形式
  let reqData = requestInfoUtils.convertReqData(requestConfig.params)
  //加密请求体
  let secretData = requestInfoUtils.encodeData(reqData)
  //获取请求头信息
  let httpHeader = requestInfoUtils.createHttpHeader(requestConfig.params, secretData.aesKey)

  //配置
  Object.assign(requestConfig.header, httpHeader)
  requestConfig.safeSdk = {aesKey:secretData.aesKey}
  return secretData
}

function _callBack(response, callback) {
  if(callback){
    if (response.retCode == '-1'){
      callback.doHttpFailure(response)
    }else{
      if(!callback.httpCallBackPreFilter(response)){
        callback.doHttpSuccess(response)
      }
    }
  }
}

function _requestSuccess(res, requestConfig){
  umfLog.log(res)
  if(parseInt(res.statusCode) === 200){
    let response = res.data
    if (typeof response === 'string'){
      response = JSON.parse(response)
    }

    let safeResult = responseInfoUtils.decodeProcessResult(response, requestConfig.safeSdk)
    if(!safeResult){
      console.error("安全层处理失败：" + safeResult)
      let response = new httpResponse().create(constants.retCodes.NETWORK_ERROR,'请求失败，请重试')
      response.requestConfig = requestConfig
      requestConfig.callback.doHttpFailure(response)
      return
    }else if(!safeResult.body){
      console.error("安全层处理失败：" + safeResult)
      let response = new httpResponse().create(safeResult.retCode, safeResult.retMsg)
      response.requestConfig = requestConfig
      requestConfig.callback.doHttpFailure(response)
      return
    }
    try{
      let body = safeResult.body
      let resultData = JSON.parse(body)
      umfLog.log("[HTTP] response:")
      umfLog.log(resultData)
      resultData.requestConfig = requestConfig
      _callBack(resultData, requestConfig.callback)
    }catch(e){
      console.error(e)
      _callBack({retCode:'-1', retMsg:e},requestConfig.callback)
    }
  }else {
    let response = new httpResponse().create(constants.retCodes.RESPONSE_ERROR,'请求失败')
    response.requestConfig = requestConfig
    requestConfig.callback.doHttpFailure(response)
  }
}

function _requestFailed(res,requestConfig){
  console.error('[HTTP]: requestFailed')
  console.error(res)
  let response = new httpResponse().create(constants.retCodes.NETWORK_ERROR,'网络错误')
  response.requestConfig = requestConfig
  requestConfig.callback.doHttpFailure(response)
}

function _isFunction(func){
  if(typeof func === 'function'){
    return true
  }
  return false
}

module.exports = {
  buildRequest: buildRequest
}
