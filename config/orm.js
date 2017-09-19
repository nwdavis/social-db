var connection = require("./connection.js");
var orm = {
    selectAllContent: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + " LIMIT 10;";
        connection.query(queryString, function(err, result){
            if (err) throw (err);
            cb(result)
        })
    },

    postContent: function(tableInput, col, val, cb){
        var author = col[0];
        var body = col[1];
        var subject = col[2];

        var userAuthor = val[0];
        var userBody = val[1];
        var userSubject = val[2];

        var queryString = "INSERT INTO " + tableInput + " (" + author + "," + body + "," + subject + ") VALUES ('" + userAuthor + "','" + userBody + "','" + userSubject + "')" ;
        connection.query(queryString, function(err, result){
            if (err) throw (err);
            cb(result)
        })
    }


}

module.exports = orm