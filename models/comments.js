var orm = require("../config/orm.js");

var comments = {
    selectAllForContent: function(col, val, cb){
        orm.selectAllForContent("comments", function(result){
            cb(result)
        })
    },
    
    postComment: function(col, val, cb){
        orm.postComment("comments", col, val, function(result){
            cb(result)
        })
    }
}

module.exports = comments;