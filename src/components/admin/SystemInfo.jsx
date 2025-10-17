import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Settings, 
  Database, 
  FileText, 
  Activity, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Info,
  Server,
  Cpu,
  HardDrive
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import apiClient from '../../lib/api';

const SystemInfo = ({ systemStats }) => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (systemStats) {
      loadHealthData();
    }
  }, [systemStats]);

  const loadHealthData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getVectorStoresHealth();
      setHealthData(data);
    } catch (err) {
      console.error('Failed to load health data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  if (!systemStats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No system information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">System Overview</CardTitle>
              <CardDescription className="text-gray-400">
                General system information and statistics
              </CardDescription>
            </div>
            <Button 
              onClick={loadHealthData}
              disabled={loading}
              variant="outline"
              className="border-transparent text-gray-300 hover:text-white hover:bg-white/10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Server className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.system?.api_version || 'N/A'}
              </div>
              <div className="text-sm text-gray-400">API Version</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Database className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.statistics?.total_stores || 0}
              </div>
              <div className="text-sm text-gray-400">Total Stores</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.statistics?.active_stores || 0}
              </div>
              <div className="text-sm text-gray-400">Active Stores</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.statistics?.total_documents || 0}
              </div>
              <div className="text-sm text-gray-400">Total Documents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Status */}
      {healthData && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
            <CardDescription className="text-gray-400">
              Current health status of all system components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getHealthIcon(healthData.status)}
                  <div>
                    <div className="text-white font-medium">Overall Status</div>
                    <div className="text-sm text-gray-400">System health status</div>
                  </div>
                </div>
                <Badge className='bg-white/10 text-white border-white/10'>
                  {healthData.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">
                    {healthData.healthy_stores}
                  </div>
                  <div className="text-sm text-gray-400">Healthy Stores</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">
                    {healthData.total_stores}
                  </div>
                  <div className="text-sm text-gray-400">Total Stores</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">
                    {new Date(healthData.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-sm text-gray-400">Last Updated</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Store Types */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Available Store Types</CardTitle>
          <CardDescription className="text-gray-400">
            Vector store types supported by the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {systemStats.system?.available_store_types?.map((storeType) => (
              <Badge key={storeType} className="bg-white/10 text-white border-white/10">
                {storeType}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Store Information */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Store Details</CardTitle>
          <CardDescription className="text-gray-400">
            Detailed information about each vector store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(systemStats.stores || {}).map(([storeType, storeInfo]) => (
              <Collapsible key={storeType}>
                <CollapsibleTrigger
                  onClick={() => toggleSection(storeType)}
                  className="flex items-center justify-between w-full p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-gray-300" />
                    <div className="text-left">
                      <div className="text-white font-medium capitalize">{storeType}</div>
                      <div className="text-sm text-gray-400">
                        {storeInfo.document_count || 0} documents
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(storeInfo.exists, storeInfo.data_source_exists)}
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="p-4 bg-white/10 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{storeInfo.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exists:</span>
                      <span className="text-white">{storeInfo.exists ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Source Exists:</span>
                      <span className="text-white">{storeInfo.data_source_exists ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Document Count:</span>
                      <span className="text-white">{storeInfo.document_count || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Persist Directory:</span>
                      <span className="text-white text-xs font-mono">{storeInfo.persist_dir}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Source:</span>
                      <span className="text-white text-xs font-mono">{storeInfo.data_source}</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Timestamp */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">System Information</CardTitle>
          <CardDescription className="text-gray-400">
            Additional system metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated:</span>
              <span className="text-white">
                {new Date(systemStats.system?.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">System Status:</span>
              <Badge className="bg-[#60a5fa]/20 text-[#60a5fa] border-[#60a5fa]/30">
                Operational
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemInfo;
