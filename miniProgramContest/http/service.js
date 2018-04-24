/**
 * created by cuilijuan on 2018/1/25
 * 网络管理类
 */
import * as networkUtil from './netWorkUtil.js'
// import *as constants from '../code/constants.js'

export default class service{
  static requestNetwork(httpCallback,httpParams,interfaceName,loading=true){
    networkUtil.buildRequest(interfaceName,httpParams,httpCallback,loading).send()
  }
}