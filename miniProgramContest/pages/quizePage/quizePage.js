// pages/quizePage/quizePage.js
import * as constants from '../../code/constants.js'
import {$alertSheets} from '../../components/CompRouter.js'
import {Base} from '../../utils/base.js'
var base = new Base()
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
    // let contentArr = chooseSubject(options.topicid, options.gender)
    // options.levelid = 3
    let contentArr = JSON.parse(options.contentArr)
    this.setData({
      contentArr: contentArr,
      curlevelid: options.currlevelid != 'undefined' ? parseInt(options.currlevelid) : parseInt(contentArr[0].levelid),
      topicid:options.topicid,
      currlowestlevelid: parseInt(contentArr[0].levelid)
    })
    wx.setNavigationBarTitle({
      title: contentArr[this.data.curlevelid-this.data.currlowestlevelid].name,
    })
  },
onShow:function(){
  console.log(this.data.topicid)
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoQuize:function(e){
    //不在这做网络请求
    // let params = {
    //   url:'',
    //   data:{}
    // }
    // base.request(params,(res)=>{
    //   if(res.retCode=='0000'){

    //   }
    // })
    wx.navigateTo({
      url: '/pages/quizePage/index/index?topicid=' + this.data.topicid + '&levelid=' + this.data.curlevelid,
    })
  },
  gameExplain:function(e){
    $alertSheets.showalertSheets({
      gameExplain:'1.金币还可以在商城抵扣现金\n2.当获得超人妈妈等级和\n10000金币以后可在商城\n免费兑换如下礼物',
      onConfirm: (e) => {
      },
       onCancel: (e) => {
      },
    })
  },
  goback:function(){
    wx.navigateBack({
      delta:1
    })
  }
})
