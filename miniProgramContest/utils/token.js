import *as constants from '../code/constants.js'
import umfLog from '../utils/umfLog.js'

class token {
  constructor() {
    this.verifyUrl = constants.url + 'token/verify'
    this.tokenUrl = constants.url + 'token/user'
  }

  verify() {
    let token = wx.getStorageSync('token')
    if(!token){
      this.getTokenFromServer()
    }else{
      this._verifyFromServer()
    }
  }

  _verifyFromServer(token){
    wx.request({
      url: this.verifyUrl,
      method: 'POST',
      data:{
        token: token
      },
      success:(res)=>{
        let valid = res.data.isValid
        if(!valid){
          this.getTokenFromServer()
        }
      }
    })
  }

  getTokenFromServer(callBack){
    wx.login({
      success:(res)=>{
        umfLog.log(this.tokenUrl)
        wx.request({
          url: this.tokenUrl,
          method: 'POST',
          data: {
            code:res.code
          },
          success:(res)=>{
            umfLog.log(res)
            wx.setStorageSync('token', res.data.token)
            callBack&&callBack(res.data.token)
          },
          fail:(res)=>{
            umfLog.error(res)
          }
        })
      }
    })
  }
}

export {token}