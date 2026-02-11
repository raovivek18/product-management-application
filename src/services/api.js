import axios from 'axios';

// Base API URL for Platzi Fake Store API
const API_BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all products
 * @returns {Promise}
 */
export const getProducts = () => api.get('/');

/**
 * Get single product by ID
 * @param {number|string} id 
 * @returns {Promise}
 */
export const getProductById = (id) => api.get(`/${id}`);

/**
 * Create a new product
 * @param {Object} data - Product details (title, price, description, categoryId, images)
 * @returns {Promise}
 */
export const createProduct = (data) => api.post('/', data);

/**
 * Update an existing product
 * @param {number|string} id 
 * @param {Object} data - Updated fields
 * @returns {Promise}
 */
export const updateProduct = (id, data) => api.put(`/${id}`, data);

/**
 * Delete a product
 * @param {number|string} id 
 * @returns {Promise}
 */
export const deleteProduct = (id) => api.delete(`/${id}`);
