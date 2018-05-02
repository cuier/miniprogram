const circleProgress = {
  drawCircleBg ( x, w) {
    // 设置圆环外面盒子大小 宽高都等于圆环直径
    // this.setData({
    //   size: 2 * x   // 更新属性和数据的方法与更新页面数据的方法类似
    // });
    // 使用 wx.createContext 获取绘图上下文 ctx  绘制背景圆环
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(8);
    ctx.setStrokeStyle('white');
    ctx.setLineCap('round')
    ctx.beginPath();//开始一个新的路径
    //设置一个原点(x,y)，半径为r的圆的路径到当前路径 此处x=y=r
    ctx.arc(x, x, x - w, 0, 2 * Math.PI, false);
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function ( x, w, step) {
    // 使用 wx.createContext 获取绘图上下文 context  绘制彩色进度条圆环
    var context = wx.createCanvasContext('canvasProgress');
    context.setLineWidth(6);
    context.setStrokeStyle('red');
    context.setLineCap('butt')
    context.beginPath();//开始一个新的路径
    // step 从0到2为一周
    context.arc(x, x, x - w, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();//对当前路径进行描边
    context.setFontSize(25);
    context.setFillStyle('red')
    context.fillText(this.data.time, x+1-w, x+w);
    context.draw()
  },

  stepInterval: function () {
    // if (!this.data.stopInterval){
      // 设置倒计时 定时器
      var n = this.data.num / 2
      
      this.stepTimer = setInterval(() => {
        if (this.data.num >= 0) {
          this.data.step = this.data.num / n;
          if (!this.data.stopInterval) {
            if ((/(^[1-9]\d*$)/.test(this.data.num / 10))) {
              // 当时间为整数秒的时候 改变时间
              this.setData({
                time: this.data.num / 10,
                className: 'weui-animate-fade-in'
              });
            }
            this.data.num--;
          }
        } else{
          this.setData({
            time: 0,
          });
          if ( !this.data.stopInterval){
            this.dealWrong()
          }
         
        }
        // 绘制彩色圆环进度条
        if (!this.data.stopInterval){
          this.drawCircle(35, 10, this.data.step)
        }
        
      }, 100)
   
    
  },
}

export default circleProgress