

var __resoucesLoader = new function () {

    var cssArr = [];
    var jsArr = [];

    this.load = function (arr) {

        var rv = top.mResourcesVersion || "";


        cssArr.push('<link href="{basePath}JavaScript/plugins/jqeasyui/themes/icon.css?v=' + rv + '" rel="stylesheet" />');
        cssArr.push('<link href="{basePath}JavaScript/plugins/jqeasyui/themes/default/easyui.css?v=' + rv + '" rel="stylesheet" />');
        cssArr.push('<link href="{basePath}CSS/base.css?v=' + rv + '" rel="stylesheet" />');
        cssArr.push('<link href="{basePath}CSS/common.css?v=' + rv + '" rel="stylesheet" />');

        jsArr.push('<script src="{basePath}JavaScript/plugins/jsencrypt/cryptojs.all.js"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/plugins/jsencrypt/cryptojs_class.js"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/lib/jquery-1.12.3.min.js"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/common/common.js?v=' + rv + '"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/lib/jquery.nicescroll.min.js?v=' + rv + '"><\/script>');
        //jsArr.push('<script src="{basePath}JavaScript/plugins/checkbox/nCheck.js?v=' + rv + '"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/plugins/jqeasyui/jquery.easyui.min.js"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/plugins/jqeasyui/locale/easyui-lang-zh_CN.js"><\/script>');
        jsArr.push('<script src="{basePath}JavaScript/plugins/jqeasyui/jquery.easyui.config.js"><\/script>');

     
        if ((arr instanceof Array)===false) {
            arr=[];
        }


        for (var i = 0, len = arr.length; i < len; i++) {

            var temp = arr[i];
            var j = temp.lastIndexOf(".");
            if (j > -1) {
                var suff = temp.substring(j, temp.length);

                if (suff.toLowerCase() == ".css") {
                    cssArr.push('<link href="' + temp + '?v=' + rv + '" rel="stylesheet" />');
                }
                else {
                    jsArr.push('<script src="' + temp + '?v=' + rv + '"><\/script>');
                }
            }

        }


        load();

    }

    function load() {
        
        var __basePath = "";
        var rv = top.mResourcesVersion || "";

        var scripts = document.getElementsByTagName('script');


        for (var i = 0, len = scripts.length; i < len; i++) {
            var script = scripts[i];
            var basePath = script.getAttribute('data-base');

            if (basePath) {
                __basePath = basePath;
                break;
            }
        }

        var __cssArr = cssArr;
        var __jsArr = jsArr;



        var __resouces = [];

    

        __resouces = __cssArr.concat(__jsArr);

        var __r_str = __resouces.join("\n");
        __r_str = __r_str.replace(new RegExp("{basePath}", "gm"), __basePath);
        document.write(__r_str);

    }

}