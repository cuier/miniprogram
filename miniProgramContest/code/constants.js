/**
 * Created by 崔立娟 on 2018/1/24.
 * 初始版本  常量
 */
//引入环境变量的设置
import configCode from './configCode.js'
//打开调试模式，生产需要关闭
const DEBUG = true;

module.exports = Object.assign({
  debug:DEBUG,//是否为调试模式
  onPay:true,//是否启用支付
  //---------------------Interfaces---------------
  interfaces: {
    //------------------模块1--------------------
    //interface1
    FUNC_INTERFACE1: '/../interface1',
    //interface2
    FUNC_INTERFACE2: '/../interface2',
    //------------------模块2--------------------
    //interface3
    FUNC_INTERFACE3: '/../interface3',
    //interface4
    FUNC_INTERFACE4: '/../interface4',
    //------------------模块3--------------------
    //interface5
    FUNC_INTERFACE5: '/../interface5',
    //interface6
    FUNC_INTERFACE6: '/../interface6',
  },
  //--------------------缓存keys---------------------
  STORAGE_FUNC: {
    //key1
    KEY1:"key1",
    //key2
    KEY2:"key2",
    //key3
    KEY3:"key3",
  },
  //---------------------各个文件需要用的常量Keys-------------------
  keys: {
    //用户信息
    USER_INFO: 'userInfo',
    //上次登录的账号
    LAST_LOGIN_USER:'lastLoginUser',
    //通讯公钥
    TX_PUBKEY: 'txPubKey',
    //数据公钥
    DATA_PUBKEY: 'dataPubKey',
    SESSION:'loginSession',
    //key1
    KEY1: "key1",
    //key2
    KEY2: "key2",
    //key3
    KEY3: "key3",
  },
  //---------------------网络返回码------------------
  retCodes: {
    //成功
    SUCCESS: '0000',
    //网络错误
    NETWORK_ERROR: '-1',
    //请求失败
    RESPONSE_ERROR: '400',
    /**
     * desc:CA通讯证书需要更新 String:RETCODE_TXCANEEDUPDATE
     */
    RETCODE_TXCANEEDUPDATE: "00160120"
  },
  //---------------------values--------------------------
  values: {
    //颜色
    THEME_COLOR: "#dd2c32"
  },
  //---------------------正则校验的类型------------------
  regexTypes: {
    //key1
    KEY1: "key1",
    //key2
    KEY2: "key2",
    //key3
    KEY3: "key3",
    INPUT1: "input1",
    INPUT: 'input',
  },
  //---------------------闯关等级------------------
  mamiLevel:[
    { code: 0, title: '实习妈妈' },
    { code: 1, title: '初级妈妈' },
    { code: 2, title: '中级妈妈' },
    { code: 3, title: '称职妈妈' },
    { code: 4, title: '超级妈妈' },
    { code: 5, title: '超人妈妈' },
  ]
    
  

}, configCode);