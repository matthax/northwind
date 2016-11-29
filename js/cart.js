if (!dom) {
    throw "Dom.js is required to use cart.js";
}
window.cart = function() {
    var cart = {}, 
        items = {},
        settings = {
        validate: false,
        toast: true,
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
    var buttonHovered = function(ev) {
        dom(this).style({
            "background-color": "rgba(0, 0, 0, 0.05)",
        });
    };
    var buttonLostHover = function(ev) {
        dom(this).style({
            "background-color": "rgba(0, 0, 0, 0)"
        });
    };
    var textHovered = function(ev) {
        dom(this).style({
            color: "rgb(0, 188, 212)",
            cursor: "pointer",
        });
    };
    var textLostHover = function(ev) {
        dom(this).style({
            color: "rgba(0, 0, 0, 0.870588)",
        });
    };
    var itemClicked = function(ev) {
        document.location.hash = "/items/" + this.ProductID;
        ev.cancelBubble = true;
        if (ev.stopPropagation) {
            ev.stopPropagation();
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
                    if (item.Quantity == 0 || item.Quantity == 1)
                        ++items[item.ProductID].Quantity;
                    else
                        items[item.ProductID].Quantity += item.Quantity;
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
    cart.save = function() {
        if (window.localStorage && window.localStorage.setItem) {
            window.localStorage.setItem("cart", JSON.stringify(items));
            cartEvent("cartsaved");
        }
    };
    cart.on("itemadded", function(ev, item) {
        console.log(item);
        if (settings.toast) {
            dom.toast("Added " + item.ProductName, 'add_shopping_cart', cart.open);
        }
        cart.save();
    });
    cart.on("itemremoved", function(ev, item) {
        console.log(item);
        if (settings.toast) {
            dom.toast("Removed " + item.ProductName, 'remove_shopping_cart', cart.open);
        }
        cart.save();
    });
    cart.load = function() {
        items = {};
        var item;
        var loadedItems = JSON.parse(localStorage.getItem("cart"));
        if (loadedItems) {
            for (var property in loadedItems) {
                if (loadedItems.hasOwnProperty(property)) {
                    cart.add(new cart.item(loadedItems[property]));
                }
            }
        }
    }
    cart.open = function() {
        
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
    cart.getItem = function(productID, callback, error) {
        dom.ajax({
            type: settings.requestType,
            url: settings.url + "/items",
            responseType: dom.ajax.RESPONSE_TYPES.JSON,
            data: { ProductID: productID },
            oncomplete: function(xhr, data) {
                if(!data.error) {
                    var item = new cart.item(data);
                    cartEvent("itemretrieved", item);
                    if (callback) {
                        callback(item);
                    }
                }
            },
            onerror: function(xhr) {
                if (settings.debug) {
                    console.error("XHR failed for item validation", xhr);
                    cartEvent("xhrerror", xhr);
                    if (error) { 
                        error(xhr);
                    }
                }
            }
        });
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
        this.ProductName = props["product_name"] ? props["product_name"].replace("booxch5_NW ", "") : "";
        this.SupplierIDs = props["supplier_ids"].split(",");
        this.ProductCode = props["product_code"];
        this.Description = props["description"];
        //this.Cost = props["standard_cost"];
        this.Price = Number.parseFloat(props["list_price"]);
        this.Unit = Number.parseInt(props["quantity_per_unit"]);
        this.MinimumOrder = Number.parseInt(props["minimum_reorder_quantity"]);
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
            "margin": "1em 1em 0 0",
            position: "relative",
            overflow: "hidden",
            "-webkit-box-orient": "vertical",
            "-webkit-box-direction": "normal",
            "-ms-flex-direction": "column",
            "flex-direction": "column",
            "flex-grow": 1,
            "z-index": 1,
        }).append(dom.span({text: this.ProductName}).style({
                "font-size": "24px",
            color: "rgba(0, 0, 0, 0.870588)",
            display: "block",
            "line-height": "36px",
            transition: "color 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
        }).on("mouseover", textHovered).on("mouseout", textLostHover).on("click", itemClicked.bind(this))).append(dom.div({ text: this.Description }).style({
            "padding": "16px",
            "font-size": "14px",
            "color": "rgba(0, 0, 0, 0.870588)"
        })).append(dom.div().style({
            padding: "8px",
            position: "absolute",
            bottom: 0,
        }).append(
            dom.create("button", {
                type: "button", 
                text: "Add to Cart $" + this.Price.toFixed(2)
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
                "padding": ".2em",
                "box-shadow": "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",
                "background-color": "rgba(0, 0, 0, 0)",
                "text-align": "center",
                "user-select": "none",
        }).on("mouseover", buttonHovered).on("mouseout", buttonLostHover).on("click", cart.add.bind(cart, this))));
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