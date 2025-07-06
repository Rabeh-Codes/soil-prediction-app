import React, { useState } from 'react';
import styles from '@/styles/DocumentationPage.module.css';

const sections = [
  { id: 'doc', label: '📄 Doc' },
  { id: 'referencing', label: '🔗 Referencing' },
  { id: 'release', label: '🚀 Release Guide' },
  { id: 'team', label: '👥 Team Member' },
  { id: 'navigate', label: '🧭 Navigate Guide' },
  { id: 'acknowledgement', label: '🙏 Acknowledgement' },
];

const DocumentationPage: React.FC = () => {
  const [selected, setSelected] = useState('doc');

  const renderContent = () => {
    switch (selected) {
      case 'doc':
        return (
          <div>
            <h2>📄 Documentation</h2>
            <p>
              This app uses NASA’s SMAP data to deliver accurate soil moisture predictions
              worldwide. The prediction is based on latitude, longitude, and selected parameters.
            </p>
          </div>
        );
      case 'referencing':
        return (
          <div>
            <h2>🔗 Referencing</h2>
            <p>
              Please cite the SMAP mission and this tool in any research: <br />
              "NASA Soil Prediction Tool, powered by SMAP Data – 2025"
            </p>
          </div>
        );
      case 'release':
        return (
          <div>
            <h2>🚀 Release Guide</h2>
            <p>
              Version 1.0.0 – Initial launch with Single Point and Global prediction. Future
              versions will support historical analysis and CSV exports.
            </p>
          </div>
        );
      case 'team':
        return (
          <div>
            <h2>👥 Team Member</h2>
            <ul>
              <li>Rabah Aouadi – Lead Developer</li>
              <li>NASA SMAP Data Team – Scientific Support</li>
            </ul>
          </div>
        );
      case 'navigate':
        return (
          <div>
            <h2>🧭 Navigate Guide</h2>
            <p>
              Use the sidebar to select prediction mode. Use top nav to access documentation,
              tutorials, and API usage.
            </p>
          </div>
        );
      case 'acknowledgement':
        return (
          <div>
            <h2>🙏 Acknowledgement</h2>
            <p>
              This tool would not be possible without the open APIs from NASA Earth Science
              Division.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <ul>
          {sections.map(section => (
            <li key={section.id}>
              <button
                onClick={() => setSelected(section.id)}
                className={`${styles.button} ${selected === section.id ? styles.active : ''}`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
};

export default DocumentationPage;
