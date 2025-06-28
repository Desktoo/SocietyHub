import axiosInstance from "@/libs/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSellStore = create((set, get) => ({
  productList: [],
  isLoading: false,
  error: null,
  formSubmit: async (formData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not Authenticated");
        return null;
      }

      const res = await axiosInstance.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        return res.data;
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Failed to Upload Product: ", error);
      toast.error("Failed to Upload Product");
      return null;
    }
  },

  // Fetch all products listed by current user
  fetchUserProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated");
        set({ isLoading: false, error: "No authentication token" });
        return;
      }

      const res = await axiosInstance.get("/users/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = res.data.products || [];
      set({
        productList: products,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching user products: ", error);
      toast.error("Failed to fetch your products");
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
        productList: [],
      });
    }
  },

  // Delete a product by ID
  deleteProduct: async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      await axiosInstance.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedList = get().productList.filter(
        (product) => product._id !== productId
      );
      set({ productList: updatedList });
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product: ", error);
      toast.error("Failed to delete product");
    }
  },

  // Update product data by ID
  updateProduct: async (productId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const res = await axiosInstance.patch(
        `/products/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedList = get().productList.map((product) =>
        product._id === productId ? res.data.updatedProduct : product
      );

      set({ productList: updatedList });
      toast.success("Product updated successfully");

      return res.data.updatedProduct;
    } catch (error) {
      console.error("Failed to update product: ", error);
      toast.error("Failed to update product");
      return null;
    }
  },
}));
