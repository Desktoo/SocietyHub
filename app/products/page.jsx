"use client";

import Filter from "@/components/common/Filter";
import ProductCardList from "@/components/products/ProductCardList";
import React from "react";
import { motion } from "framer-motion";

const ProductsPage = () => {
  return (
    <motion.div
      className="h-full bg-gray-50 w-auto px-10 py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex-col flex">
          <motion.h1
            className="md:text-4xl font-bold text-gray-900 mb-4 text-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="md:text-xl text-gray-600 text-md"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover amazing products at unbeatable prices
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        className="flex-col gap-2 flex lg:flex-row"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div
          className="lg:w-1/5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Filter />
        </motion.div>
        <motion.div
          className="flex w-full justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ProductCardList />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductsPage;
