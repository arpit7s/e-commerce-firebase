import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get products from Redux store
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setFilteredProducts(products || []);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        // Assuming the API returns { products: [...] }
        setFilteredProducts(response.data.products || []);
        setError("");
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        {query ? `Search Results for "${query}"` : "All Products"}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <img
                src={product.thumbnail || product.image}
                alt={product.title || product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">
                {product.title || product.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {product.description}
              </p>
              <p className="text-lg font-bold mt-2">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;