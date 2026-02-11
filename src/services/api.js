import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = (limit = 10, offset = 0) => api.get(`/?offset=${offset}&limit=${limit}`);
export const getProductById = (id) => api.get(`/${id}`);
export const createProduct = (data) => api.post('/', data);
export const updateProduct = (id, data) => api.put(`/${id}`, data);
export const deleteProduct = (id) => api.delete(`/${id}`);
