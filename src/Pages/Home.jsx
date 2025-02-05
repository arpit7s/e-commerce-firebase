import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Common/Loader";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("none");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        const updatedProducts = res.data.map((product) => ({
          ...product,
          stock: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0, // Random stock data
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedProducts = () => {
    let filteredProducts =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category.id === selectedCategory);

    if (sortOrder === "none") return filteredProducts;
    return filteredProducts.sort((a, b) => (sortOrder === "h2l" ? b.price - a.price : a.price - b.price));
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl m-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 m-5">
            All Products <span className="text-gray-500 text-lg">({products.length})</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white text-sm md:text-base"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              onChange={handleSortChange}
              className="px-4 py-2 border rounded-lg bg-white text-sm md:text-base"
            >
              <option value="none">Sort by</option>
              <option value="l2h">Price: Low to High</option>
              <option value="h2l">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts().map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-64 object-cover object-center"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {Math.round(product.discount)}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-sm text-gray-500 uppercase">{product.brand}</p>
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>

                {/* Rating */}
                <div className="flex items-center my-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < Math.floor(product.rating) ? "fill-yellow-400" : "fill-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-800">${product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stock Status */}
                <p className="text-sm mb-4">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>

                {/* Button */}
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm md:text-base hover:bg-purple-700 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
