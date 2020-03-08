<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo3.aspx.cs" Inherits="JavaScript_plugins_MapAPI_Demo3" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: "微软雅黑";
        }

        #allmap {
            width: 100%;
            height: 500px;
        }

        p {
            margin-left: 5px;
            font-size: 14px;
        }
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=0F66832d08cc6e1e71da9cc45ad111a4"></script>
    <title>搜索区域内关键词</title>
</head>
<body>
    <div id="allmap"></div>
    <p>返回北京市矩形框区域范围内的“银行”关键字的检索结果，并展示在地图上</p>
</body>
</html>
<script type="text/javascript">
    // 百度地图API功能
    var map = new BMap.Map("allmap");   // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.274625, 39.961627), 9);
    map.enableScrollWheelZoom();       //启用滚轮放大缩小
    var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map }
    });
    var pStart = new BMap.Point(116.116405, 39.081436);
    var pEnd = new BMap.Point(116.601633, 39.780454);

    //var pStart = new BMap.Point(116.116405, 40.081436);
    //var pEnd = new BMap.Point(116.601633, 39.780454);
    var bs = new BMap.Bounds(pStart, pEnd); //自己规定范围

    local.searchInBounds("银行", bs);
    var polygon = new BMap.Polygon([
    new BMap.Point(pStart.lng, pStart.lat),
    new BMap.Point(pEnd.lng, pStart.lat),
    new BMap.Point(pEnd.lng, pEnd.lat),
    new BMap.Point(pStart.lng, pEnd.lat)
    ], { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });
    map.addOverlay(polygon);
</script>
