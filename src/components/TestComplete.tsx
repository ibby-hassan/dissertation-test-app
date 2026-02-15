import React from 'react';
import * as styles from './styles/TestComplete.css';
import { STORAGE_KEY } from '../utils/testUtils';

const TestComplete: React.FC = () => {
  
  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Complete</h1>
      <p className={styles.text}>Thank you for participating.</p>
      <p className={styles.subText}>You may now close this window.</p>

      <button className={styles.restartButton} onClick={handleRestart}>
        Debug: Reset
      </button>
    </div>
  );
};

export default TestComplete;