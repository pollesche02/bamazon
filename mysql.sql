create database bamazon;

use bamazon;

create table products (
item_id int (5) not null,
product_name VARCHAR (100) not null,
department_name VARCHAR (100) not null,
price decimal (10,2) not null,
stock_quanity int(20) not null,

Primary Key(item_id)
);

select * from products;

insert into products (item_id, product_name, department_name, price, stock_quanity)
values (100, "eucalyptus", "essential-oils", 17.95, 6),
(315, "purple-tulip", "touch-warmers", 24.95, 8),
(225, "peppermint", "essential-oils", 21.95, 6),
(275, "midnight-rain", "fragrance-oils", 8.95, 10),
(420, "monkey-farts", "fragrance-oils", 12.95, 10),
(505, "eiffel-tower", "night-lights", 19.95, 8),
(673, "cool-breeze", "night-lights", 19.95, 8),
(675, "copper-flame", "touch-warmers", 24.95, 8),
(700, "marble-grey", "diffuser", 74.95, 5),
(780, "lux-stella-black", "diffuer", 59.95, 5)




