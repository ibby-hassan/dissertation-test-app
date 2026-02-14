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
    setSelectedAnswer(null);
    setIsReady(false);
    startTimeRef.current = null;
  }, [questionId]);

  const handleImagesLoaded = () => {
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

  const handleSkip = () => {
    if (startTimeRef.current) {
        const endTime = Date.now();
        const timeTaken = endTime - startTimeRef.current;
        // Submit "SKIPPED" as the answer
        onConfirmAnswer("SKIPPED", timeTaken);
    } else {
        // If images hadn't loaded yet, time is 0
        onConfirmAnswer("SKIPPED", 0);
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

        {isReady && (
            <button className={styles.skipButton} onClick={handleSkip}>
                Skip Question
            </button>
        )}
      </div>

    </div>
  );
};

export default TestPage;