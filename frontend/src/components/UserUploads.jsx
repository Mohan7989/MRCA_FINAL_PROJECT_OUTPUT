// Create new file: src/components/UserUploads.jsx
import React, { useState, useEffect } from 'react';

export default function UserUploads() {
  const [userUploads, setUserUploads] = useState([]);
  const [uploaderName, setUploaderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchUserUploads = async () => {
    if (!uploaderName.trim()) {
      alert('Please enter your name to check upload status');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://mrca-final-project-output-4.onrender.com/api/user/uploads?uploaderName=${encodeURIComponent(uploaderName)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setUserUploads(data);
        setSearched(true);
      } else {
        alert('Error fetching your uploads');
        setUserUploads([]);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to fetch upload status. Please try again.');
      setUserUploads([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (approved) => {
    if (approved) {
      return <span className="status-badge approved">✅ Approved</span>;
    } else {
      return <span className="status-badge pending">⏳ Pending Review</span>;
    }
  };

  const getFileIcon = (fileType) => {
    const iconMap = {
      'pdf': 'file-pdf',
      'image': 'file-image',
      'notes': 'file-text',
      'paper': 'file-earmark-text',
      'question paper': 'file-earmark-text'
    };
    return iconMap[fileType] || 'file-earmark';
  };

  return (
    <section className="user-uploads-section" id="upload-status">
      <div className="container">
        <div className="section-header">
          <h2>📋 Check Your Upload Status</h2>
          <p>Enter your name to see the status of your uploaded materials</p>
        </div>

        {/* Search Form */}
        <div className="upload-status-form">
          <div className="form-group">
            <label>Your Name (as entered during upload)</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={uploaderName}
                onChange={(e) => setUploaderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchUserUploads()}
              />
              <button 
                className="btn btn-primary"
                onClick={fetchUserUploads}
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Status'}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="uploads-results">
            <h3>Your Uploaded Materials</h3>
            
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your uploads...</p>
              </div>
            ) : userUploads.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h4>No Uploads Found</h4>
                <p>No materials found for "{uploaderName}". Make sure you entered the exact name used during upload.</p>
                <p className="text-muted">
                  If you just uploaded, it may take a few minutes to appear. All uploads require admin approval.
                </p>
              </div>
            ) : (
              <div className="user-uploads-list">
                {userUploads.map((upload) => (
                  <div key={upload.id} className="upload-item">
                    <div className="upload-header">
                      <div className="upload-title-section">
                        <i className={`bi bi-${getFileIcon(upload.type)}`}></i>
                        <h5>{upload.title}</h5>
                      </div>
                      {getStatusBadge(upload.approved)}
                    </div>
                    
                    <div className="upload-details">
                      <div className="detail-row">
                        <span><strong>Subject:</strong> {upload.subject}</span>
                        <span><strong>Semester:</strong> {upload.semester}</span>
                        <span><strong>Year:</strong> {upload.uploadYear}</span>
                      </div>
                      <div className="detail-row">
                        <span><strong>Type:</strong> {upload.type}</span>
                        <span><strong>Uploaded By:</strong> {upload.uploaderName || 'Anonymous'}</span>
                        <span><strong>Upload Date:</strong> Recently</span>
                      </div>
                    </div>

                    {upload.approved && upload.fileUrl && (
                      <div className="upload-actions">
                        <a 
                          href={`https://mrca-final-project-output-4.onrender.com${upload.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-sm"
                        >
                          <i className="bi bi-download"></i> Download
                        </a>
                        <span className="text-success">
                          ✅ Now available to all students
                        </span>
                      </div>
                    )}
                    
                    {!upload.approved && (
                      <div className="upload-note">
                        <i className="bi bi-info-circle"></i>
                        Your material is waiting for admin approval. This usually takes 24-48 hours.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="upload-help">
          <h4>💡 Need Help?</h4>
          <ul>
            <li>Make sure you enter the <strong>exact same name</strong> used during upload</li>
            <li>All uploads require admin approval before appearing on the website</li>
            <li>Approval usually takes 24-48 hours</li>
            <li>Contact admin if your upload is pending for more than 2 days</li>
          </ul>
        </div>
      </div>
    </section>
  );
}