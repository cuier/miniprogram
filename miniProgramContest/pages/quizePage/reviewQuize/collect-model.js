
import { Base } from '../../../utils/base.js'

class Collect extends Base {
  constructor() {
    super()
  }

  //收藏文章或者题目
  collect(targetid, type, status,cb) {
    var allParams = {
      url: '/action/add',
      type: 'post',
      data: { status: status?1:0, targetid:targetid, type:type,},
    };
    this.request(allParams, (res) => {
      cb && cb(res.data)
    });
  }
}
// targetid：目标id， 比如题目的id或者文章的id
// type: 收藏的类型， 1表示题目，2表示文章
// status: 1表示收藏， 0，表示取消收藏
export { Collect }