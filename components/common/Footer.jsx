"use client"

import React from 'react'
import { motion } from 'framer-motion'
import img from '@/public/assets/logo/logo.svg'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: 180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: 32,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      className='bg-emerald-900 text-white py-12 px-4 md:px-6 lg:px-8'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
          
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className='col-span-1 md:col-span-2 lg:col-span-1'
          >
            <motion.div
              className='flex items-center mb-6'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className='w-12 h-12  rounded-xl flex items-center justify-center mr-1'
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image src={img} alt='logo' className='w-8' />
              </motion.div>
              <h2 className='text-2xl font-bold'>SocietyHub</h2>
            </motion.div>
            
            <motion.p
              variants={linkVariants}
              className='text-emerald-100 leading-relaxed mb-6 text-sm md:text-base'
            >
              Your premium e-commerce destination for quality products and exceptional service. Discover amazing deals and shop with confidence.
            </motion.p>
            
            {/* Social Icons */}
            <motion.div
              className='flex space-x-4'
              variants={containerVariants}
            >
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Mail, label: 'Email' }
              ].map((social, index) => (
                <motion.div
                  key={social.label}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: [0, -10, 10, 0],
                    backgroundColor: '#10b981'
                  }}
                  whileTap={{ scale: 0.9 }}
                  className='w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-emerald-400 transition-colors duration-200'
                >
                  <social.icon size={18} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className='col-span-1'>
            <motion.h3
              className='text-lg font-semibold mb-6 relative'
            >
              Quick Links
              <motion.div
                className='absolute bottom-0 left-0 h-0.5 bg-emerald-300'
                variants={underlineVariants}
              />
            </motion.h3>
            <motion.ul 
              className='space-y-3'
              variants={containerVariants}
            >
              {['Products', 'Categories', 'About Us', 'Contact'].map((link, index) => (
                <motion.li
                  key={link}
                  variants={linkVariants}
                  whileHover={{ 
                    x: 10,
                    color: '#ffffff',
                    transition: { duration: 0.2 }
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-emerald-100 hover:text-white transition-colors duration-200 text-sm md:text-base'>
                    {link}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants} className='col-span-1'>
            <motion.h3
              className='text-lg font-semibold mb-6 relative'
            >
              Customer Service
              <motion.div
                className='absolute bottom-0 left-0 h-0.5 bg-emerald-300'
                variants={underlineVariants}
                transition={{ delay: 0.8 }}
              />
            </motion.h3>
            <motion.ul 
              className='space-y-3'
              variants={containerVariants}
            >
              {['Help Center', 'Returns', 'Shipping Info', 'Track Order'].map((service, index) => (
                <motion.li
                  key={service}
                  variants={linkVariants}
                  whileHover={{ 
                    x: 10,
                    color: '#ffffff',
                    transition: { duration: 0.2 }
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-emerald-100 hover:text-white transition-colors duration-200 text-sm md:text-base'>
                    {service}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>
      </div>
    </motion.footer>
  )
}

export default Footer