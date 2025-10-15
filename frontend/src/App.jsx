import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'; // <-- FIXED: Added .jsx extension
import SemesterPage from './pages/SemesterPage.jsx'; // <-- FIXED: Added .jsx extension
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'; // <-- FIXED: Added .jsx extension
import TermsOfUse from './pages/TermsOfUse.jsx';     // <-- FIXED: Added .jsx extension
import Header from './components/Header.jsx'; // <-- FIXED: Added .jsx extension
import Footer from './components/Footer.jsx'; // <-- FIXED: Added .jsx extension
import UploadSection from './components/UploadSection.jsx'; // <-- FIXED: Added .jsx extension
import ImageSlider from './components/ImageSlider.jsx'; // <-- FIXED: Added .jsx extension
import NotificationBar from './components/NotificationBar.jsx'; // <-- FIXED: Added .jsx extension
import AdminDashboard from "./pages/AdminDashboard";

 function App() {
  return (
    <div className="app">
      <Header />
      <ImageSlider />
      <NotificationBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/semesters" element={<Home />} />
          <Route path="/semester/:slug" element={<SemesterPage />} />
          
          {/* --- NEW LEGAL ROUTES FOR SEO/ADSENSE COMPLIANCE --- */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        
        <div className="container mt-5">
          <UploadSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;