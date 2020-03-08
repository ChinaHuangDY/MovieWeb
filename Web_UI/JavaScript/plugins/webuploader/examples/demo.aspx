<%@ Page Language="C#" AutoEventWireup="true" CodeFile="demo.aspx.cs" Inherits="JavaScript_plugins_webuploader_examples_demo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../webuploader.css" rel="stylesheet" />
    <script src="../../../lib/jquery-1.12.3.min.js"></script>
    <script src="../webuploader.min.js"></script>
    <script>
        var uploader = null;
        function createUploader() {

            uploader = WebUploader.create({
             
                swf: '../../Uploader.swf',

                server: '../server/fileupload.ashx',

                fileNumLimit: 300,
                accept: null,
                fileSizeLimit: 200 * 1024 * 1024,    // 200 M
                fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
            });
        }


        $(function () {

            createUploader();


            uploader.addButton({
                id: '#' + "Div1",
                innerHTML: '选择文件'
            });

        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div id="upload"></div>

    <a id="Div1"></a>

    </div>
    </form>
</body>
</html>
