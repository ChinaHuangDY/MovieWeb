

var FileUploader = function (opts) {

    var isError = false;
    var uploader = null;

    var defaultOpts = {
        formData: {
            uid: 123
        },
        chunked: false,
        chunkSize: 512 * 1024,
        disableGlobalDnd: true,
        fileNumLimit: 50,//文件数量限制
        fileSizeLimit: 2000 * 1024 * 1024,    // 2000 M  文件总大小限制
        fileSingleSizeLimit: 500 * 1024 * 1024,    // 500 M 单个文件大小限制
        isShowWindow: true,//是否弹出上传窗口
        autoHideWindow: true,//是否自动隐藏窗口
        onStartUpload: function () {  //当开始上传流程z时触发。
            if (!isError) {
                top.showloading("文件上传中，请稍候…");
            }
            isError = false;
        },
        onUploadFinished: function () { //当所有文件上传结束时触发。
            top.hideloading("");
        }
    };

    opts.auto == true;//是否自动上传

    var options = $.extend(defaultOpts, opts);

    var acceptFile = getAcceptFile(options.fileType);

    var _options = $.extend(options, {
        swf: options.basePath + 'Uploader.swf',
        server: options.basePath + 'fileupload.ashx',
        formData: { savePath: options.savePath },
        pick: options.picker,
        accept: acceptFile
    })




    //获取允许上传的文件类型
    function getAcceptFile(fileType) {

        var accepts = [];

        var arr_types = {
            //上传图片和pdf文件
            imagePdf: {
                title: 'Images',
                extensions: 'pdf,gif,jpg,jpeg,bmp,png',
                mimeTypes: [
                    'image/*',
                    "application/pdf",
                ]
            },
            image: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            doc: {
                title: '文档',
                extensions: 'pdf,doc,docx,xls,xlsx,ppt,pptx,wps,ceb,txt',
                mimeTypes: [
                  "application/pdf",
                  "application/msword,application/word,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  "application/vnd.ms-works",
                  "text/plain"
                ].join(",")
            },
            word: {
                title: 'word文档',
                extensions: 'doc,docx',
                mimeTypes: [
                  "application/msword,application/word,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application/vnd.ms-works"
                ].join(",")
            },
            xls: {
                title: 'excel文档',
                extensions: 'xls,xlsx',
                mimeTypes: [
                  "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "application/vnd.ms-works",
                ].join(",")
            },
            video: {
                title: '视频',
                extensions: 'swf,flv,avi,mpg,rmvb,mp4',
                mimeTypes: "video/*"
            },
            media: {
                title: '音频/视频',
                extensions: 'swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mp4',
                mimeTypes: "video/*,audio/*"
            },
            PdfWord: {
                title: '文档/pdf',
                extensions: 'pdf,doc,docx',
                mimeTypes: ["application/pdf",
                           "application/msword,application/word,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          "application/vnd.ms-works"].join(",")
            },
            other: {
                title: '其它文件类型',
                extensions: 'js,zip,rar,gz,bz2',
                mimeTypes: "text/javascript,application/javascript,aplication/zip,aplication/rar"
            },
            all: []
        }

        var types = arr_types;
        types.all = [arr_types.image, arr_types.doc, arr_types.media, arr_types.other]

        if (fileType == "all") {
            accepts = types.all;
        }
        else {
            var arr_fileType = fileType.split(',');
            for (var i = 0; i < arr_fileType.length; i++) {
                if (arr_fileType[i]) {
                    accepts.push(types[arr_fileType[i]])
                }
            }
        }
        return accepts;
    }


    //格式化文件数据格式
    function formatterFilesJson(filesArr) {
        var filesList = [];
        for (var i = 0; i < filesArr.length; i++) {
            var temp = {
                F_FILENAME: filesArr[i].name,
                F_FILESIZE: (filesArr[i].size / 1024).toFixed(2),
                F_FILETYPE: filesArr[i].ext,
                F_STORAGEFILE: filesArr[i].saveName,
                F_STORAGEPATH: filesArr[i].savePath
            }
            filesList.push(temp);
        }
        return filesList;
    }

    //创建webuploader
    var uploadWindow = null;
    function createWebUploader() {

        //_options.onBeforeFileQueued = function () {
        //    alert(1);
        //}

        uploader = WebUploader.create(_options);

        if (_options.isShowWindow) {
            uploadWindow = top.uploadingWindow;
        }

        uploader.on('error', function (code) {
            isError = true;
            switch (code) {
                case "F_EXCEED_SIZE":
                    alert("文件大小超出限制（" + _options.fileSingleSizeLimit / 1024 / 1024 + "MB）");
                    break;
                case "Q_EXCEED_NUM_LIMIT":
                    alert("文件数量超出限制（" + _options.fileNumLimit + "）")
                    break;
                case "Q_EXCEED_SIZE_LIMIT":
                    alert("文件总大小超出限制（" + _options.fileSizeLimit + "MB）")
                    break;
                case "Q_TYPE_DENIED":

                    alert("存在无法上传的文件类型");
                    break;
                default:
            }
        });


        uploader.on('uploadError', function (code) {
            alert("上传失败");
            //$(".uploadingWindow .tool_btn.confirm").css("display", "block");
        })


        uploader.on('filesQueued', function (files) {

            if (files.length > 0) {
                uploader.curr_btnID = files[files.length - 1].source._refer[0].id;

                if (_options.isShowWindow) {
                    uploadWindow.show(files, uploader);
                }
                else {
                    // addFiles(file);
                }
            }

        })


        uploader.on('fileDequeued', function (file) {
            if (_options.isShowWindow) {
                uploadWindow.deleteFile(file);
            }
        })


        //上传开始事件
        uploader.on('startUpload', function (a, b, c, d) {
            if (_options.isShowWindow) {
                uploadWindow.updateStatus(uploader);
            }
        });

        //上传进度监听事件
        uploader.on('uploadProgress', function (file, percentage) {
            if (_options.isShowWindow) {
                uploadWindow.updateProgress(file, percentage);
            }
        });


        //文件被服务端响应完成事件
        uploader.on('uploadAccept', function (parms, response) {
            var file = parms.file;
            file.savePath = decodeURIComponent(response.SavePath);
            file.saveName = response.SaveName;

            $("#" + file.id).data("fileInfo", { F_FILENAME: file.name, F_STORAGEPATH: file.savePath });

        })

        //单个文件上传成功
        uploader.on('uploadSuccess', function (file, response) {
            //files.push(file);
            if (_options.onSuccess && typeof _options.onSuccess == "function") {
                _options.onSuccess(file);
            }
        })

        //所有文件上传成功
        uploader.on('uploadFinished', function () {

            if (_options.onFinished && typeof _options.onFinished == "function") {

                var completeFiles = uploader.getFiles("complete");

                //var uploadFiles = formatterFilesJson(completeFiles);

                var pickerID = "";
                if (completeFiles.length > 0) {
                    pickerID = uploader.curr_btnID || "";
                }

                _options.onFinished(completeFiles, pickerID)
            }


            if (_options.isShowWindow && _options.autoHideWindow) {
                uploadWindow.updateStatus(uploader);
                uploadWindow.hide(function () { clearFileQueue(); });
            }
            else {
                clearFileQueue();
            }

        });


        function clearFileQueue() {
            if (_options.autoClearQueue) {//上传完成后是否重置队列
                uploader.reset();//重置uploader。目前只重置了队列。
            }
        }


        //自定义 扩展方法
        uploader.clearQueue = function () {
            clearFileQueue();
        }

        uploader.formatterFilesJson = function (files) {
            return formatterFilesJson(files);
        }

        uploader.getCompleteFiles = function () {
            var _completeFiles = uploader.getFiles("complete");
            var _FilesJson = formatterFilesJson(_completeFiles);
            return _FilesJson;
        }


    }




    createWebUploader();
    return uploader;


}