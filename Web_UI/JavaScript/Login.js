
//验证用户输入
function validateInput() {

    var a = $.trim($("#account").val());
    var p = $.trim($("#password").val());
    var v = $.trim($("#validateInput").val());

    if (!a) {
        $("#errorMsg").html('请输入用户名');
        $("#account").focus();
        return false;
    }

    if (!p) {
        $("#errorMsg").html('请输入密码');
        $("#password").focus();
        return false;
    }

    if (isShowValidateCode == 1) {

        if (!v) {
            $("#errorMsg").html('请输入验证码');
            $("#validateInput").focus();
            return false;
        }
        else {
            if (validateCode.isValid() === false) {
                validateCode.setValidateCode()
                $("#errorMsg").html('验证码输入错误');
                $("#validateInput").val("").focus();
                return false;
            }
        }


    }
    $("#errorMsg").html('');
    return true;
}



//重置验证码
function setValidateCode() {
    validateCode.setValidateCode();
}




var validateCode = new function () {

    var _el = "#validateCodeView";
    var _input = "#validateInput";
    var _container = "#validateCode";

    this.setValidateCode = function () {
        var chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
        var randomChars = "";
        for (var x = 0; x < 4; x++) {
            var i = Math.floor(Math.random() * chars.length);
            randomChars += chars.charAt(i);
        }
        $(_el).html(randomChars);
    }

    this.init = function () {
        $(_container).css("display", "");

        this.setValidateCode();

        $(_el).on("click", function () {
            setValidateCode();
        })


    }

    this.clear = function () {
        $(_el).html("&nbsp;");
    }

    this.isValid = function () {
        var bl = false;
        var curr = $.trim($(_el).text()).toUpperCase();
        var input = $.trim($(_input).val()).toUpperCase();

        if (curr === input) {
            bl = true;
        }
        return bl;
    }

}


//回车/空格事件
function enterSumbit(type) {

    var event = arguments.callee.caller.arguments[0] || window.event;//消除浏览器差异  
    if (event.keyCode == 13) {
        btnLogin_Click();
    }
    else if (event.keyCode == 32 && type == 1) {
        //按空格键选中记住密码
        $(".remeberPwd").toggleClass("active");

    }

}



//登录事件
var islogin = false;
function btnLogin_Click() {


    if (islogin == true) return;

    if (!validateInput()) {
        return;
    }

    islogin = true;

    loginAnimate.begin();

}

//登陆动画控制
var loginAnimate = new function () {

    var _element = ".form_Opacity,.form";
    var _msg = "#errorMsg";

    this.begin = function () {
        $("input").blur();
        $(_element).velocity({
            rotateZ: 0,
            translateX: 0,
            rotateY: "180deg"
        }, {
            duration: 500,
            begin: function () {
                setTimeout(function () {
                    $(".form").addClass("active");
                }, 280)
            },
            complete: function () {
                $(".form_Loading").addClass("active");

                setTimeout(function () {

                    Login();

                }, 600)
            }
        });

    }

    this.hide = function (msg, errorCode) {

        $(_element).velocity({
            rotateY: 0,
            reverse: true
        }, {
            duration: 800,
            begin: function () {

                $(_msg).html(msg);
                $(".form_Loading").removeClass("active");
                setTimeout(function () {
                    $(".form").removeClass("active");
                }, 360)
            },
            complete: function () {
                islogin = false;
                if (errorCode == "2") {//账号不存在
                    $("#account").val("").focus();
                    $("#password").val("");
                    $("#password").next(".inputHolder").show();
                }
                else if (errorCode == "3") {//账号被锁定
                    $("#account").focus();
                    $("#password").focus();
                    $("#account").next(".inputHolder").show();
                    $("#password").next(".inputHolder").show();
                }
                else if (errorCode == "4") {//密码不正确
                    $("#account").focus();
                    $("#password").val("").focus();
                    $("#password").next(".inputHolder").show();
                } else if (errorCode == "6") {//您的账号已停用,请与管理员联系
                    $("#account").focus(function () {
                        setFocus();
                    });
                    $("#account").focus();
                    $("#password").val("");
                    $("#password").next(".inputHolder").show();
                }

                $(".password .complete").removeClass("icon_complete");
                $(".account .complete").removeClass("icon_complete");

                if ($("#password").val() != "") {
                    $(".password .complete").addClass("icon_complete");
                }

                if ($("#account").val() != "") {
                    $(".account .complete").addClass("icon_complete");
                }

            }
        })
    }

}
function setFocus() {
    if (event) {
        var obj = event.srcElement;

        var txt = obj.createTextRange();
        txt.moveStart('character', obj.value.length);
        txt.collapse(true);
        txt.select();

    }

}

var mGetPwd = "";
var GetAcc = "";
var mGetPwdEx = "";
var GetAccEx = "";

