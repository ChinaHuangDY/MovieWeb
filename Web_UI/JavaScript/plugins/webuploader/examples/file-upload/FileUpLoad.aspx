<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FileUpLoad.aspx.cs" Inherits="JavaScript_webuploader_examples_file_upload_FileUpLoad" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>文件上传</title>
    <link href="../../../../jeasyui/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../webuploader.css" rel="stylesheet" />
    <link href="../../../../CSS/jokeep.default.css" rel="stylesheet" />
    <script src="../../../../jeasyui/jquery-1.8.0.js"></script>
    <script src="../../../../jeasyui/jquery.easyui.all.js"></script>
    <script src="../../webuploader.js"></script>
    <script src="../../jquery.webUploader.js"></script>
    <script src="FileUpLoad.js"></script>
    <style>
        .uploadingInfo {
            height: 100px;
            width: 500px;
            margin: auto;
            border: 1px solid #f1f1f1;
            position: relative;
        }


            .uploadingInfo .progressBar {
                position: absolute;
                top: 50%;
                margin-top: -15px;
                left: 50%;
                margin-left: -200px;
                height: 20px;
                width: 400px;
                color: #6dbfff;
                text-align: center;
           border:1px solid #1483d8;

            }


        .progressBar span.percentage {
            display: inline-block;
            height: 100%;
            width: 0;
            position: absolute;
            left: 0;
            top: 0;
            background: #1483d8;
        }

        .progressBar span.text {
             position: relative;
    z-index: 10;
        }

       .uploadingInfo .info {
         font-size: 14px;
    color: #666666;
    padding:5px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    

        <div id="btnUpload">选择文件</div>


        <div class="FileList singleRow" style="white-space: nowrap; word-break: keep-all; overflow: hidden;">
                            <ul id="AttachmentList">
                              
                            </ul>

                        </div>
    </form>
</body>
</html>
