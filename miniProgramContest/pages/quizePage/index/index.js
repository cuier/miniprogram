/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 首页
 */
import debugUtil from '../../../utils/debugUtil'
import *as sensorUtil from '../../../utils/sensorUtil'
import *as constants from '../../../code/constants.js'
import circleProgress from '../../../commonView/circleProgress/circleProgress.js'
import{Index} from './index-model.js'
var index = new Index()

//获取应用实例
const app = getApp()
Page(Object.assign({
  data: {
    idx: 0,
    num: 100,
    step: null,
    time: null,
    stepTimer: null,
    rightNum: 0,
    wrongNum: 0,
    // stopInterval: true,
    reviewArr:[]  //保存本局回顾数据
  },
  btnOpClick: function (e) {
    
    var select = e.currentTarget.id;
    var jieg = this.data.postList[this.data.idx].answer;
    this.setData({
      select: parseInt(select) ,
      isResult: true,
    })
    if (select != jieg) {
      this.dealWrong(select)
    }
    else if (this.data.rightNum < 7) {
      this.pushDataToReview(this.data.postList[this.data.idx],select)
      
      this.setData({
        stopInterval: true,
        rightNum: this.data.rightNum + 1
      })
      setTimeout(() => {
        this.setData({
          num: 100,
          idx: this.data.idx + 1,
          className: 'weui-animate-fade-out',
          isResult: false,
          stopInterval: false
        })
      }, 2000)
    } else {
      this.pushDataToReview(this.data.postList[this.data.idx], select)
      this.setData({
        stopInterval: true,
        rightNum: this.data.rightNum + 1
      })
      //闯关成功
      wx.setStorageSync('reviewArr', this.data.reviewArr)
      wx.redirectTo({
        url: '../quizeResult/quizeResult?isSuccess=1&levelid=' + this.data.levelid + '&topicid=' + this.data.topicid ,//闯关成功界面进行加一
      })
    }

  },
  onShow: function (options) {
    circleProgress.drawCircleBg(35, 10)
    // 绘制圆环
    this.stepInterval()
    //调试代码，打开摇一摇进入调试页面
    if (debugUtil.isDebug()) {
      wx.onAccelerometerChange(res => {
        sensorUtil.shake(res, () => {
          wx.navigateTo({
            url: '../debug/test'
          })
        })
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      width: app.globalData.systemInfo.screenWidth,
      levelid:options.levelid,
      topicid:options.topicid
    })
    this.requestPostList(options.topicid, options.levelid)
  },

  onUnload: function () {
    clearInterval(this.stepTimer)
  },
  onHide: function () {
    clearInterval(this.stepTimer)
  },

  onReady: function () {
    /*倒计时*/
    // 获得circle组件
    // this.circle = this.selectComponent("#circle");
    // 绘制背景圆环
   
  },

  dealWrong(select) {
    this.pushDataToReview(this.data.postList[this.data.idx], select)
    this.setData({
      wrongNum: this.data.wrongNum + 1,
      stopInterval: true,
    })

    if (this.data.wrongNum < 3) {
      // this.pushDataToReview(this.data.postList[this.data.idx], select)
      setTimeout(() => {
        // this.stepInterval()
        this.setData({
          num: 100,
          idx: this.data.idx + 1,
          className: 'weui-animate-fade-out',
          isResult: false,
          stopInterval: false
        })
      }, 2000)
    } else {
      
      clearInterval(this.stepTimer)
      this.setData({
        isResult: true,
        stopInterval: true,
      })
      wx.setStorageSync('reviewArr', this.data.reviewArr)
      //闯关失败
      wx.redirectTo({
        url: '../quizeResult/quizeResult?isSuccess=0&levelid=' + this.data.levelid + '&topicid=' + this.data.topicid,
      })
    }

  },
  requestPostList: function (topicid, levelid) {
    index.requestPostList(topicid,levelid,(res)=>{
      this.setData({
        postList:res.data
      })
      console.log(this.data.postList)
    })
  },
  goBack:function(){
    wx.navigateBack({
      delta:2
    })
  },
  pushDataToReview(data, select) {
    let reviewArr = this.data.reviewArr
    reviewArr.push({
      "question_id": data.question_id,
      "title": data.title,
      "answer": data.answer,
      "content": data.content,
      "selected": select,
      "explain":data.explain
    })
    this.setData({
      reviewArr: reviewArr
    })
  }
}, circleProgress))

