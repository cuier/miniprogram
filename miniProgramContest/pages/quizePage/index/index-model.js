// Question / list

import { Base } from '../../../utils/base.js'

class Index extends Base {
  constructor(){
    super()
  }

  //获取题目
  requestPostList(topicid, levelid,cb) {
    var allParams = {
      url: '/Question/list',
      data: { topicid: topicid, levelid: levelid },
    };
    this.request(allParams, (res) => {
      cb && cb(res.data)
    });
  }
}

export {Index}