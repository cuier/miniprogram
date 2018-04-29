// pages/quizePage/quizePage.js
import * as constants from '../../code/constants.js'
import {$alertSheets} from '../../components/CompRouter.js'
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
      subjectId: options.subjectId ? options.subjectId:0,
      contentArr:constants.mamiLevel
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoQuize:function(e){
    wx.navigateTo({
      url: '/pages/quizePage/index/index',
    })
  },
  gameExplain:function(e){
    $alertSheets.showalertSheets({
      gameExplain:'1.金币还可以在商城抵扣现金\n2.当获得超人妈妈等级和\n10000金币以后可在商城\n免费兑换如下礼物',
      onConfirm: (e) => {
        //提交数据
        //校验数据
        // formValues.binBankId = response.branceName.binBankId
        // this._postStoreInfo(formValues);
      },
       onCancel: (e) => {
      },
    })
  }
})