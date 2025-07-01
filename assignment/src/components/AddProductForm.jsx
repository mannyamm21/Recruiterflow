import { Plus, Loader2 } from "lucide-react";

export default function AddProductForm({
  newProductName,
  setNewProductName,
  isAdding,
  onAdd,
}) {
  return (
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
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && onAdd()}
        />

        <button
          onClick={onAdd}
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
  );
}
