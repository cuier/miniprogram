// pages/quizePage/quizeResult/quizeResult.js
import *as utils from '../../../utils/umfUtils.js'
import { Quize } from './quizeResult-model.js'
var quize = new Quize()
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // isSuccess:true,
      screenWidth: app.globalData.systemInfo.screenWidth,
      isSuccess: options.isSuccess,
      levelid: parseInt(options.levelid),
      // reviewArr: options.reviewArr?JSON.parse(options.reviewArr):[],
      topicid:options.topicid
    })
    if (options.isSuccess == 1){
      this.setData({
        levelid: parseInt(options.levelid) + 1,
        levelName: getLevelName(this.data.levelid+1,options.topicid)
      })  
      quize.addMoney(1000)
      quize.postNewLevel(this.data.topicid, this.data.levelid)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  goonChuanguan:function(){
    let contentArr =[]
    let topiclist = wx.getStorageSync('topiclist')
    for (let item in topiclist) {
      if (this.data.topicid == topiclist[item].topicid) {
        contentArr = topiclist[item].level
      }
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      curlevelid: this.data.levelid,
    })
    wx.navigateBack({
      delta:1
    })
  },
gotoChuanguan:function(){
  wx.redirectTo({
    url: '../index/index?topicid='+this.data.topicid+'&levelid='+this.data.levelid,
  })
},
  gotoReview:function(){
    wx.redirectTo({
      url: '../reviewQuize/reviewQuize',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    utils.shareApp()
  }
})

function getLevelName(levelid,topicid){
  let topiclist = wx.getStorageSync('topiclist')
  for(let item in topiclist){
    if (topicid ==topiclist[item].topicid){
      let level = topiclist[item].level
      for(let it of level){
        if(levelid==it.levelid)
        return it.name
      }
    }
  }
  }
