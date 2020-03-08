
//金格iweb控件配置项
var KingGrid_Config = {
    iWebOfficeClassId: "clsid:8B23EA28-2009-402F-92C4-59BE0E063499",
    iWebOfficeCodeBase: mPlatformWebUrl + "/Ocx/iWebOffice2009.cab#version=10.8.3.10",
    iWebPdfClassId: "clsid:7017318C-BC50-4DAF-9E4A-10AC8364C315",
    iWebPdfCodeBase: mPlatformWebUrl + "/Ocx/iWebPDF2015.cab#version=2.0.1129.1072",
    iWebServerURL: mPlatformWebUrl + "/Public/IWebServer.aspx"
}




var PlatformWebUrl = mPlatformWebUrl;
var IsDebug = true;//是否调试阶段

//加密钥匙
var entKey = CryptoJS.enc.Latin1.parse(mKey);


//****解密
function decrypt(dataSource) {
    //加密解密串
    var key = entKey;
    var iv = entKey;
    //进行解密
    var decrypted = CryptoJS.AES.decrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
    //获返解密数据
    return decrypted.toString(CryptoJS.enc.Utf8);
}

//****加密
function encrypt(dataSource) {
    //加密串
    var key = entKey;
    var iv = entKey;
    //进行加密
    var encrypted = CryptoJS.AES.encrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
    //获返加密数据
    return encrypted.toString();
}

//****加密
function decryptDefault(dataSource) {
    //加密串
    var key = CryptoJS.enc.Latin1.parse("1234567812345678");
    var iv = CryptoJS.enc.Latin1.parse("1234567812345678");
    //进行解密
    var decrypted = CryptoJS.AES.decrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
    //获返解密数据
    return decrypted.toString(CryptoJS.enc.Utf8);
}

Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}