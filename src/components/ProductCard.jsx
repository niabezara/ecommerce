import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

const ProductCard = ({ product, variants }) => {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || "");

  const addProduct = () => {
    dispatch(addCart({ ...product, variant: selectedVariant }));
    toast.success("Added to cart");
  };
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  return (
    <div className="card h-100">
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top p-3"
        style={{ height: 300, objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text flex-grow-1">
          {truncateText(product.description, 200)}
        </p>

        {variants.length > 0 && (
          <select
            className="form-select mb-3"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            {variants.map((variant, idx) => (
              <option key={idx} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="h5">${product.price.toFixed(2)}</span>

          {product.inStock ? (
            <span className="badge bg-success">In Stock</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <Link to={`/product/${product.id}`} className="btn btn-outline-dark">
            View Details
          </Link>
          <button
            disabled={!product.inStock}
            className="btn btn-dark mt-auto"
            onClick={addProduct}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
