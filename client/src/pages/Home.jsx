import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col gap-4 items-center justify-center px-4"
      >
        <h1 className="text-3xl md:text-7xl font-bold text-center mt-28">
          Welcome to Linkink
        </h1>
        <div className="font-extralight text-base md:text-4xl py-4">
          Redefining Fashion with Technology
        </div>
        <button className="bg-black rounded-full text-white px-4 py-2">
          Shop Now
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
