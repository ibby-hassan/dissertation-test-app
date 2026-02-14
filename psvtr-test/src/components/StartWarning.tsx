import React from 'react';
import * as styles from './styles/StartWarning.css';

interface StartWarningProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const StartWarning: React.FC<StartWarningProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Important!</h2>
      <p className={styles.text}>
        You are about to begin the assessed portion of the study.
      </p>
      <p className={styles.text}>
        Once you begin, you will start the clock. Each question will be independently timed. You can not go back to change answers once you move to the next question.
      </p>
      <p className={`${styles.text} ${styles.boldText}`}>
        Are you ready to begin?
      </p>

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Yes, Begin Test
        </button>
      </div>
    </div>
  );
};

export default StartWarning;