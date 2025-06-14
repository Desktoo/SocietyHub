"use client"

import WishlistCardList from '@/components/wishlist/WishlistCardList'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { useProductStore } from '@/store/useProductStore'

const WishlistPage = () => {

    const { wishlistCount } = useProductStore()

  return (
    <div className='min-h-screen p-6 md:p-10 bg-gray-50'>
        <motion.div 
            className='max-w-7xl mx-auto space-y-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div 
                className='flex justify-between items-start md:items-center md:flex-row flex-col gap-6'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
                <div className='flex-col flex space-y-2'>
                    <h1 className='text-3xl  font-bold text-gray-900 leading-tight'>
                        My Wishlist
                    </h1>
                    <p className='text-lg md:text-xl text-gray-600'>
                        {wishlistCount} items saved
                    </p>
                </div>
                
                <motion.div 
                    className='flex md:flex-row flex-col gap-3 w-full md:w-auto'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    <motion.button 
                        className='bg-emerald-700 hover:bg-emerald-600 px-6 py-3 flex items-center justify-center gap-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ShoppingBag className='text-white w-4' /> 
                        <span className='text-white text-md font-bold '>Add All to Cart</span>
                    </motion.button>
                    
                    <motion.button 
                        className='border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 rounded-lg px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className='text-gray-700 text-md font-medium'>Continue Shopping</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
                <WishlistCardList />
            </motion.div>
        </motion.div>
    </div>
  )
}

export default WishlistPage