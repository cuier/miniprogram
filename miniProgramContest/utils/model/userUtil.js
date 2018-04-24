/**
 * created by cuilijuan on 2018/1/25
 * 初始版本  用户信息工具
 */

import * as constants from '../../code/constants.js'
import * as umfUtil from '../umfUtils.js'
import umfLog from '../umfLog.js'

function userInfo(){
  this.assistId = ''
  this.agentId = ''
  this.agentName = ''
  this.userId = ''
  this.userType = ''
  this.productAttribute = ''

  this.agentLevel = ''
  this.permissionConf = ''
  this.permConfig = {}

  this.oriPwdChange = false

  //获取用户数据
  this.get=()=>{
    let {assistId, agentId, agentName, userId, userType, productAttribute, agentLevel, permissionConf, oriPwdChange} = _getUserInfo()

    // this.assistId = assistId
    // this.agentId = agentId
    // this.agentName = agentName
    // this.userId = userId;
    // this.userType = userType;
    // this.productAttribute = productAttribute;

    // this.agentLevel = agentLevel;
    // this.permissionConf = permissionConf;
    // this.permConfig = new permConfig(this.permissionConf, this.userType, this.agentLevel)

    // this.oriPwdChange = oriPwdChange
    this.assistId = "saas201801"
    this.agentId = "Y575921884"
    this.agentName = agentName
    this.userId = "admin";
    this.userType = userType;
    this.productAttribute = productAttribute;

    this.agentLevel = agentLevel;
    // this.permissionConf = permissionConf;
    // this.permConfig = new permConfig(this.permissionConf, this.userType, this.agentLevel)

    this.oriPwdChange = oriPwdChange
    return this
  }
}



function saveUserInfo(userInfo){
  umfLog.log("saveUserInfo:")
  umfLog.log(userInfo)
  if(userInfo){
    let userData = {
      assistId: userInfo.assistId,
      agentId:userInfo.agentId,
      agentName:userInfo.agentName,
      userId:userInfo.userId,
      userType:userInfo.userType,
      productAttribute:userInfo.productAttribute,
      agentLevel:userInfo.agentLevel,
      // permissionConf:userInfo.permissionConf,
      // oriPwdChange:userInfo.oriPwdChange
    }

    try{
      wx.setStorageSync(constants.keys.USER_INFO, userData)
    }catch(e){
      umfLog.error("saveUserInfo error!")
    }
  }
}

function _getUserInfo(){
  return umfUtil.getStorageSync(constants.keys.USER_INFO)
}

module.exports = {
  userInfo: userInfo,
  saveUserInfo: saveUserInfo
}