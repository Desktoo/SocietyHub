"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import abstractImg from '@/public/assets/images/loginAbstract.jpg'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import toast from 'react-hot-toast'

const InputField = ({ placeholder, type = 'text', name, value, onChange }) => (
  <div className='relative'>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='w-full px-4 py-3 border-2 border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-emerald-50/30 transition-colors duration-200'
    />
  </div>
)

const LoginPage = () => {

  const[formData, setFormData] = useState({email: '', password: ''})
  const router = useRouter()
  const{ login, isLoggedIn } = useAuthStore()
  
  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  
    useEffect(()=>{
      if(isLoggedIn){
        router.push('/products')
      }
    },[isLoggedIn])

  const handleLogin = async () => {
    if(!formData.email || !formData.password){
      toast.error("Please enter all Fields")
      return
    }
    login(formData)
  }

  // Animation 
  const animations = {
      containerVariants: {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: 'easeOut',
              staggerChildren: 0.1
            }
          }
      },
      itemVariants: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      },
      formVariants: {
        hidden: { opacity: 0, x: 20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay: 0.3,
            staggerChildren: 0.1
          }
        }
      }
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center px-5 py-10 '>
      <motion.div
        variants={animations.containerVariants}
        initial="hidden"
        animate="visible"
        className='w-full max-w-6xl'
      >
        {/* Header */}
        <motion.div
          variants={animations.itemVariants}
          className='text-center mb-10'
        >
          <motion.h1
            className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Continue your journey with{' '}
            <motion.span
              className='text-emerald-600'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              SocietyHub
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={animations.itemVariants}
          className='max-w-5xl mx-auto md:flex-row-reverse md:flex md:rounded-3xl rounded-xl bg-white shadow-2xl border border-emerald-100 overflow-hidden'
        >
        {/* Image Section */}
          <motion.div
            className='md:w-1/2  p-6 md:p-8 flex items-center justify-center bg-emerald-500/40'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
              className='relative max-w-sm'
            >
              <Image
                src={abstractImg}
                alt='abstract'
                className='rounded-xl shadow-lg w-full h-auto'
                priority
              />
              <motion.div
                className='absolute inset-0 rounded-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </motion.div>
          </motion.div>

        {/* Form Section */}
          <motion.form
            variants={animations.formVariants}
            initial="hidden"
            animate="visible"
            className='md:w-1/2  flex flex-col justify-center p-6 md:p-8 lg:p-12 space-y-6'
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div
              variants={animations.itemVariants}
              className='text-center mb-4'
            >
              <h2 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h2>
              <p className='text-gray-500 text-sm lg:text-base'>Enter your credentials to access your account</p>
            </motion.div>

            <motion.div variants={animations.itemVariants} className='space-y-4'>
              <InputField placeholder='Email' type='email' name='email' value={formData.email} onChange={handleChange} />
              <InputField placeholder='Password' type='password' name='password' value={formData.password} onChange={handleChange} />
            </motion.div>

            <motion.div
              variants={animations.itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='pt-2'
              onClick={handleLogin}
            >
              <motion.button
                type='button'
                className='w-full bg-emerald-600  text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg'
                whileHover={{
                  backgroundImage: 'linear-gradient(to right, #047857, #065f46)'
                }}
                transition={{ duration: 0.2 }}
              >
                Login
              </motion.button>
            </motion.div>

            <motion.div
              variants={animations.itemVariants}
              className='text-center pt-2'
            >
              <p className='text-gray-500 text-sm lg:text-base'>
                Don't have an account?{' '}
                <Link href='/signup'>
                  <motion.span
                    className='text-emerald-600 font-semibold hover:text-emerald-700 cursor-pointer transition-colors duration-200'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Sign Up
                  </motion.span>
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage