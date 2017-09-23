var mysql = require("mysql");
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
<<<<<<< HEAD
    password: "test1",
=======
    password: "",
>>>>>>> d481cfe404092b5256d4e64931389014abde9858
    database: "social_db"
});
connection.connect(function(err) {
    if (err) {
        console.log("error")
    }
    console.log("Connected as ID" + connection.threadId)
})

module.exports = connection;