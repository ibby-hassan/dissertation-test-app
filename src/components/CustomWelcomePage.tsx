import React, { useState } from 'react';
import * as styles from './styles/OriginalWelcomePage.css';
import { useNavigate } from 'react-router-dom';

interface CustomWelcomePageProps {
  onStart: (username: string, version: 'A' | 'B') => void;
}

const CustomWelcomePage: React.FC<CustomWelcomePageProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    onStart(username.trim(), 'A');
  };

  return (
    <div className={styles.container}>

      <button className={styles.backButton} onClick={() => navigate('/')}>
        &larr; Back to Home
      </button>
      
      <h1 className={styles.title}>Custom Spatial Reasoning Test</h1>
      <p className={styles.text}>
        Welcome to the custom shapes assessment portion of the study.<br/>
        This section aims to evaluate the newly generated heuristic algorithm.<br/>
        <br />
        <strong>Test Structure:</strong> The test consists of <strong>12 questions</strong>.<br />
        Your progress is <strong>saved automatically</strong>, so you don't need to worry about losing data.<br />
        <br />
        You will view two standard example questions to remind you of the format before conducting the assessed portion.
      </p>

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
      </div>

      <div className={styles.buttonContainer}>
        <button 
          className={styles.buttonA} 
          onClick={handleStart}
          style={{ width: '100%', padding: '1.5vh 5vw' }}
        >
          Continue to Tutorial
        </button>
      </div>
    </div>
  );
};

export default CustomWelcomePage;