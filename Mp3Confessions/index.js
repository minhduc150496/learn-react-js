var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
var parser = bodyParser.urlencoded({extended: false});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3001);

var books = [
  {
    sender: "Anh Đức",
    receiver: "My My",
    message: "Chúc em một khóa mới may mắn nè! Thương.",
    mp3Code: "IW87ZFCO",
  },
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
  {
    sender: "Đức",
    receiver: "Tập thể lớp 9.1",
    message: "Nhớ lớp mình quá bây ơi.",
    mp3Code: "IW6OI0FA",
  },
];

app.get("/", function(req, res) {
  res.render("home");
})

app.post("/addBook", parser, function(req, res) {
  const newBook = req.body;
  books = [newBook].concat(books);
  res.send(books);
})

app.post("/getBooks", function(req, res) {
  res.send(books)
})

app.delete("/delete", parser, function(req, res) {
  const id = req.body.id;
  books.splice(id, 1);
  res.send(books);
})

app.put("/edit", parser, function(req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  books[id].title = title;
  books[id].price = price;
  res.send(books);
})
