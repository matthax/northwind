window.node = function (node) {
    this.el = this.node = node;
};

node.prototype.append = function(n) {
    if (Array.isArray(n)) {
        for (var i = 0; i < n.length; ++i) {
            if(n[i]) this.node.appendChild(n[i] instanceof node ? n[i].node : n[i]);
        }
    }
    else {
        if(n) this.node.appendChild(n instanceof node ? n.node : n);
    }
    return this;
};
node.prototype.before = function(newNode, refNode) {
    if (newNode instanceof node) { newNode = newNode.node; }
    if (refNode instanceof node) { refNode = refNode.node; }
    this.node.insertBefore(newNode, refNode);
    return this;
};
node.prototype.delay = function(time, fn) {
    return window.setTimeout(fn.bind(this), time);
};
node.prototype.text = function() {
    if(arguments.length > 0) {
        var append = arguments.length > 1 && arguments[1];
        if(append) {
            if (Array.isArray(arguments[0])) {
                for(var i = 0; i < arguments[0].length; ++i) {
                    this.node.appendChild(document.createTextNode(arguments[0][i]));
                    this.node.appendChild(document.createElement('br'));
                }
            }
            else {
                this.node.appendChild(document.createTextNode(arguments[0]));
                this.node.appendChild(document.createElement('br'));
            }
            return this;
        }
        else {
            this.node.textContent = Array.isArray(arguments[0]) ? arguments[0].join(", ") : arguments[0];
            return this;
        }
    }
    else {
        return this.node.textContent;
    }
};
node.prototype.next = function() {
    if (arguments.length > 0) {
        var selector = arguments[0], n = this.node;
        if (selector.length === 0) {
            return n.nextElementSibling;
        }
        while((n = n.nextElementSibling) != null) {
            if (Sizzle.matchesSelector(n, selector)) {
                return new node(n);
            }
        }
        return null;
    }
    var n = this.node.nextElementSibling;
    if (n == null) { return null; }
    else return new node(n);
};
node.prototype.previous = node.prototype.prev = function() {
    if (arguments.length > 0) {
        var selector = arguments[0], n = this.node;
        if (selector.length === 0) {
            return n.previousElementSibling;
        }
        while((n = n.previousElementSibling) != null) {
            if (Sizzle.matchesSelector(n, selector)) {
                return new node(n);
            }
        }
        return null;
    }
    var n = this.node.previousElementSibling;
    if (n == null) { return n; }
    else return new node(n);
};
node.prototype.remove = function() {
    if(arguments.length > 0 && (arguments[0] instanceof node || arguments[0] instanceof Node || arguments[0] instanceof Element)) {
        for (var i = 0; i < arguments.length; ++i)
            this.node.removeChild(arguments[i] instanceof node ? arguments[i].node : arguments[i]);
        return this;
    }
    else {
        if (this.node.parentNode)
            this.node.parentNode.removeChild(this.node);
    }
    return null;
};
node.prototype.removeChildren = node.prototype.clear = function() {
    while(this.node.lastChild) {
        this.node.removeChild(this.node.lastChild);
    }
    return this;
};
node.prototype.replace = function(newNode) {
    this.node.parentNode.replaceChild(newNode instanceof node ? newNode.node : newNode, this.node);
    this.node = this.el = newNode instanceof node ? newNode.node : newNode;
    return this;
}
node.prototype.class = node.prototype.toggleClass = function() {
    this.node.classList.toggle.apply(this.node.classList, arguments);
    return this;
};
node.prototype.removeClass = function() {
    this.node.classList.remove.apply(this.node.classList, arguments);
    return this;
};
node.prototype.addClass = function() {
    this.node.classList.add.apply(this.node.classList, arguments);
    return this;
};
node.prototype.hasClass = function(className) {
    return this.node.classList.contains(className);
}
node.prototype.attr = function(props) {
    if (props == null) return this;
    if (arguments.length === 1 && typeof props === "string") {
        return this.node.getAttribute(props);
    }
    else if (arguments.length === 2) {
        this.node.setAttribute(props, arguments[1]);
    }
    else {
        for (var property in props) {
            if (props.hasOwnProperty(property)) {
                if (property.toLowerCase() == "text") {
                    this.text(props[property]);
                }
                else
                    this.node.setAttribute(property, props[property]);
            }    
        }
    }
    return this;
};
node.prototype.removeAttr = function(attr) {
    this.node.removeAttribute(attr);
    return this;
}
node.prototype.style = function(styles) {
    if (styles == null) return this;
    if (typeof styles === "string") {
        return this.node.style[styles];
    }
    for (var property in styles) {
        if (styles.hasOwnProperty(property)) {
            this.node.style[property] = styles[property];
        }    
    }
    return this;
};
node.prototype.data = function(key) {
    if (typeof key === "string") {
        if (arguments.length == 2) {
            this.node.setAttribute("data-" + key, arguments[1]);
            return this;
        }
        else {
            return this.node.getAttribute("data-" + key);
        }
    }
    else {
        for (var property in key) {
            if (key.hasOwnProperty(property)) {
                this.node.setAttribute("data-" + property, props[property]);
            }    
        }
        return this;
    }
};
node.prototype.on = function(event, fn) {
    this.node.addEventListener(event, fn);
    return this;
};
node.prototype.off = function(event, fn) {
    this.node.removeEventListener(event, fn);
    return this;
};
node.prototype.value = function() {
    if(arguments.length == 1) {
        if(typeof this.node.value !== "undefined") {
            this.node.value = arguments[0];
        }
        else {
            this.node.setAttribute("value", arguments[0]); // nodeValue?
        }
        return this;
    }
    else {
        if (typeof this.node.value !== "undefined") return this.node.value;
        else return this.node.getAttribute('value');
    }
};
node.prototype.parent = function() {
    return new node(this.node.parentNode);
};
node.prototype.firstElement = function() {
    var el = this.node.firstElementChild || this.node.children.length > 0 ? this.node.children[0] : null;
    return el == null ? null : new node(el);
};
node.prototype.children = function(selector) {
    return dom(selector, this.node);
};
node.prototype.first = function() {
    if (arguments.length > 0) {
        var selector = arguments[0];
        return dom(selector + ':first', this.node)[0];
    }
    else {
        return this.node.firstChild;
    }
};
node.prototype.last = function() {
    if (arguments.length > 0) {
        var selector = arguments[0];
        return dom(selector + ':last', this.node)[0];
    }
    else {
        return this.node.lastChild;
    }
};
node.prototype.transitionEnd = function(callback) {
    if (typeof callback === "function") {
        this.node.addEventListener(dom.transitionEvent, callback);
    }
    return this;
};
node.prototype.animationEvent = function(type, callback) {
    var pfx = ["webkit", "moz", "MS", "o", ""];
	for (var p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		this.node.addEventListener(pfx[p]+type, callback, false);
	}
    return this;
};
node.prototype.animationStart = function(callback) {
    return this.animationEvent("AnimationStart", callback);
};
node.prototype.animationEnd = function(callback) {
    return this.animationEvent("AnimationEnd", callback);
};
node.prototype.animationIteration = function(callback) {
    return this.animationEvent("AnimationIteration", callback);
};
/*node.prototype.ripple = function() {
        var ripple = dom.div().style({
            position: "absolute",
            top: "0px",
            left: "0px", 
            height: "100%",
            width: "100%",
            "border-radius": "50%",
            "background-color": "rgba(0, 0, 0, 0.870588)",
            opacity: 0,
            transform: "scale(1)",
            transition: "opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms"
        }).transitionEnd(function() {
            ripple.remove();
            console.log("removed");
        });
    this.append(ripple);
    ripple.node.style.opacity = 1;
    return this;
};*/
/***********************************************************
 *                   DOM
 ***********************************************************/
