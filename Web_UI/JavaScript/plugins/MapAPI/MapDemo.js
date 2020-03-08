
$(function () {

    //$(".anchorBL").css("visibility", "hidden");
    new SearchPanel({
        container: "#searchPanel",
        miniBar: "#minBar"
    });

    new draggable({ handler: ".header", panel: ".searchPanel" });

});


//搜索框
var SearchPanel = function (opts) {

    var defaultOpts = {};


    var _options = $.extend(defaultOpts, opts);

    var _container = _options.container, _miniBar = _options.miniBar;

    var _content = $(_container).find(".content");

    var _header = $(_container).find(".header");


    var _minBtn = _container + " .header .tools .min",
        _maxBtn = _container + " .header .tools .max";


    var isExpanded = true;


    function bindEvent() {



        $(_minBtn).on("click", function () {

            min();

        })

        $(_maxBtn).on("click", function () {

            max();

        })


        $(_miniBar).find(".item").on("click", function () {
            max();
        })


    }

    function min() {

        //$(_content).slideToggle(100);


        if (isExpanded) {

            $(_content).animate({ height: 0, opacity: "hide" }, 300, function () {
                isExpanded = false;
                $(_container).removeClass("expanded");
            });
        }
        else {
            $(_container).addClass("expanded");
            $(_content).animate({ height: 460, opacity: "show" }, 300, function () {
                isExpanded = true;
            });
        }


        return;

        var _top = $(_miniBar).offset().top;

        $(_container).animate({ width: 140, height: 35, top: _top, opacity: "hide" }, 250, function () {
            $(_container).hide();
            $(_miniBar).css("visibility", "visible");
        });

    }

    function max() {


        var _top = $(_miniBar).offset().top;
        $(_container).css("top", _top + "px");

        $(_container).show();
        $(_miniBar).css("visibility", "hidden");

        $(_container).animate({ width: 300, height: 500, top: 10, opacity: "show" }, 250, function () {

        });

    }

    var init = function () {
        bindEvent();
    }

    init();

}

var TempItem = [{ lat: 103.51, lng: 29.65, content: "画矩形" }, { lat: 103.50, lng: 29.62, content: "2222222222" }, { lat: 103.52, lng: 29.62, content: "33333333" }, { lat: 103.54, lng: 29.63, content: "44444444" }];


var markerQYLayer = null;
//查询
function btnsel_Click() {
    var markerArr = [];
    if (document.getElementById("longitude").value != "" && document.getElementById("latitude").value != "") {
        //添加一个坐标
        //map.clearOverlays();
        //var new_point = new BMap.Point(document.getElementById("longitude").value, document.getElementById("latitude").value);
        //var marker = new BMap.Marker(new_point);  // 创建标注
        //map.addOverlay(marker);              // 将标注添加到地图中
        //map.panTo(new_point);
        //添加多个坐标
        var JWD_x = document.getElementById("longitude").value;
        var JWD_y = document.getElementById("latitude").value;
        for (var i = 0; i < TempItem.length; i++) {
            var IsEnd = 0;
            if (i == TempItem.length - 1) {
                IsEnd = 1;
            }
            var poi = new BMap.Point(TempItem[i].lat, TempItem[i].lng);
            GetBaseInfo(TempItem[i].lat, TempItem[i].lng, TempItem[i].content, i, IsEnd);
            //var tempMarker = new BMap.Marker(poi)
            //markerArr.push(tempMarker);
        }
        //将标注 添加至图层
        //markerQYLayer = new BMap.OverlayLayer(markerArr);
        //标注图层添加到地图     
        //map.addOverlay(markerQYLayer);
    }
}


