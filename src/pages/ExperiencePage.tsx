import React from 'react';
import { CareerTimeline } from '../components/CareerTimeline';
import { Award, GraduationCap, Scroll, FileText } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const certifications = [
    { title: 'Data Visualization: Empowering Business with Insights', issuer: 'TATA' },
    { title: 'Diploma in MySQL and Statistics for Data Analysis', issuer: 'Academic' },
    { title: 'Data Science & Analytics', issuer: 'HP (2024)' },
    { title: 'Data Science 101 (DS0101EN)', issuer: 'IBM' },
    { title: 'Big Data Hadoop Certification', issuer: 'IIT Allahabad' },
    { title: 'IoT & Robotics Fundamentals', issuer: 'Corizo' }
  ];

  const publications = [
    {
      title: 'Hybrid Intelligence for Autonomous Vehicles',
      venue: 'IJCER 2024 Conference | Venue: St. Francis College',
      desc: 'Formulated a multi-modal autonomous highway driving architecture using YOLOv8 object detection, LSTM trajectory prediction (87% accuracy), and Multi-Armed Bandit model arbitration.',
      accent: 'var(--accent2)'
    },
    {
      title: 'Physics-Informed Machine Learning for Tire Degradation and Lap-Time Risk Modelling in Motorsport',
      venue: 'National Conference 2025 | Honor: Won Best Paper Award 🏆',
      desc: 'Developed a Physics-Informed Neural Network (PINN) integrating thermodynamics and slip equations into deep models to predict tire wear. Achieved R² = 0.96 and Macro-F1 = 0.99.',
      accent: 'var(--accent)'
    },
    {
      title: 'IoT & Smart Security System',
      venue: 'Advanced Computational Intelligence & Disruptive Technologies Conference | Venue: PSG College',
      desc: 'Designed an IoT-based smart security model leveraging sensor telemetry streaming, low-latency microcontrollers, and cloud-hosted statistical anomaly detection.',
      accent: 'var(--accent3)'
    }
  ];

  return (
    <section id="experience" className="experience-timeline-section" style={{ marginTop: '80px', minHeight: '85vh', paddingBottom: '5rem' }}>
      <div className="section-header">
        <div className="section-label">Trajectory</div>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-desc">
          Chronological timeline detailing my engineering roles, open-source work, and academic research collaborations. Click any card to expand high-level contribution summaries.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Experience Timeline Widget */}
        <CareerTimeline />

        {/* ─── EDUCATION & CREDENTIALS ─── */}
        <div style={{ marginTop: '6rem', borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
          <div className="section-label">Credentials</div>
          <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2.5rem' }}>Education & Certifications</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {/* Education: Master's */}
            <div style={{
              background: 'rgba(26, 29, 41, 0.3)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <GraduationCap size={24} style={{ color: 'var(--accent)', marginBottom: '1.2rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontFamily: 'Syne', fontWeight: '700', marginBottom: '0.4rem' }}>Master of Science in Data Science</h4>
              <p style={{ color: 'var(--accent)', fontSize: '0.78rem', fontFamily: 'DM Mono', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Annamalai University, Chidambaram
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Pursuing (Expected May 2027). Coursework includes Deep Learning architectures, Multi-variable statistical modeling, Big Data pipelines, and R/Python analytics.
              </p>
            </div>

            {/* Education: Bachelor's */}
            <div style={{
              background: 'rgba(26, 29, 41, 0.3)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <GraduationCap size={24} style={{ color: 'var(--accent2)', marginBottom: '1.2rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontFamily: 'Syne', fontWeight: '700', marginBottom: '0.4rem' }}>Bachelor of Science in Data Science</h4>
              <p style={{ color: 'var(--accent2)', fontSize: '0.78rem', fontFamily: 'DM Mono', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                The American College, Madurai
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Graduated May 2025. GPA achieved: <strong>8.7 / 10</strong>. Specialized in Machine Learning classifiers, mathematical analysis, and real-time dashboard visualization.
              </p>
            </div>
          </div>

          {/* Certifications Subsection */}
          <h4 style={{ fontFamily: 'Syne', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} style={{ color: 'var(--accent3)' }} />
            Verified Professional Certifications
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '4rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              className="cert-card-hover"
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0, 212, 170, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Scroll size={14} style={{ color: 'var(--accent3)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)', lineHeight: '1.3' }}>{cert.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'DM Mono', marginTop: '2px' }}>{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RESEARCH PUBLICATIONS & PAPERS ─── */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
          <div className="section-label">Research Works</div>
          <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2.5rem' }}>Publications & Conference Papers</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {publications.map((pub, idx) => (
              <div key={idx} style={{
                background: 'rgba(26, 29, 41, 0.2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease'
              }}
              className="pub-card-hover"
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '4px',
                  height: '100%',
                  background: pub.accent
                }}></div>

                <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border)',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    color: pub.accent,
                    flexShrink: 0
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      fontFamily: 'DM Mono',
                      fontSize: '0.72rem',
                      color: pub.accent,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-light)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      marginBottom: '0.8rem',
                      textTransform: 'uppercase'
                    }}>
                      Conference Paper
                    </span>
                    <h4 style={{ fontFamily: 'Syne', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text)' }}>
                      {pub.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'DM Mono', marginBottom: '1rem' }}>
                      {pub.venue}
                    </p>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {pub.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
