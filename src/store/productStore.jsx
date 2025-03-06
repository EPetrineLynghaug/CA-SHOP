import { create } from "zustand";
import { persist } from "zustand/middleware";

const EXPIRY_TIME = 1000 * 60 * 60 * 24; // 24 timer

const useProductStore = create(
  persist(
    (set, get) => ({
      // Produkter hentet fra API
      products: [],
      // Favourites: lagrer hele produktobjekter
      favourites: [],
      // Cart: lagrer produkter med tilhørende antall
      cart: [],
      // Tidspunkt for når state ble lagret
      savedAt: new Date().getTime(),

      // Setter produkter (f.eks. etter et API-kall)
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
      clearFavourites: () => set({ favourites: [] }),

      // Cart-funksjonalitet – merk at produktet fjernes ikke fra favorites
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
            return {
              cart: [
                ...state.cart,
                {
                  ...product,
                  quantity: 1,
                  imageUrl:
                    product.imageUrl || product.image || "https://via.placeholder.com/150",
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

      // Kalkuler totalpris for handlekurven
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
      // Migrasjonsfunksjon: Dersom lagret state er eldre enn EXPIRY_TIME, nullstilles state
      migrate: (persistedState, version) => {
        if (persistedState && persistedState.savedAt) {
          const currentTime = new Date().getTime();
          if (currentTime - persistedState.savedAt > EXPIRY_TIME) {
            return {
              products: [],
              favourites: [],
              cart: [],
              savedAt: new Date().getTime(),
            };
          }
        }
        return persistedState;
      },
      // Ved rehydrering fornyes savedAt for å forlenge gyldighetstiden
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.savedAt = new Date().getTime();
        }
      },
    }
  )
);

export default useProductStore;