var mNum = 0;
//连线
function btnLine_Click() {
    mNum += 1;
    if (mNum == 1) {
        btnsel_Click();
        map.panTo(new BMap.Point(TempItem[0].lat, TempItem[0].lng));//根据经纬度移动到
        for (var i = 0; i < TempItem.length - 1; i++) {
            //GetBaseInfo(TempItem[i].lat, TempItem[i].lng, TempItem[i].content);
            //var point = new BMap.Point(116.404, 39.915);
            //map.centerAndZoom(point, 15);
            var polyline = new BMap.Polyline([
              new BMap.Point(TempItem[i].lat, TempItem[i].lng),
              new BMap.Point(TempItem[i + 1].lat, TempItem[i + 1].lng)
            ], { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });
            map.addOverlay(polyline);
        }
    }
}

var lushu;
var StartDr = "";
var EndDr = "";
var marker = null;
var carMkStart = null;
var carMkEnd = null;
var searchRoute = null;
//路书
function btnLineRo_Click() {


    if (StartDr != $("#searchStart").val() || EndDr == $("#searchEnd").val()) {
        StartDr = $("#searchStart").val();
        EndDr = $("#searchEnd").val();
        //map.panTo(new BMap.Point(113.262232, 23.154345));//根据经纬度移动到
        map.centerAndZoom(StartDr, 14);//定位到开始地点
        var drv;

        //// 实例化一个驾车导航用来生成路线
        //drv = new BMap.DrivingRoute('成都', {
        //    onSearchComplete: function (res) {
        //        debugger;
        //        if (marker != null) {
        //            map.removeTileLayer(marker);//移除图层
        //        }
        //        if (carMkStart != null) {
        //            map.removeTileLayer(carMkStart);//移除开始图标
        //        }
        //        if (carMkEnd != null) {
        //            map.removeTileLayer(carMkEnd);//移除结束图标
        //        }

        //        if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
        //            var plan = res.getPlan(0);
        //            var arrPois = [];
        //            for (var j = 0; j < plan.getNumRoutes() ; j++) {
        //                var route = plan.getRoute(j);
        //                arrPois = arrPois.concat(route.getPath());
        //                ////开始
        //                var myIconStart = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
        //                    //    //offset: new BMap.Size(0, -5),    //相当于CSS精灵
        //                    //    imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        //                });
        //                carMkStart = new BMap.Marker(arrPois[0], { icon: myIconStart });

        //                map.addOverlay(carMkStart);
        //                ////终点
        //                var myIconEnd = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
        //                    //    //offset: new BMap.Size(0, -5),    //相当于CSS精灵
        //                    //    imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        //                });
        //                var ArrPoisLength = arrPois.length;
        //                carMkEnd = new BMap.Marker(arrPois[ArrPoisLength - 1], { icon: myIconEnd });
        //                map.addOverlay(carMkEnd);
        //            }
        //            //CarStop();
        //            marker = new BMap.Polyline(arrPois, { strokeColor: 'red' });//图层
        //            map.setZoom(14);//缩放大小
        //            map.addOverlay(marker);//添加图层


        //            lushu = new BMapLib.LuShu(map, arrPois, {
        //                defaultContent: "川A66666",//"从天安门到百度大厦"
        //                autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        //                icon: new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52, 26), { anchor: new BMap.Size(27, 13) }),
        //                speed: 2500,
        //                enableRotation: true,//是否设置marker随着道路的走向进行旋转
        //                landmarkPois: [
        //                   { lng: 104.314782, lat: 30.613508, html: '加油站', pauseTime: 2 },
        //                   { lng: 104.315391, lat: 30.964429, html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>', pauseTime: 3 },
        //                   { lng: 104.381476, lat: 30.974073, html: '肯德基早餐<div><img src="http://ishouji.baidu.com/resource/images/map/show_pic04.gif"/></div>', pauseTime: 2 }
        //                ]
        //            });
        //        }
        //    }
        //});
        //drv.search(StartDr, EndDr);

        //驾车实例方法二
        var driving = new BMap.DrivingRoute(map, {
            renderOptions: { map: map, autoViewport: true },
            onPolylinesSet: function (routes) {
                if (searchRoute != null) {
                    map.removeTileLayer(searchRoute);//移除图层
                }
                searchRoute = routes[0].getPolyline();//导航路线
                map.addOverlay(searchRoute);

                if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                    var arrPois = [];

                    arrPois = arrPois.concat(searchRoute.getPath());

                    //marker = new BMap.Polyline(arrPois, { strokeColor: 'red' });//图层
                    //map.setZoom(14);//缩放大小
                    //map.addOverlay(marker);//添加图层

                    lushu = new BMapLib.LuShu(map, arrPois, {
                        defaultContent: "川A66666",//"从天安门到百度大厦"
                        autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                        icon: new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52, 26), { anchor: new BMap.Size(27, 13) }),
                        speed: 2500,
                        enableRotation: true,//是否设置marker随着道路的走向进行旋转
                        landmarkPois: [
                           { lng: 104.314782, lat: 30.613508, html: '加油站', pauseTime: 2 },
                           { lng: 104.315391, lat: 30.964429, html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>', pauseTime: 3 },
                           { lng: 104.381476, lat: 30.974073, html: '肯德基早餐<div><img src="http://ishouji.baidu.com/resource/images/map/show_pic04.gif"/></div>', pauseTime: 2 }
                        ]
                    });
                }
            }
        });
        driving.search(StartDr, EndDr);
    }
}


