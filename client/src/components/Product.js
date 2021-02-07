import "../styles/Product.css";
import { Link } from "react-router-dom";
const Product = ({ id, name, about, category, thumbnail_url, rating }) => {
  return (
    <article className="product">
      <div className="product_container">
        <Link to={`/product/${id}`} className="product_img">
          <img src={thumbnail_url} alt="the real product" />
        </Link>
        <div className="product_details">
          <Link to={`/product/${id}`}>
            <h3 className="product_name">{name}</h3>
          </Link>
          <p className="product_about">{about}</p>
        </div>
        <div className="product_details2">
          <h3 className="category">{category}</h3>
          <div className="rating">
            <i className="ico fas fa-star"></i>
            <span className="rate_number">{rating} / 10</span>
          </div>
        </div>
      </div>
    </article>
  );
};
export default Product;
