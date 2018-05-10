// import network from '../../../http/newNetwork.js'
import { Base } from '../../../utils/base.js'
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
    let goods_id = options.goods_id;
    let name = options.name;
    let pic = decodeURIComponent(options.pic);
    let price = options.price;
    let can_exchange = options.can_exchange;
    let topciname = options.topciname;
    let max_level_name = options.max_level_name;
    this.setData({
      goods_id: goods_id,
      name: name,
      pic: pic,
      price: price,
      topciname: topciname,
      can_exchange: can_exchange,
      max_level_name: max_level_name
    })
  },

})