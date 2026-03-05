import React, { useEffect, useState } from 'react';
import * as styles from './styles/TestComplete.css';
import { STORAGE_KEY, CUSTOM_STORAGE_KEY, RESET_COUNT_KEY, getSavedState } from '../utils';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface TestCompleteProps {
  testType: 'original' | 'custom';
  totalQuestions: number;
}

const TestComplete: React.FC<TestCompleteProps> = ({ testType, totalQuestions }) => {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      const savedState = getSavedState(testType);
      const userId = savedState?.userData?.userId;
      const collectionName = testType === 'original' ? "test_sessions" : "custom_test_sessions";

      if (userId) {
        try {
          const docRef = doc(db, collectionName, userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.summary && typeof data.summary.score_total === 'number') {
              setScore(data.summary.score_total);
            }
          }
        } catch (e) {
          console.error("Error fetching score:", e);
        }
      }
      setLoading(false);
    };

    fetchScore();
  }, [testType]);

  const handleRestart = () => {
    const key = testType === 'original' ? STORAGE_KEY : CUSTOM_STORAGE_KEY;
    localStorage.removeItem(key);
    const currentCount = parseInt(localStorage.getItem(RESET_COUNT_KEY) || '0', 10);
    localStorage.setItem(RESET_COUNT_KEY, (currentCount + 1).toString());
    
    window.location.href = '/'; 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Complete</h1>
      <p className={styles.text}>Thank you for participating.</p>
      
      {loading ? (
        <p className={styles.text}>Loading score...</p>
      ) : (
        score !== null && (
          <p className={styles.text} style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>
            Your Score: {score} / {totalQuestions}
          </p>
        )
      )}

      <p className={styles.subText}>You may now close this window.</p>

      <button className={styles.restartButton} onClick={handleRestart}>
        Debug: Reset
      </button>
    </div>
  );
};

export default TestComplete;