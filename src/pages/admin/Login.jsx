import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      login('admin');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-10 rounded-2xl w-full max-w-md border-purple-500/20 shadow-purple-900/20"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
            <Shield className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-wide">Admin Portal</h2>
          <p className="text-purple-300/60 mt-2 text-center text-sm uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Admin ID</label>
            <input 
              type="text" 
              className="glass-input focus:ring-purple-500 border-slate-700/50 bg-black/40"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Security Key</label>
            <input 
              type="password" 
              className="glass-input focus:ring-purple-500 border-slate-700/50 bg-black/40"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="glass-button !bg-purple-600 hover:!bg-purple-700 w-full flex justify-center items-center gap-2 mt-4 shadow-purple-600/20">
            Authenticate <KeyRound className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
