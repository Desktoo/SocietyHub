"use client";

import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import tshirtImg from "@/public/assets/images/tshirt.png";

const CartCard = () => {
  const [quantity, setQuantity] = useState(3);

  const handleQuantityChange = (increment) => {
    if (increment) {
      setQuantity((prev) => prev + 1);
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const unitPrice = 349.99;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Product Image */}
      <div className="flex">
        <div className="w-full md:w-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <Image src={tshirtImg} alt="img" />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            Ergonomic Office Chair
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Comfortable office chair with lumbar support and adjustable height.
          </p>
        </div>

        {/* Price and Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Unit Price and Quantity Controls */}
          <div className="flex items-center gap-4">
            <span className="text-lg md:text-xl font-semibold text-gray-900">
              ${unitPrice.toFixed(2)}
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(false)}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 min-w-12 text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(true)}
                className="p-2 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total Price and Delete */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
            <button className="p-2 hover:bg-red-50 rounded-md transition-colors">
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
