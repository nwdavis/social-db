
// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET all comments related to a post - Returns JSON object of all comments related to a Post
  // id = PostId
  // 
  app.get("/posts/api/post-comments/:id", function(req, res) {
    db.Comm.findAll({
      where: {
        PostId: req.params.id
      }
    }).then(function(dbComms) {
      res.json(dbComms);
    });
  });

  // GET method for finding a User's comments
  // Returns a JSON object of all comments related to a user
  // id = UserId
  app.get("/posts/api/user-comments/:id", function(req, res) {
    db.Comm.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new comment
  // Must have the following as a JSON object:
  // body:
  // UserId:
  // PostId:

  app.post("/api/comments", function(req, res) {
    console.log(req.body);
    db.Comm.create(req.body).then(function(dbComm) {
      res.json(dbComm);
    });
  });

  // ---EVERYTHING BELOW IS UNFINISHED---
  // DELETE route for deleting posts
  //
  // Need to get delete and edit calls working
  //
  //
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
