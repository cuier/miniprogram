// pages/homePage.js

// import{homePage} from './homePage-model.js'
// var homepage = new homePage()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  gotoMyPage: function (e) {
    wx.navigateTo({
      url: '/pages/personalPage/personalPage?userInfo='+JSON.stringify(this.data.userInfo),
    })
  },
  gotoQuiz: function (e) {
    let topicid=e.currentTarget.id
    let userInfo = this.data.userInfo ? this.data.userInfo:{}
    wx.navigateTo({
      url: '/pages/quizePage/quizePage?topicid=' + topicid+'&gender='+userInfo.gender,
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
      gender:2
    }
    wx.login({
      success: (ress) => {
        this.setData({
          code:ress.code
        })
        wx.getUserInfo({
          success: (res) => {
            typeof cb == "function" && cb(res.userInfo);
            // if (!this.onPay) {
              // this._updateUserInfo(res.userInfo)
            // }
          },
          fail: (res) => {
            typeof cb == "function" && cb(failNum); 
          }
        })
      },
      fail: (res) => {
        typeof cb == "function" && cb(failNum); 
      }
    })
  },
  //更新用户信息到服务器
  _updateUserInfo(res) {
    // var gender = this.data.userInfo.gender ? this.data.userInfo.gender-1:1;
    // var param = {
    //   url: 'api/user/getInfoList',
    //   type: 'post',
    //   data: { gender: gender },
    //   sCallback: function (data) {
    //     callback && callback(data);
    //   }
    // };
    // base.request(param); return;
    // let nickName = res.nickName
    // delete res.avatarUrl;  //将昵称去除
    // delete res.nickName;  //将昵称去除
    var gender = 1;
    var allParams = {
      type: 'post',
      url: 'api/user/getInfoList',
      data: {gender:gender},
    };
    base.request(allParams,(res)=>{
      console.log(res.data.money)
      console.log(res.data.topiclist[1].name)
      // //网络请求返回金币数量和等级
      // this.setData({
        
      //   goldcoin:res.goldcoin,
      //   levelid: res.levelid
      // })
    });
  },
})