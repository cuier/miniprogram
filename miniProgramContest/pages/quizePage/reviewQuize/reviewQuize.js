// pages/quizePage/reviewQuize/reviewQuize.js
import *as constants from '../../../code/constants.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currId:0,
    classArr:constants.classArr,
    // postList: local_database
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      reviewArr: JSON.parse(options.reviewArr)
    })
  },

  chooseQuestionNum:function(e){
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})