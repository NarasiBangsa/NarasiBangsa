import React, { useState } from 'react';
import { Plus, MoreVertical, AlertCircle, ArrowRight } from 'lucide-react';
import { apiService } from '../../services/api';

const Categories = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock data - replace with API calls
  const categories = [
    {
      id: 1,
      name: "Nasional",
      slug: "nasional",
      articleCount: 156,
      subcategories: [
        { id: 1, name: "Politik", slug: "politik", articleCount: 45 },
        { id: 2, name: "Hukum", slug: "hukum", articleCount: 32 }
      ]
    },
    {
      id: 2,
      name: "Internasional",
      slug: "internasional",
      articleCount: 203,
      subcategories: [
        { id: 3, name: "Asia", slug: "asia", articleCount: 78 },
        { id: 4, name: "Eropa", slug: "eropa", articleCount: 56 }
      ]
    }
  ];

  const handleAddCategory = async (categoryData) => {
    const [error, data] = await apiService.createCategory(categoryData);
    if (!error) {
      setShowAddModal(false);
      // Refresh categories list
    }
  };

  const handleEditCategory = async (categoryId, categoryData) => {
    const [error] = await apiService.updateCategory(categoryId, categoryData);
    if (!error) {
      setEditingCategory(null);
      // Refresh categories list
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kelola Kategori</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#4A4A4A] text-white px-4 py-2 rounded-lg hover:bg-[#3A3A3A] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Kategori</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedCategory?.id === category.id 
                    ? 'border-[#4A4A4A] bg-gray-50' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {category.articleCount} artikel · {category.subcategories.length} subkategori
                    </p>
                  </div>
                  <div className="relative group">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                      <button 
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCategory(category);
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategories List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {selectedCategory 
                ? <>
                    Subkategori <ArrowRight className="w-4 h-4 inline" /> {selectedCategory.name}
                  </>
                : 'Pilih kategori untuk melihat subkategori'
              }
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setShowAddModal(true)}
                className="text-sm text-[#4A4A4A] hover:underline"
              >
                + Tambah Subkategori
              </button>
            )}
          </div>
          
          {selectedCategory ? (
            <div className="space-y-3">
              {selectedCategory.subcategories.map((subcategory) => (
                <div 
                  key={subcategory.id}
                  className="p-3 rounded-lg border hover:border-gray-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{subcategory.name}</h3>
                      <p className="text-sm text-gray-500">
                        {subcategory.articleCount} artikel
                      </p>
                    </div>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                        <button 
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                          onClick={() => setEditingCategory(subcategory)}
                        >
                          Edit
                        </button>
                        <button 
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                          onClick={() => {/* Handle delete */}}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p>Pilih kategori untuk melihat subkategori</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingCategory) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              if (editingCategory) {
                handleEditCategory(editingCategory.id, Object.fromEntries(formData));
              } else {
                handleAddCategory(Object.fromEntries(formData));
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={editingCategory?.name}
                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    name="slug"
                    type="text"
                    required
                    defaultValue={editingCategory?.slug}
                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                  }}
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

export default Categories;