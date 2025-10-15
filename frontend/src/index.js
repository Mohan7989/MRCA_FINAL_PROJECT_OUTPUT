import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <--- ADD THIS IMPORT
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './styles/styles.css';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <--- WRAP BrowserRouter with HelmetProvider
  <HelmetProvider> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);