var orm = require("../config/orm.js");

var content = {
    selectAllContent: function(cb){
        orm.selectAllContent("content", function(result){
            cb(result)
        })
    },
    
    postContent: function(col, val, cb){
        orm.postContent("content", col, val, function(result){
            cb(result)
        })
    }
}

module.exports = content;