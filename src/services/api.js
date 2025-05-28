import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

// Helper function to handle API responses
const handleResponse = async (promise) => {
    try {
        const response = await promise;
        return [null, response.data];
    } catch (error) {
        return [error, null];
    }
};

// Export the API service with all methods
export const apiService = {
    // Auth endpoints
    register: (userData) => handleResponse(api.post('/register', userData)),
    login: (credentials) => handleResponse(api.post('/login', credentials)),
    logout: () => handleResponse(api.post('/logout')),
    me: () => handleResponse(api.get('/me')),

    // Generic HTTP methods
    get: (url) => handleResponse(api.get(url)),
    post: (url, data) => handleResponse(api.post(url, data)),
    put: (url, data) => handleResponse(api.put(url, data)),
    delete: (url) => handleResponse(api.delete(url)),

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

// Add request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;