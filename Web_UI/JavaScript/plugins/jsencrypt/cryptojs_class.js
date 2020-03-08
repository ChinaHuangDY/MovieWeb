var CryptoData_Class =new function () {

    //加密匙
    var mKey ='';
    var entKey = '';

    this.setKey = function (key) {
        mKey = key;
        entKey = CryptoJS.enc.Latin1.parse(key);
    }

    this.getKey = function () {
        return mKey;
    }

    this.decrypt = function (dataSource) {
        //加密解密串
        var key = entKey;
        var iv = entKey;
        //进行解密
        var decrypted = CryptoJS.AES.decrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //获返解密数据
        return decrypted.toString(CryptoJS.enc.Utf8);
    }


    this.encrypt = function (dataSource) {

        //加密串
        var key = entKey;
        var iv = entKey;
        //进行加密
        var encrypted = CryptoJS.AES.encrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //获返加密数据
        return encrypted.toString();


    }
};