import React, { useEffect, useRef } from 'react';
import './InteractiveBackground.css';

const InteractiveBackground = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      container.appendChild(particle);
      particlesRef.current.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Scroll handler
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
    };

    // Animation loop
    const animate = () => {
      particlesRef.current.forEach(particle => {
        // Update position based on mouse movement
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = (300 - distance) / 300;
          particle.speedX -= (dx / distance) * force * 0.2;
          particle.speedY -= (dy / distance) * force * 0.2;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Add scroll effect
        particle.y += scrollPosition.current * 0.02;

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;

        // Apply position and size
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        particle.element.style.width = `${particle.size}px`;
        particle.element.style.height = `${particle.size}px`;
        particle.element.style.opacity = particle.opacity;
      });

      requestAnimationFrame(animate);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      particlesRef.current.forEach(particle => {
        if (container.contains(particle.element)) {
          container.removeChild(particle.element);
        }
      });
    };
  }, []);

  return (
    <div className="interactive-background" ref={containerRef}>
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default InteractiveBackground; 