
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");



const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




mongoose.connect("mongodb+srv://admin-sangeeta:Sangeeta31@cluster0-vllwc.mongodb.net/spaceDB",  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });







const cardSchema = new mongoose.Schema ({
  title: String,
  content: String,
  source: String,
  date: String
})
const Card = new mongoose.model("Card", cardSchema);










app.get("/", function (req, res) {
  res.render("home")
  });







app.get("/contact", function (req, res) {
  res.render("contact")
})





app.get("/planet", function (req, res) {
  res.render("planet")
});





app.get("/add", function (req, res) {
    res.render("add")
});






app.get("/card", function (req, res) {
  Card.find({}, function (err, foundCards) {
    if (!err) {
      if (foundCards) {
        res.render("card", {cards: foundCards, i: 0})
      }
    }
  })
})








//parameters
app.get("/card/:topic", function (req, res) {
   Card.find(function (err, foundCards) {
     if (!err) {
       if (foundCards) {
         for (var i = 0; i < foundCards.length; i++) {
           if (i == req.params.topic) {
             res.render("fullpageview", {card: foundCards[i]})
           }
         }
       }
     }
   });
});








app.post("/add", (req, res) => {
  const addFact = new Card ({
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    source: req.body.source
  });
  addFact.save(function (err) {
    if (!err) {
      res.redirect("/card")
    }
  });
})







app.listen(3000 || process.env.port, function() {
  console.log("Server started on port 3000");
});
