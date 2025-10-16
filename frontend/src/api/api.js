import axios from 'axios';

// Try multiple backend URLs
const BACKEND_URLS = [
  'https://mrca-final-project-output-4.onrender.com/api',
  'https://your-backend-url.onrender.com/api',
  'http://localhost:8080/api' // for local testing
];

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || BACKEND_URLS[0];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000 // Reduce timeout
});

// Smart upload function with better error handling
export async function uploadMaterial(formData) {
  for (const baseUrl of BACKEND_URLS) {
    try {
      console.log('Trying backend:', baseUrl);
      const res = await axios.post(`${baseUrl}/uploads`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 15000
      });
      console.log('Upload successful to:', baseUrl);
      return res.data;
    } catch (err) {
      console.log(`Failed to connect to ${baseUrl}:`, err.message);
      continue; // Try next URL
    }
  }
  
  // All backends failed
  throw new Error('All backend servers are offline. Please try again later.');
}

// Smart fetch function
export async function fetchMaterials(filters = {}) {
  for (const baseUrl of BACKEND_URLS) {
    try {
      const res = await axios.get(`${baseUrl}/materials`, { 
        params: filters,
        timeout: 8000 
      });
      return res.data;
    } catch (err) {
      console.log(`Failed to fetch from ${baseUrl}:`, err.message);
      continue;
    }
  }
  
  // Return empty array if all backends fail
  return { items: [], total: 0 };
}

// Test backend connection
export async function testBackendConnection() {
  for (const baseUrl of BACKEND_URLS) {
    try {
      const res = await axios.get(`${baseUrl}/health`, { timeout: 5000 });
      return { connected: true, url: baseUrl, status: res.data };
    } catch (err) {
      continue;
    }
  }
  return { connected: false, url: null, status: 'All backends offline' };
}