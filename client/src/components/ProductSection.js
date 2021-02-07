import { useEffect, useContext } from "react";
import "../styles/Products.css";
import productContext from "../contexts/productContext";
import Product from "./Product";

const ProductSection = () => {
  const { productlist, setProductList } = useContext(productContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://omar-market-api.herokuapp.com/api/products"
      );
      const data = await res.json();
      if (data.length > 0) {
        setProductList(data);
      }
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <section className="products" id="products">
      <div className="container">
        <h2>All Products</h2>
        <div className="products_container">
          {productlist.length > 0 ? (
            productlist.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                about={product.about}
                category={product.category}
                thumbnail_url={product.thumbnail_url}
                rating={product.rating}
              />
            ))
          ) : (
            <h1>No products</h1>
          )}
        </div>
      </div>
    </section>
  );
};
export default ProductSection;
