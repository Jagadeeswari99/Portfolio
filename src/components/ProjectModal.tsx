import React, { useState, useEffect } from 'react';
import { X, Cpu, TrendingUp, Layers, Terminal } from 'lucide-react';
import type { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview');

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const renderFlowchart = (flow: string, color: string) => {
    const lines = flow.split('\n');
    const tokenRegex = /(\[[^\]]+\]|──►|◄──|│|▼|▲|──|\/|\\)/g;
    
    return lines.map((line, lineIdx) => {
      const elements: React.ReactNode[] = [];
      let currentIdx = 0;
      let match;
      
      while ((match = tokenRegex.exec(line)) !== null) {
        const matchIdx = match.index;
        
        if (matchIdx > currentIdx) {
          elements.push(line.substring(currentIdx, matchIdx));
        }
        
        const token = match[0];
        if (token.startsWith('[') && token.endsWith(']')) {
          const content = token.slice(1, -1);
          elements.push(
            <span 
              key={`box-${lineIdx}-${matchIdx}`}
              className="flowchart-box"
              style={{
                background: 'rgba(15, 17, 26, 0.75)',
                border: `1px solid ${color}90`,
                boxShadow: `0 0 10px ${color}15`,
                padding: '3px 10px',
                borderRadius: '6px',
                color: 'var(--text)',
                fontWeight: 600,
                fontSize: '0.8rem',
                display: 'inline-block',
                letterSpacing: '0.02em',
                position: 'relative',
                zIndex: 2,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {content}
            </span>
          );
        } else {
          elements.push(
            <span 
              key={`conn-${lineIdx}-${matchIdx}`}
              className="flowchart-connector"
              style={{
                color: color,
                opacity: 0.85,
                fontWeight: 'bold',
                textShadow: `0 0 8px ${color}c0`,
                position: 'relative',
                zIndex: 1,
                fontSize: '0.85rem'
              }}
            >
              {token}
            </span>
          );
        }
        
        currentIdx = tokenRegex.lastIndex;
      }
      
      if (currentIdx < line.length) {
        elements.push(line.substring(currentIdx));
      }
      
      return (
        <div key={lineIdx} style={{ minHeight: '1.6em', whiteSpace: 'pre' }}>
          {elements.length > 0 ? elements : line}
        </div>
      );
    });
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
    >
      <div 
        className="modal-wrapper" 
        onClick={(e) => e.stopPropagation()} // Stop propagation to avoid closing on inner click
        style={{
          '--proj-glow': project.glowColor || 'var(--accent)'
        } as React.CSSProperties}
      >
        {/* Modal Header */}
        <div className="modal-header-section">
          <button className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
          <div className="project-tag" style={{ color: project.glowColor || 'var(--accent)' }}>{project.tag}</div>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{project.title}</h2>
          
          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <span className="modal-meta-label">Primary Tool</span>
              <span className="modal-meta-val">{project.tech[0]}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">Category</span>
              <span className="modal-meta-val">{project.tag}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">Status</span>
              <span className="modal-meta-val" style={{ color: 'var(--success)' }}>Complete ✓</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">Scope</span>
              <span className="modal-meta-val">Production-Ready</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-section">
          {/* Tabs */}
          <div className="modal-tabs">
            <button 
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Case Overview
            </button>
            <button 
              className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              Model Architecture & KPIs
            </button>
          </div>

          {/* Tab: Overview */}
          <div className={`modal-tab-panel ${activeTab === 'overview' ? 'active' : ''}`}>
            <div className="modal-content-split">
              <div className="modal-text-content">
                <h3><Layers size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />The Challenge</h3>
                <p>{project.overview.problem}</p>

                <h3><Cpu size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Technical Approach</h3>
                <p>{project.overview.approach}</p>

                <h3><TrendingUp size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Key Achievements</h3>
                <ul>
                  {project.overview.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-visual-card">
                <h4>Performance Indicators</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="modal-kpi-row">
                      <span>{metric.label}</span>
                      <span className="modal-kpi-val" style={{ color: project.glowColor || 'var(--accent)' }}>{metric.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab: Architecture */}
          <div className={`modal-tab-panel ${activeTab === 'architecture' ? 'active' : ''}`}>
            <div className="modal-content-split">
              <div className="modal-text-content" style={{ gridColumn: 'span 2' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem' }}>
                  <Terminal size={18} style={{ color: 'var(--proj-glow)' }} />
                  Engineering Architecture
                </h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-dim)' }}>
                  Below is a conceptual blueprint of the data preprocessing, model execution, and validation pipeline constructed for this project:
                </p>
                
                <div style={{ position: 'relative', marginTop: '1.5rem' }}>
                  {/* Soft ambient background glow using the dynamic project color */}
                  <div style={{
                    position: 'absolute',
                    inset: '-8px',
                    background: 'var(--proj-glow)',
                    filter: 'blur(30px)',
                    opacity: 0.1,
                    borderRadius: '16px',
                    pointerEvents: 'none',
                    zIndex: 0
                  }} />

                  {/* Elegant Terminal Window */}
                  <div className="blueprint-terminal-container" style={{ zIndex: 1 }}>
                    <div className="blueprint-terminal-header">
                      {/* Window Controls */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', opacity: 0.85 }}></span>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308', display: 'inline-block', opacity: 0.85 }}></span>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', opacity: 0.85 }}></span>
                      </div>
                      
                      {/* Title */}
                      <div style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.05em'
                      }}>
                        pipeline_blueprint.sh
                      </div>

                      {/* Status */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.65rem',
                        color: 'var(--proj-glow)',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em'
                      }}>
                        <span className="pulse-dot" style={{ background: 'var(--proj-glow)' }}></span>
                        ONLINE
                      </div>
                    </div>

                    <div className="blueprint-terminal-body" style={{ 
                      padding: '2.2rem 1.8rem', 
                      margin: 0,
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.8rem',
                      lineHeight: '1.6'
                    }}>
                      {renderFlowchart(project.architecture, project.glowColor || 'var(--accent)')}
                    </div>

                    <div className="blueprint-terminal-footer">
                      <span>System: Antigravity-Core v1.0.4</span>
                      <span>Charset: UTF-8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
