if (!window.dom) {
    throw "Dom.js is required for toast.js";
}
window.dom.toast = function() {
    var settings = {
        max: 5,
        duration: 3000,
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
            active[i].style({transform: "translate(0%, -" + ((active[i].node.offsetHeight + 10) * ((active.length - i))) + "px)" });
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
            // request animation frame to ensure our toast has been rendered by the browser
            window.requestAnimationFrame(function() {
                toaster.style({ transform: toaster.style('transform').replace("200%", "0px"),}); //transform: toaster.style('transform').replace("0%", "50%"),
                window.setTimeout(function() {
                    var transitionEnded = function() {
                        //console.log("transition ended");
                        toaster.off(dom.transitionEvent, transitionEnded);
                        toastEvent("hidden", toast);
                        active.shift().remove();
                    };
                    dom(toaster).transitionEnd(transitionEnded).style({
                        transform: toaster.style('transform').replace("0%", "100%"), opacity: 0}) 
                }, settings.duration);
            });
        }
    };
    var makeToast = function(message, icon) {
        var toaster = dom.create('div', {class: "toast", text: message}).style({
            visibility: "visible",
            "min-width": "75px",
            "background-color": "rgb(0, 188, 212)",
            color: "#fff",
            "font-weight": "bold",
            "text-align": "center",
            "border-radius": "2px",
            padding: "16px",
            position: "fixed",
            "z-index": 1,
            right: "20px",
            transform: "translate(0%, 200%)",
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
        return toaster;
    };
    var toast = function(message) {
        var icon = arguments.length > 1 ? arguments[1] : null ;
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