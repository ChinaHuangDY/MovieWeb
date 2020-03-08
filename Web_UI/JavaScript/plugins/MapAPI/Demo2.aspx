<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo2.aspx.cs" Inherits="JavaScript_plugins_MapAPI_Demo2" %>

<!DOCTYPE html>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html, #allmap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            font-family: "微软雅黑";
        }
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=E06eb9d756d0eafc722effb355657b4c"></script>
    <title>车辆运行轨迹测试</title>
    <script src="http://c.cnzz.com/core.php"></script>
</head>
<body>
    <div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
    var startLong = 106.652024;
    var startLat = 26.617221;
    var endLong = 106.652024;
    var endLat = 26.614221;

    var linesPoints = null;
    // 百度地图API功能  
    var map = new BMap.Map("allmap");    // 创建Map实例  
    map.centerAndZoom(new BMap.Point(106.652024, 26.617221), 15);  // 初始化地图,设置中心点坐标和地图级别  
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件  
    map.setCurrentCity("贵阳");          // 设置地图显示的城市 此项是必须设置的  
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放  
    //goWay();
    setInterval(goWay, 500);//隔一段时间调用（循环）
    var carMk;
    var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/car.png", new BMap.Size(52, 26), { imageOffset: new BMap.Size(0, 0) });//卡车  

    function goWay() {
        startLong = endLong;
        startLat = endLat;
        endLong = getRound(endLong);
        endLat = getRound(endLat);

        drawIcon(startLong, startLat, endLong, endLat);
        //drawRedLine();  
    }

    function getRound(temp) {
        var i = Math.round(Math.random() * 9 + 1);
        if (i % 2 == 0) {
            return temp + i * 0.0001;
        } else {
            return temp - i * 0.0001;
        }
    }

    function drawGreenLine(startLong, startLat, endLong, endLat) {
        var polyline = new BMap.Polyline([
                                           new BMap.Point(startLong, startLat),//起始点的经纬度  
                                           new BMap.Point(endLong, endLat)//终止点的经纬度  
        ], {
            strokeColor: "green",//设置颜色   
            strokeWeight: 3, //宽度  
            strokeOpacity: 1
        });//透明度  
        map.addOverlay(polyline);
    }


    function drawIcon(startLong, startLat, endLong, endLat) {
        if (carMk) {
            map.removeOverlay(carMk);
        }
        carMk = new BMap.Marker(
                    new BMap.Point(endLong, endLat),//起始点的经纬度  
                   { icon: myIcon });
        map.addOverlay(carMk);
        drawGreenLine(startLong, startLat, endLong, endLat);
    }


</script>
