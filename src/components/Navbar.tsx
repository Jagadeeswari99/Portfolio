import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  const navItems = [
    { label: 'About', path: 'home-about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Research', path: 'home-research' },
    { label: 'Contact', path: 'home-contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path.startsWith('home-')) {
      return currentPath === '/' && window.location.hash === `#${path.replace('home-', '')}`;
    }
    return currentPath === path;
  };

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="nav-logo">
          J<span>.</span>M
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.path.startsWith('home-') ? `#${item.path.replace('home-', '')}` : item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={isLinkActive(item.path) ? 'active' : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="./Jagadeeswari.pdf" download className="nav-cta">
          Resume ↓
        </a>

        {/* Mobile Hamburger Toggle */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Nav Overlay Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.path.startsWith('home-') ? `#${item.path.replace('home-', '')}` : item.path}
            onClick={(e) => handleLinkClick(e, item.path)}
            className={`mobile-link ${isLinkActive(item.path) ? 'active' : ''}`}
          >
            {item.label}
          </a>
        ))}
        <a 
          href="./Jagadeeswari.pdf" 
          download 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="mobile-link"
          style={{ color: 'var(--accent)', marginTop: '1rem', fontSize: '1.4rem' }}
        >
          Download Resume ↓
        </a>
      </div>
    </>
  );
};
