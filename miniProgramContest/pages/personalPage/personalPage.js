import { Personalpage } from './personalPage-model.js'
var personalpage = new Personalpage()

const sysWidth = wx.getSystemInfoSync().windowWidth
const sysHight = wx.getSystemInfoSync().windowHeight

Page({
    data: {
        personalBgWidth: sysWidth - 30, //个人信息背景宽
        personalBgHeight: (sysWidth - 30) / 353 * 203,  //个人信息背景高
        themeBgWidth: sysWidth - 30,  //主题宽
        themeBgHieght: 80 / 350 * (sysWidth - 30), //主题高
        isSign: false, //是否签到
        isLogin: false, //是否登录
        article_count: 0,
        question_count: 0,
        money: 0,
        topiclist: [],
        user_topic_list: [],
        remind_topic: [], 
        topic_level_arr: []
    },

    /**
     * 页面加载时
     */
    onLoad: function (options) {
        this.setData({
            userInfo: JSON.parse(options.userInfo)
        });

        var that = this;
        personalpage.getCount((res) => {
            var question_count = res.question_count;
            var article_count = res.article_count;
            that.setData({
                question_count: question_count,
                article_count: article_count,
            });
        });

        var userInfo = wx.getStorageSync('userInfo');
        var gender = userInfo.gender - 1;
        personalpage.getInfoList((res) => {
            that.setData({
                topiclist: res.topiclist,
                user_topic_list: res.user_topic_list,
                remind_topic: res.remind_topic,
                topic_level_arr: res.topic_level_arr
            });
        }, gender);
        console.log(userInfo);

    },

    /**
     * 页面显示时
     */
    onShow: function () {
        let that = this;
        personalpage.getMoney((res) => {
            console.log(res);
            var money = res.money;
            that.setData({
                money: money,
            });
        });

        wx.authorize({
            scope: 'scope.userInfo',
            success() {
                that.setData({ isLogin: true })
                wx.getUserInfo({
                    success: function (res) {
                        that.setData({
                            userInfo: {
                                nickName: res.userInfo.nickName,
                                avatarUrl: res.userInfo.avatarUrl
                            }
                        })
                    }
                })
                var signTime = wx.getStorageSync("signTime");
                if (signTime == "") {  //为空，则显示签到
                    that.setData({
                        isSign: true
                    })
                } else {
                    //当前日期
                    const date = new Date();
                    const cur_year = date.getFullYear();
                    const cur_month = date.getMonth() + 1;
                    const cur_day = date.getDate();
                    var date_str = cur_year + '-' + (cur_month < 10 ? '0' + cur_month : cur_month) + '-' + (cur_day < 10 ? '0' + cur_day : cur_day);
                    if (signTime == date_str) {  //日期相等，则显示已签到
                        that.setData({
                            isSign: false
                        })
                    } else {
                        that.setData({
                            isSign: true
                        })
                    }
                }
            },
            fail() {
                wx.showModal({
                    title: '授权提示',
                    content: '您未授权登录小程序，将无法使用部分功能，请点击确定按钮重新授权登录',
                    success: function (res) {
                        if (res.confirm) {
                            wx.openSetting({});
                        }
                    }
                })
            }
        })
    },



    /**
     * 签到
     */
    sign: function () {
        wx.navigateTo({
            url: '../personalPage/sign/sign',
        })
    },

    gotoQuiz: function (e) {
        var topicid = e.currentTarget.dataset.topicid;
        var curlevelid = e.currentTarget.dataset.levelid;

        //需要主题id, 用户当前的levelid, 和这个主题下的level列表
        wx.navigateTo({
            url: '/pages/quizePage/quizePage?contentArr=' + JSON.stringify(this.data.topic_level_arr[topicid]) + '&currlevelid=' + curlevelid + '&topicid=' + topicid,
        })
    },

    /**
     * 登录
     */
    onLogin: function () {
        this.onShow()
    }

})