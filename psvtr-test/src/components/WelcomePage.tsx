// src/components/WelcomePage.tsx
import React, { useState } from 'react';
import * as styles from './styles/WelcomePage.css';

interface WelcomePageProps {
  onStart: (username: string, version: 'A' | 'B') => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');

  const handleStart = (version: 'A' | 'B') => {
    // Proceed regardless of whether username is empty or not
    onStart(username.trim(), version);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PSVT:R Style Comparison Study</h1>
      <p className={styles.text}>
        Thank you for participating in this study. You will be asked to sit a spatial reasoning assessment, consisting of 30 questions.<br/>
        Questions will alternate in visual style.<br/>
        Please set aside 20 minutes to complete the assessment.<br/>
        On selecting your test version, you will view two example questions, before conducting the test.
      </p>

      {/* Name Input */}
      <div className={styles.inputContainer}>
        <label htmlFor="username" className={styles.label}>Name (Optional)</label>
        <input 
          id="username"
          type="text" 
          className={styles.input}
          placeholder="Anonymous"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className={styles.helperText}>
          Your name will only be used to rectify any corrupted data or errors which occur with the site.
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <button 
          className={styles.buttonA} 
          onClick={() => handleStart('A')}
        >
          Version A
        </button>
        <button 
          className={styles.buttonB} 
          onClick={() => handleStart('B')}
        >
          Version B
        </button>
      </div>
      <p className={styles.disclaimer}>Please ensure you know what version Ibrahim has assigned you.</p>
    </div>
  );
};

export default WelcomePage;