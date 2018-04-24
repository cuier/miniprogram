import CryptoJS from './crypto-js';
import * as ohdaveRsa from './ohdaveRsa';
import RSA from './wxapp_rsa';
import UmfLog from '../umfLog';


var SALT = "65bf32b4befebc9768a988ceadc1b7f5";
var IV = "473680038f894b5cce080e6f431e07ef";       //前后端约定的
var AES_KEY_SIZE = 128;
var ITERATION = 1000;

var cryptoUtils = function(aesKeySize, iterations) {
    this.keySize = aesKeySize / 32;
    this.iterationCount = iterations;
};

cryptoUtils.prototype.getPassPhrase = function(length){
    var str = "",
        range = length,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for(var i=0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

cryptoUtils.prototype.generateKey = function(passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(SALT),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
}

cryptoUtils.prototype.aesEncrypt = function(passPhrase, plainText) {
  var key = this.generateKey(passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(IV) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

cryptoUtils.prototype.aesDecrypt = function(passPhrase, cipherText) {
  var key = this.generateKey(passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(IV) });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

cryptoUtils.prototype.sha1Encrypt = function(msg) {
    let sha1Enc = CryptoJS.SHA1(msg);
    return sha1Enc.toString();
};

/**
 * RSA 解密
 * @param msg 要加密的消息
 * @param publicKey 公钥
 * @returns {*|CipherParams}
 */
/**
 * 注意setMaxDigits要与后台的key size一一对应，这里我们用的是1024位的秘钥
 if (keySize == 128) {
        setMaxDigits(19);
    }
 else if (keySize == 256) {
        setMaxDigits(38);
    }
 else if (keySize == 512) {
        setMaxDigits(76);
    }
 else if (keySize == 1024) {
        setMaxDigits(130);
    }
 else if (keySize == 2048) {
        setMaxDigits(260);
    }
 */
// cryptoUtils.prototype.rsaEncrypt = function(msg, publicKey) {
//     //公钥加密明文
//     ohdaveRsa.setMaxDigits(130);
//     var key = new ohdaveRsa.RSAKeyPair("10001", "10001", publicKey, 1024);
//     return ohdaveRsa.encryptedString(key, msg, "PKCS1Padding");
// };
// cryptoUtils.prototype.rsaDecrypted = function(msg, publicKey) {
//     //公钥加密明文
//     ohdaveRsa.setMaxDigits(130);
//     var key = new ohdaveRsa.RSAKeyPair("10001", "10001", publicKey);
//     return ohdaveRsa.decryptedString(key, msg);
// };

cryptoUtils.prototype.rsaEncrypt = function(msg, publicKey) {
    //TODO 优化库 https://github.com/zhangzhaopds/WeixinApp_RSA_Signature
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey);
    var encStr = encrypt_rsa.encrypt(msg);
    encStr = RSA.hex2b64(encStr);
    // UmfLog.log("明文   ：" + msg);
    // UmfLog.log("加密结果：" + encStr);
    return encStr;
};
cryptoUtils.prototype.rsaDecrypted = function(msg, publicKey) {

};

cryptoUtils = new cryptoUtils(AES_KEY_SIZE, ITERATION);
module.exports = cryptoUtils;
