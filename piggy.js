var ns_piggy = (function () {
    var EXEC_URL = "https://example.net/exec.json?jsoncallback=ns_piggy";
    var SELF_URL = "https://example.com/js/piggy.js";
    var body;
    function prepareNode() {
        var scripts = document.getElementsByTagName("script");
        var parameter = "";

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf(SELF_URL) == 0) {
                var data = scripts[i].src.split("?");

                if (data.length === 2) {
                    parameter = "&" + data[1];
                }
                break;
            }
        }

        body = document.getElementsByTagName("body")[0];
        var script = document.createElement("script");
        script.src = EXEC_URL + parameter + "&" + new Date().getMilliseconds();
        body.appendChild(script);
    }
    function createNode(result) {
        var element = document.createElement(result.tag);
        if (result.src) {
            element.src = result.src + "&" + new Date().getMilliseconds();
        }
        if (result.type) {
            element.type = result.type;
        }
        if (result.style) {
            element.style = result.style;
        }
        body.appendChild(element);
    }
    function startNode(result) {
        if (result.nstag) {
            for (var i = 0; i < result.nstag.length; i++) {
                (function (arg) {
                    window.setTimeout(function () { createNode(arg);}, 0);
                }(result.nstag[i]));
            }
        }
    }
    function addListener(element, eventType, functionP, capture) {
        if (element.addEventListener) {
            element.addEventListener(eventType, functionP, capture);
        } else {
            element.attachEvent('on' + eventType, functionP);
        }
    }
    addListener(window, "load", prepareNode, false);
    var element = this;
    return function (result) { startNode.apply(element, arguments);};
}());
