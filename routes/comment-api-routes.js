// *********************************************************************************
// comment-api-routes.js - this file offers a set of routes for creating and manipulating comments
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET all comments related to a post 
  app.get("/api/commments/", function(req, res) {
    var query = {};
    if (req.query.post_id) {
      query.PostId = req.query.post_id;
    }
    db.Comm.findAll({
      where: query
    }).then(function(dbComms) {
      res.json(dbComms);
    });
  });

  // Get route for retrieving a single users comments
  
  //NOT CORRECT RIGHT NOW
  app.get("/api/comments/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/comments/", function(req, res) {
    console.log(req.body);
    db.Comm.create(req.body).then(function(dbComm) {
      res.json(dbComm);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
