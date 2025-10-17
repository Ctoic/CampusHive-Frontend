import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { 
  Database, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Info, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Settings
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import apiClient from '../../lib/api';

const VectorStoresManagement = () => {
  const [stores, setStores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStores, setSelectedStores] = useState([]);
  const [batchAction, setBatchAction] = useState('create');
  const [forceRecreate, setForceRecreate] = useState(false);
  const [operationLoading, setOperationLoading] = useState({});

  useEffect(() => {
    loadVectorStores();
  }, []);

  const loadVectorStores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getVectorStores();
      setStores(data);
    } catch (err) {
      console.error('Failed to load vector stores:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStoreOperation = async (storeType, operation) => {
    try {
      setOperationLoading(prev => ({ ...prev, [`${storeType}-${operation}`]: true }));
      
      let result;
      switch (operation) {
        case 'create':
          result = await apiClient.createVectorStore(storeType, false);
          break;
        case 'rebuild':
          result = await apiClient.rebuildVectorStore(storeType);
          break;
        case 'delete':
          result = await apiClient.deleteVectorStore(storeType);
          break;
        case 'info':
          result = await apiClient.getVectorStoreInfo(storeType);
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      
      // Reload stores after operation
      await loadVectorStores();
      return result;
    } catch (err) {
      console.error(`Failed to ${operation} store ${storeType}:`, err);
      throw err;
    } finally {
      setOperationLoading(prev => ({ ...prev, [`${storeType}-${operation}`]: false }));
    }
  };

  const handleBatchOperation = async () => {
    if (selectedStores.length === 0) {
      setError('Please select at least one store');
      return;
    }

    try {
      setOperationLoading(prev => ({ ...prev, batch: true }));
      const result = await apiClient.batchVectorStoreOperations(
        batchAction, 
        selectedStores, 
        forceRecreate
      );
      
      await loadVectorStores();
      setSelectedStores([]);
      return result;
    } catch (err) {
      console.error('Batch operation failed:', err);
      setError(err.message);
    } finally {
      setOperationLoading(prev => ({ ...prev, batch: false }));
    }
  };

  const handleRefreshData = async () => {
    try {
      setOperationLoading(prev => ({ ...prev, refresh: true }));
      const result = await apiClient.refreshVectorStores();
      await loadVectorStores();
      return result;
    } catch (err) {
      console.error('Data refresh failed:', err);
      setError(err.message);
    } finally {
      setOperationLoading(prev => ({ ...prev, refresh: false }));
    }
  };

  const toggleStoreSelection = (storeType) => {
    setSelectedStores(prev => 
      prev.includes(storeType) 
        ? prev.filter(s => s !== storeType)
        : [...prev, storeType]
    );
  };

  const getStatusIcon = (exists, dataSourceExists) => {
    if (exists && dataSourceExists) {
      return <CheckCircle className="h-5 w-5 text-white" />;
    } else if (exists || dataSourceExists) {
      return <AlertCircle className="h-5 w-5 text-gray-400" />;
    } else {
      return <XCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (exists, dataSourceExists) => {
    if (exists && dataSourceExists) {
      return <Badge className="bg-gray-700 text-white border-gray-600">Healthy</Badge>;
    } else if (exists || dataSourceExists) {
      return <Badge className="bg-gray-600 text-gray-300 border-gray-500">Partial</Badge>;
    } else {
      return <Badge className="bg-gray-800 text-gray-400 border-gray-700">Missing</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading vector stores...</span>
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

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Vector Stores Management</h2>
          <p className="text-gray-400">Manage your vector stores and data sources</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={loadVectorStores}
            variant="outline"
            className="border-transparent text-gray-300 hover:text-white hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={handleRefreshData}
            disabled={operationLoading.refresh}
            className="bg-black/30 hover:bg-black/40 text-white"
          >
            {operationLoading.refresh ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Batch Operations */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Batch Operations</CardTitle>
          <CardDescription className="text-gray-400">
            Perform operations on multiple stores at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="batch-action" className="text-white">Action</Label>
              <select
                id="batch-action"
                value={batchAction}
                onChange={(e) => setBatchAction(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-black/30 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/10"
              >
                <option value="create">Create</option>
                <option value="info">Get Info</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="force-recreate"
                checked={forceRecreate}
                onCheckedChange={setForceRecreate}
              />
              <Label htmlFor="force-recreate" className="text-gray-300">Force Recreate</Label>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.keys(stores).map(storeType => (
              <div key={storeType} className="flex items-center space-x-2">
                <Checkbox
                  id={`select-${storeType}`}
                  checked={selectedStores.includes(storeType)}
                  onCheckedChange={() => toggleStoreSelection(storeType)}
                />
                <Label htmlFor={`select-${storeType}`} className="text-gray-300">
                  {storeType}
                </Label>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleBatchOperation}
            disabled={operationLoading.batch || selectedStores.length === 0}
            className="bg-black/30 hover:bg-black/40 text-white"
          >
            {operationLoading.batch ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Settings className="h-4 w-4 mr-2" />
            )}
            Execute Batch Operation
          </Button>
        </CardContent>
      </Card>

      {/* Vector Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(stores).map(([storeType, storeInfo]) => (
          <Card key={storeType} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-white" />
                  <CardTitle className="text-white capitalize">{storeType}</CardTitle>
                </div>
                {getStatusIcon(storeInfo.exists, storeInfo.data_source_exists)}
              </div>
              <CardDescription className="text-gray-400">
                {getStatusBadge(storeInfo.exists, storeInfo.data_source_exists)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Documents:</span>
                  <span className="text-white">
                    {storeInfo.document_count || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Store Exists:</span>
                  <span className="text-white">
                    {storeInfo.exists ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Source:</span>
                  <span className="text-white">
                    {storeInfo.data_source_exists ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleStoreOperation(storeType, 'create')}
                  disabled={operationLoading[`${storeType}-create`]}
                  className="bg-black/30 hover:bg-black/40 text-white"
                >
                  {operationLoading[`${storeType}-create`] ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Plus className="h-3 w-3" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => handleStoreOperation(storeType, 'rebuild')}
                  disabled={operationLoading[`${storeType}-rebuild`]}
                  className="bg-black/30 hover:bg-black/40 text-white"
                >
                  {operationLoading[`${storeType}-rebuild`] ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3" />
                  )}
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="border-transparent text-gray-300 hover:text-white hover:bg-white/10">
                      <Info className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-600">
                    <DialogHeader>
                      <DialogTitle className="text-white">Store Information</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Detailed information about {storeType} store
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{storeInfo.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Persist Directory:</span>
                        <span className="text-white text-xs">{storeInfo.persist_dir}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Source:</span>
                        <span className="text-white text-xs">{storeInfo.data_source}</span>
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
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={operationLoading[`${storeType}-delete`]}
                      className="border-gray-600 text-white hover:bg-gray-700"
                    >
                      {operationLoading[`${storeType}-delete`] ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Delete Vector Store</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        Are you sure you want to delete the {storeType} vector store? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-transparent text-gray-300 hover:text-white hover:bg-white/10">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleStoreOperation(storeType, 'delete')}
                        className="bg-black/30 hover:bg-black/40 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VectorStoresManagement;
