import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialsList from '../components/MaterialsList';
import { fetchMaterials } from '../api/api';
import SEO from '../components/SEO'; // ✅ IMPORTED SEO COMPONENT

const SUBJECTS = ['All', 'Telugu', 'English', 'Physics', 'Maths', 'Chemistry', 'Computer'];
const YEARS = ['All', '2020', '2021', '2022', '2023', '2024', '2025'];
const TYPES = ['All', 'question paper', 'notes', 'pdf', 'image'];

export default function SemesterPage() {
  const { slug } = useParams();
  const [filters, setFilters] = useState({
    semester: slug,
    group: '',
    subject: 'All',
    year: 'All',
    type: 'All'
  });
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch initial items (recent)
    loadMaterials(filters);
    // eslint-disable-next-line
  }, [slug]);

  const loadMaterials = async (f) => {
    setLoading(true);
    try {
      const res = await fetchMaterials({
        semester: f.semester,
        subject: f.subject !== 'All' ? f.subject : undefined,
        group: f.group || undefined,
        year: f.year !== 'All' ? f.year : undefined,
        type: f.type !== 'All' ? f.type : undefined
      });
      // if backend returns {items: []}
      setMaterials(res.items || demoFetch(f));
    } catch (err) {
      // fallback demo
      setMaterials(demoFetch(f));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loadMaterials(filters);
  };

  function demoFetch(f) {
    // small demo dataset: only show items when semester includes 'sem-'
    if (!f || !f.semester) return [];
    // show some mock if sem-2 or sem-1 etc else empty
    if (f.semester.startsWith('sem')) {
      return [
        {
          id: 'demo-1',
          title: `${f.semester.toUpperCase()} - Sample Question Paper`,
          subject: f.subject === 'All' ? 'Physics' : f.subject,
          semester: f.semester,
          year: f.year === 'All' ? '2024' : f.year,
          description: 'Mock sample question paper uploaded for demo',
          fileUrl: null // null means pending in demo
        }
      ];
    }
    // internships show no items demo
    return [];
  }
  
  // ✅ SEO HELPER FUNCTION
  const getPageTitle = (s) => {
    if (!s) return "Semester Materials";
    // Converts "sem-1" to "Sem 1"
    return s.replace('-', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  const semesterTitle = getPageTitle(slug);

  return (
    <div className="semester-page">
      {/* ✅ SEO COMPONENT IMPLEMENTED */}
      <SEO 
        title={`MRAC Study Materials - ${semesterTitle} Notes and Papers`}
        description={`Browse all approved study materials, notes, question papers, and resources for ${semesterTitle} at MRAC College.`}
        name="MRAC Student Portal"
        type="article"
      />
      
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-inner">
          {/* ✅ CHANGED TO H1: This is the main page title for SEO */}
          <h1>{filters.semester.replace('-', ' ').toUpperCase()}</h1>
          <p>Find materials, question papers and notes for this semester</p>
        </div>
      </div>

      <div className="container">
        {/* Beautiful Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            {/* ✅ CHANGED TO H2: A major section heading, following H1 */}
            <h2 className="filter-title">🔍 Filter Materials</h2>
            <p className="filter-subtitle">Find exactly what you're looking for</p>
          </div>
          
          <form className="filter-form" onSubmit={onSubmit}>
            <div className="filter-row">
              <div className="filter-group">
              {/* ... form content remains the same */}
              </div>

              <div className="filter-group">
              {/* ... form content remains the same */}
              </div>

              <div className="filter-group">
              {/* ... form content remains the same */}
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
              {/* ... form content remains the same */}
              </div>

              <div className="filter-group">
              {/* ... form content remains the same */}
              </div>

              <div className="filter-actions">
              {/* ... form content remains the same */}
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="results-section">
          {/* ✅ CHANGED TO H2: Another major section heading, following H1 */}
          <h2 style={{ marginTop: '1rem' }}>Results</h2>
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading materials...</p>
            </div>
          ) : (
            <MaterialsList items={materials} />
          )}
        </div>
      </div>
    </div>
  );
}