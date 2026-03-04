import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as appStyles from '../App.css';
import * as styles from './styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={appStyles.container}>
      <div className={styles.container}>
        <h1 className={styles.title}>Spatial Reasoning Study</h1>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.primaryButton} 
            onClick={() => navigate('/custom-shapes')}
          >
            Custom Shapes Test
          </button>

          <button 
            className={styles.secondaryButton} 
            onClick={() => navigate('/original-shapes')}
          >
            Original Shapes Test (No longer required)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;