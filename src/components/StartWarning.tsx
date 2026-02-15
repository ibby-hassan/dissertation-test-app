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
        You are about to begin the assessed portion of the study.<br />
      </p>
      <p className={styles.text}>
        Once you begin, you will be timed for how long it takes you to complete each individual question. You do not need to rush. Once you submit an answer, you will not be able to go back. You may skip questions, but you will not be able to return to them.<br />
        If, for whatever reason, you disconnect from the test, you may resume from where you left off. But please try to avoid this.<br />
        <br />
        If you are unsure about anything, please contact me immediately.
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