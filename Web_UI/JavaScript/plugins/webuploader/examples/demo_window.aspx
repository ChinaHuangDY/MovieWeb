<%@ Page Language="C#" AutoEventWireup="true" CodeFile="demo_window.aspx.cs" Inherits="JavaScript_plugins_webuploader_examples_demo_window" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="../webuploader.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="uploadingWindow">
            <div class="head"><span class="title">上传文件</span></div>
            <div class="body">
                <div class="uploading_list">
                    <div class="uploading_list_item">
                        <div class="uploading_list_item_column item_column_1"><span class="file_icon"></span><span class="file_name"></span></div>
                        <div class="uploading_list_item_column item_column_2"><span class="file_size">100KB</span></div>
                        <div class="uploading_list_item_column item_column_3">
                            <div class="progressBar"><span class="text">0%</span><span class="percentage"></span></div>
                        </div>
                        <div class="uploading_list_item_column item_column_4"><span class="delete">删除</span></div>
                    </div>
                </div>
            </div>
            <div class="toolBar"><a class="close">关闭</a></div>
        </div>
    </form>
</body>
</html>
