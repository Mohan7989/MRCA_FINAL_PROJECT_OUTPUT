// Update your Home.jsx - Add UserUploads component
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import FeaturesSection from '../components/FeaturesSection';
import SemestersGrid from '../components/SemestersGrid';
import MaterialsList from '../components/MaterialsList';
import UserUploads from '../components/UserUploads'; // ADD THIS IMPORT
import { fetchMaterials } from '../api/api';

export default function Home() {
  const [recentMaterials, setRecentMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentMaterials();
  }, []);

  const loadRecentMaterials = async () => {
    setLoading(true);
    try {
      const response = await fetchMaterials({});
      
      let materials = [];
      if (Array.isArray(response)) {
        materials = response.slice(0, 6);
      } else if (response && response.items) {
        materials = response.items.slice(0, 6);
      }
      
      setRecentMaterials(materials);
    } catch (err) {
      console.error('Error loading recent materials:', err);
      setRecentMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="MRAC Student Resources - Notes, Timetables, and Question Papers"
        description="Access and upload free study materials, timetables, and previous year question papers for all semesters at MRAC College."
        name="MRAC Student Portal"
        type="website"
      />
      
      <div className="home-page">
        <HeroSection />
        <FeaturesSection />
        
        {/* Recent Materials Section */}
        <section className="recent-materials-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Recently Added Materials</h2>
              <p className="section-subtitle">
                Latest approved study resources (Admin verified)
              </p>
            </div>
            
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading recent materials...</p>
              </div>
            ) : (
              <MaterialsList items={recentMaterials} />
            )}
          </div>
        </section>

        {/* ADD THIS NEW SECTION */}
        <UserUploads />
        
        <section className="semesters-section">
          <div className="container">
            <h2 className="section-title">Browse by Semester</h2>
            <p className="section-subtitle">
              Select your semester to access relevant study materials and resources
            </p>
            <SemestersGrid />
          </div>
        </section>
      </div>
    </>
  );
}