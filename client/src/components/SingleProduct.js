import loginContext from "../contexts/loginContext";
import { useEffect, useState, useContext } from "react";
import "../styles/SingleProduct.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const SingleProduct = ({ match }) => {
  const { loggedUser } = useContext(loginContext);
  const [item, setItem] = useState({});
  const history = useHistory();
  const id = match.params.id;
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setItem(data);
    };
    fetchProduct();
  }, []);
  const deletePost = async (e) => {
    // delete post
    const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.message) {
      history.push("/products");
    }
  };
  return (
    <div className="singleProduct">
      <div className="container">
        <h1 className="singleProduct_name">{item.name}</h1>
        <img
          className="singleProduct_image"
          src={item.thumbnail_url}
          alt="product"
        />
        <p className="singleProduct_about">{item.about}</p>
        <div className="singleProduct_rating_category_container">
          <div className="singleProduct_category">{item.category}</div>
          <div className="singleProduct_rating">
            <i className="ico fas fa-star"></i>
            <span className="actual_rating">{item.rating}</span>
          </div>
        </div>
        {loggedUser.isadmin ? (
          <button onClick={deletePost} className="singleProduct_delete">
            Delete this product
          </button>
        ) : (
          <Link to="/sign-in">
            <button className="singleProduct_delete">
              You are admin ? Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default SingleProduct;
