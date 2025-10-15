import React, { useState, useEffect } from 'react';

// Using placeholder images that actually exist
const slides = [
  {
    id: 1,
    image: '/assets/slider/slide1.jpg',
   // title: 'Quality Education',
    //subtitle: 'Access the best study materials and resources',
   // buttonText: 'Explore Materials',
   // link: '/semesters'
  },
  {
    id: 2,
    image: '/assets/slider/slide2.jpg',
   // title: 'Previous Question Papers',
    //subtitle: 'Prepare with past year exam papers',
    //buttonText: 'View Papers',
    //link: '/semesters'
  },
  {
    id: 3,
    image: '/assets/slider/slide3.jpg',
    //title: 'Study Notes',
    //subtitle: 'Comprehensive notes for every semester',
   // buttonText: 'Get Notes',
   // link: '/semesters'
  },
  {
    id: 4,
    image: '/assets/slider/slide4.jpg',
   // title: 'Internship Opportunities',
   // subtitle: 'Find the best internship resources',
   // buttonText: 'Explore Internships',
   // link: '/semesters'
  },
  {
    id: 5,
    image: '/assets/slider/slide5.jpg',
   // title: 'Expert Guidance',
   // subtitle: 'Learn from experienced faculty and seniors',
   // buttonText: 'Learn More',
   // link: '/semesters'
  }
];

function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="image-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="slide-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div 
              className="slide-backup" 
              style={{display: 'none', background: `linear-gradient(135deg, #${slide.id}67b, #${slide.id+2}a4f)`}}
            ></div>
            <div className="slide-overlay"></div>
            <div className="container">
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <a href={slide.link} className="slide-button">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button className="slider-arrow slider-arrow-prev" onClick={prevSlide}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="slider-arrow slider-arrow-next" onClick={nextSlide}>
          <i className="bi bi-chevron-right"></i>
        </button>
        
        {/* Dots Indicator */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImageSlider;