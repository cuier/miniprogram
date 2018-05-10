// pages/quizePage/quizeResult/quizeResult.js
import *as utils from '../../../utils/umfUtils.js'
import { Quize } from './quizeResult-model.js'
var quize = new Quize()
var app = getApp()
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
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      // isSuccess: 1,
      screenWidth: app.globalData.systemInfo.screenWidth,
      isSuccess: options.isSuccess,
      levelid: parseInt(options.levelid),
      // reviewArr: options.reviewArr?JSON.parse(options.reviewArr):[],
      topicid: options.topicid,
      gender: userInfo ? userInfo.gender : 2
    })
    if (options.isSuccess == 1) {
      this.preDrawImage()
      this.setData({
        levelid: parseInt(options.levelid) + 1,
        levelName: getLevelName(this.data.levelid + 1, options.topicid)
      })
      quize.addMoney(1000)
      quize.postNewLevel(this.data.topicid, this.data.levelid)
    }
    wx.setNavigationBarTitle({
      title: getLevelName(this.data.levelid, options.topicid),
    })
  },

  goonChuanguan: function () {
    let contentArr = []
    let topiclist = wx.getStorageSync('topiclist')
    for (let item in topiclist) {
      if (this.data.topicid == topiclist[item].topicid) {
        contentArr = topiclist[item].level
      }
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      curlevelid: this.data.levelid,
    })
    wx.navigateBack({
      delta: 1
    })
  },

  gotoChuanguan: function () {
    wx.redirectTo({
      url: '../index/index?topicid=' + this.data.topicid + '&levelid=' + this.data.levelid,
    })
  },
  gotoReview: function () {
    wx.redirectTo({
      url: '../reviewQuize/reviewQuize',
    })
  },

  saveImageToPhotosAlbum: function () {
    wx.showToast({
      title: '绘制中，请稍后',
      icon: 'loading',
      duration: 4000,
    })
    setTimeout(() => {
    this.drawImage(1)
    }, 5000)
  },

  drawImage(times) {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 1200,
      destWidth: 750,
      destHeight: 1200,
      canvasId: 'shareImg',
      success: (res) => {
        console.log(res.tempFilePath);
        if (times == 1) {
          this.save(res.tempFilePath)
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  save: function (prurl) {
    wx.saveImageToPhotosAlbum({
      filePath: prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      }
    })
  },
  preDrawImage: function () {
    let imgSrc = this.data.gender == 2 ? 'https://fanqietotop.cn/images/share_girl.png' : ' https://fanqietotop.cn/images/share_man.png'
    const ctx = wx.createCanvasContext('shareImg')
    let promise1 = new Promise(function (resolve, reject) {
      /* 获得要在画布上绘制的图片 */
      wx.getImageInfo({
        src: imgSrc,
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    /* 图片获取成功才执行后续代码 */
    Promise.all(
      [promise1,]
    ).then(res => {
      console.log(res)
      /* 创建 canvas 画布 */
      const ctx = wx.createCanvasContext('shareImg')

      /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
      ctx.drawImage(res[0].path, 0, 0, 750, 1200)

      /* 绘制文字 位置自己计算 参数自己看文档 */
      ctx.setTextAlign('center')                        //  位置
      ctx.setFillStyle('#ffffff')                       //  颜色
      ctx.setFontSize(70)  //  字号
      ctx.fillText('恭喜晋升', 750 / 2, 300)         //内容不会自己换行 需手动换行
      ctx.setFillStyle('red')
      ctx.fillText(this.data.levelName, 750 / 2, 380)         //  内容
      /* 绘制 */
      ctx.stroke()
      ctx.draw()

      setTimeout(() => {
        this.drawImage(0)
      }, 3000)
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    utils.shareApp()
  },
})

function getLevelName(levelid, topicid) {
  let topiclist = wx.getStorageSync('topiclist')
  for (let item in topiclist) {
    if (topicid == topiclist[item].topicid) {
      let level = topiclist[item].level
      for (let it of level) {
        if (levelid == it.levelid)
          return it.name
      }
    }
  }
}
