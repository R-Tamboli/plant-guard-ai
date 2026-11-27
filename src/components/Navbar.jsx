import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sprout, Stethoscope, Wheat, MessageSquare, BarChart3, Settings, Menu, X } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { to: '/', label: 'Home', icon: Sprout, end: true },
  { to: '/crop-doctor', label: 'Crop Doctor', icon: Stethoscope },
  { to: '/crop-advisor', label: 'Advisor', icon: Wheat },
  { to: '/farm-chat', label: 'Farm Chat', icon: MessageSquare },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">🌾</div>
          <span>AgriGuard AI</span>
        </Link>

        <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={16} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <Link to="/settings" className="navbar-settings" title="Settings">
            <Settings size={18} />
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
