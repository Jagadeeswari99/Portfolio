document.addEventListener('DOMContentLoaded', () => {
  // ─── CURSOR ───
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .about-card, .achieve-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // ─── NAV SCROLL ───
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ─── ACTIVE NAVIGATION HIGHLIGHTING ───
  const path = window.location.pathname;
  const page = path.split("/").pop().toLowerCase();
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    link.classList.remove('active');
    
    if (page.includes('project') || page.includes('case-')) {
      if (href.includes('project')) {
        link.classList.add('active');
      }
    } else if (page.includes('experience')) {
      if (href.includes('experience')) {
        link.classList.add('active');
      }
    }
  });

  // ─── SECTION SCROLL OBSERVER (HOME PAGE ONLY) ───
  if (page === "" || page === "index.html" || !page.includes('.')) {
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav-links a').forEach(a => {
            const href = a.getAttribute('href');
            a.classList.toggle('active', href === `#${id}` || href.endsWith(`#${id}`));
          });
        }
      });
    }, { threshold: 0.15, rootMargin: "-15% 0px -60% 0px" });
    sections.forEach(s => navObserver.observe(s));
  }

  // ─── HAMBURGER ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ─── REVEAL ON SCROLL ───
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // ─── SKILL BARS ───
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const skillBarsSection = document.querySelector('.skill-bars');
  if (skillBarsSection) barObserver.observe(skillBarsSection);

  // ─── SMOOTH ANCHOR ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
  
  // ─── PROJECT & TIMELINE CARDS SPOTLIGHT MOUSE GLOW EFFECT ───
  function initSpotlights() {
    document.querySelectorAll('.project-card, .timeline-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
  initSpotlights();

  // ─── TIMELINE EXPANDABLE ACCORDIONS ───
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      
      // Close other expanded cards
      document.querySelectorAll('.timeline-card.expanded').forEach(other => {
        if (other !== card) {
          other.classList.remove('expanded');
        }
      });
      
      card.classList.toggle('expanded', !isExpanded);
    });
  });

  // ─── CASE STUDY TABS SWITCHER ───
  document.querySelectorAll('.case-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      const container = btn.closest('.case-body');
      
      if (!container) return;
      
      // Deactivate other tabs and panels in this page
      container.querySelectorAll('.case-tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.case-tab-panel').forEach(p => p.classList.remove('active'));
      
      // Activate target tab and panel
      btn.classList.add('active');
      const targetPanel = container.querySelector(`#${tabId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ─── PROJECT SEARCH & CATEGORY FILTER ───
  const searchInput = document.getElementById('projectSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.directory-section .project-card');

  if (searchInput || filterBtns.length > 0) {
    let currentFilter = 'all';
    let searchQuery = '';

    const filterProjects = () => {
      projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const desc = card.querySelector('.project-desc').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.project-tech span, .project-tag'))
                          .map(t => t.textContent.toLowerCase());
        
        const category = card.dataset.category ? card.dataset.category.toLowerCase() : '';
        
        const matchesSearch = title.includes(searchQuery) || 
                              desc.includes(searchQuery) || 
                              tags.some(tag => tag.includes(searchQuery));
                              
        const matchesCategory = currentFilter === 'all' || category === currentFilter;

        if (matchesSearch && matchesCategory) {
          card.style.display = 'flex';
          card.classList.add('reveal', 'visible');
        } else {
          card.style.display = 'none';
        }
      });
    };

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterProjects();
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter.toLowerCase();
        filterProjects();
      });
    });
  }

});