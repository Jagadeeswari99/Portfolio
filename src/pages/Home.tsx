import React, { useState } from 'react';
import { TerminalConsole } from '../components/TerminalConsole';
import { SkillCanvas } from '../components/SkillCanvas';
import { Mail, MapPin, FileText, CheckCircle, Award, Cpu } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://formsubmit.co/ajax/jaga11714@gmail.com", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name}`
          })
        });
        if (response.ok) {
          setFormSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormSubmitted(false), 5000);
        } else {
          alert("Something went wrong with the email gateway. Please try again!");
        }
      } catch (err) {
        alert("Network error sending message. Please check your internet connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="home-page-container">
      {/* ─── HERO SECTION ─── */}
      <section id="about" className="hero-section">
        <div className="hero-layout">
          <div className="hero-info">
            <span className="hero-subtitle">Data Science Graduate · Machine Learning Specialist</span>
            <h1>
              I decode complex data into <span>visual intelligence</span>.
            </h1>
            <p className="hero-desc">
              Hi, I'm <strong>Jagadeeswari J M</strong>. I am a Data Science graduate skilled in Python, SQL, Machine Learning, and Data visualization. I specialize in building predictive models, analyzing complex datasets, and developing real-time dashboards to support business decision-making and product growth.
            </p>
            <div className="hero-ctas">
              <button 
                onClick={() => onNavigate('/projects')} 
                className="nav-cta" 
                style={{ cursor: 'pointer', display: 'inline-block', border: 'none' }}
              >
                View Case Studies →
              </button>
              <a 
                href="/Jagadeeswari.pdf" 
                download 
                className="filter-btn" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)' }}
              >
                <FileText size={14} />
                Download CV
              </a>
            </div>
          </div>
          
          {/* Terminal console on the right */}
          <div className="hero-visual">
            <TerminalConsole />
          </div>
        </div>
      </section>

      {/* ─── CORE INTENT / ABOUT SPLIT ─── */}
      <section id="research" className="about-split-section" style={{ borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-header">
          <div className="section-label">Research & Focus</div>
          <h2 className="section-title">Bridging Theory & Systems</h2>
          <p className="section-desc">
            My engineering work is rooted in statistical accuracy and structural efficiency. Here are the core pillars that drive my analytical workflows:
          </p>
        </div>

        <div className="contact-layout" style={{ gridTemplateColumns: '0.8fr 1.2fr', alignItems: 'center' }}>
          {/* Avatar card & bio summary */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '20px',
                background: 'var(--gradient-primary)',
                zIndex: -1,
                filter: 'blur(8px)',
                opacity: 0.6
              }}></div>
              <img 
                src={profileImg} 
                alt="Jagadeeswari J M Profile" 
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid var(--border-light)',
                  display: 'block'
                }}
              />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'Syne', fontWeight: '700' }}>Jagadeeswari J M</h4>
            <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontFamily: 'DM Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
              Tamil Nadu, India
            </p>
          </div>

          {/* Research points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="contact-card-icon" style={{ flexShrink: 0, marginTop: '2px' }}>
                <Award size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontFamily: 'Syne', fontWeight: '700', marginBottom: '0.4rem' }}>Statistical Integrity</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  I ensure every regression model or classifier undergoes rigorous cross-validation and feature significance testing. Avoiding overfitting is my core architectural standard.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="contact-card-icon" style={{ flexShrink: 0, marginTop: '2px', borderColor: 'rgba(99, 102, 241, 0.3)', color: 'var(--accent2)' }}>
                <Cpu size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontFamily: 'Syne', fontWeight: '700', marginBottom: '0.4rem' }}>Scalable Deep Learning</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Designing deep networks isn't just about compiling layers; it is about tensor optimizations, learning rate scheduling, and batch regularizations. I build modular neural models that scale efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Publications Grid */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-light)', paddingTop: '3rem' }}>
          <h3 style={{ fontFamily: 'Syne', fontSize: '1.4rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
            Featured Publications & Research
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="pub-card-hover" style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.5rem',
              borderLeft: '4px solid var(--accent)'
            }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                National Conference 2025 · Best Paper Award 🏆
              </div>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                Physics-Informed ML for Tire Degradation and Lap-Time Risk Modelling in Motorsport
              </h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Integrated physics concepts with regression and classification models for motorsport lap-time risk modeling. Achieved R² = 0.96 and Macro-F1 = 0.99.
              </p>
            </div>
            
            <div className="pub-card-hover" style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.5rem',
              borderLeft: '4px solid var(--accent2)'
            }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'var(--accent2)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                IJCER 2024 Conference · Venue: St. Francis College
              </div>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                Hybrid Intelligence for Autonomous Vehicles
              </h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Formulated an autonomous vehicle driving stack using YOLOv8 object detection, LSTM trajectory prediction (87% accuracy), and Multi-Armed Bandit optimizations.
              </p>
            </div>

            <div className="pub-card-hover" style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.5rem',
              borderLeft: '4px solid var(--accent3)'
            }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'var(--accent3)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Advanced Computational Intelligence Conference · Venue: PSG College
              </div>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                IoT & Smart Security System
              </h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                IoT-based smart security model with sensor-driven anomaly detection and low-latency cloud telemetry ingestion streaming.
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button 
              onClick={() => onNavigate('/experience')}
              className="btn-primary"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              View Full Publications Details →
            </button>
          </div>
        </div>
      </section>

      {/* ─── SKILLS CANVAS SECTION ─── */}
      <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-header">
          <div className="section-label">Capabilities</div>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-desc">
            A comprehensive overview of my technical stack, categorized by domain and weighted by practical project implementation proficiency.
          </p>
        </div>
        <SkillCanvas />
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section id="contact" style={{ borderTop: '1px solid var(--border)', background: 'rgba(25, 29, 41, 0.1)' }}>
        <div className="section-header">
          <div className="section-label">Connect</div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-desc">
            Have a predictive model to build, a dataset to analyze, or looking to collaborate? Fill out the secure form below.
          </p>
        </div>

        <div className="contact-layout">
          {/* Details list on the left */}
          <div className="contact-card-list">
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <Mail size={18} />
              </div>
              <div className="contact-card-details">
                <h4>Primary Channel</h4>
                <div className="contact-card-val">jaga11714@gmail.com</div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon" style={{ borderColor: 'rgba(99, 102, 241, 0.3)', color: 'var(--accent2)' }}>
                <MapPin size={18} />
              </div>
              <div className="contact-card-details">
                <h4>Base Location</h4>
                <div className="contact-card-val">Pudukkottai, Tamil Nadu, India</div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon" style={{ borderColor: 'rgba(245, 158, 11, 0.3)', color: 'var(--accent3)' }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
              </div>
              <div className="contact-card-details">
                <h4>GitHub Profile</h4>
                <div className="contact-card-val">
                  <a href="https://github.com/Jagadeeswari99" target="_blank" rel="noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
                    github.com/Jagadeeswari99
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon" style={{ borderColor: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6' }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </div>
              <div className="contact-card-details">
                <h4>LinkedIn Network</h4>
                <div className="contact-card-val">
                  <a href="https://www.linkedin.com/in/jagadeeswari-j-m-a55327391/" target="_blank" rel="noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
                    linkedin.com/in/jagadeeswari-j-m-a55327391
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form on the right */}
          <div className="contact-form-container">
            {formSubmitted ? (
              <div className="form-success-message" style={{ minHeight: '200px', flexDirection: 'column', gap: '12px' }}>
                <CheckCircle size={36} style={{ color: 'var(--success)' }} />
                <span>Message Received Securely!</span>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textAlign: 'center', fontWeight: 'normal' }}>
                  Thank you for reaching out, Jagadeeswari will get back to you shortly.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="form-name"
                    required
                    className="form-input"
                    placeholder=" " // required for not(:placeholder-shown) logic
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="form-name" className="form-label">Full Name</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="form-email"
                    required
                    className="form-input"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="form-email" className="form-label">Email Address</label>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    id="form-message"
                    required
                    rows={4}
                    className="form-input"
                    placeholder=" "
                    style={{ resize: 'none' }}
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  <label htmlFor="form-message" className="form-label">Message Details</label>
                </div>

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Dispatching Message...' : 'Dispatch Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
