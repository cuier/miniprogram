// import network from '../../http/newNetwork.js'
import { Base } from '../../utils/base.js'
var base = new Base()
const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    personalBgWidth: sysWidth - 30, //个人信息背景宽
    personalBgHeight: (sysWidth - 30) / 353 * 203,  //个人信息背景高
    themeBgWidth: sysWidth - 30,  //主题宽
    themeBgHieght: 80 / 350 * (sysWidth - 30), //主题高
    money: 0, //金币
    isSign: false, //是否签到
    isLogin: false, //是否登录
  },

  /**
   * 页面显示时
   */
  onShow: function(){
    let that = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        that.setData({isLogin: true})
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: {
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              }
            })
          }
        })
        var signTime = wx.getStorageSync("signTime");
        if (signTime == ""){  //为空，则显示签到
          that.setData({
            isSign: true
          })
        }else{
          //当前日期
          const date = new Date();
          const cur_year = date.getFullYear();
          const cur_month = date.getMonth() + 1;
          const cur_day = date.getDate();
          var date_str = cur_year + '-' + (cur_month < 10 ? '0' + cur_month : cur_month) + '-' + (cur_day < 10 ? '0' + cur_day : cur_day);
          if (signTime == date_str){  //日期相等，则显示已签到
            that.setData({
              isSign: false
            })
          }else{
            that.setData({
              isSign: true
            })
          }
        }
      },
      fail() {
        wx.showModal({
          title: '授权提示',
          content: '您未授权登录小程序，将无法使用部分功能，请点击确定按钮重新授权登录',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({});
            }
          }
        })
      }
    })

    var allParams = {
        type: 'post',
        url: 'user/getUserMoney',
        data: {},
    };
    base.request(allParams, (res) => {
        console.info(res)
        this.setData({
          money: res.data.money
        })
    });
  },

  /**
   * 页面加载时
   */
  onLoad:function(options){
    this.setData({
      userInfo: JSON.parse(options.userInfo) 
    })
  },

  /**
   * 签到
   */
  sign: function() {
    wx.navigateTo({
      url: '../personalPage/sign/sign',
    })
  },

  /**
   * 登录
   */
  onLogin: function(){
    this.onShow()
  }

})