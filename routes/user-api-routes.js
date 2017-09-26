var db = require("../models");
var crypto = require("crypto");

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
      
      var userPass = req.body.login_password;
      
      var genRandomString = function(length){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') 
                .slice(0,length);
      };
      
      var newHash = function(userPass, salt) {
        var data = userPass + salt;
        var md5pw = crypto.createHash('md5').update(data).digest("hex");
        console.log(data);
        console.log(md5pw);
        return md5pw;
      };
      
      var salt = genRandomString(10);
      
      var hexPw = newHash(userPass, salt);

      var login = {
        "login_password": hexPw,
        "salt": salt,
        "UserId": dbUser.id
      }

      db.Login.create(login).then(function(dbLogin){
        res.json(dbLogin);
      });
    });
  });

}