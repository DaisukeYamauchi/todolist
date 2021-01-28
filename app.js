const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();


let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){

  let today = new Date();

  var options = {
    weekend: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  res.render("list", {ListTitle: day, newListItems: items});
  // res.sendFile(__dirname+"/index.html");


});

app.get("/work", function(req,res){









  res.render("list", {ListTitle: "Work List", newListItems: workItems});

})


app.post("/work", function(req,res){

  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");

})






app.post("/", function(req, res){
  let item = req.body.wanna_list;
  console.log(req.body.list);
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    item.push(item);
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
