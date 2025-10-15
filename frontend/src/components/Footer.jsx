import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <i className="bi bi-journals"></i>
              </div>
              <div className="logo-text">
                <span className="logo-title">MRCA STUDENTS HUB</span>
                <span className="logo-subtitle">ONLY STUDENTS</span>
              </div>
            </div>
            <p className="footer-description">
              Your comprehensive platform for semester-wise study materials, 
              question papers, and internship resources. Empowering students 
              for academic excellence.
            </p>
            <div className="social-links">
              {/* Note: Kept these as <a> tags as they link externally or to placeholders */}
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links (Updated to use Link components) */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/semesters" className="footer-link">Semesters</Link></li>
              {/* Assuming these are links to sections on the Home page */}
              <li><a href="#upload" className="footer-link">Upload Materials</a></li> 
              <li><a href="#materials" className="footer-link">Study Materials</a></li>
              <li><a href="#papers" className="footer-link">Question Papers</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-list">
              <li><a href="#notes" className="footer-link">Study Notes</a></li>
              <li><a href="#guides" className="footer-link">Study Guides</a></li>
              <li><a href="#internships" className="footer-link">Internship Guides</a></li>
              <li><a href="#projects" className="footer-link">Project Ideas</a></li>
              <li><a href="#career" className="footer-link">Career Guidance</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-contact">
            <h4 className="footer-heading">Contact & Support</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="bi bi-geo-alt"></i>
                <span>MR College Autonomous, Vizianagaram - 535002</span>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope"></i>
                <span>principalmrac@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone"></i>
                <span>+91 xxxxxxxxx</span>
              </div>
              <div className="contact-item">
                <i className="bi bi-clock"></i>
                <span>Mon - Sat: 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-heading">Stay Updated</h4>
            <p className="newsletter-text">
              Get the latest updates on new materials, exams, and college events.
            </p>
            <form className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} MRCA STUDENTS HUB. All rights reserved.</p>
              <p>Built with ❤️ for students by students</p>
            </div>
            {/* --- LEGAL LINKS (CRITICAL FOR ADSENSE/SEO) --- */}
            <div className="footer-bottom-links">
              <Link to="/privacy" className="bottom-link">Privacy Policy</Link>
              <Link to="/terms" className="bottom-link">Terms of Use</Link>
              {/* Kept Cookie Policy as <a> if it jumps to an external site/section */}
              <a href="#cookies" className="bottom-link">Cookie Policy</a> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
