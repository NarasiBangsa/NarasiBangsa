import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8001/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// API Response wrapper
const handleResponse = (promise) => {
  return promise
    .then((response) => [null, response.data])
    .catch((error) => [error, null]);
};

// API Methods
export const apiService = {
  // Auth endpoints
  register: (userData) => handleResponse(api.post('/register', userData)),
  login: (credentials) => handleResponse(api.post('/login', credentials)),
  logout: () => handleResponse(api.post('/logout')),
  me: () => handleResponse(api.get('/me')),
  
  // Profile endpoints
  updateProfile: (data) => handleResponse(api.put('/profile', data)),
  
  // Article endpoints
  getArticles: (params) => handleResponse(api.get('/articles', { params })),
  getArticle: (slug) => handleResponse(api.get(`/articles/${slug}`)),
  createArticle: (data) => handleResponse(api.post('/articles', data)),
  updateArticle: (slug, data) => handleResponse(api.put(`/articles/${slug}`, data)),
  deleteArticle: (slug) => handleResponse(api.delete(`/articles/${slug}`)),

  // Category endpoints
  getCategories: () => handleResponse(api.get('/categories')),
  getSubcategories: (categoryId) => handleResponse(api.get(`/categories/${categoryId}/subcategories`)),

  // Comment endpoints
  getComments: (articleId) => handleResponse(api.get(`/articles/${articleId}/comments`)),
  createComment: (articleId, data) => handleResponse(api.post(`/articles/${articleId}/comments`, data)),

  // Admin endpoints
  getUsers: () => handleResponse(api.get('/admin/users')),
  createUser: (userData) => handleResponse(api.post('/admin/users', userData)),
  updateUser: (userId, userData) => handleResponse(api.put(`/admin/users/${userId}`, userData)),
  deleteUser: (userId) => handleResponse(api.delete(`/admin/users/${userId}`)),
  
  getSettings: () => handleResponse(api.get('/admin/settings')),
  updateSettings: (settings) => handleResponse(api.put('/admin/settings', settings)),
  
  createCategory: (data) => handleResponse(api.post('/admin/categories', data)),
  updateCategory: (id, data) => handleResponse(api.put(`/admin/categories/${id}`, data)),
  deleteCategory: (id) => handleResponse(api.delete(`/admin/categories/${id}`)),
};

export default api;