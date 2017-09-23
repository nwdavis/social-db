var mysql = require("mysql");
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "test1",
    database: "social_db"
});
connection.connect(function(err) {
    if (err) {
        console.log("error")
    }
    console.log("Connected as ID" + connection.threadId)
})

module.exports = connection;