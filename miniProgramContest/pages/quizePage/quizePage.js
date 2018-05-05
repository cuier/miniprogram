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
    this.setData({
      // topicid:options.topicid,
      // levelid:options.levelid,
      // gender:options.gender,
      // contentArr: formatArr(contentArr, options.levelid)
      contentArr: JSON.parse(options.contentArr),
      curlevelid: options.curlevelid ? options.currlevelid:2,
      topicid:options.topicid 
    })
    console.log(options.contentArr)
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

// function chooseSubject(id,gender){
//   switch(id){
//     case '0':
//     return constants.healthLevel;
//     case '1':
//     return gender==1?constants.dadLevel: constants.mamiLevel
//     case '2':
//     return constants.slimLevel;
//     case '3':
//     return constants.chihuoLevel
//   }
// }

// function formatArr(contentArr, levelid){
//   for (let i = 1; i < levelid;i++){
//     contentArr[i].locked = 0
//   }

//   return contentArr 
// }