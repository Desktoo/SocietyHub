"use client";

import CartList from "@/components/cart/CartList";
import React from "react";
import { motion } from "framer-motion";

const Cart = () => {
  return (
    <div className="h-full p-10 bg-gray-50 flex lg:flex-row flex-col gap-5 justify-between">
      <motion.div
        className="lg:w-3/4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CartList />
      </motion.div>
      <motion.div
        className="bg-white p-6 lg:w-1/4 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between w-full">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">$1049.97</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">$84.00</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between w-full">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">$1133.97</span>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full bg-emerald-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200">
            Proceed to Checkout
          </button>
          <button className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
