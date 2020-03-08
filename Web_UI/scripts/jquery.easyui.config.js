/*
validatebox 验证规则扩展
*/
$.extend($.fn.validatebox.defaults.rules, {
    length: {
        validator: function (value, param) {
            var len = $.trim(value).length;
            return len >= param[0] && len <= param[1];
        },
        message: "内容长度介于{0}和{1}之间"
    },

    NumberLength: {

        validator: function (value) {
            return /^(?!000)\d{3}$/i.test(value);
        },
        message: '格式不正确,请输入三位数字'

    },
    phonemore: {// 验证电话号码
        validator: function (value) {
            var phoneRegx = /((((\d{3,4}-)?\d{7,8})|(13[0-9]{9}))\,){0,}(((\d{3,4}-)?\d{7,8})|(13[0-9]{9}))$/;
            //alert(phoneRegx.test(test5)); 
            return phoneRegx.test(value);
        },
        message: '格式不正确,请使用下面格式:XXXXXXXXXXX XXXXXXXXXXX'
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '电话号码格式不正确,请使用如下格式:<br />XXX-XXXXXXXX'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^(13|15|18|17|19)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确(正确格式如：13450774432)'
    },
    phoneOrMobile: {//验证手机或电话
        validator: function (value) {
            return /^(13|15|18|17|19)\d{9}$/i.test(value) || /^((\(\d{2,3}\))|(\d{3}|\d{4}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '请输入正确的电话号码<br />（例：13512345678或028-87654321或0827-8765432或87654321)'
    },
    phoneOrLandlineNumber: {//验证手机或电话
        validator: function (value) {
            return /^(13|15|18|17|19)\d{9}$/i.test(value) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '请输入正确的电话号码<br />（例：13512345678或XXX-XXXXXXXX)'
    },
    idcard: {// 验证身份证
        validator: function (value) {
            //^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$
            // return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
            return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/i.test(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(value);
        },
        message: '请输入正确的15位或18位身份证号码'
    },
    faxno: {// 验证传真
        validator: function (value) {
            //			return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,8}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '请输入正确邮政编码（例：640000）'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    carNo: {
        validator: function (value) {
            return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value);
        },
        message: '请输入正确的车牌号'
    },
    email: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的电子邮件账号<br />(例：abc@126.com)'
    }, url: {
        validator: function (value) {
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test(value);
        },
        message: '请输入正确的URL地址<br />(例：http://www.baidu.com)'
    }, isChinese: {
        validator: function (value) {
            return /[　【】《》，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test(value) ? false : true;
        },
        message: '链接验证不通过，请检查'
    },
    shortdate: {
        validator: function (value) {
            // var result = value.match(/^(\d{4})([/|-])(\d[1-12])([/|-])(\d{2})$/);
            var result = value.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig);
            if (result == null) return false;
            return true;
        },
        message: '输入日期格式错误<br />格式为：XXXX-XX-XX'
    },
    date: {
        validator: function (value) {
            var result = value.match(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/);
            if (result == null) return false;
            return true;
        },
        message: '输入日期格式错误,请检查'
    }, datehoursend: {
        validator: function (value) {
            return /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|(1[0-9])|(2[0-3]))\:(([0-5][0-9])|([0-9]))(((\s)|(\:(([0-5][0-9])|([0-9]))))?)))?$/.test(value);
        },
        message: '输入日期时间格式错误<br />格式为：XXXX-XX-XX XX:XX 或者 XXXX-XX-XX XX:XX:XX'
    },
    lonD: {//经度 度
        validator: function (value) {
            return (value >= 98 && value <= 108);
        },
        message: '请输入 98-108 经度（度）'
    },
    lonF: {//经度 分
        validator: function (value) {
            return (value >= 0 && value <= 60);
        },
        message: '请输入 0-60 经度（分）'
    },
    lonM: {//经度 秒
        validator: function (value) {
            return (value >= 0 && value <= 60);
        },
        message: '请输入 0-60 经度（秒）'
    },
    latD: {//纬度 度
        validator: function (value) {
            return (value >= 26 && value <= 32);
        },
        message: '请输入 26-32 纬度（度）'
    },
    latF: {//纬度 分
        validator: function (value) {
            return (value >= 0 && value <= 60);
        },
        message: '请输入 0-60 纬度（分）'
    },
    latM: {//纬度 秒
        validator: function (value) {
            return (value >= 0 && value <= 60);
        },
        message: '请输入 0-60 纬度（秒）'
    },
    maxLength: {
        validator: function (value, param) {
            return value.length <= param[0];
        },
        message: '长度不超过{0}'
    },
    Organization: {  //组织机构代码
        validator: function (value) {
            return /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/i.test(value);
        },
        message: '组织机构代码证号格式不正确'

    }, ReiveCheck: {
        validator: function (value, param) {
            if (value > param[0]) {
                return false;
            }
            return true;
        },
        message: '解除数量不能大于保存证据剩余量'
    }, InputCheck: {
        validator: function (value) {
            return checkHtml(value);
        },
        message: '输入内容存在非法字符'
    }
});

function checkHtml(htmlStr) {

    var reg = /<[\\s\\S]*?>/;
    if (reg.test(htmlStr) == false) {
        reg = /[<>][\\s\\S]*?/;
        if (reg.test(htmlStr) == false) {
            reg = /^(.*[\'])/g;
            if (reg.test(htmlStr) == false) return true;
            return false;
        }
        else {
            return false;
        }
    }
    return false;

}



//表单录入验证 根据录入情况弹出是否关闭窗体的提示语句
var FormInputWatch = new function () {

    var enabled = true;

    function setChanged() {
        window.inputHasChanged = true;
    }

    function setUnChanged() {
        window.inputHasChanged = false;
    }

    this.disable = function () {
        enabled = false;
        removeEvent();
    }

    this.enable = function () {
        enabled = true;
        watchEvent();
    }

    function watchEvent() {

        $(".easyui-textbox").each(function (index, obj) {
            var textbox = $(this).textbox("textbox");
            textbox.bind("keyup", function () {
                setChanged();
            })
        })

        $(":radio,:checkbox").on("change", function () {
            setChanged();
        })

        $("#form1").form({
            onChange: function () {
                setChanged();
            }
        })

    }

    function removeEvent() {

        setUnChanged();

        $(".easyui-textbox").each(function (index, obj) {
            var textbox = $(this).textbox("textbox");
            textbox.unbind("keyup")
        });
        $(":radio,:checkbox").off("change");

        $("#form1").form({
            onChange: function () {
            }
        })
    }
}
//



//jquery easyui 控件 默认属性设置
$.fn.textbox.defaults.height = 32;
$.fn.searchbox.defaults.height = 32;
$.fn.combo.defaults.height = 32;
$.fn.combobox.defaults.height = 32;
$.fn.combobox.defaults.editable = false;
$.fn.datebox.defaults.height = 32;
$.fn.datebox.defaults.editable = false;
$.fn.datetimebox.defaults.height = 32;
$.fn.datetimebox.defaults.editable = false;
$.fn.numberspinner.defaults.height = 32;
$.fn.numberbox.defaults.height = 32;



$.fn.form.defaults.novalidate = true;
$.fn.form.defaults.ajax = false;

$.fn.datagrid.defaults.remoteSort = false;

//numberbox扩展属性 通过formatter设置 0值为空
$.fn.numberbox.defaults.zeroNull = true;
$.fn.numberspinner.defaults.zeroNull = true;

$.fn.numberbox.defaults.formatter = function (value) {
    var opts = $(this).numberbox("options");
    if (opts.zeroNull) {
        if (!value || value == 0) {
            return null
        }
        return value;
    }
    else {
        return value;
    }
}

$.fn.numberspinner.defaults.formatter = function (value) {
    var opts = $(this).numberspinner("options");
    if (opts.zeroNull) {
        if (!value || value == 0) {
            return null
        }
        return value;
    }
    else {
        return value;
    }
}
//
//$.extend($.fn.searchbox.methods, {
//    addClearBtn: function (jq, iconCls) {
//        return jq.each(function () {
//            var t = $(this);
//            var opts = t.searchbox('options');
//            opts.icons = opts.icons || [];
//            opts.icons.unshift({
//                iconCls: iconCls,
//                handler: function (e) {
//                    $(e.data.target).searchbox('clear').searchbox('textbox').focus();
//                    $(this).css('visibility', 'hidden');
//                }
//            });
//            t.searchbox();
//            if (!t.searchbox('getText')) {
//                t.searchbox('getIcon', 0).css('visibility', 'hidden');
//            }
//            t.searchbox('textbox').bind('keyup', function () {
//                var icon = t.searchbox('getIcon', 0);
//                if ($(this).val()) {
//                    icon.css('visibility', 'visible');
//                } else {
//                    icon.css('visibility', 'hidden');
//                }
//            });
//        });
//    }
//});





function parseOptions(target, properties) {
    var t = $(target);
    var options = {};

    var s = $.trim(t.attr('data-options'));
    if (s) {
        //				var first = s.substring(0,1);
        //				var last = s.substring(s.length-1,1);
        //				if (first != '{') s = '{' + s;
        //				if (last != '}') s = s + '}';
        if (s.substring(0, 1) != '{') {
            s = '{' + s + '}';
        }
        options = (new Function('return ' + s))();
    }

    if (properties) {
        var opts = {};
        for (var i = 0; i < properties.length; i++) {
            var pp = properties[i];
            if (typeof pp == 'string') {
                if (pp == 'width' || pp == 'height' || pp == 'left' || pp == 'top') {
                    opts[pp] = parseInt(target.style[pp]) || undefined;
                } else {
                    opts[pp] = t.attr(pp);
                }
            } else {
                for (var name in pp) {
                    var type = pp[name];
                    if (type == 'boolean') {
                        opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
                    } else if (type == 'number') {
                        opts[name] = t.attr(name) == '0' ? 0 : parseFloat(t.attr(name)) || undefined;
                    }
                }
            }
        }
        $.extend(options, opts);
    }
    return options;
}


$.extend($.fn.searchbox.methods, {
    setValueParm: function (jq, parm) {
        $(jq).searchbox("setValue", parm.textField);
        $(jq).data("value", parm.valueField);
    }
})


//经纬度显示控制
var controlJwd = new function () {

    var timer = null;
    var canChange_1 = true;
    var canChange_2 = true;


    var showIndex = 0;

    function showInput(input_wrapper) {

        var $lbl_wrapper = $(input_wrapper).prev();

        $lbl_wrapper.css("display", "none");

        input_wrapper.css("display", "block");
        input_wrapper.find(".textbox-text").eq(showIndex).focus();
    }

    function showLabel(numberboxs) {

        var $input_wrapper = $(numberboxs).parent();
        var $lbl_wrapper = $input_wrapper.prev();

        $input_wrapper.css("display", "none");
        $lbl_wrapper.css("display", "block");

        $.each(numberboxs, function (i) {

            var val = $(this).numberbox("getValue");
            if (val) {
                val = val + ({ 0: " °", 1: " ′", 2: " ″" })[i];
            }
            $lbl_wrapper.find("label").eq(i).text(val);
        })

    }

    function attachEvent() {

        //经度
        $.each($(".JWDInput.Longitude .easyui-numberbox"), function (i) {

            var $numberbox = $(this);

            if (i == 0) {
                $numberbox.numberbox({ zeroNull: false, validType: 'lonD', width: '50', tipPosition: 'top' });
            }
            else if (i == 1) {
                $numberbox.numberbox({ zeroNull: false, validType: 'lonF', width: '80', tipPosition: 'top' });
            }
            else if (i == 2) {
                $numberbox.numberbox({ zeroNull: false, validType: 'lonM', width: '80', tipPosition: 'top' });
            }

            var val = $numberbox.numberbox("getValue") || '';

            var textbox = $numberbox.numberbox("textbox");

            textbox.on("blur", function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    if (canChange_1) {
                        showLabel($(".JWDInput.Longitude .easyui-numberbox"));
                    }
                }, 100)
                canChange_1 = true;

            }).on("focus", function () {
                canChange_1 = false;
            })

            // $(".JWDLabel.Longitude label").eq(i).text("asdsad");

        })

        //纬度
        $.each($(".JWDInput.Latitude .easyui-numberbox"), function (i) {

            var $numberbox = $(this);

            if (i == 0) {
                $numberbox.numberbox({ zeroNull: false, validType: 'latD', width: '50', tipPosition: 'top' });
            }
            else if (i == 1) {
                $numberbox.numberbox({ zeroNull: false, validType: 'latF', width: '80', tipPosition: 'top' });
            }
            else if (i == 2) {
                $numberbox.numberbox({ zeroNull: false, validType: 'latM', width: '80', tipPosition: 'top' });
            }

            var val = $numberbox.numberbox("getValue") || '';

            var textbox = $numberbox.numberbox("textbox");

            textbox.on("blur", function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    if (canChange_2) {
                        showLabel($(".JWDInput.Latitude .easyui-numberbox"));
                    }
                }, 100)
                canChange_2 = true;

            }).on("focus", function () {
                canChange_2 = false;
            })

            //  $(".JWDLabel.Latitude label").eq(i).text(val);
        })

        //$(".JWDLabel label").on("click", function () {
        //    showIndex = ($(this).parent().children()).index($(this));
        //})

        showLabel($(".JWDInput.Longitude .easyui-numberbox"));
        showLabel($(".JWDInput.Latitude .easyui-numberbox"));

        $(".JWDLabel").on("click", function () {
            var input_wrapper = $(this).next();
            showInput(input_wrapper);
        })
    }

    this.init = function () {
        $(".JWDLabel").css("padding", "12px 0 10px 0");
        $(".JWDInput").css("display", "none");
        attachEvent();
    }


    this.clear = function () {
        $(".JWDLabel label").text("");
        $.each($(".JWDInput.Longitude .easyui-numberbox"), function (i) {
            $(this).numberbox("clear");
        })

        $.each($(".JWDInput.Latitude .easyui-numberbox"), function (i) {
            $(this).numberbox("clear");
        })
    }

    this.validate = function () {

        $.each($(".JWDInput .easyui-numberbox"), function () {
            var bl = $(this).numberbox("isValid");
            if (!bl) {
                showInput($(this).parent());
                return false;
            }
        })

    }
}
//


