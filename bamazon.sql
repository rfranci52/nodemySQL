DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;











CREATE TABLE products
(
    item_id INTEGER UNIQUE NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(15),
    price FLOAT(10),
    stock_quantity INTEGER(10)

);