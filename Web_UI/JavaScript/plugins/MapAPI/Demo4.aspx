<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo4.aspx.cs" Inherits="JavaScript_plugins_MapAPI_Demo4" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chorme=1" />
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
            height: 600px;
            overflow: hidden;
        }

        #result {
            width: 100%;
            font-size: 12px;
        }

        dl, dt, dd, ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        p {
            font-size: 12px;
        }

        dt {
            font-size: 14px;
            font-family: "微软雅黑";
            font-weight: bold;
            border-bottom: 1px dotted #000;
            padding: 5px 0 5px 5px;
            margin: 5px 0;
        }

        dd {
            padding: 5px 0 0 5px;
        }

        li {
            line-height: 28px;
        }
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=0F66832d08cc6e1e71da9cc45ad111a4"></script>
    <!--加载鼠标绘制工具-->
    <script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>
    <link rel="stylesheet" href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css" />
    <!--加载检索信息窗口-->
    <script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.js"></script>
    <link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.css" />
    <title>鼠标绘制工具</title>
</head>
<body>
    <div id="allmap" style="overflow: hidden; zoom: 1; position: relative;">
        <div id="map" style="height: 100%; -webkit-transition: all 0.5s ease-in-out; transition: all 0.5s ease-in-out;"></div>
    </div>
    <div id="result">
        <input type="button" value="获取绘制的覆盖物个数" onclick="alert(overlays.length)" />
        <input type="button" value="清除所有覆盖物" onclick="clearAll()" />
    </div>
    <script type="text/javascript">
        // 百度地图API功能
        var map = new BMap.Map('map');
        var poi = new BMap.Point(104.06, 30.67);
        map.centerAndZoom(poi, 14);
        map.enableScrollWheelZoom();

        var poi1 = new BMap.Point(104.06, 30.67);
        var markerDD1 = new BMap.Marker(poi1); //创建marker对象
        map.addOverlay(markerDD1); //在地图中添加marker

        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        var overlays = [];
        var pStart;
        var pEnd;
        var molResultPoint;
        var overlaycomplete = function (e) {
            clearAll();
            molResultPoint = e.overlay.po;
            overlays.push(e.overlay);
            mSearchBound();
        };
        var styleOptions = {
            strokeColor: "red",    //边线颜色。
            fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 2,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.5,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            enableCalculate: false,
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
                drawingModes: [BMAP_DRAWING_RECTANGLE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_CIRCLE],//将只显示画矩形的选项
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);

        function mSearchBound() {
            
            pStart = new BMap.Point(molResultPoint[0].lng, molResultPoint[0].lat);
            pEnd = new BMap.Point(molResultPoint[2].lng, molResultPoint[2].lat);

            //var poi1 = new BMap.Point(116.307852, 39.057031);
            //var markerDD1 = new BMap.Marker(poi1); //创建marker对象
            //map.addOverlay(markerDD1); //在地图中添加marker

            //var poi2 = new BMap.Point(molResultPoint[2].lng, molResultPoint[2].lat);
            //var markerDD2 = new BMap.Marker(poi2); //创建marker对象
            //map.addOverlay(markerDD2); //在地图中添加marker

            //var bs = new BMap.Bounds(pStart, pEnd); //自己规定范围
            //local.searchInBounds("大学", bs);
            
            var aaa = isInsidePolygon({ lng: 104.06, lat: 30.67 }, molResultPoint);
            if (aaa == true) {
                alert("在范围内");
            } else {
                alert("不在");
            }

        }

        function clearAll() {
            for (var i = 0; i < overlays.length; i++) {
                map.removeOverlay(overlays[i]);
            }
            overlays.length = 0;
        }


        /** 
             * 计算一个点是否在多边形里 
             * @param {Object} pt 标注点 
             * @param {Object} poly 多边形数组 
             */
        function isInsidePolygon(pt, poly) {
            for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) &&
                (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) &&
                (c = !c);
            return c;
        }
    </script>
</body>
</html>
