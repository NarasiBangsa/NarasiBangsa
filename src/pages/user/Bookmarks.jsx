import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const Bookmarks = () => {
  // Mock data - replace with API call
  const bookmarks = [
    {
      id: 1,
      title: 'Artikel yang Disimpan 1',
      excerpt: 'Deskripsi singkat artikel yang disimpan...',
      date: '2024-05-15',
      readTime: '5 min',
      category: 'Teknologi'
    },
    // Add more bookmarks
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Artikel Tersimpan</h1>
      
      <div className="space-y-6">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[#4A4A4A] bg-gray-100 px-2 py-1 rounded">
                {bookmark.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {bookmark.readTime}
              </div>
            </div>
            <Link 
              to={`/berita/${bookmark.id}`}
              className="block group"
            >
              <h2 className="text-xl font-bold mb-2 group-hover:text-[#4A4A4A]">
                {bookmark.title}
              </h2>
              <p className="text-gray-600">
                {bookmark.excerpt}
              </p>
            </Link>
            <div className="mt-4 flex justify-between items-center">
              <time className="text-sm text-gray-500">
                {bookmark.date}
              </time>
              <button className="text-red-500 hover:text-red-600 text-sm">
                Hapus dari Tersimpan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;