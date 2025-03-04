import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set, get) => ({
      // Products fetched from API
      products: [],
      // Favourites: stores entire product objects
      favourites: [],
      // Cart: stores products with an associated quantity
      cart: [],

      // Set products (e.g., after an API call)
      setProducts: (products) => set({ products }),

      // Favourites
      addFavourite: (product) =>
        set((state) => ({
          favourites: state.favourites.find((p) => p.id === product.id)
            ? state.favourites
            : [...state.favourites, product],
        })),
      removeFavourite: (productId) =>
        set((state) => ({
          favourites: state.favourites.filter((p) => p.id !== productId),
        })),
      // Clear all favourites
      clearFavourites: () => set({ favourites: [] }),

      // Cart functionality
      addToCart: (product) =>
        set((state) => {
          // Remove product from favourites if it exists there
          const updatedFavourites = state.favourites.filter(
            (p) => p.id !== product.id
          );
          // Check if product is already in the cart
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              favourites: updatedFavourites,
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              favourites: updatedFavourites,
              cart: [
                ...state.cart,
                {
                  ...product,
                  quantity: 1,
                 
                  imageUrl: product.imageUrl || product.image || "https://via.placeholder.com/150",
                },
              ],
            };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),

      // Function to calculate total price of the cart
      getCartTotal: () => {
        const cart = get().cart;
        return cart.reduce(
          (total, item) => total + (item.price || 0) * item.quantity,
          0
        );
      },
    }),
    {
      name: "product-store", 
    }
  )
);

export default useProductStore;
