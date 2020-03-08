
window.onerror =
 function (errorMessage, scriptURI, lineNumber) {
     hideloading();
 }

function alertEx(msg) {
    top.showTips(msg);
}

function attrPrivewEdit(parms) {
    //parms.FileSelectTab = top.getMainSelectTabIndex();
    top.AttrPrviewEdit = parms;
    top.MainTab.addTab("附件预览", "Public/AttrPreviewEdit.aspx");
}

//tab项刷新
function callTabEvent(attrCount, objId, F_SourceDataID, FileSelectTab) {
    //debugger;
    if (FileSelectTab != undefined && FileSelectTab != null) {
        //获取选择Tab英
        for (var i = 0; i < $("#MainTab").tabs("tabs").length; i++) {

            var tmptab = $("#MainTab").tabs('getTab', i);

            if ($(tmptab[0]).find('iframe')[0].src == FileSelectTab) {
                var refreshTab = $("#MainTab").tabs('getTab', i);
                //验证是否Iframe加载
                if (refreshTab && refreshTab.find('iframe').length > 0) {
                    //获取iframe对象
                    var _refresh_iframe = refreshTab.find('iframe')[0];
                    var win = _refresh_iframe.contentWindow || _refresh_iframe.contentDocument;
                    try {
                        win.AttrRefsh(attrCount, objId, F_SourceDataID);
                    } catch (e) { }
                }
            }
        }
    }
}


var utilityHandle = {
    setFocus: function (objFocusEven, values) {
        objFocusEven.focus();
        // 默认使用focus方法聚焦 
        /* -------------- 2012.09.18 代码更新（增加对FF，Opera，Chorme现代浏览器的支持）--------*/
        var objEven = objFocusEven[0]; // 将Jquery对象转换为Dom对象
        if (window.getSelection) {
            // 现代浏览器  
            objEven.selectionStart = objEven.selectionEnd = values;
        } else if (document.selection) {
            // Ie浏览器
            /*  if ($.browser.msie) { //--- 此段注释代码，于2012.09.18日修改时去除---*/
            var txt = objEven.createTextRange();
            // 将传入的控件对象转换为Dom对象，并创建一个TextRange对象
            txt.moveStart('character', values);
            // 设置光标显示的位置
            txt.collapse(true);
            txt.select();
        }
    }
};

//控制页面入口 不可直接访问
(function ($) {
    //var currPath = top.window.location.pathname;

    //var arr = currPath.split("/");
    //var pageName = arr[arr.length - 1];
    //var webPath = "/" + arr[1] + "/" + arr[2] + "/";

    //if (pageName != "Login.aspx") {
    //    if (pageName != "AppMain.aspx") {
    //        var currHost = window.location.host;
    //        location.href = "http://" + currHost + webPath + "Login.aspx"
    //    }
    //}
})(jQuery)
//

//ajax 请求全局事件
$(document).on("ajaxSend", function (event, request, settings) {

    if (settings.autoShowloading) {
        showloading(settings.loadingMsg, settings.loadingContainer);
    }

    if (!navigator.onLine) {//如果网络为离线状态
        //alert("请检查您的网络连接");
        request.abort();//中止ajax请求
    }
})

$(document).ajaxComplete(function (event, request, settings) {
    if (settings.autoHideloading) {
        hideloading(settings.loadingContainer);
    }
});

$(document).ajaxError(function (event, request, settings, error) {
    showErrorMessage(request.responseText);
});



