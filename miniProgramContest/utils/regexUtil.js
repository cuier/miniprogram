/**
 * created by cuilijuan on 2018/3/16
 * 初始版本 正则校验工具
 */

import *as umfDialog from './umfDialog.js'
import _regexTypes from '../code/regexTypes.js'

/**
 * 正则组
 var s1 = [mobileId, UmpValues.regMobile];
 var s2 = [this.state.loginPwd, UmpValues.regLoginPwd];
 if (!RegexUtils.regexTypes(s1, s2)) {
            return;
     }
 * @param values
 * @returns {boolean}
 */
function regexTypes(...values) {
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (!regexType(value[0], value[1], value.length === 3 ? value[3] : true)) {
      return false;
    }
  }
  return true;
}

/**
 * 正则
 *
 if (!RegexUtils.regexType(mobileId, UmpValues.regMobile)) {
            return;
     }
 *
 * @param value         内容
 * @param regexTypes    正则表达式
 * @param isTip         是否提示
 */
function regexType(value, regexType, isTip) {
  var regexModel = _getRegexType(regexType);

  if (regexModel.regexGroup) {
    for (var regex of regexModel.regexGroup) {
      if (!_regexType(value, regex, isTip)) {
        return false;
      }
    }
  } else if (regexModel.regex) {
    return _regexType(value, regexModel, isTip);
  }
  return true;
}

function regexTypeWithMsg(value, regexType) {
  var regexModel = _getRegexType(regexType);

  if (regexModel.regexGroup) {
    for (var regex of regexModel.regexGroup) {
      if (!_regexType(value, regex, false)) {
        return regex.message;
      }
    }
  } else if (regexModel.regex) {
    if (!_regexType(value, regexModel, false)) {
      return regexModel.message;
    }
  }
  return "";
}

function regexTypesWithMsg(arr) {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    let message = regexTypeWithMsg(value[0], value[1]);
    if (message) {
      return message;
    }
  }
}

function _regexType(value, regexModel, isTip) {
  //全部提交去前后空格 trim
  // value = StringUtils.safeTrim(value);
  if (new RegExp(regexModel.regex).test(value)) {
    //正则通过
    return true;
  }
  var isTip = (typeof isTip === 'undefined') ? true : isTip;
  if (isTip) {
    var msg = regexModel.message;
    UmpToast.showToast(msg);
  }
  return false;
}

function _getRegexType(regexType) {
  for (var i = 0; i < _regexTypes.length; i++) {
    var reg = _regexTypes[i];
    if (reg.regexType == regexType) {
      return reg;
    }
  }
  return null;
}

module.exports = {
  regexType: regexType,
  regexTypes: regexTypes,
  regexTypeWithMsg: regexTypeWithMsg,
  regexTypesWithMsg: regexTypesWithMsg
};
