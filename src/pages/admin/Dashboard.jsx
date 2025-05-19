import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, LayoutGrid, Settings, TrendingUp, Eye, MessageSquare } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {change && (
          <p className={`text-sm mt-2 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '+' : ''}{change}% dari bulan lalu
          </p>
        )}
      </div>
      <div className={`${color} p-4 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // Mock data - replace with API calls
  const stats = {
    totalUsers: 1205,
    totalArticles: 456,
    totalViews: "25.4K",
    totalComments: 892
  };

  const recentUsers = [
    {
      id: 1,
      name: "User Name",
      email: "user@example.com",
      role: "editor",
      joinedDate: "2024-05-15"
    }
    // Add more users as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <div className="flex gap-4">
          <Link
            to="/admin/users"
            className="bg-[#4A4A4A] text-white px-4 py-2 rounded-lg hover:bg-[#3A3A3A] flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Kelola Pengguna
          </Link>
          <Link
            to="/admin/settings"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Pengaturan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Pengguna"
          value={stats.totalUsers}
          icon={Users}
          change={12}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Artikel"
          value={stats.totalArticles}
          icon={FileText}
          change={8}
          color="bg-green-500"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon={Eye}
          change={15}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Komentar"
          value={stats.totalComments}
          icon={MessageSquare}
          change={-5}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Pengguna Terbaru</h2>
            <Link to="/admin/users" className="text-[#4A4A4A] hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3">Nama</th>
                  <th className="text-left pb-3">Email</th>
                  <th className="text-left pb-3">Role</th>
                  <th className="text-left pb-3">Bergabung</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/users/new"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
            >
              <Users className="w-6 h-6" />
              <span>Tambah User</span>
            </Link>
            <Link
              to="/admin/categories"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
            >
              <LayoutGrid className="w-6 h-6" />
              <span>Kelola Kategori</span>
            </Link>
            <Link
              to="/admin/articles"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
            >
              <FileText className="w-6 h-6" />
              <span>Kelola Artikel</span>
            </Link>
            <Link
              to="/admin/analytics"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
            >
              <TrendingUp className="w-6 h-6" />
              <span>Analitik</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;