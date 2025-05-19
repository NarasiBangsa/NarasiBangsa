import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Nasional from './pages/nasional';
import Internasional from './pages/internasional';
import Ekonomi from './pages/ekonomi';
import Olahraga from './pages/olahraga';
import Teknologi from './pages/teknologi';
import Hiburan from './pages/hiburan';
import GayaHidup from './pages/gayahidup';
import Otomotif from './pages/otomotif';
import NotFound from './pages/NotFound';

// User Pages
import UserProfile from './pages/user/Profile';
import UserBookmarks from './pages/user/Bookmarks';

// Editor Pages
import EditorDashboard from './pages/editor/Dashboard';
import EditorArticles from './pages/editor/Articles';
import CreateArticle from './pages/editor/CreateArticle';
import EditArticle from './pages/editor/EditArticle';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminCategories from './pages/admin/Categories';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nasional" element={<Nasional />} />
        <Route path="/nasional/:subcategory" element={<Nasional />} />
        <Route path="/nasional/page/:page" element={<Nasional />} />
        <Route path="/nasional/:subcategory/page/:page" element={<Nasional />} />
        <Route path="/internasional" element={<Internasional />} />
        <Route path="/ekonomi" element={<Ekonomi />} />
        <Route path="/olahraga" element={<Olahraga />} />
        <Route path="/teknologi" element={<Teknologi />} />
        <Route path="/hiburan" element={<Hiburan />} />
        <Route path="/gaya-hidup" element={<GayaHidup />} />
        <Route path="/otomotif" element={<Otomotif />} />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <UserBookmarks />
            </ProtectedRoute>
          }
        />

        {/* Protected Editor Routes */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={['editor', 'admin']}>
              <Routes>
                <Route index element={<EditorDashboard />} />
                <Route path="articles" element={<EditorArticles />} />
                <Route path="articles/new" element={<CreateArticle />} />
                <Route path="articles/:slug/edit" element={<EditArticle />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

