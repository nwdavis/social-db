var db = require("../models");

module.exports = function(app){
  //gets all the authors
  app.get("/api/authors", function(req, res){
    db.Author.findAll({}).then(function(dbAuthor){
      res.json(dbAuthor);
    });
  });
  //gets a single author by id
  app.get("/api/authors/:id", function(req, res){
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor){
      res.json(dbAuthor);
    });
  });
  //adds an author to the database
  app.post("/api/authors", function(req, res){
    db.Author.create(req.body).then(function(dbAuthor){
      res.json(dbAuthor);
    });
  });

}