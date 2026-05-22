import React from 'react';
import { ExternalLink, Layers } from 'lucide-react';

export interface Project {
  id: string;
  num: string;
  tag: string;
  title: string;
  desc: string;
  tech: string[];
  github?: string;
  live?: string;
  glowColor?: string; // e.g. 'rgba(0, 212, 170, 0.4)'
  overview: {
    problem: string;
    approach: string;
    achievements: string[];
  };
  metrics: {
    label: string;
    val: string;
  }[];
  architecture: string;
}

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className="project-card" 
      onMouseMove={handleMouseMove}
      style={{
        borderImage: `radial-gradient(circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${project.glowColor || 'var(--accent)'} 0%, transparent 60%) 1`,
      } as React.CSSProperties}
    >
      <div>
        <div className="project-num">{project.num}</div>
        <div className="project-tag" style={{ color: project.glowColor || 'var(--accent)' }}>{project.tag}</div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
      </div>

      <div>
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-links">
          <button 
            onClick={() => onOpenDetails(project)} 
            className="project-link" 
            style={{ cursor: 'pointer', color: 'var(--text)', background: 'none', border: 'none', font: 'inherit' }}
          >
            <Layers size={14} style={{ marginRight: '4px' }} />
            Case Details
          </button>
          
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
              <ExternalLink size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
