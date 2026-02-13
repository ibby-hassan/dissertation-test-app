// src/components/WelcomePage.tsx
import React, { useState } from 'react';
import * as styles from './styles/WelcomePage.css';

// define the shape of the props
interface WelcomePageProps {
  onStart: (version: 'A' | 'B', experience: string) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  const [experience, setExperience] = useState<string>('');

  const handleStart = (version: 'A' | 'B') => {
    if (!experience) {
      alert("Please select an option for the experience question first.");
      return;
    }
    onStart(version, experience);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PSVTR Study</h1>

      <div className={styles.infoCard}>
        <p className={styles.infoText}>
          Thank you for participating. This test involves 30 visual reasoning questions. 
          Please ensure you are in a quiet environment and try to complete it in one sitting.
        </p>

        <label className={styles.label} htmlFor="experience-select">
          Have you taken this test before?
        </label>
        
        <select 
          id="experience-select"
          className={styles.select}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option value="no">No, never</option>
          <option value="yes">Yes, I have</option>
          <option value="unsure">I'm not sure</option>
        </select>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.buttonA}
          onClick={() => handleStart('A')}
        >
          Proceed with Version A
        </button>

        <button 
          className={styles.buttonB}
          onClick={() => handleStart('B')}
        >
          Proceed with Version B
        </button>
      </div>

      <p className={styles.tagline}>
        * Ask Ibrahim which version you should use.
      </p>
    </div>
  );
};

export default WelcomePage;