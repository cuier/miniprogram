/**
 * 所有与后台api交互的函数处理都写在这里
 */

import { Base } from '../../../utils/base.js'

class Sign extends Base {
    constructor() {
        super()
    }

    //添加金币
    addMoney(cb, num) {
        var allParams = {
            type: 'post',
            url: 'user/addMoney',
            data: {num: num},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }

}

export { Sign }