//绑定事件-移动
function btnRun_Click() {
    var mContent = "快上车，老司机带你飞";
    var aaarry = [{ lat: 29.65, lng: 103.51 }, { lat: 29.62, lng: 103.50 }, { lat: 29.62, lng: 103.52 }, { lat: 29.63, lng: 103.54 }];
    lushu = new BMapLib.LuShu(map, aaarry, {
        defaultContent: '<div style="margin:0;line-height:20px;padding:2px;">地址：' + mContent +
                  '</div>',//"从天安门到百度大厦"
        autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52, 26), { anchor: new BMap.Size(27, 13) }),
        speed: 2000,
        enableRotation: true,//是否设置marker随着道路的走向进行旋转
        landmarkPois: [
           { lng: 104.314782, lat: 30.613508, html: '加油站', pauseTime: 2 },
           { lng: 104.315391, lat: 30.964429, html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>', pauseTime: 3 },
           { lng: 104.381476, lat: 30.974073, html: '肯德基早餐<div><img src="http://ishouji.baidu.com/resource/images/map/show_pic04.gif"/></div>', pauseTime: 2 }
        ]
    });
    lushu.start();
}



//定位描点显示详细信息
function GetBaseInfo(mJWD_x, mJWD_y, mContent, mm, mIsEnd) {
    var poi = new BMap.Point(mJWD_x, mJWD_y);
    map.centerAndZoom(poi, 14);

    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：' + mContent +
                  '</div>';

    //创建检索信息窗口对象
    var searchInfoWindow = null;
    searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        title: "锦里古街",      //标题
        width: 290,             //宽度
        height: 105,              //高度
        panel: "panel",         //检索结果面板
        enableAutoPan: true,     //自动平移
        searchTypes: [
            BMAPLIB_TAB_SEARCH,   //周边检索
            BMAPLIB_TAB_TO_HERE,  //到这里去
            BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
    });
    var myIcon;
    myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(52, 26), { imageOffset: new BMap.Size(0, 0) });//卡车  
    if (mIsEnd == 1) {
        myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(52, 26), { imageOffset: new BMap.Size(0, 0) });//卡车  
    }
    if (mm == 0 || mIsEnd == 1) {
        var marker = new BMap.Marker(poi, { icon: myIcon }); //创建marker对象
    } else {
        var marker = new BMap.Marker(poi); //创建marker对象
    }
    //marker.enableDragging(); //marker可拖拽
    marker.addEventListener("click", function (e) {
        searchInfoWindow.open(marker);
    })
    map.addOverlay(marker); //在地图中添加marker

}

