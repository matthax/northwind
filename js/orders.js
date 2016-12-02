if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.northwind) {
    throw "Northwind.js is required";
}
window.user = function() {
    var user = {}, 
        orders = {},
        settings = {
            validate: false,
            toast: true,
            debug: true,
            requestType: ajax.REQUESTS.GET,
            url: dom.url() + "api/orders",
        },
        listeners = {
            "orderRetrieved": [],
            "login": [],
        };
    var userEvent = function(type) {
        var args;
        switch (type) {
            case "orderRetrieved":
            case "login":
                args = arguments[1];
                break;
        }
        if (listeners[type]) {
            for (var i = 0; i < listeners[type].length; ++i) {
                listeners[type][i](type, args);
            }
        }
    };
    user.fire = function(event, args) {
        userEvent(event, args);
    };
    user.on = function(event, listener) {
        if (listeners[event] && typeof listener === "function") {
            listeners[event].push(listener);
        }
    };
    user.off = function(event, listener) {
        if (listeners[event]) {
            for (var i = listeners[event].length - 1; i >= 0; --i) {
                if (listeners[event][i] == listener) {
                    listeners[event].splice(i, 1);
                }
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
            data: { /*CustomerID: sessionStorage.getItem("id")*/ },
            oncomplete: function(xhr, data) {
                if (data.error) {
                    dom.toast(data.message);
                    if (data.reason === "auth") {
                        window.location.hash = "/login";
                    }
                }
                else {
                    var userOrders = {}, order;
                    for (var i = 0; i < data.length; ++i) {
                        order = new user.order(data[i]);
                        if (!userOrders[order.order_id]) {
                            userOrders[order.order_id] = [];
                        }
                        userOrders[order.order_id].push(order);
                    }
                    userEvent("orderRetrieved", userOrders);
                    orders = userOrders;
                    if (props.onsuccess) {
                        props.onsuccess(userOrders);
                    }
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
        this.product_name = props["product_name"] ? props.product_name.replace("booxch5_NW ", "") : "";
        this.standard_cost = Number.parseFloat(props["standard_cost"]).toFixed(2);
        this.list_price = Number.parseFloat(props["list_price"]).toFixed(2);
        this.order_date = props["order_date"];
        this.quantity = Number.parseInt(props["quantity"]);
        this.unit_price = Number.parseFloat(props["unit_price"]).toFixed(2);
        this.order_id = props["order_id"];
    };
    
    return user;
}();

window.pages = window.pages || {};
window.pages.orders = function () {
    var order = {};
    order.unload = function (container) {
        
    };
    order.load = function (hash, callback) {
        user.getOrders({
            onsuccess : function(orders) {
                if (Object.keys(orders).length === 0) {
                        callback(dom.div().style({"text-align": "center"}).append(dom.create("a", {href: "#/items", text: "Nothing? Well go buy something!"}).style({ 
                            padding: "8px 8px 8px 32px",
                            "text-decoration": "none",
                            "font-size": "25px",
                            color: "#818181",
                            display: "block"
                        })));
                }
                else {
                    //window.orders = orders; 
                    console.log(orders);
                    var order, page = dom.div(), orderContainer, itemContainer;
                    /*.append(dom.create("h1", {text: "Register"}))*/
                    for (var key in orders) {
                        order = orders[key];
                        orderContainer = dom.div().append(dom.create("h3", {text: "Order #" + key}));
                        itemContainer = dom.div().style({
                        padding: 0,
                        margin: 0,
                        "list-style": "none",
                        display: "-webkit-box",
                        display: "-moz-box",
                        display: "-ms-flexbox",
                        display: "-webkit-flex",
                        display: "flex",
                        "-webkit-flex-flow": "row wrap",
                        "justify-content": "flex-start",
                    });
                        orderContainer.append(itemContainer);
                        for (var i = 0; i < order.length; ++i) {
                            itemContainer.append(dom.div().style({
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
                                "width": "20em",
                                "height": "18em",
                                "margin": "1em 1em 0 0",
                                "padding": "1em",
                                position: "relative",
                                overflow: "hidden",
                                "-webkit-box-orient": "vertical",
                                "-webkit-box-direction": "normal",
                                "-ms-flex-direction": "column",
                                "flex-direction": "column",
                                "z-index": 1,
                            }).append(dom.create("p", {text: order[i].product_name})) //maybe make this a link a href="#/items/order[i].product_id ??
                            .append(dom.create("p", {text: "Order Date: " + order[i].order_date}))
                            .append(dom.create("p", {text: "Quantity: " + order[i].quantity}))
                            .append(dom.create("p", {text: "Price: $" + order[i].list_price}))
                            .append(dom.create("p", {text: "Cost: $" + order[i].list_price * order[i].quantity})));
                        }
                        page.append(orderContainer);
                    }
                    callback(page);
                }
            },
            onerror: function(xhr) {
                console.error(xhr);
                dom.toast("Something went wrong, please try again");
            }
        });
    };
    northwind.registerPageHandler("Order History", /^\/orders\/?/i, order.load);
    return order;
}();