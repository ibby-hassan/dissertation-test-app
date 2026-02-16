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
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: Local lock state
  
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsReady(false);
    setIsSubmitting(false); // Reset lock on new question
    startTimeRef.current = null;
  }, [questionId]);

  const handleImagesLoaded = () => {
    startTimeRef.current = Date.now();
    setIsReady(true);
  };

  const handleConfirm = () => {
    if (isSubmitting) return; // Prevent double submission

    if (selectedAnswer && startTimeRef.current) {
      setIsSubmitting(true); // Lock UI
      const endTime = Date.now();
      const timeTaken = endTime - startTimeRef.current;
      onConfirmAnswer(selectedAnswer, timeTaken);
    }
  };

  const handleSkip = () => {
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true); // Lock UI
    if (startTimeRef.current) {
        const endTime = Date.now();
        const timeTaken = endTime - startTimeRef.current;
        onConfirmAnswer("SKIPPED", timeTaken);
    } else {
        onConfirmAnswer("SKIPPED", 0);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h2 className={styles.questionNumber}>Question {questionNumber} / {totalQuestions}</h2>
        <p className={styles.subText}>Select an option and confirm to proceed</p>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        {!isReady && (
          <div className={styles.loaderContainer} style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 10, 
            backgroundColor: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading Question...</p>
          </div>
        )}
        <div style={{ width: '100%' }}> 
          <QuestionTemplate 
            questionId={questionId}
            basePath={basePath}
            onAnswer={(ans) => !isSubmitting && setSelectedAnswer(ans)} // Disable selection during submit
            selectedAnswer={selectedAnswer}
            onAllImagesLoaded={handleImagesLoaded}
            readonly={isSubmitting} // Pass readonly down
          />
        </div>
      </div>

      <div className={styles.footer}>
        <button 
          className={styles.confirmButton} 
          onClick={handleConfirm}
          disabled={!selectedAnswer || !isReady || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Confirm Answer'}
        </button>

        <button 
            className={styles.skipButton} 
            onClick={handleSkip}
            disabled={!isReady || isSubmitting}
        >
            Skip Question
        </button>
      </div>

    </div>
  );
};

export default TestPage;