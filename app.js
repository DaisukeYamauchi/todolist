const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();


var items = ["Buy Food","Cook Food","Eat Food"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

  var today = new Date();

  var options = {
    weekend: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  res.render("list", {kindOfDay: day, addLists: items});
  // res.sendFile(__dirname+"/index.html");


});


app.post("/", function(req, res){

  item = req.body.wanna_list;
  items.push(item)
  console.log(items);
  // res.render("list", {addList: item});
  res.redirect("/");
})


app.listen(3001,function(){
  console.log("sever hey!");

});


















app.listen(3000, function(){
  console.log("server open")
});
