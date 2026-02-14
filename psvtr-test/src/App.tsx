import { useState, useEffect } from "react";
import WelcomePage from "./components/WelcomePage";
import TutorialPage from "./components/TutorialPage";
import QuestionTemplate from "./components/QuestionTemplate";
import * as styles from "./App.css";

interface UserData {
  version: 'A' | 'B' | null;
}

type AppStage = 'welcome' | 'tutorial' | 'test' | 'complete';

const STORAGE_KEY = 'psvtr_study_state';
const getSavedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error("Error loading state from local storage:", err);
  }
  return null;
};

function App() {
  // --- STATE INITIALIZATION ---
  const [stage, setStage] = useState<AppStage>(() => {
    return getSavedState()?.stage || 'welcome';
  });

  const [userData, setUserData] = useState<UserData>(() => {
    return getSavedState()?.userData || { version: null };
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
  const onStart = (version: 'A' | 'B') => {
    setUserData({ version });
    setStage('tutorial');
  };

  const handleBackToWelcome = () => {
    setStage('welcome');
  };

  const handleTutorialComplete = () => {
    setStage('test');
    setCurrentQuestion(1);
  };

  const handleAnswer = (answer: string) => {
    // TODO: Send 'answer' to Firestore here
    console.log(`User Answered Q${currentQuestion}: ${answer}`);
    
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
        <QuestionTemplate 
          key={currentQuestion}
          questionId={`Q${currentQuestion}`} 
          basePath={getBasePath(currentQuestion, userData.version)}
          onAnswer={handleAnswer}
        />
      )}

      {stage === 'complete' && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Test Complete</h1>
          <p style={{ fontSize: '1.2rem' }}>Thank you for participating.</p>
          <p style={{ color: '#6b7280', marginTop: '1rem' }}>You may now close this window.</p>
        </div>
      )}
    </div>
  );
}

export default App;