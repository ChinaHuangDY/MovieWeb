

var sec = 253;
var Start = 0;
var iCount;

$(function () {
    //当前进度条存在缓存问题，进度条拖动暂时不支持
    $('#AudioSlider').slider({ disabled: true });
    $("ul").mouseenter(function (event) {
        $(this).css("cursor", "Pointer");
    });
    LoadData();
})


function LoadData() {
    $.ajax({
        url: 'http://localhost:120/api/Songs/Get',
        type: 'get',
        data: "",
        dataType: 'json',
        success: function (data) {
            $("#DGrid").datagrid({
                data: data,
                loadMsg: "数据加载中...",
                method: "POST",
                onLoadSuccess: function (data) {
                },
                onLoadError: function (data) {
                    alert("加载失败");
                },
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("列表数据加载失败！");
        }

    })
}

//歌曲信息维护按钮
function btnSave() {

    showDialog('歌曲信息维护', 'Edit.html', 500, 500, function (returnValue) {
        if (returnValue != "cancel" && returnValue != "" && returnValue != null) {
            LoadData();
        }
    });
}

//视频播放按钮
function btnMovies(mIndex) {
    if (mIndex == 0)
    { mIndex = 100; }
    showDialog('第' + mIndex + '集', 'Broadcast/Bro_Mp4.html?Index=' + mIndex, 800, 490, function (returnValue) {
        if (returnValue != "cancel" && returnValue != "" && returnValue != null) {
            //LoadData();
        }
    });
}

//文件上传按钮
function btn_UpLoad() {
    var file = $("#fileBox").next().find('input[type=file]')[0].files;


    var formData = new FormData();
    //formData.append("fileInfo", file);
    formData.append('fileInfo', file[0]);//默认的文件数据名为“Filedata”
    $.ajax({
        url: "http://localhost:120/api/Songs/UploadFile",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            alert(data);
            $("#fileBox").filebox("clear");
        },
        error: function (data) {
            console.log("fail");
        }
    });
}

//音乐播放
function btnMusic() {
    if (Start == 0) {
        $('#btnMusic').linkbutton({ text: '暂停' });
        Start = 1;
        iCount = setInterval(Bar, 1000);
    }
    else {
        $('#btnMusic').linkbutton({ text: '播放' });
        Start = 0;
        clearInterval(iCount);
    }

    var audio = document.getElementById("audio");
    if (audio !== null) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}

//音乐播放进度条控制
function Bar() {
    var value = $('#AudioSlider').slider('getValue');
    if (value < 253) {
        $('#AudioSlider').slider("setValue", value + 1);
    }
}


//iframe 相关控制方法
var iframeControl = {
    formatter: function (iframeStr, isshowloading) {
        isshowloading = true;
        if (isshowloading) {
            return iframeStr;
        }
    },
    onload: function (iframe) {
        setTimeout(function () {
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

//弹出窗  CloseSaveData 等于true时，点击关闭按钮返回自定义数据，数据名称：ReturnData
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
