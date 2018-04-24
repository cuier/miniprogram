/**
 * created by cuilijuan on 2018/3/13
 * 初始版本  缓存工具
 */

import *as umfUtils from '../umfUtils.js'
import umfLog from '../umfLog.js'
import constants from '../../code/constants.js'


function cacheManager(){
  this.key = ''
  this.func = ''
  this.storage = {}

  this.init = (key, func)=>{
    let app = getApp()

    //缓存维度  自定义
    let funcKey = app.globalData.userData.agentId
    this.key = funcKey
    this.func = func
    this.storage = {}
    return this
  }

  this.cacheFunc = (params)=>{
    if(!this.storage){
      this.storage = {}
    }
    Object.assign(this.storage,params)
    cacheFunc(this.key, this.func, params)
  }

  this.getFunc = ()=>{
    this.storage = getFunc(this.key, this.func)
    return this.storage
  }

  this.clearFunc = ()=>{
    this.storage = {}
    clearFunc(this.key,this,func)
  }
}
//缓存特定功能数据，异步缓存
function cacheFunc(key,func,params){
  if(!key || !func || !params){
    umfLog.error("cacheStore error~")
    umfLog.error("key= " + key +
      "func= " + func +
      "params= " + params);
    return;
  }

  wx.getStorage({
    key: key,
    success: function(res) {
      let data = res.data
      if(data[func]){
        data[func] = Object.assign(data[func],params)
      }else{
        data[func]=params
      }

      wx.setStorage({
        key: key,
        data: data,
      })
    },

    fail: function(){
      let data = {
        [func]:params
      }
      wx.setStorage({
        key: key,
        data: data,
      })
    }
  })
}

//提取特定功能的数据key&func
function getFunc(key,func){
  if(!key || !func){
    umfLog.error('getFunc error^')
    umfLog.error('key='+key
    +'func='+func)
    return
  }

  let data = umfUtils.getStorageSync(key)
  if(data){
    return data[func]
  }
  return ""
}

//删除特定功能的数据
function clearFunc(key,func){
  if(!key || !func){
    umfLog.error("clearFunc error^")
    umfLog.error('key= '+key +
    'func=' + func)
  }

  wx.getStorage({
    key: key,
    success: function(res) {
      let data = res.data
      if(data && data[func]){
        data[func]=null
        wx.setStorage({
          key: key,
          data: data,
        })
      }
    },
  })
}



module.exports = {
  cacheManager:cacheManager,
  cacheFunc:cacheFunc,
  getFunc:getFunc,
  clearFunc : clearFunc
}

