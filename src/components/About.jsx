import { useInView } from 'react-intersection-observer'
import { FaDatabase, FaCogs } from 'react-icons/fa'
import './About.css'

const About = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="product" className="about">
      <div className="container">
        <h2 
          ref={titleRef} 
          className={`section-title fade-in ${titleInView ? 'visible' : ''}`}
        >
          About Our Product
        </h2>
        
        <p 
          ref={contentRef} 
          className={`about-content fade-in ${contentInView ? 'visible' : ''}`}
        >
          Our Multi-Agent System is designed to optimize complex processes, providing seamless integration and unparalleled efficiency.
        </p>
        
        <div 
          ref={cardsRef} 
          className={`about-cards stagger-children ${cardsInView ? 'visible' : ''}`}
        >
          <div className="about-card">
            <div className="about-card-icon">
              <FaDatabase />
            </div>
            <h3>DUMMY TEXT</h3>
            <p>Our platform handles large datasets with ease, providing real-time insights for better decision making.</p>
          </div>
          
          <div className="about-card">
            <div className="about-card-icon">
              <FaCogs />
            </div>
            <h3>DUMMY TEXT</h3>
            <p>Seamlessly integrate with existing systems and automate complex workflows across your university.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About