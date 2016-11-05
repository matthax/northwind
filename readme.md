# Northwind Web Store
Want to buy a whole bunch of random stuff from a sketchy online website that doesn't care enough about your privacy to bother with SSL? You've come to the right place.

## Configuration
1. Install [XAMPP](https://www.apachefriends.org/index.html)
2. Once installed, open XAMPP and click the _config_ button. Select `PHP (php.ini)`
3. Locate the `Paths and Directories` header and insert the following line:
    - `include_path=<XAMPP INSTALL DIRECTORY>\htdocs\include`
4. Move the contents of the repository into your htdocs directory
5. Open the PHP MyAdmin page and run the SQL located in `\config\SQL`
6. Start the Apache and MySQL servers
7. Navigate to http://localhost/ and verify the page shows


### Testing the Cart API
In the javascript console enter the following code
```js
cart.on("itemsretrieved", function(ev, items) {   
    console.log(items);     
    for (var i = 0; i < items.length; ++i) {
         dom(document.body).append(items[i].toElement());
    }
});
cart.getItems();
```

##### URLs
```GET``` [api/cart/items](http://localhost/northwind/api/cart/items) Gets a JSON list of items from the products database
 - ```length``` the number of items to return
 - ```page``` the page number used for pagination, starts at 0. Returned items to start at ```length``` * ```page```

```GET``` [api/cart/items?ProductID](http://localhost/northwind/api/cart/items?ProductID=1) Gets a JSON representation of an item with the ```ProductID```. 
 - ```ProductID``` The ID of the item that will be returned. An error will be returned if the product does not exist. Invalid values will also return an exception (non-numeric)
