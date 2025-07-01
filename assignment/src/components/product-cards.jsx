"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Loader2 } from "lucide-react";
import api from "../MockAPI"; // Import the API service

export default function Component() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProducts = await api.fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(id);

    try {
      const response = await api.deleteProduct(id);
      if (response.success) {
        // Remove from UI with animation
        setProducts((prev) => prev.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleAdd = async () => {
    if (!newProductName.trim()) return;

    setIsAdding(true);
    setError(null);

    try {
      const newProductData = {
        name: newProductName,
      };

      const newProduct = await api.addProduct(newProductData);
      setProducts((prev) => [...prev, newProduct]);
      setNewProductName("");
    } catch (error) {
      console.error("Failed to add product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-xl text-gray-600">
            Loading products from MockAPI...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Product Collection
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                {/* Delete Button - Top Right */}
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={isDeleting === product.id}
                  className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                >
                  {isDeleting === product.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>

                {/* Product Avatar */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.avatar}
                    alt={product.product}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x200/e2e8f0/64748b?text=${encodeURIComponent(
                        product.product
                      )}`;
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 text-center truncate">
                    {product.product}
                  </h3>
                  <div className="text-xs text-gray-500 text-center space-y-1">
                    <p>ID: {product.id}</p>
                    {product.createdAt && (
                      <p>Created: {formatDate(product.createdAt)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Product Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add New Product
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product name (required)"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full h-12 px-4 text-base rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleAdd()
              }
            />

            <button
              onClick={handleAdd}
              disabled={!newProductName.trim() || isAdding}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Adding via MockAPI...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Plus className="h-5 w-5" />
                  <span>Add to Collection</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-lg text-gray-600 font-medium">
            Total Products:{" "}
            <span className="font-bold text-gray-800">{products.length}</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
