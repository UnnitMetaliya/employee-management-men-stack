require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

const employeeController = require("./controllers/employeeController");

var app = express();

//to include the form data into req parameter in router.post in employeeController.js
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
//we will have to convert that into JSON so use app.use again
app.use(bodyparser.json());

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("view engine", "hbs");

app.listen(3000, () => {
  console.log("Express server started at port: 3000");
});

app.use("/employee", employeeController);
