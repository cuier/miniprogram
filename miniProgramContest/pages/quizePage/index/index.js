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

},
{
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

},
{
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
    num: 100,
    step: null,
    time: null,
    stepTimer: null,
    rightNum:0,
    // wrongNum:0
  },
  btnOpClick: function (e) {
    var select = e.currentTarget.id;
    var jieg = this.data.postList[this.data.idx].daan;
    this.setData({
      select:select,
      isResult: true,
      stopInterval:true,
      rightNum: select==jieg?(this.data.rightNum + 1):this.data.rightNum,
      // wrongNum: select != jieg ? (this.data.wrongNum + 1) : this.data.wrongNum,
    })
    if (this.data.idx-this.data.rightNum>2){
      wx.showModal({
        title: 'sorry',
        content: '真遗憾，闯关失败，再接再厉',
      })
    }
    if (this.data.idx < this.data.postList.length - 1) {
        setTimeout(()=>{
          this.setData({
            num: 100,
            idx: this.data.idx + 1,
            className: 'weui-animate-fade-out',
            isResult:false,
            stopInterval:false
          })
        },2000)
    }else{
      wx.showModal({
        title: '恭喜',
        content: '恭喜闯关成功',
      })
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
      circleProgress.drawCircleBg( 35, 10)
      // 绘制彩色圆环
      this.stepInterval()
      
    },

    quizeFail:function(){

    },

    quizeSuccess:function(){},
},circleProgress))
