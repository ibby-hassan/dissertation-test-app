import { useState, useEffect } from "react";
import CustomWelcomePage from "./CustomWelcomePage";
import TutorialPage from "./TutorialPage";
import TestPage from "./TestPage";
import TestCheckpoint from "./TestCheckpoint";
import TestComplete from "./TestComplete";
import ImagePreloader from "./ImagePreloader";
import * as styles from "../App.css"; 
import { 
  initializeTestSession, 
  submitQuestionAnswer, 
  finalizeTestSession,
  generateUserId,
  getSavedState, 
  CUSTOM_STORAGE_KEY,
  CUSTOM_QUESTION_ORDER
} from "../utils";

interface UserData {
  version: 'A' | 'B' | null;
  userId: string | null;
  username: string | null;
}

type AppStage = 'welcome' | 'tutorial' | 'test' | 'checkpoint' | 'complete';

function CustomParticipantFlow() {
  const TOTAL_QUESTIONS = 12;

  const [stage, setStage] = useState<AppStage>(() => {
    return (getSavedState('custom')?.stage as AppStage) || 'welcome';
  });

  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = getSavedState('custom')?.userData;
    return { 
      version: savedData?.version || null,
      userId: savedData?.userId || null,
      username: savedData?.username || null
    };
  });

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return getSavedState('custom')?.currentQuestion || 1;
  });

  useEffect(() => {
    const stateToSave = { stage, userData, currentQuestion };
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [stage, userData, currentQuestion]);

  const onStart = (usernameInput: string, version: 'A' | 'B') => {
    const finalUsername = usernameInput.trim() === "" ? "Anonymous" : usernameInput;
    const newUserId = generateUserId(finalUsername);

    setUserData({ username: finalUsername, version, userId: newUserId });
    setStage('tutorial');
  };

  const handleTutorialComplete = () => {
    if (userData.userId && userData.version) {
        initializeTestSession(userData.userId, userData.version, 'custom');
    }
    setStage('test');
    setCurrentQuestion(1);
  };

  const handleAnswer = async (answer: string, timeTaken: number) => {
    const questionId = CUSTOM_QUESTION_ORDER[currentQuestion - 1];
    
    if (userData.userId && userData.version) {
      await submitQuestionAnswer(
        userData.userId,
        questionId,
        currentQuestion,
        answer,
        timeTaken,
        'lined', 
        'custom'
      );
    }

    if (currentQuestion < TOTAL_QUESTIONS) {
      if (currentQuestion === 6) {
        setStage('checkpoint');
      }
      setCurrentQuestion((prev: number) => prev + 1);
    } else {
      if (userData.userId) {
        finalizeTestSession(userData.userId, 'custom');
      }
      setStage('complete');
    }
  };

  return (
    <div className={styles.container}>
      {stage === 'welcome' && (
        <CustomWelcomePage onStart={onStart} />
      )}

      {stage === 'tutorial' && (
        <TutorialPage 
          onComplete={handleTutorialComplete} 
          onBack={() => setStage('welcome')}
        />
      )}

      {stage === 'test' && userData.version && (
        <>
          <TestPage
            key={currentQuestion}
            questionId={CUSTOM_QUESTION_ORDER[currentQuestion - 1]}
            questionNumber={currentQuestion}
            totalQuestions={TOTAL_QUESTIONS}
            basePath="psvtr-custom" 
            onConfirmAnswer={handleAnswer}
          />
          {currentQuestion < TOTAL_QUESTIONS && (
            <ImagePreloader 
              questionId={CUSTOM_QUESTION_ORDER[currentQuestion]}
              basePath="psvtr-custom"
            />
          )}
        </>
      )}
      
      {stage === 'checkpoint' && (
        <TestCheckpoint 
          onContinue={() => setStage('test')}
          questionsCompleted={currentQuestion - 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      )}

      {stage === 'complete' && (
        <TestComplete testType="custom" totalQuestions={TOTAL_QUESTIONS} />
      )}
    </div>
  );
}

export default CustomParticipantFlow;