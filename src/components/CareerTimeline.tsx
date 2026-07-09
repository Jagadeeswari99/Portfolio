import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

interface TimelineItem {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
}

export const CareerTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('exp-1'); // Expand first item by default

  const timelineData: TimelineItem[] = [
    {
      id: 'exp-1',
      role: 'Software Development Intern',
      org: 'PRCBO Technologies',
      period: 'May 2026 - Jun 2026',
      location: 'Remote',
      summary: 'Completed a two-month internship in software development, successfully delivering assigned project tasks with professionalism, dedication, and a strong willingness to learn.',
      bullets: [
        'Completed a two-month internship in software development at PRCBO Technologies.',
        'Delivered assigned tasks and project work with dedication, professionalism, and strong ownership.',
        'Contributed to the team while strengthening technical and professional skills.',
        'Built a solid foundation in software development workflows and industry practices.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Data Science Intern',
      org: 'mydailywork Professional Services',
      period: 'May 2026 - June 2026',
      location: 'Remote',
      summary: 'Engineered Python automation scripts and performed extensive exploratory data analysis and statistical profiling.',
      bullets: [
        'Engineered robust Python automation scripts reducing daily data processing overhead by 45%.',
        'Performed extensive exploratory data analysis, data cleaning, and statistical profiling on multivariate company metrics.',
        'Designed predictive scoring systems using Scikit-Learn libraries to track operational efficiency in real-time.',
        'Constructed clean, tabular visualization reports using Seaborn and Matplotlib for executive decision-making.'
      ]
    },
    {
      id: 'exp-3',
      role: 'Machine Learning Intern',
      org: 'Saiket Systems',
      period: 'Nov - Dec 2024',
      location: 'Remote',
      summary: 'Developed an end-to-end customer churn prediction pipeline utilizing XGBoost and Random Forest.',
      bullets: [
        'Developed an end-to-end customer churn prediction pipeline utilizing XGBoost and Random Forest architectures on large datasets.',
        'Plotted advanced mathematical visualizations including correlation matrices, feature importances, and ROC-AUC curves.',
        'Evaluated models achieving excellent precision-recall scores for high-stakes business-level reporting.',
        'Optimized hyperparameters using GridSearchCV, resulting in significant F1-score performance improvements.'
      ]
    },
    {
      id: 'exp-4',
      role: 'IoT & Robotics Intern',
      org: 'Corizo',
      period: 'Jul - Aug 2024',
      location: 'Remote',
      summary: 'Integrated micro-sensor hardware feeds directly with predictive model layers to detect abnormal temperature fluctuations.',
      bullets: [
        'Integrated IoT sensors with machine learning models for real-time anomaly detection.',
        'Developed robotics control systems using Python and embedded programming.',
        'Implemented sensor data analytics pipelines for predictive maintenance.',
        'Created interactive dashboards for IoT device monitoring and control.'
      ]
    },
    {
      id: 'exp-5',
      role: 'Data Analytics Intern',
      org: 'Intellizy Studio',
      period: 'Jun - Jul 2024',
      location: 'Remote',
      summary: 'Cleaned, restructured, and profiled raw multivariate corporate metrics inside Power BI and Tableau visualization frameworks.',
      bullets: [
        'Performed exploratory data analysis on large datasets identifying key business insights.',
        'Created interactive dashboards and reports using Power BI and Tableau, saving 20+ hours of manual work weekly.',
        'Applied statistical modeling techniques to solve complex business problems.',
        'Automated reporting processes and performed statistical A/B test modeling, improving click rates.'
      ]
    },
    {
      id: 'exp-6',
      role: 'Big Data Engineering Intern',
      org: 'IIT Allahabad (Hadoop Core)',
      period: 'May - Jun 2024',
      location: 'Allahabad, India',
      summary: 'Engineered batch processing routines on Hadoop MapReduce for big data analytics datasets exceeding 500GB.',
      bullets: [
        'Processed 500GB+ datasets using Hadoop MapReduce framework.',
        'Optimized ETL pipelines in SQL, decreasing query times by 35% and computing overheads by 40%.',
        'Conducted partition tuning and index rebuilding to remove query execution bottlenecks.',
        'Delivered technical reports on clustered file system performances and MapReduce job efficiencies.'
      ]
    },
    {
      id: 'exp-7',
      role: 'Data Science & Machine Learning Intern',
      org: 'Edureka Enterprise',
      period: 'Dec 2023',
      location: 'Remote',
      summary: 'Developed predictive models achieving 92% accuracy on customer churn datasets and built automated ML pipelines.',
      bullets: [
        'Developed predictive models achieving 92% accuracy on customer churn datasets.',
        'Built automated ML pipelines reducing model deployment time by 60%.',
        'Conducted comprehensive data preprocessing and feature engineering for real-world analytics.',
        'Collaborated with cross-functional teams to deliver data-driven business insights.'
      ]
    }
  ];

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      {timelineData.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={item.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div 
              className={`timeline-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => handleCardClick(item.id)}
            >
              <div className="timeline-header-meta">
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-period">
                  <Calendar size={12} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} />
                  {item.period}
                </div>
              </div>
              <div className="timeline-org" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{item.org}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <MapPin size={10} />
                  {item.location}
                </span>
              </div>
              <p className="timeline-summary">{item.summary}</p>
              
              <div className="timeline-drawer">
                <ul className="timeline-bullets">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="timeline-toggle-indicator">
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp size={12} />
                  </>
                ) : (
                  <>
                    <span>Click to expand details</span>
                    <ChevronDown size={12} />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
