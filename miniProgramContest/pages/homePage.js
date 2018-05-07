import { Base } from '../utils/base.js'
import *as utils from '../utils/umfUtils.js'
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
        this.setData({
            width: app.globalData.systemInfo.screenWidth,
        })
        this._getUserInfo((data) => {
            this.setData({
                userInfo: data,
            });
        });
        this.requestLevelName()
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
  onShareAppMessage: function (res) {
    utils.shareApp()
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
      wx.setStorage({
        key: 'topiclist',
        data: res.data.topiclist,
      })
    });
  },
//获取等级名称
  requestLevelName:function(){
    var allParams = {
      type: 'post',
      url: '/user/getUserMaxLevel',
      }
    base.request(allParams,(res)=>{
      this.setData({
        levelName: res.data.levelname
      })
    })
  },
    gotoMyPage: function (e) {
        wx.navigateTo({
            url: '/pages/personalPage/personalPage?userInfo=' + JSON.stringify(this.data.userInfo),
        })
    },
    gotoQuiz: function (e) {
        let id = e.currentTarget.id
        let curlevelid = getCurlevelid(this.data.topiclist[id].topicid, this.data.user_topic_list)
        console.log(this.data.topiclist[id].topicid)
        wx.navigateTo({
            url: '/pages/quizePage/quizePage?contentArr=' + JSON.stringify(this.data.topiclist[id].level) + '&currlevelid=' + curlevelid + '&topicid=' + this.data.topiclist[id].topicid,
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

function getCurlevelid(topicid, levelist) {
    for (let item of levelist) {
        if (topicid == item.topic_id) {
            return item.level_id
        }
    }
}