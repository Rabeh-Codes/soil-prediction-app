// src/components/SinglePointView.tsx
import { useState } from "react";
import styles from './SinglePointView.module.scss';

function SinglePointView() {
  const [latitude, setLatitude] = useState<number>(36.75);
  const [longitude, setLongitude] = useState<number>(3.06);
  const [community, setCommunity] = useState<string>("");
  const [temporal, setTemporal] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Community:", community);
    console.log("Temporal Level:", temporal);
    alert("Submitted! (Check the console)");
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>Single Point Data Request</h3>
        <button 
          className={styles['expandButton']}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className={styles['form']}>
          <div className={styles['inputGroup']}>
            <label className={styles['label']}>Latitude:</label>
            <input
              type="number"
              value={latitude}
              min={-90}
              max={90}
              step="0.0001"
              onChange={(e) => setLatitude(Number(e.target.value))}
              required
              className={styles['input']}
            />
          </div>

          <div className={styles['inputGroup']}>
            <label className={styles['label']}>Longitude:</label>
            <input
              type="number"
              value={longitude}
              min={-180}
              max={180}
              step="0.0001"
              onChange={(e) => setLongitude(Number(e.target.value))}
              required
              className={styles['input']}
            />
          </div>

          <div className={styles['inputGroup']}>
            <label className={styles['label']}>Community:</label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              required
              className={styles['select']}
            >
              <option value="">-- Select --</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Sustainable Buildings">Sustainable Buildings</option>
              <option value="Agroclimatology">Agroclimatology</option>
            </select>
          </div>

          <div className={styles['inputGroup']}>
            <label className={styles['label']}>Temporal Level:</label>
            <select 
              value={temporal} 
              onChange={(e) => setTemporal(e.target.value)}
              required
              className={styles['select']}
            >
              <option value="">-- Select --</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly & Annual</option>
              <option value="Climatology">Climatology</option>
            </select>
          </div>

          <div className={styles['buttonGroup']}>
            <button type="submit" className={styles['submitButton']}>
              Submit Request
            </button>
            <button type="button" className={styles['resetButton}']}>
              Reset Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SinglePointView;