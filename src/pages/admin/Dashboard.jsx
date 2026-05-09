import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, LogOut, Mail, Phone, Tag, DollarSign, Calendar, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [responses, setResponses] = useState([]);
  const { fetchResponses, loading } = useApi();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchResponses();
    if (res.success) {
      setResponses(res.data);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200">
      {/* Top Navigation */}
      <header className="glass-panel border-x-0 border-t-0 rounded-none sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="font-semibold text-lg tracking-wide text-white">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Incoming Requests</h2>
            <p className="text-slate-400 text-sm">Review and manage client intake submissions.</p>
          </div>
          <div className="text-sm font-medium bg-purple-500/10 text-purple-300 px-4 py-1.5 rounded-full border border-purple-500/20">
            Total: {responses.length}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : responses.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center border-dashed border-slate-700">
            <FileText className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-medium text-slate-300 mb-2">No submissions yet</h3>
            <p className="text-slate-500">When clients submit the intake form, they will appear here.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {responses.map((res) => (
              <motion.div 
                key={res.id} 
                variants={cardVariants}
                className="glass-panel rounded-xl overflow-hidden flex flex-col hover:border-purple-500/30 transition-colors group"
              >
                {/* Card Header */}
                <div className="bg-slate-800/50 p-5 border-b border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-white truncate pr-4">{res.fullName}</h3>
                    <span className="text-xs font-medium bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {new Date(res.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> <span className="truncate max-w-[120px]">{res.email}</span>
                    </div>
                    {res.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> <span>{res.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/20">
                      <Tag className="w-3.5 h-3.5" /> {res.serviceType}
                    </div>
                    {res.budget && (
                      <div className="flex items-center gap-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <DollarSign className="w-3.5 h-3.5" /> {res.budget}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Description</h4>
                    <p className="text-sm text-slate-300 line-clamp-4 group-hover:line-clamp-none transition-all duration-300 leading-relaxed">
                      {res.projectDescription || res.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
