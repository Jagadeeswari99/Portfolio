import React, { useState } from 'react';
import { ProjectCard, type Project } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { GitHubIntegration } from '../components/GitHubIntegration';
import { Search } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'AI & MACHINE LEARNING' | 'DATA ANALYTICS' | 'HARDWARE & WEB'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsData: Project[] = [
    {
      id: 'proj-1',
      num: '01',
      tag: 'AI & MACHINE LEARNING',
      title: 'DriftAI: Motorsport Drift Angle Predictor',
      desc: 'Developed a predictive ML model to forecast drift angles for motorsport vehicles. Built an interactive Streamlit dashboard for real-time model predictions and telemetry analysis.',
      tech: ['Python', 'Scikit-Learn', 'Streamlit', 'Pandas', 'Motorsport'],
      github: 'https://github.com/Jagadeeswari99/-DriftAI-Building-an-F1-Drift-Prediction-System-with-Machine-Learning',
      glowColor: '#ff4b2b',
      overview: {
        problem: 'In motorsport vehicle dynamics, predicting and controlling drift angle (the angle between heading and velocity) is crucial for stability and slide-tuning. Legacy slip angle calculations fail under dynamic transition states.',
        approach: 'Integrated machine learning regression architectures with multi-dimensional IMU (Inertial Measurement Unit) telemetry streams. Developed an interactive Streamlit dashboard showcasing real-time predictive slips and what-if telemetry variables.',
        achievements: [
          'Achieved R² = 0.94, outperforming classic tyre-slip formulas by 18%.',
          'Reduced prediction inference latency to sub-12ms (average 11.2ms) for real-time race diagnostics.',
          'Analyzed and profiled telemetry from over 50,000+ test laps.'
        ]
      },
      metrics: [
        { label: 'Drift Fit Accuracy', val: 'R² = 0.94' },
        { label: 'Prediction Latency', val: '< 12ms' },
        { label: 'Telemetry Laps', val: '50k+' }
      ],
      architecture: `[IMU Sensor Array (Steer Angle, Yaw Rate, G-Force)]
                       │
                       ▼
         [Preprocessing & Sliding-Window Feature Extractor]
                       │
                       ▼
         [DriftAI Model Core (XGBoost & Random Forest Regressors)]
                       │
                       ▼
         [Streamlit Telemetry Hub / Dashboard Visualizer]`
    },
    {
      id: 'proj-2',
      num: '02',
      tag: 'AI & MACHINE LEARNING',
      title: 'Hybrid Intelligence for Autonomous Vehicles',
      desc: 'End-to-end autonomous vehicle decision system using YOLOv8 object detection, LSTM trajectory prediction (87% accuracy), deployed via Streamlit at 45 FPS.',
      tech: ['YOLOv8', 'LSTM', 'Streamlit', 'Python', 'Deep Learning', 'PyTorch'],
      github: 'https://github.com/Jagadeeswari99/Hybrid-Intelligence-for-Autonomous-Vehicles',
      glowColor: '#8a2be2',
      overview: {
        problem: 'Autonomous highway driving demands both immediate local object avoidance and long-term trajectory forecasting. Sequential visual modeling pipelines suffer from high processing delays and high error bounds.',
        approach: 'Developed a multi-modal hybrid pipeline using YOLOv8 for localized computer vision/object detection and a PyTorch LSTM network to predict highway trajectory vectors. Integrated a bandit-based arbitration algorithm.',
        achievements: [
          'Achieved 87% trajectory prediction accuracy over standard highway datasets.',
          'Processed real-time streaming video feeds at 45 FPS using lightweight CPU quantization.',
          'Integrated Multi-Armed Bandit optimization to arbitrate steering control.'
        ]
      },
      metrics: [
        { label: 'Trajectory Accuracy', val: '87.0%' },
        { label: 'Video Frame Rate', val: '45 FPS' },
        { label: 'Object mAP Score', val: '0.915' }
      ],
      architecture: `[Highway Video Stream] ──► [YOLOv8 Object Detection (45 FPS)] ──► [Object Bounding Boxes]
                                                                                │
                                                                                ▼
     [Target Coordinates]  ──► [LSTM Spatial Trajectory Prediction] ──► [Predicted Path (87%)]
                                                                                │
                                                                                ▼
     [Bandit Arbitrator]   ──► [PPO Deep Reinforcement Learning Agent] ──► [Steering/Throttle Control]`
    },
    {
      id: 'proj-3',
      num: '03',
      tag: 'AI & MACHINE LEARNING',
      title: 'Physics-Informed ML for Tire Degradation',
      desc: 'Interpretable ML framework integrating physics equations with classification/regression models for motorsport lap-time risk modeling. R² = 0.96 and Macro-F1 = 0.99. Won Best Paper Award.',
      tech: ['Python', 'PyTorch', 'Physics Formulation', 'Statistical Modeling', 'XGBoost'],
      github: 'https://github.com/Jagadeeswari99/Physics-Informed-Machine-Learning-for-Tire-Degradation-and-Lap-Time-Risk-Modelling-in-Motorsport1',
      glowColor: '#ff6347',
      overview: {
        problem: 'Motorsport tire degradation is highly volatile, yet critical for race strategy. Standard data-driven models lack physical interpretability, while pure physics-based tyre models fail under dynamic track temperature fluctuations.',
        approach: 'Engineered a Physics-Informed Neural Network (PINN) that embeds thermal thermodynamic and tire-slip physics directly into the loss function of gradient-boosted and deep learning models.',
        achievements: [
          'Achieved an outstanding R² = 0.96 for continuous tire wear forecasting.',
          'Obtained a Macro-F1 = 0.99 for lap-time degradation risk classification.',
          'Awarded the Best Paper Award at a national research conference in 2025.'
        ]
      },
      metrics: [
        { label: 'Wear Prediction', val: 'R² = 0.96' },
        { label: 'Risk Macro-F1', val: '0.99' },
        { label: 'Physics Constraint', val: '0.35' }
      ],
      architecture: `[Motorsport Telemetry Inputs] ──► [Neural Network / XGBoost Estimator] ──► [Wear Predictions]
                                                        │
                                                        ▼
                                       [Thermodynamic Physics Loss Constraint]
                                                        │
                                                        ▼
                                       [PINN Backpropagation Gradient Adjust]`
    },
    {
      id: 'proj-4',
      num: '04',
      tag: 'HARDWARE & WEB',
      title: 'IoT & Smart Security System',
      desc: 'IoT-based smart security system with sensor-driven anomaly detection and intelligent monitoring. Presented at the Advanced Computational Intelligence & Disruptive Technologies Conference.',
      tech: ['IoT Sensors', 'Python', 'Raspberry Pi', 'Cloud Datastores', 'Data Analytics'],
      glowColor: '#ffc107',
      overview: {
        problem: 'Traditional smart home security architectures rely on simple threshold triggers, resulting in high false-alarm rates and a lack of real-time multi-sensor fusion.',
        approach: 'Programmed microcontroller firmware to ingest sensor telemetry (PIR, ultrasonic, temperature) in real-time, sending data through structured streaming to a cloud pipeline running a custom statistical anomaly detector.',
        achievements: [
          'Built real-time sensor ingestion streaming with a latency of less than 150ms.',
          'Developed a statistical anomaly model that reduced false alarms by 65% compared to baseline sensors.',
          'Presented the peer-reviewed architecture at the Advanced Computational Intelligence Conference (PSG College).'
        ]
      },
      metrics: [
        { label: 'Ingestion Latency', val: '< 150ms' },
        { label: 'False Alarm Reduc.', val: '65.0%' },
        { label: 'Anomaly F1 Score', val: '0.932' }
      ],
      architecture: `[PIR / Ultrasonic / Temp Sensors] ──► [ESP32 Microcontroller Ingestion]
                                                          │
                                                          ▼
                                            [MQTT Streaming Protocol Link]
                                                          │
                                                          ▼
     [Anomaly Threshold Evaluator]      ◄── [Real-time Cloud Datastore Stack]
                                                          │
                                                          ▼
                                            [Interactive Security Dashboard]`
    },
    {
      id: 'proj-5',
      num: '05',
      tag: 'DATA ANALYTICS',
      title: 'Data Mining Experiments — R Analytics Suite',
      desc: 'Comprehensive data mining pipeline in R covering classification (Naïve Bayes, KNN, SVM), clustering (K-Means, K-Medoids), association mining (Apriori), and statistical preprocessing on real-world datasets.',
      tech: ['R Language', 'ggplot2', 'caret', 'arules', 'e1071'],
      glowColor: '#00bcd4',
      overview: {
        problem: 'Unstructured data profiling lacks rigorous comparative modeling, making it difficult to select optimal classification or clustering algorithms for specific dataset topologies.',
        approach: 'Constructed an end-to-end analytical suite in R. Programmed custom pre-processing pipelines, comparative cross-validation grids, and rich data mining plots detailing statistical boundaries.',
        achievements: [
          'Evaluated and compared SVM, KNN, and Naïve Bayes classifiers across 6 benchmark datasets.',
          'Mapped out transaction clusters using Apriori association rules, discovering high-lift affinities.',
          'Generated custom hyper-parameter search spaces, improving accuracy across all data subsets by 14%.'
        ]
      },
      metrics: [
        { label: 'Dataset Benchmarks', val: '6 Real-world' },
        { label: 'Accuracy Boost', val: '+ 14.0%' },
        { label: 'Association Lift', val: '> 2.0' }
      ],
      architecture: `[Raw Multivariate CSVs] ──► [R preprocess.R (Z-Score Scaling & Imputation)]
                                                    │
                                                    ▼
                             [caret Multi-Model Train & Hyperparameter Search]
                                    /               │               \
                                   ▼                ▼                ▼
                           [SVM Classification]  [K-Means Clustering]  [Apriori Mining]
                                   \                │               /
                                    ▼               ▼              ▼
                              [ggplot2 Statistical Boundary Decision Visuals]`
    },
    {
      id: 'proj-6',
      num: '06',
      tag: 'DATA ANALYTICS',
      title: 'F1 Dashboard — Race Telemetry Visualizer',
      desc: 'Interactive web dashboard for visualizing Formula 1 race telemetry. Pulls live sector comparisons, tire configurations, and lap-by-lap speeds using FastF1 API.',
      tech: ['FastF1', 'Python', 'Flask', 'Chart.js', 'JavaScript', 'Telemetry'],
      glowColor: '#39ff14',
      overview: {
        problem: 'Formula 1 telemetry is highly complex and time-synchronized. Existing analytics software is either proprietary or lacks user-friendly web access for real-time race-engineering reviews.',
        approach: 'Developed a Python Flask backend utilizing FastF1 to pull telemetry, sector times, and tyre compound logs. Designed a high-performance Chart.js client with responsive layouts and sector comparative highlights.',
        achievements: [
          'Built seamless synchronization showing lap speeds, throttle/brake telemetry, and tire strategies.',
          'Reduced data fetching and caching overhead by 50% via intelligent local telemetry indexes.',
          'Renders real-time dynamic charts under 200ms latency.'
        ]
      },
      metrics: [
        { label: 'Telemetry Latency', val: '< 200ms' },
        { label: 'Cache Savings', val: '50.0%' },
        { label: 'Telemetry/Lap', val: '10k+ Pts' }
      ],
      architecture: `[F1 Database / FastF1 API] ──► [Flask Backend Telemetry Scraper] ──► [Cached Local JSON]
                                                                                   │
                                                                                   ▼
     [Responsive Controls]       ──► [Chart.js Interactive Visualization]  ◄── [Sector Index]
                                                                                   │
                                                                                   ▼
                                     [Dynamic Telemetry Steering Compare]`
    },
    {
      id: 'proj-7',
      num: '07',
      tag: 'HARDWARE & WEB',
      title: 'Academic GPA & CGPA Analytics Calculator',
      desc: 'A premium client-side analytics calculator built specifically for Annamalai University grades. Features a Tesseract.js OCR transcript scanner, target what-if forecasting, and history persistence.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Tesseract.js OCR', 'Local Storage'],
      github: 'https://github.com/Jagadeeswari99/CGPA_Calculator',
      glowColor: '#2196f3',
      overview: {
        problem: 'Annamalai University uses a highly unique grade-point system that makes CGPA calculation tedious. Manual data entry of multiple semesters is slow and highly prone to typing errors.',
        approach: 'Created a responsive frontend application equipped with a client-side Tesseract.js optical character recognition engine. Built a dynamic parser that extracts grades from result screenshots.',
        achievements: [
          'Implemented an offline transcript OCR scanner that extracts semester grades with 96% accuracy.',
          'Created a target forecasting model to calculate the grades needed to reach a desired CGPA.',
          'Persisted calculation histories securely inside standard localStorage.'
        ]
      },
      metrics: [
        { label: 'OCR Scanner Accuracy', val: '96.0%' },
        { label: 'GPA Calc Latency', val: 'Instant' },
        { label: 'Semesters Cached', val: 'Up to 8' }
      ],
      architecture: `[Screenshot of Grades / Camera] ──► [Tesseract.js Client OCR Engine]
                                                           │
                                                           ▼
                                            [Dynamic Regex Text Parser]
                                                           │
                                                           ▼
     [Target Forecast Models]          ◄── [Annamalai University Grade Matcher]
                                                           │
                                                           ▼
     [Secure localStorage System]      ◄── [Interactive CGPA / GPA Dashboard]`
    },
    {
      id: 'proj-8',
      num: '08',
      tag: 'AI & MACHINE LEARNING',
      title: 'Cognifyz Data Science Analytics Suite',
      desc: 'Exploratory data profiling, predictive rating regression, and multi-variable sentiment classification built on complex restaurant rating reviews.',
      tech: ['Python', 'Scikit-Learn', 'Pandas', 'NLTK', 'Matplotlib', 'Sentiment Classification'],
      github: 'https://github.com/Jagadeeswari99/Cognifyz-Data-Science-Internship',
      glowColor: '#ff5722',
      overview: {
        problem: 'Restaurant reviews are highly unstructured and rich in sentiment. Standard rating averages fail to capture complex, multi-variable customer satisfaction levels.',
        approach: 'Built an integrated Data Science pipeline. Performed extensive exploratory data profiling, engineered multi-variable sentiment classification using NLTK sentiment libraries, and trained regression estimators to forecast restaurant rating targets.',
        achievements: [
          'Developed a multi-label sentiment classifier that categorized reviews with 91% precision.',
          'Achieved predictive regression scores with a Mean Absolute Error of 0.12 on rating targets.',
          'Automated an exploratory profiling dashboard that outputs correlation heatmaps in seconds.'
        ]
      },
      metrics: [
        { label: 'Sentiment Precision', val: '91.0%' },
        { label: 'Rating Forecast MAE', val: '0.12' },
        { label: 'Reviews Profiled', val: '25,000+' }
      ],
      architecture: `[Restaurant Dataset / Reviews] ──► [NLTK Sentiment Extraction & Preprocess]
                                                           │
                                                           ▼
                                              [TF-IDF N-Gram Feature Vectors]
                                                           │
                                                           ▼
     [Rating Regression Predictor]      ◄── [Scikit-Learn Pipeline Core]
                                                           │
                                                           ▼
                                            [Interactive Seaborn Dashboard]`
    },
    {
      id: 'proj-9',
      num: '09',
      tag: 'AI & MACHINE LEARNING',
      title: 'Saiket Systems Telco Churn Predictor',
      desc: 'A highly tuned machine learning churn analysis system complete with feature correlations, importance indicators, and precision-recall optimizations.',
      tech: ['Python', 'XGBoost', 'Random Forest', 'Jupyter Notebook', 'Seaborn', 'Correlation Analysis'],
      glowColor: '#00d4aa',
      overview: {
        problem: 'Telecom customer attrition is volatile. Identifying high-risk cohorts with high precision and recall is critical to designing targeted retention strategies.',
        approach: 'Developed a robust telecom churn prediction pipeline. Addressed extreme class imbalances using SMOTE (Synthetic Minority Over-sampling Technique), plotted advanced mathematical correlation matrices, and tuned gradient boosting ensembles.',
        achievements: [
          'Tuned XGBoost and Random Forest models achieving an outstanding F1-score of 92.4%.',
          'Engineered feature-importance pipelines that isolated key churn risk indicators.',
          'Delivered comprehensive analytical telemetry reports to support high-stakes retention workflows.'
        ]
      },
      metrics: [
        { label: 'F1 Churn Accuracy', val: '92.4%' },
        { label: 'SMOTE Class Balance', val: '1:1 Ratio' },
        { label: 'Predictive Features', val: '28 Dynamic' }
      ],
      architecture: `[Telco Billing & Usage Logs] ──► [SMOTE Imbalance Correction & EDA]
                                                        │
                                                        ▼
                                        [GridSearchCV Hyper-parameter Search]
                                                        │
                                                        ▼
                                    [XGBoost & Random Forest Model Pipeline]
                                                        │
                                                        ▼
     [Retention Target Cohorts]      ◄── [Feature Importance & ROC-AUC Curves]`
    }
  ];

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter === 'ALL' || project.tag === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="projects-showcase-section" style={{ marginTop: '80px', minHeight: '85vh' }}>
      <div className="section-header">
        <div className="section-label">Case Studies</div>
        <h2 className="section-title">Technical Projects</h2>
        <p className="section-desc">
          Explore my deep learning classifications, regression ensembles, and telemetry dashboards. Click on "Case Details" to explore the underlying architectures and performance KPIs.
        </p>
      </div>

      <div className="projects-showcase">
        {/* Toolbar: Search and Filter */}
        <div className="toolbar-wrap">
          <div className="search-wrapper">
            <Search className="search-icon" size={14} />
            <input 
              type="text" 
              className="search-input"
              placeholder="Search projects by tech (e.g. PyTorch, XGBoost)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-bar">
            {(['ALL', 'AI & MACHINE LEARNING', 'DATA ANALYTICS', 'HARDWARE & WEB'] as const).map((tag) => (
              <button
                key={tag}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontFamily: 'DM Mono', fontSize: '0.9rem' }}>
            No projects found matching search query or filter tags.
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenDetails={handleOpenDetails} 
              />
            ))}
          </div>
        )}

        {/* Dynamic GitHub Repos Banner */}
        <GitHubIntegration />
      </div>

      {/* Case Details Popup Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};
