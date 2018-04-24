/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 生成rpid的工具
 */

/**
 * desc:生成RPID的工具类
 * ------------------------------------------------------------------------------------------------------------

 原数据(长度24位)                                 三十六进制编码（0-9，A-Z）（长度16位）

 分段含义   平台    月日   时分秒毫秒数   终端ID后10位            平台  月日   时分秒毫秒数     终端ID后10位

 分段长度         1  4       9           10            1    2      6             7

 演示数据        A 1231   235959999  9999999999 ==>    A   Y7    3WHFWF       4LDQPDR

 注：所有位数为固定，不足的前补0。
 ------------------------------------------------------------------------------------------------------------
 *
 * @version V1.0
 */

import * as umfUtils from './umfUtils.js'

class rpidUtils {
  /**
      * 获取终端Id
      * @returns {string}
      */

  getRpid() {
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,//月份
        "d+": this.getDate(),//日
        "h+": this.getHours(),//小时
        "m+": this.getMinutes(),//分
        "s+": this.getSeconds(),//秒
        "q+": Math.floor((this.getMonth() + 3) / 3),//季度
        "S": this.getMilliseconds() //毫秒
      }

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1 ? (o[k]) : (("00") + o[k]).substr(("" + o[k]).length)))
        }
      }
      return fmt
    }
    let currentTime = new Date()
    let mr = parseInt(currentTime.Format("MMdd")).toString(36)
    let sfm = parseInt(currentTime.Format("hhmmssSSS")).toString(36)

    return 'A' + mr + sfm 

  }
  getTerminalid() {
  let array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let rd4 = umfUtils.getRandom(array, 4);
  return "ZZZ" + rd4;
}
}



rpidUtils = new rpidUtils()
module.exports = rpidUtils

