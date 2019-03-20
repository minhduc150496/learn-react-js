var bookList = null;

var NewBookForm = React.createClass({
  addBook() {
    const book = {
      title: this.refs.title.value,
      image: this.refs.image.value,
      price: this.refs.price.value
    }
    $.post("/addBook", book, function(data) {
      bookList.setState({books: data});
    });
  },
  render() {
    return(
      <table>
      <tbody>
      <tr>
      <td>Tên sách:</td>
      <td><input type="text" ref="title" /></td>
      </tr>
      <tr>
      <td>Link hình ảnh:</td>
      <td><input type="text" ref="image" /></td>
      </tr>
      <tr>
      <td>Đơn giá:</td>
      <td><input type="text" ref="price" /></td>
      </tr>
      <tr>
      <td colSpan="2" style={{ textAlign: "center" }}>
      <button onClick={this.addBook}>Thêm</button>
      </td>
      </tr>
      </tbody>
      </table>
    );
  }
});

var Book = React.createClass({
  delete() {
    $.post("/delete", {id: this.props.id}, function(data) {
      bookList.setState({books: data});
    });
  },
  render() {
    return (
      <tr>
      <td></td>
      <td>
      <img className="product-image" src={this.props.image} />
      </td>
      <td>{this.props.title}</td>
      <td>{this.props.price}</td>
      <td>
        <button onClick={this.delete}>Xóa</button>
      </td>
      </tr>
    );
  }
});

var BookList = React.createClass({
  getInitialState() {
    bookList = this;
    return {books: []};
  },
  componentDidMount() {
    $.post("/getBooks", function(data) {
      bookList.setState({books: data});
    });
  },
  render() {
    return (
      <table>
      <thead>
      <tr>
      <th>#</th>
      <th>Hình ảnh</th>
      <th>Tên sản phẩm</th>
      <th>Đơn giá</th>
      <th>Thao tác</th>
      </tr>
      </thead>
      <tbody>
      {
        this.state.books.map((cartItem, index) => {
          return (
            <Book
            key={index}
            id={index}
            image={cartItem.image}
            title={cartItem.title}
            price={cartItem.price}
            />
          );
        })
      }
      </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <div>
    <h1>TiKi.Vn</h1>
    <div id="div-add">
      <NewBookForm />
    </div>
    <br/>
    <BookList />
  </div>,
  document.getElementById('root')
);