//清除
function clearSearch() {
    map.clearOverlays();//清除所有图层
    mNum = 0;
}

var mMakers = null;
var mMakers2 = null;
//预警
function btnWorming_Click() {
    var TempItem = [{ lat: 103.51, lng: 29.65, content: "1111", Mode2: "qqqq" }, { lat: 103.50, lng: 29.62, content: "2222", Mode2: "qqqq" }, { lat: 103.52, lng: 29.62, content: "33333333", Mode2: "qqqq" }, { lat: 103.54, lng: 29.63, content: "44444444", Mode2: "qqqq" }];
    if (mMakers2 != "" || mMakers2 != null) {
        map.removeTileLayer(mMakers2);//移除图层
    }
    if (mMakers != "" || mMakers != null) {
        map.removeTileLayer(mMakers);//移除图层
    }


    for (var i = 0; i < TempItem.length; i++) {

        var temp = new BMap.Point(TempItem[i].lat, TempItem[i].lng);
        map.centerAndZoom(temp, 14);

        var icon2 = new BMap.Icon('mapMark_warnning.gif', new BMap.Size(32, 32), {
            anchor: new BMap.Size(10, 4)
        });
        mMakers2 = new BMap.Marker(temp, {
            icon: icon2
        });

        // 将标注添加到地图中
        map.addOverlay(mMakers2);

        //单独设定图标的样式
        var icon = new BMap.Icon('mapMark_entpRed.png', new BMap.Size(31, 56), {
            anchor: new BMap.Size(10, 30)
        });
        mMakers = new BMap.Marker(temp, {
            icon: icon
        });

        map.addOverlay(mMakers);
        var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：<a href=\"javascript:void(0);\" onclick=\"btnAdd_Click()\" >' + TempItem[i].content + '</a><br/>' +
                    '<a href=\"javascript:void(0);\" onclick=\"btnAdd_Click1()\" >' + TempItem[i].Mode2 + '</a>' +
                    '</div>';
        // <a href="javascript:void(0);" class="easyui-linkbutton" id="btnAdd" onclick="btnAdd_Click()">新增</a>
        ////设置点动画
        setMarkerAnimation(mMakers);

        //方法二
        addClickHandler(content, mMakers)
    }
}

//marker 动画
function setMarkerAnimation(tmarker) {
    ////预警弹出框方法一
    ////创建检索信息窗口对象
    //var searchInfoWindow = null;
    //searchInfoWindow = new BMapLib.SearchInfoWindow(map, mContent, {
    //    title: "锦里古街",      //标题
    //    width: 290,             //宽度
    //    height: 105,              //高度
    //    panel: "panel",         //检索结果面板
    //    enableAutoPan: true,     //自动平移
    //    searchTypes: [
    //        BMAPLIB_TAB_SEARCH,   //周边检索
    //        BMAPLIB_TAB_TO_HERE,  //到这里去
    //        BMAPLIB_TAB_FROM_HERE //从这里出发
    //    ]
    //});
    //tmarker.addEventListener("click", function (e) {
    //    //var data = e.marker.options.data;
    //    searchInfoWindow.open(tmarker);
    //})

    tmarker.addEventListener("mouseover", function (e) {
        tmarker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动效果

    });

    tmarker.addEventListener("mouseout", function (e) {
        tmarker.setAnimation(null);///取消跳动
    });
}


////方法二
function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
        openInfo(content, e)
    });
}

function openInfo(content, e) {
    var opts = {
        width: 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title: "信息窗口", // 信息窗口标题
        enableMessage: true//设置允许信息窗发送短息
    };
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point); //开启信息窗口
}


function btnAdd_Click() {
    map.closeInfoWindow();//关闭弹出框
    clearSearch();//清除所有图层
    btnsel_Click();
    //window.open("Demo4.aspx")
}

function btnAdd_Click1() {
    map.closeInfoWindow();
    window.open("Demo2.aspx")
}


