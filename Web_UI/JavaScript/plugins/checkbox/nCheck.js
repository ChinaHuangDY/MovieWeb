//自定义checkbox
(function ($) {

    var _plugin = "custom_Checkbox";


    var $span = $("<span class='preloadCKimg'></span>");

    function init(obj) {
        $(obj).addClass(_plugin);


        var opts = $(obj).data();

        if (opts.checked == true) {//默认是否选中
            $(obj).addClass("checked");
            obj.checked = true;
        }

        $(obj).off("click").on("click", function () {
            toggle(this);
        })
    }

    function toggle(obj) {

        var state = $.data(obj, _plugin);
        var options = state.options;

        var flag = $(obj).hasClass("checked");

        if (options.onClick) {
            options.onClick.apply(obj, [flag]);
        }

        var name = $(obj).data().name;
        var val = $(obj).data().value;

        if (flag) {
            unCheck([obj]);
        }
        else {
            check([obj]);
        }

    }

    function check(obj) {

        if ($span) {
            $span.remove();
            $span = null;
        }


        $.each(obj, function (i) {

            if (!$(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;

                $(this).addClass("checked");

                this.checked = true;


                var data = $(this).data();


                if (options.onCheck) {
                    options.onCheck.apply(obj, [true, data.value]);
                }
            }

        })

    }


    function unCheck(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();
            var bl = state.checked;//默认是否选中

            if ($(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;

                $(this).removeClass("checked");

                this.checked = false;

                var data = $(this).data();


                if (options.onUnCheck) {
                    options.onUnCheck.apply(obj, [false, data.value]);
                }
            }
        })

    }


    function clear(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var bl = state.checked;//默认是否选中

            if (bl) {
                $(this).addClass("checked");
                this.checked = true;
            }
            else {
                $(this).removeClass("checked");
                this.checked = false;
            }

        })
    }


    function getChecked(obj) {

        var vals = $.map($(obj.selector + ".checked"), function (item, index) {
            var state = $(item).data();
            return { name: state.name, value: state.value, text: $(item).text(), target: item }
        })

        return vals;
    }

    function getCheckedVals(obj) {

        var arr = [];
        $.each($(obj.selector + ".checked"), function () {
            var state = $(this).data();
            arr.push(state.value);
        })

        return arr.join(',');
    }


    $.fn[_plugin] = function (options, parm) {

        if (typeof options == 'string') {
            return $.fn[_plugin].methods[options](this, parm);
        }
        options = options || {};

        if ($span) {
            $span.appendTo("body");
        }

        return this.each(function () {
            var state = $.data(this, _plugin);
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                var _opts = $.extend({}, {}, options);
                $.data(this, _plugin, {
                    options: _opts
                });
            }
            //dosometing
            init(this);


        });

    };

    $.fn[_plugin].methods = {
        check: function (jq) {
            return check(jq);
        },
        unCheck: function (jq) {
            return unCheck(jq);
        },
        clear: function (jq) {
            return clear(jq);
        },
        getChecked: function (jq) {
            return getChecked(jq);
        },
        getCheckedVals: function (jq) {
            return getCheckedVals(jq);
        }
    }

})($);



//自定义radio
(function ($) {

    var _plugin = "custom_Radio";
    var $span = $("<span class='preloadRADimg'></span>");

    function init(obj) {
        $(obj).addClass(_plugin);

        var opts = $(obj).data();

        if (opts.checked == true) {//默认是否选中
            $(obj).addClass("checked");
            obj.checked = true;
        }

        $(obj).off("click").on("click", function () {
            toggle(this);
        })
    }

    function toggle(obj) {
        var name = $(obj).data().name;
        var val = $(obj).data().value;
        check([obj]);
    }


    //取消选择同组radio
    function unCheckGroup(name, val) {

        var groups = $("." + _plugin + "[data-name='" + name + "']");

        $.each(groups, function () {

            var state = $(this).data();

            var _val = state.value;

            if (_val != val && $(this).hasClass("checked")) {
                $(this).removeClass("checked");
                this.checked = false;


                var state = $.data(this, _plugin);
                var options = state.options;

                var data = $(this).data();

                if (options.onUnCheck) {
                    options.onUnCheck.apply(this, [data.name, data.value]);
                }
            }

        })
    }


    function check(obj) {

        if ($span) {
            $span.remove();
            $span = null;
        }


        $.each(obj, function (i) {

            var state = $(this).data();

            var name = state.name;
            var val = state.value;


            unCheckGroup(name, val);


            if (!$(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;


                $(this).addClass("checked");

                this.checked = true;

                if (options.onCheck) {
                    options.onCheck.apply(obj, [name, val]);
                }
            }

        })

    }


    function unCheck(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var name = state.name;
            var val = state.value;

            if ($(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;

                $(this).removeClass("checked");

                this.checked = false;

                if (options.onUnCheck) {
                    options.onUnCheck.apply(obj, [name, val]);
                }
            }

        })

    }

    function clear(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var bl = state.checked;//默认是否选中

            if (bl) {
                $(this).addClass("checked");
                this.checked = true;
            }
            else {
                $(this).removeClass("checked");
                this.checked = false;
            }

        })
    }


    function getChecked(obj) {

        var vals = $.map($(obj.selector + ".checked"), function (item, index) {
            var state = $(item).data();
            return { name: state.name, value: state.value, text: $(item).text(), target: item }
        })

        return vals;
    }


    $.fn[_plugin] = function (options, parm) {

        if (typeof options == 'string') {
            return $.fn[_plugin].methods[options](this, parm);
        }
        options = options || {};

        if ($span) {
            $span.appendTo("body");
        }

        return this.each(function () {
            var state = $.data(this, _plugin);
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                var _opts = $.extend({}, {}, options);
                $.data(this, _plugin, {
                    options: _opts
                });
            }
            //dosometing
            init(this);


        });

    };

    $.fn[_plugin].methods = {
        check: function (jq) {
            return check(jq);
        },
        unCheck: function (jq) {
            return unCheck(jq);
        },
        clear: function (jq) {
            return clear(jq);
        },
        getChecked: function (jq) {
            return getChecked(jq);
        }
    }

})($);

