import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'welcome' | 'command' | 'output' | 'error' | 'success';
}

export const TerminalConsole: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [booting, setBooting] = useState(true);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootLines = [
    'Initializing Antigravity Kernel v1.0.4...',
    'Loading neural network weights for profile parameters...',
    'Establishing secure handshake with Jagadeeswari API...',
    'Loading portfolio sections: About, Experience, Projects, Contact...',
    'System status: ACTIVE. Welcome to the console!',
    'Type "help" to see a list of available commands.'
  ];

  // Run boot sequence simulation
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setHistory((prev) => [
          ...prev,
          { text: bootLines[currentLine], type: currentLine === bootLines.length - 2 ? 'success' : 'welcome' }
        ]);
        currentLine++;
      } else {
        setBooting(false);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of terminal locally (does not hijack page scrolling)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (!booting) {
      inputRef.current?.focus();
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `visitor@jaga-portfolio:~$ ${cmd}`, type: 'command' as const }];

    if (trimmed === '') {
      setHistory(newHistory);
      return;
    }

    let output: TerminalLine[] = [];

    switch (trimmed) {
      case 'help':
        output = [
          { text: 'Available commands:', type: 'welcome' },
          { text: '  about      - Learn about Jagadeeswari\'s professional focus and education', type: 'output' },
          { text: '  skills     - View technical stack in Data Science & Engineering', type: 'output' },
          { text: '  projects   - Show highlights of motorsport & autonomous systems projects', type: 'output' },
          { text: '  contact    - Retrieve verified contact channels and social profiles', type: 'output' },
          { text: '  clear      - Clear the console window', type: 'output' }
        ];
        break;

      case 'about':
        output = [
          { text: 'JAGADEESWARI J M | Data Science Graduate & ML Specialist', type: 'success' },
          { text: 'Data Science graduate skilled in Python, SQL, Machine Learning, and Data visualization. Experienced in building predictive models, analyzing complex datasets, and developing real-time dashboards. Eager to apply data-driven insights to support business decision-making and product growth.', type: 'output' },
          { text: '  • B.Sc. in Data Science - The American College (GPA: 8.7) - May 2025', type: 'welcome' },
          { text: '  • M.Sc. in Data Science - Annamalai University - Pursuing (Expected May 2027)', type: 'welcome' }
        ];
        break;

      case 'skills':
        output = [
          { text: 'TECHNICAL EXPERTISE:', type: 'success' },
          { text: '  • Languages: Python, R, SQL, Java', type: 'output' },
          { text: '  • AI & ML: PyTorch, TensorFlow, Scikit-Learn, Deep Learning, Computer Vision', type: 'output' },
          { text: '  • Data Engineering: ETL Pipelines, Hadoop MapReduce (500GB+ processed), SQL Optimization', type: 'output' },
          { text: '  • Visualization: Power BI, Tableau, Matplotlib, Seaborn, Plotly, Streamlit', type: 'output' }
        ];
        break;

      case 'projects':
        output = [
          { text: 'FEATURED PROJECTS:', type: 'success' },
          { text: '  1. DriftAI - Drift Angle Prediction Dashboard (Streamlit & Scikit-Learn)', type: 'output' },
          { text: '  2. Hybrid Intelligence - YOLOv8 + LSTM Trajectory Prediction for Autonomous Vehicles (87% accuracy)', type: 'output' },
          { text: '  3. Physics-Informed ML - Motorsport Tire Degradation Risk Modeler (Best Paper Award)', type: 'output' },
          { text: '  4. IoT & Smart Security - Sensor anomaly detection smart system (ACIDT Conference)', type: 'output' },
          { text: 'Type "projects" inside the navigation bar to see full technical details & repositories!', type: 'welcome' }
        ];
        break;

      case 'contact':
        output = [
          { text: 'GET IN TOUCH:', type: 'success' },
          { text: '  • Email: jaga11714@gmail.com', type: 'output' },
          { text: '  • Phone: +91 9025886074', type: 'output' },
          { text: '  • Location: Pudukkottai, Tamil Nadu', type: 'output' },
          { text: '  • GitHub: https://github.com/Jagadeeswari99', type: 'output' },
          { text: '  • LinkedIn: https://linkedin.com/in/jagadeeswari-j-m-a55327391/', type: 'output' }
        ];
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = [
          { text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`, type: 'error' }
        ];
        break;
    }

    setHistory([...newHistory, ...output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div className="terminal-window" onClick={handleTerminalClick} style={{ cursor: booting ? 'wait' : 'text' }}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn red"></span>
          <span className="terminal-btn yellow"></span>
          <span className="terminal-btn green"></span>
        </div>
        <div className="terminal-title">bash - visitor@jaga-portfolio:~</div>
        <div></div>
      </div>
      <div ref={terminalBodyRef} className="terminal-body">
        {history.map((line, index) => (
          <div 
            key={index} 
            className={`terminal-line ${
              line.type === 'command' 
                ? 'terminal-command' 
                : line.type === 'error' 
                  ? 'error' 
                  : line.type === 'success' 
                    ? 'success' 
                    : 'terminal-welcome'
            }`}
            style={{ 
              color: line.type === 'error' ? 'var(--error)' : line.type === 'success' ? 'var(--accent)' : line.type === 'command' ? 'var(--text)' : undefined
            }}
          >
            {line.text}
          </div>
        ))}
        {booting && (
          <div className="terminal-input-row">
            <span className="terminal-prompt">⚡</span>
            <span className="terminal-welcome">Booting, please wait...</span>
          </div>
        )}
        {!booting && (
          <div className="terminal-input-row">
            <span className="terminal-prompt">visitor@jaga-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type help..."
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};
