/**
 * created by cuilijuan on 2018/3/2
 * 初始版本  网络请求响应信息处理
 */

import * as constants from '../code/constants.js'
import *as cryptManager from './cryptManager.js'
import cryptoUtil from '../utils/cryption/cryptoUtils.js'
import *as umfUtils from '../utils/umfUtils.js'
import umfLog from '../utils/umfLog.js'
import caHelper from './caHelper.js'

function safeResult(){
  this.retCode = '' //返回码（明文）
  this.retMsg = ''  //返回信息（明文）
  this.randomNum = ''  //签名随机串（以aes秘钥加密）
  this.sign = ''   //签名（以aes秘钥加密）
  this.sessionId = ''  //安全层使用的sessionId(以aes秘钥加密)
  this.body = ''   //业务层返回，转换成json串/通信秘钥过期时返回最新通信秘钥证书流（以aes秘钥加密）
  this.certId = ''  //证书id(以aes秘钥加密)

  //初始化
  this.init = (retCode, retMsg, randomNum, sign, sessionId, body, certId)=>{
    this.retCode = retCode 
    this.retMsg = retMsg
    this.randomNum = randomNum
    this.sign = sign 
    this.sessionId = sessionId
    this.body = body
    this.certId = certId
  }

  //请求是否成功
  this.isSuccess = ()=>{
    return this.retCode === constants.retCodes.SUCCESS
  }

  this.parse = (str)=>{
    return umfUtils.hexToString(str)
  }

  //将返回的数据解密为明文
  this.parseData = (aesKey)=>{
    this.retCode = this.parse(this.retCode)
    this.retMsg = this.parse(this.retMsg)
    try {
      if (!(this.retCode === constants.retCodes.RETCODE_TXCANEEDUPDATE)){
        // 更新证书时，body未加密
        this.body = cryptManager.decryptBody(aesKey, this.parse(this.body))
      }

      if(this.randomNum){
        this.randomNum = cryptManager.decryptBody(aesKey, this.parse(this.randomNum))
      }

      if(this.sign){
        this.sign = cryptManager.decryptBody(aesKey,this.parse(this.sign))
      }

      return true
    }catch(e){
      umfLog.error(e)
    }
    return false
  }
}

export function decodeProcessResult(result, safeSdk){
  let rsafeResult = Object.assign(new safeResult(),result)
  if(!rsafeResult.parseData(safeSdk.aesKey)){
    //数据解密失败
    umfLog.error("数据解密失败")
    return null
  }
  if(rsafeResult.isSuccess()){
    if (checkDataSign(rsafeResult)){ //验证签名
      return rsafeResult
    }
    return null
  } else if (constants.retCodes.RETCODE_TXCANEEDUPDATE===rsafeResult.retCode){
    //更新证书
    caHelper.updateCa(rsafeResult,true)
    return null
  }
}

//对返回数据进行签名验证
function checkDataSign(safeResult){
  let msg = safeResult.body + safeResult.randomNum
  let sha1Digest = cryptoUtil.sha1Encrypt(msg)
  return sha1Digest == safeResult.sign
}

