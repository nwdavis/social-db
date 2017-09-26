var db = require("../models");

module.exports = function(app){
  // Find all Authors and return them to the user with res.json
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get method for Users - Returns JSON User object
  // id = UserId
  app.get("/api/users/:id", function(req, res){
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });
  // Post method for API 
  // Must have the following as a JSON object:
  // name: 
  //
  app.post("/api/users", function(req, res){
    console.log("Called User API for POST");
    db.User.create(req.body).then(function(dbUser){
      res.json(dbUser);
    });
  });

}