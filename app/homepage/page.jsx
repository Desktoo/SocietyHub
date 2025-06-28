"use client";

import { motion } from "framer-motion";
import { ClockFading, MoveRight, ShoppingBag, Star, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import seller from "@/public/assets/images/seller.png";
import buyer from "@/public/assets/images/buyerCart.png";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Visuals
const visuals = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { ease: "easeOut", duration: 0.6 },
  },

  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },

  floatingAnimation: {
    animate: { y: [0, -20, 0] },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },

  cardVariants: {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },

  descriptionVariants: {
    initial: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },

  bubbles: [
    {
      top: "10rem",
      left: "2.5rem",
      size: "w-20 h-20",
      color: "bg-teal-500/20",
    },
    {
      top: "2.5rem",
      left: "2.5rem",
      size: "w-20 h-20",
      color: "bg-teal-500/20",
    },
    {
      top: "20rem",
      right: "5rem",
      size: "w-32 h-32",
      color: "bg-emerald-500/20",
    },
    {
      top: "40rem",
      left: "2.5rem",
      size: "w-20 h-20",
      color: "bg-emerald-500/20",
    },
    {
      top: "7.5rem",
      right: "20rem",
      size: "w-40 h-40",
      color: "bg-emerald-500/20",
    },
  ],

  statsData: [
    {
      id: 1,
      icon: <User />,
      value: "50K+",
      title: "Users",
      description: "Active members in your society",
    },
    {
      id: 2,
      icon: <ShoppingBag />,
      value: "10K+",
      title: "Listed Items",
      description: "Items for sale or rent in the community",
    },
    {
      id: 3,
      icon: <Star />,
      value: "4.9",
      title: "User Rating",
      description: "Average satisfaction across listings",
    },
    {
      id: 4,
      icon: <ClockFading />,
      value: "24h",
      title: "Quick Deals",
      description: "Average response time for inquiries",
    },
  ],
};

const HomePage = () => {
  const { isLoggedIn } = useAuthStore();

  const router = useRouter();

  const handleSell = () => {
    if (isLoggedIn) {
      router.push("/become-seller");
    } else {
      toast.error("Please login to Sell Products");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col  relative overflow-hidden">
      {/* Animated Bubbles */}
      {visuals.bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute hidden md:block ${bubble.size} ${bubble.color} rounded-full`}
          style={{
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
          }}
          {...visuals.floatingAnimation}
        />
      ))}

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center">
        <div className="text-center mx-5 mt-16 md:mt-20">
          <motion.div
            className="flex flex-col text-emerald-700 items-center mb-6"
            {...visuals.fadeInUp}
          >
            <span className="text-2xl md:text-4xl font-bold mb-2">
              Welcome to
            </span>
            <span className="text-5xl md:text-8xl lg:text-9xl font-black leading-tight">
              SocietyHub
            </span>
          </motion.div>

          <motion.p
            className="max-w-2xl mx-auto text-lg text-neutral-400 font-medium mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.6, delay: 0.3 }}
          >
            Discover amazing products at unbeatable prices. Your one-stop for
            everything you need
          </motion.p>

          <Link href="/products">
            <motion.button
              className="inline-flex items-center gap-2 text-white text-lg font-semibold rounded-lg px-8 py-3 bg-emerald-700 hover:bg-emerald-800 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
              <MoveRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center mt-16 px-4"
          variants={visuals.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {visuals.statsData.map((item) => (
            <motion.div
              key={item.id}
              className="text-center"
              variants={visuals.fadeInUp}
            >
              <div className="w-20 h-20 bg-neutral-200 flex items-center justify-center rounded-lg mb-3 mx-auto">
                {React.cloneElement(item.icon, {
                  className: "w-8 h-8 text-neutral-800",
                })}
              </div>
              <div className="text-2xl font-black text-neutral-700 mb-1">
                {item.value}
              </div>
              <div className="text-neutral-500 font-medium">{item.title}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* User Selection section*/}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Seller Card */}
          <motion.div
            className="bg-neutral-200 hover:border-2 hover:border-neutral-500 p-4 h-auto flex flex-col items-center rounded-xl cursor-pointer overflow-hidden"
            variants={visuals.cardVariants}
            initial="initial"
            whileHover="hover"
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={handleSell}
          >
            <div className="p-6 mb-4">
              <Image
                src={seller}
                className="w-24 h-24 object-contain"
                alt="seller"
              />
            </div>
            <p className="text-2xl font-semibold text-center mb-4">
              Sell your Products
            </p>

            <motion.div
              className="text-center px-4"
              variants={visuals.descriptionVariants}
            >
              <p className="text-neutral-600 text-sm leading-relaxed">
                List your products and start earning by reaching buyers across
                the platform.
              </p>
            </motion.div>
          </motion.div>

          {/* Buyer Card */}
          <Link href="/products">
            <motion.div
              className="bg-emerald-500/20 hover:border-2 hover:border-emerald-700 p-4 flex flex-col items-center rounded-xl cursor-pointer overflow-hidden"
              variants={visuals.cardVariants}
              initial="initial"
              whileHover="hover"
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-6 mb-4">
                <Image
                  src={buyer}
                  className="w-24 h-24 object-contain"
                  alt="buyer"
                />
              </div>
              <p className="text-2xl font-semibold text-center mb-4">
                Join as Buyer
              </p>

              <motion.div
                className="text-center px-4"
                variants={visuals.descriptionVariants}
              >
                <p className="text-emerald-700 text-sm leading-relaxed">
                  Discover and purchase products from a wide range of trusted
                  sellers.
                </p>
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
