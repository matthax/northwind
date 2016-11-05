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
        url: window.location.href + "/api/cart",

    };
    var cartEvent = function(type) {
        var event;
        switch (type) {
            case "settings":
                event = new CustomEvent(type, { 'detail': settings });
                break;
            case "added":
            case "removed":
                event = new CustomEvent(type, { 'detail': arguments[1] });
                break;
            case "updated":
            case "saved":
            default:
                event = new CustomEvent(type, { 'detail': items });
                break;
        }
        window.cart.dispatchEvent(event);
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
    
    cart.add = function(item) {
        isItem(item, function(valid, item) {
            if (valid) {
                if (items[item.ProductID]) {
                    ++items[item.ProductID].Quantity;
                }
                else {
                    items[item.ProductID] = item;
                }
                cartEvent("added", item);
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
            cartEvent("removed", old);
        }
        else {
            for (var property in items) {
                if (items.hasOwnProperty(property)) {
                    if (items[property] == item) {
                        old = items[property];
                        delete items[property];
                        cartEvent("removed", old);
                    }
                }
            }
        }
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
        this.ProductName = props["product_name"];
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