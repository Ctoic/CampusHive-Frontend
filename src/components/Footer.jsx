import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // TODO: wire up your newsletter API here
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* columns */}
        <div className="footer__col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/">Product</Link>
          <Link to="/">Features</Link>
          <Link to="/">Team</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/press">Press</Link>
        </div>

        <div className="footer__col">
          <h4>Resources</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/security">Security</Link>
        </div>

        <div className="footer__col newsletter">
          <h4>Subscribe</h4>
          {subscribed ? (
            <p className="footer__thanks">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="footer__form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          )}
          <div className="footer__social">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} CampusHive. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
