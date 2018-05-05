import *as constants from '../code/constants.js'
import umfLog from '../utils/umfLog.js'

class Token {
  constructor() {
    this.verifyUrl = constants.url + 'Token/verifyToken'
    this.tokenUrl = constants.url + 'Token/getToken'
  }

  verify() {
    let token = wx.getStorageSync('token')
    if (!token) {
      this.getTokenFromServer()
    } else {
      this._verifyFromServer()
    }
  }

  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            code: res.code,
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data.token);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
}

export {Token}