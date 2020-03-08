
/* NProgress, (c) Nexx ly
 2016年11月10日15:13:45
 页面顶部加载进度条
 依赖jquery , jquery.easing.1.3.js
*/

; (function (window, $) {

    var NProgress = {};

    var easing = {
        swing: "swing",
        easeInOutExpo: (typeof $.easing.easeInOutExpo === "function") == true ? "easeInOutExpo" : "swing",
        easeInOutQuint: (typeof $.easing.easeInOutQuint === "function") == true ? "easeInOutQuint" : "linear",
    }

    function showProcess(container) {

        var obj = container || "body";

        $(obj).find(".__processBar").remove();

        var $bar = $("<div class='__processBar' style=''><div style=''></div></div>");
        $bar.appendTo($(obj));

        var _inner = $bar.find("div");
       

        //$(_inner).animate({ width: "60%" }, 300, easing.easeInOutExpo, function () {

        //   // $(_inner).animate({ width: "70%" }, 100, "linear");

        //    })

        $(_inner).animate({ width: "10%" }, 500, easing.swing, function () {

            $(_inner).animate({ width: "60%" }, 800, easing.easeInOutExpo, function () {

                $(_inner).animate({ width: "70%" }, 2000, easing.easeInOutQuint);
            })
        })



    }

    function hideProcess(container) {

        var obj = container || "body";

        var _inner = $(obj).find(".__processBar div");

        $(_inner).stop();

        $(_inner).animate({ width: "100%" }, 500, easing.easeInOutExpo, function () {
            $(obj).find(".__processBar").fadeOut(function () {
                $(obj).find(".__processBar").remove();
            });
        })

    }


    NProgress.start = function (container) {
        showProcess(container);
    };


    NProgress.done = function (container) {
        hideProcess(container);
    };



    window.NProgress = NProgress;

})(window, $, undefined);