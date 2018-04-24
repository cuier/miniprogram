/**
 * created by cuilijuan on 2018/1/25
 * 初始版本 log封装
 */
import constants from '../code/constants'

export default class umfLog{
    static log(res){
        if(constants.debug){
            console.log(res)
        }
    }

    static error(res){
        if(constants.debug){
            console.error(res)
        }
    }
}
