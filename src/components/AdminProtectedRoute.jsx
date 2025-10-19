import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, AlertCircle } from 'lucide-react';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/10">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-800 border-gray-600">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-white mx-auto mb-4" />
            <CardTitle className="text-2xl text-white">Access Denied</CardTitle>
            <CardDescription className="text-gray-400">
              You need administrator privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              Current role: <span className="font-medium text-white">{user?.role || 'Unknown'}</span>
            </p>
            <Navigate to="/" replace />
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;
