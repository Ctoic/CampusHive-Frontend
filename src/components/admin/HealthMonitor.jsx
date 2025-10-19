import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  Loader2,
  Database,
  Server,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import apiClient from '../../lib/api';

const HealthMonitor = () => {
  const [healthData, setHealthData] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    loadHealthData();
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(loadHealthData, 30000); // Refresh every 30 seconds
      setRefreshInterval(interval);
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }
  }, [autoRefresh]);

  const loadHealthData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [vectorHealth, systemHealthData] = await Promise.all([
        apiClient.getVectorStoresHealth(),
        apiClient.getHealthCheck()
      ]);
      
      setHealthData(vectorHealth);
      setSystemHealth(systemHealthData);
    } catch (err) {
      console.error('Failed to load health data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-gray-300" />;
      case 'degraded':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-white/10 text-white border-white/10';
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getHealthTrend = (healthyStores, totalStores) => {
    const percentage = (healthyStores / totalStores) * 100;
    if (percentage >= 90) {
      return <TrendingUp className="h-4 w-4 text-gray-300" />;
    } else if (percentage >= 70) {
      return <Minus className="h-4 w-4 text-yellow-500" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getStoreHealthIcon = (exists, dataSourceExists) => {
    if (exists && dataSourceExists) {
      return <CheckCircle className="h-4 w-4 text-gray-300" />;
    } else if (exists || dataSourceExists) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  if (loading && !healthData) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading health data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Card className="bg-black border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Health Monitor</h2>
          <p className="text-gray-400">Real-time system health monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant="outline"
            className={"bg-[#60a5fa] text-black hover:bg-[#93c5fd] border-transparent"}
          >
            <Heart className="h-4 w-4 mr-2" />
            {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
          </Button>
          <Button 
            onClick={loadHealthData}
            disabled={loading}
            variant="outline"
            className="bg-[#60a5fa] text-black hover:bg-[#93c5fd] border-transparent"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Overall Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Health</span>
            </CardTitle>
            <CardDescription className="text-white">
              Overall system status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {systemHealth && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Service Status</span>
                  <Badge className={getHealthColor('healthy')}>
                    {systemHealth.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Service</span>
                  <span className="text-white">{systemHealth.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Check</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(systemHealth.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-black border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Vector Stores Health</span>
            </CardTitle>
            <CardDescription className="text-white">
              Vector stores status overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            {healthData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Overall Status</span>
                  <div className="flex items-center space-x-2">
                    {getHealthIcon(healthData.status)}
                    <Badge className={getHealthColor(healthData.status)}>
                      {healthData.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Healthy Stores</span>
                  <div className="flex items-center space-x-2">
                    {getHealthTrend(healthData.healthy_stores, healthData.total_stores)}
                    <span className="text-white">
                      {healthData.healthy_stores}/{healthData.total_stores}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Health Percentage</span>
                  <span className="text-white">
                    {((healthData.healthy_stores / healthData.total_stores) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Health Metrics */}
      {healthData && (
        <Card className="bg-black border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Health Metrics</CardTitle>
            <CardDescription className="text-white">
              Detailed health metrics and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">
                  {healthData.healthy_stores}
                </div>
                <div className="text-sm text-gray-400">Healthy Stores</div>
                <div className="text-xs text-gray-300 mt-1">
                  {((healthData.healthy_stores / healthData.total_stores) * 100).toFixed(1)}% of total
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">
                  {healthData.total_stores - healthData.healthy_stores}
                </div>
                <div className="text-sm text-gray-400">Unhealthy Stores</div>
                <div className="text-xs text-red-400 mt-1">
                  {(((healthData.total_stores - healthData.healthy_stores) / healthData.total_stores) * 100).toFixed(1)}% of total
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">
                  {healthData.total_stores}
                </div>
                <div className="text-sm text-gray-400">Total Stores</div>
                <div className="text-xs text-gray-400 mt-1">
                  All vector stores
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Store Health */}
      {healthData && healthData.stores && (
        <Card className="bg-black border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Store Health Details</CardTitle>
            <CardDescription className="text-white">
              Individual health status for each vector store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(healthData.stores).map(([storeType, storeInfo]) => (
                <div key={storeType} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-white font-medium capitalize">{storeType}</div>
                      <div className="text-sm text-gray-400">
                        {storeInfo.document_count || 0} documents
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStoreHealthIcon(storeInfo.exists, storeInfo.data_source_exists)}
                    <Badge className='bg-white/10 text-white border-white/10'>
                      {(storeInfo.exists && storeInfo.data_source_exists) ? 'Healthy' : (storeInfo.exists || storeInfo.data_source_exists) ? 'Partial' : 'Missing'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      {healthData && (
        <Card className="bg-black border-white/10">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-white">
              Last updated: {new Date(healthData.timestamp).toLocaleString()}
              {autoRefresh && (
                <span className="ml-2 text-white">• Auto-refresh enabled (30s)</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthMonitor;
