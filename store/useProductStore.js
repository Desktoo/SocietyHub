import { create } from "zustand";
import axiosInstance from "@/libs/axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,
      filteredProducts: [],
      hasInitialized: false,
      wishlist: [],
      wishlistCount: 0,
      category: "All Categories",

      setCategory: (category) => {
        const { products } = get();
        const filtered =
          category === "All Categories"
            ? products
            : products.filter(
                (item) =>
                  item.category?.toLowerCase() === category.toLowerCase()
              );
        set({ category: category, filteredProducts: filtered });
      },

      setInitialized: () => set({ hasInitialized: true }),

      // Fetch all products from the API
      fetchProducts: async () => {
        if (get().isLoading) return; // Prevent refetch is already loading

        set({ isLoading: true, error: null });
        try {
          const res = await axiosInstance.get("/products");
          console.log("Fetched products", res.data);
          set({ products: res.data || [], isLoading: false });
        } catch (error) {
          console.log("Failed to fetch Products: ", error);
          toast.error("Failed to fetch Products");
          set({ isLoading: false, error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },

      // Add product to wishlist (with duplicate check)
      addToWishlist: (product) => {
        const { wishlist } = get();

        const isAlreadyPresent = wishlist.some(
          (item) => item.id === product.id
        );

        if (isAlreadyPresent) {
          toast.error("Item already in the wishlist");
          return;
        }

        const updatedWishlist = [...wishlist, product];
        set({
          wishlist: updatedWishlist,
          wishlistCount: updatedWishlist.length,
        });
        toast.success("Added to wishlist");
      },

      // Remove item from wishlist by ID
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        const updatedWishlist = wishlist.filter(
          (item) => item.id !== productId
        );

        set({
          wishlist: updatedWishlist,
          wishlistCount: updatedWishlist.length,
        });
        toast.success("Removed from Wishlist");
      },
      clearWishList: () => {
        set({ wishlist: [], wishlistCount: 0 });
        toast.success("Wishlist Cleared");
      },
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.id === productId);
      },
      toggleWishlist: (product) => {
        const { isInWishlist, addToWishlist, removeFromWishlist } = get();

        if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist(product);
        }
      },
    }),
    {
      name: "product-store",
    }
  )
);
