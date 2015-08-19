var ns_dummy = (function () {
    var EXEC_URL = "https://dummy.ns.net/exec.json?jsoncallback=ns_dummy";
    var SELF_URL = "https://dummy.ns.net/js/self.js";

    addListener(window, "load", prepareNode, false);
    var body;

    function prepareNode() {
        var scripts = document.getElementsByTagName("script");
        var parameter = "";

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf(SELF_URL) >= 0) {
                var data = scripts[i].src.split("?");

                if (data.length === 2) {
                    parameter = "&" + scripts[i].src.split("?")[1];
                }
                break;
            }
        }

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = EXEC_URL + parameter + "&" + new Date().getMilliseconds();

        body = document.getElementsByTagName("body")[0];
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
                    window.setTimeout(function () { createNode(arg);}, 500 * i);
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
    var element = this;
    return function (result) { startNode.apply(element, arguments);};
}());