//页面初始事件
$(function () {

    //为输入框添加title
    $("input:text").bind("mouseover", function () {
        $(this).attr("title", "");
        var val = $.trim(this.value);
        var w = $(this).width();
        var l = val.length;
        var f = parseInt($(this).css("font-size"));
        if (f * l > w) {
            $(this).attr("title", val)
        }
    })




    //页面按钮默认事件禁止
    $(document.body).bind("keydown", function (e) {
        if (!e.target.type) {
            if (e.which == 8) { //backspace
                e.preventDefault();
            }
            if (e.which == 123) {//F12
                //  e.preventDefault();
            }
        }
        else if (e.target.readOnly) {
            if (e.which == 8) { //backspace
                e.preventDefault();
            }
        }
    })

    //a 标签拖动默认事件禁止
    $("a,img").bind("dragstart", function (e) {
        e.preventDefault();
    })

    //鼠标右键事件禁止
    $(document).bind("contextmenu", function (e) {
        // e.preventDefault();
    })

    //chj 添加时间控件datebox清除
    var buttons = $.extend([], $.fn.datebox.defaults.buttons);
    buttons.splice(1, 0, {
        text: '清除',
        handler: function (target) {
            $(target).datebox("setValue", "");
        }
    });
    $('.easyui-datebox').datebox({
        buttons: buttons
    });

    var buttons2 = $.extend([], $.fn.datetimebox.defaults.buttons);
    buttons2.splice(1, 0, {
        text: '清除',
        handler: function (target) {//target对象就是当前的inupt对象，不需要写死id  
            $(target).datetimebox('setValue', '');
        }
    })

    $('.easyui-datetimebox').datetimebox({
        buttons: buttons2
    });
})


//生成Guid
function newGuid() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    var guid = uuid.join('');

    guid = guid.replace(/-/g, '');

    return guid.toUpperCase();
}


function showloading(text, container) {
    var obj = container || "body";

    if (!text) text = "数据加载中，请稍候...";

    var mask = "<div class='loading-modal'></div>";
    var text = "<div class='loading-text'>" + text + "</div>";

    var $loading = mask + text;

    if (!obj) obj = "body";

    $(obj).find(".loading-modal").remove();
    $(obj).find(".loading-text").remove();

    $(obj).append($loading);
}

function hideloading(container) {

    var obj = container || "body";
    setTimeout(function () {
        $(obj).find(".loading-modal").remove();
        $(obj).find(".loading-text").remove();
    }, 300)
}


function PostGetParamterConvert(data) {
    var token = top.mTokenID;
    var parms = {};


    if (!data) {
        parms = {
            TokenID: token
        };
    }
    else {
        try {
            parms = {
                Parameter: top.encrypt(data),
                TokenID: token
            }
        } catch (e) {
            parms = {
                Parameter: data,
                TokenID: token
            }
        }
    }
    return JSON.stringify(parms);
}



function PostGetParamterConvertByPage(data, page, pageSize) {

    var token = top.mTokenID;

    var parms = {
        Parameter: top.encrypt(data),
        PageSize: pageSize,
        Page: page,
        TokenID: token
    }

    return JSON.stringify(parms);
}


//公共 文件预览
function App_FileView(parms) {
    var viewerPage = "../Public/AttachmentManage.aspx";

    var form = $("<form>");
    form.attr('style', 'display:none');
    form.attr('target', '_blank');
    form.attr('method', 'post');
    form.attr('action', viewerPage);

    //var parms = {
    //    TokenID: top.$("#hidTokenID").val(),
    //    EncryptKey: top.$("#hidEncryptKey").val(),
    //    UserID: top.UserItem.F_USERID,
    //    F_OPType: 0,//预览模式（0文书附件1：json文件数组）
    //    F_Title: "",//标题前缀（调用页构建） 企业名称-模块名称-文书类型名称
    //    F_SelectFileID: "",//选择的文件ID
    //    F_AmanTypeID: "",//文书类型ID
    //    F_AmanModuleID: "",//模块ID	
    //    F_SourceDataID: "",//数据源ID
    //    F_FileData:JSON.stringify([])//要预览文件的Json数组  [{F_FileName:文件名称，F_FileType:文件类型，F_StoragePath:文件存储的路径，F_FileID：文件ID }]
    //}

    parms.TokenID = top.$("#hidTokenID").val();
    parms.EncryptKey = top.$("#hidEncryptKey").val();
    parms.UserID = top.UserItem.F_USERID;
    parms.WcfURL = top.StorageWcfProxy;

    //添加参数
    for (var i in parms) {
        var input = $('<input>');
        input.attr('type', 'hidden');
        input.attr('name', i);
        input.attr('value', parms[i]);
        form.append(input);
    }

    $('body').append(form);

    //提交下载
    form.submit();
    form.remove();
}



