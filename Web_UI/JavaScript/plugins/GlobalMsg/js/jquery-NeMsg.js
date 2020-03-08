//NeMsg 弹出提示信息JS****************//

(function ($) {

    var _plugin = "NeMsg";

    var _default = {

    }

    $.fn[_plugin] = function (options, parm) {
        if (typeof options == 'string') {
            return $.fn[_plugin].methods[options](this, parm);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, _plugin);
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                var _opts = $.extend({}, _default, options);
                $.data(this, _plugin, {
                    options: _opts
                });
            }
            //dosometing
            init(this);
        });

    };

    $.fn[_plugin].methods = {
        show: function (jq) {
            return show(jq[0]);
        },
        hide: function (jq, parm) {
            return show(jq[0]);
        },
        close: function (jq) {
            return close(jq[0]);
        },
        appendContent: function (jq, parm) {
            return appendContent(jq[0],parm);
        }
    }

    function init(obj) {

        var title = $(obj).data(_plugin).options.title;

        var $container = $(obj).addClass("msg_container");
      
        var $head = $('<div class="msg_head"><span class="title">' + title + '</span><span class="tool_btns"></span></div>').appendTo($container);
        $('<a class="msg_min"></a><a class="msg_close"></a>').appendTo($head.find(".tool_btns"));

        var $body = $('<div class="msg_body"></div>').appendTo($container);
        var $foot = $('<div class="msg_foot"></div>').appendTo($container);
        var $foot_btn = $('<a class="link msg_history">历史消息&gt;&gt;</a>').appendTo($foot);

        var $max_btn = $('<a class="msg_max"></a>');

        $head.on('click', '.msg_min', function () {
            mini(obj);
        });
        $head.on('click', '.msg_close', function () {
            close(obj);
        });

    }

    function show(obj) {
        var isHide = $(obj).is(":hidden");
        if (isHide) {//如果已经显示了 则不在进行显示操作
            $(obj).slideDown();
        }
    }

    function mini(obj) {

        $(obj).slideUp(function () {
            var $max_btn = $("<a class='msg_max'></a>");
            $max_btn.appendTo("body").on("click", function () {
                $(this).remove();
                show(obj);
            })

        });
    }

    function close(obj) {
        $(obj).slideUp(function () {
            clear(obj);
        });
    }

    function clear(obj) {

        var $body = $(obj).find(".msg_body").empty();
        var $max_btn = $(".msg_max");
        $max_btn.remove();
    }

    function appendContent(obj, content) {
        if (content) {
        var $body = $(obj).find(".msg_body");
        $body.prepend(content);
        show(obj);
    }
    }

})(jQuery);