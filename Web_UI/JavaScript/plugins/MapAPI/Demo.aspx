<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo.aspx.cs" Inherits="JavaScript_plugins_MapAPI_Demo" %>

<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chorme=1" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link href="MapDemo.css" rel="stylesheet" />
    <script src="../../lib/jquery-1.12.3.min.js"></script>
    <script src="../draggable.js"></script>
    <script src="MapDemo.js"></script>
    <style type="text/css">
        .anchorBL {
            display: none;
        }

        body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: "微软雅黑";
        }

        #allmap {
            width: 100%;
            height: 100%;
        }

        p {
            margin-left: 5px;
            font-size: 14px;
        }
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=0F66832d08cc6e1e71da9cc45ad111a4"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js"></script>
    <link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />

    <title>根据起终点名称驾车导航</title>
</head>
<body>
    <div id="allmap"></div>

    <div class="searchPanel expanded" id="searchPanel">
        <div class="header">
            <span class="title">车辆信息查询</span>
            <span class="tools">
                <span class="min"></span>
            </span>
        </div>
        <div class="content">
            <table class="SearchTb">

                <tr>
                    <td class="ItemTitle">经度：
                    </td>
                    <td colspan="2">
                        <input type="text" class="input" id="longitude" value="103.50" />
                    </td>
                </tr>
                <tr>
                    <td class="ItemTitle">纬度：
                    </td>
                    <td colspan="2">
                        <input type="text" class="input" id="latitude" value="29.62" />
                    </td>
                </tr>
                <tr>
                    <td class="ItemTitle">出发点：
                    </td>
                    <td colspan="2">
                        <input type="text" class="input" value="天府广场" id="searchStart" />
                    </td>
                </tr>
                <tr>
                    <td class="ItemTitle">目的地：
                    </td>
                    <td colspan="2">
                        <input type="text" class="input" value="西部智谷" id="searchEnd" />
                    </td>
                </tr>
            </table>
            <div style="padding: 10px 0;">
                <span class="searchBtn" style="margin-left: 100px;" onclick="btnsel_Click()">查询</span>
                <a href="javascript:void(0);" onclick="clearSearch()" style="margin-right: 35px; float: right; margin-top: 7px;">清空</a>
            </div>
            <div style="padding: 10px 0;">
                <span class="searchBtn" style="margin-left: 100px;" onclick="sdas()">连线111</span>
                <span class="searchBtn" style="margin-left: 100px;" onclick="btnLine_Click()">连线</span>
                <span class="searchBtn" style="margin-left: 100px; margin-top: 10px" onclick="btnLineRo_Click()">路书</span>
                <span class="searchBtn" id="btnRun" style="margin-left: 100px; margin-top: 10px" onclick="btnRun_Click()">移动</span>
                <span class="searchBtn" id="btnWorming" style="margin-left: 100px; margin-top: 10px" onclick="btnWorming_Click()">预警</span>

            </div>
        </div>
    </div>
</body>
</html>
<script type="text/javascript">
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(104.06, 30.67), 9);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("成都");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    function sdas() {

        map.clearOverlays();//清除所有图层

        var point = new BMap.Point(104.06, 30.67);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        var marker2;
        var marker3;
        setTimeout(function () {
            marker.setAnimation(null); //清除动画
            var point = new BMap.Point(105.06, 30.67);
            marker2 = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker2);               // 将标注添加到地图中
            marker2.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }, 1000)

        setTimeout(function () {
            marker2.setAnimation(null); //清除动画
        }, 2000)
        setTimeout(function () {
            var polyline = new BMap.Polyline([
      new BMap.Point(104.06, 30.67),//起始点的经纬度
      new BMap.Point(105.06, 30.67)//终止点的经纬度
            ], {
                strokeColor: "red",//设置颜色 
                strokeWeight: 3, //宽度
                strokeOpacity: 0.5
            });//透明度
            map.addOverlay(polyline);

        }, 2200)

        setTimeout(function () {
            var point = new BMap.Point(104.06, 29.97);
            marker3 = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker3);               // 将标注添加到地图中
            marker3.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }, 3000)

        setTimeout(function () {
            marker3.setAnimation(null); //清除动画
        }, 4000)

        setTimeout(function () {
            var polyline = new BMap.Polyline([
      new BMap.Point(105.06, 30.67),//起始点的经纬度
      new BMap.Point(104.06, 29.97)//终止点的经纬度
            ], {
                strokeColor: "red",//设置颜色 
                strokeWeight: 3, //宽度
                strokeOpacity: 0.5
            });//透明度
            map.addOverlay(polyline);

        }, 4200)



    }

    // 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
    });
    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError", function (e) {
        // 定位失败事件
        alert(e.message);
    });

    map.addControl(geolocationControl);

    geolocationControl.addEventListener("click", function (e) {   //点击事件    
        if (!e.overlay) {
            var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(10, 25), // 指定定位位置  
                imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移  
            });
            var marker = new BMap.Marker(e.point, { icon: myIcon });
            map.removeOverlay(preMarker);
            map.addOverlay(marker);
            preMarker = marker;
        }
    });


</script>
