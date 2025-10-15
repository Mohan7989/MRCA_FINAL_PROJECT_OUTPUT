import React from 'react';

const features = [
  {
    icon: 'bi-backpack',
    title: 'Semester-wise Materials',
    description: 'Organized study resources, notes, and textbooks for every semester with easy filtering and search functionality.'
  },
  {
    icon: 'bi-file-text',
    title: 'Previous Question Papers',
    description: 'Comprehensive collection of past year exam papers with solutions to help you prepare effectively.'
  },
  {
    icon: 'bi-cloud-arrow-up',
    title: 'Easy File Upload',
    description: 'Share your study materials, notes, and resources with fellow students through our simple upload system.'
  },
  {
    icon: 'bi-briefcase',
    title: 'Internship Resources',
    description: 'Find internship opportunities, application guides, and preparation materials for your career growth.'
  },
  /*{
    icon: 'bi-graph-up-arrow',
    title: 'Performance Analytics',
    description: 'Track your learning progress, test scores, and identify areas for improvement with detailed analytics.'
  },
  {
    icon: 'bi-people-fill',
    title: 'Student Community',
    description: 'Connect with fellow students, share knowledge, ask questions, and collaborate on projects.'
  },*/
  {
    icon: 'bi-calendar-check',
    title: 'Exam Schedule',
    description: 'Stay updated with exam dates, timetables, and important academic calendar events.'
  },
 /* {
    icon: 'bi-book-half',
    title: 'Study Guides',
    description: 'Access curated study guides, revision notes, and quick reference materials for all subjects.'
  },*/
  {
    icon: 'bi-megaphone',
    title: 'College Announcements',
    description: 'Get instant notifications about college events, workshops, seminars, and important updates.'
  },
  /*{
    icon: 'bi-trophy',
    title: 'Achievement Badges',
    description: 'Earn badges and recognition for your academic achievements and contributions to the community.'
  },
  {
    icon: 'bi-chat-dots',
    title: 'Q&A Forum',
    description: 'Ask questions, get answers from peers and faculty, and participate in academic discussions.'
  },
  {
    icon: 'bi-download',
    title: 'Offline Access',
    description: 'Download study materials for offline access and study anytime, anywhere without internet.'
  }*/
];

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Everything You Need for Academic Success</h2>
        <p className="section-subtitle">
          Comprehensive platform designed specifically for MR College students with all the tools and resources you need to excel.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-box">
              <div className="feature-box-icon">
                <i className={`bi ${feature.icon}`}></i>
              </div>
              <div className="feature-box-content">
                <h4 className="feature-box-title">{feature.title}</h4>
                <p className="feature-box-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}