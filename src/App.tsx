import { useState, useEffect } from "react";
import WelcomePage from "./components/WelcomePage";
import TutorialPage from "./components/TutorialPage";
import TestPage from "./components/TestPage";
import TestCheckpoint from "./components/TestCheckpoint";
import TestComplete from "./components/TestComplete";
import ImagePreloader from "./components/ImagePreloader";
import * as styles from "./App.css";
import { 
  initializeTestSession, 
  submitQuestionAnswer, 
  finalizeTestSession,
  generateUserId,
  getSavedState, 
  STORAGE_KEY 
} from "./utils";

interface UserData {
  version: 'A' | 'B' | null;
  userId: string | null;
  username: string | null;
}

type AppStage = 'welcome' | 'tutorial' | 'test' | 'checkpoint' | 'complete';

function App() {
  // --- STATE INITIALIZATION ---
  const [stage, setStage] = useState<AppStage>(() => {
    return (getSavedState()?.stage as AppStage) || 'welcome';
  });

  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = getSavedState()?.userData;
    return { 
      version: savedData?.version || null,
      userId: savedData?.userId || null,
      username: savedData?.username || null
    };
  });

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return getSavedState()?.currentQuestion || 1;
  });

  // --- PERSISTENCE EFFECT ---
  useEffect(() => {
    const stateToSave = {
      stage,
      userData,
      currentQuestion
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [stage, userData, currentQuestion]);


  // --- HANDLERS ---
  const onStart = (usernameInput: string, version: 'A' | 'B') => {
    const finalUsername = usernameInput.trim() === "" ? "Anonymous" : usernameInput;
    
    // Generate ID NOW, using the username
    const newUserId = generateUserId(finalUsername);

    setUserData({ 
      username: finalUsername, 
      version, 
      userId: newUserId 
    });
    
    // Initialize session in Firebase
    initializeTestSession(newUserId, version);
    
    setStage('tutorial');
  };

  const handleBackToWelcome = () => {
    setStage('welcome');
  };

  const handleTutorialComplete = () => {
    setStage('test');
    setCurrentQuestion(1);
  };

  const handleAnswer = async (answer: string, timeTaken: number) => {
    const questionId = `Q${currentQuestion}`;
    console.log(`User Answered ${questionId}: ${answer} in ${timeTaken}ms`);
    
    const isEven = currentQuestion % 2 === 0;
    let styleType: 'lined' | 'shaded' = 'lined';

    if (userData.version === 'A') {
        styleType = isEven ? 'shaded' : 'lined';
    } else {
        styleType = isEven ? 'lined' : 'shaded';
    }

    if (userData.userId && userData.version) {
      await submitQuestionAnswer(
        userData.userId,
        questionId,
        currentQuestion,
        answer,
        timeTaken,
        styleType
      );
    }

    if (currentQuestion < 30) {
      // Logic for checkpoints: if we just finished Q10 or Q20
      if (currentQuestion === 10 || currentQuestion === 20) {
        setStage('checkpoint');
      }
      
      setCurrentQuestion((prev: number) => prev + 1);
    } else {
      if (userData.userId) {
        finalizeTestSession(userData.userId);
      }
      setStage('complete');
    }
  };

  const handleCheckpointContinue = () => {
    setStage('test');
  };

  const getBasePath = (questionNum: number, version: 'A' | 'B') => {
    const isEven = questionNum % 2 === 0;

    if (version === 'A') {
      return isEven ? "psvtr-new-normalised" : "psvtr-original-normalised";
    } else {
      return isEven ? "psvtr-original-normalised" : "psvtr-new-normalised";
    }
  };

  return (
    <div className={styles.container}>
      {stage === 'welcome' && (
        <WelcomePage onStart={onStart} />
      )}

      {stage === 'tutorial' && (
        <TutorialPage 
          onComplete={handleTutorialComplete} 
          onBack={handleBackToWelcome}
        />
      )}

      {stage === 'test' && userData.version && (
        <>
          <TestPage
            key={currentQuestion}
            questionId={`Q${currentQuestion}`}
            questionNumber={currentQuestion}
            totalQuestions={30}
            basePath={getBasePath(currentQuestion, userData.version)}
            onConfirmAnswer={handleAnswer}
          />
          {currentQuestion < 30 && (
            <ImagePreloader 
              questionNum={currentQuestion + 1}
              basePath={getBasePath(currentQuestion + 1, userData.version)}
            />
          )}
        </>
      )}

      {/* Checkpoint Stage */}
      {stage === 'checkpoint' && (
        <TestCheckpoint 
          onContinue={handleCheckpointContinue}
          questionsCompleted={currentQuestion - 1} // currentQuestion has already incremented
          totalQuestions={30}
        />
      )}

      {stage === 'complete' && (
        <TestComplete />
      )}
    </div>
  );
}

export default App;