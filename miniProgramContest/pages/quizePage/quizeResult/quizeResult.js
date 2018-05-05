// pages/quizePage/quizeResult/quizeResult.js
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
      levelid: options.levelid,
      reviewArr: JSON.parse(options.reviewArr) ,
    })
    if (options.isSuccess){
      this.setData({
        levelName: getLevelName(this.data.levelid-1, options.gender, options.topicid)
      })  
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

gotoChuanguan:function(){
  wx.redirectTo({
    url: '../index/index?topicid='+this.data.topicid+'&levelid='+this.data.levelid,
  })
},
  gotoReview:function(){
    wx.redirectTo({
      url: '../reviewQuize/reviewQuize?reviewArr=' + JSON.stringify(this.data.reviewArr),
    })
  },
// share:function(){
//   _ShareAppMessageReturnObject
// }
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

function getLevelName(levelid,gender=2,topicid){
    switch (topicid) {
      case '0':
        return constants.healthLevel[levelid].title;
      case '1':
        return gender == 1 ? constants.dadLevel[levelid].title : constants.mamiLevel[levelid].title
      case '2':
        return constants.slimLevel[levelid].title;
      case '3':
        return constants.chihuoLevel[levelid].title
    }
  }
