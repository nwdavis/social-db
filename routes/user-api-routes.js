var db = require("../models");
var crypto = require("crypto");
var Sequelize = require("sequelize");

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
  app.post("/api/user/create", function(req, res){

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

  app.get("/api/user/:login", function(req, res) {
    db.User.findOne({
      where: {
        name: req.params.login
      },
      include: [{
          model: db.Login,
          where: { UserId: Sequelize.col('User.id') }
      }]
      
    }).then(function(dbUser) {
      if (dbUser === null){
        throw err;
      } else {
        
        res.json(dbUser);
      
      }
    });
  });
}


//This function checks the pasword entered with the info from the database to authenticate the user
//it then returns info to the front end which will be used to create local storage of the username and user ID (code below)
//that local storage username can then be rendered wherever needed on the front end, and the user ID can be passed to the backend
//to retrieve each users posts, etc.

function checkPw(enteredPw, dbPw, dbSalt){
  var data = enteredPw + dbSalt;
  var md5pw = crypto.createHash('md5').update(data).digest("hex");

  if (md5pw === dbPw){
    return true;
  } else {
    return false;
  }
}

// localStorage.setItem("validUser": "true");
// localStorage.setItem("userId": XXXXXXX);
// localStorage.setItem("userName": XXXXXXX);
