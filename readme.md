# Northwind Web Store
Want to buy a whole bunch of random stuff from a sketchy online website that doesn't care enough about your privacy to bother with SSL? You've come to the right place.

By [Matt Bark](https://github.com/matthax) and [Karl Morris](https://github.com/kmorris95)

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
```json
[{
    "id": 1,
    "product_code": "NWTB-1",
    "supplier_ids": "4",
    "product_name": "booxch5_NW Traders Chai",
    "description": null,
    "list_price": "18.0000",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "10 boxes x 20 bags",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Beverages",
    "attachments": ""
}, {
    "id": 3,
    "product_code": "NWTCO-3",
    "supplier_ids": "10",
    "product_name": "booxch5_NW Traders Syrup",
    "description": null,
    "list_price": "10.0000",
    "reorder_level": 25,
    "target_level": 100,
    "quantity_per_unit": "12 - 550 ml bottles",
    "discontinued": 0,
    "minimum_reorder_quantity": 25,
    "category": "Condiments",
    "attachments": ""
}, {
    "id": 4,
    "product_code": "NWTCO-4",
    "supplier_ids": "10",
    "product_name": "booxch5_NW Traders Cajun Seasoning",
    "description": null,
    "list_price": "22.0000",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "48 - 6 oz jars",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Condiments",
    "attachments": ""
}, {
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
}, {
    "id": 6,
    "product_code": "NWTJP-6",
    "supplier_ids": "2;6",
    "product_name": "booxch5_NW Traders Boysenberry Spread",
    "description": null,
    "list_price": "25.0000",
    "reorder_level": 25,
    "target_level": 100,
    "quantity_per_unit": "12 - 8 oz jars",
    "discontinued": 0,
    "minimum_reorder_quantity": 25,
    "category": "Jams, Preserves",
    "attachments": ""
}, {
    "id": 7,
    "product_code": "NWTDFN-7",
    "supplier_ids": "2",
    "product_name": "booxch5_NW Traders Dried Pears",
    "description": null,
    "list_price": "30.0000",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "12 - 1 lb pkgs.",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Dried Fruit & Nuts",
    "attachments": ""
}, {
    "id": 8,
    "product_code": "NWTS-8",
    "supplier_ids": "8",
    "product_name": "booxch5_NW Traders Curry Sauce",
    "description": null,
    "list_price": "40.0000",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "12 - 12 oz jars",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Sauces",
    "attachments": ""
}, {
    "id": 14,
    "product_code": "NWTDFN-14",
    "supplier_ids": "2;6",
    "product_name": "booxch5_NW Traders Walnuts",
    "description": null,
    "list_price": "23.2500",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "40 - 100 g pkgs.",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Dried Fruit & Nuts",
    "attachments": ""
}, {
    "id": 17,
    "product_code": "NWTCFV-17",
    "supplier_ids": "6",
    "product_name": "booxch5_NW Traders Fruit Cocktail",
    "description": null,
    "list_price": "39.0000",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "15.25 OZ",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Canned Fruit & Vegetables",
    "attachments": ""
}, {
    "id": 19,
    "product_code": "NWTBGM-19",
    "supplier_ids": "1",
    "product_name": "booxch5_NW Traders Chocolate Biscuits Mix",
    "description": null,
    "list_price": "9.2000",
    "reorder_level": 5,
    "target_level": 20,
    "quantity_per_unit": "10 boxes x 12 pieces",
    "discontinued": 0,
    "minimum_reorder_quantity": 5,
    "category": "Baked Goods & Mixes",
    "attachments": ""
}]
```
```GET``` [api/cart/items?ProductID](http://localhost/northwind/api/cart/items?ProductID=1) Gets a JSON representation of an item with the ```ProductID```. 
```json
{
    "id": 1,
    "product_code": "4",
    "supplier_ids": "NWTB-1",
    "product_name": "booxch5_NW Traders Chai",
    "description": null,
    "list_price": "18.0000",
    "reorder_level": 10,
    "target_level": 40,
    "quantity_per_unit": "10 boxes x 20 bags",
    "discontinued": 0,
    "minimum_reorder_quantity": 10,
    "category": "Beverages",
    "attachments": ""
}
```
 - ```ProductID``` The ID of the item that will be returned. An error will be returned if the product does not exist. Invalid values will also return an exception (non-numeric)

```GET``` [api/orders](http://localhost/northwind/api/orders) Gets a JSON representation of a users order history. 
```json
[{
    "product_name": "booxch5_NW Traders Chai",
    "standard_cost": "13.5000",
    "list_price": "18.0000",
    "category": "Beverages",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "2.0000",
    "unit_price": "18.0000",
    "order_id": 110
}, {
    "product_name": "booxch5_NW Traders Syrup",
    "standard_cost": "7.5000",
    "list_price": "10.0000",
    "category": "Condiments",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "2.0000",
    "unit_price": "10.0000",
    "order_id": 110
}, {
    "product_name": "booxch5_NW Traders Cajun Seasoning",
    "standard_cost": "16.5000",
    "list_price": "22.0000",
    "category": "Condiments",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "2.0000",
    "unit_price": "22.0000",
    "order_id": 110
}, {
    "product_name": "booxch5_NW Traders Olive Oil",
    "standard_cost": "16.0125",
    "list_price": "21.3500",
    "category": "Oil",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "3.0000",
    "unit_price": "21.0000",
    "order_id": 110
}, {
    "product_name": "booxch5_NW Traders Fruit Cocktail",
    "standard_cost": "29.2500",
    "list_price": "39.0000",
    "category": "Canned Fruit & Vegetables",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "1.0000",
    "unit_price": "39.0000",
    "order_id": 110
}, {
    "product_name": "booxch5_NW Traders Chocolate Biscuits Mix",
    "standard_cost": "6.9000",
    "list_price": "9.2000",
    "category": "Baked Goods & Mixes",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "2.0000",
    "unit_price": "9.0000",
    "order_id": 110
}, {
    "product_name": "booxch5_NW Traders Marmalade",
    "standard_cost": "60.7500",
    "list_price": "81.0000",
    "category": "Jams, Preserves",
    "order_date": "2016-12-11 14:17:27",
    "quantity": "2.0000",
    "unit_price": "81.0000",
    "order_id": 110
}]
```
You must be logged in to view this page, or you will receive the following response:
```json
{
    "error": true,
    "message": "You must be logged in to access this page",
    "reason": "auth",
    "session": []
}
```