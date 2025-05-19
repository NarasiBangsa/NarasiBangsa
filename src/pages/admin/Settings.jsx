import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { apiService } from '../../services/api';

const SettingSection = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Narasi Bangsa',
    siteDescription: 'Portal berita terpercaya',
    siteKeywords: 'berita, indonesia, politik, ekonomi',
    logo: null,
    favicon: null,
    defaultLanguage: 'id',
    timezone: 'Asia/Jakarta',
    emailNotifications: true,
    pushNotifications: false,
    articleModeration: true,
    commentModeration: true,
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const [error] = await apiService.updateSettings(settings);
    if (!error) {
      // Show success message
    }
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Pengaturan Situs</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#4A4A4A] text-white px-4 py-2 rounded-lg hover:bg-[#3A3A3A] flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <SettingSection title="Pengaturan Umum">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Situs
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Situs
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                rows={3}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords
              </label>
              <input
                type="text"
                value={settings.siteKeywords}
                onChange={(e) => setSettings({...settings, siteKeywords: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Pisahkan dengan koma"
              />
            </div>
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection title="Pengaturan Notifikasi">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifikasi Email</h3>
                <p className="text-sm text-gray-500">
                  Kirim notifikasi via email untuk aktivitas penting
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailNotifications: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A4A4A]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifikasi Push</h3>
                <p className="text-sm text-gray-500">
                  Aktifkan notifikasi push untuk browser
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    pushNotifications: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A4A4A]"></div>
              </label>
            </div>
          </div>
        </SettingSection>

        {/* Moderation Settings */}
        <SettingSection title="Pengaturan Moderasi">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Moderasi Artikel</h3>
                <p className="text-sm text-gray-500">
                  Review artikel sebelum dipublikasi
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.articleModeration}
                  onChange={(e) => setSettings({
                    ...settings,
                    articleModeration: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A4A4A]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Moderasi Komentar</h3>
                <p className="text-sm text-gray-500">
                  Review komentar sebelum ditampilkan
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.commentModeration}
                  onChange={(e) => setSettings({
                    ...settings,
                    commentModeration: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A4A4A]"></div>
              </label>
            </div>
          </div>
        </SettingSection>

        {/* Social Media Links */}
        <SettingSection title="Media Sosial">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={settings.socialLinks.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: {
                    ...settings.socialLinks,
                    facebook: e.target.value
                  }
                })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="url"
                value={settings.socialLinks.twitter}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: {
                    ...settings.socialLinks,
                    twitter: e.target.value
                  }
                })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={settings.socialLinks.instagram}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: {
                    ...settings.socialLinks,
                    instagram: e.target.value
                  }
                })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

export default Settings;