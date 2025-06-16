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
  const closeMenu = () => setMenuOpen(false)
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

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'faq', label: 'FAQ' },
    { id: 'team', label: 'Team' }
  ]

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
                navItems.map((item) => (
                  <li key={item.id}>
                    <ScrollLink
                      to={item.id}
                      spy={true}
                      smooth={true}
                      offset={-NAV_HEIGHT + 1}
                      duration={500}
                      activeClass="active"
                      onClick={closeMenu}
                      className="hover:text-[#00d462] transition-colors duration-300"
                    >
                      {item.label}
                    </ScrollLink>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <RouterLink to="/" onClick={closeMenu} className="hover:text-[#00d462] transition-colors duration-300">
                      Home
                    </RouterLink>
                  </li>
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <RouterLink 
                        to={`/#${item.id}`} 
                        onClick={closeMenu}
                        className="hover:text-[#00d462] transition-colors duration-300"
                      >
                        {item.label}
                      </RouterLink>
                    </li>
                  ))}
                </>
              )}
              <li>
                <RouterLink 
                  to="/contact" 
                  onClick={closeMenu}
                  className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-black transition duration-300 ease-out rounded-lg group bg-gradient-to-r from-[#00d462] to-[#00c455] hover:from-[#00c455] hover:to-[#00b548] shadow-lg shadow-[#00d462]/20 hover:shadow-xl hover:shadow-[#00d462]/30 hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">Contact Us</span>
                  <span className="relative invisible">Contact Us</span>
                </RouterLink>
              </li>
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
