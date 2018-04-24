/**
 * created by cuilijuan on 2018/3/16
 * 初始版本  所有对话框（包括toast提示）
 */


import *as constants from '../code/constants.js'

export function showUmfModal(message, callBack, showCancel = false) {
  wx.showModal({
    title: '提示',
    content: message,
    showCancel: showCancel,
    cancelColor: '#000',
    confirmColor: constants.values.THEME_COLOR,
    success: (res) => {
      if (res.confirm) {
        callBack && callBack()
      }
    }
  })
}

export function showAll(message, cancelText, okText, okCB, cancelCB, outTapCB) {
  wx.showModal({
    title: '提示',
    content: message,
    showCancel: true,
    cancelText: cancelText,
    cancelColor: '#000',

    confirmColor: constants.values.THEME_COLOR,
    success: (res) => {
      if (res.confirm) {
        okCB && okCB()
      } else if (res.cancel) {
        cancelCB && cancelCB()
      } else {
        outTapCB && outTapCB()
      }
    }
  })
}


export function showUmfToast(message, mask) {
  wx.showToast({
    title: message,
    icon: 'success',
    mask: mask ? mask : false,
    duration: 2000
  })
}