import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import image from "../../assets/Image_not_available.png";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div>
        <img
          src={product.images[0] ? product.images[0].url : image}
          alt="Product"
        />
      </div>
      <p>{product.name}</p>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
