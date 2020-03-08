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





document.addEventListener('DOMContentLoaded', pageLoad, true);



function selectScaleOption(value) {
    var options = document.getElementById('scaleSelect').options;
    var predefinedValueFound = false;
    for (var i = 0, ii = options.length; i < ii; i++) {
        var option = options[i];
        if (option.value !== value) {
            option.selected = false;
            continue;
        }
        option.selected = true;
        predefinedValueFound = true;
    }
    return predefinedValueFound;
}


var isFirstLoad = true;
function pageLoad() {

    var queryString = document.location.search.substring(1);
    var params = parseQueryString(queryString);
    var file = 'file' in params ? params.file : "";

    var iviewer = {};
    $("#viewContainer").iviewer(
    {
        src: "",
        zoom_min: 10,
        zoom_max:400,
        ui_disabled: true,
        onZoom: function (e, zoom,b,c) {
          
            var val = Math.round(zoom);
            var bl = isNaN(val);
         
            if (!isFirstLoad && !bl) {

                if (val>400) {
                    val = 400;
                }

                if (val < 10) {
                    val = 10;
                }

                var predefinedValueFound = selectScaleOption('' + val);

                if (!predefinedValueFound) {
                    var customScaleOption = document.getElementById('customScaleOption');
                    //    var customScale = Math.round(evt.scale * 10000) / 100;
                   customScaleOption.value = val;
                    customScaleOption.textContent = val + "%";
                    customScaleOption.selected = true;
                }
            }

            isFirstLoad = false;
           
        },
        initCallback: function () {
            iviewer = this;
        }
    });
 
  
    $('#zoomIn,#zoomOut').bind("click", zoomButtonClickHandler);

    function zoomButtonClickHandler(e) {
        var scaleToAdd = 1;
        if (e.target.id == 'zoomOut')
            scaleToAdd = -1;

        $("#viewContainer").iviewer('zoom_by', scaleToAdd);
    }

    document.getElementById('scaleSelect').addEventListener('change', function () {
        
        var val = 1;
        if (this.value=="auto") {
            $("#viewContainer").iviewer('fit');
            return;
        } 
        val = Number(this.value);

        $("#viewContainer").iviewer('set_zoom', val);
         
    });
     
    if (file) {
       $("#viewContainer").iviewer('loadImage', "../../../" + file);
    }
}