//****记住密码控制
var controlPwdCookie = new function () {
    var _cookieName = "EPB_loginCookie";
    var _checkBox = ".remeberPwd";
    //****解密
    function decryptLog(dataSource, mKey) {
        //加密解密串
        var mJMKey = CryptoJS.enc.Latin1.parse(mKey);
        var key = mJMKey;
        var iv = mJMKey;
        //进行解密
        var decrypted = CryptoJS.AES.decrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //获返解密数据
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    //****加密
    function encryptLog(dataSource, mKey) {
        //加密串
        var mJMKey = CryptoJS.enc.Latin1.parse(mKey);
        var key = mJMKey;
        var iv = mJMKey;
        //进行加密
        var encrypted = CryptoJS.AES.encrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //获返加密数据
        return encrypted.toString();
    }


    this.set = function (data) {

        var bl = $(_checkBox).hasClass("active");

        var loginData = {
            tokenID: data.tokenID,
            loginUserCode: encryptLog(data.loginUserCode, data.tokenID),
            loginUserPwd: encryptLog(data.loginUserPwd, data.tokenID)
        }

        var cookie = $.cookie(_cookieName);

        if (bl) {

            if (cookie) {

                var cookieData = JSON.parse(cookie);

                var c_Token = cookieData.tokenID;
                var c_ID = decryptLog(cookieData.loginUserCode, c_Token);
                var c_PWD = decryptLog(cookieData.loginUserPwd, c_Token);


                if (c_ID != data.loginUserID || c_PWD != data.loginUserPwd) {
                    $.cookie(_cookieName, JSON.stringify(loginData), { expires: 7 });
                }

            }
            else {
                $.cookie(_cookieName, JSON.stringify(loginData), { expires: 7 });
            }

        }
        else {
            $.cookie(_cookieName, null, { expires: 0 });
        }
    }

    this.get = function () {
        //读取cook 检查是否已记住密码
        if ($.cookie(_cookieName) != null) {

            var cookieData = JSON.parse($.cookie(_cookieName));

            var c_Token = cookieData.tokenID;
            var c_ID = decryptLog(cookieData.loginUserCode, c_Token);
            var c_PWD = decryptLog(cookieData.loginUserPwd, c_Token);

            if (c_PWD) {
                $("#account").val(c_ID);
                $("#password").val(c_PWD);
                $(_checkBox).addClass("active");
                $("#account").next(".inputHolder").hide();
                $("#password").next(".inputHolder").hide();
            } else {
                setTimeout(function () {
                    $("#account").val("");
                    $("#password").val("");
                    $("#account").next(".inputHolder").show();
                    $("#password").next(".inputHolder").show();
                }, 100)
            }
        } else {
            setTimeout(function () {
                $("#account").val("");
                $("#password").val("");
                $("#account").next(".inputHolder").show();
                $("#password").next(".inputHolder").show();
            },100)
            
        }
    }


}

//****解密
function decryptLog(dataSource, mKey) {
    if (dataSource && mKey) {
        //加密解密串
        var mJMKey = CryptoJS.enc.Latin1.parse(mKey);
        var key = mJMKey;
        var iv = mJMKey;
        //进行解密
        var decrypted = CryptoJS.AES.decrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //获返解密数据
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

}

//****加密
function encryptLog(dataSource, mKey) {

    if (dataSource && mKey) {
        //加密串
        var mJMKey = CryptoJS.enc.Latin1.parse(mKey);
        var key = mJMKey;
        var iv = mJMKey;
        //进行加密
        var encrypted = CryptoJS.AES.encrypt(dataSource, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //获返加密数据
        return encrypted.toString();
    }

}


//****登陆参数
function getInputParms() {

    var loginData = {
        F_UserCode: $("#account").val(),
        F_PassWord: $("#password").val(),
        F_IP: "",
        F_Mac: "",
        F_LoginType: 0,
        F_EncryptKey: CryptoData_Class.getKey()
    }

    var parms = {
        parameter: CryptoData_Class.encrypt(JSON.stringify(loginData)),
        TokenID: $("#hidTokenID").val()
    }


    return parms;
}


//获取加密Key
function getEncryptKey(callback) {
   
    $.ajax({
        url: PLSSOProxy + "/getEncryptKey",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ TokenID: $("#hidTokenID").val() }),
        dataType: "json",
        success: function (returnValue) {
            var mKey = returnValue.d;

            CryptoData_Class.setKey(mKey);

            $("#hidEncryptKey").val(mKey);

            callback();

        },
        error: function (XMLHttpRequest, textStatus, errorThown) {
            islogin = false;
            loginAnimate.hide(XMLHttpRequest.responseText);
            alert(XMLHttpRequest.responseText);
        }
    })

}

//登陆调用数据接口
function Login() {

    getEncryptKey(function () {
        var parms = getInputParms();

        //数据调用处理
        $.ajax({
            url: PLSSOProxy + "/LoginCheck",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(parms),
            dataType: "json",
            success: function (returnValue) {
                islogin = false;

                try {

                    var decryptStr = CryptoData_Class.decrypt(returnValue.d);

                    var decRel = JSON.parse(decryptStr);


                    if (decRel.ErrorCode == 0) {

                        var result = JSON.parse(decRel.Result).Table[0];
                        $("#hidUserID").val(result.F_USERID);

                        controlPwdCookie.set({
                            tokenID: $("#hidTokenID").val(),
                            loginUserCode: $("#account").val(),
                            loginUserPwd: $("#password").val()
                        });

                        //登录成功，转至系统主页
                        $("#form1").submit();

                    }
                    else {
                        loginAnimate.hide(decRel.ErrorMsg, decRel.ErrorCode);
                    }

                } catch (e) {

                    loginAnimate.hide(e.message);

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThown) {
                islogin = false;

                loginAnimate.hide(XMLHttpRequest.responseText);
            }
        });

    })
}



var isShowValidateCode="";
var mUserType = 0;
$(function () {


    if (isShowValidateCode == 1) {
        validateCode.init();
    }

    controlPwdCookie.get();


    var _focusedObj = null;
    var flag = true;;


    $(".login_Block .head .item").on("mouseenter", function () {
        $("input").blur();

    }).on("mouseleave", function () {
        if (_focusedObj) {
            _focusedObj.focus();
            _focusedObj = null;
        }
    })

    $("#account").on("keydown", function (event) {
        var pwd = $("#password").val();
        if (pwd) {
            e = event ? event : (window.event ? window.event : null);
            var currKey = 0;
            currKey = e.keyCode || e.which || e.charCode;
            if (currKey != 13) {
                $("#password").val("");
                $("#password").next(".inputHolder").show();
            }
        }
    })

    $(".remeberPwd span").on("click", function () {
        $(".remeberPwd").toggleClass("active");
    })

    $(".form .item input").each(function (i, el) {
        if (this.value) {
            var parent = $(this).parent();
            var label = parent.find("label");
            label.css({ top: -18, fontSize: 12 })
        }
    })

    if ($("#password").val() != "") {
        $(".password .complete").addClass("icon_complete");
    }
    $(".form .item input").on("focus", function () {

        _focusedObj = this;
        var parent = $(this).parent();
        var label = parent.find("label");
        parent.addClass("active");
        label.animate({ top: -18, fontSize: 12 }, 200, 'swing');

        if (label.html() == "用户名") {
            setTimeout(function () { $(".account .complete").removeClass("icon_complete"); }, 100);
        }


    }).on("blur", function () {

        var val = $(this).val();
        var parent = $(this).parent();
        parent.removeClass("active");
        if (!val) {
            var label = parent.find("label");
            label.animate({ top: 2, fontSize: 14 }, 200, 'swing')
        }
        var a = $.trim($("#account").val());
        var p = $.trim($("#password").val());

        if (a != "") {
            var obj = $(".account input");
            obj[0].style.borderColor = "";
            $(".account .complete").addClass("icon_complete");
        } else {
            $(".account .complete").removeClass("icon_complete");
        }
        if (p != "") {
            var obj = $(".password input");
            obj[0].style.borderColor = "";
            $(".password .complete").addClass("icon_complete");
        } else {
            $(".password .complete").removeClass("icon_complete");
        }
    })

    //$(".form .item  input").on("focus", function () {
    //    $(".account .complete").removeClass("icon_complete");
    //}).on("blur", function () {
    //    var obj = $(".account input");
    //    obj[0].style.borderColor = "";
    //    $(".account .complete").addClass("icon_complete");
    //})


    //$(".form .item input").eq(0).focus();
    //焦点放置于文本内容之后
    var inputName = $(".form .item input");
    var nameValue = $(inputName).val();
    $(inputName).eq(0).focus();
    $(inputName).eq(0).val("");
    $(inputName).eq(0).val(nameValue);
    

    $(".loginBtn").on("click", function () {
        btnLogin_Click();
    })

    $(".checkTitle").on("click", function () {

        $(".checkTitle").removeClass("selected");
        $(this).addClass("selected");

    });

    $(".checkTitle").eq(0).click();

})


var changeIndex = 0;
var changeTime = 4000;
$(function () {
    $(".imgsScrollWrapper").height(document.body.offsetHeight - 55);
    $(".imgBlock").width(document.body.offsetWidth);
    $(".imgBlock").height(document.body.offsetHeight - 55);

    window.onresize = function () {
        $(".imgsScrollWrapper").height(document.body.offsetHeight - 55);
        $(".imgBlock").width(document.body.offsetWidth);
        $(".imgBlock").height(document.body.offsetHeight - 55);
    };


    //changeTimer = setInterval(autoChange, changeTime);
    $(".imgsScroll .imgBlock img").bind("click", function () {
        // window.open($(this).attr('data-url'));
    })

})


function changeNewsImg(i) {
    $(".imgsScrollWrapper .imgChangeFlag span").removeClass("imgCurrFlag");
    $(".imgsScrollWrapper .imgChangeFlag span").eq(i).addClass("imgCurrFlag");

    $(".imgsScrollWrapper .imgNewsInfoItem").css("display", "none");
    $(".imgsScrollWrapper .imgNewsInfoItem").eq(i).css("display", "block");


    var left = (i * (-document.body.offsetWidth));
    $(".imgsScroll").animate({ marginLeft: left }, function () { })

}


function autoChange() {
    var total = $(".imgsScroll .imgBlock img").length;
    changeIndex++;
    if (changeIndex > total - 1) {
        changeIndex = 0;
    }
    changeNewsImg(changeIndex);
}
