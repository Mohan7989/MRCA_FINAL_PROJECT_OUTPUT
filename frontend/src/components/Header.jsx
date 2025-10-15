import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
      setShowSearchPopup(false);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const uploadSection = document.getElementById('upload');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const uploadSection = document.getElementById('upload');
        if (uploadSection) {
          uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const openSearchPopup = () => {
    setShowSearchPopup(true);
  };

  const closeSearchPopup = () => {
    setShowSearchPopup(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  return (
    <>
      <nav className="navbar fixed-top">
        <div className="container">
          {/* Left Side - Navigation */}
          <div className="nav-left">
            <Link className="nav-item" to="/">
              Home
            </Link>
            <Link className="nav-item" to="/semesters">
              Semesters
            </Link>
            <a className="nav-item" href="#upload" onClick={handleUploadClick}>
              Upload
            </a>
          </div>

          {/* Center - Logo Text */}
          <div className="nav-center">
            <Link to="/" className="logo-link">
              <div className="logo-text-container">
                <div className="college-name">MR COLLEGE AUTONOMOUS</div>
                <div className="college-caption">ONLY FOR STUDENTS</div>
              </div>
            </Link>
          </div>

          {/* Right Side - Search Bar that opens popup */}
          <div className="nav-right">
            <div className="search-bar-container" onClick={openSearchPopup}>
              <i className="bi bi-search search-bar-icon"></i>
              <span className="search-bar-placeholder">Search materials...</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="header-spacer"></div>

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="search-popup-overlay">
          <div className="search-popup">
            {/* Popup Header with Back Button */}
            <div className="search-popup-header">
              <button 
                className="back-button"
                onClick={closeSearchPopup}
              >
                <i className="bi bi-arrow-left"></i>
                Back
              </button>
              <h4>Search Study Materials</h4>
              <button 
                className="close-button"
                onClick={closeSearchPopup}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-popup-form">
              <div className="search-popup-input-container">
                <i className="bi bi-search search-popup-icon"></i>
                <input
                  type="text"
                  className="search-popup-input"
                  placeholder="Search notes, question papers, subjects, semester..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
              <button className="search-submit-btn" type="submit">
                Search
              </button>
            </form>

            {/* Search Suggestions */}
            <div className="search-suggestions">
              <h6>Popular Searches:</h6>
              <div className="suggestion-tags">
                <span 
                  className="suggestion-tag" 
                  onClick={() => handleSuggestionClick('Physics Notes')}
                >
                  Physics Notes
                </span>
                <span 
                  className="suggestion-tag" 
                  onClick={() => handleSuggestionClick('Maths Question Papers')}
                >
                  Maths Papers
                </span>
                <span 
                  className="suggestion-tag" 
                  onClick={() => handleSuggestionClick('Semester 4 Materials')}
                >
                  Semester 4
                </span>
                <span 
                  className="suggestion-tag" 
                  onClick={() => handleSuggestionClick('Internship Guide')}
                >
                  Internship
                </span>
                <span 
                  className="suggestion-tag" 
                  onClick={() => handleSuggestionClick('Computer Science')}
                >
                  Computer Science
                </span>
                <span 
                  className="suggestion-tag" 
                  onClick={() => handleSuggestionClick('Previous Year Papers')}
                >
                  Previous Papers
                </span>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="recent-searches">
              <h6>Recent Searches:</h6>
              <div className="recent-search-items">
                <span className="recent-search-item">
                  <i className="bi bi-clock"></i>
                  Engineering Mathematics
                </span>
                <span className="recent-search-item">
                  <i className="bi bi-clock"></i>
                  Digital Electronics
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}