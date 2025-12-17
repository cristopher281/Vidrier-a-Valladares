import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Prevent body scroll when menu is open
    if (!mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
  }

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
    document.body.classList.remove('mobile-menu-open')
  }

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
        document.body.classList.remove('mobile-menu-open')
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  return (
    <header className={`container navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ fontWeight: 800, fontSize: 20, background: 'linear-gradient(90deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Vidriería Valladares
        </div>
      </div>

      {/* Hamburger Menu Button (Mobile/Tablet only) */}
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      {/* Navigation Links (Desktop + Mobile Menu) */}
      <nav className="nav-links">
        <Link to="/" onClick={handleLinkClick}>Inicio</Link>
        <Link to="/catalog" onClick={handleLinkClick}>Productos</Link>
        <Link to="/wood-products" onClick={handleLinkClick} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L4 7v9c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V7l-8-5z" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          Carpintería
        </Link>
        <Link to="/about" onClick={handleLinkClick}>Nosotros</Link>
        <Link to="/contact" onClick={handleLinkClick}>Contacto</Link>
        <button
          className="btn"
          onClick={() => {
            handleLinkClick()
            nav('/quote')
          }}
        >
          Obtener Presupuesto
        </button>
      </nav>
    </header>
  )
}
