"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import imgNotFound from "@/public/assets/images/notFound.png";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";

const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useProductStore();

  const [like, setLike] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLike(isInWishlist(product._id));
  }, [product._id, isInWishlist]);

  const handleClick = () => {
    router.push(`products/${product._id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist({
      id: product._id,
      name: product.productName,
      description: product.description,
      price: product.price,
      category: product.category,
      seller: product.sellersInfo,
      image: product.imageUrl,
    });
    setLike(!like);
  };

  return (
    <motion.div
      className=" md:w-3xs w-auto bg-neutral-900/20 shadow-lg rounded-lg h-auto md:h-min"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="relative object-contain w-full h-56  flex ">
        <Image
          src={
            product.imageUrl && product.imageUrl.trim()
              ? product.imageUrl
              : imgNotFound
          }
          alt={product.productName}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 bg-white w-full rounded-b-lg flex flex-col ">
        <div className="flex w-full justify-between">
          <label className="text-left font-bold text-lg md:text-xl text-gray-800">
            {product.productName}
          </label>
          <motion.div
            className={`p-2 rounded-full cursor-pointer ${
              like ? "bg-red-500" : "bg-white border border-gray-500"
            }`}
            onClick={handleWishlistClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={like ? "text-white fill-white" : "text-gray-500"}
            />
          </motion.div>
        </div>
        <div className="text-gray-600 text-sm mb-2 truncate w-full">
          <p>{product.description}</p>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-gray-900">
          <h1>${product.price}</h1>
        </div>
        <div className="text-sm text-gray-600 space-y-1 w-full mb-5 truncate">
          <p>Category : {product.category}</p>
          <p>Seller : {product.sellersInfo}</p>
        </div>
        <div className="flex gap-2">
          <motion.div
            className="w-full bg-white px-1 py-3 border border-gray-500/20  rounded-xl font-semibold flex items-center justify-center shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="text-sm md:text-base  text-gray-700">
              Add to cart
            </button>
          </motion.div>
          <Link href={`/cart`} className="w-full ">
            <motion.div
              className="w-full bg-emerald-700 text-white py-3 px-1 rounded-xl font-semibold flex justify-center shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="text-sm md:text-base">Buy Now</button>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
