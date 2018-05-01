import network from '../../../http/newNetwork.js'
const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    groupBgWidth: sysWidth - 30, //背景宽
    groupBgHeight: (sysWidth - 30) / 345 * 474,  //背景高
    buyWidth: sysWidth - 100, //购买按钮宽
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

})