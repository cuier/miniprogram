// import network from '../../http/newNetwork.js'
import { Base } from '../../utils/base.js'
var base = new Base()
const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    goodsBg: sysHight - 30, //商品背景高
    itemWidth: (sysWidth - 70) / 3, //商品宽
    itemHeight: (sysWidth - 70) / 3 * 1.28,  //商品高
    goods: [],  //商品集合
    pageNo: 1,  //当前页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var allParams = {
      type: 'post',
      url: 'goods/list',
      data: {},
    };
    base.request(allParams, (res) => {
      // //网络请求返回金币数量和等级
      console.info(res)
      this.setData({
        goods: res.data.data
      })
    });
  },

  /**
   * 商品点击
   */
  goodsClick: function(e) {
    var goods_id = e.currentTarget.dataset.goods_id;
    var name = e.currentTarget.dataset.name;
    var pic = e.currentTarget.dataset.pic;
    var price = e.currentTarget.dataset.price;
    wx.navigateTo({
      url: '../sotrePage/sotreDetail/sotreDetail?goods_id=' + goods_id + "&name=" + name + "&pic=" + encodeURIComponent(pic) + "&price=" + price,
    })
  }
})