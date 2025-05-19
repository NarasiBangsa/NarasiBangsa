import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [error, data] = await apiService.updateProfile(formData);
    if (!error) {
      setUser(data.user);
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profil Saya</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        {!isEditing ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm text-gray-500">Nama</h2>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Email</h2>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Bio</h2>
              <p className="text-lg">{user?.bio || 'Belum ada bio'}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#4A4A4A] text-white rounded-lg hover:bg-[#3A3A3A]"
            >
              Edit Profil
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-[#4A4A4A] text-white rounded-lg hover:bg-[#3A3A3A]"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;