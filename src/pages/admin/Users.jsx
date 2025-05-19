import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/api';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - replace with API call
  const users = [
    {
      id: 1,
      name: "User Name",
      email: "user@example.com",
      role: "editor",
      status: "active",
      joinedDate: "2024-05-15"
    }
  ];

  const handleAddUser = async (userData) => {
    const [error, data] = await apiService.createUser(userData);
    if (!error) {
      setShowAddModal(false);
      // Refresh users list
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    const [error] = await apiService.updateUserRole(userId, newRole);
    if (!error) {
      // Refresh users list
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#4A4A4A] text-white px-4 py-2 rounded-lg hover:bg-[#3A3A3A] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengguna
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A4A4A]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A4A4A]"
            >
              <option value="all">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3">Nama</th>
                <th className="text-left pb-3">Email</th>
                <th className="text-left pb-3">Role</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Bergabung</th>
                <th className="text-left pb-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="py-4">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                      className="px-2 py-1 rounded-lg border"
                    >
                      <option value="user">User</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinedDate}</td>
                  <td>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                        <button 
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                          onClick={() => handleUpdateRole(user.id, user.role === 'active' ? 'inactive' : 'active')}
                        >
                          {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                        <button 
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                          onClick={() => {/* Handle delete */}}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Tambah Pengguna Baru</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddUser(Object.fromEntries(formData));
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A4A4A] text-white rounded-lg hover:bg-[#3A3A3A]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;