import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Database, 
  Upload, 
  BarChart3, 
  Shield, 
  Activity,
  Users,
  FileText,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  LogOut
} from 'lucide-react';
import VectorStoresManagement from './admin/VectorStoresManagement';
import UserManagement from './admin/UserManagement';
import ExamUpload from './admin/ExamUpload';
import SystemInfo from './admin/SystemInfo';
import HealthMonitor from './admin/HealthMonitor';
import apiClient from '../lib/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [systemStats, setSystemStats] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [systemInfo, healthData] = await Promise.all([
        apiClient.getSystemInfo(),
        apiClient.getVectorStoresHealth()
      ]);
      
      setSystemStats(systemInfo);
      setHealthStatus(healthData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadDashboardData();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const getHealthIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-[#60a5fa]" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-[#60a5fa]/20 text-[#60a5fa] border-[#60a5fa]/30';
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-950 border-r border-gray-800 px-4 py-6 flex flex-col">
        <div className="flex items-center space-x-3 px-2">
          <Shield className="h-6 w-6 text-white" />
          <span className="text-white font-semibold">Admin</span>
        </div>
        <div className="mt-6 space-y-2 flex-1 overflow-y-auto">
          <Button
            onClick={() => setActiveSection('overview')}
            variant="outline"
            className={activeSection === 'overview' 
              ? 'w-full justify-start bg-white/10 text-white border-transparent hover:bg-white/15 transition-colors rounded-md ring-1 ring-white/20'
              : 'w-full justify-start bg-transparent text-gray-300 border-transparent hover:bg-white/10 hover:text-white transition-colors rounded-md hover:ring-1 hover:ring-white/10'}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            onClick={() => setActiveSection('vector-stores')}
            variant="outline"
            className={activeSection === 'vector-stores' 
              ? 'w-full justify-start bg-white/10 text-white border-transparent hover:bg-white/15 transition-colors rounded-md ring-1 ring-white/20'
              : 'w-full justify-start bg-transparent text-gray-300 border-transparent hover:bg-white/10 hover:text-white transition-colors rounded-md hover:ring-1 hover:ring-white/10'}
          >
            <Database className="h-4 w-4 mr-2" />
            Vector Stores
          </Button>
          <Button
            onClick={() => setActiveSection('users')}
            variant="outline"
            className={activeSection === 'users' 
              ? 'w-full justify-start bg-white/10 text-white border-transparent hover:bg-white/15 transition-colors rounded-md ring-1 ring-white/20'
              : 'w-full justify-start bg-transparent text-gray-300 border-transparent hover:bg-white/10 hover:text-white transition-colors rounded-md hover:ring-1 hover:ring-white/10'}
          >
            <Users className="h-4 w-4 mr-2" />
            Users
          </Button>
          <Button
            onClick={() => setActiveSection('exams')}
            variant="outline"
            className={activeSection === 'exams' 
              ? 'w-full justify-start bg-white/10 text-white border-transparent hover:bg-white/15 transition-colors rounded-md ring-1 ring-white/20'
              : 'w-full justify-start bg-transparent text-gray-300 border-transparent hover:bg-white/10 hover:text-white transition-colors rounded-md hover:ring-1 hover:ring-white/10'}
          >
            <Upload className="h-4 w-4 mr-2" />
            Exam Upload
          </Button>
          <Button
            onClick={() => setActiveSection('health')}
            variant="outline"
            className={activeSection === 'health' 
              ? 'w-full justify-start bg-white/10 text-white border-transparent hover:bg-white/15 transition-colors rounded-md ring-1 ring-white/20'
              : 'w-full justify-start bg-transparent text-gray-300 border-transparent hover:bg-white/10 hover:text-white transition-colors rounded-md hover:ring-1 hover:ring-white/10'}
          >
            <Activity className="h-4 w-4 mr-2" />
            Health Monitor
          </Button>
          <Button
            onClick={() => setActiveSection('system')}
            variant="outline"
            className={activeSection === 'system' 
              ? 'w-full justify-start bg-white/10 text-white border-transparent hover:bg-white/15 transition-colors rounded-md ring-1 ring-white/20'
              : 'w-full justify-start bg-transparent text-gray-300 border-transparent hover:bg-white/10 hover:text-white transition-colors rounded-md hover:ring-1 hover:ring-white/10'}
          >
            <Settings className="h-4 w-4 mr-2" />
            System Info
          </Button>
        </div>
        <div className="mt-6 border-t border-gray-800 pt-4">
          <div className="flex items-center gap-3 p-3 bg-[#0F0F0F] rounded-lg border border-gray-800">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.username || 'Admin'}</p>
              {user?.email ? (
                <p className="text-gray-400 text-xs truncate">{user.email}</p>
              ) : null}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64">
        <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={refreshData}
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {error && (
            <Card className="mb-6 border-gray-700 bg-gray-900">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-white">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error: {error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <main className="space-y-6">
            {activeSection === 'overview' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">System Status</span>
                        <Activity className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        {healthStatus && getHealthIcon(healthStatus.status)}
                        <Badge className={getHealthColor(healthStatus?.status || 'unknown')}>
                          {healthStatus?.status || 'Unknown'}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {healthStatus?.healthy_stores || 0}/{healthStatus?.total_stores || 0} healthy
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Total Documents</span>
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-white">
                        {systemStats?.statistics?.total_documents || 0}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        Across {systemStats?.statistics?.total_stores || 0} stores
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Active Stores</span>
                        <Database className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-white">
                        {systemStats?.statistics?.active_stores || 0}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">Available</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">API Version</span>
                        <Settings className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-white">
                        {systemStats?.system?.api_version || 'N/A'}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-base">Quick Actions</CardTitle>
                    <CardDescription className="text-gray-400">Common tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button onClick={() => setActiveSection('vector-stores')} className="justify-start bg-gray-800 hover:bg-gray-700">
                      <Database className="h-4 w-4 mr-2" /> Manage Vector Stores
                    </Button>
                    <Button onClick={() => setActiveSection('exams')} className="justify-start bg-gray-800 hover:bg-gray-700">
                      <Upload className="h-4 w-4 mr-2" /> Upload Exam Files
                    </Button>
                    <Button onClick={() => setActiveSection('health')} className="justify-start bg-gray-800 hover:bg-gray-700">
                      <Activity className="h-4 w-4 mr-2" /> Check System Health
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSection === 'vector-stores' && (
              <VectorStoresManagement />
            )}

            {activeSection === 'users' && (
              <UserManagement />
            )}

            {activeSection === 'exams' && (
              <ExamUpload />
            )}

            {activeSection === 'health' && (
              <HealthMonitor />
            )}

            {activeSection === 'system' && (
              <SystemInfo systemStats={systemStats} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
