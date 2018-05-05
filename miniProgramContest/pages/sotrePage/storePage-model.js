/**
 * 所有与后台api交互的函数处理都写在这里
 */

import { Base } from '../../utils/base.js'

class Storepage extends Base {
    constructor() {
        super()
    }

    //获取商品列表
    getGoodsList(cb) {
        var allParams = {
            type: 'post',
            url: 'goods/list',
            data: {},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }
}

export { Storepage }