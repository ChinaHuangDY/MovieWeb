var tipsInfo = function (opts) {

    var tip = null;
    var init = function () {


        var content = $("<div></div>").css({
            "background-color": "#47a6f7",
            "left": "8px",
            "position": "relative",
            "min-height": "20px",
            "min-width": "60px"
        }).addClass("tipContent");

        var arrow = $("<label></label>").css({
            "position": "absolute",
            "left": "-8px",
            "top": "50%",
            "margin-top": "-8px",
            "display": "inline-block",
            "font-size": "0",
            "width": "0px",
            "height": "0px",
            "border-top": "8px solid transparent",
            "border-bottom": "8px solid transparent",
            "border-right": "8px solid #47a6f7",
            "border-left": "8px solid transparent",
        }).addClass("tipArrow");


        tip = $("<div></div>").css({
            "position": "absolute",
            "left": "54px",
            "top": "80px",
            "z-index": "999",
            "display":"none"
        }).addClass("tipInfo").append(arrow).append(content).appendTo("body");

    }


    this.show = function (option) {
        tip.css({
            left: option.left,
            top: option.top,
            display:"block"
        })

        tip.find(".tipContent").html(option.content)

    }

    this.hide = function () {
        tip.hide();
    }


    init();


}