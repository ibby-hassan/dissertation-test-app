// src/components/WelcomePage.tsx
import React, { useState } from 'react';
import * as styles from './styles/WelcomePage.css';

interface WelcomePageProps {
  onStart: (version: 'A' | 'B') => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PSVT:R Style Comparison Study</h1>
      <p className={styles.text}>
        Thank you for participating in this study. You will be asked to sit a spatial reasoning assessment, consisting of 30 questions.<br/>
        Questions will alternate in visual style.<br/>
        Please set aside 20 minutes to complete the assessment.<br/>
        On selecting your test version, you will view two example questions, before conducting the test.
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonA} onClick={() => onStart('A')}>Version A</button>
        <button className={styles.buttonB} onClick={() => onStart('B')}>Version B</button>
      </div>
      <p className={styles.disclaimer}>Please ensure you know what version Ibrahim has assigned you.</p>
    </div>
  );
};

export default WelcomePage;