import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="container py-5">
      <SEO title="Privacy Policy - MRAC Student Resources" description="Our policy on data collection, use, and protection for all users of the MRAC Student Resources portal." />
      <h1 className="text-center mb-5">Privacy Policy</h1>
      <div className="card shadow-sm p-4 p-md-5">
        <p className="lead">Last Updated: October 14, 2025</p>
        <hr className="mb-4" />
        
        <h2>1. Information We Collect</h2>
        <p>We only collect information necessary to operate the platform and facilitate the sharing of educational materials:</p>
        <ul>
          <li><strong>User-Provided Data:</strong> When you upload material, you provide a title, subject, semester, and an optional uploader name.</li>
          <li><strong>Usage Data:</strong> We track which materials are accessed (downloads/views) for performance monitoring.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>The information is used solely to categorize and display study materials and for administrative review (approval/rejection) of uploaded content.</p>

        <h2>3. Data Security and Storage</h2>
        <p>Your data and uploaded files are stored securely on our servers. Uploaded files are subject to review and moderation before being made publicly accessible.</p>
        
        <h2>4. Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      </div>
    </div>
  );
}