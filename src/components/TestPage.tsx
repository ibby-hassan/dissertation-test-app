import React, { useState, useEffect, useRef } from 'react';
import QuestionTemplate from './QuestionTemplate';
import * as styles from './styles/TestPage.css';

interface TestPageProps {
  questionId: string;
  questionNumber: number;
  totalQuestions: number;
  basePath: string;
  onConfirmAnswer: (answer: string, timeTaken: number) => void;
}

const TestPage: React.FC<TestPageProps> = ({
  questionId,
  questionNumber,
  totalQuestions,
  basePath,
  onConfirmAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Timer ref - starts null, set only when images load
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset state for new question
    setSelectedAnswer(null);
    setIsReady(false);
    startTimeRef.current = null;
  }, [questionId]);

  const handleImagesLoaded = () => {
    // Only start the timer when all images are actually loaded
    startTimeRef.current = Date.now();
    setIsReady(true);
  };

  const handleConfirm = () => {
    if (selectedAnswer && startTimeRef.current) {
      const endTime = Date.now();
      const timeTaken = endTime - startTimeRef.current;
      onConfirmAnswer(selectedAnswer, timeTaken);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h2 className={styles.questionNumber}>Question {questionNumber} / {totalQuestions}</h2>
        <p className={styles.subText}>Select an option and confirm to proceed</p>
      </div>

      {/* Show Loader until images report they are done */}
      <div style={{ display: isReady ? 'block' : 'none', width: '100%', flex: 1 }}>
        <QuestionTemplate 
          questionId={questionId}
          basePath={basePath}
          onAnswer={setSelectedAnswer}
          selectedAnswer={selectedAnswer}
          onAllImagesLoaded={handleImagesLoaded}
        />
      </div>

      {!isReady && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading Question...</p>
        </div>
      )}

      <div className={styles.footer}>
        <button 
          className={styles.confirmButton} 
          onClick={handleConfirm}
          disabled={!selectedAnswer || !isReady}
        >
          Confirm Answer
        </button>
      </div>

    </div>
  );
};

export default TestPage;