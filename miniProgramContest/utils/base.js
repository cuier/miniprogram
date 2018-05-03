
import *as constants from '../code/constants.js'
import { token } from 'token.js'

class Base {
  constructor() {
    "use strict";
    this.baseRestUrl = constants.url;
    this.onPay = constants.onPay;
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, cb, noRefetch=false) {
    // var that = this,
      url = this.baseRestUrl + params.url;
    // if (!params.type) {
    //   params.type = 'get';
    // }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    wx.request({
      url: url,
      data: params.data,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success:(res) =>{
        // console.log(res)
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          cb && cb(res.data);
        } else {
          if (code == '401') {
            if (!noRefetch) {
              this._refetch(params);
            }
          }
          this._processError(res);
          // params.eCallback && params.eCallback(res.data);
        }
      },
      fail: (err)=> {
        // wx.hideNavigationBarLoading();
        that._processError(err);
        cb && cb(err);
      }
    });
  }

  _processError(err) {
    console.log(err);
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

};
// var base = new Base
export { Base };
// module.export = base
