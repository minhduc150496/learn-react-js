const products = [
  {
    productName: "Làm Chủ Tuổi 20 - Dương Duy Bách",
    image: "https://pibook.vn/uploads/products/81547_23_11_17_lam-chu-tuoi-20.jpg",
    price: "180000",
  },
  {
    productName: "Code Dạo Ký Sự - Phạm Huy Hoàng",
    image: "https://images.gr-assets.com/books/1488444615l/34446353.jpg",
    price: "160000",
  },
  {
    productName: "Sống Và Khát Vọng - Trần Đăng Khoa",
    image: "https://salt.tikicdn.com/cache/550x550/media/catalog/product/i/m/img431_7.jpg",
    price: "100000",
  },
];

function CartItem(props) {
  return (
    <tr>
    <td></td>
    <td>
    <img className="product-image" src={props.image} />
    </td>
    <td>{props.productName}</td>
    <td>{props.price}</td>
    </tr>
  );
}

function ShoppingCart(props) {
  return (
    <div>
    <h1>TiKi.com</h1>
    <table>
    <thead>
    <tr>
    <th>#</th>
    <th>Hình ảnh</th>
    <th>Tên sản phẩm</th>
    <th>Đơn giá</th>
    </tr>
    </thead>
    <tbody>
    {
      props.products.map((cartItem, index) => {
        return (
          <CartItem
          image={cartItem.image}
          productName={cartItem.productName}
          price={cartItem.price}
          />
        );
      })
    }
    </tbody>
    </table>
    </div>
  )
}

ReactDOM.render(
  <ShoppingCart products={products} />,
  document.getElementById('root')
);
