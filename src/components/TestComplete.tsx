import React from 'react';
import * as styles from './styles/TestComplete.css';

const TestComplete: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Complete</h1>
      <p className={styles.text}>Thank you for participating.</p>
      <p className={styles.subText}>You may now close this window.</p>
    </div>
  );
};

export default TestComplete;