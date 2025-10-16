import axios from 'axios';

// Base URL - change to your backend URL when ready.
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://mrca-final-project-output-4.onrender.com/api';

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
    // Improved error logging
    console.error('uploadMaterial error:', {
      message: err.message,
      isAxiosError: err.isAxiosError,
      response: err.response ? { status: err.response.status, data: err.response.data } : null,
      config: err.config
    });
    // rethrow so UI can handle and display proper message
    throw err;
  }
}

// Get materials with filters
export async function fetchMaterials(filters = {}) {
  try {
    const res = await axiosInstance.get('/materials', { params: filters });
    return res.data;
  } catch (err) {
    console.error('fetchMaterials error:', {
      message: err.message,
      isAxiosError: err.isAxiosError,
      response: err.response ? { status: err.response.status, data: err.response.data } : null,
      config: err.config
    });
    // bubble up error so caller can know backend is offline vs empty result
    throw err;
  }
}

