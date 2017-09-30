
//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

//setting up express app
var app = express();
var PORT = process.env.PORT || 8080;

//setting up Express app data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//static directory
app.use(express.static("public"));
app.use("/posts", express.static("public"));


//routes
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/comment-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);

//setting handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//starts the server INCLUDES FORCE TRUE, TAKE OUT AFTER TESTING!!!!!!!!!!
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

