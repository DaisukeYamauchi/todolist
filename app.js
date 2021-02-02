const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();


let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});//ローカルデータでベースに接続
mongoose.connect("mongodb+srv://daisukeyamauchi:kahayogi2646590@cluster0.1cfpt.mongodb.net/todolistDB",{ useUnifiedTopology: true })//クラウド上のデータベースに接続(アトラス)
const listSchema = {
  list_name : String
};

const Item = mongoose.model("Item", listSchema);
//
const item1 = new Item({
  list_name: "welcome to your todolist!"
});

const item2 = new Item({
  list_name: "Hit the + button to aff a new item."
})

const item3 = new Item({
  list_name: "This is new list"
});

const defalutItems = [item1, item2, item3];

// Item.insertMany(defalutItems, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully accessed the database !");
//   }
// })



app.get("/", function(req,res){

  let day = date();

  Item.find({},function(err,itemman){
    // if(itemman.length===0){
    //   Item.insertMany(defalutItems, function(err){
    //     if(err){
    //       console.log(err);
    //     }else{
    //       console.log("Successfully accessed the database !");
    //     }
    //   });
    //   res.redirect("/");
    // }
    if(err){
      console.log(err);
    }else{
      res.render("list", {ListTitle: day, newListItems: itemman});
      console.log("データベースの要素の取得に成功しました。");
    }
  });

  // res.sendFile(__dirname+"/index.html");


});

app.get("/work", function(req,res){

res.render("list", {ListTitle: "Work List", newListItems: workItems});

});

app.get("/about", function(req,res){
  res.render("about");
});


app.get("/:customListName", function(req,res){
  console.log(req.params.customListName);
})










app.post("/", function(req, res){
  const itemName = req.body.wanna_list;
  // console.log(req.body.list);
  const item = new Item({
    list_name: itemName
  })
item.save();

res.redirect("/");







  // res.render("list", {addList: item});

});
app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.deleteOne({_id: checkedItemId },function(err){
  if (err){
    console.log(err);
  }else{
    console.log("DELETE Succsess");
    res.redirect("/");
  }


})

});
app.listen(3001,function(){
  console.log("sever hey!");

});


















app.listen(3000, function(){
  console.log("server open")
});
