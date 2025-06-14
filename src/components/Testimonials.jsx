import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    name: "John Doe",
    role: "Student",
    image: "/path-to-image.jpg",
    text: "This platform has transformed how I study and prepare for exams."
  },
  {
    name: "Jane Smith",
    role: "Professor",
    image: "/path-to-image.jpg",
    text: "The exam generation feature saves me hours of preparation time."
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="testimonials-container">
      <h2 className="section-title">Testimonials</h2>
      <div className="testimonials-grid">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-image">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">{testimonial.text}</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials; 