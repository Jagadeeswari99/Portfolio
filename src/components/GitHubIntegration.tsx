import React, { useEffect, useState } from 'react';
import { Star, GitFork, BookOpen, AlertCircle } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export const GitHubIntegration: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cached fallback list in case of GitHub API rate-limiting or network issues
  const fallbackRepos: GitHubRepo[] = [
    {
      id: 1,
      name: 'portfolio',
      description: 'Futuristic developer and data science portfolio built with React, TypeScript, and modern glassmorphic styling.',
      html_url: 'https://github.com/Jagadeeswari99/portfolio',
      stargazers_count: 1,
      forks_count: 0,
      language: 'TypeScript'
    },
    {
      id: 2,
      name: 'Data-Science-Projects',
      description: 'Comprehensive repository covering tabular classifications, PyTorch neural networks, EDA suites, and regression equations.',
      html_url: 'https://github.com/Jagadeeswari99/Data-Science-Projects',
      stargazers_count: 0,
      forks_count: 0,
      language: 'Python'
    },
    {
      id: 3,
      name: 'NLP-Text-Classifier',
      description: 'Clean pipelines for loading raw texts, extracting TF-IDF features, training Naive Bayes and Logistic Regression classifiers.',
      html_url: 'https://github.com/Jagadeeswari99/NLP-Text-Classifier',
      stargazers_count: 0,
      forks_count: 0,
      language: 'Jupyter Notebook'
    }
  ];

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Jagadeeswari99/repos?sort=updated&per_page=12');
        if (!response.ok) {
          throw new Error('API limit reached or user not found');
        }
        const data = await response.json();
        
        // Filter out fork repositories and sort by stars/update
        const filtered: GitHubRepo[] = data
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'A highly technical data analysis or machine learning development repository.',
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language || 'Python'
          }))
          .slice(0, 6); // Keep top 6 repos

        setRepos(filtered.length > 0 ? filtered : fallbackRepos);
      } catch (err) {
        console.warn('Using local fallback repo list due to:', err);
        setRepos(fallbackRepos);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <div className="github-footer-banner">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Active Code Repositories</h3>
        <p>
          I am actively committing open-source projects, Jupyter Notebook analytical walkthroughs, and responsive React applications.
        </p>
        <a 
          href="https://github.com/Jagadeeswari99" 
          target="_blank" 
          rel="noreferrer" 
          className="github-banner-btn"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
          Follow on GitHub
        </a>
      </div>

      {loading && (
        <div style={{ marginTop: '3rem', color: 'var(--text-muted)', fontFamily: 'DM Mono', fontSize: '0.85rem' }}>
          <span>$ curl -X GET api.github.com/repos... loading feeds</span>
          <div className="terminal-prompt" style={{ display: 'inline-block', marginLeft: '6px', animation: 'orbPulse 1.2s infinite' }}>■</div>
        </div>
      )}

      {!loading && (
        <>
          {error && (
            <div 
              style={{ 
                marginTop: '1.5rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '0.72rem', 
                color: 'var(--accent3)',
                fontFamily: 'DM Mono' 
              }}
            >
              <AlertCircle size={12} />
              <span>Offline Cache loaded (API rate limit exceeded)</span>
            </div>
          )}
          <div className="github-repos-grid">
            {repos.map((repo) => (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer" 
                className="github-repo-card"
              >
                <div>
                  <div className="repo-header">
                    <BookOpen size={16} style={{ color: 'var(--accent2)' }} />
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'DM Mono' }}>PUBLIC</span>
                  </div>
                  <h4 className="repo-title">{repo.name}</h4>
                  <p className="repo-desc">{repo.description}</p>
                </div>
                
                <div className="repo-footer">
                  <span style={{ color: repo.language === 'TypeScript' ? '#3178c6' : repo.language === 'Python' ? '#3572A5' : 'var(--accent)' }}>
                    ● {repo.language}
                  </span>
                  <div className="repo-stats">
                    <span className="repo-stat-item">
                      <Star size={10} />
                      {repo.stargazers_count}
                    </span>
                    <span className="repo-stat-item">
                      <GitFork size={10} />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
