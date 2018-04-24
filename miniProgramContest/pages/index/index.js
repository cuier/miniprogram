/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 首页
 */
import debugUtil from '../../utils/debugUtil'
import *as sensorUtil from '../../utils/sensorUtil'
import *as constants from '../../code/constants.js'
var local_database = [{
  "name": "‘收取关山五十州’上句是什么？",
  "daan": "0",
  "content": ["男儿何不带吴钩", "天若有情天亦老", "大漠沙如雪", "主父西游何时归"]
},
{
  "name": "危乎高哉上句是什么？",
  "daan": "1",
  "content": ["明朝散发弄扁舟", "蜀道难，难于上青天", "床前明月光", "吾爱孟夫子"]
},
{
  "name": "感时花溅泪下句是什么？",
  "daan": "2",
  "content": ["也无风雨也无晴", "明月几时有", "恨别鸟惊心", "老夫聊发少年狂"]

}
]
//获取应用实例
const app = getApp()
Page({
  data: {
    postList: local_database,
    idx: 0,
    bc_default: '#FBFBFB',
    bc_right: '#98FB98',
    bc_wrong: '#FF99B4',
    bc0: '',
    ny: 'true',
    defen: 0,

    num: 100,
    step: null,
    time: null,
    stepTimer: null,
    count: 0,//计数器，初始值为0
    maxCount: 60, // 绘制一个圆环所需的步骤 
    countTimer: null,//定时器，初始值为null
  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    var jieg = this.data.postList[that.data.idx].daan;
    if (select == jieg) {
      if (that.data.index < this.data.postList.length - 1) {
        if (select == '0') {
          this.setData({ bc0: that.data.bc_right });
        }
        else if (select == '1') {
          this.setData({ bc1: that.data.bc_right });
        }
        else if (select == '2') {
          this.setData({ bc2: that.data.bc_right });
        }
        else if (select == '3') {
          this.setData({ bc3: that.data.bc_right });
        }
        that.nextQuestion();
        this.setData({
          defen: that.data.index * 2
        })
      }
      else {
        if (select == '0') {
          this.setData({ bc0: that.data.bc_right });
        }
        else if (select == '1') {
          this.setData({ bc1: that.data.bc_right });
        }
        else if (select == '2') {
          this.setData({ bc2: that.data.bc_right });
        }
        else if (select == '3') {
          this.setData({ bc3: that.data.bc_right });
        }
        // that.gotonext();
      }
    }
    else {
      if (select == '0') {
        this.setData({ 
          bc0: that.data.bc_wrong 
          });
      }
      else if (select == '1') {
        this.setData({ bc1: that.data.bc_wrong });
      }
      else if (select == '2') {
        this.setData({ bc2: that.data.bc_wrong });
      }
      else if (select == '3') {
        this.setData({ bc4: that.data.bc_wrong });
      }
      else if (select == 'E') {
        this.setData({ bcE: that.data.bc_wrong });
      }
    }
  },
    onShow:function (options) {
      //调试代码，打开摇一摇进入调试页面
        if(debugUtil.isDebug()){
          wx.onAccelerometerChange(res=>{
           sensorUtil.shake(res,()=>{
             wx.navigateTo({
               url: '../debug/test'
             })
           })
          })
        }
    },
    stepInterval: function () {
      // 设置倒计时 定时器
      var n = this.data.num / 2
      this.stepTimer = setInterval(() => {
        if (this.data.num >= 0) {
          this.data.step = this.data.num / n;
          // 绘制彩色圆环进度条
          this.circle.drawCircle('circle_draw', 40, 4, this.data.step)
          if ((/(^[1-9]\d*$)/.test(this.data.num / 10))) {
            // 当时间为整数秒的时候 改变时间
            this.setData({
              time: this.data.num / 10
            });
          }
          this.data.num--;
        } else {
          this.setData({
            time: 0
          });
        }
      }, 100)
    },
    changeTime: function () {
      // 先清除定时器
      clearInterval(this.stepTimer);
      // 计数器 还原到100
      this.setData({
        num: 100
      });
      // 重新开启倒计时
      this.stepInterval()
      // 触发自定义组件事件
      this._runEvent()
    },
    onLoad: function () {
      this.setData({
        width: app.globalData.systemInfo.screenWidth
      })
    },

    onReady:function(){
      /*倒计时*/
      // 获得circle组件
      this.circle = this.selectComponent("#circle");
      // 绘制背景圆环
      this.circle.drawCircleBg('circle_bg', 40, 4)
      // 绘制彩色圆环
      this.stepInterval()
      
    },
    _runEvent() {
      console.log(1111)
    },

  submitExample:function(e){
    
    },

})
