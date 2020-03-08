
//公共 文件管理插件

var FilesManager = function (opts) {

    //查询数据 服务接口
    var wcfServices_Filter = top.StorageWcfProxy + "/App_AmanType_Filter";

    //新增数据 服务接口
    var wcfServices_Insert = top.StorageWcfProxy + "/App_AmanFiles_Insert";

    //删除数据 服务接口
    var wcfServices_Delete = top.StorageWcfProxy + "/App_AmanFiles_Delete";

    //重命名 服务接口
    var wcfServices_Rename = top.StorageWcfProxy + "/App_AmanFiles_ReName";

    //var opts = {
    //    container: "",
    //    F_AmanModuleID: "",
    //    F_SourceDataID: "",
    //    F_UpLoadFileType: 1,//0 选择文件后，不进行自动保存  1 选择文件后自动保存数据  2 只能浏览 只有下载按钮 3 根据文书类型字段 F_IsUploadByFinash &  附件扩展字段 F_ISFINASHFILE（1 显示重命名、删除按钮 0 不显示） 进行判断
    //    basePath: '../JavaScript/plugins/webuploader/',
    //    savePath: "UploadFiles/EntpAmanAtt",
    //    fileType: "all"
    //}


    var _treeGrid = opts.container;

    //格式化 附件类型名称
    function formatterType(value, row, index) {

        if (row.F_ISNEED == 1) {
            return "<label style='color:red;word-wrap:break-word;'>" + value + "</label>";
        }
        else {
            if (row._parentId) {
                return "<a class='link btn_fileView'   data-id='" + row.id + "' id='fileView_" + row.id + "'>" + value + "</a>";
            }
            else {
                return value;
            }
        }
    }

    //格式化 附件说明
    function formatterDesciption(value, row, index) {

        if (row._parentId) {
            var mF_CREATEUSERNAME = $.trim(row.F_CREATEUSERNAME);
            if (mF_CREATEUSERNAME) {
                mF_CREATEUSERNAME = "<label style='margin-right:20px'>" + mF_CREATEUSERNAME + "</label>"

                return (mF_CREATEUSERNAME + row.F_CREATETIMESTR);
            }
            else {
                return row.F_CREATETIMESTR;
            }
        }
        else {
            return value;
        }
    }

    //格式化 数量
    function formatterNumber(value, row, index) {
        var temp = "<label id='count_" + row.F_AMANTYPEID + "'>" + (value || "") + "</label>"
        return temp;
    }


    //格式化 相关操作
    function formatterOpertation(value, row, index) {
        var temp = "";
        if (!row._parentId) {
            if (options.F_UpLoadFileType == 2) {
                temp = "";
            }
            else if (options.F_UpLoadFileType == 3) {
                if (row.F_ISUPLOADBYFINASH == 1) {

                    temp = "<a class='link' data-amanmoduleid='" + row.F_AMANMODULEID + "' data-id='" + row.id + "' id='uploader_" + row.id + "'></a>";
                }
                else if (row.F_ISUPLOADBYFINASH == 0) {
                    temp = "";
                }

            }
            else {

                if (row.F_AMANTYPEID = "800001" && row.F_ISBUILD == "1") {
                    temp = "<a class='link' style='margin-right:10px;text-decoration:none;' href='javascript:void(0);' onclick='BuildDocument();'>生成</a>";
                }
                temp += "<a class='link' data-amanmoduleid='" + row.F_AMANMODULEID + "' style='margin-bottom:5px' data-id='" + row.id + "' id='uploader_" + row.id + "'></a>";
            }
        }
        else {
            if (options.F_UpLoadFileType == 2) {
                temp = "<a class='link btn_download' data-id='" + (row.id) + "'>下载</a>";
            }
            else if (options.F_UpLoadFileType == 3) {
                if (row.F_ISFINASHFILE == 1) {
                    temp = "<a class='link btn_rename' data-id='" + (row.id) + "'>重命名</a> <a class='link btn_delete'  data-id='" + (row.id) + "'>删除</a> <a class='link btn_download' data-id='" + (row.id) + "'>下载</a>";
                }
                else if (row.F_ISFINASHFILE == 0) {
                    temp = "<a class='link btn_download' data-id='" + (row.id) + "'>下载</a>";
                }
            }
            else {
                temp = "<a class='link btn_rename' data-id='" + (row.id) + "'>重命名</a> <a class='link btn_delete'  data-id='" + (row.id) + "'>删除</a> <a class='link btn_download' data-id='" + (row.id) + "'>下载</a>";
            }
        }
        return temp;
    }




    //绑定操作按钮事件
    function attachOperatEvent(data) {

        for (var i = 0; i < data.length; i++) {
            uploader.addButton({
                id: '#uploader_' + data[i].id,
                innerHTML: '上传'
            });
        }

        $(".btn_delete").off("click").on("click", function (e) {
            e.stopPropagation();
            var attID = $(this).data().id;
            var row = $(_treeGrid).treegrid("find", attID);
            var oldName = row.F_DISPLAYNAME || "-";

            var index = oldName.lastIndexOf(".");
            if (index > -1) {
                oldName = oldName.substring(0, index)
            }


            confirmEx("提示", "确定删除附件【" + oldName + "】？", function (result) {
                if (result == true) {

                    var parentNode = $(_treeGrid).treegrid('getParent', attID);
                    $(_treeGrid).treegrid("remove", attID);

                    if (parentNode) {
                        var parentID = parentNode.id;
                        var childs = $(_treeGrid).treegrid('getChildren', parentID);
                        $("#count_" + parentID).text("");
                        if (childs.length != 0) {
                            $("#count_" + parentID).text(childs.length);
                        }
                    }

                    if (options.F_UpLoadFileType == 1) {//保存文件至数据库
                        file_delete(attID);
                    }

                    showTips("文件删除成功");

                    try {
                        showfileNumber(getFilesArr().length);
                    } catch (e) { }
                }
            });
        })

        $(".btn_rename").off("click").on("click", function (e) {
            e.stopPropagation();
            var attID = $(this).data().id;
            rename(attID);
        })

        $(".btn_download").off("click").on("click", function (e) {
            e.stopPropagation();
            var attID = $(this).data().id;
            var row = $(_treeGrid).treegrid("find", attID);
            var name = row.F_DISPLAYNAME;
            if (typeof DownLoadFile === "function") {
                DownLoadFile(name, row.F_STORAGEPATH);
            }
            else if (typeof parent.DownLoadFile === "function") {
                parent.DownLoadFile(name, row.F_STORAGEPATH);
            }
            else {
                top.DownLoadFile(name, row.F_STORAGEPATH);
            }
            //  $(_treeGrid).treegrid("beginEdit", attID);
        })


        $(".btn_fileView,." + opts.lineGuid + "").off("click").on("click", function (e) {
            e.stopPropagation();
            var attID = $(this).data().id;
            var row = $(_treeGrid).treegrid("find", attID);
            var name = row.F_DISPLAYNAME;

            var filesArr = [];

            var parentNode = $(_treeGrid).treegrid('getParent', attID);
            var parentText = "";

            if (parentNode) {
                parentText = parentNode.F_DISPLAYNAME;
                var parentID = parentNode.id;
                var tempArr = $(_treeGrid).treegrid('getChildren', parentID);

                var filesArr = $.map(tempArr, function (item, index) {
                    return { F_FileName: item.F_FILENAME, F_FileType: item.F_FILETYPE, F_StoragePath: item.F_STORAGEPATH, F_FileID: item.F_AMANATTID }
                })
            }


            var temp = "";
            if (opts.fileViewTitle_Pre && typeof opts.fileViewTitle_Pre == "function") {
                temp = opts.fileViewTitle_Pre();
            }

            var mF_Title = "";
            if (temp) {
                mF_Title = temp;
                if (parentText) {
                    mF_Title = mF_Title + "【" + parentText + "】";
                }
            } else {
                if (parentText) {
                    mF_Title = parentText;
                }
            }


            var parms = {
                F_OPType: 1,//预览模式（0 根据文书类型从数据库抽数  1：json文件数组）
                F_Title: mF_Title,//标题前缀（调用页构建） 企业名称-模块名称-文书类型名称
                F_SelectFileID: attID,//选择的文件ID
                F_AmanTypeID: row.F_AMANTYPEID,//文书类型ID
                F_AmanModuleID: row.F_AMANMODULEID,//模块ID	
                F_SourceDataID: row.F_SOURCEDATAID,//数据源ID
                F_FileData: JSON.stringify(filesArr)//要预览文件的Json数组  [{F_FileName:文件名称，F_FileType:文件类型，F_StoragePath:文件存储的路径，F_FileID：文件ID }]
            }

            App_FileView(parms);

        })

    }



    //列定义
    var _columns = [
        { field: 'F_DISPLAYNAME', title: '附件类型', align: 'left', halign: 'center', width: 180, formatter: formatterType },
        { field: 'F_NOTES', title: '附件说明', align: 'left', halign: 'center', width: 160, formatter: formatterDesciption },
        { field: 'F_ATTCOUNT', title: '数量', align: 'center', halign: 'center', fixed: true, width: 60, formatter: formatterNumber },
        { field: 'opertation', title: '相关操作', align: 'center', halign: 'center', fixed: true, width: 160, formatter: formatterOpertation },
    ]

    //默认属性定义
    var defaultOpts = {
        rownumbers: false,
        //bodyCls: 'fileManageGrid',
        animate: false,
        collapsible: true,
        fitColumns: true,
        idField: "id",
        showBottomScroll: false,
        treeField: "F_DISPLAYNAME",
        scrollbarSize: 0,
        showFooter: false,
        onClickCell: function (field, row) {
            if (field != "opertation") {
                $(this).treegrid("toggle", row.id);
            }
        },
        onLoadSuccess: function (a, data) {

            attachOperatEvent(data);

            if (opts.isCollapseAll || opts.isCollapseAll === undefined) {
                $(this).treegrid("collapseAll");
            }

            //$(".datagrid-body").css("height", $(".datagrid-body").height() - 20 + 'px');
            //$(".datagrid-view").css("height", $(".datagrid-view").height() - 20 + 'px');


        },
        columns: [_columns]

    };


    var options = $.extend(defaultOpts, opts);



    //调用服务接口 获取数据
    function getData() {

        var parms = {
            F_UserID: top.UserItem.F_USERID,
            F_AmanModuleID: options.F_AmanModuleID,//模块ID
            F_SourceDataID: options.F_SourceDataID//数据源ID （如：企业ID）
        }

        var parameter = "";

        parameter = PostGetParamterConvert(JSON.stringify(parms));

        $.ajax({
            url: wcfServices_Filter,
            type: "POST",
            contentType: "text/json",
            data: parameter,
            dataType: "json",
            loadingMsg: options.loadingMsg || "",
            autoShowloading: options.autoShowloading || false,
            autoHideloading: options.autoHideloading || false,
            success: function (returnValue) {
                var returnResult = JSON.parse(top.decrypt(returnValue));
                if (returnResult.ErrorCode == 0) {

                    var returnData = JSON.parse(returnResult.Result);

                    var resultJson = [];
                    for (var i = 0; i < returnData.length; i++) {
                        returnData[i].children = JSON.parse(returnData[i].children);
                    }

                    $(_treeGrid).treegrid("loadData", returnData);

                    //debugger

                    setTimeout(function () {
                        try {
                            showfileNumber(getFilesArr().length);
                        } catch (e) { }
                    }, 100);


                } else {
                    showTips("附件加载失败");
                }
            }
        });

    }

    //调用数据接口 新增
    function files_insert(mF_AMANMODULEID) {

        var filesArr = getFilesArr();

        var parms = {
            F_UserID: top.UserItem.F_USERID,
            F_AmanModuleID: mF_AMANMODULEID,//模块ID
            F_SourceDataID: options.F_SourceDataID,//数据源ID （如：企业ID）
            F_AppAmanTypeData: filesArr                   //文件数据
        }

        var parameter = "";

        parameter = PostGetParamterConvert(JSON.stringify(parms));

        $.ajax({
            url: wcfServices_Insert,
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
                    showTips("文件保存成功");
                    try {
                        showfileNumber(getFilesArr().length);
                    } catch (e) { }
                } else {
                    showTips(returnResult.ErrorMsg);
                }
            }
        });

    }

    //调用数据接口 重命名
    function file_rename(mFileID, mNewfilename) {


        var parms = {
            F_UserID: top.UserItem.F_USERID,
            F_AmanAttID: mFileID,//附件ID
            F_FileName: mNewfilename,
            F_UPDATEUSERID: top.UserItem.F_USERID,
            F_UPDATEUSERNAME: top.UserItem.F_USERNAME,
            F_UPDATEDEPTID: top.UserItem.F_DEPARTMENTID,
            F_UPDATEDEPTNAME: top.UserItem.F_DEPARTMENTNAME,
            F_UPDATEUNITID: top.UserItem.F_MAINUNITID,
            F_UPDATEUNITNAME: top.UserItem.F_UNITFULLNAME
        }

        var parameter = "";

        parameter = PostGetParamterConvert(JSON.stringify(parms));

        $.ajax({
            url: wcfServices_Rename,
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
                    //  showTips("文件重命名成功");
                } else {
                    showTips("文件重命名失败。" + returnResult.ErrorMsg);
                }
            }
        });

    }

    //调用数据接口 删除
    function file_delete(mfileID) {

        var parms = {
            F_UserID: top.UserItem.F_USERID,
            F_AmanAttID: mfileID//附件ID
        }

        var parameter = "";

        parameter = PostGetParamterConvert(JSON.stringify(parms));

        $.ajax({
            url: wcfServices_Delete,
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
                    //   showTips("文件删除成功");
                    try {
                        showfileNumber(getFilesArr().length);
                    } catch (e) { }
                } else {
                    showTips("删除失败。" + returnResult.ErrorMsg);
                }
            }
        });

    }


    var uploader = null;

    //创建上传控件
    function createUploader() {


        uploader = new FileUploader({
            basePath: options.basePath,
            savePath: options.savePath,
            picker: null,
            fileType: options.fileType || "all",
            autoClearQueue: true,
            auto: options.F_UpLoadFileType == 1 ? true : false,//是否自动上传
            onFinished: function (files, picker) {

                var typeID = $("#" + picker).data("id");
                var mF_AMANMODULEID = $("#" + picker).data("amanmoduleid");

                appendFiles(mF_AMANMODULEID, typeID, files);

                if (options.F_UpLoadFileType == 1) {//保存文件至数据库
                    files_insert(mF_AMANMODULEID);
                }

                try {
                    showfileNumber(getFilesArr().length);
                } catch (e) { }
            }
        })
    }


    function NewGuid() {
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

    //将文件添加至树列表
    function appendFiles(mF_AMANMODULEID, parentID, files) {
        var userName = top.UserItem.F_USERNAME;
        var userID = top.UserItem.F_USERID;


        var currDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
        var mF_SourceDataID = options.F_SourceDataID || "";

        var rows = [];

        for (var i = 0; i < files.length; i++) {
            var mF_AMANATTID = NewGuid();
            var parm = {
                F_AMANMODULEID: mF_AMANMODULEID,
                F_AMANTYPEID: parentID,
                F_SOURCEDATAID: mF_SourceDataID,
                F_FILENAME: files[i].name,
                F_FILESIZE: files[i].size,
                F_STORAGEFILE: files[i].saveName,
                F_STORAGEPATH: files[i].savePath,
                F_FILETYPE: files[i].ext,
                F_CREATEUSERID: userID,
                F_ISFINASHFILE: 1,
                F_AMANATTID: mF_AMANATTID,
                id: mF_AMANATTID,
                F_DISPLAYNAME: files[i].name,
                F_CREATETIME: currDate,
                F_CREATETIMESTR: currDate,
                F_CREATEUSERNAME: userName,
                F_CREATEDEPTID: top.UserItem.F_DEPARTMENTID,
                F_CREATEDEPTNAME: top.UserItem.F_DEPARTMENTNAME,
                F_CREATEUNITID: top.UserItem.F_MAINUNITID,
                F_CREATEUINTNAME: top.UserItem.F_UNITFULLNAME,
                F_ISNEED: 0,
                F_NOTES: "",
                F_ATTCOUNT: "",
                opertation: ""
            }
            rows.push(parm);
        }



        $(_treeGrid).treegrid('append', {
            parent: parentID,
            data: rows
        });

        attachOperatEvent(rows);


        var childs = $(_treeGrid).treegrid('getChildren', parentID);

        $("#count_" + parentID).text(childs.length);

        $(_treeGrid).treegrid("resize");
    }

    //获取树列表下的附件
    function getGridFiles() {

        var childrens = $(_treeGrid).treegrid('getChildren');
        var files = [];


        for (var i = 0; i < childrens.length; i++) {

            if (childrens[i]._parentId) {
                files.push(childrens[i]);
            }

        }


        return files;
    }

    function rename(attID) {

        var row = $(_treeGrid).treegrid("find", attID);
        var oldName = row.F_DISPLAYNAME || "-";

        var index = oldName.lastIndexOf(".");
        if (index > -1) {
            oldName = oldName.substring(0, index)
        }


        var $dialog = $("<div style='background-color: #fff;' class='rename_dialog' id='rename_dialog_" + attID + "'></div>")

        $dialog.dialog({
            title: '文件重命名',
            width: 470,
            height: 200,
            closed: false,
            content: '<div style="width:430px;margin:10px;overflow: hidden;"><table border="0"><tr><td style="width:150px;text-align:right;height:30px;lin-height:30px;  vertical-align: top;">原文件名：</td><td style=" vertical-align: top; padding-bottom: 5px;"><label>' + oldName + '</label></td></tr><tr><td style="width:100px;text-align:right"><span style=" display: inline-block; background-image: url(../Images/Public/required_flag.png); background-position: center center; background-repeat: no-repeat; padding-left: 10px;padding-top: 5px; width: 6px;  height: 6px;  background-size: 6px 6px; "></span><label>新文件名：</label> </td><td><input class="easyui-textbox input" type="text"  style="width:300px" id="newName_' + attID + '" /></td></tr></table><div>',
            modal: true,
            onOpen: function () {
                $("#newName_" + attID).textbox({ validType: 'InputCheck', tipPosition: 'bottom' })
                $("#newName_" + attID).textbox("textbox").attr("maxlength", "35").focus();
                $("#newName_" + attID).textbox("setValue", oldName);
            },
            onClose: function () {
                $dialog.dialog("destroy", true);
                $dialog.remove();
            },
            buttons: [{
                text: '确定',
                handler: function () {
                    var textbox = $("#newName_" + attID).textbox("textbox");

                    //textbox.textbox({ required: true, missingMessage: '请输入文件名称' });

                    var isValid = textbox.validatebox("isValid");

                    if (isValid) {

                        var newName = $.trim($("#newName_" + attID).textbox("getValue"));

                        if (newName == "") {
                            textbox.focus();
                            top.showTips("请输入文件名称");
                            return;
                        }
                        if (row.F_FILETYPE) {
                            newName = newName + "." + row.F_FILETYPE;
                        }

                        $(_treeGrid).treegrid('update', {
                            id: attID,
                            row: {
                                F_FILENAME: newName,
                                F_DISPLAYNAME: newName
                            }
                        });

                        attachOperatEvent([row]);

                        $dialog.dialog("close");

                        if (options.F_UpLoadFileType == 1) {//保存文件至数据库
                            file_rename(attID, newName);
                        }

                        showTips("文件重命名成功");

                    }
                    else {
                        textbox.focus();
                    }

                }
            }, {
                text: '取消',
                handler: function () {
                    $dialog.dialog("close");
                }
            }]
        });

    }


    function init() {
        createUploader();

        $(_treeGrid).treegrid(options);

        getData();

    }

    function checkfileUpload() {
        var root = $(_treeGrid).treegrid('getRoots');

        var tmp = "";

        for (var i = 0; i < root.length; i++) {
            if (root[i].F_ISNEED == 1) {
                var chileNode = $(_treeGrid).treegrid('getChildren', root[i].id);
                if (chileNode.length == 0) {
                    tmp += root[i].F_DISPLAYNAME + "、";
                }
            }
        }
        tmp = tmp.substring(0, tmp.length - 1);
        return tmp;
    }

    function getFilesArr() {
        var childrens = $(_treeGrid).treegrid('getChildren');
        var files = [];

        for (var i = 0; i < childrens.length; i++) {

            if (childrens[i]._parentId) {
                files.push(childrens[i]);
            }
        }

        return files;
    }

    this.getFiles = function () {
        return getFilesArr();
    }
    this.checkFile = function () {
        return checkfileUpload();
    }

    init();
}