//弹出窗
//CloseSaveData 等于true时，点击关闭按钮返回自定义数据，数据名称：ReturnData
function showDialog(title, url, width, height, callback, CloseSaveData) {
    top.dialogOp.showDialog({
        title: title,
        content: url,
        width: width,
        height: height,
        CloseSaveData: CloseSaveData || false
    }, callback)
}

function closeDialog(result) {
    top.dialogOp.closeDialog(result);
}


//弹出框^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//****confirm弹出提示确认框
function confirmEx(title, toolTip, fn) {

    var icon = '<div class="" style="display:inline-block;"></div>'//messager-icon messager-question

    var content = '<table style="table-layout:fixed;height:100%;"><tr><td>' + icon + '</td><td>' + toolTip + '</td></tr></table>';

    top.$.messager.confirm(title, content, fn);

}

function alertEx(toolTip, fn) {
    var fnTilt = fn;
    if (fnTilt == null || fnTilt == "") {
        fnTilt = "warning";
    }


    var icon = '<div class="messager-icon messager-question" style="display:inline-block;"></div>'

    //var content = '<table style="table-layout:fixed;height:100%;"><tr><td>' + icon + '</td><td>' + toolTip + '</td></tr></table>';

    var content = '<table style="table-layout:fixed;height:100%;"><tr><td style="display:inline-block;">' + toolTip + '</td></tr></table>';


    top.$.messager.alert("提示", content, fnTilt);
}


//显示提示信息
function showToolTip(tips, tipsType) {

    var $tipsDiv = $('<div class="tipsClass"></div>');

    var $bgDiv = $('<div></div>');

    $(".tipsClass").stop(true);
    $(".tipsClass").remove();

    var textDiv = '<div>' + tips + '</div>';
    var screenWidth = $(window).width();
    var imageUrl = "";
    if (screenWidth < 1400) {
        imageUrl = 'url("images/Public/tipNotice1366.png")';

    } else {
         imageUrl = 'url("images/Public/tipNotice.png")';
    }
    if (tipsType) {

        if (tipsType == "1") {
            if (screenWidth < 1400) {
                imageUrl = 'url("images/Public/tipSuccess1366.png")';

            } else {
                imageUrl = 'url("images/Public/tipSuccess.png")';
            }
        }
        if (tipsType == "2") {
            if (screenWidth < 1400) {
                imageUrl = 'url("images/Public/tipFail1366.png")';

            } else {
                imageUrl = 'url("images/Public/tipFail.png")';
            }
        }
        if (tipsType == "3" || tipsType == "") {
            if (screenWidth < 1400) {
                imageUrl = 'url("images/Public/tipNotice1366.png")';

            } else {
                imageUrl = 'url("images/Public/tipNotice.png")';
            }
        }

    } else {
        if (tips.indexOf("成功") > 0) {
            if (screenWidth < 1400) {
                imageUrl = 'url("images/Public/tipSuccess1366.png")';

            } else {
                imageUrl = 'url("images/Public/tipSuccess.png")';
            }

        }
        if (tips.indexOf("失败") > 0) {
            if (screenWidth < 1400) {
                imageUrl = 'url("images/Public/tipFail1366.png")';

            } else {
                imageUrl = 'url("images/Public/tipFail.png")';
            }
        }
    }


    $bgDiv.css({
        'position': 'absolute',
        //'top': '50%',
        //'margin-top': '-150px',
        //'margin-left': '-115px',
        //'left': '50%',
        'width': "100%",
        'height': '100%',
        'background-image': imageUrl,
        "background-repeat": 'no-repeat',
        "background-position": 'center center',
        "background-size": '100% 160px',
        'z-index': '-1'

    }).appendTo($tipsDiv)

    $(textDiv).css({
        'font-size': '18px',
        'font-family': 'Microsoft YaHei',
        'text-align': 'center',
        'color': '#fff',
        'font-weight': 'bold',
        'position': 'absolute',
        'top': '20px',
        'width': "100%",
        'height': "80px",
        'line-height': "30px",
        'white-space': 'normal',
        'word-break': 'break-all',
        'word-wrap': 'break-word',
    }).appendTo($bgDiv)

    $tipsDiv.css({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': "100%",
        'height': '160px',
        'background-color': 'transparent',
        'z-index': "9999",
        'display': 'none'
    }).appendTo($('body'));


    //显示提示信息
    $(".tipsClass").clearQueue().slideDown().delay(3 * 1000).slideUp();

    $(".tipsClass").on('click', function () {
        $(".tipsClass").clearQueue().slideDown().slideUp();
    })
}



