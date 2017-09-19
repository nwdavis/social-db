var orm = require("../config/orm.js");

var comments = {
    selectAll: function(cb){
        orm.selectAll("comments", function(result){
            cb(result)
        })
    },
    
    postComment: function(col, val, cb){
        orm.postComment("comments", col, val, function(result){
            cb(result)
        })
    }
}

module.exports = comments