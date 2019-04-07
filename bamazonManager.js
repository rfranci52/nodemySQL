var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
InquireMenu();


var connectsql = connection.connect(function (err) {
    if (err) throw err;
    console.log("connected at id " + connection.threadId);

});


function InquireMenu() {

    inquirer.prompt({
        name: 'menu',
        type: 'rawlist',
        message: 'choose from the list below',
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"

        ]

    }).then(function (answer) {
        console.log(answer)


        if (answer.menu == "View Products for Sale") {
            allProducts();
        } else
        if (answer.menu == "View Low Inventory") {
            lowInventoryView();
        } else
        if (answer.menu == "Add to Inventory") {
            inventoryAdd();
        } else
        if (answer.menu == "Add New Product") {
            // console.log("foo")
            createProduct();
        }




    });

}

function allProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++)
            // console.log(results)

            console.log(results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity);




        connection.end();
    })

}

function lowInventoryView() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++)
            // console.log(results)

            if (results[i].stock_quantity <= 0) {
                lowstock = results[i].product_name
                console.log(lowstock + "(s) need replenishing!")
            }


        connection.end();

    })

}

function createProduct() {
    inquirer.prompt([{
        name: "item_id",
        Type: "input",
        message: "Insert a unique number for Item id"
    }, {
        name: "product_name",
        Type: "input",
        message: "Insert the name of the product"
    }, {
        name: "department_name",
        Type: "input",
        message: "enter departement/category"
    }, {
        name: "price",
        Type: "input",
        message: "price?"
    }, {
        name: "stock_quantity",
        Type: "input",
        message: "how much stock?"
    }]).then(function (answer) {
        // console.log(answer.item_id)

        connection.query("INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES(?,?,?,?,?)", [

                [answer.item_id],


                [answer.product_name],

                answer.department_name,


                answer.price,

                answer.stock_quantity
            ],
            function (err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++)
                    // console.log(results)

                    console.log(results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity);




                connection.end();
            }
        )
    })
}

function inventoryAdd() {
    inquirer.prompt([{
        name: "item_id",
        Type: "input",
        message: "enter Item id"
    }, {
        name: "stock_quantity",
        Type: "input",
        message: "how much stock would you like to add?"
    }]).then(function (answer) {
        // console.log(answer.item_id)

        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id=? ", [

                [answer.stock_quantity],


                [answer.item_id],

            ],
            function (err, results) {
                // if (err) throw err;
                // for (var i = 0; i < results.length; i++)
                //     // console.log(results)

                //     console.log(results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity);




                connection.end();
            }
        )
    })

}