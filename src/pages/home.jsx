import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { mockNews } from '../mocks/newsData';
import ApiTest from '../components/ApiTest';

const CategoryPreview = ({ title, route, news }) => (
  <section className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <Link 
        to={route}
        className="text-sm text-[#4A4A4A] hover:underline flex items-center gap-1"
      >
        Lihat Semua <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news.slice(0, 3).map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <Link to={`/berita/${item.slug}`} className="group">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-[#4A4A4A] font-medium">{item.category}</span>
              <h3 className="font-bold mt-2 line-clamp-2 group-hover:text-[#4A4A4A]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.excerpt}</p>
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState('terbaru');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="space-y-12">
      {/* Hero Section with Featured News */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Featured News */}
          <div className="lg:col-span-2 relative group">
            <Link to="/berita/slug-berita">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src="https://source.unsplash.com/random/1200x800?news"
                  alt="Featured news"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 p-6 text-white">
                    <span className="bg-red-500 text-xs font-medium px-2.5 py-1 rounded-full">
                      Breaking News
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold mt-2 group-hover:text-gray-200">
                      Judul Berita Utama Yang Menarik Perhatian
                    </h1>
                    <p className="text-gray-200 mt-2 line-clamp-2">
                      Deskripsi singkat berita yang memberikan gambaran umum tentang isi berita...
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Side Featured News */}
          <div className="hidden lg:flex flex-col gap-4">
            {[1, 2].map((item) => (
              <Link key={item} to="/berita/slug-berita" className="group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    src={`https://source.unsplash.com/random/800x600?news-${item}`}
                    alt="News"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 p-4 text-white">
                      <span className="bg-blue-500 text-xs font-medium px-2.5 py-1 rounded-full">
                        Teknologi
                      </span>
                      <h2 className="text-lg font-bold mt-2 group-hover:text-gray-200">
                        Judul Berita Terkait {item}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-red-500" />
          <h2 className="text-lg font-bold">Trending Topics</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['#Teknologi', '#Ekonomi', '#Politik', '#Olahraga', '#Kesehatan'].map((topic) => (
            <Link
              key={topic}
              to={`/search?q=${topic}`}
              className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 whitespace-nowrap"
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>

      {/* Category Previews */}
      <CategoryPreview 
        title="Berita Nasional"
        route="/nasional"
        news={mockNews.nasional}
      />
      
      <CategoryPreview 
        title="Ekonomi & Bisnis"
        route="/ekonomi"
        news={mockNews.ekonomi}
      />

      {/* Tambah kategori lainnya jika perlu */}
      <ApiTest />
    </div>
  );
};

export default Home;
