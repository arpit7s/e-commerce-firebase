// SearchPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q"); // Get the query parameter
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Assuming products are in Redux state (make sure it is an array)
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // If you're fetching products from an API, use this block
      axios
        .get(`https://dummyjson.com/products?search=${query}`)
        .then((response) => {
          setFilteredProducts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Something went wrong");
          setLoading(false);
        });
    }
  }, [query]);
console.log(products);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      if (query) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    } else {
      setError("No products data available");
    }
  }, [query, products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
