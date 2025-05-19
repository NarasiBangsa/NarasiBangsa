import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, Search, Filter, MoreVertical } from 'lucide-react';

const Articles = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with API call
  const articles = [
    {
      id: 1,
      title: "Perkembangan Teknologi AI di Indonesia",
      category: "Teknologi",
      status: "published",
      date: "2024-05-15",
      views: 1234,
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Update Ekonomi Digital Q2 2024",
      category: "Ekonomi",
      status: "draft",
      date: "2024-05-14",
      views: 0,
      readTime: "7 min"
    },
    // Add more articles as needed
  ];

  const filteredArticles = articles.filter(article => {
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kelola Artikel</h1>
        <Link 
          to="/editor/articles/new"
          className="bg-[#4A4A4A] text-white px-4 py-2 rounded-lg hover:bg-[#3A3A3A] flex items-center gap-2"
        >
          <PenSquare className="w-4 h-4" />
          Tulis Artikel
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A4A4A]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A4A4A]"
            >
              <option value="all">Semua Status</option>
              <option value="published">Dipublikasi</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3">Judul</th>
                <th className="text-left pb-3">Kategori</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Tanggal</th>
                <th className="text-left pb-3">Views</th>
                <th className="text-left pb-3">Waktu Baca</th>
                <th className="text-left pb-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id} className="border-b last:border-0">
                  <td className="py-4 pr-4">{article.title}</td>
                  <td>{article.category}</td>
                  <td>
                    <span 
                      className={`px-2 py-1 text-sm rounded-full ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-700'
                          : article.status === 'draft'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td>{article.date}</td>
                  <td>{article.views}</td>
                  <td>{article.readTime}</td>
                  <td>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                        <Link 
                          to={`/editor/articles/${article.id}/edit`}
                          className="block px-4 py-2 hover:bg-gray-50"
                        >
                          Edit
                        </Link>
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
    </div>
  );
};

export default Articles;