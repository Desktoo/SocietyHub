"use client";

import React, { useState } from "react";
import placeholderImg from "@/public/assets/images/notFound.png";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSellStore } from "@/store/useSellerStore";
import { useRouter } from "next/navigation";

const SaleProducts = ({ product }) => {
  const { deleteProduct } = useSellStore();

  const router = useRouter();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(product._id);
    }
  };

  const handleEdit = () => {
    router.push(`/become-seller/edit/${product._id}`);
  };

  return (
    <motion.div
      className=" md:w-3xs w-auto bg-neutral-400/20 shadow-lg rounded-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full h-56">
        <Image
          src={
            product.imageUrl && product.imageUrl.trim()
              ? product.imageUrl
              : placeholderImg
          }
          alt="productImg"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 bg-white w-full rounded-b-lg flex flex-col ">
        <div className="flex w-full justify-between">
          <label className="text-left font-bold text-xl md:text-xl text-gray-800">
            {product.productName}
          </label>
        </div>
        <div className="text-gray-600 text-sm mb-2">
          <p>{product.description}</p>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-gray-900">
          <h1>${product.price}</h1>
        </div>
        <div className="text-sm text-gray-600 space-y-1 mb-5">
          <p>Category : {product.category}</p>
          <p>Seller Info : {product.sellersInfo}</p>
        </div>
        <div className="flex gap-2">
          <motion.div
            className="w-full bg-emerald-700 text-white py-3 px-1 gap-2 rounded-xl font-semibold flex justify-center shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
          >
            <Edit className="w-4" />
            <button className="text-sm md:text-base">Edit</button>
          </motion.div>
          <motion.div
            className="w-full border border-red-500 text-red-500 py-3 px-1 gap-2 rounded-xl font-semibold flex justify-center shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
          >
            <Trash2 className="w-4" />
            <button className="text-sm md:text-base">Delete</button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SaleProducts;
