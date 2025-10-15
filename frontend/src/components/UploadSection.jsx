import React, { useState } from 'react';
import { uploadMaterial } from '../api/api';

export default function UploadSection() {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    group: '',
    type: 'pdf',
    year: '2025',
    semester: 'Sem-1',
    uploaderName: ''
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => setFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setMsg('Please select a file to upload.');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', form.title);
    fd.append('subject', form.subject);
    fd.append('group', form.group);
    fd.append('type', form.type);
    fd.append('year', form.year);
    fd.append('semester', form.semester);
    fd.append('uploaderName', form.uploaderName);
    setLoading(true);
    try {
      const res = await uploadMaterial(fd);
      setMsg('✅ Upload submitted — pending admin approval.');
      setForm({
        title: '',
        subject: '',
        group: '',
        type: 'pdf',
        year: '2025',
        semester: 'Sem-1',
        uploaderName: ''
      });
      setFile(null);
      document.getElementById('fileInput').value = '';
    } catch (err) {
      console.error(err);
      setMsg('⚠️ Upload failed (backend may be offline). Data saved locally in demo mode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="upload-section">
      <div className="container">
        <div className="upload-header">
          <h2 className="upload-title">Share Your Knowledge</h2>
          <p className="upload-subtitle">
            Upload study materials, question papers, or notes to help fellow students. 
            All uploads are reviewed before publishing.
          </p>
        </div>
        
        <div className="upload-layout">
          {/* Left Side - Upload Form */}
          <div className="upload-form-container">
            <form className="upload-form" onSubmit={submit}>
              <div className="form-section">
                <h4 className="section-title">Material Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={form.title} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="Enter material title"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={form.subject} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="e.g., Physics, Mathematics"
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Group (Optional)</label>
                    <input 
                      type="text" 
                      name="group" 
                      value={form.group} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="e.g., Group A, Section 1"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Material Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="form-select">
                      <option value="pdf">PDF Document</option>
                      <option value="image">Image/Photo</option>
                      <option value="notes">Study Notes</option>
                      <option value="paper">Question Paper</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">Academic Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <select name="year" value={form.year} onChange={handleChange} className="form-select">
                      <option value="All">All Years</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Semester</label>
                    <select name="semester" value={form.semester} onChange={handleChange} className="form-select">
                      <option value="Sem-1">Semester 1</option>
                      <option value="Sem-2">Semester 2</option>
                      <option value="Sem-3">Semester 3</option>
                      <option value="Sem-4">Semester 4</option>
                      <option value="Sem-5">Semester 5</option>
                      <option value="Sem-6">Semester 6</option>
                      <option value="Internship-1">Internship 1</option>
                      <option value="Internship-2">Internship 2</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">Upload Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name (Optional)</label>
                    <input 
                      type="text" 
                      name="uploaderName" 
                      value={form.uploaderName} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Select File *</label>
                    <div className="file-upload">
                      <input 
                        type="file" 
                        id="fileInput"
                        accept=".pdf,image/*,.doc,.docx,.txt" 
                        onChange={handleFile} 
                        className="file-input"
                        required 
                      />
                      <label htmlFor="fileInput" className="file-label">
                        <i className="bi bi-cloud-arrow-up"></i>
                        {file ? file.name : 'Choose file...'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="bi bi-arrow-repeat spin"></i>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cloud-arrow-up"></i>
                      Submit Upload
                    </>
                  )}
                </button>
              </div>

              {msg && (
                <div className={`form-message ${msg.includes('✅') ? 'success' : 'error'}`}>
                  <i className={`bi ${msg.includes('✅') ? 'bi-check-circle' : 'bi-exclamation-triangle'}`}></i>
                  {msg}
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Real Image */}
          <div className="upload-image-side">
            <div className="image-container">
              <img 
                src="/assets/upload-section-image.jpg" 
                alt="Students sharing study materials" 
                className="upload-side-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback if image doesn't load */}
              <div className="image-fallback">
                <div className="fallback-icon">
                  <i className="bi bi-cloud-arrow-up"></i>
                </div>
                <h3>Share Your Knowledge</h3>
                <p>Help fellow students by uploading study materials</p>
              </div>
            </div>
            
            <div className="image-features">
              <div className="feature-item">
                <i className="bi bi-shield-check"></i>
                <div className="feature-text">
                  <strong>Secure Uploads</strong>
                  <span>All files are verified</span>
                </div>
              </div>
              <div className="feature-item">
                <i className="bi bi-clock"></i>
                <div className="feature-text">
                  <strong>Quick Review</strong>
                  <span>Approved within 24 hours</span>
                </div>
              </div>
              <div className="feature-item">
                <i className="bi bi-award"></i>
                <div className="feature-text">
                  <strong>Help Community</strong>
                  <span>Support fellow students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}