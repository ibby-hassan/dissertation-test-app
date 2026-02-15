import React, { useState } from 'react';
import QuestionTemplate from './QuestionTemplate';
import StartWarning from './StartWarning';
import * as styles from './styles/TutorialPage.css';

interface TutorialPageProps {
  onComplete: () => void;
  onBack: () => void;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setShowWarning(true);
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onBack(); 
    }
  };

  if (showWarning) {
    return (
      <StartWarning 
        onCancel={() => setShowWarning(false)} 
        onConfirm={onComplete} 
      />
    );
  }

  return (
    <div className={styles.container}>
      
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
            readonly={true}
          />

          <p className={styles.textBlock}>
            Study the rotation applied to the top shape, then select the option that corresponds applying the same rotation to the bottom shape.
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <p className={styles.textBlock}>
            Here is a second example. Notice that the rotation is on a different axis.
          </p>

          <QuestionTemplate 
            questionId="T2" 
            basePath="psvtr-original-normalised" 
            onAnswer={() => {}} 
            readonly={true}
          />

          <p className={styles.textBlock}>
            When you are ready, click below to recieve final information regarding the test.
          </p>
        </>
      )}

      <div className={styles.buttonRow}>
        <button className={styles.prevButton} onClick={handlePrev}>
          {step === 1 ? 'Back' : 'Previous Example'}
        </button>
        
        {step === 1 ? (
            <button className={styles.nextButton} onClick={handleNext}>
                Next Example
            </button>
        ) : (
            <button className={styles.nextButton} onClick={handleNext}>
                Continue
            </button>
        )}
      </div>
      
    </div>
  );
};

export default TutorialPage;