import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/Cart/CartContext";
//const url ="http://magento2.magentech.com/themes/sm_marketnew/pub/media/catalog/product/cache/3ae7faad2935b0e1f9ccb39783811eb6/f/-/f-7_1.jpg";
const url = "https://source.unsplash.com/random/?";

const CardProduct = ({ product }) => {

  const { AddItemToCart } = useContext(CartContext);
  
  return (
    <div className="d-block me-5 ms-5">
      <Link className="m-auto" to={`/products/${product.id}`}>
        <img
          className="m-auto w-100 h-px-300"
          src={url + product.category.name + "&" + product.id}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Link>
      <p className="m-0 text-truncate" title={product.name}>
        {product.name}
      </p>
      <div className="d-flex justify-content-between align-items-center">
        {product.isOffSale ? (
          <div>
            <span className="text-primary text-decoration-line-through me-2">
              {product.price}
            </span>
            <span className="text-primary">
              {product.price * ((100 - product.percent) / 100)}
            </span>
          </div>
        ) : (
          <span className="text-primary">{product.price}</span>
        )}
        <button className="btn pe-0" onClick={() => AddItemToCart(product)}>
          <i className="bi bi-bag"></i>
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
