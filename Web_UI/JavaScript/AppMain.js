


var PLSSOProxy = mPlatformSSOUrl + 'Service.asmx';//SSO服务地址
var StorageWcfProxy = mWcfURL + "StorageService.svc"; //文书服务地址
var SysWcfProxy = mWcfURL + "SysService.svc"; //文书服务地址
var TaskWcfProxy = mWcfURL + "TaskService.svc"; //指派任务服务地址
var FrameWcfProxy = mWcfURL + "FrameService.svc";
var BaseWcfProxy = mWcfURL + "BaseService.svc"; //指派任务服务地址
var AirObjectWcfProxy = mWcfURL + "AirObjectService.svc";
var AssessWcfProxy = mWcfURL + "AssessService.svc"; //绩效考核服务地址
var MeshWcfProxy = mWcfURL + "MeshService.svc";//网格体系地址
var MapWcfProxy = mWcfURL + "MapService.svc";//网格体系地址
var StatisticsWcfProxy = mWcfURL + "StatisticsService.svc";//统计分析地址
var SpecialWcfProxy = mWcfURL + "SpecialService.svc"; //专项任务服务地址
var ProblemAnalysisWcfProxy = mWcfURL + "ProblemAnalysisService.svc"; //问题分析服务地址


//主框架数据初始化

var UserItem = {
    F_USERID: "",                    //用户ID
    F_ACCOUNTCODE: "",                 //用户帐号
    F_USERNAME: "",                 //用户名称
    F_SEX: "",                      //性别 （男；女）,直接存名称字符
    F_USERHEADURI: "",               //头像
    F_MAINUNITID: "",            //主单位ID
    F_UNITFULLNAME: "",         //主单位全称
    F_UNITSORTNAME: "",      //主单位简称
    F_DEPARTMENTID: "",           //主部门ID
    F_DEPARTMENTNAME: "",         //主部门名称
    F_POSITIONID: "",                 //岗位ID
    F_POSITIONNAME: "",               //岗位名称
    F_DIVISIONCODE: "",               //行政区划编码
    F_DIVISIONNAME: "",                //行政区划名称
    F_UNITLEVEL: "",//单位级别（0省厅，1市级，2区县）
    F_ENFORCODE: "",
    F_AIRPOWER: "0",   //知识库操作权限 1：可操作， 0：不可操作  
    F_JXPOWER: "0",   //绩效考核操作权限 1：可操作， 0：不可操作
    F_AQIDATA: '0',
    F_ATMOSPHEREAUDITOR: '',//是否是大气办审核人员 0否1是
    F_USERTYPE: '',//用户类型（1大气办人员；2环督办人员；3调度员；4其它）
    F_UNITNATURE: '',//单位性质(0环保局；1外协单位；2乡镇街道)
    F_CURRENTTIME:''//获取系统当前时间 
};//用户信息

var UserMenuTable = [];
var UserShortcutTable = [];
var mEncryptKey = $("#hidEncryptKey").val();
var mTokenID = $("#hidTokenID").val();

CryptoData_Class.setKey(mEncryptKey);

//****解密
function decrypt(dataSource) {
    return CryptoData_Class.decrypt(dataSource)
}

//****加密
function encrypt(dataSource) {
    return CryptoData_Class.encrypt(dataSource);
}



//iframe 相关控制方法
var iframeControl = {
    formatter: function (iframeStr, isshowloading) {

        isshowloading = true;
        if (isshowloading) {
            top.showloading();
            return iframeStr;
        }
        //if (isshowloading == false) {
        //    return iframeStr;
        //}

        //var content = "";

        //var mask = "<div class='iframe-loading-modal'></div>";
        //var text = "<div class='iframe-loading-text'>" + "数据加载中，请稍候..." + "</div>";

        //var loadingMsg = mask + text;

        //content = loadingMsg + iframeStr;

        //return content;

    },
    onload: function (iframe) {
        //   hideloading();
        setTimeout(function () {
            top.hideloading();
            //var obj = $(iframe).parent();
            //$(obj).find(".iframe-loading-modal").remove();
            //$(obj).find(".iframe-loading-text").remove();
            $(iframe).css("visibility", "visible")
        }, 600)

    },
    clear: function (iframes) {
        try {
            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                iframe.src = 'about:blank';
                iframe.contentWindow.document.write('');//清空iframe的内容
                iframe.contentWindow.close();//避免iframe内存泄漏
                iframe.removeNode();//删除iframe
            }
        } catch (e) {

        }

        try {
            CollectGarbage();//只有IE支持
        } catch (e) {

        }
    },
    checkInputChange: function (iframes) {

        iframes = iframes || [];

        var hasChanged = false;

        for (var i = 0; i < iframes.length; i++) {
            var doc = iframes[i].contentWindow;
            if (doc && !hasChanged) {
                hasChanged = doc.inputHasChanged || false;
                if (hasChanged) {
                    break;
                }
            }
        }

        return hasChanged;
    }
}

//弹出窗
var dialogOp = new function () {

    var dialogArr = [];
    var dialogData = null;
    var dialogCount = 0;

    this.showDialog = function (opts, callback) {
        var _this = this;
        dialogCount++;
        var dialog = $('<div id="_dialog' + dialogCount + '" style="overflow:hidden"></div>');

        $("body").append($(dialog));

        dialogArr.push(dialogCount);

        var iframe = "<iframe    src=\"" + opts.content + "\" onload='iframeControl.onload(this)'  frameborder='0' scrolling='auto' allowFullScreen='true' style='width: 100%; height: 100%;visibility:hidden'></iframe>";

        var iframeContent = iframeControl.formatter(iframe);

        var dialogOpts = {
            width: opts.width,
            height: opts.height,
            title: opts.title || "窗口标题",
            closed: true,
            cache: false,
            modal: true,
            shadow: true,
            content: iframeContent,
            onBeforeClose: function () {
                var iframes = $("#_dialog" + dialogArr[dialogArr.length - 1]).find("iframe");

                var hasChanged = iframeControl.checkInputChange(iframes);

                if (hasChanged && (!dialogData || dialogData === "cancel")) {

                    var bl = confirm("系统监测到您输入了数据，关闭窗口会导致数据丢失，确认关闭？");

                    return bl;
                }
                if (opts.CloseSaveData) {
                    dialogData = $(this).find("iframe")[0].contentWindow.ReturnData;

                }

            },
            onClose: function () {
                var iframes = $("#_dialog" + dialogArr[dialogArr.length - 1]).find("iframe");

                iframeControl.clear(iframes);

                $("#_dialog" + dialogArr[dialogArr.length - 1]).dialog("destroy");
                $(dialogArr[dialogArr.length - 1]).remove();
                var tempIndex = $.inArray(dialogArr[dialogArr.length - 1], dialogArr);
                dialogArr.splice(tempIndex, 1);

                if (callback) {
                    try {
                        callback(dialogData);
                    } catch (e) { }
                };
                dialogData = null;

            }
        }


        $("#_dialog" + dialogCount).dialog(dialogOpts).dialog("open");
    }

    this.closeDialog = function (result) {
        dialogData = result;
        $("#_dialog" + dialogArr[dialogArr.length - 1]).dialog("close");
    }

    this.setTitle = function (title) {
        $("#_dialog" + dialogArr[dialogArr.length - 1]).dialog("setTitle", title);
    }

    this.getOptions = function () {
        var opts = $("#_dialog" + dialogArr[dialogArr.length - 1]).dialog("options");
        return opts;
    }

    this.updateUrl = function (src) {
        var iframes = $("#_dialog" + dialogArr[dialogArr.length - 1]).find("iframe");
        $(iframes[0]).attr("src", src)
    }
}


