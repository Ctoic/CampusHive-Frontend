import { useState, useEffect } from 'react'
import { Link as ScrollLink, animateScroll } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const NAV_HEIGHT = 64

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMenuOpen((o) => !o)
  const closeMenu  = () => setMenuOpen(false)
  const scrollToTop = () => {
    animateScroll.scrollToTop({ duration: 400 })
    closeMenu()
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > NAV_HEIGHT)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <div className="logo" onClick={scrollToTop}>
            <RouterLink to="/">
              <span className="campus">Campus</span>
              <span className="hive">Hive</span>
            </RouterLink>
          </div>

          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <ul>
              {isHome ? (
                ['product','features','testimonials','team','contact'].map((sec) => (
                  <li key={sec}>
                    <ScrollLink
                      to={sec}
                      spy={true}
                      smooth={true}
                      offset={-NAV_HEIGHT + 1}
                      duration={500}
                      activeClass="active"
                      onClick={closeMenu}
                    >
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </ScrollLink>
                  </li>
                ))
              ) : (
                <li>
                  <RouterLink to="/" onClick={closeMenu}>
                    Home
                  </RouterLink>
                </li>
              )}
            </ul>
          </div>

          <div className="mobile-menu-btn" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* push content below fixed navbar */}
      <div style={{ height: NAV_HEIGHT }} />
    </>
  )
}

export default Navbar