function showTips(tips, tipsType) {
    top.showToolTip(tips, tipsType);
}

function showErrorMessage(msg) {
    var flag = 0;
    if (top._serverErrorMsg) {
        flag = 1;
    }

    top._serverErrorMsg = msg;

    if (msg) {
        if (msg.indexOf('000001') > -1) {
            //显示自定义错误信息
            top._serverErrorMsg = "";
            showTips("您输入的参数中存在非法值，系统无法处理，请重新输入再试！");
        }
        else if (msg.indexOf('After parsing a value an unexpected') > -1) {
            //显示自定义错误信息
            top._serverErrorMsg = "";
            showTips("您输入的值中存在非法字符");
        }
        else {

            var ErrorMsgUrl = top.mWebURL + 'ErrorMsg.aspx';


            if (top.mIsDebug && top.mIsDebug == "1") {
                //显示错误详细信息
                showDialog('错误信息', ErrorMsgUrl, 550, 450, function (returnValue) {
                    top._serverErrorMsg = "";
                });
                //if (flag == 1) {
                //    top.dialogOp.updateUrl(ErrorMsgUrl);
                //}
                //else {
                //    showDialog('错误信息', ErrorMsgUrl, 550, 450, function (returnValue) {
                //        top._serverErrorMsg = "";
                //    });
                //}

            } else {
                top._serverErrorMsg = "";
                showTips("网络出现异常，请稍候再试");
            }
        }
    }
}


// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//格式化时间
function FormatterTime(TimeStr) {
    if (!TimeStr) {
        return "";
    }
    TimeStr = TimeStr.replace(/-/g, '/');
    var returnValue = "";
    var tempDate = new Date(TimeStr);

    var year = tempDate.getFullYear();
    var month = (tempDate.getMonth() + 1) < 10 ? "0" + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
    var date = tempDate.getDate() < 10 ? ("0" + tempDate.getDate()) : tempDate.getDate();
    var hour = tempDate.getHours() < 10 ? ("0" + tempDate.getHours()) : tempDate.getHours();
    var minutes = tempDate.getMinutes() < 10 ? ("0" + tempDate.getMinutes()) : tempDate.getMinutes();


    var currDate = new Date();
    if (tempDate.getFullYear() == currDate.getFullYear()) {
        if (tempDate.getMonth() + 1 == currDate.getMonth() + 1) {
            if (tempDate.getDate() == currDate.getDate()) {
                returnValue = "今日 ";
                returnValue += (hour + ":" + minutes);
            }
            else if (tempDate.getDate() == currDate.getDate() - 1) {
                returnValue = "昨日 ";
                returnValue += (hour + ":" + minutes);
            }
            else {
                returnValue = year + "-" + month + "-" + date;
            }
        } else {
            returnValue = year + "-" + month + "-" + date;
        }
    }
    else {
        returnValue = year + "-" + month + "-" + date;
    }

    return returnValue;
}


