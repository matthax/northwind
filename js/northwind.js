if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.cart) {
    throw "Cart.js is required";
}
window.northwind = function() {
    var nw = {}, handlers = {}, getHashPage = function() {
        return document.location.hash.length > 0 ? document.location.hash.substr(1).toLowerCase() : "/";
    }, changed = function() {
        var page = getHashPage();
        for (var property in handlers) {
            if (handlers.hasOwnProperty(property)) {
                if (handlers[property].regex.test(page)) {
                    handlers[property].handler(page, nw.load);
                    break;
                }
            }
        }
    };
    nw.registerPageHandler = function(name, re, handler) {
        if (typeof re !== "undefined" && typeof re.test === "function" && typeof handler === "function") {
            handlers[name] = { regex: re, handler: handler };
            var page = getHashPage();
            if (re.test(page)) {
                handler(page, nw.load);
            }
        }
    };
    nw.removePageHandler = function(name) {
        var old = handlers[name];
        if (handlers[name]) {
            delete handlers[name];
        }
        return old;
    };
    nw.load = function(page) {
        // make this fancier with like a loading screen or something
        dom("#page").removeChildren().append(page);
    };
    window.onhashchange = function() {
        changed();
    };
    var init = function() {
        
    };
                               
    return nw;
}();
/*
<div style="position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; border-radius: 50%; background-color: rgba(0, 0, 0, 0.870588); opacity: 0; transform: scale(1); transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;"></div>
*/
