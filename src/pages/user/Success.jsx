import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Mail, Phone, Tag, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const responseData = location.state;

  const handleReturnHome = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="glass-panel p-10 md:p-12 rounded-3xl w-full max-w-2xl text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-3">Response Submitted!</h1>
        <p className="text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto">
          Thank you for reaching out. Your project details have been successfully received. Our team will review your requirements and get back to you within 24 hours.
        </p>

        {responseData && (
          <div className="bg-slate-900/50 rounded-2xl p-6 text-left border border-slate-700/50 mb-10">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700/50 pb-2">Your Submission Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Name</span>
                <p className="text-slate-200 font-medium">{responseData.fullName}</p>
              </div>
              
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email</span>
                <div className="flex items-center gap-1.5 text-slate-200">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {responseData.email}
                </div>
              </div>

              {responseData.phone && (
                <div>
                  <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Phone</span>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {responseData.phone}
                  </div>
                </div>
              )}

              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Service & Budget</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  <div className="flex items-center gap-1.5 text-xs font-medium bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
                    <Tag className="w-3 h-3" /> {responseData.serviceType}
                  </div>
                  {responseData.budget && (
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                      <DollarSign className="w-3 h-3" /> {responseData.budget}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Project Description</span>
              <p className="text-slate-300 text-sm bg-black/20 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                {responseData.description}
              </p>
            </div>
          </div>
        )}
        
        <button 
          onClick={handleReturnHome}
          className="glass-button w-full sm:w-auto mx-auto flex justify-center items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Home
        </button>
      </motion.div>
    </div>
  );
}
