"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import axiosInstance from '@/libs/axios'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'

const page =  () => {

  const { id } = useParams()

  
  const [quantity, setQuantity] = useState(1)
  
  const[like,setLike] = useState(false)

  const [product, setProduct] = useState(null)
  
  useEffect(() => {

    const fetchProduct = async () => {  
      try {
        const res = await axiosInstance.get(`/products/${id}`)
        setProduct(res.data)
      } catch (error) {
        return toast("Couldn't find any products!")
      }
    }

    if(id) fetchProduct()
  },[id])

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  if(!product) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-full p-10 bg-gray-50 flex md:flex-row flex-col'>
        <div className='md:w-1/2 flex items-center justify-center'> 
            <Image src={product.imageUrl} className='bg-gray-400' alt='img' width={300} height={300} />
        </div>
        <motion.div 
          className='md:w-1/2 w-full md:pl-10 pt-6 md:pt-0'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.h1 
                  className='text-3xl font-bold text-gray-800 mb-4'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {product.productName}
                </motion.h1>      

                <motion.div 
                  className='mb-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className='text-4xl font-bold text-gray-900'>${product.price}</span>
                </motion.div>

                <motion.div 
                  className='mb-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>Description</h3>
                  <p className='text-gray-600'>{product.description}</p>
                </motion.div>

                <motion.div 
                  className='mb-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>Category</h3>
                  <span className='inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm'>
                    {product.category}
                  </span>
                </motion.div>

                <motion.div 
                  className='mb-8'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <h3 className='text-lg font-semibold text-gray-800 mb-3'>Quantity:</h3>
                  <div className='flex items-center gap-3'>
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className='w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors'
                    >
                      −
                    </button>
                    <span className='w-12 h-10 border border-gray-300 rounded-md flex items-center justify-center font-medium'>
                      {quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className='w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors'
                    >
                      +
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  className='flex gap-4'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <motion.button 
                    className='flex-1 bg-emerald-700 text-white py-3 px-6 rounded-md font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                     Add to Cart
                  </motion.button>
                  <motion.button 
                        className={`w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center transition-colors ${
                        like ? "bg-red-500 border-red-500" : "hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setLike(e => !e)}
                    >
                        <Heart className={like ? "text-white fill-white" : "text-gray-600"} size={20} />
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default page