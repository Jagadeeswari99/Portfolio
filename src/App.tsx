import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import './styles/main.css';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      setTimeout(() => {
        const offset = 80; // Navbar height
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Router mechanism
  const handleNavigate = (path: string) => {
    if (path.startsWith('home-')) {
      const section = path.replace('home-', '');
      window.location.hash = section;
      
      if (currentPath !== '/') {
        setCurrentPath('/');
        // Wait for page to render before scrolling
        setTimeout(() => scrollToSection(section), 150);
      } else {
        scrollToSection(section);
      }
    } else {
      window.location.hash = '';
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync state on load/back-button in case of hashes
  useEffect(() => {
    const handleHashAndPath = () => {
      const hash = window.location.hash;
      if (hash) {
        setCurrentPath('/');
        scrollToSection(hash.substring(1));
      }
    };
    
    window.addEventListener('load', handleHashAndPath);
    return () => window.removeEventListener('load', handleHashAndPath);
  }, []);

  return (
    <div className="app-container">
      {/* Background Orbs & Ambient Grids */}
      <div className="ambient-glow"></div>
      <div className="ambient-glow2"></div>
      <div className="grid-overlay"></div>

      {/* Navigation Header */}
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main Pages */}
      <main className="main-content">
        {currentPath === '/' && <Home onNavigate={handleNavigate} />}
        {currentPath === '/projects' && <ProjectsPage />}
        {currentPath === '/experience' && <ExperiencePage />}
      </main>

      {/* Footer Anchors */}
      <Footer />
    </div>
  );
};

export default App;