//自定义checkbox
(function ($) {

    var _plugin = "custom_Checkbox";


    var $span = $("<span class='preloadCKimg'></span>");

    function init(obj) {
        $(obj).addClass(_plugin);


        var opts = $(obj).data();

        if (opts.checked == true) {//默认是否选中
            $(obj).addClass("checked");
            obj.checked = true;
        }

        $(obj).on("click", function () {
            toggle(this);
        })
    }

    function toggle(obj) {

        var state = $.data(obj, _plugin);
        var options = state.options;

        var flag = $(obj).hasClass("checked");

        if (options.onClick) {
            options.onClick.apply(obj, [flag]);
        }

        var name = $(obj).data().name;
        var val = $(obj).data().value;

        if (flag) {
            unCheck([obj]);
        }
        else {
            check([obj]);
        }

    }

    function check(obj) {

        if ($span) {
            $span.remove();
            $span = null;
        }


        $.each(obj, function (i) {

            if (!$(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;

                $(this).addClass("checked");

                this.checked = true;

                if (options.onCheck) {

                    //如果有必选验证，选中的时候销毁提示框  lijj 2017-7-5
                    //begin 
                    var $parentObj = $(this).parent(".span-invalid");
                    if ($parentObj.length > 0) {
                        $parentObj.css({ "border": "1px solid #fff", "background-color": "#ffffff" });
                        $parentObj.tooltip("destroy");
                    }
                    //end

                    options.onCheck.apply(obj, [true, $(this).data().name]);
                }
            }

        })

    }


    function unCheck(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();
            var bl = state.checked;//默认是否选中

            if ($(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;
                var isuncheck = $(this).data("isuncheck");
                if (isuncheck == false) { return; }

                $(this).removeClass("checked");

                this.checked = false;

                if (options.onUnCheck) {

                    //如果有必选验证，取消选中的时候验证选中项是否为0，如果为0,启用提示信息  lijj 2017-7-5
                    //begin 
                    var $parentObj = $(this).parent(".span-invalid");
                    var $checkCheckboxObj = $(this).parent(".span-invalid").find(".custom_Checkbox").custom_Checkbox("getChecked");
                    if ($parentObj.length > 0 && $checkCheckboxObj.length == 0) {
                        var opts = parseOptions($parentObj);
                        $parentObj.css({ "border": "1px solid #ff0000", "background-color": "#fff3f3" });
                        $parentObj.tooltip({
                            position: opts.tipPosition,
                            content: '<span style="color:#000">' + opts.missingMessage + '</span>',
                            onShow: function () {
                                $(this).tooltip('tip').css({ backgroundColor: '#ffffcc', borderColor: '#cc9933' });
                            }
                        });


                    }
                    //end 
                    options.onUnCheck.apply(obj, [false, $(this).data().name]);
                }
            }
        })

    }


    function clear(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var bl = state.checked;//默认是否选中

            if (bl) {
                $(this).addClass("checked");
                this.checked = true;
            }
            else {
                $(this).removeClass("checked");
                this.checked = false;
            }

        })
    }


    function getChecked(obj) {

        var vals = $.map($(obj.selector + ".checked"), function (item, index) {
            var state = $(item).data();
            return { name: state.name, value: state.value, text: $(item).text(), target: item }
        })

        return vals;
    }


    $.fn[_plugin] = function (options, parm) {

        if (typeof options == 'string') {
            return $.fn[_plugin].methods[options](this, parm);
        }
        options = options || {};

        if ($span) {
            $span.appendTo("body");
        }

        return this.each(function () {
            var state = $.data(this, _plugin);
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                var _opts = $.extend({}, {}, options);
                $.data(this, _plugin, {
                    options: _opts
                });
            }
            //dosometing
            init(this);


        });

    };

    $.fn[_plugin].methods = {
        check: function (jq) {
            return check(jq);
        },
        unCheck: function (jq) {
            return unCheck(jq);
        },
        clear: function (jq) {
            return clear(jq);
        },
        getChecked: function (jq) {
            return getChecked(jq);
        }
    }

})($);



