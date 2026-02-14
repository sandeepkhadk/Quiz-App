import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" 
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl text-center">
        {/* Animated Title */}
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          <span className="text-slate-800">Welcome to </span>
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
              QUIZ MANIA
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-2 left-0 h-2 bg-indigo-600 rounded-full"
            />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl text-slate-600 mb-12 font-medium max-w-2xl mx-auto"
        >
          The ultimate platform to challenge your knowledge, compete with friends, Are you ready to dive in?
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <Link to="/login">
            <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center gap-2 text-lg">
              Start Playing
              <span>🎮</span>
            </button>
          </Link>

          <Link to="/register">
            <button className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 text-lg">
              Create Account
              <span>🚀</span>
            </button>
          </Link>
        </motion.div>

        {/* Footer Shortcut for Admin */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 text-slate-400 text-sm font-medium"
        >
          Are you a quiz creator? 
          <Link to="/login" className="text-indigo-600 hover:underline ml-1">Admin Login</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;