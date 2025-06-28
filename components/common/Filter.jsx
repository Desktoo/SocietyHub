"use client";

import { FilterIcon } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "@/store/useProductStore";

const Filter = () => {
  const filterOptions = [
    "All Categories",
    "Electronics",
    "Clothing",
    "Books",
    "Furniture",
    "Home & Garden",
    "sports & Outdoors",
  ];

  const [openFilter, setOpenFilter] = useState(false);

  const category = useProductStore((state) => state.category);
  const setCategory = useProductStore((state) => state.setCategory);

  const handleFilterSelect = (filter) => {
    setCategory(filter);
  };

  const handleClearFilters = () => {
    setCategory("All Categories");
    setOpenFilter(false);
  };

  return (
    <div className="shadow-lg bg-white flex-col flex lg:gap-y-5 lg:gap-x-5 rounded-lg  mb-5">
      <div></div>
      <div
        className="flex justify-center lg:justify-start lg:mx-5 p-2 gap-2 cursor-pointer lg:cursor-default"
        onClick={() => setOpenFilter(!openFilter)}
      >
        <FilterIcon className="w-6 text-gray-500 block lg:hidden" />
        <label className="font-bold text-lg text-gray-500">Filters</label>
      </div>

      {/* Desktop - Always visible */}
      <div className="mx-5 hidden lg:block">
        {filterOptions.map((item, index) => (
          <div key={item} className="flex gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="filter"
              value={item}
              checked={category === item}
              onChange={() => handleFilterSelect(item)}
            />
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet - Conditional visibility */}
      <AnimatePresence>
        {openFilter && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-5">
              {filterOptions.map((item, index) => (
                <div key={item} className="flex gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="filter"
                    value={item}
                    checked={category === item}
                    onChange={() => handleFilterSelect(item)}
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div
              className="border mx-5 py-2 border-gray-500/40 rounded-lg mb-5 flex justify-center transition-all duration-75 hover:border-red-600 hover:text-red-600 cursor-pointer"
              onClick={handleClearFilters}
            >
              <label className="cursor-pointer">Clear all filters</label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Clear Filters Button */}
      <motion.div
        initial={{ scale: 1 }}
        transition={{ duration: 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="border mx-5 py-2 border-gray-500/40 rounded-lg mb-5 hover:shadow-lg justify-center transition-all duration-100 hover:border-red-600 hover:text-red-600 cursor-pointer hidden lg:flex"
        onClick={handleClearFilters}
      >
        <label className="cursor-pointer">Clear all filters</label>
      </motion.div>
    </div>
  );
};

export default Filter;
