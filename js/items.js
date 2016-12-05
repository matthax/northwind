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
    var moreItems = true, requestPending = false, firstLoad = true, showingItem = false;
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
        window.removeEventListener("scroll", onscroll);
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
            showingItem = false;
            if (search) {
                cart.getItems({page: page, length: count, q: search });
            }
            else {
                cart.getItems({page: page, length: count });
            }
        };
        var app = dom.div().append(dom.create("input", {type: "text", required: "required", placeholder: "Search", name: "q", "class": "material-input"}).on("keyup", function(ev) {
            if (ev.which == 13 || ev.keyCode == 13) {
                page = 0;
                query(this.value);
            }
        }).on("change", function(ev) {
            page = 0;
            query(this.value);
        }))/*.append(function() {
            var chips = [], onclick = function(ev) {
                query(dom(this).data("category"));
            };
            for (var i = 0; i < cart.categories.length; ++i) {
                chips.push(dom.create("div", {"class": "material-chip", "data-category": cart.categories[i]}).append(dom.span({text: cart.categories[i]})).on("click", onclick));
            }
            return chips;
            }())*/;
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
        var loadMoreButton = dom.create("button", {name:"load", text: "Load More", "class": "material-button-load-button"}).on("click", function() {
                if (moreItems && !requestPending) {
                    requestPending = true;
                    if (search) {
                        cart.getItems({page: ++page, length: count, q: search });
                    }
                    else {
                        cart.getItems({page: ++page, length: count });
                    }
                }
        });;
        app.append(loadMoreButton);
        cart.on("itemsretrieved", function(ev, items) {
            if (!showingItem) {
                console.log("retrieved " + items.length + " items");
                if (items.length === 0 && loadMoreButton) {
                    loadMoreButton.remove();
                }
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
            }
        });
        console.log("Getting " + count + " items from page " + page);
        window.addEventListener("scroll", onscroll);
        query(search);
    };
    items.item = function(itemID, callback) {
        firstLoad = true;
        showingItem = true;
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