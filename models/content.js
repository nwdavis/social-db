var orm = require("../config/orm.js");

var content = {
    selectAll: function(cb){
        orm.selectAll("content", function(result){
            cb(result)
        })
    },
    
    postContent: function(col, val, cb){
        orm.postContent("content", col, val, function(result){
            cb(result)
        })
    }
}

module.exports = content