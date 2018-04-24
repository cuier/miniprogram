/**
 * created by cuilijuan on 2018/2/28
 * 初始版本  加密
 */

import cryptoUtil from '../utils/cryption/cryptoUtils.js'
import caHelper from './caHelper.js'

//需要加密的字段
const needEncodeFields = [
  'field1',
  'field2',
  'field3'
]

//加密敏感字段
export function encryptFields(params){
  for(let key of Object.keys(params)){
    if(needEncodeFields.indexOf(key)!=-1){
      let value = params[key]
      if(value){
        params[key]=cryptoUtil.rsaEncrypt(value,caHelper.getDataPublicKey())
      }
    }
  }
}

//加密通信body，返回 "密文|key"
export function encryptBody(body){
  let passPhrase = cryptoUtil.getPassPhrase(16)
  var encrypt = cryptoUtil.aesEncrypt(passPhrase,body)
  return [encrypt,passPhrase]
}

//解密response body
export function decryptBody(passPhrase,body){
  return cryptoUtil.aesDecrypt(passPhrase,body)
}