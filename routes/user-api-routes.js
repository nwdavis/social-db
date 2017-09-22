var db = require("../models");

module.exports = function(app){

  //gets a single User by id
  app.get("/api/users/:id", function(req, res){
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });
  //adds an User to the database
  app.post("/api/users", function(req, res){
    db.User.create(req.body).then(function(dbUser){
      res.json(dbUser);
    });
  });

}