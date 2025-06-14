"use client"

import React, { useState } from 'react'
import tshirt from '@/public/assets/images/tshirt.png'
import imgNotFound from '@/public/assets/images/notFound.png'
import Image from 'next/image'
import { ShoppingBag, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProductStore } from '@/store/useProductStore'

const WishlistCard = ({ product }) => {
    const { removeFromWishlist } = useProductStore()

    const handleRemove = () => {
        removeFromWishlist(product.id)
    }

    return (
        <motion.div 
            className='relative md:w-3xs w-auto bg-neutral-400/20 shadow-lg rounded-lg'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <motion.button
                className='absolute top-2 right-2 z-10 bg-gray-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemove}
            >
                <Minus className='w-4 h-4' />
            </motion.button>

            <div className='relative object-contain w-full h-56 flex'>
                <Image 
                    src={product.image && product.image.trim() ? product.image : imgNotFound} 
                    alt={product.name || 'Product Image'} 
                    fill
                    className='object-cover'
                />
            </div>
            <div className='p-5 bg-white w-full rounded-b-lg flex flex-col '>
                <div className='flex w-full justify-between'>
                    <label className="text-left font-bold text-xl md:text-xl text-gray-800">
                        {product.name || 'Product Name'}
                    </label>
                </div>
                <div className='text-gray-600 text-sm mb-2 truncate w-full'>
                    <p>{product.description || 'No description available'}</p>
                </div>
                <div className='text-2xl md:text-3xl font-bold text-gray-900'>
                    <h1>${product.price || '0.00'}</h1>
                </div>
                <div className='text-sm text-gray-600 space-y-1 mb-5 truncate'>
                    <p>Category : {product.category || 'N/A'}</p>
                    <p>Seller : {product.seller || 'N/A'}</p>
                </div>
                <div className='flex gap-2'>
                    <motion.div 
                        className='w-full bg-emerald-700 text-white py-3 px-1 gap-2 rounded-xl font-semibold flex justify-center shadow-lg hover:shadow-xl'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingBag className='w-4' />
                        <button className='text-sm md:text-base'>Add to cart</button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default WishlistCard