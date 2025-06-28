import React from "react";
import WishlistCard from "./WishlistCard";
import { useProductStore } from "@/store/useProductStore";

const WishlistCardList = () => {
  const { wishlist, wishlistCount } = useProductStore();

  if (wishlistCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-500 text-center">
          Items you add to your wishlist will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wishlist.map((product) => (
        <WishlistCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default WishlistCardList;
