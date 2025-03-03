import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set, get) => ({
      // Produkter hentet fra API (du setter disse med setProducts)
      products: [],
      // Favoritter: lagrer hele produktobjektet
      favourites: [],
      // Cart: lagrer produkter med et tilhørende quantity
      cart: [],

      // Sett produktene (f.eks. etter et API-kall)
      setProducts: (products) => set({ products }),

      // Favoritter
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

      // Cart-funksjonalitet
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
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

      // Funksjon for å beregne totalpris for handlekurven
      getCartTotal: () => {
        const cart = get().cart;
        return cart.reduce(
          (total, item) => total + (item.price || 0) * item.quantity,
          0
        );
      },
    }),
    {
      name: "product-store", // lagres f.eks. i localStorage med denne nøkkelen
    }
  )
);

export default useProductStore;
