import React from 'react';

export const Footer: React.FC = () => {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-copy">
        © 2026 <span>Jagadeeswari J M</span>. Data Science Portfolio.
      </div>
      <a href="#navbar" onClick={handleBackToTop} className="footer-back">
        ↑ Back to top
      </a>
    </footer>
  );
};
