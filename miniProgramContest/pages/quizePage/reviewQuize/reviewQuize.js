// pages/quizePage/reviewQuize/reviewQuize.js
import *as constants from '../../../code/constants.js'
import *as utils from '../../../utils/umfUtils.js'
import {Collect} from './collect-model.js'
var collect = new Collect()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currId:0,
    classArr:constants.classArr,
    isCollect:0,
    // postList: local_database
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let reviewArr = wx.getStorageSync('reviewArr')
    this.setData({
      reviewArr: options.reviewArr ? JSON.parse(options.reviewArr) : reviewArr
    })
    console.log(this.data.reviewArr)
  },

  onUnload:function(){
    wx.removeStorageSync('reviewArr')
  },
  chooseQuestionNum:function(e){
    let id = e.currentTarget.id
    this.setData({
      currId: parseInt(id) -1
    })
  },

  collect:function(e){
    let targetid = e.currentTarget.dataset.current
    collect.collect(targetid,1,!this.data.isCollect,(res)=>{
      this.setData({
        isCollect:!this.data.isCollect
      })
    })

  },
  share:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /**
   * 用户点击右上角分享
   * 
   */
  onShareAppMessage: function () {
    utils.shareApp()  
  }
})