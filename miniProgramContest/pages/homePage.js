import { Base } from '../utils/base.js'
var base = new Base()
const app = getApp()
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
    this._getUserInfo((data) => {
      this.setData({
        userInfo: data
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._updateUserInfo()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  //获取用户信息
  _getUserInfo(cb) {
    const failNum = {
      avatarUrl: '/icons/user@default.png',
      nickName: '未知',
      gender: 2
    }
    wx.getUserInfo({
      success: (res) => {
        typeof cb == "function" && cb(res.userInfo);
        this._updateUserInfo(res.userInfo)
      },
      fail: (res) => {
        typeof cb == "function" && cb(failNum);
      }
    })
  },
  //更新用户信息到服务器
  _updateUserInfo(res={}) {
    var gender = res.gender?res.gender-1:1;
    var allParams = {
      type: 'post',
      url: 'user/getInfoList',
      data: { gender: gender },
    };
    base.request(allParams, (res) => {
      // //网络请求返回金币数量和等级
      this.setData({
        goldcoin: res.data.money,
        topiclist:res.data.topiclist,
        user_topic_list: res.data.user_topic_list
      })
    });
  },


  gotoMyPage: function (e) {
    wx.navigateTo({
      url: '/pages/personalPage/personalPage?userInfo=' + JSON.stringify(this.data.userInfo),
    })
  },
  gotoQuiz: function (e) {
    let topicid = e.currentTarget.id
    let userInfo = this.data.userInfo ? this.data.userInfo : {}
    wx.navigateTo({
      url: '/pages/quizePage/quizePage?topicid=' + topicid + '&gender=' + userInfo.gender,
    })
  },
  gotoArticle: function () {
    wx.navigateTo({
      url: '/pages/articlePage/articlePage',
    })
  },
  gotoStore: function () {
    wx.navigateTo({
      url: '/pages/sotrePage/sotrePage',
    })
  },
})