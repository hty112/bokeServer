import CryptoJS from 'crypto-js'

export default{
    //解密
    Decrypt(word) {
        const key = CryptoJS.enc.Utf8.parse("abcd1234abcd1234");
        const iv = CryptoJS.enc.Utf8.parse('ABCD1234ABCD1234');
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },
    //加密
    Encrypt(word) {
        const key = CryptoJS.enc.Utf8.parse("abcd1234abcd1234");
        const iv = CryptoJS.enc.Utf8.parse('ABCD1234ABCD1234');
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }
}