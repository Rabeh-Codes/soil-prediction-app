import React, { useState } from 'react';
import styles from '@/styles/TutorialPage.module.css';

type TutorialSectionProps = {
  title: string;
  children: React.ReactNode;
  icon?: string;
};

type TutorialStep = {
  id: number;
  content: React.ReactNode;
};

type VideoEmbedProps = {
  videoId: string;
  title: string;
  lazyLoad?: boolean;
};

const TutorialSection: React.FC<TutorialSectionProps> = ({ title, children, icon = 'ℹ️' }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className={styles.section}>
      <h2
        className={styles.sectionHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.icon}>{icon}</span>
        {title}
        <span className={styles.chevron}>{isExpanded ? '▼' : '▶'}</span>
      </h2>
      {isExpanded && <div className={styles.sectionContent}>{children}</div>}
    </section>
  );
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId, title, lazyLoad = true }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.videoWrapper} ${isLoaded ? styles.loaded : ''}`}>
      <iframe
        loading={lazyLoad ? 'lazy' : 'eager'}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && <div className={styles.videoPlaceholder}>Loading video...</div>}
    </div>
  );
};

const TutorialPage: React.FC = () => {
  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      content: (
        <>
          Open the sidebar and choose a mode like <strong>Single Point</strong> or{' '}
          <strong>Global</strong>.
        </>
      ),
    },
    {
      id: 2,
      content: <>Enter coordinates (latitude & longitude) if required.</>,
    },
    {
      id: 3,
      content: (
        <>
          Click <strong>Submit</strong> to get soil predictions based on NASA data.
        </>
      ),
    },
    {
      id: 4,
      content: <>Visualize the results directly on the interactive map.</>,
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span role="img" aria-label="Rocket">
            🚀
          </span>{' '}
          Soil Prediction App – Tutorial
        </h1>
        <p className={styles.intro}>
          Welcome to the Soil Prediction App. This guide will help you understand how to use each
          feature effectively.
        </p>
      </header>

      <TutorialSection title="Step-by-Step Guide" icon="🔎">
        <ol className={styles.steps}>
          {tutorialSteps.map(step => (
            <li key={step.id} className={styles.step}>
              {step.content}
            </li>
          ))}
        </ol>
      </TutorialSection>

      <TutorialSection title="Video Tutorial" icon="🎥">
        <VideoEmbed
          videoId="jZB7Ci9Qq9A" // NASA ARSET: Soil Moisture Monitoring
          title="NASA Soil Moisture Monitoring Tutorial"
        />
        <p className={styles.videoCaption}>
          Learn how NASA uses satellite data for soil moisture monitoring (ARSET training video)
        </p>
      </TutorialSection>

      <TutorialSection title="Additional Resources" icon="📚">
        <ul className={styles.resourcesList}>
          <li>
            <a href="/documentation" className={styles.resourceLink}>
              Full Documentation
            </a>
          </li>
          <li>
            <a href="/faq" className={styles.resourceLink}>
              Frequently Asked Questions
            </a>
          </li>
          <li>
            <a href="/contact" className={styles.resourceLink}>
              Contact Support
            </a>
          </li>
        </ul>
      </TutorialSection>

      <footer className={styles.footer}>
        <p>Need more help? Our support team is available 24/7.</p>
        <button className={styles.contactButton}>Contact Support</button>
      </footer>
    </div>
  );
};

export default TutorialPage;
