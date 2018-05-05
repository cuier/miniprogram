
import *as constants from '../code/constants.js'
import { Token } from 'token.js'

class Base {
  constructor() {
    "use strict";
    this.baseRestUrl = constants.url;
    this.onPay = constants.onPay;
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, cb,noRefetch = false) {
    var that = this;
    var url = "https://fanqietotop.cn/api/" + params.url;
    // if (!params.type) {
    //   params.type = 'get';
    // }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    var header;
    if (params.type == 'post') {
      header = {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': wx.getStorageSync('token')
      };
    } else {
      header = {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      };
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: header,
      success: function (res) {

        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        // var code = res.statusCode.toString();
        // var startChar = code.charAt(0);
        var code = res.data.code
        if (code == '200') {
          cb && cb(res.data);
        } else {
          // 1001 => '获取session_key及openID时异常，微信内部错误',
          // 1002 => 'Token已过期或无效Token',
          // 1003 => '尝试获取的Token变量并不存在',
          // 1004 => '权限不够',
          if (code != '200') {
            console.log(noRefetch);
            if (!noRefetch) {
              that._refetch(params,cb);
            }
          }
          that._processError(res);
          // params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        //wx.hideNavigationBarLoading();
        that._processError(err);
        // params.eCallback && params.eCallback(err);
      }
    });
  }

  _processError(err) {
    console.log(err);
    // wx.showModal({
    //   title: 提示,
    //   content: err.retMsg,
    // })
  }

  _refetch(param,cb) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param,cb, true);
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
