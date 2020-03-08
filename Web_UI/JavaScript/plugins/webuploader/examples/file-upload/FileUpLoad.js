

var myUploader = null;
$(function () {

    //createUploader();

    ////myUploader= new webUploader({
    ////    id: '#btnUpload'
    ////}, function (files) {



    ////});

    $('#btnUpload').FileUploader({ basePath: "../../../webuploader/", filelist: "#AttachmentList", savePath: "", fileType: "*" }, function (files) {

    })
})



function createUploader() {

    uploader = WebUploader.create({
        pick: {
            id: '#btnUpload',
            label: '点击选择文件'
        },
        formData: {
            uid: 123
        },

        swf: '../../Uploader.swf',
        chunked: false,
        chunkSize: 512 * 1024,
        server: '../server/fileupload.ashx',
        disableGlobalDnd: true,
        fileNumLimit: 300,
        fileSizeLimit: 2000 * 1024 * 1024,    // 2000 M
        fileSingleSizeLimit: 500 * 1024 * 1024    // 500 M
    });

    count = 0;
    var uploadTimer = null;

    // 添加的文件数量
    var fileCount = 0,

       // 添加的文件总大小
       fileSize = 0;

    function updateProgress(percent) {
        var $progress = $(".progressBar");
        var spans = $progress.children();

        $(spans.eq(1)).stop(true, true);
        $(spans.eq(1)).animate({ width: Math.round(percent * 100) + '%' }, 200, function () {
            spans.eq(0).text(Math.round(percent * 100) + '%');
        })
    }


    function updateStatus() {
        var stats = uploader.getStats();
        var infoSpans = $(".uploadingInfo .info span");

        var successCount = stats.successNum;
        var failedCount = stats.uploadFailNum;
        infoSpans.eq(0).text(fileCount);
        infoSpans.eq(1).text(WebUploader.formatSize(fileSize));
        infoSpans.eq(2).text(successCount);
        infoSpans.eq(3).text(failedCount);
    }


    function updateTotalProgress(file, percent) {
       
        var $fileProgress = $('#' + file.id).find(".progress label");
        $fileProgress.text(Math.round(percent * 100) + '%');
      //  updateStatus();
    }

    var $filelist = $("#AttachmentList");
    function addFiles(file) {

        var $li = $('<li id="' + file.id + '">' +
                   '<span class="name">' + file.name + '</span>' +
                   '<span class="progress" style="margin-left:10px;">(<label>0%</label>)<span>' +
                   '</li>'),

                $btns = $('<span class="tool_btn"><a>删除</a></span>').appendTo($li),
        $prgress = $li.find('.progress label');

        file.on('statuschange', function (cur, prev) {
            if (prev === 'progress') {
               // $prgress.hide().width(0);
            } else if (prev === 'queued') {
             //  $btns.remove();
            }

            // 成功
            if (cur === 'error' || cur === 'invalid') {
              
            } else if (cur === 'interrupt') {
                showError('interrupt');
            } else if (cur === 'queued') {
            
            } else if (cur === 'progress') {
               
            } else if (cur === 'complete') {
                $prgress.text(WebUploader.formatSize(file.size))
           //     $li.append('<span class="success"></span>');
            }

          //  $li.removeClass('state-' + prev).addClass('state-' + cur);
        });


        $btns.on('click', 'a', function () {
            var index = $(this).index()

            switch (index) {
                case 0:
                    uploader.removeFile(file);
                    break;
            }


        });


        $li.appendTo($filelist);
        uploader.upload();//直接开始上传
    }

    // 负责view的销毁
    function removeFile(file) {
        var $li = $('#' + file.id);

        $li.off().find('.tool_btn').off().end().remove();
    }

    uploader.onFileDequeued = function (file) {
        fileCount--;
        fileSize -= file.size;
        　
        removeFile(file);
    }



    uploader.on('fileQueued', function (file) {//文件被加入队列时的事件，相同文件不会被重复添加（故不会触发该事件），文件选择窗口关闭时也不会触发该事件
        fileCount++;
        fileSize += file.size;

        addFiles(file);
      //  uploader.upload();//直接开始上传

    });

    uploader.on('filesQueued', function (files) {
        var files = [];
    });


    var ProgressCount = 0;
    uploader.on('uploadProgress', function (file, percentage) {
        $("#ProgressCount").text(ProgressCount++);
        updateTotalProgress(file, percentage);
    });

    uploader.on('error', function (code) {
        switch (code) {
            case "Q_EXCEED_NUM_LIMIT":
                alert("文件数量超出限制")
                break;
            case "Q_EXCEED_SIZE_LIMIT":
                alert("文件总大小超出限制")
                break;
            case "Q_TYPE_DENIED":
                alert("无法上传该类型文件")
                break;
            default:
        }
    });



    uploader.on('uploadFinished', function () {
        if (uploadTimer) {
            clearInterval(uploadTimer);
        }
        updateStatus();
        uploader.reset();//重置uploader。目前只重置了队列。
    });

    var count = 0;
    uploader.on('startUpload', function () {
        count = 0;
        uploadTimer = setInterval(function () {
            $("#msg").text((count++) / 10);
        }, 100);
        updateStatus();
    });


    uploader.on('stopUpload', function () {
    });

    uploader.on('uploadError', function () {
        //alert("服务器异常，上传失败")
    });

}


function upload() {
  //  myUploader.addFiles();

}