import { Base } from '../../../utils/base.js'

class Quize extends Base {
  constructor() {
    super()
  }

  //更新等级
  postNewLevel(topicid,levelid,cb){
    let params={
      type:'post',
      url:'/user/updateUserLevel',
      data:{topicid:topicid,levelid:levelid}
    }
    this.request(params, (res) => {
      cb && cb(res.data)
    });
  }
  //更新金币
  addMoney(num,cb){
    let params = {
      type: 'post',
      url: '/user/addMoney',
      data: { num:num }
    }
    this.request(params, (res) => {
      cb && cb(res.data)
    });
  }
}

export { Quize }