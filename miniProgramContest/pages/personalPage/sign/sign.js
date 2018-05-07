import { Base } from '../../../utils/base.js'
import { Sign } from './sign-model.js'
var sign = new Sign()

const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    signBgWidth: sysWidth,  //背景图宽
    signBgHight: sysHight,  //背景图高
    signTipWidth: sysWidth - 50,  //提示宽
    signTipHight: (sysWidth - 50) / 324 * 275,  //提示高
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 返回时
   */
  onUnload: function(){
    //当前日期
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    var date_str = cur_year + '-' + (cur_month < 10 ? '0' + cur_month : cur_month) + '-' + (cur_day < 10 ? '0' + cur_day : cur_day);
    wx.setStorageSync("signTime", date_str)
  },

  /**
   * 签到
   */
  sign: function() {
    //当前日期
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    var date_str = cur_year + '-' + (cur_month < 10 ? '0' + cur_month : cur_month) + '-' + (cur_day < 10 ? '0' + cur_day : cur_day);
    wx.setStorageSync("signTime", date_str)
    wx.navigateBack({
      delta: 1
    })

    var that = this;
    sign.addMoney((res) => {
    }, 100);
  }

 
})