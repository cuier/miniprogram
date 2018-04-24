/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 debug页面
 */
import * as constants from '../../code/constants.js'
import umfLog from '../../utils/umfLog.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: constants.urls
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    constants.urls.push({ name: 'debug环境', value: constants.urls.length, url: 'http://10.10./umfWeChatPlat' })
    umfLog.log(constants.getEnv())
    constants.urls[constants.getEnv()].checked = true
    this.setData({
      items: constants.urls,
      url: constants.url(),
      custom: constants.getEnv() == (constants.urls.length - 1)
    })
  },

  radioChange: function (e) {
    umfLog.log('环境选择：', e.detail.value)
    let value = JSON.parse(wx.getStorageSync('debug') || "{}")
    value.env = e.detail.value
    wx.setStorageSync('debug', JSON.stringify(value))

    constants.setEnv(e.detail.value)

    this.setData({
      url: constants.url(),
      custom:e.detail.value==constants.urls.length-1,
    })
  },
  onSaveCustomUrl:function(e){
    let url = e.detail.value.customUrl
    wx.setStorageSync("customUrl", url)

    this.setData({
      url:constants.url()
    })
  }
  
})