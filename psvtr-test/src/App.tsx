import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import TutorialPage from "./components/TutorialPage";
import QuestionTemplate from "./components/QuestionTemplate";
import * as styles from "./App.css";

interface UserData {
  version: 'A' | 'B' | null;
}

type AppStage = 'welcome' | 'tutorial' | 'test' | 'complete';

function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [userData, setUserData] = useState<UserData>({ version: null });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const onStart = (version: 'A' | 'B') => {
    setUserData({ version });
    setStage('tutorial');
  };

  // Logic to return to Welcome screen (only available from Tutorial)
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
      setCurrentQuestion(prev => prev + 1);
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
        </div>
      )}
    </div>
  );
}

export default App;