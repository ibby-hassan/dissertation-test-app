// src/components/TutorialPage.tsx
import React, { useState } from 'react';
import QuestionTemplate from './QuestionTemplate';
import * as styles from './styles/TutorialPage.css';

interface TutorialPageProps {
  onComplete: () => void;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
    }
  };

  return (
    <div className={styles.container}>
      
      {/* --- TUTORIAL 1 --- */}
      {step === 1 && (
        <>
          <h2 className={styles.title}>Tutorial</h2>
          <p className={styles.textBlock}>
            Below is an example of a question you will be asked to answer.
          </p>

          <QuestionTemplate 
            questionId="T1" 
            basePath="psvtr-new-normalised" 
            onAnswer={() => {}} 
          />

          <p className={styles.textBlock}>
            Study the rotation applied to the top shape, then select the option that corresponds applying the same rotation to the bottom shape.
          </p>
        </>
      )}

      {/* --- TUTORIAL 2 --- */}
      {step === 2 && (
        <>
          <p className={styles.textBlock}>
            Here is a second example. Notice that the rotation is on a different axis.
          </p>

          <QuestionTemplate 
            questionId="T2" 
            basePath="psvtr-original-normalised" 
            onAnswer={() => {}} 
          />

          <p className={styles.textBlock}>
            When you are ready, click below to start the test.
          </p>
        </>
      )}

      <button className={styles.nextButton} onClick={handleNext}>
        {step === 1 ? 'Next Example' : 'Start Test'}
      </button>
      
    </div>
  );
};

export default TutorialPage;