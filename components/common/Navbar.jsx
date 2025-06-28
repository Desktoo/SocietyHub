"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "@/public/assets/logo/logo.svg";
import { Heart, Menu, Search, ShoppingCart, Store, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { isLoggedIn, logout } = useAuthStore();
  const { wishlistCount } = useProductStore();

  const router = useRouter();

  const handleLogout = async () => {
    logout();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { duration: 0.2 },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const SearchButton = ({ size = "w-4" }) => (
    <motion.button
      type="submit"
      className="bg-emerald-600 rounded-lg flex items-center justify-center p-1"
      whileHover={{ scale: 1.1, backgroundColor: "#047857" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Search className={`${size} text-white`} />
    </motion.button>
  );

  const SearchBar = ({ isMobile = false }) => (
    <div
      className={`${
        isMobile ? "w-full mt-4 md:hidden" : "w-md lg:w-xl hidden md:block"
      }`}
    >
      <form className="flex border border-gray-300 bg-neutral-100 items-center justify-between rounded-lg p-1 md:px-1.5 md:py-0.5">
        <input
          type="text"
          placeholder="Search for Products..."
          className="flex-1 focus:outline-none text-neutral-700 p-1 bg-transparent"
        />
        <SearchButton size={isMobile ? "w-5" : "w-6"} />
      </form>
    </div>
  );

  const AuthButtons = ({ isMobile = false }) =>
    isLoggedIn ? (
      <motion.div className="lg:flex-row flex-col flex gap-5 lg:items-center">
        <Link href="/wishlist">
          <motion.div
            className="flex gap-2 items-center relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Heart className="w-5" />
              {wishlistCount > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </motion.div>
              )}
            </div>
            <label className="lg:hidden font-semibold text-md">Wishlist</label>
          </motion.div>
        </Link>

        <Link href="/cart">
          <motion.div
            className="flex gap-2 items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ShoppingCart className="w-5" />
            <label className="lg:hidden font-semibold text-md">Cart</label>
          </motion.div>
        </Link>

        <Link href="/become-seller">
          <motion.div
            className="flex gap-2 items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Store className="w-5" />
            <label className="lg:hidden font-semibold text-md">
              Sell Products
            </label>
          </motion.div>
        </Link>

        <motion.div
          className="px-4 py-1 border border-gray-300 rounded-lg flex justify-center"
          whileHover={{
            borderColor: "#ef4444",
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{ duration: 0.2 }}
          onClick={handleLogout}
        >
          <motion.button
            className="text-gray-600"
            whileHover={{
              color: "#ef4444",
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{ duration: 0.2 }}
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    ) : (
      <div
        className={`flex ${
          isMobile ? "flex-col gap-2 mt-2" : "gap-2 md:gap-4 flex items-center"
        }`}
      >
        <Link href="/login">
          <motion.button
            className={`${
              isMobile ? "border border-neutral-400 rounded-lg py-2 px-4" : ""
            } font-semibold cursor-pointer text-neutral-600`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={buttonVariants.transition}
          >
            Login
          </motion.button>
        </Link>
        <Link href="/signup">
          <motion.div
            className="bg-emerald-700 rounded-lg px-4 py-1.5 cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "#047857" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button className="text-white font-semibold cursor-pointer">
              Signup
            </button>
          </motion.div>
        </Link>
      </div>
    );

  return (
    <motion.div
      className="p-4 lg:px-10 border-b border-neutral-200 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex gap-2 items-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image src={img} alt="logo" className="w-8" />
            <h1 className="font-bold text-2xl text-emerald-600">SocietyHub</h1>
          </motion.div>
        </Link>

        {/* Desktop Search */}
        <SearchBar />

        {/* Auth Buttons */}
        <div className="flex items-center">
          {/* Desktop Auth */}
          <div className="hidden lg:flex">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            {!openMenu ? (
              <motion.button
                onClick={() => setOpenMenu(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="text-neutral-600" />
              </motion.button>
            ) : (
              <AnimatePresence>
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-4 top-4 flex flex-col items-end border border-neutral-300 rounded-lg p-3 bg-white shadow-lg z-50"
                >
                  <motion.button
                    onClick={() => setOpenMenu(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="mb-2"
                  >
                    <X className="text-neutral-600" />
                  </motion.button>
                  <AuthButtons isMobile />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <SearchBar isMobile />
    </motion.div>
  );
};

export default Navbar;
