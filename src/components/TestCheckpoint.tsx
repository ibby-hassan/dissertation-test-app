import React from 'react';
import * as styles from './styles/TestCheckpoint.css';

interface TestCheckpointProps {
  onContinue: () => void;
  questionsCompleted: number;
  totalQuestions: number;
}

const TestCheckpoint: React.FC<TestCheckpointProps> = ({ 
  onContinue, 
  questionsCompleted,
  totalQuestions 
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkpoint Reached</h2>
      
      <p className={styles.text}>
        You have completed <span className={styles.progressHighlight}>{questionsCompleted}</span> out of <span className={styles.progressHighlight}>{totalQuestions}</span> questions.
      </p>

      <p className={styles.text}>
        Your answers so far have been securely saved. Take a brief moment if you need to.
      </p>

      <p className={styles.text} style={{ fontSize: '0.95rem', color: '#6b7280' }}>
        <em>Note: Your final score will only be calculated and shown after you complete all {totalQuestions} questions.</em>
      </p>

      <button className={styles.button} onClick={onContinue}>
        Continue Test
      </button>
    </div>
  );
};

export default TestCheckpoint;