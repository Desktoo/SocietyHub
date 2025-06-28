"use client";

import SaleProductsList from "@/components/sell/SaleProductsList";
import { CirclePlus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSellStore } from "@/store/useSellerStore";

const SellerPage = () => {
  const { productList } = useSellStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col justify-center">
      <motion.div
        className="max-w-7xl mx-auto w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header Section */}
        <motion.div
          className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="flex flex-col space-y-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Sell Your Products
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              {productList.length} products on sale
            </p>
          </motion.div>

          <Link href="/become-seller/new">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <motion.button
                className="bg-emerald-700 hover:bg-emerald-600 px-6 py-3 flex items-center justify-center gap-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
              >
                <CirclePlus className="text-white w-5 h-5" />
                <span className="text-white text-lg font-bold">
                  Add Products
                </span>
              </motion.button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Products List Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <SaleProductsList />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SellerPage;
