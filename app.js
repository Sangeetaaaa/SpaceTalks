//requiring modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");





//setting up the app
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));







// connecting to mongoose
// mongodb+srv://admin-sangeeta:Sangeeta31@cluster0-vllwc.mongodb.net/spaceDB (global)
mongoose.connect("mongodb://localhost:27017/spaceDB",  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });









// creating a schema
const cardSchema = new mongoose.Schema ({
  title: String,
  content: String,
  source: String,
  date: String,
  img: String
})
const Card = new mongoose.model("Card", cardSchema);









//responsing with home.ejs file when / route is access
app.get("/", (req, res) => {
  res.render("home")
})






//responsing with contact.ejs file when /contact route is access
app.get("/contact", (req, res) => {
  res.render("contact")
})






// //responsing with planet.ejs file when /planet route is access
// app.get("/planet", function (req, res) {
//   res.render("planet")
// });










//send card.ejs when someone gets /card route
app.get("/card", (req, res) => {
  Card.find((err, foundCards) => {
    !err &&  res.render("card", {cards: foundCards})
  });
});








//parameters for fullpageview when clicked on a individual topic
app.get("/card/:topic", (req, res) => {
  Card.find((err, foundCards) => {
   (!err) && foundCards.forEach((eachCard, i=0) => {
       (i == req.params.topic) && res.render("fullpageview", {card: eachCard})
    });
  });
});













//setting a server, which is running the port 3000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, () => {
  console.log("Server started on port 3000");
})






//add a new fact
// app.get("/add", (req, res) => {
//     res.render("add")
// })








//constructing

// app.post("/add", (req, res) => {
//   const addFact = new Card ({
//     name: req.body.name,
//     title: req.body.title,
//     content: req.body.content,
//     source: req.body.source
//   });
//   addFact.save(function (err) {
//     if (!err) {
//       res.redirect("/card")
//     }
//   });
// })
