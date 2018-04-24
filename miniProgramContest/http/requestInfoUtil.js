/**
 * created by cuilijuan on 2018/1/29
 * 初始版本  请求信息处理
 */

import * as cryptManager from './cryptManager.js'
import caHelper from './caHelper.js'
import cryptoUtil from '../utils/cryption/cryptoUtils.js'
import *as umfUtil from '../utils/umfUtils'
import *as constants from '../code/constants.js'
import rpidUtil from '../utils/rpidUtil.js'
import umfLog from '../utils/umfLog.js'
import userUtil from '../utils/model/userUtil.js'

export function requestProc(secretData,aesKey){
  this.secretData = secretData
  this.aesKey = aesKey
}

export function processParam(params){
  cryptManager.encryptFields(params)
  _addCommonParams(params)
}

export function encodeData(reqData){
  umfLog.log("[HTTP] reqData请求参数明文："+reqData)
  let encBody = cryptManager.encryptBody(reqData)
  umfLog.log("[HTTP] aesKey:"+encBody[1])
  return new requestProc(encBody[0],encBody[1])
}

//转换参数  Object-> a=1&b=2&c=3
export function convertReqData(params){
  // let result = ""
  // for (let key of Object.keys(params)){
  //   if(params[key]){
  //     let valueEncode = encodeURIComponent(params[key])
  //     if(result){
  //       result = result + '&' +key + '=' +valueEncode
  //     }else{
  //       result = key + '=' + valueEncode
  //     }
  //     umfLog.log("[HTTP]:请求参数明文 == "+ key + ":" + valueEncode)
  //   }
  // }
  return JSON.stringify(params)
}

function safeChick(funCode,rpid,terminalId,loginUserId,loginSession,version){
  this.rpid = rpid; //请求流水
  this.termId = terminalId //终端ID   例子
  this.userId = loginUserId
  this.sessionId = ""
  this.version = version
}

function createSafeChick(params){
  let { funCode, rpid, terminalId, loginUserId, loginSession, version} = params 
  return new safeChick(funCode, rpid, terminalId, loginUserId, loginSession, version)
}

function httpHeader(keyId,randomNum,equInfo,ssfe,safeChick,sign){
  this.keyId = keyId //秘钥号（明文）
  this.randomNum = randomNum //签名随机串（以aes秘钥加密）
  this.equInfo = equInfo //设备信息
  this.ssfe = ssfe //用rsa加密后的aes秘钥
  this.safeChick = safeChick  //签名（以aes秘钥加密）
  this.sign = sign //存储安全层需要的其他信息，以json格式存储使用aes秘钥加密
}

export function createHttpHeader(params,aesKey){
    // keyId：密钥号（明文）
    // ssfe：用RSA加密后的AES密钥
    // equInfo：设备信息（不同信息间用“||”间隔，每个信息字段含义需提前约定）
    // randomNum:签名随机串（以aes密钥加密）
    // sign:签名（以aes密钥加密）
    // safeChick：存储安全层需要的其他信息，以json格式存储使用AES密钥加密，
    // 包含如下内容

    // 设置httpGet的头部参数信息
    //  接口上行报文头信息如下：
    // KeyId：密钥号（明文）
    // let keyId = CaHelper.getTxPulicKeyId(context);
    let keyId = "dummy-keyId"
    // randomNum:签名随机串（以aes密钥加密）
    let randomNum = umfUtil.randomNumber(16)
    let encodeRandomNum = cryptoUtil.aesEncrypt(aesKey,randomNum)

    // SSFE：用RSA加密后的AES密钥
    // SSFE：用RSA加密后的AES密钥 首先对
    // 1.aeskey进行getbyte("GBK")
    // 2.然后用RSA加密得到byte数组 ，
    // 3.将2的byte数组转为16进制的字符串放入 SSFE
    // let aesKeyHex = umfUtil.stringToHex(aesKey)
    let ssfe = cryptoUtil.rsaEncrypt(aesKey,caHelper.getTxPublicKey())

    // EquInfo：设备信息（不同信息间用“||”间隔，每个信息字段含义需提前约定）
    // let equInfo = makeDeviceInfo(context);
    // let encodeQeuInfo = cryptoUtils.aesEncrypt(equInfo, aesKey);

    let equInfo = "dummy-equInfo"
    let encodeQeuInfo = cryptoUtil.aesEncrypt(aesKey,equInfo)

    // SafeChick：存储安全层需要的其他信息，以json格式存储使用AES密钥加密，
    // 设置 安全层的sessionid
    // 特别说明，这个值是固定的，如果以后用动态的注释这行就行
    let safeChick = createSafeChick(params)
    let safeChickJson = JSON.stringify(safeChick)
    let encodeSafeChickJson = cryptoUtil.aesEncrypt(aesKey,safeChickJson)

    // 包含如下内容
    // Rpid：请求流水
    // UserId：用户id
    // TermId：终端id
    // SessionId：sessionid
    // Interfaces：请求功能码
    // Version：接口版本号
    // sign:签名（以aes密钥加密）

    // 签名是 keyid + SSFE + EquInfo + SafeChick + randomNum
    let data = keyId + aesKey + equInfo +safeChickJson + randomNum
    // UmpLog.i(TAG, "签名串sign未计算签名值：" + data);
    let sign = cryptoUtil.sha1Encrypt(data)  //签名
    let encodeSign = cryptoUtil.aesEncrypt(aesKey,sign)

    return new httpHeader(keyId,encodeRandomNum,encodeQeuInfo,ssfe,encodeSafeChickJson,encodeSign)
} 

//添加公共参数
function _addCommonParams(params){
  let userInfo = new userUtil.userInfo().get()
  // params['appId'] = constants.APPID
  params['rpid'] = rpidUtil.getRpid() + rpidUtil.getTerminalid();
  params['version'] = "1"
  params['loginUserId'] = userInfo.userId
  params['loginAssistId'] = userInfo.assistId
  // params['loginSession'] = umfUtil.getStorageSync(constants.keys.SESSION)
  params['loginAgentId'] = userInfo.agentId
  params['loginPermConf'] = userInfo.permissionConf
  params['loginToken'] ='5ae0ade1-e685-4160-9dd5-9acfd4d5c232'
}