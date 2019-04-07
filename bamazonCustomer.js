var mysql = require("mysql");
var inquirer = require("inquirer");
var placeholder;
var placeholder2;
var price;
var orderTotal;


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected at id " + connection.threadId);
    showItems();

});

function showItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++)

            console.log(results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity);





        inquirerPrompt(results);
    })
};




function inquirerPrompt(results) {


    inquirer.prompt({
        // * The first should ask them the ID of the product they would like to buy. 
        name: "idSearch",
        Type: "input",
        message: "Insert ID of Item"


    }).then(function (answer) {
        placeholder = answer.idSearch;
        var i = answer.idSearch - 1;
        // minus 1 because the results index starts at 0 even thought the id count starts at 1
        // console.log(results[i].stock_quantity)


        // console.log(placeholder)
        if (results[i].stock_quantity < 1) {
            console.log(results[i].stock_quantity)

            console.log("Insufficient quantity!")
            connection.end();
        } else {



            var query = connection.query(
                'SELECT * FROM products WHERE ?',
                [{
                        item_id: placeholder
                    },

                    // {
                    //     product_name: arg2
                    // }
                ],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }


                    price = results[0].price;
                    console.log(results[0].item_id, results[0].product_name, results[0].price, results[0].stock_quantity);
                    // console.log(placeholder);


                    // how many does work
                    howMany(results, price, placeholder);
                    console.log("at: $" + price)


                })
        }

        function howMany(results, price, placeholder) {
            inquirer.prompt({
                name: "howMany",
                Type: "input",
                message: "how many would you like?"


            }).then(function (answer) {
                    placeholder2 = answer.howMany;
                    var query = connection.query(

                        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE ?',



                        [
                            [placeholder2],
                            {
                                item_id: placeholder


                            },
                            // {
                            //     item_id: placeholder
                            // }

                            // {
                            //     product_name: arg2
                            // }
                        ],
                        function (results) {


                            // console.log(placeholder);
                            showItems2(query, placeholder2, placeholder);



                        })

                    function showItems2(query, placeholder2, placeholder) {

                        var show_item = connection.query("SELECT * FROM products", function (err, results) {
                            if (err) throw err;
                            orderTotal = price * placeholder2;
                            console.log("your total is: $" + orderTotal);
                            // console.log(placeholder)

                            updateInvoices(orderTotal, placeholder2, price, placeholder);


                        })
                    };

                    function updateInvoices(orderTotal, placeholder, placeholder2, price) {

                        connection.query('UPDATE products SET productscol =(productscol +' + orderTotal + ') WHERE item_id=' + price)
                        // connection.query("INSERT INTO products (productscol) VALUE (" + orderTotal + ") WHERE item_id=" + placeholder)
                        // console.log(orderTotal)
                        // console.log(placeholder)
                        // console.log(placeholder2)
                        // console.log(price)





                        connection.end();
                    }













                }

            )
        }
    })
}