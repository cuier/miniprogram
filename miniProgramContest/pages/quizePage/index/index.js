/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 首页
 */
import debugUtil from '../../../utils/debugUtil'
import *as sensorUtil from '../../../utils/sensorUtil'
import *as constants from '../../../code/constants.js'
import circleProgress from '../../../commonView/circleProgress/circleProgress.js'
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
Page(Object.assign({
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
    onLoad: function () {
      this.setData({
        width: app.globalData.systemInfo.screenWidth
      })
    },

    onReady:function(){
      /*倒计时*/
      // 获得circle组件
      // this.circle = this.selectComponent("#circle");
      // 绘制背景圆环
      circleProgress.drawCircleBg( 45, 10)
      // 绘制彩色圆环
      this.stepInterval()
      
    },
    _runEvent() {
      console.log(1111)
    },

  submitExample:function(e){
    
    },

},circleProgress))
