import { Articlepage } from './articlePage-model.js'
var articlepage = new Articlepage()
import *as utils from '../../utils/umfUtils.js'

const $swipertab = [
    { name: '精选', index: 0, isCurr: true, },
    { name: '宝宝', index: 1, isCurr: false, },
    { name: '瘦身', index: 2, isCurr: false, },
    { name: '恋爱', index: 3, isCurr: false, },];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // swipertab: $swipertab,
        // articleArr: articleArr,
        currentTab: 0, //默认从第一个开始
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        articlepage.getCategoryList((res) => {
            that.setData({
                swipertab: res
            });
        });

        let id = 1;
        articlepage.getArticleList((res) => {
            that.setData({
                articleArr: res
            });
        }, id);
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
      utils.shareApp()
    },

    /**
     * 顶部TAB切换
     */
    tabClick: function (e) {
        let current = e.currentTarget.dataset.current
        let id = e.currentTarget.dataset.id;
        articlepage.getArticleList((res) => {
          this.setData({
            articleArr: res
          });
        }, id);
        if (this.data.currentTab == current) {
            return false;
        } else {
            this.setData({
                currentTab: current,
            })
        }
        
    },

    onPostTap: function(e){
        var that = this;
        
    },

    gotoDetail: function (e) {
        var content = e.currentTarget.dataset.content;
        var tag = e.currentTarget.dataset.tag;
        var read = e.currentTarget.dataset.read;
        var title = e.currentTarget.dataset.title;
        var pic = e.currentTarget.dataset.pic;
        let articleid = e.currentTarget.dataset.articleid
        wx.navigateTo({
          url: './articleDetail/articleDetail?content=' + content + "&tag=" + tag + "&read=" + read + "&title=" + title + "&pic=" + pic + "&article_id=" + articleid
        })
    }
})