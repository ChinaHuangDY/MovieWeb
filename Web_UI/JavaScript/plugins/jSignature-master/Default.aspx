﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="jSignature_master_Default" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>手写板签名demo</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="UTF-8">
    <meta name="description" content="overview & stats" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
</head>
<body>
    <div id="signature"></div>
    <p style="text-align: center">
        <b style="color: red">请按着鼠标写字签名。</b>
    </p>
    <input type="button" value="保存" id="yes" />
    <input type="button" value="下载" id="download" />
    <input type="button" value="重写" id="reset" />
    <div id="someelement"></div>
   
    <script src="../heatMap/JavaScript/lib/jquery-2.2.3.js"></script>
    <!--[if lt IE 9]>
        <script src="jSignature/flashcanvas.js"></script>
	<![endif]-->
    <script src="src/jSignature.js"></script>
    <script>
        $(function () {
            var $sigdiv = $("#signature");
            $sigdiv.jSignature(); // 初始化jSignature插件.
            $("#yes").click(function () {
                //将画布内容转换为图片
                var datapair = $sigdiv.jSignature("getData", "image");
                var i = new Image();
                i.src = "data:" + datapair[0] + "," + datapair[1];
                $(i).appendTo($("#someelement")); // append the image (SVG) to DOM.
            });
            //datapair = $sigdiv.jSignature("getData","base30");
            //$sigdiv.jSignature("setData", "data:" + datapair.join(","));
            $("#download").click(function () {
                downloadFile("a.png", convertBase64UrlToBlob($("img").attr("src")));
            });
            $("#reset").click(function () {
                $sigdiv.jSignature("reset"); //重置画布，可以进行重新作画.
                $("#someelement").html("");
            });
        });

        function downloadFile(fileName, blob) {
            
            var aLink = document.createElement('a');
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
        }
        /**
		 * 将以base64的图片url数据转换为Blob
		 * @param urlData
		 *            用url方式表示的base64图片数据
		 */
        function convertBase64UrlToBlob(urlData) {

            var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob([ab], { type: 'image/png' });
        }
    </script>

</body>
</html>
