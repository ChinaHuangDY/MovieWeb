<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo8.aspx.cs" Inherits="JavaScript_plugins_MapAPI_Demo8" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chorme=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        ul, li {
            list-style: none;
        }

        a {
            text-decoration: none;
        }

        .nav {
            border: 2px solid #ccc;
            border-right: none;
            overflow: hidden;
            float: left;
            margin: 100px 0 0 300px;
        }

            .nav ul li {
                float: left;
            }

                .nav ul li a {
                    width: 120px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    display: block;
                    border-right: 2px solid #ccc;
                    background: #eee;
                    color: #666;
                }

                .nav ul li ul {
                    position: absolute;
                    display: none;
                }

                    .nav ul li ul li {
                        float: none;
                    }

                        .nav ul li ul li a {
                            border-right: none;
                            border-top: 1px dotted #ccc;
                            background: #f5f5f5;
                        }
    </style>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=0F66832d08cc6e1e71da9cc45ad111a4"></script>
    <script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>
</head>
<body>
    <div class="nav">
        <ul>
            <li><a href="#">栏目一</a>
                <ul>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                </ul>
            </li>
            <li><a href="#">栏目二</a>
                <ul>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                </ul>
            </li>
            <li><a href="#">栏目三</a>
                <ul>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                    <li><a href="#">二级栏目</a></li>
                </ul>
            </li>
            <li><a href="#">栏目四</a></li>
            <li><a href="#">栏目五</a></li>
        </ul>
    </div>
</body>
</html>
<script type="text/javascript">
    /* js 语句 $(function(){});*/
    $(function () {
        $(".nav li").hover(
                /*找父亲（li）下面的ul*/
                function () {
                    $(this).find("ul").show(200);
                }, function () {
                    $(this).find("ul").hide(300);
                }
        );

        $(".nav li").hover(
                function () {
                    $(this).find("ul").fadeIn(300);
                }, function () {
                    $(this).find("ul").fadeOut(300);
                }
        );
    });
</script>