//自定义radio
(function ($) {

    var _plugin = "custom_Radio";
    var $span = $("<span class='preloadRADimg'></span>");

    function init(obj) {
        $(obj).addClass(_plugin);

        var opts = $(obj).data();

        if (opts.checked == true) {//默认是否选中
            $(obj).addClass("checked");
            obj.checked = true;
        } else {
            $(obj).removeClass("checked");
            obj.checked = false;
        }

        $(obj).on("click", function () {
            toggle(this);
        })
    }

    function toggle(obj) {
        var state = $.data(obj, _plugin);
        var options = state.options;

        var name = $(obj).data().name;
        var val = $(obj).data().value;
        var uncheck = $(obj).data().uncheck;


        var flag = $(obj).hasClass("checked");

        if (options.onClick) {
            options.onClick.apply(obj, [flag]);
        }



        if (flag && uncheck) {
            unCheck([obj]);
        }
        else {
            check([obj]);
        }
    }


    //取消选择同组radio
    function unCheckGroup(name, val) {

        var groups = $("." + _plugin + "[data-name='" + name + "']");

        $.each(groups, function () {

            var state = $(this).data();

            var _val = state.value;

            if (_val != val && $(this).hasClass("checked")) {
                $(this).removeClass("checked");
                this.checked = false;


                var state = $.data(this, _plugin);
                var options = state.options;

                var data = $(this).data();

                if (options.onUnCheck) {
                    options.onUnCheck.apply(this, [data.name, data.value]);
                }
            }

        })
    }


    function check(obj) {
        if ($span) {
            $span.remove();
            $span = null;
        }


        $.each(obj, function (i) {

            var state = $(this).data();

            var name = state.name;
            var val = state.value;
            var uncheck = state.uncheck;


            unCheckGroup(name, val);
            //xhj添加，某一项不能点击
            if ($(this).attr("data-isClick")=="false") {
                return;
            }
            if (!$(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;


                $(this).addClass("checked");

                this.checked = true;

                if (options.onCheck) {

                    //如果有必选验证，选中的时候销毁提示框  lijj 2017-7-5
                    //begin 
                    var $parentObj = $(this).parent(".span-invalid");
                    if ($parentObj.length > 0) {
                        $parentObj.css({ "border": "1px solid #fff", "background-color": "#ffffff" });
                        $parentObj.tooltip("destroy");
                    }
                    //end
                    options.onCheck.apply(obj, [name, val]);
                }
            }

        })

    }


    function unCheck(obj) {
        $.each(obj, function (i) {

            var state = $(this).data();

            var name = state.name;
            var val = state.value;

            if ($(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;

                $(this).removeClass("checked");

                this.checked = false;

                if (options.onUnCheck) {
                    options.onUnCheck.apply(obj, [name, val]);
                }
            }

        })

    }

    function clear(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var bl = state.checked;//默认是否选中

            if (bl) {
                $(this).addClass("checked");
                this.checked = true;
            }
            else {
                $(this).removeClass("checked");
                this.checked = false;
            }

        })
    }


    function getChecked(obj) {

        var vals = $.map($(obj.selector + ".checked"), function (item, index) {
            var state = $(item).data();
            return { name: state.name, value: state.value, text: $(item).text(), target: item }
        })

        return vals;
    }


    $.fn[_plugin] = function (options, parm) {

        if (typeof options == 'string') {
            return $.fn[_plugin].methods[options](this, parm);
        }
        options = options || {};

        if ($span) {
            $span.appendTo("body");
        }

        return this.each(function () {
            var state = $.data(this, _plugin);
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                var _opts = $.extend({}, {}, options);
                $.data(this, _plugin, {
                    options: _opts
                });
            }
            //dosometing
            init(this);


        });

    };

    $.fn[_plugin].methods = {
        check: function (jq) {
            return check(jq);
        },
        unCheck: function (jq) {
            return unCheck(jq);
        },
        clear: function (jq) {
            return clear(jq);
        },
        getChecked: function (jq) {
            return getChecked(jq);
        }
    }

})($);


