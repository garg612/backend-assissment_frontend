import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Landing from './pages/Landing';
import UserLogin from './pages/user/Login';
import IntakeForm from './pages/user/IntakeForm';
import Success from './pages/user/Success';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

// Protected Route Components
const ProtectedUserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'user') return <Navigate to="/user/login" />;
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* User Routes */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route 
        path="/user/intake" 
        element={
          <ProtectedUserRoute>
            <IntakeForm />
          </ProtectedUserRoute>
        } 
      />
      <Route 
        path="/user/success" 
        element={
          <ProtectedUserRoute>
            <Success />
          </ProtectedUserRoute>
        } 
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } 
      />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
