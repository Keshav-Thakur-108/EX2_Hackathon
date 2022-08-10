var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.send("Homepage")
})

app.listen(3000, function (req, res) {
  console.log("The server is started");
});
