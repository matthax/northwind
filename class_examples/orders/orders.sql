/*
Who are our customers? and their names? 
How much have they ordered from us? and what items? 
What prices did they pay per unit? 
*/

SELECT cust.company, 
cust.first_name, 
cust.last_name, 
orders.id, 
orders.customer_id, 
details.quantity, 
prods.product_name, 
prods.description, 
prods.list_price, 
details.unit_price

FROM booxch5_NW.customers cust
INNER JOIN booxch5_NW.orders orders ON cust.id = orders.customer_id
INNER JOIN booxch5_NW.order_details details ON orders.id = details.order_id 
INNER JOIN booxch5_NW.products prods on prods.id = details.product_id

WHERE cust.id = 1

LIMIT 0 , 30