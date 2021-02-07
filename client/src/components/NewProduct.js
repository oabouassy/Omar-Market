import { useState } from "react";
import "../styles/NewProduct.css";

const NewProduct = () => {
  const [formItems, setFormItems] = useState({
    name: "",
    about: "",
    category: "",
    thumbnail_url: "",
    rating: 0,
  });
  const [insertedStatus, setInsertedStatus] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setFormItems({ ...formItems, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://omar-market-api.herokuapp.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formItems),
        }
      );
      const data = await res.json();
      if (data.message) {
        setInsertedStatus(true);
        setTimeout(() => {
          setInsertedStatus(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newproduct">
      <div className="container">
        <form onSubmit={handleSubmit} className="newproduct_form">
          <h1 className="newproduct_heading">Add a new product</h1>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={formItems.name}
            onChange={handleChange}
          />
          <textarea
            rows="4"
            cols="80"
            placeholder="Product description"
            name="about"
            value={formItems.about}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            placeholder="Product category"
            name="category"
            value={formItems.category}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Product image link"
            name="thumbnail_url"
            value={formItems.thumbnail_url}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Product rating"
            name="rating"
            value={formItems.rating}
            onChange={handleChange}
          />
          <button className="newproduct_form_btn" type="submit">
            Add Product
          </button>
          {insertedStatus ? (
            <h1 className="newproduct_added">Product added successfully !</h1>
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default NewProduct;
