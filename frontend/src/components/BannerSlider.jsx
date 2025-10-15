
import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, title: 'Quality Notes', subtitle: 'Semester-wise curated notes', bg: '#e3f2fd' },
  { id: 2, title: 'Previous Question Papers', subtitle: 'Practice with past papers', bg: '#fce4ec' },
  { id: 3, title: 'Tutorials & Guides', subtitle: 'Study tips & exam strategies', bg: '#e8f5e9' },
  { id: 4, title: 'Internship Resources', subtitle: 'Apply & prepare for internships', bg: '#fff3e0' }
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="banner-slider">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`slide ${i === index ? 'active' : ''}`}
          style={{ background: s.bg }}
        >
          <div className="slide-inner">
            <h2>{s.title}</h2>
            <p>{s.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
