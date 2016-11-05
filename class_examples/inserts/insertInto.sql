INSERT INTO  `booxch5_NW`.`orders` (
`id` ,
`employee_id` ,
`customer_id` ,
`order_date` ,
`shipped_date` ,
`shipper_id` ,
`ship_name` ,
`ship_address` ,
`ship_city` ,
`ship_state_province` ,
`ship_zip_postal_code` ,
`ship_country_region` ,
`shipping_fee` ,
`taxes` ,
`payment_type` ,
`paid_date` ,
`notes` ,
`tax_rate` ,
`tax_status_id` ,
`status_id`
)
VALUES 
(null , NULL , NULL , NULL , NULL , NULL , NULL , NULL , NULL , NULL , NULL , NULL ,  '0.0000',  '0.0000', NULL , NULL , NULL ,  '0', NULL ,  '0'
);



/*   INSERT INTO ORDER DETAILS  */


INSERT INTO  `booxch5_NW`.`order_details` (
`id` ,
`order_id` ,
`product_id` ,
`quantity` ,
`unit_price` ,
`discount` ,
`status_id` ,
`date_allocated` ,
`purchase_order_id` ,
`inventory_id`
)
VALUES (
NULL ,  '100', NULL ,  '0.0000',  '0.0000',  '0', NULL , NULL , NULL , NULL
);
