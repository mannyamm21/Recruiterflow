import { Trash2, Loader2 } from "lucide-react";

export default function ProductCard({ product, index, isDeleting, onDelete }) {
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

  return (
    <div
      className="relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      style={{
        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        {/* Delete Button - Top Right */}
        <button
          onClick={() => onDelete(product.id)}
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
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
  );
}
