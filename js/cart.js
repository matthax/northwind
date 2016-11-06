if (!dom) {
    throw "Dom.js is required to use cart.js";
}
window.cart = function() {
    var cart = {}, 
        items = {},
        settings = {
        validate: false,
        debug: true,
        requestType: ajax.REQUESTS.GET,
        url: dom.url() + "/api/cart",

    },
        listeners = {
            "settingschanged": [],
            "itemadded": [],
            "itemremoved": [],
            "itemsretrieved": [],
            "xhrerror": [],
            "cartupdated": [],
            "cartsaved": [],
        };
    var cartEvent = function(type) {
        var args;
        switch (type) {
            case "settingschanged":
                args =  settings;
                break;
            case "itemadded":
            case "itemremoved":
            case "itemsretrieved":
            case "xhrerror":
                args = arguments[1];
                break;
            case "cartupdated":
            case "cartsaved":
            default:
                args = items;
                break;
        }
        if (listeners[type]) {
            for (var i = 0; i < listeners[type].length; ++i) {
                listeners[type][i](type, args);
            }
        }
    };
    var isItem = function(item, callback) {
        if (!(item instanceof cart.item)) {
            callback(false, null);
        }
        else if (settings.validate) {
            // make ajax call to check
            callback(true, item);
        }
        callback(true, item);
    };
    cart.on = function(event, listener) {
        if (listeners[event] && typeof listener === "function") {
            listeners[event].push(listener);
        }
    };
    cart.off = function(event, listener) {
        if (listeners[event]) {
            for (var i = listeners[event].length - 1; i >= 0; --i) {
                if (listeners[event][i] == listener) {
                    listeners[event].splice(i, 1);
                }
            }
        }
    };
    cart.add = function(item) {
        isItem(item, function(valid, item) {
            if (valid) {
                if (items[item.ProductID]) {
                    ++items[item.ProductID].Quantity;
                }
                else {
                    items[item.ProductID] = item;
                }
                cartEvent("itemadded", item);
            }
        });
    };
    cart.clear = function() {
        items = {};
    };
    cart.remove = function(item) {
        var old;
        if (typeof item === "string") {
            old = items[item];
            delete items[item];
            cartEvent("itemremoved", old);
        }
        else {
            for (var property in items) {
                if (items.hasOwnProperty(property)) {
                    if (items[property] == item) {
                        old = items[property];
                        delete items[property];
                        cartEvent("itemremoved", old);
                    }
                }
            }
        }
    };
    // @props {onsuccess, onerror, length, page}
    cart.getItems = function() {
        var props = arguments.length > 0 ? arguments[0] : { page: 0, count: 10 };
        var page = typeof props.page === "undefined" ? 0 : Number.parseInt(props.page);
        if (isNaN(page)) { page = 0; }
        var count = typeof props.length === "undefined" ? 10 : Number.parseInt(props.length);
        if (isNaN(count)) { count = 10; }
        //items?length=10&page=0
        dom.ajax({
            type: settings.requestType,
            url: settings.url + "/items",
            responseType: dom.ajax.RESPONSE_TYPES.JSON,
            data: { length: count, page: page },
            oncomplete: function(xhr, data) {
                if (settings.debug) {
                    window.items = data;
                }
                var cartItems = [];
                for (var i = 0; i < data.length; ++i) {
                    cartItems.push(new cart.item(data[i]));
                }
                cartEvent("itemsretrieved", cartItems);
                if (props.onsuccess) {
                    props.onsuccess(cartItems);
                }
            },
            onerror: function(xhr) {
                if (settings.debug) {
                    console.error("XHR failed for item validation", xhr);
                    cartEvent("xhrerror", xhr);
                    if (props.onerror) { 
                        onerror(xhr);
                    }
                }
            }
        });
    };
    cart.item = function(props) {
        if (!(this instanceof cart.item)) {
            return new cart.item(props);
            if (settings.debug) {
                console.warn("Cart item was not initialized using new");
            }
        }
        if (typeof props === "string") {
            props = JSON.parse(props);
        }
        this.ProductID = props["id"];
        this.ProductName = props["product_name"].replace("booxch5_NW ", "");
        this.SupplierIDs = props["supplier_ids"];
        this.ProductCode = props["product_code"];
        this.Description = props["description"];
        //this.Cost = props["standard_cost"];
        this.Price = props["list_price"];
        this.Unit = props["quantity_per_unit"];
        this.MinimumOrder = props["minimum_reorder_quantity"];
        this.Category = props["category"];
        this.Quantity = 0;
    };
    cart.item.prototype.validate = function(callback) {
        var item = this;
        dom.ajax({
            type: settings.requestType,
            url: settings.url + "/items",
            responseType: dom.ajax.RESPONSE_TYPES.JSON,
            data: { ProductID: item.ProductID },
            oncomplete: function(xhr, data) {
                if (settings.debug) {
                    window.cartValidateData = data;
                }
                if (!data.error) {
                    callback(true, new cart.item(data));
                }
                else {
                    callback(false, null);
                    if (settings.debug) {
                        console.warn("Item failed validity check", item, data);
                    }
                }
            },
            onerror: function(xhr) {
                if (settings.debug) {
                    console.error("XHR failed for item validation", xhr);
                }
            }
        });
    };
    cart.item.prototype.toElement = function() {
        var card = dom.div().style({
            color: "rgba(0, 0, 0, 0.870588)",
            "background-color": "rgb(255, 255, 255)",
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            "box-sizing": "border-box",
            "font-family": "Roboto, sans-serif",
            "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
            "box-shadow": "rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px",
            "border-radius": "2px",
            display: "-webkit-box",
            display: "-ms-flexbox",
            display: "flex",
            "width": "13em",
            "height": "15em",
            "margin-top": "1em",
            overflow: "hidden",
            "-webkit-box-orient": "vertical",
            "-webkit-box-direction": "normal",
            "-ms-flex-direction": "column",
            "flex-direction": "column",
            "z-index": 1,
        }).append(dom.span({text: this.ProductName}).style({
                "font-size": "24px",
            color: "rgba(0, 0, 0, 0.870588)",
            display: "block",
            "line-height": "36px",
        })).append(dom.div({ text: this.Description }).style({
            "padding": "16px",
            "font-size": "14px",
            "color": "rgba(0, 0, 0, 0.870588)"
        })).append(dom.div().style({
            padding: "8px",
            position: "relative"
        }).append(
            dom.create("button", {
                type: "button", 
                text: "Add to Cart " + this.Price 
            }).style({
                "border": "10px",
                "box-sizing": "border-box",
                "display": "inline-block",
                "font-family": "Roboto, sans-serif",
                "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
                "cursor": "pointer",
                "text-decoration": "none",
                "margin": "0px 8px 0px 0px",
                "padding": "0px",
                "outline": "none",
                "font-size": "inherit",
                "font-weight": "inherit",
                "transform": "translate(0px, 0px)",
                "height": "36px",
                "line-height": "36px",
                "min-width": "88px",
                "color": "rgba(0, 0, 0, 0.870588)",
                "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
                "border-radius": "2px",
                "position": "relative",
                "overflow": "hidden",
                "background-color": "rgba(0, 0, 0, 0)",
                "text-align": "center",
                "user-select": "none",
        })));
        return card;
    };
    
    cart.settings = settings;
    return cart;
}();

var testCart = function() {
    var startItem = window.sampleItem ={
        "id": 5,
        "product_code": "NWTO-5",
        "supplier_ids": "10",
        "product_name": "booxch5_NW Traders Olive Oil",
        "description": null,
        "list_price": "21.3500",
        "reorder_level": 10,
        "target_level": 40,
        "quantity_per_unit": "36 boxes",
        "discontinued": 0,
        "minimum_reorder_quantity": 10,
        "category": "Oil",
        "attachments": ""
        };
    var item = window.item = cart.item(window.sampleItem);
    item.validate(function(valid, item) { console.log(valid); console.log(item); });
}