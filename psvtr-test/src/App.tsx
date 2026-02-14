import { useState, useEffect } from "react";
import WelcomePage from "./components/WelcomePage";
import TutorialPage from "./components/TutorialPage";
import TestPage from "./components/TestPage";
import TestComplete from "./components/TestComplete";
import ImagePreloader from "./components/ImagePreloader"; // New Component
import * as styles from "./App.css";
import { 
  initializeTestSession, 
  submitQuestionAnswer, 
  generateUserId, 
  getSavedState, 
  STORAGE_KEY 
} from "./utils/testUtils";

interface UserData {
  version: 'A' | 'B' | null;
  userId: string | null;
  username: string | null;
}

type AppStage = 'welcome' | 'tutorial' | 'test' | 'complete';

function App() {
  // --- STATE INITIALIZATION ---
  const [stage, setStage] = useState<AppStage>(() => {
    return getSavedState()?.stage || 'welcome';
  });

  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = getSavedState()?.userData;
    return { 
      version: savedData?.version || null,
      userId: savedData?.userId || generateUserId(),
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

    setUserData(prev => ({ ...prev, username: finalUsername, version }));
    
    // Initialize session in Firebase immediately (Parent Document)
    if (userData.userId) {
      initializeTestSession(userData.userId, finalUsername, version);
    }
    
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
    
    if (userData.userId && userData.version) {
      await submitQuestionAnswer(
        userData.userId,
        questionId,
        currentQuestion,
        answer,
        timeTaken
      );
    }

    if (currentQuestion < 30) {
      setCurrentQuestion((prev: number) => prev + 1);
    } else {
      setStage('complete');
    }
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
          
          {/* Background Preloader for NEXT question */}
          {currentQuestion < 30 && (
            <ImagePreloader 
              questionNum={currentQuestion + 1}
              basePath={getBasePath(currentQuestion + 1, userData.version)}
            />
          )}
        </>
      )}

      {stage === 'complete' && (
        <TestComplete />
      )}
    </div>
  );
}

export default App;