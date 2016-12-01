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
                orders = userOrders;
                if (props.onsuccess) {
                    props.onsuccess(userOrders);
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
        this.order_id = props["order_id"];
    };
    
    return user;
}();

if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.cart) {
    throw "Orders.js is required";
}
if (!window.northwind) {
    throw "Northwind.js is required";
}
window.pages = window.pages || {};
window.pages.orders = function () {
    var order = {};
    user.unload = function (container) {
        
    };
    user.load = function (hash, callback) {
        user.getOrders({
            onsuccess : function(orders) {
                window.orders = orders; 
                console.log(orders);
                
                var page_container = dom.div().style({
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
                /*.append(dom.create("h1", {text: "Register"}))*/
                for (var i = 0; i < orders.length; i++) {
                    var container = dom.div().style({
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
                    })
                    container.append(dom.create("p", {text: "Product Name: " + orders[i].product_name}))
                    .append(dom.create("p", {text: "Order Date: " + orders[i].order_date}))
                    .append(dom.create("p", {text: "Quantity: " + orders[i].quantity}))
                    .append(dom.create("p", {text: "Unit Price: " + orders[i].unit_price}))
                    .append(dom.create("p", {text: "Order ID: " + orders[i].order_id}))
                    page_container.append(container);
                }
                callback(page_container);
            }
        })
    };
    northwind.registerPageHandler("Order History", /^\/order-history\/?/i, user.load);
    return order;
}();