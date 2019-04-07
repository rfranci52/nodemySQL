var mysql = require("mysql");
var inquirer = require("inquirer");
var placeholder;


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
        message: 'choose from the lst below',
        choices: [
            "View Product Sales by Department",
            "View Low Inventory"


        ]

    }).then(function (answer) {
        console.log(answer)


        if (answer.menu == "View Product Sales by Department") {
            viewDepartmentSales();
        } else
        if (answer.menu == "View Low Inventory") {
            // createNewDepartment();
        } else {
            console.log("foo!")
        }
    })

    function viewDepartmentSales() {
        inquirer.prompt({
            name: 'departmentName',

            message: 'enter department name'


        }).then(function (answer) {
            console.log(answer)



            placeholder = answer.departmentName;

            var query = connection.query(
                'SELECT SUM(productscol) FROM products WHERE department_name = ?',
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
                    // for (var i = 0; i < results.length; i++)

                    // console.log(i);
                    // console.log(placeholder);
                    console.log("total department profit: ")
                    console.log(results)
                })

            var query2 = connection.query(
                'SELECT * FROM products WHERE department_name = ?',
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
                    // for (var i = 0; i < results.length; i++)

                    // console.log(i);
                    // console.log(placeholder);
                    console.log("department name: " + results[0].department_name)


                    // how many does work
                    connection.end();


                })
        })


    }

}