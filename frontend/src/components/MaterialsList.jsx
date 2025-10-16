import React from 'react';

// Helper function to get file URL
const getFileUrl = (material) => {
  if (!material.fileUrl) return null;
  
  // Handle both relative and absolute URLs
  if (material.fileUrl.startsWith('http')) {
    return material.fileUrl;
  } else {
    // Your backend URL with file path
    return `https://mrca-final-project-output-4.onrender.com${material.fileUrl}`;
  }
};

// Helper function to get appropriate file icons
function getFileIcon(fileType) {
  const iconMap = {
    'pdf': 'file-pdf',
    'image': 'file-image',
    'notes': 'file-text',
    'paper': 'file-earmark-text',
    'question paper': 'file-earmark-text',
    'document': 'file-earmark'
  };
  return iconMap[fileType] || 'file-earmark';
}

export default function MaterialsList({ items = [] }) {
  if (!items.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-illustration">
          <img src="/assets/coming-soon.png" alt="Coming soon" className="empty-image" />
          <div className="empty-glow"></div>
          <div className="floating-elements">
            <div className="floating-element el1">📚</div>
            <div className="floating-element el2">📝</div>
            <div className="floating-element el3">🔍</div>
            <div className="floating-element el4">💡</div>
          </div>
        </div>
        
        <div className="empty-content">
          <h3 className="empty-title">No Materials Found Yet</h3>
          <p className="empty-description">
            We're working hard to add study materials for this section. 
            Be the first to contribute and help your fellow students!
          </p>
          
          <div className="empty-stats">
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Materials</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Coming Soon</div>
              <div className="stat-label">New Content</div>
            </div>
          </div>

          <div className="empty-actions">
            <a href="#upload" className="empty-btn primary">
              <i className="bi bi-cloud-arrow-up"></i>
              Upload First Material
            </a>
            <button className="empty-btn secondary">
              <i className="bi bi-bell"></i>
              Get Notified
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="materials-list-horizontal">
      <div className="materials-header">
        <div className="materials-info">
          <h4 className="materials-count">
            {items.length} {items.length === 1 ? 'Material' : 'Materials'} Found
          </h4>
          <p className="materials-subtitle">
            Click on preview or download to access materials
          </p>
        </div>
        <div className="materials-sort">
          <span className="sort-label">Sort by:</span>
          <select className="sort-select">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Title A-Z</option>
            <option>Title Z-A</option>
          </select>
        </div>
      </div>

      <div className="materials-container">
        {items.map((material, index) => {
          const fileUrl = getFileUrl(material);
          
          return (
            <div className="material-item" key={material.id || material.title || index}>
              {/* Approval Status Badge */}
              {material.approved !== undefined && (
                <div className={`approval-status ${material.approved ? 'approved' : 'pending'}`}>
                  <i className={`bi ${material.approved ? 'bi-check-circle-fill' : 'bi-clock-history'}`}></i>
                  {material.approved ? 'Approved' : 'Pending Approval'}
                </div>
              )}

              {/* Material Header */}
              <div className="material-header">
                <div className="material-type-badge">
                  <i className={`bi bi-${getFileIcon(material.type)}`}></i>
                  {material.type || 'document'}
                </div>
                <div className="material-actions-compact">
                  {fileUrl ? (
                    <>
                      <button 
                        className="action-btn preview-btn"
                        onClick={() => window.open(fileUrl, '_blank')}
                        title="Preview Material"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <a 
                        className="action-btn download-btn"
                        href={fileUrl}
                        download
                        title="Download Material"
                      >
                        <i className="bi bi-download"></i>
                      </a>
                    </>
                  ) : (
                    <span className="pending-badge">
                      <i className="bi bi-clock"></i>
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Material Content */}
              <div className="material-content">
                <h5 className="material-title">{material.title}</h5>
                
                <div className="material-meta">
                  <div className="meta-row">
                    <span className="meta-item">
                      <i className="bi bi-book"></i>
                      {material.subject || 'General'}
                    </span>
                    <span className="meta-item">
                      <i className="bi bi-calendar"></i>
                      {material.year || 'All Years'}
                    </span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-item">
                      <i className="bi bi-person"></i>
                      {material.uploaderName || 'Anonymous'}
                    </span>
                    <span className="meta-item">
                      <i className="bi bi-journals"></i>
                      {material.semester || 'General'}
                    </span>
                  </div>
                </div>

                <p className="material-description">
                  {material.description || 'No description available for this material.'}
                </p>
              </div>

              {/* Material Footer */}
              <div className="material-footer">
                <div className="material-stats">
                  <div className="stat">
                    <i className="bi bi-eye"></i>
                    <span>{material.views || 0} views</span>
                  </div>
                  <div className="stat">
                    <i className="bi bi-download"></i>
                    <span>{material.downloads || 0} downloads</span>
                  </div>
                </div>
                
                <div className="material-actions-full">
                  {fileUrl ? (
                    <div className="action-buttons">
                      <button 
                        className="btn preview-full"
                        onClick={() => window.open(fileUrl, '_blank')}
                      >
                        <i className="bi bi-eye"></i>
                        Preview
                      </button>
                      <a 
                        className="btn download-full"
                        href={fileUrl}
                        download
                      >
                        <i className="bi bi-download"></i>
                        Download
                      </a>
                    </div>
                  ) : (
                    <div className="pending-status">
                      <i className="bi bi-clock"></i>
                      Awaiting Approval
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Line */}
              <div className="material-progress">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${Math.min(((material.downloads || 0) / 10) * 100, 100)}%`,
                    backgroundColor: '#007bff'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}