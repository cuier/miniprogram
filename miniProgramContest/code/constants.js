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
    FUNC_USERINFO:'',//通过code和用户信息获取金币，等级和主题level
    
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
  healthLevel:[
    { code: 1, title: '健康小白', locked: 0 },
    { code: 2, title: '健康学通', locked: 1},
    { code: 3, title: '健康达人', locked: 1},
    { code: 4, title: '健康大咖', locked: 1},
    { code: 5, title: '健康专家', locked: 1},
    { code: 6, title: '健康大神', locked: 1},
  ],
  mamiLevel: [
    { code: 1, title: '实习妈妈', locked: 0 },
    { code: 2, title: '初级妈妈', locked: 1 },
    { code: 3, title: '中级妈妈', locked: 1 },
    { code: 4, title: '称职妈妈', locked: 1 },
    { code: 5, title: '超级妈妈', locked: 1 },
    { code: 6, title: '超人妈妈', locked: 1 },
  ],
  slimLevel: [
    { code: 1, title: '瘦身新手', locked: 0 },
    { code: 2, title: '瘦身熟手', locked: 1 },
    { code: 3, title: '瘦身达人', locked: 1 },
    { code: 4, title: '瘦身专家', locked: 1 },
    { code: 5, title: '瘦身大师', locked: 1 },
    { code: 6, title: '瘦身王者', locked: 1 },
  ],
  dadLevel: [
    { code: 1, title: '实习爸爸', locked: 0 },
    { code: 2, title: '初级爸爸', locked: 1 },
    { code: 3, title: '中级爸爸', locked: 1 },
    { code: 4, title: '称职爸爸', locked: 1 },
    { code: 5, title: '超级爸爸', locked: 1 },
    { code: 6, title: '超人爸爸', locked: 1 },
  ],
  chihuoLevel: [
    { code: 1, title: '学渣型吃货', locked: 0 },
    { code: 2, title: '学霸型吃货', locked: 1 },
    { code: 3, title: '导师型吃货', locked: 1 },
    { code: 4, title: '砖家型吃货', locked: 1 },
    { code: 5, title: '叫兽型吃货', locked: 1 },
    { code: 6, title: '院长型吃货', locked: 1 },
  ],
  //---------------------本局回顾等级------------------
  classArr: [
    { id: 1, result: 1},//true标识答对了
    { id: 2, result: 1 },
    { id: 3, result: 1 },
    { id: 4, result: 1 },
    { id: 5, result: 1 },
    { id: 6, result: 0 },
    { id: 7, result: 0 },
    { id: 8, result: 0 },
    { id: 9, result: 0 },
    { id: 10, result: 0 },
  ],

}, configCode);