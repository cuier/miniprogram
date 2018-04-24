/**
 * created by cuilijuan on 2018/1/29
 * 初始版本  证书
 */

import * as constants from '../code/constants.js'
import umfLog from '../utils/umfLog.js'

class caHelper {
  //获取RSA敏感数据加密公钥
  getDataPublicKey(){
    try{
      let dataPublicKey = wx.getStorageSync(constants.keys.DATA_PUBKEY)
      if(dataPublicKey){
        return dataPublicKey
      }
    }catch(e){
      umfLog.error("缓存获取RSA敏感数据加密公钥失败")
    }
    return constants.DATA_PUBKEY;
  }

  //获取RSA通信加密公钥
  getTxPublicKey(){
    try{
      let txPublicKey = wx.getStorageSync(constants.keys.TX_PUBKEY)
      if(txPublicKey){
        return txPublicKey
      }
    }catch(e){
      umfLog.error('缓存获取RSA通信加密公钥失败')
    }
    return constants.TX_PUBKEY;
  }

  //更新敏感信息证书
  updateCa(safeResult,isTx){
    let body = safeResult.body
    wx.setStorage({
      key: isTx?constants.TX_PUBKEY:constants.DATA_PUBKEY,
      data: body,
    })
  }
}

caHelper = new caHelper()
module.exports = caHelper