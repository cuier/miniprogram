// pages/quizePage/quizePage.js
import * as constants from '../../code/constants.js'
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
      subjectId: options.subjectId ? options.subjectId:0,
      contentArr:constants.mamiLevel
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoQuize:function(e){
    wx.navigateTo({
      url: '/pages/quizePage/index/index',
    })
  },
  gameExplain:function(e){

  }
})