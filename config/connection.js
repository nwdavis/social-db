var mysql = require("mysql");
var connection;
  

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
      port: 3306,
      host: "localhost",
      user: "root",
      password: "",
      database: "social_db"
  });
};

connection.connect(function(err) {
    if (err) {
        console.log("error")
    }
    console.log("Connected as ID" + connection.threadId)
})

module.exports = connection;