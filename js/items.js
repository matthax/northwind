if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.cart) {
    throw "Cart.js is required";
}
if (!window.northwind) {
    throw "Northwind.js is required";
}
window.pages = window.pages || {};
window.pages.items = function() {
    var items = {};
    var itemRegex = /\/?items\/[a-z0-9 ]+\/?$/gi;
    var itemsRegex = /\/?items\/?/gi;
    items.load = function(hash, callback) {
        if (itemRegex.test(hash)) {
            items.item(hash.substr(hash.lastIndexOf('/') + 1), callback);
        }
        else {
            items.shop(callback);
        }
    };
    items.shop = function(callback) {
        cart.on("itemsretrieved", function(ev, items) {   
            var itemContainer = dom.div().style({
                padding: 0,
                margin: 0,
                "list-style": "none",
                display: "-webkit-box",
                display: "-moz-box",
                display: "-ms-flexbox",
                display: "-webkit-flex",
                display: "flex",
                "-webkit-flex-flow": "row wrap",
                "justify-content": "space-around",
            });
            for (var i = 0; i < items.length; ++i) {
                itemContainer.append(items[i].toElement());
            }
            callback(itemContainer);
        });
        cart.getItems();
    };
    items.item = function(itemID, callback) {
        
    };
    northwind.registerPageHandler("items", itemsRegex, items.load);
    return items;
}();