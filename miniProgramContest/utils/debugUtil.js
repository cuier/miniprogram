/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 调试工具
 */

import * as constants from '../code/constants'
import umfLog from './umfLog'
 
class debugUtil{

    //判断是否是调试模式
    isDebug(){
        return constants.debug;
    }

    //初始化加载配置信息
    initConfig(){
        umfLog.error("[DEBUG]初始化调试工具")
        umfLog.error("[DEBUG]警告：生产环境请关闭调试环境")
        //初始化环境
        this._setEnv()
    }

    //设置环境
    _setEnv(){
        let value = JSON.parse(wx.getStorageSync('dubug')||"{}")
        if(value.env){
            umfLog.error("[DEBUG]设置环境信息："+value.env)
            constants._setEnv(value.env)
        }
    }
}

let debugUtils = new debugUtil()
module.exports = debugUtils