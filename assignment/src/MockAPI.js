// API service that uses your mockapi.io endpoint
const api = {
    // Fetch products from your mockapi.io API
    fetchProducts: async () => {
        try {
            const response = await fetch(
                "https://66855303b3f57b06dd4c4802.mockapi.io/products"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const products = await response.json();
            console.log("Fetched products:", products);
            return products;
        } catch (error) {
            console.error("API fetch error:", error);
            throw error;
        }
    },

    // Delete product via mockapi.io
    deleteProduct: async (productId) => {
        try {
            const response = await fetch(
                `https://66855303b3f57b06dd4c4802.mockapi.io/products/${productId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            console.log(`API: Successfully deleted product ${productId}`);
            return {
                success: true,
                message: `Product ${productId} deleted successfully`,
            };
        } catch (error) {
            console.error("API delete error:", error);
            throw error;
        }
    },

    // Add new product via mockapi.io
    addProduct: async (productData) => {
        try {
            const response = await fetch(
                "https://66855303b3f57b06dd4c4802.mockapi.io/products",
                {
                    method: "POST",
                    body: JSON.stringify({
                        product: productData.name,
                        avatar: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/${Math.floor(
                            Math.random() * 100
                        )}.jpg`,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const newProduct = await response.json();
            console.log(`API: Successfully added new product:`, newProduct);
            return newProduct;
        } catch (error) {
            console.error("API add error:", error);
            throw error;
        }
    },

    // Update product via mockapi.io
    updateProduct: async (productId, productData) => {
        try {
            const response = await fetch(
                `https://66855303b3f57b06dd4c4802.mockapi.io/products/${productId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        product: productData.name,
                        avatar: productData.avatar,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const updatedProduct = await response.json();
            console.log(`API: Successfully updated product:`, updatedProduct);
            return updatedProduct;
        } catch (error) {
            console.error("API update error:", error);
            throw error;
        }
    },
};

export default api;