import React from 'react';
import { Link } from 'react-router-dom';

const semesters = [
  { slug: 'sem-1', title: 'Semester 1', icon: '1️⃣', color: '#3B82F6', subjects: 8 },
  { slug: 'sem-2', title: 'Semester 2', icon: '2️⃣', color: '#10B981', subjects: 7 },
  { slug: 'sem-3', title: 'Semester 3', icon: '3️⃣', color: '#F59E0B', subjects: 6 },
  { slug: 'sem-4', title: 'Semester 4', icon: '4️⃣', color: '#EF4444', subjects: 5 },
  { slug: 'sem-5', title: 'Semester 5', icon: '5️⃣', color: '#8B5CF6', subjects: 6 },
  { slug: 'sem-6', title: 'Semester 6', icon: '6️⃣', color: '#EC4899', subjects: 5 },
  { slug: 'internship-1', title: 'Internship 1', icon: '💼', color: '#06B6D4', subjects: 4 },
  { slug: 'internship-2', title: 'Internship 2', icon: '🚀', color: '#84CC16', subjects: 3 }
];

export default function SemestersGrid() {
  return (
    <section className="semesters-grid-section">
      <div className="container">
        <div className="semesters-grid">
          {semesters.map((semester, index) => (
            <Link 
              to={`/semester/${semester.slug}`} 
              key={semester.slug} 
              className="semester-card"
              style={{ '--semester-color': semester.color }}
            >
              <div className="semester-header">
                <div className="semester-icon" style={{ backgroundColor: semester.color }}>
                  <span className="icon-emoji">{semester.icon}</span>
                </div>
                <div className="semester-badge" style={{ backgroundColor: semester.color }}>
                  {semester.subjects} Subjects
                </div>
              </div>
              
              <div className="semester-content">
                <h3 className="semester-title">{semester.title}</h3>
                <p className="semester-description">
                  Access all study materials, notes, and question papers for {semester.title.toLowerCase()}.
                </p>
              </div>
              
              <div className="semester-footer">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      backgroundColor: semester.color,
                      width: `${(semester.subjects / 8) * 100}%`
                    }}
                  ></div>
                </div>
                <span className="view-materials">
                  View Materials <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}