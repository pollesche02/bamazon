var mysql = require("mysql");
var inquirer = require ("inquirer");
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
                columnWidths: [15,25,25,15,15]
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
        var quanityWanted = answers.Quanity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quanityWanted);
    });
};

function purchaseOrder (ID, amtWanted){
    console.log("ID of item I expect to see", ID);
    console.log("quantity requested by user", amtWanted);
    connection.query('Select * from products' , function(err, res){
        if(err) {console.log(err)};
        if(amtWanted <= res [0].stock_quanity) {
            var totalCost = res [0].price * amtWanted;
            console.log("We will process your order now ! "); 
    
            console.log(" Your total for " + amtWanted + "  " + res[0].product_name + " is " + totalCost + " It's on its way to you now! ");

            connection.query("update products SET stock_quanity = stock_quanity - " + amtWanted + " where item_id = " + ID);
        } else {
            console.log("We are sorry, we don't have that many of this item." + res[0].  product_name + "  Would you like a different")
        };
        displayProducts();
    });

};

displayProducts();