//*经纬度格式转换*//
var convert_jwd = new function () {

    function formatter_dfm(val) {
        var rv = val;

        if (rv) {

            var d = ~~rv;

            var f = ~~((rv - d) * 60);

            var m = (((rv - d) * 60) - f) * 60;

            return { d: d, f: f, m: m };
        }
        return { d: "", f: "", m: "" }
    }


    this.formatter_dfm = function (val) {
        return formatter_dfm(val);
    }

    function formatter_d(d, f, m) {
        var returnVal = Number(d) + Number(f / 60) + Number(m / 3600);
        return returnVal;
    }

    this.formatter_d = function (d, f, m) {
        return formatter_d(d, f, m);
    }

}
//*经纬度格式转换^^^^^^^^^^^^^^^^^^^*//

function OPTypeConverDispaly(optype) {
    if (optype == "edit") {
        return "修改";
    } else {
        return "新增";
    }
}

//datagrid 线调整
function ChangeGridBorder(grid, lineType) {
    var cssName = "lines-both";
    if (lineType == "both") {
        cssName = "lines-both";
    } else if (lineType == "no") {
        cssName = "lines-no";
    }
    else if (lineType == "right") {
        cssName = "lines-right";
    }
    else if (lineType == "bottom") {
        cssName = "lines-bottom";
    }
    $('#' + grid).datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom').addClass(cssName);
}

function RowPosition(gridid, data_id, rulefiled) {
    var rows = $("#" + gridid).datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        var rowItem = rows[i];
        for (var key in rowItem) {
            if (key == rulefiled) {
                if (rowItem[key] == data_id) {
                    $("#" + gridid).datagrid('selectRow', i);
                    return;
                }
            }
        }
    }
}


