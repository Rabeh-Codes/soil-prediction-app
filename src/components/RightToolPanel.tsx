import { useState, memo } from 'react';
import styles from '@/styles/RightToolPanel.module.scss';
interface RightToolPanelProps {
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
}
const RightToolPanel = ({
  selectedOption, setSelectedOption
} : RightToolPanelProps
) => {
  const [showButtons, setShowButtons] = useState(false);
const [activeButton, setActiveButton] = useState<string | null>(null);
  return (
    <div className={styles['panel-container']}>
      <button
        className={styles['toggle-button']}
        onClick={() => setShowButtons(!showButtons)}
      >
        {showButtons ? '>>' : '☰'}
      </button>

      {showButtons && (
        <div className={styles['button-group']}>
          <button className={styles['panel-button']} onClick={() => setActiveButton('faq')}>❓ FAQ</button>
          <button className={styles['panel-button']} onClick={() => setActiveButton('plots')}>📊 Advanced Plots</button>
          <button className={styles['panel-button']} onClick={() => setActiveButton('Comparative')}>📈 Comparative</button>
          <button className={styles['panel-button']} onClick={() => setActiveButton('Description')}>📑 Description</button>
          <button className={styles['panel-button']} onClick={() => setActiveButton('Home')}>🏠 Home</button>
        </div>
      )}
      {activeButton === 'faq' && <div className={styles['sidebar']}>FAQ content here</div>}
    {activeButton === 'plots' && <div className={styles['sidebar']}>Advanced Plots content here</div>}
    {activeButton === 'comparative' && <div className={styles['sidebar']}>Comparative Analysis content</div>}
    {activeButton === 'description' && <div className={styles['sidebar']}>Descriptive Statistics content</div>}
    {activeButton === 'home' && <div className={styles['sidebar']}>Welcome Home!</div>}
    </div>
  );
};

export default memo(RightToolPanel);