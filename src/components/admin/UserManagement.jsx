import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Users, RefreshCw, Search, Shield, Trash2 } from 'lucide-react';
import apiClient from '../../lib/api';

const roleColor = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'faculty':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.adminListUsers(0, 1000);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      (u.username || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      String(u.id).includes(q)
    );
  }, [users, query]);

  const handleRoleChange = async (userId, nextRole) => {
    try {
      const updated = await apiClient.adminUpdateUserRole(userId, nextRole);
      setUsers(prev => prev.map(u => (u.id === userId ? updated : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Delete this user? This action is irreversible.')) return;
    try {
      await apiClient.adminDeleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-white font-semibold flex items-center gap-2"><Users className="h-5 w-5" /> Users</h2>
          <p className="text-sm text-gray-400">Manage roles and remove accounts</p>
        </div>
        <Button onClick={refresh} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">Directory</CardTitle>
          <CardDescription className="text-gray-400">Search and manage users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by username, email, or ID"
                className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 mb-3">{error}</div>
          )}

          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-gray-400">ID</TableHead>
                  <TableHead className="text-gray-400">Username</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400">Loading...</TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400">No users found</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((u) => (
                    <TableRow key={u.id} className="hover:bg-gray-800/40">
                      <TableCell className="text-white/90">{u.id}</TableCell>
                      <TableCell className="text-white">{u.username}</TableCell>
                      <TableCell className="text-gray-300">{u.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={`${roleColor(u.role)}`}>{u.role}</Badge>
                          <select
                            defaultValue={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="w-[140px] bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                          >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          className="border-red-500/40 text-red-300 hover:bg-red-500/10 hover:text-red-200"
                          onClick={() => handleDelete(u.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;


