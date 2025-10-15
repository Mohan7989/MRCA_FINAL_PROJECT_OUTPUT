import React from 'react';
import SEO from '../components/SEO';

export default function TermsOfUse() {
  return (
    <div className="container py-5">
      <SEO title="Terms of Use - MRAC Student Resources" description="The rules and guidelines for uploading and using study materials on the MRAC Student Resources portal." />
      <h1 className="text-center mb-5">Terms of Use</h1>
      <div className="card shadow-sm p-4 p-md-5">
        <p className="lead">Effective Date: October 14, 2025</p>
        <hr className="mb-4" />

        <h2>1. User Responsibilities (Uploaded Content)</h2>
        <p>By uploading any material, you affirm that you own the rights to the content or have the necessary permissions. **You agree not to upload any copyrighted content** belonging to third parties (e.g., paid textbooks, official college exam booklets) without explicit authorization.</p>

        <h2>2. Content Moderation</h2>
        <p>All submitted materials are **pending** until manually approved by an administrator. We reserve the right to reject or delete any material at our discretion, without prior notice, especially if it violates copyright or quality standards.</p>

        <h2>3. Disclaimer of Liability</h2>
        <p>The materials provided on this site are for educational purposes only. MRAC College is not responsible for the accuracy or legality of user-uploaded content.</p>
        
        <h2>4. Use of Materials</h2>
        <p>Materials are provided free of charge to students for personal study and reference only.</p>
      </div>
    </div>
  );
}