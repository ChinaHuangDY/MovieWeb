

var draggable = function (opts) {
    var handler = $(opts.handler);
    var panel = $(opts.panel);

    var _beginning = false;
    var _beginOffset = { left: 0, top: 0 };

    var timer = null;

    function move(offset) {


      $(panel).css({ left: offset.left - _beginOffset.left, top: offset.top - _beginOffset.top });

        // $(panel).css({ left: offset.left - X, top: offset.top - Y });

    }

    function stop() {
        $(document).off("mouseup");
        $(document).off("mousemove");
    }

    function init() {

        $(handler).css({ cursor: "move" });

        $(handler).on("drag", function (e) {
            e.preventDefault();
        });

        $(handler).on("mousedown", function (e) {

            var position = $(panel).offset();

            var X = e.clientX - position.left;
            var Y = e.clientY - position.top;


            _beginOffset.left = X;
            _beginOffset.top = Y;


            $(document).on("mouseup", function (e) {

                stop();

            }).on("mousemove", function (e) {

                e.preventDefault();
                e.stopPropagation();

                move({ left: e.clientX, top: e.clientY });

            })


        })
    }

    init();
}