"use client";

import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/store/useProductStore";

const ProductCardList = () => {
  const {
    products,
    isLoading,
    hasInitialized,
    setInitialized,
    filteredProducts,
    fetchProducts,
    category,
  } = useProductStore();

  useEffect(() => {
    if (!hasInitialized) {
      console.log("Component rendered");
      fetchProducts().then(() => {
        setInitialized();
      });
    }
  }, [hasInitialized, fetchProducts, setInitialized]);

  if (isLoading) {
    return (
      <div className="grid min-h-screen lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 md:grid-cols-2 grid-cols-1">
        {/* Loading skeleton */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-lg h-64"
          ></div>
        ))}
      </div>
    );
  }

  const displayProducts =
    category === "All Categories" ? products : filteredProducts;

  return (
    <div className="grid min-h-screen lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 md:grid-cols-2 grid-cols-1 ">
      {displayProducts.length > 0 ? (
        displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default ProductCardList;
