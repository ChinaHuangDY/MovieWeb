﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo7CarMove.aspx.cs" Inherits="JavaScript_plugins_MapAPI_Demo7CarMove" %>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>轨迹回放</title>
    <link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
    <script src="http://webapi.amap.com/maps?v=1.3&key=0F66832d08cc6e1e71da9cc45ad111a4"></script>
    <script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
</head>
<body>
<div id="container"></div>
<div class="button-group">
    <input type="button" class="button" value="开始动画" id="start"/>
    <input type="button" class="button" value="停止动画" id="stop"/>
</div>
<script>
    var marker, lineArr = [];
    var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 17
    });
    map.on("complete", completeEventHandler);
    AMap.event.addDomListener(document.getElementById('start'), 'click', function () {
        marker.moveAlong(lineArr, 500);
    }, false);
    AMap.event.addDomListener(document.getElementById('stop'), 'click', function () {
        marker.stopMove();
    }, false);

    // 地图图块加载完毕后执行函数
    function completeEventHandler() {
        marker = new AMap.Marker({
            map: map,
            position: [116.397428, 39.90923],
            icon: "http://webapi.amap.com/images/car.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true
        });
        var lngX = 116.397428, latY = 39.90923;
        lineArr.push([lngX, latY]);
        for (var i = 1; i < 3; i++) {
            lngX = lngX + Math.random() * 0.05;
            if (i % 2) {
                latY = latY + Math.random() * 0.0001;
            } else {
                latY = latY + Math.random() * 0.06;
            }
            lineArr.push([lngX, latY]);
        }
        // 绘制轨迹
        var polyline = new AMap.Polyline({
            map: map,
            path: lineArr,
            strokeColor: "#00A",  //线颜色
            strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            strokeStyle: "solid"  //线样式
        });
        map.setFitView();
    }
</script>
</body>
</html>
