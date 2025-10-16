import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialsList from '../components/MaterialsList';
import { fetchMaterials } from '../api/api';
import SEO from '../components/SEO';

const SUBJECTS = ['All', 'Telugu', 'English', 'Physics', 'Maths', 'Chemistry', 'Computer'];
const YEARS = ['All', '2020', '2021', '2022', '2023', '2024', '2025'];
const TYPES = ['All', 'question paper', 'notes', 'pdf', 'image'];

export default function SemesterPage() {
  const { slug } = useParams();
  const [filters, setFilters] = useState({
    semester: slug || '',
    subject: 'All',
    year: 'All',
    type: 'All'
  });
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load materials when component mounts
  useEffect(() => {
    loadMaterials();
  }, [slug]);

  const loadMaterials = async () => {
    setLoading(true);
    try {
      // Convert "All" to undefined for backend
      const params = {
        semester: filters.semester,
        subject: filters.subject !== 'All' ? filters.subject : undefined,
        year: filters.year !== 'All' ? filters.year : undefined,
        type: filters.type !== 'All' ? filters.type : undefined
      };

      console.log('Fetching materials with params:', params);
      
      const response = await fetchMaterials(params);
      
      // Handle both response formats from your APIs
      let materialsData = [];
      if (Array.isArray(response)) {
        materialsData = response;
      } else if (response && response.items) {
        materialsData = response.items;
      }
      
      console.log('Loaded materials:', materialsData.length);
      setMaterials(materialsData);
      
    } catch (err) {
      console.error('Error loading materials:', err);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadMaterials();
  };

  const resetFilters = () => {
    setFilters({
      semester: slug || '',
      subject: 'All',
      year: 'All',
      type: 'All'
    });
    setTimeout(loadMaterials, 100);
  };

  const semesterTitle = slug ? slug.replace('-', ' ').split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : 'Semester';

  return (
    <div className="semester-page">
      <SEO 
        title={`MRAC Study Materials - ${semesterTitle} Notes and Papers`}
        description={`Browse all approved study materials, notes, question papers, and resources for ${semesterTitle} at MRAC College.`}
        name="MRAC Student Portal"
        type="article"
      />
      
      <div className="hero">
        <div className="hero-inner">
          <h1>{semesterTitle.toUpperCase()}</h1>
          <p>Find materials, question papers and notes for this semester</p>
        </div>
      </div>

      <div className="container">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            <h2 className="filter-title">🔍 Filter Materials</h2>
            <p className="filter-subtitle">Find exactly what you're looking for</p>
          </div>
          
          <form className="filter-form" onSubmit={handleSubmit}>
            <div className="filter-row">
              <div className="filter-group">
                <label className="filter-label">Subject</label>
                <select 
                  value={filters.subject} 
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="form-select"
                >
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Year</label>
                <select 
                  value={filters.year} 
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="form-select"
                >
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Type</label>
                <select 
                  value={filters.type} 
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="form-select"
                >
                  {TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <div className="small-spinner"></div>
                    Applying Filters...
                  </>
                ) : (
                  'Apply Filters'
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={resetFilters}
                disabled={loading}
              >
                Reset Filters
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2>Study Materials</h2>
            <div className="results-count">
              {loading ? 'Loading...' : `${materials.length} materials found`}
            </div>
          </div>
          
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading materials for {semesterTitle}...</p>
            </div>
          ) : (
            <MaterialsList items={materials} />
          )}
        </div>
      </div>
    </div>
  );
}