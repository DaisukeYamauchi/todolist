const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const app = express();


let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){

  let day = date();

  res.render("list", {ListTitle: day, newListItems: items});
  // res.sendFile(__dirname+"/index.html");


});

app.get("/work", function(req,res){

res.render("list", {ListTitle: "Work List", newListItems: workItems});

});

app.get("/about", function(req,res){
  res.render("about");
});









app.post("/", function(req, res){
  let item = req.body.wanna_list;
  console.log(req.body.list);
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
      res.redirect("/");
  }





  // res.render("list", {addList: item});

})


app.listen(3001,function(){
  console.log("sever hey!");

});


















app.listen(3000, function(){
  console.log("server open")
});
