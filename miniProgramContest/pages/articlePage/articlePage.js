
// pages/articlePage/articlePage.js


const $swipertab = [
  { name: '精选', index: 0, isCurr: true,  },
  { name: '宝宝', index: 1, isCurr: false, },
  { name: '瘦身', index: 2, isCurr: false, },
  { name: '恋爱', index: 3, isCurr: false, },];
  const articleArr = [
    {imgUrl:'/icons/article.png',title:'1岁宝宝不能吃什么？',flag:'1',readNum:'800'},
    { imgUrl: '/icons/article.png', title: '1岁宝宝不能吃什么？', flag: '1', readNum: '800' },
    { imgUrl: '/icons/article.png', title: '1岁宝宝不能吃什么？', flag: '1', readNum: '800' },
    { imgUrl: '/icons/article.png', title: '1岁宝宝不能吃什么？', flag: '1', readNum: '800' },
    { imgUrl: '/icons/article.png', title: '1岁宝宝不能吃什么？', flag: '1', readNum: '800' },
  ]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipertab: $swipertab,
    articleArr: articleArr,
    currentTab: 0, //默认从第一个开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 顶部TAB切换
   */
  tabClick: function(e) {
    let current = e.currentTarget.dataset.current
    if (this.data.currentTab == current) {
      return false;
    } else {
      this.setData({
        currentTab: current
      })
    }
  },

  gotoDetail:function(e){

    let id = e.currentTarget.id
    wx.navigateTo({
      url: './articleDetail/articleDetail',
    })
  }
})