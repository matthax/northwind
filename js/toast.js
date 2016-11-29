if (!window.dom) {
    throw "Dom.js is required for toast.js";
}
window.dom.toast = function() {
    var settings = {
        max: 5,
        icon: "material",
    };
    var container = dom.create("div", {"class": "toast-box"});
    document.body.appendChild(container.node);
    var active = [];
    var queue = []; 
    var listeners = {
        "shown": [],
        "clicked": [],
        "hidden": [],
    };
    var toastEvent = function(type, toast) {
        var event = new CustomEvent(type, { 'detail': toast });
        toast.el.node.dispatchEvent(event);
    };
    var moveUp = function() {
        for (var i = 0; i < active.length; ++i) {
            //console.log(i, active[i], active[i].node.offsetHeight);
            active[i].style({transform: "translate(50%, -" + ((active[i].node.offsetHeight + 10) * ((active.length - i))) + "px)" });
        }
    };
    var show = function(prev) {
        if (queue.length && active.length < settings.max) {
            //console.info("Showing next");
            var toast = queue.shift();
            var toaster = toast.el;
            moveUp();
            active.push(toaster);
            container.append(toaster);
                toaster.style({transform: toaster.style('transform').replace("0%", "50%"), opacity: 1});
                window.setTimeout(function() {
                    var transitionEnded = function() {
                        //console.log("transition ended");
                        toaster.off(dom.transitionEvent, transitionEnded);
                        toastEvent("hidden", toast);
                        active.shift().remove();
                    };
                    dom(toaster).transitionEnd(transitionEnded).style({
                        transform: toaster.style('transform').replace("50%", "100%"), opacity: 0}) 
                }, 3000);
        }
    };
    var tempIndex = 0;
    var makeToast = function(message, icon) {
        var toaster = dom.create('div', {class: "toast"}).style({
            visibility: "visible",
            "min-width": "75px",
            width: "30%",
            "background-color": "rgb(0, 188, 212)",
            color: "#fff",
            "font-weight": "bold",
            "text-align": "center",
            "border-radius": "2px",
            padding: "16px",
            position: "fixed",
            "z-index": 1,
            right: "20%",
            transform: "translate(0%, 0px)",
            bottom: "30px",
            "moz-transition": "all 0.5s ease",
            "-webkit-transition": "all 0.5s ease",
            transition: "all 0.5s ease",
        });
        if(icon) {
            if (settings.icon === "material") {
                toaster.append(dom.icon(icon).style({float: "left"}));
            }
            else if (settings.icon === "fontawesome") {
                toaster.append(dom.fontawesome(icon).style({float: "left"}));
            }
        }
        toaster.text(message + " " + ++tempIndex);
        return toaster;
    };
    var toast = function(message) {
        var icon = arguments.length > 1 ? null : arguments[1];
        if (!(this instanceof toast)) {
            return new toast(message, icon);
        }
        this.el = makeToast(message, icon);
        this.on("hidden", show.bind(this, this));
        //console.log(this.el, this.el.node);
        queue.push(this);
        show(null);
    };
    toast.prototype.on = function(event, listener) {
        this.el.on(event, listener);
    };
    toast.prototype.off = function(event, listener) {
        this.el.off(event, listener);
    };
    return toast;
}();