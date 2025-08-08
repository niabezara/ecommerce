import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock variants for demonstration
  const productVariants = {
    "men's clothing": ["Small", "Medium", "Large"],
    "women's clothing": ["XS", "S", "M", "L"],
    jewelery: ["Gold", "Silver", "Bronze"],
    electronics: ["128GB", "256GB", "512GB"],
  };

  // Simulate stock: randomly mark some products as out of stock
  const addStockInfo = (products) => {
    return products.map((p) => ({
      ...p,
      inStock: Math.random() > 0.3, // 70% chance in stock
    }));
  };

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const products = await response.json();
        const productsWithStock = addStockInfo(products);
        setData(productsWithStock);
        setFilter(productsWithStock);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className="col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={400} />
        </div>
      ))}
    </>
  );

  const filterProduct = (cat) => {
    if (cat === "all") {
      setFilter(data);
    } else {
      setFilter(data.filter((item) => item.category === cat));
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-3">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("all")}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.length === 0 && (
          <p className="text-center fs-5">
            No products found in this category.
          </p>
        )}

        {filter.map((product) => {
          const variants = productVariants[product.category] || [];
          return (
            <div
              key={product.id}
              className="col-lg-4 col-md-6 col-sm-8 col-12 mb-4 d-flex "
            >
              <ProductCard product={product} variants={variants} />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Latest Products</h2>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
