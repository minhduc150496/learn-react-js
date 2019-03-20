function Friend(props) {
  return (
    <div>
    <h3>{props.fullName}</h3>
    <p>Phone: {props.phone}</p>
    </div>
  )
}

function congrat(name) {
  alert('Congratulations, ' + name);
}

var NameCard = React.createClass({
  viewDetail() {
    alert('Details info of ' + this.props.fullName);
  },
  addPerson() {
    this.setState({total: this.state.total + 1});
  },
  getInitialState() {
    return {total: parseInt(this.props.total)};
  },
  activateCode() {
    var itemCode = this.refs.itemCode.value;
    var itemType = this.refs.itemType.value;
    alert("Kích hoạt thành công:\nMã: "+itemCode+"\nLoại: "+itemType);
  },
  render() {
    return (
      <div>
      <h1>{this.props.fullName}</h1>
      <h2>Profile:</h2>
      <p>Phone: {this.props.phone}</p>
      <p>Email: {this.props.email}</p>
      <h3>Nội dung bài dự thi:</h3>
      <p>"{this.props.children}"</p>
      <button onClick={this.viewDetail}>Xem chi tiết</button>
      <button onClick={() => {congrat(this.props.fullName)}}>Chúc mừng</button>
      {/*<h2>His friends:</h2>
        <Friend fullName="My My" phone="115" />
        <Friend fullName="Chan Chan" phone="116" />
        <Friend fullName="Hau" phone="119" />*/
      }
      <div className='border-red'>
      <p>Tổng số nhân vật: {this.state.total}</p>
      <button onClick={this.addPerson}>Thêm nhân vật mới</button>
      </div>
      Nhập mã vật phẩm:
      <input type="text" ref="itemCode"/><br/>
      Chọn loại vật phẩm:
      <select ref="itemType">
      <option value="Áo giáp">Áo giáp</option>
      <option value="Vũ khí">Vũ khí</option>
      <option value="Năng lượng">Năng lượng</option>
      </select><br/>
      <button onClick={this.activateCode}>Kích hoạt</button>
      </div>
    );
  } // end func
}); // end class

var IncBtn = React.createClass({
  incNum() {
    this.setState({number: this.state.number + 1});
  },
  getInitialState(){
    return {number: 1};
  },
  render() {
    return (
      <button onClick={this.incNum}>Hello {this.state.number}</button>
    );
  }
});

var AlbumFrame = React.createClass({
  prev() {
    if (this.state.num > 1) {
      this.setState({num: this.state.num - 1});
    }
  },
  next() {
    if (this.state.num < 3) {
      this.setState({num: this.state.num + 1});
    }
  },
  changeImage() {
    this.setState({num: this.state.num + 1});
    if (this.state.num == 4) {
      this.setState({num: 1});
    }
  },
  getInitialState() {
    return {num: 1};
  },
  componentDidMount() {
    setInterval(this.changeImage, 1000);
  },
  render() {
    return(
      <div>
      <img className="album-frame" src={"images/" + this.state.num + ".png"}/>
      <button onClick={this.prev}>Prev</button>
      <button onClick={this.next}>Next</button>
      </div>
    );
  }
});

var PhotoList = React.createClass({
  addPhoto() {
    var imageURL = this.refs.imageURL.value;
    var photoList = this.state.photoList;
    photoList.push(imageURL);
    this.setState({photoList: photoList});
  },
  getInitialState() {
    return {photoList: this.props.photoList};
  },
  render() {
    return(
      <div>
        <input type="text" ref="imageURL"/>
        <button onClick={this.addPhoto}>Thêm</button>
        <br/>
        {
          this.state.photoList.map((photo) => {
            return(
              <img className="photo" src={photo} />
            );
          })
        }
      </div>
    );
  }
});

const photoList = [
  "https://lh3.googleusercontent.com/hRFESEpFhPB8yDXaR16gGV2XTSqaij6xgzvZ1tkj-3hEM-8ykFX5oj8saT59FWNIHg",
  "https://images-na.ssl-images-amazon.com/images/I/61ZKBwFzjqL._SX425_.jpg",
  "https://res.cloudinary.com/teepublic/image/private/s--5-TZ6xG8--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1493075745/production/designs/1515503_1.jpg"
];
ReactDOM.render(
  <PhotoList photoList={photoList}/>,
  document.getElementById('root')
);

{/*ReactDOM.render(
  <IncBtn/>,
  document.getElementById('root')
)
*/}

{/*ReactDOM.render(
  <NameCard fullName="Duc" phone="113" email="duc@gmail.com" total="3">
  Nam Quốc Sơn Hà Nam đế cư<br/>
  Tuyệt nhiên định phận tại thiên thư
  </NameCard>,
  document.getElementById('root')
);
*/}
