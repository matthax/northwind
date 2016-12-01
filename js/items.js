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
    var itemRegex = /^\/items\/[a-z0-9 ]+\/?$/i;
    var itemsRegex = /^\/items\/?/i;
    var container;
    var moreItems = true, requestPending = false, firstLoad = true;
    var page = Number(dom.query.page), count = Number(dom.query.length), search = dom.query.q;
    if (isNaN(page)) { page = 0; }
    if (isNaN(count)) { count = 10; }
    
    var onscroll = dom.debounce(function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (moreItems && !requestPending) {
                requestPending = true;
                if (search) {
                    cart.getItems({page: ++page, length: count, q: search });
                }
                else {
                    cart.getItems({page: ++page, length: count });
                }
            }
        }
    }, 250);
    items.unload = function(container) {
        window.removeEventListener('scroll', onscroll);
    };
    items.load = function(hash, callback) {
        firstLoad = true;
        container = dom.div();
        if (itemRegex.test(hash)) {
            items.item(hash.substr(hash.lastIndexOf('/') + 1), callback);
        }
        else {
            items.shop(callback);
        }
    };
    items.shop = function(callback) {
        var query = function(value) {
            search = value;
            itemContainer.removeChildren();
            requestPending = true;
            if (search) {
                cart.getItems({page: page, length: count, q: search });
            }
            else {
                cart.getItems({page: page, length: count });
            }
        };
        var app = dom.div().append(dom.create("input", {type: "text", required: "required", placeholder: "Search", name: "q", "class": "material-input"}).on("keyup", function(ev) {
            if (ev.which == 13 || ev.keyCode == 13) {
                query(this.value);
            }
        }).on("change", function(ev) {
            query(this.value);
        }));
        var itemContainer = container.style({
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
        app.append(itemContainer);
        cart.on("itemsretrieved", function(ev, items) { 
            console.log("retrieved " + items.length + " items");
            for (var i = 0; i < items.length; ++i) {
                itemContainer.append(items[i].toElement());
            }
            requestPending = false;
            if (items.length == 0) {
                moreItems = false;
            }
            if (firstLoad) {
                firstLoad = false;
                callback(app);
            }
        });
        window.addEventListener('scroll', onscroll);
        console.log("Getting " + count + " items from page " + page);
        query(search);
    };
    items.item = function(itemID, callback) {
        firstLoad = true;
        cart.getItem(itemID, function(item) {
            var stars = function() {
                var s = [];
                for (var i = 0; i < 5; ++i) {
                    s.push(dom.create('i', {class:'material-icons', text: 'rate_star'}).style({'margin-left':'-120px', color: 'rgb(0, 188, 212)'}));
                }
                return s;
            }();
            var container = dom.div().style({
                width: '95vw',
                'font-family': 'Roboto, sans-serif', 
                'margin-left': '50%',
                transform: 'translateX(-50%)'
            }).append(item.toElement().style({
                width: '95vw',
                border: 'none',
                'margin-left': '50%',
                transform: 'translateX(-50%)',
            })).append(dom.div().append(dom.create('h1', {text: 'User Reviews'})).append(dom.div().append(stars).append(dom.span({text: 'legit_reviewer1'}).style({'vertical-align': 'top','font-size': '20px', 'margin-left': '10px'}))).append(dom.p('Totally awesome item, I received my ' + item.ProductName + ' a few days ago and boy oh boy am I satisfied')));
            callback(container);
            
        }, function(e) {
            console.error(e);
        });
    };
    northwind.registerPageHandler("Items", itemsRegex, items.load);
    return items;
}();