var mysql = require("mysql");
var inquirer = require ("inquire");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Childofmine02",
    database: "bamazon"
});

connection.connect (function(err) {
    if(err) throw err;
        console.log("connected as id" + connection.threadId);
    });

    var displayProducts = function() {
        var query = "select * from products";
        connection.query(query, function(err, res) {
            if(err) throw err;
            var displayTable = new Table ({
                head: ["Item ID", "Product Name", "Department Name", "Price", "Quanity"],
                columnWidths: [10,25,25,10,14]
            });
        for (var i = 0; i < res.length; i++) {
                displayTable.push(
                    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]
                );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}


function purchasePrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What item number would you like to purchase today?",
            filter: Number
        },
        {
            name: "Quanity",
            type: "input",
            message: "How many would you like to order of this item number?",
            filter: Number 
        },

    ]).then(function(answers){
        var quanityNeeded = answers.Quanity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quanityNeeded);
    });
};

function purchaseOrder (ID, amtNeeded){
    connection.query('Select * from products where item_id = ' + ID, function(err, res){
        if(err) {console.log(err)};
        if(amtNeeded <= res [0].stock_quanity) {
            var totalCost = res [0].price * amtNeeded;
            console.log("We will process your order now ! ");
            console.log("Your total for" + amtNeeded + " " + res[0].product_name + " is " + totalCost + " It's on its way to you now! ");

            connection.query("update products set stock_quanity = stock_quanity - " + amtNeeded + "where item_id = " + ID);
        } else {
            console.log("We are sorry, we don't have that many of this item." + res[0].product_name + " ")
        };
        displayProducts();
    });

};

displayProducts();