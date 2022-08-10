var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, function (req, res) {
  console.log("The server is started");
});
