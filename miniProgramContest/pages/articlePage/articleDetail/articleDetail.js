// pages/articlePage/articleDetail/articleDetail.js
import *as utils from '../../../utils/umfUtils.js'
import {Collect} from '../../quizePage/reviewQuize/collect-model.js'
var collect = new Collect()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      isCollect:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var content = options.content;
        var tag = options.tag;
        var title = options.title;
        var read = options.read;
        var pic = options.pic;
        this.setData({
            content: content,
            tag: tag,
            title: title,
            read: read,
            pic: pic,
            article_id:options.article_id
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    collect: function (e) {
      let targetid = e.currentTarget.dataset.current
      collect.collect(targetid, 0, !this.data.isCollect, (res) => {
        this.setData({
          isCollect: !this.data.isCollect
        })
      })

    },
    share: function () {
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      utils.shareApp()
    }
})