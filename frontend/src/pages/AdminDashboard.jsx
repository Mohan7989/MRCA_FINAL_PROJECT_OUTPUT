import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  
  const backendUrl = "https://mrca-final-project-output-4.onrender.com/api/admin";

  // Load data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch(`${backendUrl}/pending`),
        fetch(`${backendUrl}/approved`)
      ]);
      
      setPending(await pendingRes.json());
      setApproved(await approvedRes.json());
    } catch (err) {
      console.error("Error loading data:", err);
      alert("Failed to load admin data. Check backend connection.");
    }
    setLoading(false);
  };

  // Approve Material
  const handleApprove = async (id) => {
    if (!window.confirm("Approve this material?")) return;
    
    try {
      await fetch(`${backendUrl}/approve/${id}`, { method: "PUT" });
      fetchAllData(); // Refresh data
      alert("Material approved successfully!");
    } catch (err) {
      alert("Failed to approve material.");
    }
  };

  // Delete Material
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material permanently?")) return;
    
    try {
      await fetch(`${backendUrl}/delete/${id}`, { method: "DELETE" });
      fetchAllData(); // Refresh data
      alert("Material deleted successfully!");
    } catch (err) {
      alert("Failed to delete material.");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Manage study materials and approvals</p>
        </header>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending Materials ({pending.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            ✅ Approved Materials ({approved.length})
          </button>
        </div>

        {/* Pending Materials Tab */}
        {activeTab === 'pending' && (
          <section className="admin-section">
            <h2>⏳ Pending Approval</h2>
            {pending.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎉</div>
                <h3>No Pending Materials</h3>
                <p>All materials have been reviewed and approved!</p>
              </div>
            ) : (
              <div className="materials-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Subject</th>
                      <th>Semester</th>
                      <th>Year</th>
                      <th>Uploader</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((material) => (
                      <tr key={material.id}>
                        <td className="material-title">{material.title}</td>
                        <td>{material.subject}</td>
                        <td>{material.semester}</td>
                        <td>{material.uploadYear}</td>
                        <td>{material.uploaderName || 'Anonymous'}</td>
                        <td className="action-buttons">
                          <button
                            onClick={() => handleApprove(material.id)}
                            className="btn-approve"
                            title="Approve Material"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleDelete(material.id)}
                            className="btn-delete"
                            title="Reject Material"
                          >
                            ❌ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Approved Materials Tab */}
        {activeTab === 'approved' && (
          <section className="admin-section">
            <h2>✅ Approved Materials</h2>
            {approved.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No Approved Materials Yet</h3>
                <p>Approve some materials to see them here.</p>
              </div>
            ) : (
              <div className="materials-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Subject</th>
                      <th>Semester</th>
                      <th>Year</th>
                      <th>Uploader</th>
                      <th>File</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((material) => (
                      <tr key={material.id}>
                        <td className="material-title">{material.title}</td>
                        <td>{material.subject}</td>
                        <td>{material.semester}</td>
                        <td>{material.uploadYear}</td>
                        <td>{material.uploaderName || 'Anonymous'}</td>
                        <td>
                          {material.fileUrl && (
                            <a 
                              href={`https://mrca-final-project-output-4.onrender.com${material.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="file-link"
                            >
                              📄 View File
                            </a>
                          )}
                        </td>
                        <td className="action-buttons">
                          <button
                            onClick={() => handleDelete(material.id)}
                            className="btn-delete"
                            title="Remove Material"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Refresh Button */}
        <div className="admin-actions">
          <button onClick={fetchAllData} className="btn-refresh">
            🔄 Refresh Data
          </button>
        </div>

        {/* Footer */}
        <footer className="admin-footer">
          <p>Built by Mohan © 2025 - MR College Autonomous</p>
        </footer>
      </div>
    </div>
  );
}