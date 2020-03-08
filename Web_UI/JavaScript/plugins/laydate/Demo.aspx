<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo.aspx.cs" Inherits="JavaScript_plugins_laydate_Demo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="theme/default/laydate.css" rel="stylesheet" />
    <style>
        .layui-input
        {
        border:1px solid #d7d7d7;
        height:30px;
        font-size:14px;
        padding-left:5px; 
        border-radius:3px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <input type="text"  class="layui-input"  id="test1" />
        <script src="laydate.js"></script>
        <script>
            //时间范围
            laydate.render({
                elem: '#test1'
              , type: 'time'
              , range: true
              , format: 'HH:mm' //可任意组合
            });
        </script>
    </form>
</body>
</html>