$.extend($.fn.form.methods, {

    //表单统一验证
    //isValid true：验证通过 false 验证不通过
    validateInput: function (jq, parm) {

        var form = $(jq);
        var isCheck = true;
        var $ValidInput = $(form).find(".input");

        for (var i = 0; i < $ValidInput.length; i++) {

            var tag = $ValidInput[i];
            var opts = parseOptions(tag);
            if (tag.tagName == "INPUT") {


                if ($(tag).hasClass("easyui-textbox") && $(tag).textbox("options").disabled == false) {
                    $(tag).textbox("enableValidation");
                } else if ($(tag).hasClass("easyui-searchbox") && $(tag).searchbox("options").disabled == false) {
                    $(tag).searchbox("enableValidation");
                }
                else if ($(tag).hasClass("easyui-combobox") && $(tag).combobox("options").disabled == false) {
                    $(tag).combobox("enableValidation");
                }
                else if ($(tag).hasClass("easyui-numberbox") && $(tag).numberbox("options").disabled == false) {
                    $(tag).numberbox("enableValidation");
                }
                else if ($(tag).hasClass("easyui-numberspinner") && $(tag).numberspinner("options").disabled == false) {
                    $(tag).numberspinner("enableValidation");
                }
                else if ($(tag).hasClass("easyui-datebox") && $(tag).datebox("options").disabled == false) {
                    $(tag).datebox("enableValidation");
                }
                else if ($(tag).hasClass("easyui-datetimebox") && $(tag).datetimebox("options").disabled == false) {
                    $(tag).datetimebox("enableValidation");
                }

            } else {

                if (tag.tagName == "SPAN") {

                    if ($(tag).hasClass("span-invalid") && opts.required == true) {
                        $(tag).css({ "border": "1px solid #fff", "background-color": "#ffffff" });
                        $(tag).tooltip("destroy");

                        var $checkRadioObj = $(tag).find(".custom_Radio[data-name='" + opts.valueField + "']").custom_Radio("getChecked");
                        //var $checkRadioObj = $(tag).find(".custom_Radio").custom_Radio("getChecked");
                        if ($checkRadioObj.length == 0 && opts.customType == "custom_Radio") {
                            $(tag).css({ "border": "1px solid #ff0000", "background-color": "#fff3f3" });
                            $(tag).tooltip({
                                position: opts.tipPosition,
                                content: '<span style="color:#000">' + opts.missingMessage + '</span>',
                                onShow: function () {
                                    $(this).tooltip('tip').css({ backgroundColor: '#ffffcc', borderColor: '#cc9933' });
                                }
                            });
                            isCheck = false;
                        }

                        //var $checkCheckboxObj = $(tag).find(".custom_Checkbox").custom_Checkbox("getChecked");
                        var tempObj = $(tag).find(".custom_Checkbox");
                        var $checkCheckboxObj = "0";
                        for (var y = 0; y < tempObj.length; y++) {
                            if ($(tempObj[y]).hasClass("checked")) {
                                $checkCheckboxObj = "1";
                            }
                        }
                        if ($checkCheckboxObj == "0" && opts.customType == "custom_Checkbox") {
                            $(tag).css({ "border": "1px solid #ff0000", "background-color": "#fff3f3" });
                            $(tag).tooltip({
                                position: opts.tipPosition,
                                content: '<span style="color:#000">' + opts.missingMessage + '</span>',
                                onShow: function () {
                                    $(this).tooltip('tip').css({ backgroundColor: '#ffffcc', borderColor: '#cc9933' });
                                }
                            });
                            isCheck = false;
                        }
                    }
                }
            }
        }
        if (isCheck) {
            var isValid = $(form).form("validate");
        } else {
            isValid = isCheck;
        }
        if (!isValid) {
            $(form).find(".validatebox-invalid").eq(0).focus(function () {
                setFocus();
            })

            $(form).find(".validatebox-invalid").eq(0).focus();

            setTimeout(function () {
                if (parm == undefined || parm == null) {
                    showTips("您有必填项未录入或录入格式错误，请检查");
                }
                else {
                    if (parm == 0) {
                        showTips("保存成功，但是还有必填项未录入，请检查", 3);
                    }
                }
            }, 100);


        }
        return isValid;
    },

    setData: function (jq, parm, wrap) {

        var wrapper = wrap || jq;

        $.each($(wrapper).find(".input"), function () {

            var opts = parseOptions(this);

            var valueField = (opts && opts.valueField) || "";
            var textField = (opts && opts.textField) || valueField;
            var format = (opts && opts.format) || "";

            if (this.tagName == "INPUT") {

                if ($(this).hasClass("easyui-textbox")) {
                    $(this).textbox("setValue", parm[valueField]);
                }
                else if ($(this).hasClass("easyui-searchbox")) {

                    $(this).data("value", parm[valueField]);
                    $(this).searchbox("setValue", parm[textField]);

                }
                else if ($(this).hasClass("easyui-combobox")) {
                    $(this).combobox("setValue", parm[valueField]);
                }
                else if ($(this).hasClass("easyui-numberbox")) {
                    $(this).numberbox("setValue", parm[valueField]);
                }
                else if ($(this).hasClass("easyui-numberspinner")) {
                    $(this).numberspinner("setValue", parm[valueField]);
                }
                else if ($(this).hasClass("easyui-datebox")) {
                    $(this).datebox("setValue", parm[valueField]);
                }
                else if ($(this).hasClass("easyui-datetimebox")) {
                    $(this).datetimebox("setValue", parm[valueField]);
                }
                else {

                    if (!$(this).hasClass("span-invalid")) {
                        $(this).data("value", parm[valueField]);
                        var mValue = parm[textField];
                        if (format != "") {
                            if (format.indexOf("yyyy") > -1) {
                                //转换日期
                                mValue = ConvertToLongData(mValue, format);
                            }
                        }
                        $(this).html(mValue);
                    }
                }

            }
            else {

                if (!$(this).hasClass("span-invalid")) {
                    $(this).data("value", parm[valueField]);
                    var mValue = parm[textField];
                    if (format != "") {
                        if (format.indexOf("yyyy") > -1) {
                            //转换日期
                            mValue = ConvertToLongData(mValue, format);
                        }
                    }
                    $(this).html(mValue);
                }

            }

        })


        //经纬度显示控制
        if ($(wrapper).find(".JWDInput").length > 0) {
            controlJwd.init();
        }
        //

        $(wrapper).find(".custom_Radio").custom_Radio("unCheck");

        $.each($(wrapper).find(".custom_Radio"), function () {
            var name = $(this).attr("data-name");
            $(wrapper).find(".custom_Radio[data-name='" + name + "'][data-value='" + parm[name] + "']").custom_Radio("check");
        })

        $(wrapper).find(".custom_Checkbox").custom_Checkbox("unCheck");
        $.each($(wrapper).find(".custom_Checkbox"), function () {
            var name = $(this).attr("data-name");
            $(wrapper).find(".custom_Checkbox[data-name='" + name + "'][data-value='" + parm[name] + "']").custom_Checkbox("check");
        })

    },
    getData: function (jq, parm) {

        var wrapper = parm || jq;

        var parms = {};

        $.each($(wrapper).find(".input"), function () {

            var opts = parseOptions(this);

            var valueField = (opts && opts.valueField) || "";
            var textField = (opts && opts.textField) || (valueField + "_text");

            var val = "";

            if (this.tagName == "INPUT") {

                if ($(this).hasClass("easyui-textbox")) {
                    val = $(this).textbox("getValue");
                }
                else if ($(this).hasClass("easyui-searchbox")) {
                    val = $(this).data("value");

                    var tempText = $(this).searchbox("getValue");
                    parms[textField] = tempText || "";

                }
                else if ($(this).hasClass("easyui-combobox")) {

                    val = $(this).combobox("getValue");

                    var tempText = $(this).combobox("getText");
                    parms[textField] = tempText || "";

                }
                else if ($(this).hasClass("easyui-numberbox")) {
                    val = $(this).numberbox("getValue");
                }
                else if ($(this).hasClass("easyui-numberspinner")) {
                    val = $(this).numberspinner("getValue");
                }
                else if ($(this).hasClass("easyui-datebox")) {
                    val = $(this).datebox("getValue");
                }
                else if ($(this).hasClass("easyui-datetimebox")) {
                    val = $(this).datetimebox("getValue");
                }
                else {

                    if (!$(this).hasClass("span-invalid")) {
                        val = $(this).val();

                    }
                }

            }
            else {

            }

            valueField && (parms[valueField] = val);

        })


        var rads = $(wrapper).find(".custom_Radio").custom_Radio("getChecked");


        $.each(rads, function () {
            var obj = this.target;
            var name = $(obj).attr("data-name");
            var val = $(obj).attr("data-value");
            parms[name] = val;
        })


        var cks = $(wrapper).find(".custom_Checkbox").custom_Checkbox("getChecked");

        $.each(cks, function () {
            var obj = this.target;
            var name = $(obj).attr("data-name");
            var val = $(obj).attr("data-value");
            parms[name] = val;
        })

        return parms;
    },
    clear: function (jq, parm) {

        var wrapper = parm || jq;

        $.each($(wrapper).find(".input"), function () {

            var opts = parseOptions(this);

            var valueField = (opts && opts.valueField) || "";
            var textField = (opts && opts.textField) || valueField;

            if (this.tagName == "INPUT") {

                if ($(this).hasClass("easyui-textbox")) {
                    $(this).textbox("clear");
                }
                else if ($(this).hasClass("easyui-searchbox")) {
                    $(this).data("value", "");
                    $(this).searchbox("clear");
                }
                else if ($(this).hasClass("easyui-combobox")) {
                    $(this).combobox("clear");
                }
                else if ($(this).hasClass("easyui-numberbox")) {
                    $(this).numberbox("clear");
                }
                else if ($(this).hasClass("easyui-numberspinner")) {
                    $(this).numberspinner("clear");
                }
                else if ($(this).hasClass("easyui-datebox")) {
                    $(this).datebox("clear");
                }
                else if ($(this).hasClass("easyui-datetimebox")) {
                    $(this).datetimebox("clear");
                }
                else {
                    if (!$(this).hasClass("span-invalid")) {
                        $(this).data("value", "");
                        $(this).val("");
                    }
                }
            }
            else {
                if (!$(this).hasClass("span-invalid")) {
                    $(this).data("value", "");

                    $(this).html("");
                }
            }

        })

        if ($(wrapper).find(".JWDInput").length > 0) {
            controlJwd.clear();
        }

        $(wrapper).find(".custom_Radio").custom_Radio("clear");

        $(wrapper).find(".custom_Checkbox").custom_Checkbox("clear");

    },
    disable: function (jq, parm) {

        var wrapper = parm || jq;

        $.each($(wrapper).find(".input"), function () {

            var opts = parseOptions(this);

            var valueField = (opts && opts.valueField) || "";
            var textField = (opts && opts.textField) || valueField;

            if (this.tagName == "INPUT") {

                if ($(this).hasClass("easyui-textbox")) {
                    $(this).textbox("readonly");
                    $(this).textbox("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else if ($(this).hasClass("easyui-searchbox")) {
                    $(this).searchbox("readonly");
                    $(this).searchbox("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else if ($(this).hasClass("easyui-combobox")) {
                    $(this).combobox("readonly");
                    $(this).combobox("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else if ($(this).hasClass("easyui-numberbox")) {
                    $(this).numberbox("readonly");
                    $(this).numberbox("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else if ($(this).hasClass("easyui-numberspinner")) {
                    $(this).numberspinner("readonly");
                    $(this).numberspinner("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else if ($(this).hasClass("easyui-datebox")) {
                    $(this).datebox("readonly");
                    $(this).datebox("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else if ($(this).hasClass("easyui-datetimebox")) {
                    $(this).datetimebox("readonly");
                    $(this).datetimebox("textbox").focus(function () {
                        $(this).blur();
                    });
                }
                else {
                    $(this).attr("disabled", true);
                }
            }
            else {
                $(this).attr("disabled", true);

            }

        })

        $(wrapper).find(".custom_Radio").off('click');

        $(wrapper).find(".custom_Checkbox").off('click');

    }
    //enable: function (jq, parm) {

    //    var wrapper = parm || jq;

    //    $.each($(wrapper).find(".input"), function () {

    //        var opts = parseOptions(this);

    //        var valueField = (opts && opts.valueField) || "";
    //        var textField = (opts && opts.textField) || valueField;

    //        if (this.tagName == "INPUT") {

    //            if ($(this).hasClass("easyui-textbox")) {
    //                $(this).textbox("readonly", false);
    //                $(this).textbox("textbox").off("focus");
    //                $(this).textbox("textbox").off("blur");
                  
    //            }
    //            else if ($(this).hasClass("easyui-searchbox")) {
    //                $(this).searchbox("readonly", false);
    //                $(this).searchbox("textbox").focus(function () {
    //                    $(this).focus();
    //                });
    //            }
    //            else if ($(this).hasClass("easyui-combobox")) {
    //                $(this).combobox("readonly", false);
    //                $(this).combobox("textbox").focus(function () {
    //                    $(this).focus();
    //                });
    //            }
    //            else if ($(this).hasClass("easyui-numberbox")) {
    //                $(this).numberbox("readonly", false);
    //                $(this).numberbox("textbox").focus(function () {
    //                    $(this).focus();
    //                });
    //            }
    //            else if ($(this).hasClass("easyui-numberspinner")) {
    //                $(this).numberspinner("readonly", false);
    //                $(this).numberspinner("textbox").focus(function () {
    //                    $(this).focus();
    //                });
    //            }
    //            else if ($(this).hasClass("easyui-datebox")) {
    //                $(this).datebox("readonly", false);
    //                $(this).datebox("textbox").focus(function () {
    //                    $(this).focus();
    //                });
    //            }
    //            else if ($(this).hasClass("easyui-datetimebox")) {
    //                $(this).datetimebox("readonly", false);
    //                $(this).datetimebox("textbox").focus(function () {
    //                    $(this).focus();
    //                });
    //            }
    //            else {
    //                $(this).attr("disabled", false);
    //            }
    //        }
    //        else {
    //            $(this).attr("disabled", false);

    //        }

    //    })

    //    $(wrapper).find(".custom_Radio").on('click');

    //    $(wrapper).find(".custom_Checkbox").on('click');

    //}
})


$(function () {


    //

    $.each($(".easyui-textbox"), function () {

        var opts = parseOptions($(this));
        if (!opts.validType) {
            $(this).textbox({ validType: 'InputCheck' });
        }
        if (!opts.validType) {
            $(this).textbox({ tipPosition: 'bottom' });
        }
        var maxLen = $(this).attr("maxlength");
        if (maxLen) {
            $(this).textbox("textbox").attr("maxlength", maxLen);
        }
    })
    //初始状态 禁用表单验证
    if ($("#form1").length > 0) {
        $("#form1").form("disableValidation");
    }

    //textbox获得焦点时，光标在最后面
    var iii = 0;
    $.each($(".easyui-textbox"), function () {
        if (iii == 0) {
            if ($(this).attr("isfocusend") == null || $(this).attr("isfocusend") == undefined || $(this).attr("isfocusend") == true) {
                $(this).textbox("textbox").focus(function () {
                    setFocus();
                })
            }
            iii++;
        }
    })



    $.each($(".easyui-searchbox"), function () {
        var maxLen = $(this).attr("maxlength");
        if (maxLen) {
            $(this).textbox("textbox").attr("maxlength", maxLen);
        }
    })


    $.each($(".easyui-numberbox"), function () {
        var maxLen = $(this).attr("maxlength");
        if (maxLen) {
            $(this).numberbox("textbox").attr("maxlength", maxLen);
        }
    })

    $.each($(".easyui-numberspinner"), function () {
        var maxLen = $(this).attr("maxlength");
        if (maxLen) {
            $(this).numberspinner("textbox").attr("maxlength", maxLen);
        }
    })



    $.each($(".easyui-combobox"), function () {


        var $combobox = $(this);

        var textBox = $combobox.combobox("textbox");
        textBox.on("input", function () {//解决 输入中文 通过数字键选中输入词组时无法触发自动检索事件的BUG
            $(this).keydown();
        }).on("blur", function () {//当输入值在结果集中不存在时，清空组件值
            var data = $combobox.combobox("getData");
            var newValue = $combobox.combobox("getValue")
            var valF = $combobox.combobox("options").valueField;

            var bl = false;
            if (data.length > 0) {

                for (var i = 0, len = data.length; i < len; i++) {
                    if ((data[i])[valF] == newValue) {
                        bl = true;
                        break;
                    }
                    else {
                        continue;
                    }
                }
            }

            if (!bl) {
                $combobox.combobox("clear");
            }

        })
    })

    if ($(".SearchValue").length > 0) {

        $.each($(".SearchValue"), function () {
            var t = $(this).attr("title");
            var txt = $(this).searchbox("textbox");

            txt.tooltip({ position: 'bottom', content: t });
            txt.mouseover(function () {
                $(this).tooltip('show');
            }).mouseout(function () {
                $(this).tooltip('hide');
            })


        })

    }
    if ($("#SearchValue").length > 0) {

        if ($("#SearchValue").hasClass("easyui-searchbox")) {

            var opts = parseOptions($('#SearchValue'));
            var spanHml = "<span id='inputHolder' style='position: absolute;left: 0px; z-index: 100;display: inline-block;line-height: 28px;text-indent: 5px; color: #a6a6a6; font-size: 14px;font-family:NSimSun'>" + opts.prompt + "</span>";

            $('#SearchValue').searchbox('textbox').after(spanHml);
            $('#SearchValue').searchbox({ prompt: '' });
            $("#inputHolder").on("click", function () {
                $('#SearchValue').searchbox('textbox').focus();
            });

            $('#SearchValue').searchbox('textbox').focus(function () {
                if ($.trim($('#SearchValue').searchbox("getText")) != "") {
                    $("#inputHolder").hide();
                } else {
                    $("#inputHolder").show();
                }
            }).blur(function () {
                if ($.trim($('#SearchValue').searchbox("getText")) != "") {
                    $("#inputHolder").hide();
                } else {
                    $("#inputHolder").show();
                }
            }).keyup(function () {
                if ($.trim($('#SearchValue').searchbox("getText")) != "") {
                    $("#inputHolder").hide();
                } else {
                    $("#inputHolder").show();
                }
            }).keypress(function () {
                processSpelChar();
            });

        }

        if ($("#SearchValue").hasClass("easyui-textbox")) {


            var opts = parseOptions($('#SearchValue'));
            var spanHml = "<span id='inputHolder' style='position: absolute;left: 0; top:0;z-index: 100;display: inline-block;line-height: 28px;text-indent: 5px; color: #a6a6a6; font-size: 14px;font-family:NSimSun'>" + opts.prompt + "</span>";

            $('#SearchValue').textbox('textbox').after(spanHml);
            $('#SearchValue').textbox({ prompt: '' });
            $("#inputHolder").on("click", function () {
                $('#SearchValue').textbox('textbox').focus();
            });


            $('#SearchValue').textbox('textbox').focus(function () {
                if ($.trim($('#SearchValue').textbox("getText")) != "") {
                    $("#inputHolder").hide();
                } else {
                    $("#inputHolder").show();
                }
            }).blur(function () {
                if ($.trim($('#SearchValue').textbox("getText")) != "") {
                    $("#inputHolder").hide();
                } else {
                    $("#inputHolder").show();
                }
            }).keyup(function () {

                if ($.trim($('#SearchValue').textbox("getText")) != "") {
                    $("#inputHolder").hide();
                } else {

                    $("#inputHolder").show();
                }
            }).keypress(function () {
                processSpelChar();
            });


        }

    }

    if ($(".SearchValue").length > 0) {

        var searchObj = $(".SearchValue");
        for (var i = 0; i < searchObj.length; i++) {

            var id = "inputHolder" + i;
            var inputId =$(searchObj[i]).attr("id");
            if ($(searchObj[i]).hasClass("easyui-searchbox")) {

                var opts = parseOptions($(searchObj[i]));

                var spanHml = "<span id='" + id + "' class='tips' data-id='" + inputId + "' style='position: absolute;left: 0; top:0;z-index: 100;display: inline-block;line-height: 28px;text-indent: 5px; color: #a6a6a6; font-size: 14px;font-family:NSimSun'>" + opts.prompt + "</span>";

                $(searchObj[i]).searchbox('textbox').after(spanHml);
                $(searchObj[i]).searchbox({ prompt: '' });
                $("#" + id).on("click", function () {
                    var tempId = $(this).attr("data-id");
                    $("#" + tempId).searchbox('textbox').focus();
                });

                $(searchObj[i]).searchbox('textbox').focus(function () {
                    var tempId = $(this).next(".tips").attr("data-id");
                    var tipsId = $(this).next(".tips").attr("id")
                    if ($.trim($("#" + tempId).searchbox("getText")) != "") {
                        $("#" + tipsId).hide();
                    } else {
                        $("#" + tipsId).show();
                    }
                }).blur(function () {
                    var tempId = $(this).next(".tips").attr("data-id");
                    var tipsId = $(this).next(".tips").attr("id")
                    if ($.trim($("#" + tempId).searchbox("getText")) != "") {
                        $("#" + tipsId).hide();
                    } else {
                        $("#" + tipsId).show();
                    }
                }).keyup(function () {
                    var tempId = $(this).next(".tips").attr("data-id");
                    var tipsId = $(this).next(".tips").attr("id")
                    if ($.trim($("#" + tempId).searchbox("getText")) != "") {
                        $("#" + tipsId).hide();
                    } else {
                        $("#" + tipsId).show();
                    }
                }).keypress(function () {
                    processSpelChar();
                });

            }

            if ($(searchObj[i]).hasClass("easyui-textbox")) {


                var opts = parseOptions($(searchObj[i]));
                var spanHml = "<span id='" + id + "' class='tips' data-id='" + inputId + "' style='position: absolute;left: 0; top:0;z-index: 100;display: inline-block;line-height: 28px;text-indent: 5px; color: #a6a6a6; font-size: 14px;font-family:NSimSun'>" + opts.prompt + "</span>";

                $(searchObj[i]).textbox('textbox').after(spanHml);
                $(searchObj[i]).textbox({ prompt: '' });
                $("#" + id).on("click", function () {
                    var tempId =$(this).attr("data-id");
                    $("#" + tempId).textbox('textbox').focus();
                });


                $(searchObj[i]).textbox('textbox').focus(function () {
                    var tempId = $(this).next(".tips").attr("data-id");
                    var tipsId = $(this).next(".tips").attr("id")
                    if ($.trim($("#" + tempId).textbox("getText")) != "") {
                        $("#" + tipsId).hide();
                    } else {
                        $("#" + tipsId).show();
                    }
                }).blur(function () {
                    var tempId = $(this).next(".tips").attr("data-id");
                    var tipsId = $(this).next(".tips").attr("id")
                    if ($.trim($("#" + tempId).textbox("getText")) != "") {
                        $("#" + tipsId).hide();
                    } else {
                        $("#" + tipsId).show();
                    }
                }).keyup(function () {

                    var tempId = $(this).next(".tips").attr("data-id");
                    var tipsId = $(this).next(".tips").attr("id")
                    if ($.trim($("#" + tempId).textbox("getText")) != "") {
                        $("#" + tipsId).hide();
                    } else {
                        $("#" + tipsId).show();
                    }
                }).keypress(function () {
                    processSpelChar();
                });


            }
        }
     

    }




})

//验证输入框内不能输入特殊字符，输入前先作判断
function processSpelChar() {
    var code;
    var character;
    if (document.all) {
        code = window.event.keyCode;
    } else {
        code = arguments.callee.caller.arguments[0].which;
    }
    var character = String.fromCharCode(code);
    var txt = new RegExp(/["'<>%;*~!@#$^)(&+]/);
    if (txt.test(character)) {
        if (document.all) {
            window.event.returnValue = false;
        } else {
            arguments.callee.caller.arguments[0].preventDefault();
        }
        showTips("禁止输入非法字符", 3);
    }
}



function ConvertToLongData(str, mFormat) {

    if (str) {
        str = str.replace(/-/g, "/");
        str = str.replace("T", " ");
        var date = new Date(str);

        var time = date.Format(mFormat);

        return time;
    } else {
        return "";
    }
}

function setFocus(event) {

    event = event ? event : (window.event ? window.event : null);
    if (event) {
        var obj = event.srcElement;
        if ($(obj).hasClass("textbox-text")) {
            var txt = obj.createTextRange();
            txt.moveStart('character', obj.value.length);
            txt.collapse(true);
            txt.select();
        }
    }

}
