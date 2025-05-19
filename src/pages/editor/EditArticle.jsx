import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, ListOrdered, Loader } from 'lucide-react';
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

const EditArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: '',
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const [error, data] = await apiService.getArticle(slug);
      if (!error && data) {
        setArticle(data);
        setTitle(data.title);
        setCategory(data.category);
        setTags(data.tags.join(', '));
        setExcerpt(data.excerpt);
        editor?.commands.setContent(data.content);
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [slug, editor]);

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

    const [error, data] = await apiService.updateArticle(slug, formData);
    setIsSaving(false);

    if (!error) {
      navigate('/editor/articles');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <div>
          <button
            onClick={() => handleSubmit('draft')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit('published')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
          >
            Publish
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Enter article title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Enter article category"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tags">
          Tags
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Enter article tags, separated by commas"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="excerpt">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Enter article excerpt"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="coverImage">
          Cover Image
        </label>
        <input
          id="coverImage"
          type="file"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <MenuBar editor={editor} />
        <div className="border rounded-md">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default EditArticle;