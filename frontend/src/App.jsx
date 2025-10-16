import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import UploadSection from './components/UploadSection.jsx';
import ImageSlider from './components/ImageSlider.jsx';
import NotificationBar from './components/NotificationBar.jsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.jsx'));
const SemesterPage = lazy(() => import('./pages/SemesterPage.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="spinner"></div>
    <p>Loading Student Resources...</p>
  </div>
);

function App() {
  return (
    <div className="app">
      <Header />
      <ImageSlider />
      <NotificationBar />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/semesters" element={<Home />} />
            <Route path="/semester/:slug" element={<SemesterPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        
        <div className="container mt-5">
          <UploadSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;