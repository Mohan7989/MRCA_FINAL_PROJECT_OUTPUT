import React from 'react';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO'; // <--- ADDED IMPORT
import FeaturesSection from '../components/FeaturesSection';
import SemestersGrid from '../components/SemestersGrid';
// Note: UpdatesTicker is commented out/removed in your current code

export default function Home() {
  return (
    <>
      <SEO 
        title="MRAC Student Resources - Notes, Timetables, and Question Papers" // <--- ADDED SEO TITLE
        description="Access and upload free study materials, timetables, and previous year question papers for all semesters at MRAC College." // <--- ADDED SEO DESCRIPTION
        name="MRAC Student Portal"
        type="website"
      />
      
      {/* The rest of the original page content is now wrapped */}
      <div className="home-page">
        <HeroSection />
        <FeaturesSection />
        
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