var dom = function(selector) {
    var target = arguments.length > 1 ? arguments[1] : document;
    var count = arguments.length > 2 ? arguments[2] : -1;
    //add , support
    if (arguments.length === 2 && !(arguments[1] instanceof Node || arguments[1] instanceof Element)) {
        //console.warn(arguments);
        return dom.create(arguments[0], arguments[1]);
    }
    else if (selector instanceof Node) {
        return new node(selector);
    }
    else if (selector instanceof node) {
        return selector;
    }
    else if (selector == null || selector.length == 0) {
        return null;
    }
    else if (selector.charAt(0) == '#') {
        return new node(document.getElementById(selector.substr(1)));
    }
    else {
        var els = Sizzle(selector, target);
        for (var i = els.length - 1; i >= 0; --i) {
            els[i] = new node(els[i]);
            if (count > 0 && (els.length - i > count))
                return els;
        }
        return els;
    }
};
dom.create =  function(tag, props) {
    var n = new node(document.createElement(tag));
    return n.attr(props);
};
dom.a = function(href, props) {
    if (props == null) props = {};
    props.href = href;
    return this.create('a', props);
};
dom.div = function() {
    var props = arguments.length == 1 ? arguments[0] : null;
    return this.create('div', props);
};
dom.span = function() {
    var props = arguments.length == 1 ? arguments[0] : null;
    return this.create('span', props);
};
dom.label = function() {
    var props = arguments.length == 1 ? arguments[0] : null;
    return this.create('label', props);
};
dom.p = function() {
    var props = arguments.length == 2 ? arguments[1] : {};
    if(arguments.length == 1) {
        props.text = arguments[0];
    }
    return this.create('p', props);
};
dom.td = function() {
    var props = arguments.length == 2 ? arguments[1] : {};
    if(arguments.length > 0) {
        if (typeof arguments[0] === "string") props.text = arguments[0];
    }
    var n = this.create('td', props);
    if (arguments.length > 0 && arguments[0] instanceof node || arguments[0] instanceof Node || arguments[0] instanceof Element) {
        return n.append(arguments[0]);
    }
    return n;
};
dom.input = function(type) {
    var props = arguments.length == 2 ? arguments[1] : {};
    props.type = type;
    return this.create('input', props);
};
dom.icon = function(icon) {
    return this.create('i', {class: 'material-icons', text: icon}); //
};
dom.fontawesome = function(icon) {
    return this.create('i', {class: 'fa fa-' + icon});
};
dom.onload = function(f) {
    var old = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = f;
    } else {
        window.onload = function () {
            old();
            f();
        }
    }
};
/*dom.toast = function(text) {
    var icon = arguments.length > 1 && typeof arguments[1] === "string" ? dom.icon(arguments[1]).style({float:'left'}) : (arguments.length > 2 && typeof arguments[2] === "string" ? dom.icon(arguments[2]).style({float:'left'}) : null);
    
    var onclick = arguments.length > 1 && typeof arguments[1] === "function" ? arguments[1] : arguments.length > 2 && typeof arguments[2] === "function" ? arguments[2] : null;
    var snack;
    var hide = function() {
        snack.removeClass('show');
        if (dom.toast.stack && dom.toast.stack.length) {
            var nxt = dom.toast.stack.pop();
            setTimeout(function() { dom.toast(nxt.text, nxt.icon, nxt.callback); }, 1000);
        }
    };
    if (document.getElementById('snackbar')) {
        snack = dom("#snackbar");
        if (snack.hasClass('show')) {
            if (!dom.toast.stack) { dom.toast.stack = []; }
            dom.toast.stack.push({text:text, icon: arguments.length > 1 && typeof arguments[1] === "string" ? arguments[1] : arguments.length > 2 && typeof arguments[2] === "string" ? arguments[2] : null, callback: onclick});
        }
        else {
            snack.remove();
            snack = dom.create('div', {id: 'snackbar'});
            if (onclick) {
                snack.on('click', onclick);
            }
            dom(document.body).append(snack.text(text).append(icon).addClass('show'));
            setTimeout(hide, 3000);
        }
    }
    else {
        snack = dom.create('div', {id: 'snackbar'});
        if (onclick) {
            snack.on('click', onclick);
        }
        dom(document.body).append(snack.text(text).append(icon).addClass('show'));
        setTimeout(hide, 3000);
    }
};*/
dom.url = function() {
    return [location.protocol, '//', location.host, location.pathname].join('');
};
dom.transitionEvent = function() {
    var t;
    var el = document.createElement('span');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}();
