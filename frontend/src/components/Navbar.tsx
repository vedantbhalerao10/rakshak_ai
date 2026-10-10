import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/safety-hub', label: 'Digital Safety Hub' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About / Safety' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(2, 11, 24, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={20} color="white" />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9' }}>
              Rakshak <span style={{ color: '#3B82F6' }}>AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to)) ? 'active' : ''}`}
                style={{ padding: '4px 12px', borderRadius: 6 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/analyze" className="btn-primary mobile-hidden" style={{ fontSize: 13, padding: '8px 18px' }} id="nav-cta-btn">
              <Shield size={15} />
              Analyze Suspicious Content
            </Link>
            <button
              className="btn-ghost"
              style={{ display: 'none', padding: '6px' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              id="mobile-menu-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
            background: 'rgba(2, 11, 24, 0.98)',
            padding: '24px',
            zIndex: 99,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px',
                color: location.pathname === link.to ? '#3B82F6' : '#CBD5E1',
                textDecoration: 'none',
                borderRadius: 10,
                background: location.pathname === link.to ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                fontSize: 16, fontWeight: 500,
                border: '1px solid transparent',
                borderColor: location.pathname === link.to ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
              }}
            >
              {link.label}
              <ChevronRight size={18} style={{ opacity: 0.5 }} />
            </Link>
          ))}
          <div style={{ marginTop: 8 }}>
            <Link
              to="/analyze"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Shield size={16} />
              Analyze Suspicious Content
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