//* 去掉字符串中的特殊字符 
// */  
function excludeSpecial(s) {

    s = s.replace(/'/g, '’');
    s = s.replace(/""/g, '“”');
    s = s.replace(/"/g, '”');
    return s;
};

function valueReplace(v) {
    v = v.toString().replace(new RegExp('(["\"])', 'g'), "\\\"");
    return v;
}

/**
    * EasyUI DataGrid根据字段动态合并单元格
    * param tableID 要合并table的id
    * param colList 要合并的列,用逗号分隔(例如："name,department,office");
    * param mainColIndex 要合并的主列索引
    */
function mergeCellsByField(tableID, colList, mainColIndex) {
    var ColArray = colList.split(",");
    var tTable = $('#' + tableID);
    var TableRowCnts = tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    for (var i = 0; i <= TableRowCnts ; i++) {
        if (i == TableRowCnts) {
            CurTxt = "";
        }
        else {
            CurTxt = tTable.datagrid("getRows")[i][ColArray[mainColIndex]];
        }
        if (PerTxt == CurTxt) {
            tmpA += 1;
        }
        else {
            tmpB += tmpA;
            for (var j = 0; j < ColArray.length; j++) {
                tTable.datagrid('mergeCells', {
                    index: i - tmpA,
                    field: ColArray[j],
                    rowspan: tmpA,
                    colspan: null
                });
            }
            tmpA = 1;
        }
        PerTxt = CurTxt;
    }
}


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

//*********阿拉伯数字转换成中文
function NumberToChinese(str) {
    var res = "";
    var schar = str.substring(0, 1);
    switch (schar) {
        case "1":
            res = "一";
            break;
        case "2":
            res = "二";
            break;
        case "3":
            res = "三";
            break;
        case "4":
            res = "四";
            break;
        case "5":
            res = "五";
            break;
        case "6":
            res = "六";
            break;
        case "7":
            res = "七";
            break;
        case "8":
            res = "八";
            break;
        case "9":
            res = "九";
            break;
        default:
            res = "零";
            break;
    }
    if (str.length > 1) {
        switch (str.length) {
            case 2:
            case 6:
                res += "十";
                break;
            case 3:
            case 7:
                res += "百";
                break;
            case 4:
                res += "千";
                break;
            case 5:
                res += "万";
                break;
            default:
                res += "";
                break;
        }
        res += NumberToChinese(str.substring(str.length - 1));
    }
    return res;
}

//自定义tab选项卡初始化
var tabs = new function () {

    this.init = function () {
        $(".jokeep-panels").height($(".jokeep-tabs").height() - $(".title").height() + "px");
        $(".tabs-option").on("click", function () {
            $(".tabs-option").removeClass("tabs-option-select");
            $(".jokeep-panel").css("display", "none");
            $(this).addClass("tabs-option-select");
            var $Index = $(".tabs-option").index($(this));
            $(".jokeep-panel").eq($Index).css("display", "block");
        })
        $(window).resize(function () {
            $(".jokeep-panels").height($(".jokeep-tabs").height() - $(".title").height() + "px");
        })
    }
}

//按钮组
$.fn.buttonGroup = function (options) {

    return this.each(function () {

        var opts = options || {};

        //dosometing
        var $btns = $(this).find(".item");
        $btns.on("click", function () {
            if (!$(this)[0].classList.contains("selected")) {
                $btns.removeClass("selected");
                $(this).addClass("selected");
                var index = $btns.index(this);

                if (typeof opts.onSelect === "function") {
                    opts.onSelect.call(this, index + "");
                }
            }
        })


    });
}


function getBrowserInfo() {
    var ua = navigator.userAgent.toLocaleLowerCase();
    var browserType = null;
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = "IE";
        browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
    } else if (ua.match(/firefox/) != null) {
        browserType = "火狐";
    } else if (ua.match(/ubrowser/) != null) {
        browserType = "UC";
    } else if (ua.match(/opera/) != null) {
        browserType = "欧朋";
    } else if (ua.match(/bidubrowser/) != null) {
        browserType = "百度";
    } else if (ua.match(/metasr/) != null) {
        browserType = "搜狗";
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browserType = "QQ";
    } else if (ua.match(/maxthon/) != null) {
        browserType = "遨游";
    } else if (ua.match(/chrome/) != null) {
        var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
        function _mime(option, value) {
            var mimeTypes = navigator.mimeTypes;
            for (var mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {
                    return true;
                }
            }
            return false;
        }
        if (is360) {
            browserType = '360';
        }
    } else if (ua.match(/safari/) != null) {
        browserType = "Safari";
    }
    return browserType;
}



/**
 * add by cgh
 * 针对panel window dialog三个组件拖动时会超出父级元素的修正
 * 如果父级元素的overflow属性为hidden，则修复上下左右个方向
 * 如果父级元素的overflow属性为非hidden，则只修复上左两个方向
 * @param left
 * @param top
 * @returns
 */
//var easyuiPanelOnMove = function (left, top) {
//    var parentObj = $(this).panel('panel').parent();
//    if (left < 0) {
//        $(this).window('move', {
//            left: 1
//        });
//    }
//    if (top < 0) {
//        $(this).window('move', {
//            top: 1
//        });
//    }
//    var width = $(this).panel('options').width;
//    var height = $(this).panel('options').height;
//    var right = left + width;
//    var buttom = top + height;
//    var parentWidth = parentObj.width();
//    var parentHeight = parentObj.height();
//    if (parentObj.css("overflow") == "hidden") {
//        if (left > parentWidth - width) {
//            $(this).window('move', {
//                "left": parentWidth - width
//            });
//        }
//        if (top > parentHeight - height) {
//            $(this).window('move', {
//                "top": parentHeight - height
//            });
//        }
//    }
//};
//$(function () {
//    try {
//        $.fn.panel.defaults.onMove = easyuiPanelOnMove;
//        $.fn.window.defaults.onMove = easyuiPanelOnMove;
//        $.fn.dialog.defaults.onMove = easyuiPanelOnMove;
//    } catch (e) {

//    }
//})

//滚动条
function InitScroll(obj, isShowHor) {
    if (!isShowHor) { isShowHor = false; }

    try {
        //debugger;
        $(obj).niceScroll({
            cursorcolor: "#DBDBDB",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "7px", //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            cursorborderradius: "5px",//以像素为光标边界半径
            autohidemode: false,//是否隐藏滚动条
            horizrailenabled: isShowHor,
            background: "#F5F5F5"
        });
        $(obj).getNiceScroll().hide();

        $(obj).getNiceScroll().show();
        $(obj).getNiceScroll().resize();

    } catch (e) {

    }

}