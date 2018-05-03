// import network from '../../http/newNetwork.js'
import { Base } from '../../utils/base.js'
var base = new Base()
const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    personalBgWidth: sysWidth - 30, //个人信息背景宽
    personalBgHeight: (sysWidth - 30) / 353 * 203,  //个人信息背景高
    themeBgWidth: sysWidth - 30,  //主题宽
    themeBgHieght: 80 / 350 * (sysWidth - 30), //主题高
  },

  onLoad:function(options){
    this.setData({
      userInfo: JSON.parse(options.userInfo) 
    })
  }

})