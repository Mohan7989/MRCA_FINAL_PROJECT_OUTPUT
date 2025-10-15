import axios from 'axios';

// Base URL - change to your backend URL when ready.
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
});

// Upload an item (multipart)
export async function uploadMaterial(formData) {
  try {
    const res = await axiosInstance.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Get materials with filters
export async function fetchMaterials(filters = {}) {
  // filters: { semester, subject, group, year, type, page, size }
  try {
    const res = await axiosInstance.get('/materials', { params: filters });
    return res.data;
  } catch (err) {
    // fallback mock if backend not ready
    return { items: [], total: 0 };
  }
}

