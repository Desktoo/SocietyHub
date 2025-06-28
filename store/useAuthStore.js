import axiosInstance from "@/libs/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    isLoggedIn: false,

    // Signup function: sends signup data and updates login state on success
    signup: async (formData) => {
      try {
        await axiosInstance.post("/auth/signup", formData);
        toast.success("Account created successfully!");
        set({ isLoggedIn: true });
      } catch (error) {
        console.log(error);
        toast.error("Failed to create account");
      }
    },

    // Login function: handles API call, saves JWT token on success
    login: async (formData) => {
      try {
        const res = await axiosInstance.post("/auth/login", formData);
        const { token } = res.data;

        if (token) {
          localStorage.setItem("token", token);
          toast.success("Logged In Successfully!");
          set({ isLoggedIn: true });
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 400) {
          toast.error("Invalid Credentials");
        } else if (error.response?.status === 500) {
          toast.error("Server Error. Please try again later.");
        } else {
          toast.error("Login Failed");
        }
      }
    },

    // Logout function: removes token and resets login state
    logout: () => {
      localStorage.removeItem("token");
      set({ isLoggedIn: false });
      toast.success("Logged out Successfully!");
    },
  }))
);
