
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all posts -- needed for displaying front page
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // GET method for finding a post by id
  // id = PostId
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for creating a new post
  // accepts a JSON object 
  // Must have the following:
  // title:
  // body:
  // UserId: 

  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // ---EVERYTHING BELOW THIS LINE IS NOT WORKING---
  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });
};
