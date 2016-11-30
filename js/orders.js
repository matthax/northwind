if (!dom) {
    throw "Dom.js is required to use orders.js";
}
window.user = function() {
    var user = {}, 
        orders = [],
        settings = {
        validate: false,
        toast: true,
        debug: true,
        requestType: ajax.REQUESTS.GET,
        url: dom.url() + "/api/orders",

    },
        listeners = {
            "orderRetrieved": []
        };
    var userEvent = function(type) {
        var args;
        switch (type) {
            case "orderRetrieved":
                args = arguments[1];
                break;
        }
        if (listeners[type]) {
            for (var i = 0; i < listeners[type].length; ++i) {
                listeners[type][i](type, args);
            }
        }
    };
    // @props {onsuccess, onerror, length, page}
    user.getOrders = function(props) {
        //items?length=10&page=0
        dom.ajax({
            type: settings.requestType,
            url: settings.url,
            responseType: dom.ajax.RESPONSE_TYPES.JSON,
            data: { CustomerID: /*sessionStorage.getItem("user_name")*/4 },
            oncomplete: function(xhr, data) {
                var userOrders = [];
                for (var i = 0; i < data.length; ++i) {
                    userOrders.push(new user.order(data[i]));
                }
                userEvent("orderRetrieved", userOrders);
                if (props.onsuccess) {
                    props.onsuccess(userItems);
                }
            },
            onerror: function(xhr) {
                if (settings.debug) {
                    console.error("XHR failed for item validation", xhr);
                    userEvent("xhrerror", xhr);
                    if (props.onerror) { 
                        onerror(xhr);
                    }
                }
            }
        });
    };
    user.order = function(props) {
        this.product_name = props["product_name"];
        this.standard_cost = props["standard_cost"];
        this.list_price = props["list_price"];
        this.order_date = props["order_date"];
        this.quantity = props["quantity"];
        this.unit_price = props["unit_price"];
    };
    
    return user;
}();