//文件上传窗口
var windowOperate = function (opts) {
    var _d = opts.distance;
    var _rd = {};
    if (_d) {
        _rd.hide = _d.hide || 20;
        _rd.show = _d.show || 20;
    }
    else {
        _rd.hide = 20;
        _rd.show = 20;
    }

    var _this = this;
    var _opts = {
        container: opts.container,
        panel: opts.panel,
        distance: _rd,
        speed: opts.speed || 500
    };

    var container = _opts.container;
    var panel = _opts.panel;
    var distance = _opts.distance;
    var speed = _opts.speed;

    var init = function () {
        $(panel).css({
            position: function () {
                if (container) {
                    return "relative;"
                }
                else {
                    return "absolute"
                }
            },
            display: "none"
        }).appendTo(document.body);

        $(panel).find(".toolBar .close").bind("click", function () {
            _this.hide();
        })
    }

    this.Toggle = function () {
        var _this = this;
        var isHide = $(panel).is(":hidden");

        if (isHide) {
            _this.show();
        }
        else {
            _this.hide();
        }
    }



    function addMask() {

        $("<div>", {
            "class": "uploading_mask",
            style: "position:absolute;left:0;top:0;z-index:9996;width:100%;height:100%;background-color:#ccc;opacity:0.4;filter:alpha(opacity=40)",//transparent
            text: "",
            click: function () {
                // _this.hide();
            }
        }).appendTo("body");
    }

    function removeMask() {
        $(".uploading_mask").remove();
    }

    this.show = function () {
        addMask();
        $(panel).css({
            left: "50%",
            marginLeft: (-$(panel).width() / 2) + "px",
            top: "50%",
            marginTop: (-$(panel).height() / 2 - 40) + "px"
        })

        $(panel).animate({
            top: "+=" + distance.show + "px", opacity: 'show'
        }, speed, function () {
        });
        return this;
    }

    this.hide = function () {
        $(panel).animate({
            top: "-=" + distance.hide + "px", opacity: 'hide'
        }, speed, function () {
            $(panel).css({
                top: 20
            })
        });

        removeMask()
    }
    init();
    return this;
}
var uploadingWindow = new function () {

    var $fileInfo,
       $progress,
       $fileCount,
       $fileSize,
       $successCount,
       $failedCount,
       $percentageBar,
       $percentageText;

    var _winpanel = null;

    function formatterSize(size, pointLength, units) {

        var unit;

        units = units || ['B', 'K', 'M', 'G', 'TB'];

        while ((unit = units.shift()) && size > 1024) {
            size = size / 1024;
        }

        return (unit === 'B' ? size : size.toFixed(pointLength || 2)) +
                unit;
    }

    function createFileList(files) {

        var itemArr = [];
        for (var i = 0; i < files.length; i++) {

            itemArr.push('<div class="uploading_list_item" id="' + files[i].id + '">');

            itemArr.push('<div class="uploading_list_item_column item_column_1"><span class="file_icon"></span><span class="file_name">' + files[i].name + '</span></div>');
            itemArr.push('<div class="uploading_list_item_column item_column_2"><span class="file_size">' + formatterSize(files[i].size) + '</span></div>');
            itemArr.push('<div class="uploading_list_item_column item_column_3"><div class="progressBar">');
            itemArr.push('<span class="text">0%</span>');
            itemArr.push('<span class="percentage"></span>');
            itemArr.push('</div></div>');

            itemArr.push('<div class="uploading_list_item_column item_column_4"><span class="tool_btn delete">删除</span></div>');


            itemArr.push('</div>');
        }

        return itemArr.join('');
    }



    this.show = function (files, uploader) {

        var _this = this;

        var uploadingWindow = [];

        var options = uploader.options;
        var autoHideWindow = options.autoHideWindow;
        var autoUpload = options.auto;

        uploadingWindow.push('<div class="uploadingWindow">');
        uploadingWindow.push('<div class="head"><span class="title">上传文件</span><span class="close"></span></div>');

        uploadingWindow.push('<div class="body">');


        uploadingWindow.push('<div class="uploading_list">');

        uploadingWindow.push(createFileList(files));


        uploadingWindow.push('</div>');

        uploadingWindow.push('</div>');


        uploadingWindow.push('<div class="toolBar">');

        if (autoUpload) {
            uploadingWindow.push('<a class="tool_btn confirm">确定</a>');
        }
        else {
            uploadingWindow.push('<a class="tool_btn upload">上传</a>');
        }

        uploadingWindow.push('</div>');


        uploadingWindow.push('</div>');



        uploadingWindow = uploadingWindow.join("").toString();

        $(".uploadingWindow").remove();

        _winpanel = new windowOperate({
            panel: $(uploadingWindow)
        }).show();

        $fileInfo = $(".uploadingWindow .info"),
        $progress = $(".uploadingWindow .progressBar"),
        $tool_btns = $(".uploadingWindow .tool_btn"),

        $fileCount = $fileInfo.find(".fileCount"),
        $fileSize = $fileInfo.find(".fileSize"),
        $successCount = $fileInfo.find(".successCount"),
        $failedCount = $fileInfo.find(".failedCount"),
        $percentageBar = $progress.find(".percentage"),
        $percentageText = $progress.find(".text");



        $(".uploadingWindow .tool_btn.delete").on("click", function () {
            var fileID = $(this).parents(".uploading_list_item").attr("id");
            if (fileID) {
                uploader.removeFile(fileID);
            }
        })

        $(".uploadingWindow .tool_btn.upload").on("click", function () {
            uploader.upload();
        })


        $(".uploadingWindow .tool_btn.confirm").on("click", function () {
            _this.hide(function () {
                uploader.clearQueue()
            });
        })

        $(".uploadingWindow .head .close").on("click", function () {
            _this.hide(function () {
                uploader.clearQueue()
            });
        })

        if (autoUpload) {
            $(".uploadingWindow .tool_btn.confirm").css("display", "none");
        }
    }

    this.hide = function (callback) {

        if (_winpanel) {
            _winpanel.hide();
        }

        if (callback && typeof callback == "function") {
            callback();
        }
    };

    this.deleteFile = function (file) {
        $("#" + file.id).remove();
    }

    this.updateStatus = function (uploader) {

        var stats = uploader.getStats();

        var files = uploader.getFiles();
        var fileCount = files.length;

        var fileSize = 0;

        for (var i = 0; i < files.length; i++) {
            fileSize += files[i].size;
        }


        var successCount = stats.successNum;
        var failedCount = stats.uploadFailNum;
        $fileCount && $fileCount.text(fileCount);
        $fileSize && $fileSize.text(formatterSize(fileSize));
        $successCount && $successCount.text(successCount);
        $failedCount && $failedCount.text(failedCount);
    }

    this.updateProgress = function (file, percent) {
        $percentageBar.stop(true, true);
        $percentageBar.animate({ width: Math.round(percent * 100) + '%' }, 200, function () {
            $percentageText.text(Math.round(percent * 100) + '%');
        })
    }
}
//

