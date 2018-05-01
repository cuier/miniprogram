// pages/homePage.js

import network from '../http/newNetwork.js'
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

    this.getUserInfo((data)=>{
      this.setData({
        userInfo:data
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  gotoMyPage:function(e){
    wx.navigateTo({
      url: '/pages/personalPage/personalPage',
    })
  },
  gotoQuiz:function(e){
    wx.navigateTo({
      url: '/pages/quizePage/quizePage',
    })
  },
  gotoArticle:function(){
    wx.navigateTo({
      url: '/pages/articlePage/articlePage',
    })
  },
  gotoStore:function(){
    wx.navigateTo({
      url: '/pages/sotrePage/sotrePage',
    })
  },
  btnOpClick:function(e){
    let id = e.currentTarget.id
    switch (id) {
      case '0':{
        wx.navigateTo({
          url: '/pages/quizePage/quizePage',
        })
        break
      }
      case '1':{
        wx.navigateTo({
          url: '/pages/sotrePage/sotrePage',
        })
        break
      }
      case '2':{
        wx.navigateTo({
          url: '/pages/articlePage/articlePage',
        })
        break
      }
      case '3':{
        wx.navigateTo({
          url: '/pages/personalPage/personalPage',
        })
      }
    }
  },

  getUserInfo(cb){
    wx.login({
      success:()=>{
        wx.getUserInfo({
          success:(res)=>{
            typeof cb == 'function' && cb(res.userInfo)
            //将用户昵称提交到服务器
            if(!this.onPay){
              this._updateUserInfo(res.userInfo)
            }
          },
          fail:(res)=>{
            typeof cb == 'function' && cb({
              avatarUrl:'/icons/user@default.png'
            })
          }
        })
      }
    })
  },

  //更新用户信息到服务器
  _updateUserInfo(res){
    let nickName = res.nickName
    delete res.avatarUrl;  //将昵称去除
    delete res.nickName;  //将昵称去除
    var allParams = {
      url: 'user/wx_info',
      data: { nickname: nickName, extend: JSON.stringify(res) },
      // type: 'post',
      sCallback: function (data) {
      }
    };
    // network.request(allParams);

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})