/**
 * 所有与后台api交互的函数处理都写在这里
 */

import { Base } from '../../utils/base.js'

class Articlepage extends Base {
    constructor() {
        super()
    }

    //获取类别列表
    getCategoryList(cb) {
        var allParams = {
            type: 'post',
            url: 'article/getCategoryList',
            data: {},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }

    //获取文章列表页
    getArticleList(cb, category_id){
        var allParams = {
            type: 'post',
            url: 'article/list',
            data: { category_id: category_id},
        };
        this.request(allParams, (res) => {
            // //网络请求返回金币数量和等级
            cb && cb(res.data)
        });
    }
}

export { Articlepage }