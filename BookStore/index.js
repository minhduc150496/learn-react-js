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
    title: "Làm Chủ Tuổi 20 - Dương Duy Bách",
    image: "https://pibook.vn/uploads/products/81547_23_11_17_lam-chu-tuoi-20.jpg",
    price: "180000",
  },
  {
    title: "Code Dạo Ký Sự - Phạm Huy Hoàng",
    image: "https://images.gr-assets.com/books/1488444615l/34446353.jpg",
    price: "160000",
  },
  {
    title: "Sống Và Khát Vọng - Trần Đăng Khoa",
    image: "https://salt.tikicdn.com/cache/550x550/media/catalog/product/i/m/img431_7.jpg",
    price: "100000",
  },
    {
      title: "Làm Chủ Tuổi 20 - Dương Duy Bách",
      image: "https://pibook.vn/uploads/products/81547_23_11_17_lam-chu-tuoi-20.jpg",
      price: "180000",
    },
    {
      title: "Code Dạo Ký Sự - Phạm Huy Hoàng",
      image: "https://images.gr-assets.com/books/1488444615l/34446353.jpg",
      price: "160000",
    },
    {
      title: "Sống Và Khát Vọng - Trần Đăng Khoa",
      image: "https://salt.tikicdn.com/cache/550x550/media/catalog/product/i/m/img431_7.jpg",
      price: "100000",
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
