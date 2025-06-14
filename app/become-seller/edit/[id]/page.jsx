"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSellStore } from '@/store/useSellerStore'
import UploadZone from '@/components/common/UploadZone'

const EditProduct = () => {
  const router = useRouter()
  const { id } = useParams()
  const { productList, updateProduct } = useSellStore()

  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    sellersInfo: '',
    imageUrl: '',
  })

  // Load product data by ID
  useEffect(() => {
    const product = productList.find(p => p._id === id)
    if (product) {
      setFormData({
        productName: product.productName || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        sellersInfo: product.sellersInfo || '',
        imageUrl: product.imageUrl || '',
      })
    } else {
      toast.error("Product not found")
      router.push('/become-seller')
    }
  }, [id, productList, router])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    const success = await updateProduct(id, formData)

    if (success) {
      toast.success("Product updated successfully!")
      router.push('/become-seller')
    } else {
      toast.error("Failed to update product")
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6 md:p-10'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div 
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
            Edit Product
          </h1>
          <p className='text-lg md:text-xl text-gray-600'>
            Update your product details below
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className='bg-white rounded-lg shadow-lg p-6 md:p-8'
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3'>
                Product Details
              </h2>

              {/* Product Name */}
              <div className='space-y-2 mb-6'>
                <label className='block text-sm font-semibold text-gray-700'>
                  Product Name <span className='text-red-500'>*</span>
                </label>
                <input 
                  type='text'
                  name='productName'
                  value={formData.productName}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'
                  placeholder='Enter product name'
                />
              </div>

              {/* Description */}
              <div className='space-y-2 mb-6'>
                <label className='block text-sm font-semibold text-gray-700'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <textarea 
                  name='description'
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none'
                  placeholder='Describe your product in detail'
                />
              </div>

              {/* Price and Category */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Price ($) <span className='text-red-500'>*</span>
                  </label>
                  <input 
                    type='number'
                    step='0.01'
                    name='price'
                    value={formData.price}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'
                    placeholder='0.00'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Category <span className='text-red-500'>*</span>
                  </label>
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white'
                  >
                    <option value=''>Select a category</option>
                    <option value='electronics'>Electronics</option>
                    <option value='clothing'>Clothing</option>
                    <option value='books'>Books</option>
                    <option value='furniture'>Furniture</option>
                    <option value='Home & Garden'>Home & Garden</option>
                    <option value='sports & Outdoors'>Sports & Outdoors</option>
                  </select>
                </div>
              </div>

              {/* Seller Info */}
              <div className='space-y-2 mb-6'>
                <label className='block text-sm font-semibold text-gray-700'>
                  Seller's Info <span className='text-red-500'>*</span>
                </label>
                <input 
                  type='text'
                  name='sellersInfo'
                  value={formData.sellersInfo}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'
                  placeholder='Enter information'
                />
              </div>

              {/* Upload Image */}
              <UploadZone 
                imageUrl={formData.imageUrl}
                onUploadStart={setIsUploading}
                onUploadComplete={(url) => {
                  setFormData(prev => ({ ...prev, imageUrl: url }))
                }}
              />
            </div>

            {/* Buttons */}
            <div className='flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-200'>
              <motion.button
                type='button'
                className='flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 transition-all hover:bg-gray-50'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/become-seller')}
              >
                Cancel
              </motion.button>
              <motion.button
                type='submit'
                className='flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
              >
                <Package className='w-5 h-5' />
                Update Product
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default EditProduct
