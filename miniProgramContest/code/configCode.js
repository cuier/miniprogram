/**
 * Created by 崔立娟 on 2018/1/29.
 * 初始版本  环境常量
 */
//设置环境 ,生产需要设置为 3
// 0:develep 1:test 2:uat 3 release
let _ENV = 0;

const urls = [
  //开发地址
  { name: '开发环境', value: "0", url: "https://fanqietotop.cn/Api/" ,},
  //测试地址
  { name: '测试环境', value: "1", url: "http://10.10.178.107:8080/umfWeChatPlat", },
  //UAT地址
  { name: 'UAT环境', value: "2", url: "https://xydev.umfintech.com/umfWeChatPlat/",},
  //发布地址
  { name: '生产环境', value: "3", url: "https://fanqietotop.cn/" },
]
function url() {
  if (_ENV == urls.length - 1) {
    let customUrl = wx.getStorageSync('customUrl')
    return customUrl
  }
  return urls[_ENV].url
}
const configCode= {
  urls:urls,
  url:url(),
  //通讯证书公钥
  TX_PUBKEY: "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYyfEHrBtCvXkl31lGFGq7xFovIdp5fWFJJJfejzILxvvlfAM42X+lOhDKUHmcxEEZn8nExck7zAQeSSm93P79IgBFcnDpKtNNghL8idZOe77RpXFYrFTu74SLqMBGRK7f6NOGb4VbMOnX1rxTL6cqdVxc5E58CX77ICOePjTeUwIDAQAB-----END PUBLIC KEY-----",
  //RSA敏感数据加密公钥
  DATA_PUBKEY: "----- BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDuMVJRnyjV64ookN / Z + Q1dZF8a9FV0v + yNkkv5btWw3RFK + mdPoidzIs2zXGf1FWjtFlYqqUkYWEKdqOdGbUEZZmD4HipJcub9JoTi2O7CFYk2NufDdU + 0Z5GQE6Uw5pQgElzmV1LTQqDClD2eVzoGHmXQxOx+ jpDHfsNDkTnJJQIDAQAB-----END PUBLIC KEY-----",
  
  setEnv(env) {
    _ENV = env
  },

  getEnv() {
    return _ENV
  },
}

export default configCode
