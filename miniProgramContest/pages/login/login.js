// pages/login.js
const app = getApp();
import service from '../../http/service.js'
import *as constants from '../../code/constants.js'
import *as umfUtils from '../../utils/umfUtils.js'
import umfLog from '../../utils/umfLog.js'
import *as cardsNumUtils from '../../utils/model/cardsNumUtil.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //记住账号
    // let lastLoginUser = umfUtils.getStorageSync(constants.keys.LAST_LOGIN_USER)
    // lastLoginUser && this.setData({
    //   assistId: lastLoginUser.assistId
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

//网络请求示例
  onSubmit: function(e){
     var ctx = wx.createCanvasContext('myCanvas')
     wx.chooseImage({
       success: (res)=> {
         this.setData({
           src:res.tempFilePaths[0]
         })
         ctx.drawImage(res.tempFilePaths[0],0,0,150,150)
         ctx.draw()
         cardsNumUtils.getIdCardNum('')
       },
     })

    
    // cardsNumUtils.getIdCardNum('/Users/MYFILE/Desktop/idcard.jpg')
  //   let params = {
  //     pageNo: "1",
  //     pageSize: "20",
  //     productId : "0",
  //     type : "0"
  //   }

  //   service.requestNetwork({
  //     doHttpSuccess:(response)=>{
  //       if (constants.retCodes.SUCCESS === response["retCode"]) {
  //        umfLog.log(response)
  //       return true
  //       }
  //       return false
  //     },
  //     doHttpFailure:(response)=>{
  //       umfLog.error(response)
  //     },
  //     doComplete:()=>{
  //       umfLog.log("I have done")
  //     }
  //   }
  //     , params, '/merchantDeploy/merchantList')
  },
  
})