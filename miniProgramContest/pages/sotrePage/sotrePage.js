import network from '../../http/newNetwork.js'
const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    goodsBg: sysHight - 30, //商品背景高
    itemWidth: (sysWidth - 70) / 3, //商品宽
    itemHeight: (sysWidth - 70) / 3 * 1.28,  //商品高
    goods: [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],  //商品集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 商品点击
   */
  goodsClick: function() {
    wx.navigateTo({
      url: '../sotrePage/sotreDetail/sotreDetail',
    })
  }
})