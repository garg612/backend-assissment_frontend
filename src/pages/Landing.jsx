import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldCheck } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">
            Premium Intake System
          </h1>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            A seamless, high-converting experience for processing requests. Choose your gateway to continue.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* User Flow Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel p-8 rounded-2xl cursor-pointer group flex flex-col items-center text-center transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-500/20"
            onClick={() => navigate('/user/login')}
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
              <User className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Client Portal</h2>
            <p className="text-slate-400 font-light">Submit your project details and request our premium services.</p>
            <div className="mt-8 text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              Enter Portal <span className="text-xl">&rarr;</span>
            </div>
          </motion.div>

          {/* Admin Flow Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel p-8 rounded-2xl cursor-pointer group flex flex-col items-center text-center transition-all duration-300 hover:border-purple-400/50 hover:shadow-purple-500/20"
            onClick={() => navigate('/admin/login')}
          >
            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
              <ShieldCheck className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Admin Dashboard</h2>
            <p className="text-slate-400 font-light">Manage client submissions and review incoming project requests.</p>
            <div className="mt-8 text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              Secure Login <span className="text-xl">&rarr;</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