(function() { 
    var change = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1) || window.location.hash.substr(window.location.hash.lastIndexOf('?')).substr(1);

    dom.query = {};
    while (match = search.exec(query))
       dom.query[decode(match[1])] = decode(match[2]);
}; 
    window.addEventListener("hashchange", change); 
    window.addEventListener("popstate", change);
    change();
})();
dom.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
window.requestAnimationFrame = window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

		window.setTimeout( callback, 1000 / 60 );
	};
var ajax = function(opts) {
    if (!(this instanceof ajax)) {
        return new ajax(opts);
    }
    this.type = opts.type ? (ajax.REQUESTS[opts.type.toUpperCase()] ? opts.type : ajax.REQUESTS.GET) : ajax.REQUESTS.GET;
    this.url = ajax.getUrl(opts.url);
    this.data = opts.data ? opts.data : null;
    
    this.xhr = _ajax(this.url, this.type, opts.oncomplete, opts.onerror, opts.responseType, this.data);
    
};
/*ajax.prototype.on = function(event, fn) {
    
};*/
dom.ajax = ajax;
var _ajax = function() {
    var REQUESTS = window.ajax.REQUESTS = { GET:"GET", POST:"POST" };
    var RESPONSE_TYPES = window.ajax.RESPONSE_TYPES = { ArrayBuffer:"arraybuffer", Blob:"blob", Document:"document", JSON:"json", DomString:"text" };
    var STATUS_CODES = window.ajax.STATUS_CODES = { OK:200, NOT_FOUND:404 };
    //var CallBacks = { };
    var RESPONSE_HANDLERS = { 
        ArrayBufferHandler:function(e, callback, error) { 
            if (e.status == STATUS_CODES.OK) { 
                if(isFunction(callback)) { callback(e); }
            }
            else { if(isFunction(error)) { error(e); } }
        },
        BlobHandler:function(e, callback, error) {
            if (e.status == STATUS_CODES.OK) { 
                if(isFunction(callback)) { callback(e); }
            } 
            else { if(isFunction(error)) { error(e); } }
        },
        DocumentHandler:function(e, callback, error) {
        if (e.status == STATUS_CODES.OK) { 
                if(isFunction(callback)) { callback(e); }
            }
            else { if(isFunction(error)) { error(e); } }
        },
        JSONHandler:function(e, callback, error) {
            if (e.status == STATUS_CODES.OK) { 
                if(isFunction(callback)) { callback(e, JSON.parse(e.responseText)); }
            }
            else { if(isFunction(error)) { error(e); } }
        },
        DomStringHandler:function(e, callback, error) {
        if (e.status == STATUS_CODES.OK) { 
                if(isFunction(callback)) { callback(e); }
            }
        else { if(isFunction(error)) { error(e); } }
        },
    };
    /*for(var key in RESPONSE_TYPES) {
            CallBacks[key] = [];
        }*/
    function isFunction(object) {
        return !!(object && object.constructor && object.call && object.apply);
    }
    window.ajax.getUrl = function(url) {
        if (url == null || typeof url === "undefined") {
            throw "Invalid URL specified";
        }
        var urlExp = new RegExp('^(?:[a-z]+:)?//', 'i');
        
        if(urlExp.test(url)) {
            return url;
        }
        else {
            if (url.length && url.charAt(0) == '/') {
                return window.location.origin + url;
            }
            else {
                return window.location.origin + '/' + url;
            }
        }
    }
    /*function SetCallback(response_type, callback) {
        CallBacks[response_type.toLowerCase()] = callback;
    }*/
    var ajax = function(url, type, oncomplete, onerror, response_type)
    {
        var data = arguments.length > 5 ? arguments[5] : null;
        if (data && !(data instanceof FormData)) {
            var params = typeof data == 'string' ? data : Object.keys(data).map(
                function(k){ 
                    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) 
                }
            ).join('&');
            data = params;
        }
        if (typeof data === "string" && type.toUpperCase() == REQUESTS.GET) {
            url += "?" + data;
        }
        if(response_type == undefined)
            response_type = "";
        var xhr = new XMLHttpRequest();
        xhr.responseType = response_type;
        xhr.open(type, url, true);
        xhr.withCredentials = true;
        switch(response_type.toLowerCase())
        {
            case RESPONSE_TYPES.ArrayBuffer:
                xhr.onload =  function() { RESPONSE_HANDLERS.ArrayBufferHandler(this, oncomplete, onerror); };
                break;
            case RESPONSE_TYPES.Blob:
                xhr.onload =  function() {RESPONSE_HANDLERS.BlobHandler(this, oncomplete, onerror); };
                break;
            case RESPONSE_TYPES.Document:
                xhr.onload = function() { RESPONSE_HANDLERS.DocumentHandler(this, oncomplete, onerror); };
                break;
            case RESPONSE_TYPES.JSON:
                xhr.responseType = RESPONSE_TYPES.DomString; //WebKit doesn't support json yet
                xhr.onload =  function() { RESPONSE_HANDLERS.JSONHandler(this, oncomplete, onerror); };
                break;
            case RESPONSE_TYPES.DomString:
                xhr.onload =  function() { RESPONSE_HANDLERS.DomStringHandler(this, oncomplete, onerror); };
                break;
            default:
                xhr.onload =  function(e) { RESPONSE_HANDLERS.DomStringHandler(this, oncomplete, onerror); };
                break;
        }
        if (data) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
        return xhr;
    };
    return ajax;
}();