//自定义radio
(function ($) {

    var _plugin = "custom_RadioEx";
    var $span = $("<span class='preloadRADimg'></span>");

    function init(obj) {
        $(obj).addClass(_plugin);

        var opts = $(obj).data();

        if (opts.checked == true) {//默认是否选中
            $(obj).addClass("checked");
            obj.checked = true;
        }

        $(obj).off("click").on("click", function () {
            toggle(this);
        })
    }

    function toggle(obj) {
        var name = $(obj).data().name;
        var val = $(obj).data().value;
        check([obj]);
    }


    //取消选择同组radio
    function unCheckGroup(name, val) {

        var groups = $("." + _plugin + "[data-name='" + name + "']");

        $.each(groups, function () {

            var state = $(this).data();

            var _val = state.value;

            if (_val != val && $(this).hasClass("checked")) {
                $(this).removeClass("checked");
                this.checked = false;


                var state = $.data(this, _plugin);
                var options = state.options;

                var data = $(this).data();

                if (options.onUnCheck) {
                    options.onUnCheck.apply(this, [data.name, data.value]);
                }
            }

        })
    }


    function check(obj) {

        if ($span) {
            $span.remove();
            $span = null;
        }


        $.each(obj, function (i) {

            var state = $(this).data();

            var name = state.name;
            var val = state.value;


            unCheckGroup(name, val);


            if (!$(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;


                $(this).addClass("checked");

                this.checked = true;

                if (options.onCheck) {
                    options.onCheck.apply(obj, [name, val]);
                }
            }

        })

    }


    function unCheck(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var name = state.name;
            var val = state.value;

            if ($(this).hasClass("checked")) {

                var state = $.data(this, _plugin);
                var options = state.options;

                $(this).removeClass("checked");

                this.checked = false;

                if (options.onUnCheck) {
                    options.onUnCheck.apply(obj, [name, val]);
                }
            }

        })

    }

    function clear(obj) {

        $.each(obj, function (i) {

            var state = $(this).data();

            var bl = state.checked;//默认是否选中

            if (bl) {
                $(this).addClass("checked");
                this.checked = true;
            }
            else {
                $(this).removeClass("checked");
                this.checked = false;
            }

        })
    }


    function getChecked(obj) {

        var vals = $.map($(obj.selector + ".checked"), function (item, index) {
            var state = $(item).data();
            return { name: state.name, value: state.value, text: $(item).text(), target: item }
        })

        return vals;
    }


    $.fn[_plugin] = function (options, parm) {

        if (typeof options == 'string') {
            return $.fn[_plugin].methods[options](this, parm);
        }
        options = options || {};

        if ($span) {
            $span.appendTo("body");
        }

        return this.each(function () {
            var state = $.data(this, _plugin);
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                var _opts = $.extend({}, {}, options);
                $.data(this, _plugin, {
                    options: _opts
                });
            }
            //dosometing
            init(this);


        });

    };

    $.fn[_plugin].methods = {
        check: function (jq) {
            return check(jq);
        },
        unCheck: function (jq) {
            return unCheck(jq);
        },
        clear: function (jq) {
            return clear(jq);
        },
        getChecked: function (jq) {
            return getChecked(jq);
        }
    }

})($);