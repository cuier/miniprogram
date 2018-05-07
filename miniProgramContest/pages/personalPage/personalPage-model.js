/**
 * 所有与后台api交互的函数处理都写在这里
 */

import { Base } from '../../utils/base.js'

class Personalpage extends Base {
    constructor() {
        super()
    }

    //获取收藏行为数据
    getCount(cb) {
        var allParams = {
            type: 'post',
            url: 'action/getCount',
            data: {},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }

    //获取金币数
    getMoney(cb) {
        var allParams = {
            type: 'post',
            url: 'user/getUserMoney',
            data: {},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }

    //用户信息
    getInfoList(cb, gender) {
        var allParams = {
            type: 'post',
            url: 'user/getInfoList',
            data: {gender: gender},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }

}

export { Personalpage }