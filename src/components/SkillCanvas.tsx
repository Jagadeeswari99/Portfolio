import React, { useEffect, useState } from 'react';
import { Database, Cpu, Code } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const SkillCanvas: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation short delay after mount
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const categories: SkillCategory[] = [
    {
      title: 'Data Science & Machine Learning',
      icon: <Database className="accent-icon" style={{ color: 'var(--accent)' }} />,
      skills: [
        { name: 'Machine Learning & Ensemble Pipelines', level: 95 },
        { name: 'Deep Learning & Neural Architectures', level: 92 },
        { name: 'Computer Vision (YOLOv8 & LSTM)', level: 90 },
        { name: 'R/Statistics & Data Mining Algorithms', level: 92 },
      ],
    },
    {
      title: 'Data Analysis, SQL & Big Data',
      icon: <Cpu className="accent-icon" style={{ color: 'var(--accent2)' }} />,
      skills: [
        { name: 'Exploratory Profiling & Predictive Analytics', level: 96 },
        { name: 'SQL Query Tuning & ETL Pipelines', level: 93 },
        { name: 'Hadoop Core Batch Analytics (500GB+)', level: 88 },
        { name: 'Business Intelligence (Power BI & Tableau)', level: 91 },
      ],
    },
    {
      title: 'Software & Infrastructure Engineering',
      icon: <Code className="accent-icon" style={{ color: 'var(--accent3)' }} />,
      skills: [
        { name: 'Python Automation Systems & Scripting', level: 96 },
        { name: 'Core Web Engineering (ES6+ JS / React / TS)', level: 89 },
        { name: 'Git Standardization & Unified Workflows', level: 94 },
        { name: 'IoT Telemetry & Embedded Systems', level: 87 },
      ],
    },
  ];

  return (
    <div className="skills-canvas">
      {categories.map((category, index) => (
        <div key={index} className="skill-category-card">
          <h3 className="skill-category-title">
            {category.icon}
            {category.title}
          </h3>
          <div className="skill-bars">
            {category.skills.map((skill, sIndex) => (
              <div key={sIndex} className="skill-bar-item">
                <div className="skill-bar-meta">
                  <span className="skill-bar-name">{skill.name}</span>
                  <span className="skill-bar-val">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: animate ? `${skill.level}%` : '0%',
                      background: index === 0 
                        ? 'var(--gradient-cool)' 
                        : index === 1 
                          ? 'var(--gradient-primary)' 
                          : 'var(--gradient-secondary)'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
