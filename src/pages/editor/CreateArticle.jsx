import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, ListOrdered } from 'lucide-react';
import { apiService } from '../../services/api';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="border-b p-2 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
      >
        <ListOrdered className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded hover:bg-gray-100"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
      >
        <LinkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

const CreateArticle = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: '',
  });

  const handleSubmit = async (status) => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('excerpt', excerpt);
    formData.append('content', editor.getHTML());
    formData.append('status', status);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const [error, data] = await apiService.createArticle(formData);
    setIsSaving(false);

    if (!error) {
      navigate('/editor/articles');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tulis Artikel Baru</h1>
        <div className="flex gap-4">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={isSaving}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={isSaving}
            className="px-4 py-2 bg-[#4A4A4A] text-white rounded-lg hover:bg-[#3A3A3A]"
          >
            Publikasi
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Judul artikel..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-bold border-0 border-b focus:ring-0 focus:border-gray-300 px-0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Pilih Kategori</option>
              <option value="nasional">Nasional</option>
              <option value="internasional">Internasional</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="teknologi">Teknologi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              placeholder="Pisahkan dengan koma"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ringkasan
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Tulis ringkasan artikel..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="min-h-[400px] p-4" />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;