//文件下载
function DownLoadFile(targetName, sourcePath) {
    var downloadPage = "DownLoad.aspx";

    var form = $("<form>");
    form.attr('style', 'display:none');
    form.attr('target', 'DownLoadIframe');
    form.attr('method', 'post');
    form.attr('action', downloadPage);

    //文件名
    var input1 = $('<input>');
    input1.attr('type', 'hidden');
    input1.attr('id', 'targetName');
    input1.attr('name', 'targetName');
    input1.attr('value', targetName);

    //文件路径
    var input2 = $('<input>');
    input2.attr('type', 'hidden');
    input2.attr('id', 'sourcePath');
    input2.attr('name', 'sourcePath');
    input2.attr('value', sourcePath);


    $('body').append(form);

    form.append(input1);
    form.append(input2);

    //提交下载
    form.submit();
    form.remove();
}
//

//文件预览
function View_File(parms) {



    var viewerPage = "Public/AttachmentManage.aspx";

    var form = $("<form>");
    form.attr('style', 'display:none');
    form.attr('target', 'public_fileView');
    form.attr('name', 'public_fileView');
    form.attr('id', 'public_fileView');
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



//选项卡
var MainTab = new function () {

    var _el = "#MainTab";

    //判断tab选项卡是否已经存在；
    //判断依据 标题、url地址如果都相同，则判定选项卡已经存在
    function tabIsExists(title, url) {


        var bl = false;


        var bl_url = false;

        var bl_title = $(_el).tabs('exists', title);

        //var tabs = $(_el).tabs('tabs');
        //   for (var i = 0; i < tabs.length; i++) {

        //       var src = $(tabs[i]).find("iframe").attr("src");


        //       if (src === url) {
        //           bl_url = true;
        //           break;
        //       }


        //   }

        //if (bl_url && bl_title) {
        //    bl = true;
        //}

        if (bl_title) {
            bl = true;
        }
        return bl;
    }

    this.addTab = function (title, url, closable, isshowloading) {
        isshowloading = true;
        var windowWidth = document.body.clientWidth;

        if (!url) {
            // showTips("功能开发中...");
            return;
        }
        var MainTab = $(_el);

        closable = closable === undefined ? true : false;
        isshowloading = isshowloading === undefined ? true : false;

        if (url.indexOf("AttrPreviewEdit") > -1) {

            var tabs = $(_el).tabs('tabs');
            var tabIndex = null;
            for (var i = 0; i < tabs.length; i++) {

                var src = $(tabs[i]).find("iframe").attr("src");
                if (src.indexOf("AttrPreviewEdit") > -1) {
                    tabIndex = i;
                    break;
                }
            }
            if (tabIndex) {
                MainTab.tabs('select', tabIndex);
                var iframe = "<iframe     src=\"" + url + "\" onload='iframeControl.onload(this)'  frameborder='0' scrolling='auto' style='width: 100%; height: 100%;visibility:hidden'></iframe>";
                var iframeContent = iframeControl.formatter(iframe, isshowloading);
                var fortitle = "";
                if (title.length >= 10 && title.indexOf('首页') == -1) {
                    fortitle = "<marquee title='" + title + "'  scrollamount='3'>" + title + "</marquee>";
                } else {
                    fortitle = title;
                }
                var tab = MainTab.tabs('getSelected');  // 获取选择的面板
                MainTab.tabs('update', {
                    tab: tab,
                    options: {
                        title: fortitle,
                        content: iframeContent
                    }
                });

            } else {
                var iframe = "<iframe     src=\"" + url + "\" onload='iframeControl.onload(this)'  frameborder='0' scrolling='auto' allowFullScreen='true' style='width: 100%; height: 100%;visibility:hidden'></iframe>";

                var iframeContent = iframeControl.formatter(iframe, isshowloading);

                var fortitle = "";
                if (title.length >= 10 && title.indexOf('首页') == -1) {
                    fortitle = "<marquee title='" + title + "'  scrollamount='3'>" + title + "</marquee>";
                } else {
                    fortitle = title;
                }
                MainTab.tabs('add', {
                    title: fortitle,
                    selected: true,
                    closable: closable,
                    bodyCls: 'overflowHide',
                    content: iframeContent
                });
            }

        } else {
            var isExist = tabIsExists(title, url);

            if (title.indexOf('首页') > 0) {
                $(".home-icon").addClass("home-iconSel");
            } else {
                $(".home-icon").removeClass("home-iconSel");
            }

            if (isExist) {
                MainTab.tabs('select', title);
                refreshiframe(url);
            }
            else {

                var iframe = "<iframe     src=\"" + url + "\" onload='iframeControl.onload(this)'  frameborder='0' scrolling='auto' allowFullScreen='true' style='width: 100%; height: 100%;visibility:hidden'></iframe>";

                var iframeContent = iframeControl.formatter(iframe, isshowloading);

                var fortitle = "";
                if (title.length >= 10 && title.indexOf('首页') == -1) {
                    fortitle = "<marquee title='" + title + "'  scrollamount='3'>" + title + "</marquee>";
                } else {
                    fortitle = title;
                }
                MainTab.tabs('add', {
                    title: fortitle,
                    selected: true,
                    closable: closable,
                    bodyCls: 'overflowHide',
                    content: iframeContent
                });
            }
        }





    }

    //递归查找iframe
    var iframesAll = [];

    function findIframe(iframe) {

        var iframeArr = $(iframe).contents().find("iframe")
        for (var i = 0; i < iframeArr.length; i++) {
            iframesAll.push(iframeArr[i]);
            findIframe(iframeArr[i]);
        }
    }


    this.onBeforeClose = function (title, index) {

        var MainTab = $(_el);

        var tab = MainTab.tabs('getTab', index);

        var iframes = $(tab).find("iframe");

        iframesAll = [];
        for (var i = 0; i < iframes.length; i++) {
            iframesAll.push(iframes[i]);
            findIframe(iframes[i]);
        }

        var hasChanged = iframeControl.checkInputChange(iframesAll);

        var bl = true;
        if (hasChanged) {
            bl = confirm("系统监测到您输入了数据，关闭页面会导致数据丢失，确认关闭？");
        }

        if (bl) {
            iframeControl.clear(iframes);
            return true;
        }
        else {
            return bl;
        }
    }

    this.onAdd = function (title, index) {

        var tabInner = $(".tabs .tabs-inner").eq(index);
        if (tabInner.width() > 120) {
            tabInner.append("<span class='textMask'></span>");
        }

    }

    //关闭当前选中面板
    this.closeAppointTab = function (title, url) {
        var MainTab = $(_el);
        var tab = MainTab.tabs('getSelected');
        var index = MainTab.tabs('getTabIndex', tab);
        MainTab.tabs('close', index);

        if (title && url) {
            top.MainTab.addTab("专项任务", "SpecialTask/SpecialTask_Manage.aspx?type=4");
        } else {
            tab = MainTab.tabs('getSelected');
            index = MainTab.tabs('getTabIndex', tab);
            var currentTtl = tab.panel("options").title

            if (index != 0 && (currentTtl.indexOf("任务待办") > -1 || currentTtl.indexOf("任务发布") > -1)) {
                refreshTab();
            }
        }

    }

    //tab项刷新
    function refreshTab() {
        //获取选择Tab英
        var refreshTab = $(_el).tabs('getSelected');
        //验证是否Iframe加载
        if (refreshTab && refreshTab.find('iframe').length > 0) {
            //获取iframe对象
            var _refresh_iframe = refreshTab.find('iframe')[0];

            //获取加载地址
            var refresh_url = _refresh_iframe.attributes.src.nodeValue;

            //释放原有iframe
            iframeControl.clear([_refresh_iframe]);

            var iframe = "<iframe    src=\"" + refresh_url + "\" onload='iframeControl.onload(this)'  frameborder='0' scrolling='auto' allowFullScreen='true' style='width: 100%; height: 100%;visibility:hidden'></iframe>";

            var iframeContent = iframeControl.formatter(iframe);

            //更新content值
            //重新加载页面
            $(_el).tabs('update', {
                tab: refreshTab,
                options: {
                    content: iframeContent
                }
            });
        }
    }

    //tab项刷新
    function refreshiframe(url) {
        //获取选择Tab英
        var refreshTab = $(_el).tabs('getSelected');
        //验证是否Iframe加载
        if (refreshTab && refreshTab.find('iframe').length > 0) {
            //获取iframe对象
            var _refresh_iframe = refreshTab.find('iframe')[0];

            //获取加载地址
            var refresh_url = url;

            //释放原有iframe
            iframeControl.clear([_refresh_iframe]);

            var iframe = "<iframe    src=\"" + refresh_url + "\" onload='iframeControl.onload(this)'  frameborder='0' scrolling='auto' allowFullScreen='true' style='width: 100%; height: 100%;visibility:hidden'></iframe>";

            var iframeContent = iframeControl.formatter(iframe);

            //更新content值
            //重新加载页面
            $(_el).tabs('update', {
                tab: refreshTab,
                options: {
                    content: iframeContent
                }
            });
        }
    }

    this.refresh = function () {

        var MainTab = $(_el);

        var tab = MainTab.tabs('getSelected');
        var index = MainTab.tabs('getTabIndex', tab);

        //if (index == 0) {

        //    refreshIndex();// refresh();
        //}
        //else {
        refreshTab();
        // }
    }

    this.close = function () {
        var MainTab = $(_el);

        var tabs = MainTab.tabs('tabs');
        var tabLength = tabs.length;

        if (tabLength < 2) {
            return;
        }
        for (var i = tabLength; i > 0; i--) {
            var index = MainTab.tabs('getTabIndex', tabs[i]);
            MainTab.tabs('close', index);
        }

        top.FileSelectTab = null;
    }

    this.onSelect = function (title, index) {
        if (index == "0") {
            $(".home-icon").addClass("home-iconSel");
        } else {
            $(".home-icon").removeClass("home-iconSel");
        }
    }

}


var headerTool = new function () {
    var userInfoPanel;
    this.init = function () {


        userInfoPanel = new dropPanel({
            container: '',
            panel: '.userInfoPanel',
            animate: {
                from: {
                    left: 0,
                    top: 30
                },
                to: {
                    left: 0,
                    top: 65
                }
            },
            blurHide: true,
            speed: 150,
            onShow: function () {
                $(".square").addClass("arrow-up");
                $(".square").removeClass("arrow");
                //$(".userInfo").addClass("active");
            },
            onHide: function () {
                $(".square").removeClass("arrow-up");
                $(".square").addClass("arrow");

                $(".userInfo").removeClass("active");
            }
        });

        $("#userInfoItem").on("click", function () {
            //$(".userInfoPanel").css("right", $(".userInfo").offset().right+ 100 + "px");

            userInfoPanel.Toggle();
        })
        $(".userInfoPanel .tool_btn").on("mouseover", function () {
            var bgUrl = "";
            if ($(this).hasClass("Setup")) {
                bgUrl = "Images/AppMain/SetupIconSel.png"
            } else if ($(this).hasClass("Cancel")) {
                bgUrl = "Images/AppMain/CancelIconSel.png"
            }
            else if ($(this).hasClass("Quit")) {
                bgUrl = "Images/AppMain/QuitIconSel.png"
            }
            $(this).css({ "color": "#2a91eb", "backgroundColor": "#000000", "backgroundImage": "url(" + bgUrl + ")" });

        }).on("mouseout", function () {
            var bgUrl = "";
            if ($(this).hasClass("Setup")) {
                bgUrl = "Images/AppMain/SetupIcon.png"
            } else if ($(this).hasClass("Cancel")) {
                bgUrl = "Images/AppMain/CancelIcon.png"
            }
            else if ($(this).hasClass("Quit")) {
                bgUrl = "Images/AppMain/QuitIcon.png"
            }
            $(this).css({ "color": "#fff", "backgroundColor": "", "backgroundImage": "url(" + bgUrl + ")" });
        })

        $(".userInfoPanel .tool_btn").eq(0).on("click", function () {
            userInfoPanel.hide();
            MainTab.addTab("个人设置", "Sys/PersonalSetting.aspx");
        })

        $(".userInfoPanel .tool_btn").eq(1).on("click", function () {
            userInfoPanel.hide();
            AppMain.logOut();
        })

        $(".userInfoPanel .tool_btn").eq(2).on("click", function () {
            userInfoPanel.hide();
            AppMain.exit();
        })

        $(".msgText").on("click", function () {
            MainTab.addTab("系统消息", "Sys/SystemMessage.aspx");
        })
        //大屏
        $(".BigScreen_msgText").on("click", function () {
            //   MainTab.addTab("系统消息", "Sys/SystemMessage.aspx");
            var viewerPage = "AirQuality/BigScreenView.aspx";
            var form = $("<form>");
            form.attr('style', 'display:none');
            form.attr('target', '_blank');
            form.attr('method', 'post');
            form.attr('action', viewerPage);
            //禁止重复开启新窗口
            form.attr('target', 'BigScreenView');
            form.attr('name', 'BigScreenView');
            form.attr('id', 'BigScreenView');
            var parms = {};

            parms.TokenID = top.mTokenID;
            parms.EncryptKey = top.mEncryptKey;

            parms.MapWcfProxy = top.MapWcfProxy;
            parms.mMapServicesUrl = top.mMapServicesUrl;
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
        })


        //大屏
        $(".BigScreen_msgText2").on("click", function () {
            var viewerPage = "Sys/BigScreen.aspx";
            var form = $("<form>");
            form.attr('style', 'display:none');
            form.attr('target', '_blank');
            form.attr('method', 'post');
            form.attr('action', viewerPage);
            //禁止重复开启新窗口
            form.attr('target', 'BigScreen');
            form.attr('name', 'BigScreen');
            form.attr('id', 'BigScreen');
            var parms = {};

            parms.TokenID = top.mTokenID;
            parms.EncryptKey = top.mEncryptKey;

            parms.MapWcfProxy = top.MapWcfProxy;
            parms.mMapServicesUrl = top.mMapServicesUrl;
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
        })
        //$(".BigScreen_msgText2").on("click", function () {
        //    MainTab.addTab("大屏", "Sys/BigScreen.aspx");
        //})
    }

}

//全局配置表数据
//格式为 配置key：配置value
//如： SysConfig={0050:"49"},通过 SysConfig["0050"] 即可取到对应值
var SysConfig = {};

//全局参数，各子页面中若需要使用框架全局参数，需将参数赋值到此，如：top.GlobalParms.EntpParms={EntpID:""}
var GlobalParms = {};

//GlobalParms = {
//    EntpAdvanceData: {//企业相关数据 分别为：关注程度  企业类型  行业类别  行政区划(所有)
//        AttentionDegree: {},
//        EnterpriseType: {},
//        IndustryType: {},
//        Division: {}
//    }
//}

function setUserInfo(data) {

    UserItem = data.UserTable[0];
    var userName = UserItem.F_USERNAME;
    $("#userHeadName").html(userName);
    $("#userName").html(userName);
    $("#userUnit").html(UserItem.F_UNITFULLNAME);
    var userHeadImg = "";
    var sex = UserItem.F_SEX;
    if (sex == "男") {
        userHeadImg = UserItem.F_USERHEADURI || "Images/AppMain/SupervisorPic.png";
    }
    else {
        userHeadImg = UserItem.F_USERHEADURI || "Images/AppMain/SupervisorPic.png";
    }
    $("#userHeadImg").attr("src", userHeadImg);
    $("#AQIDATA").text(UserItem.F_AQIDATA || "-");
    setColor(UserItem.F_AQIDATA || "-");
}

function setColor(mValue) {
    if (mValue == "—" || mValue == 0 || mValue == "-") {
        $("#AQIDATA").css({ "background-color": "#c2cabb", "color": "#000" })
    } else if (mValue > 0 && mValue <= 50) {
        $("#AQIDATA").css({ "background-color": "#43ce17", "color": "#000" })
    } else if (mValue >= 51 && mValue <= 100) {
        $("#AQIDATA").css({ "background-color": "#efdc31", "color": "#000" })
    }
    else if (mValue >= 101 && mValue <= 150) {
        $("#AQIDATA").css({ "background-color": "#ffaa00", "color": "#fff" })
    }
    else if (mValue >= 151 && mValue <= 200) {
        $("#AQIDATA").css({ "background-color": "#ff401a", "color": "#fff" })
    }
    else if (mValue >= 201 && mValue <= 300) {
        $("#AQIDATA").css({ "background-color": "#d20040", "color": "#fff" })
    }
    else if (mValue >= 301) {
        $("#AQIDATA").css({ "background-color": "#9e0049", "color": "#fff" })
    }
}

var intervalId = null;

var onlineInfo = null;

function setOnlineInfo(data) {
    onlineInfo = data.OnLineTable[0];

    //if (onlineInfo.F_ONLINECOUNT > 0) {
    //    $("#onlineCount").css("display", "inline-block");
    //    $("#onlineCount").text(onlineInfo.F_ONLINECOUNT);
    //}
    //else {
    //    $("#onlineCount").css("display", "none");
    //}
    //onlineInfo.F_UNREADMSGCOUNT
    messTooltipShow(onlineInfo.F_UNREADMSGCOUNT);
}

function messTooltipShow(F_UNREADMSGCOUNT) {
    if (F_UNREADMSGCOUNT > 0) {
        $("#msgCount").css("display", "inline-block");
        $("#msgCount").html(F_UNREADMSGCOUNT);

        if (intervalId != null) {
            window.clearInterval(intervalId);
        }
        //消息提示信息闪烁
        var type = 1;
        intervalId = setInterval(function () {
            if (type == 1) {
                //$(".msgText").css("font-size", "16px");
                //$("#msgCount").css("padding-top", "4px");
                //$("#msgCount").css("borderRadius", "30px"); //ff7e00
                //$("#msgCount").css("background-color", "#ff7e00");
                //$("#msgCount").css("top", "-10px");
                type = 2;
            } else {
                //$(".msgText").css("font-size", "14px");
                //$("#msgCount").css("padding-top", "3px");
                //$("#msgCount").css("borderRadius", "24px"); //ff7e00
                //$("#msgCount").css("background-color", "#ff0000");
                //$("#msgCount").css("top", "-10px");
                type = 1;
            }

        }, 1000);
    }
    else {

        if (intervalId != null) {

            window.clearInterval(intervalId);

            intervalId = null;

        }
        $("#msgCount").css("display", "none");
    }
}

function setMessage(data) {
    var msgs = data.MessageTable;
    var msgFiles = []; //data.MessageFilesTable;

    var msgHtml = createMsgList(msgs, msgFiles);

    $("#PopMsg").NeMsg("appendContent", msgHtml);
    $(".contentDJ").on("mouseover", function () {

        $(this).css({ "color": "#2694f3" });
        $(this).find(".contentDJ").css({ "color": "#2694f3", "text-decoration": "underline" });
        $(this).parent(".contentDJ").css({ "color": "#2694f3", "text-decoration": "underline" });
        $(this).next(".contentDJ").css({ "color": "#2694f3", "text-decoration": "underline" });
        $(this).prev(".contentDJ").css({ "color": "#2694f3", "text-decoration": "underline" });
    }).on("mouseout", function () {
        if ($(this).hasClass("contentDJ")) {
            $(this).css({ "color": "", "text-decoration": "none" });
            $(this).find(".contentDJ").css({ "color": "", "text-decoration": "none" });
            $(this).parent(".contentDJ").css({ "color": "", "text-decoration": "none" });
            $(this).next(".contentDJ").css({ "color": "", "text-decoration": "none" });
            $(this).prev(".contentDJ").css({ "color": "", "text-decoration": "none" });
        } else {
            $(this).css({ "color": "#999999", "text-decoration": "none" });
            $(this).find("span").css({ "color": "#999999", "text-decoration": "none" });
            $(this).parent("div").css({ "color": "#999999", "text-decoration": "none" });
            $(this).next(".content").css({ "color": "#999999", "text-decoration": "none" });
            $(this).prev("span").css({ "color": "#999999", "text-decoration": "none" });
        }

    })
    $(".msg_item_content").on("mouseover", function () {
        if ($(this).hasClass("contentZD")) { return; }

        if (!$(this).hasClass("contentDJ")) {
            $(this).css({ "color": "#2694f3", "text-decoration": "underline" });
            $(this).find("span").css({ "color": "#2694f3", "text-decoration": "underline" });
            $(this).parent(".div").css({ "color": "#2694f3", "text-decoration": "underline" });
            $(this).next(".content").css({ "color": "#2694f3", "text-decoration": "underline" });
            $(this).find(".content").css({ "color": "#2694f3", "text-decoration": "underline" });
            $(this).prev("span").css({ "color": "#2694f3", "text-decoration": "underline" });
        }
    }).on("mouseout", function () {
        if ($(this).hasClass("contentZD")) { return; }
        if (!$(this).hasClass("contentDJ")) {
            $(this).css({ "color": "#999999", "text-decoration": "none" });
            $(this).find("span").css({ "color": "#999999", "text-decoration": "none" });
            $(this).parent("div").css({ "color": "#999999", "text-decoration": "none" });
            $(this).next(".content").css({ "color": "#999999", "text-decoration": "none" });
            $(this).find(".content").css({ "color": "#999999", "text-decoration": "none" });
            $(this).prev("span").css({ "color": "#999999", "text-decoration": "none" });
        }

    })
    $('.msg_container .msg_body').niceScroll({
        cursorcolor: "#DBDBDB",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "7px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false,//是否隐藏滚动条
        background: "#F5F5F5"
    });
    $('.msg_container .msg_body').getNiceScroll().show();
    $('.msg_container .msg_body').getNiceScroll().resize();

    $(".msg_history").unbind("click").bind("click", function () {
        MainTab.addTab("系统消息", "Sys/SystemMessage.aspx");
    })
}

function setSysConfig(data) {
    var configs = data.SysConfig;

    for (var i = 0; i < configs.length; i++) {

        var k = configs[i].F_CONFIGKEY;
        var v = configs[i].F_CONFIGVALUE;

        SysConfig[k] = v;
    }

}

//信息列表
function createMsgList(msgs) {

    var htmlObj = [];
    for (var i = 0; i < msgs.length; i++) {

        var msgTitle = "【" + msgs[i].F_SORTNAME + "】";
        //if (msgs[i].F_MESSAGETYPE == "0") {
        //    msgTitle = "【系统消息】";
        //}


        var msgText = msgs[i].F_CONTENT;
        if (msgText.length > 100) {
            msgText = msgText.substr(0, 100) + "...";
        }

        var sendtime = FormatterTime(msgs[i].F_CREATETIME);
        var content = "";
        var title = "";
        if (msgs[i].F_WINDOWTYPE == "0") { msgs[i].F_LINKURL = ""; }
        if ($.trim(msgs[i].F_LINKURL) != "" && msgs[i].F_WINDOWTYPE != 0) {
            title = "<span class='sortname contentDJ'>" + (msgTitle) + "</span>";
            if (msgText.length > 100) {
                content = "<a class='content contentDJ'  title='" + msgs[i].F_CONTENT + "'>" + msgText + "</a>";
            }
            else {
                content = "<a class='content contentDJ'  >" + msgText + "</a>";
            }

        }
        else {
            title = "<span class='sortname contentZD'>" + (msgTitle) + "</span>";
            if (msgText.length > 100) {
                content = "<span class='content contentZD'  title='" + msgs[i].F_CONTENT + "'>" + msgText + "</span>";
            }
            else {
                content = "<span class='content contentZD' >" + msgText + "</span>";
            }
        }
        var name = "<span class='sender'>" + msgs[i].F_SENDER + "</span>";
        var time = "<span class='sendtime'>" + sendtime + "</span>";

        var msg_item_info = "<div class='msg_item_info'>" + name + time + "</div>";
        var msg_item_content = "";
        if ($.trim(msgs[i].F_LINKURL) != "" && msgs[i].F_WINDOWTYPE != 0) {
            msg_item_content = "<div class='msg_item_content contentDJ'  >" + title + content + "</div>";
        } else {
            msg_item_content = "<div class='msg_item_content contentZD' >" + title + content + "</div>";
        }


        var $msg_item = $("<div class='msg_item'>" + msg_item_content + msg_item_info + "</div>");

        $msg_item.data("msg_data", msgs[i]);

        $msg_item.on("click", "a.content", function () {
            if ($(".msg_container .msg_item").length == 1) {
                $('.msg_min').click();
            }
            var $item = $(this).parents(".msg_item");
            var itemData = $item.data("msg_data");
            //点击后标记为已读


            $(this).css({ "color": "#999999", "font-weight": "normal", "cursor": "pointer", "text-decoration": "none" });
            $(this).find(".contentDJ").css({ "color": "#999999", "font-weight": "normal", "cursor": "pointer", "text-decoration": "none" });
            $(this).parent(".contentDJ").css({ "color": "#999999", "font-weight": "normal", "cursor": "pointer", "text-decoration": "none" });
            $(this).next(".contentDJ").css({ "color": "#999999", "font-weight": "normal", "cursor": "pointer", "text-decoration": "none" });
            $(this).prev(".contentDJ").css({ "color": "#999999", "font-weight": "normal", "cursor": "pointer", "text-decoration": "none" });
            $(this).parent('.msg_item_content').next('.msg_item_info').children('span').css("color", "#999999");

            $(this).removeClass("contentDJ");
            $(this).find(".contentDJ").removeClass("contentDJ");
            $(this).parent(".contentDJ").removeClass("contentDJ");
            $(this).next(".contentDJ").removeClass("contentDJ");
            $(this).prev(".contentDJ").removeClass("contentDJ");



            MessageCountUpdate(itemData.F_MESSAGEID);

            if (itemData.F_WINDOWTYPE == 2) {//窗口类型（0无办理窗口；1 Open窗口；2模态窗口；3Web窗口）
                var winHref = itemData.F_LINKURL;
                var windowTitle = itemData.F_WINDOWTITLE || "窗口";
                var windowWidth = 1000;

                var windowHeight = 600;
                //人员审核
                if (itemData.F_LINKURL.indexOf('CheckUserChange_Edit') > -1) {
                    windowWidth = 850;
                    var windowHeight = 470;
                }
                var BusinessCode = itemData.F_BUSSYSTEMID;//业务系统ID
                showDialog(windowTitle, winHref, windowWidth, windowHeight, function (returnValue) {
                    if (returnValue != "cancel") {

                    }
                });
            } else if (itemData.F_WINDOWTYPE == 1) {
                //if (itemData.F_LINKURL.indexOf('Task_Manage') > -1)
                //{
                //    var tmpUrl="";
                //    if (itemData.F_LINKURL.indexOf('?') > -1) {
                //        tmpUrl = "F_JOBID=" + itemData.F_DATAGUID;
                //    } else {
                //        tmpUrl = "?F_JOBID=" + itemData.F_DATAGUID;
                //    }
                //    itemData.F_LINKURL = itemData.F_LINKURL + tmpUrl;
                //}
                MainTab.addTab(itemData.F_WINDOWTITLE, itemData.F_LINKURL);

            }
        })
        htmlObj.push($msg_item);



    }

    if (htmlObj.length == 0) {
        return null;
    }

    return htmlObj;
}

var AppMain = new function () {

    function init() {

        $("#PopMsg").NeMsg({ title: "系统消息" });

        headerTool.init();

        $("#btn_gridList_2").on("click", function () {
            $(this).addClass();
            $("#gridList_2").slideToggle("fast", function () {


                var flag = $(this).is(":visible");

                if (flag) {
                    $("#btn_gridList_2 .arrow").removeClass("down").addClass("up");
                }
                else {
                    $("#btn_gridList_2 .arrow").removeClass("up").addClass("down");

                }
            });
        })


        $(window).bind("beforeunload", function () {

            var iframes = $("iframe")
            var hasChanged = iframeControl.checkInputChange(iframes);

            if (hasChanged) {
                return "现在退出系统有可能使您丢失当前已输入的数据，是否退出？";
            }
        })
    }

    init();

    function Logout(callback) {

        var parms = {
            TokenID: $("#hidTokenID").val(),
            F_UserID: top.UserItem.F_USERID
        }
        $.ajax({
            url: PLSSOProxy + "/LoginOut",
            type: "POST",
            contentType: "application/json;utf-8",
            data: JSON.stringify(parms),
            dataType: "json",
            success: function (returnValue) {
                if (callback) {
                    callback();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThown) {
                window.location.href = "Login.aspx";
            }
        });

    }

    //注销 并转到登陆界面
    this.logOut = function () {
        $.messager.confirm('提示', '确定注销吗？', function (r) {
            if (r) {
                Logout(function () {
                    window.location.href = "Login.aspx";
                });
            }
        });
    }

    //退出系统 并关闭页面
    this.exit = function () {

        $.messager.confirm('提示', '确定退出系统吗？', function (r) {
            if (r) {
                Logout(function () {

                    var browserName = navigator.appName;
                    if (browserName == "Netscape") {  //谷歌浏览器
                        window.open('', '_self', ''); //老版
                        open(location, '_self').close(); //新版
                        window.close();
                    } else {
                        window.close(); //IE
                    }
                });
            }
        });
    }
}

function init_Data() {

    var parms = {
        F_UserID: $("#hidUserID").val()
    }

    var parameter = "";

    parameter = PostGetParamterConvert(JSON.stringify(parms));

    $.ajax({
        url: SysWcfProxy + "/Frame_GetMainData",
        type: "POST",
        contentType: "text/json",
        data: parameter,
        dataType: "json",
        loadingMsg: "",
        autoShowloading: true,
        autoHideloading: true,
        success: function (returnValue) {

            var returnResult = JSON.parse(top.decrypt(returnValue));
            if (returnResult.ErrorCode == 0) {
                var returnData = JSON.parse(returnResult.Result);
                setUserInfo(returnData);

                setOnlineInfo(returnData)

                //setMainMenu(returnData);

                NEMenuList(returnData, function () {

                    var menuItem = $(".NeMenu .navItem");

                    //if (menuItem.length > 0) {


                    //    for (var i = 0; i < menuItem.length; i++) {

                    //        if ($(menuItem[i]).find("ul li").length == 0) {
                    //            var title = $(menuItem[i]).data("name") || "";
                    //            var href = $(menuItem[i]).data("url") || "";
                    //            if (href == "") { continue; }
                    //            MainTab.addTab(title, href);
                    //            break;
                    //        } else {
                    //            var subMenu = $(menuItem[i]).find("ul li");
                    //            var title = $(subMenu[0]).data("name") || "";
                    //            var href = $(subMenu[0]).data("url") || "";
                    //            MainTab.addTab(title, href);
                    //            break;
                    //        }
                    //    }
                    //}
                    MainTab.addTab("首页", "Sys/Index.aspx", false);
                });

                setMessage(returnData);

                ////启动刷新处理
                refresh_start();




            } else if (returnResult.ErrorCode == 1) {

            }


            //初始加载首页
            //   MainTab.addTab("<span class='home-icon home-iconSel'>首页</span>", "SystemIndex.aspx", false, false);



        }
    });

}

function refresh_start() {
    setTimeout(function () {
        refresh(function () { refresh_start() });
    }, 30000)
}

function refresh(callback) {

    var parms = {
        F_UserID: $("#hidUserID").val()
    }

    var parameter = "";

    parameter = PostGetParamterConvert(JSON.stringify(parms));

    $.ajax({
        url: SysWcfProxy + "/Frame_OnLineRefresh",
        type: "POST",
        contentType: "text/json",
        data: parameter,
        dataType: "json",
        loadingMsg: "",
        autoShowloading: false,
        autoHideloading: false,
        success: function (returnValue) {
            var returnResult = JSON.parse(top.decrypt(returnValue));
            if (returnResult.ErrorCode == 0) {
                var returnData = JSON.parse(returnResult.Result);

                if (callback) {
                    callback();
                }

                var returnData = JSON.parse(returnResult.Result);

                setOnlineInfo(returnData)

                setMessage(returnData);
            } else {
                alert(returnResult.ErrorMsg);
                window.location.href = "Login.aspx";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThown) {

            if (callback) {
                callback();
            }

        }
    });


}


function refreshIndex() {

    var _el = "#MainTab";

    //刷新主框架页面抽数
    //refresh();

    //MainTab.addTab("<span class='home-icon home-iconSel'>首页</span>", "SystemIndex.aspx", false, false);

    //获取选择Tab项
    var refreshTab = $(_el).tabs('getSelected');


    //验证是否Iframe加载
    if (refreshTab && refreshTab.find('iframe').length > 0) {
        //获取iframe对象
        var _refresh_iframe = refreshTab.find('iframe')[0];

        try {
            //调用系统首页中的LoadData方法实现数据刷新
            _refresh_iframe.contentWindow.LoadData("");
            //
        } catch (e) {

        }

    }

}


function getMainSelectTabIndex() {
    var tab = $('#MainTab').tabs('getSelected');
    //var index = $('#MainTab').tabs('getTabIndex', tab);
    return $(tab[0]).find('iframe')[0].src;
}


//更新消息状态
function MessageCountUpdate(mF_MESSAGEID) {
    var newParsmts = {
        F_MESSAGEID: mF_MESSAGEID,
        F_USERID: $("#hidUserID").val()
    }

    var parameter = "";
    parameter = PostGetParamterConvert(JSON.stringify(newParsmts));
    $.ajax({
        url: SysWcfProxy + "/SystemMessage_UpdateMsgRead",
        type: "POST",
        contentType: "text/json",
        data: parameter,
        dataType: "json",
        loadingMsg: "",
        autoShowloading: false,
        autoHideloading: false,
        success: function (returnValue) {
            var returnResult = JSON.parse(top.decrypt(returnValue));
            messTooltipShow(returnResult.Result);

        },
        error: function (XMLHttpRequest, textStatus, errorThown) {

        }
    });
}

var NEMenuList = function (data, callback) {


    var MenuData = data.MenuTable;
    if (MenuData.length == 0 || MenuData == null) { return }

    var container = $("#menuNav");
    var CanHide = true;

    var isZsk = false;

    this.createEls = function (callback) {
        var menuEls = [];
        var subMenuEls = [];
        var menuUl = $("<ul class='NeMenu'></ul>");
        for (var i = 0; i < MenuData.length; i++) {
            if (MenuData[i].F_PARENTNODEID == "") {

                var name = MenuData[i].F_MENUNAME;
                var url = MenuData[i].F_URL;
                var width = 78;
                if (MenuData[i].F_MENUID == "50000" || MenuData[i].F_MENUID == "60000") {

                    if (isZsk) {
                        continue;
                    } else {
                        isZsk = true;
                        name = name.substring(0, 3);
                        width = 65;
                    }
                }
                var menuItem = $("<li class='NeMenuItem navItem' data-id='" + MenuData[i].F_MENUCODE + "' style='width:" + width + "px' data-name='" + name + "' data-url='" + url + "'><span>" + name + "</span></li>");
                var newMenus = $.extend([], MenuData);
                var subMenuHtml = this.createSubMenu(newMenus, MenuData[i].F_MENUCODE);
                if (subMenuHtml != null) {
                    subMenuEls.push(subMenuHtml);
                    $(menuItem).append($(subMenuHtml));
                }

                $(menuItem).data(MenuData[i]);
                menuEls.push($(menuItem));
            }

        }


        menuEls.push($("<div style='clear: both;'></div>"));

        $(menuUl).append(menuEls);

        $(container).append($(menuUl));

        var navWidth = 0;
        $(".NeMenu .navItem").each(function () {

            navWidth += parseFloat($(this).width());
        });
        $(".NeMenu").css("width", navWidth + "px");

        if (callback) { callback() }
    }

    this.createSubMenu = function (menuData, menuID) {
        var subMenuData = menuData;
        var menuEls = [];
        var DownList = $("<ul class='NEsubMenu subMenu'  data-id='" + menuID + "'></ul>");

        for (var i = 0; i < subMenuData.length; i++) {
            if (!subMenuData[i]) { continue; }
            if (menuID == subMenuData[i].F_PARENTNODEID) {

                var item = undefined;
                var name = subMenuData[i].F_MENUNAME;
                var url = subMenuData[i].F_URL;
                item = $("<li data-name='" + name + "' data-url='" + url + "'>" + subMenuData[i].F_MENUNAME + "</li>");


                $(item).data(subMenuData[i]);

                menuEls.push($(item));
            }
        }
        $(DownList).append(menuEls);
        return DownList;
    }

    this.addItemEvent = function () {
        var _NEMenuList = this;
        var timeout = null;
        $(".NeMenu>li").bind("mouseover", function () {

            if (timeout) clearTimeout(timeout);
            var pos = $(this).position();
            $(".cloneMenu").remove();

            $(this).find("ul").eq(0).clone(true).css({
                position: "absolute",
                left: pos.left,
                top: 52
            }).addClass("cloneMenu").appendTo("body").show();

        }).bind("mouseleave", function () {
            timeout = setTimeout(function () {
                if (CanHide)
                    $(".subMenu").hide();
            }, 500)

        })

        $(".NeMenu .subMenu li").bind("mouseover", function () {

            CanHide = false;
            var pos = $(this).position();
            $(this).find("ul").css({
                position: "absolute",
                left: $(this).width(),
                top: -1
            }).show();
            $(".navItem[data-id='" + $(this).parent().attr("data-id") + "']").css("background-color", "#012848");


        }).bind("mouseleave", function () {
            $(this).find("ul").hide();
            CanHide = true;
            $(".navItem[data-id='" + $(this).parent().attr("data-id") + "']").css("background-color", "");

        })

        //$(".subMenu").bind("mouseleave", function () {
        //    $(this).find("ul").show();
        //    CanHide = false;
        //    //$(".navItem[data-id='" + $(this).attr("data-id")+ "']").css("background-color", "#012848");

        //})
        $(".subMenu").bind("mouseleave", function () {
            $(this).hide()
            CanHide = true;
            $(".navItem[data-id='" + $(this).attr("data-id") + "']").css("background-color", "");
        })

        $(".NeMenu>li,.subMenu>li").bind("click", function (e) {
            e.stopPropagation();
            if ($(this).find("ul li").length == 0) {
                var title = $(this).data("name") || "";
                var href = $(this).data("url") || "";
                if (href == "Assess/TownSelfAssess_List.aspx") {//考核自评 镇（街）
                    //如果登录人为区县
                    if (UserItem.F_UNITNATURE == "1") {
                        href = "Assess/CountySelfAssess_List.aspx";
                    }
                }
                if (href == "Assess/TownAssessByCountry_List.aspx") {//审核评分 区县对镇（街）
                    //如果登录人是大气办
                    if (UserItem.F_ATMOSPHEREAUDITOR == "1") {
                        href = "Assess/AtmosphereAssess_List.aspx";
                    }
                }
                MainTab.addTab(title, href);

            }

        })

    }
    this.createEls(callback);

    this.addItemEvent();

}

//加载初始数据
$(function () {
    init_Data();

})



