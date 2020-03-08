



function parseQueryString(query) {
    var parts = query.split('&');
    var params = {};
    for (var i = 0, ii = parts.length; i < ii; ++i) {
        var param = parts[i].split('=');
        var key = param[0].toLowerCase();
        var value = param.length > 1 ? param[1] : null;
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return params;
}



function getRootPath(path) {

    //return "../../../../" + path;


    var currPath = top.window.location.pathname;

    var arr = currPath.split("/");
    var pageName = arr[arr.length - 1];
    var webPath = "/" + arr[1] + "/" + arr[2] + "/";

    var currHost = window.location.host;

    var queryString = document.location.search.substring(1);
    var params = parseQueryString(queryString);

    var rootPath = "http://" + currHost + webPath + path;


    return rootPath;

}


var DEFAULT_URL = "";// "oceans-clip.mp4";
function play() {
    var currPath = top.window.location.pathname;

    var arr = currPath.split("/");
    var pageName = arr[arr.length - 1];
    var webPath = "/" + arr[1] + "/" + arr[2] + "/";

    var currHost = window.location.host;

    var queryString = document.location.search.substring(1);
    var params = parseQueryString(queryString);
    var file = 'file' in params ? params.file : DEFAULT_URL;

    file = getRootPath(file);

    return file;

}

window.onload = function () {
    //play();
}



