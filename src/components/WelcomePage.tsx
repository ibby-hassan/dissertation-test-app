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
      <h1 className={styles.title}>2667185H's Dissertation: How Effective is a Computer-Rendered Version of the PSVT:R?</h1>
      <p className={styles.text}>
        Welcome to my (Ibrahim Hassan's) honour's project study. <br/>
        The Purdue Spatial Visualisation Test of Rotations (PSVT:R) test is a measure of spatial reasoning widely used in STEM education to measure students' ability to mentally manipulate 3D objects. Success with the PSVT:R has been shown to be a predictor of success in STEM fields.<br />
        This study aims to evaluate rendering software I have developed, and provide insight towards test automation solutions.<br/>
        <br />
        On selecting your test version, you will view two example questions, before conducting the test. More information on the test specifics are ahead.
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
          You do not need to provide your name, it simply makes data parsing, cleaning, and error handling easier on my end.
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