import React, { useEffect, useRef, useState } from 'react';
import { 
  FaBolt, 
  FaShieldAlt, 
  FaChartBar, 
  FaSearch,
  FaLock,
  FaServer
} from 'react-icons/fa';
import './Features.css';
import { features } from './FeaturesCarousel';

const Features = () => {
  const [titleInView, setTitleInView] = useState(false);
  const [carouselInView, setCarouselInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cursorRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const autoScrollRef = useRef(null);

  const handleNext = () => {
    if (carouselContainerRef.current) {
      const cardWidth = 320; // Width of each card
      const gap = 32; // Gap between cards
      const nextIndex = (currentIndex + 1) % features.length;
      const scrollPosition = (cardWidth + gap) * nextIndex;
      
      carouselContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (carouselContainerRef.current) {
      const cardWidth = 320; // Width of each card
      const gap = 32; // Gap between cards
      const prevIndex = (currentIndex - 1 + features.length) % features.length;
      const scrollPosition = (cardWidth + gap) * prevIndex;
      
      carouselContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(prevIndex);
    }
  };

  const handleDemo = () => {
    // Navigate to chat demo
    console.log('Demo clicked');
  };

  const handleSignUp = () => {
    // Navigate to signup
    console.log('Sign up clicked');
  };

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const carouselObserver = new IntersectionObserver(
      ([entry]) => {
        setCarouselInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const titleElement = document.querySelector('.section-title');
    const carouselElement = document.querySelector('.features-carousel');

    if (titleElement) titleObserver.observe(titleElement);
    if (carouselElement) carouselObserver.observe(carouselElement);

    return () => {
      titleObserver.disconnect();
      carouselObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const carousel = carouselContainerRef.current;

    if (!carousel || !cursor) return;

    // Custom Cursor
    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('active');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('active');
    };

    const cards = carousel.querySelectorAll('.e-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Drag to Scroll
    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - carousel.offsetLeft;
      scrollLeftRef.current = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
      clearInterval(autoScrollRef.current);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      carousel.style.cursor = 'grab';
    };

    const handleMouseLeaveCarousel = () => {
      isDragging.current = false;
      carousel.style.cursor = 'grab';
    };

    const handleMouseMoveDrag = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      carousel.scrollLeft = scrollLeftRef.current - walk;
    };

    // Reverse Vertical Scroll
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      carousel.scrollLeft -= delta * 1.2;
      clearInterval(autoScrollRef.current);
    };

    // Auto-Scroll
    const startAutoScroll = () => {
      if (!carouselInView) return;
      autoScrollRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Change card every 5 seconds
    };

    // Pause auto-scroll on hover
    const handleCarouselHover = () => {
      clearInterval(autoScrollRef.current);
    };

    const handleCarouselHoverLeave = () => {
      if (carouselInView) startAutoScroll();
    };

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseLeaveCarousel);
    carousel.addEventListener('mousemove', handleMouseMoveDrag);
    carousel.addEventListener('wheel', handleWheel);
    carousel.addEventListener('mouseenter', handleCarouselHover);
    carousel.addEventListener('mouseleave', handleCarouselHoverLeave);
    window.addEventListener('mousemove', handleMouseMove);

    if (carouselInView) {
      startAutoScroll();
    }

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown);
      carousel.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('mouseleave', handleMouseLeaveCarousel);
      carousel.removeEventListener('mousemove', handleMouseMoveDrag);
      carousel.removeEventListener('wheel', handleWheel);
      carousel.removeEventListener('mouseenter', handleCarouselHover);
      carousel.removeEventListener('mouseleave', handleCarouselHoverLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
      clearInterval(autoScrollRef.current);
    };
  }, [carouselInView, currentIndex]);

  return (
    <div className="features-container">
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="container">
        <h2
          className={`section-title ${titleInView ? 'visible' : ''}`}
        >
          Our Features
        </h2>

        <div className="carousel-wrapper">
          <button className="nav-button prev-button" onClick={handlePrevious}>
            ←
          </button>

          <div
            ref={carouselContainerRef}
            className={`features-carousel ${carouselInView ? 'visible' : ''}`}
          >
            {features.length > 0 ? (
              features.map((feature, index) => (
                <div className="e-card" key={index}>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="infotop">
                    <div className="card-category">{feature.category}</div>
                    <div className="card-title">{feature.title}</div>
                    <div className="card-description">{feature.content}</div>
                    <div className="card-image">
                      <img src={feature.src} alt={feature.title} style={{width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px'}} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="fallback">No features available</div>
            )}
          </div>

          <button className="nav-button next-button" onClick={handleNext}>
            →
          </button>
        </div>

        <div className="features-cta">
          <button className="btn btn-secondary" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="btn btn-primary" onClick={handleDemo}>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;