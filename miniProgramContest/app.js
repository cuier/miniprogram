/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 app.js
 */
import debugUtil from './utils/debugUtil'
import userUtils from './utils/model/userUtil.js'
import umfLog from './utils/umfLog.js'
App({
  onLaunch: function () {
    this.init();
  },

  globalData:{
    systemInfo:{},
    userData:{},
    userCache:{},
  },
    init:function () {
      //初始化调试工具（生产环境不能打开调试工具）
      if(debugUtil.isDebug()){
        debugUtil.initConfig()
      }
      //获取用户数据
      this.globalData.userData = new userUtils.userInfo().get()
      //获取系统信息
      this._getSystemInfo();
    },

    //获取系统信息
    _getSystemInfo(){
      wx.getSystemInfo({
        success: (res)=> {
          umfLog.log("获取系统信息");
          umfLog.log(res);
          this.globalData.systemInfo = res
        },
      })
    },
  globalData: {
    userInfo: null
  }
})