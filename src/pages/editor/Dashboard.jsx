import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, LayoutList, TrendingUp, Clock } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, change, color }) => (
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

const EditorDashboard = () => {
  // Mock data - replace with API calls
  const stats = {
    totalArticles: 156,
    articlesThisMonth: 24,
    avgReadTime: "5.2",
    trending: 12
  };

  const recentArticles = [
    {
      id: 1,
      title: "Perkembangan Teknologi AI di Indonesia",
      status: "published",
      date: "2024-05-15",
      views: 1234
    },
    // Add more articles
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard Editor</h1>
        <Link 
          to="/editor/articles/new"
          className="bg-[#4A4A4A] text-white px-4 py-2 rounded-lg hover:bg-[#3A3A3A] flex items-center gap-2"
        >
          <PenSquare className="w-4 h-4" />
          Tulis Artikel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Artikel"
          value={stats.totalArticles}
          icon={LayoutList}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Artikel Bulan Ini"
          value={stats.articlesThisMonth}
          icon={PenSquare}
          change={15}
          color="bg-green-500"
        />
        <DashboardCard
          title="Rata-rata Waktu Baca"
          value={`${stats.avgReadTime} min`}
          icon={Clock}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Artikel Trending"
          value={stats.trending}
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Artikel Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3">Judul</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Tanggal</th>
                <th className="text-left pb-3">Views</th>
                <th className="text-left pb-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((article) => (
                <tr key={article.id} className="border-b last:border-0">
                  <td className="py-4">{article.title}</td>
                  <td>
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700">
                      {article.status}
                    </span>
                  </td>
                  <td>{article.date}</td>
                  <td>{article.views}</td>
                  <td>
                    <Link 
                      to={`/editor/articles/${article.id}/edit`}
                      className="text-[#4A4A4A] hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditorDashboard;