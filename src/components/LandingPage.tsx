import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Spatial Reasoning Study</h1>
      
      <p className={styles.text}>
        Welcome to my (Ibrahim Hassan's) honour's project study.
        <br /><br />
        Please select the test you would like to take below.
      </p>

      <div className={styles.buttonContainer}>
        <button 
          className={styles.primaryButton} 
          onClick={() => navigate('/custom-shapes')}
        >
          Take Custom Shapes Test
        </button>

        <button 
          className={styles.secondaryButton} 
          onClick={() => navigate('/original-shapes')}
        >
          Original Shapes Test (No longer required)
        </button>
      </div>
    </div>
  );
};

export default LandingPage;