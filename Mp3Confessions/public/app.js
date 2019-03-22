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
  getInitialState() {
    return {
      onEdit: false,
      title: this.props.title,
      price: this.props.price
    };
  },
  delete() {
    $.ajax({
        url: "/delete",
        type: "DELETE",
        data: {id: this.props.id},
        success: function(data) {
          bookList.setState({books: data});
        }
    });
  },
  edit() {
    if (this.state.onEdit===false) { // start editing...
      this.setState({onEdit: true});
    } else { // done editing, and send to server
      const params = {
        id: this.props.id,
        title: this.refs.txtTitle.value,
        price: this.refs.txtPrice.value
      }
      $.ajax({
        url: "/edit",
        type: "PUT",
        data: params,
        success: function(data) {
          bookList.setState({books: data});
        }
      });
      this.setState({onEdit: false});
    }
  },
  render() {
    var displayTitle = <span>{this.props.title}</span>;
    if (this.state.onEdit) {
      displayTitle = <input className="input-title" type="text" defaultValue={this.props.title} ref="txtTitle"/>
    };
    var displayPrice = <span>{this.props.price}</span>;
    if (this.state.onEdit) {
      displayPrice = <input className="input-price" type="text" defaultValue={this.props.price} ref="txtPrice"/>
    };
    var btnEdit = "Chỉnh sửa";
    if (this.state.onEdit) {
      btnEdit = "Cập nhật";
    };
    return (
      <tr>
      <td>{this.props.id+1}</td>
      <td>
      <img className="product-image" src={this.props.image} />
      </td>
      <td>{displayTitle}</td>
      <td>{displayPrice}</td>
      <td>
        <button onClick={this.delete}>Xóa</button>
        <button onClick={this.edit}>{btnEdit}</button>
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
