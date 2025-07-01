"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import api from "./MockAPI"; // Import the API service
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";

export default function App() {
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
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isDeleting={isDeleting}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Add New Product Form */}
        <AddProductForm
          newProductName={newProductName}
          setNewProductName={setNewProductName}
          isAdding={isAdding}
          onAdd={handleAdd}
        />

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
