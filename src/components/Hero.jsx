import { useInView } from 'react-intersection-observer'
import { Link as RouterLink } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  const [badgeRef, badgeInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [subtitleRef, subtitleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [buttonRef, buttonInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [visualRef, visualInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="hero">
      {/* Background Elements */}
      <div className="hero-background">
        {/* Gradient Mesh */}
        <div className="gradient-mesh"></div>
        
        {/* Animated Shapes */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
      </div>

      {/* Content Container */}
      <div className="hero-container">
        {/* Main Grid */}
        <div className="hero-grid">
          {/* Left Column - Text Content */}
          <div className="hero-text">
            {/* Badge */}
            <div
              ref={badgeRef}
              className={`hero-badge ${badgeInView ? 'visible' : ''}`}
            >
              <div className="badge-content">
                <div className="badge-dot"></div>
                <span className="badge-text">SMART CAMPUS SOLUTION</span>
              </div>
            </div>

            {/* Main Title */}
            <div
              ref={titleRef}
              className={`hero-title-container ${titleInView ? 'visible' : ''}`}
            >
              <h1 className="hero-title">
                <span className="gradient-text">CampusHive</span>
                <span className="title-subtitle">Intelligent Campus Agents</span>
              </h1>
            </div>

            {/* Description */}
            <p
              ref={subtitleRef}
              className={`hero-description ${subtitleInView ? 'visible' : ''}`}
            >
              Empowering FAST University's Students and Faculty with AI-powered campus automation. 
              Streamline announcements, quizzes, timetables, compliance checks and more—all from one intelligent interface.
            </p>

            {/* CTA Section */}
            <div
              ref={buttonRef}
              className={`hero-cta ${buttonInView ? 'visible' : ''}`}
            >
              <RouterLink to="/signup">
                <button className="btn-primary">
                  <div className="btn-bg"></div>
                  <div className="btn-glow"></div>
                  <div className="btn-content">
                    <span>Get Started</span>
                    <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </div>
                </button>
              </RouterLink>

              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div
            ref={visualRef}
            className={`hero-visual ${visualInView ? 'visible' : ''}`}
          >
            {/* Blob Container */}
            <div className="visual-container">
              <div className="morphing-card">
                {/* Glass Card */}
                <div className="glass-card"></div>
                
                {/* Floating Elements */}
                <div className="floating-elements">
                  <div className="element-group top">
                    <div className="campus-icon"></div>
                    <div className="line short"></div>
                    <div className="line medium"></div>
                  </div>
                  <div className="element-group middle">
                    <div className="feature-box">
                      <div className="feature-icon"></div>
                      <div className="feature-line"></div>
                    </div>
                    <div className="floating-dot"></div>
                  </div>
                  <div className="element-group bottom">
                    <div className="progress-line full"></div>
                    <div className="progress-line partial"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero