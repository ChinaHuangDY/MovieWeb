var dropPanel = function (opts) {


    var _this = this;
    var _opts = {
        container: opts.container,
        panel: opts.panel,
        speed: opts.speed || 500,
        animate: opts.animate || {},
        blurHide: !!opts.blurHide
    };

    var container = _opts.container;
    var panel = _opts.panel;
    var speed = _opts.speed;

    var animate = _opts.animate;
    var blurHide = _opts.blurHide;


    //控制  在点击其它区域时自动隐藏
    function focusEvent() {
        var $rad = $('<input type="radio" style="position: absolute; top: -2000%;" class="focusObj" />');

        $(panel).append($rad);

        $(panel).on("mouseleave", function () {
            $rad.val(1)
            $rad.focus();
        }).on("mouseenter", function () {
            $rad.val(0)
        })

        $rad.on("blur", function () {
            if (this.value == 1) {
                _this.hide();
            }
            this.value = 0;
        })
    }

    var init = function () {
        $(panel).css({
            position: function () {
                if (container) {
                    return "relative;"
                }
                else {
                    return "absolute"
                }
            },
            display: "none"
        }).appendTo($("body"));

        if (blurHide) {
            focusEvent();
        }


    }

    this.Toggle = function () {
        var _this = this;

        if ($(panel).is(":animated")) {

        }
        else {
            var isHide = $(panel).is(":hidden");

            if (isHide) {
                _this.show();
            }
            else {
                _this.hide();
            }
        }
    }




    function getAnimate() {

        var ani_f = {};
        var ani_t = {};

        if (animate.from) {
            if (animate.from.left) {
                ani_f.left = animate.from.left;
            }
            if (animate.from.top) {
                ani_f.top = animate.from.top;
            }
        }


        if (animate.to) {
            if (animate.to.left) {
                ani_t.left = animate.to.left;
            }
            if (animate.to.top) {
                ani_t.top = animate.to.top;
            }
        }

        return { from: ani_f, to: ani_t }
    }

    function show() {

        var animation = getAnimate();
        var ani_f = animation.from;
        var ani_t = animation.to;

        ani_t.opacity = 'show';

        $(panel).css(ani_f)

        $(panel).animate(ani_t, speed, function () {
        });

        $(panel).find(".focusObj").focus().val(1);
    }

    function hide() {

        var animation = getAnimate();
        var ani_f = animation.from;
        var ani_t = animation.to;

        ani_f.opacity = 'hide';

        $(panel).animate(ani_f, speed, function () {
            $(panel).css(ani_t)
        });
    }

    this.show = function () {

        show();
        if (opts.onShow) {
            opts.onShow();
        }
    }

    this.hide = function () {

        hide();
        if (opts.onHide) {
            opts.onHide();
        }

    }
    init();
}
