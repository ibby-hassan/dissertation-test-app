// src/components/TestPage.tsx
import React, { useState, useEffect } from 'react';
import QuestionTemplate from './QuestionTemplate';
import * as styles from './styles/TestPage.css';

interface TestPageProps {
  questionId: string;
  questionNumber: number;
  totalQuestions: number;
  basePath: string;
  onConfirmAnswer: (answer: string) => void;
}

const TestPage: React.FC<TestPageProps> = ({
  questionId,
  questionNumber,
  totalQuestions,
  basePath,
  onConfirmAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [questionId]);

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h2 className={styles.questionNumber}>Question {questionNumber} / {totalQuestions}</h2>
        <p className={styles.subText}>Select an option and confirm to proceed</p>
      </div>

      <QuestionTemplate 
        questionId={questionId}
        basePath={basePath}
        onAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
      />

      <div className={styles.footer}>
        <button 
          className={styles.confirmButton} 
          onClick={() => selectedAnswer && onConfirmAnswer(selectedAnswer)}
          disabled={!selectedAnswer}
        >
          Confirm Answer
        </button>
      </div>

    </div>
  );
};

export default TestPage;