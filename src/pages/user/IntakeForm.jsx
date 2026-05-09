import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { FileText, Send, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function IntakeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { submitIntake, fetchMyResponse, loading, error } = useApi();
  const [checkingPastResponse, setCheckingPastResponse] = React.useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onSubmit = async (data) => {
    const response = await submitIntake(data);
    if (response.success) {
      navigate('/user/success', { state: response.data });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  React.useEffect(() => {
    const checkResponse = async () => {
      const res = await fetchMyResponse();
      if (res.success && res.data && res.data.length > 0) {
        navigate('/user/success', { state: res.data[0] });
      } else {
        setCheckingPastResponse(false);
      }
    };
    checkResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkingPastResponse) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0b1120]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative pt-20 pb-20">

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Project Intake</h1>
          <p className="text-slate-400 text-lg">Tell us about your project requirements and we will get back to you shortly.</p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className={`glass-input ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="John Doe"
                  {...register("fullName", { required: "Full Name is required" })}
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className={`glass-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="john@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="glass-input"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Service Type</label>
                <select 
                  className={`glass-input appearance-none ${errors.serviceType ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...register("serviceType", { required: "Please select a service" })}
                >
                  <option value="" disabled className="text-slate-800">Select a service...</option>
                  <option value="Web Development" className="text-slate-800">Web Development</option>
                  <option value="UI/UX Design" className="text-slate-800">UI/UX Design</option>
                  <option value="Mobile App" className="text-slate-800">Mobile App Development</option>
                  <option value="Consulting" className="text-slate-800">Technical Consulting</option>
                </select>
                {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Estimated Budget (USD)</label>
              <input 
                type="text"
                className="glass-input"
                placeholder="e.g. $10,000"
                {...register("budget")}
              />
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project Description</label>
              <textarea 
                rows="4"
                className={`glass-input resize-none ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Briefly describe your project goals, features, and timeline..."
                {...register("description", { 
                  required: "Description is required",
                  minLength: { value: 20, message: "Please provide more details (min 20 characters)" }
                })}
              ></textarea>
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="glass-button w-full flex justify-center items-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  <>Submit Request <Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
