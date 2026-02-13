import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import TutorialPage from "./components/TutorialPage";
import QuestionTemplate from "./components/QuestionTemplate";
import * as styles from "./App.css";

interface UserData {
  version: 'A' | 'B' | null;
}

type AppStage = 'welcome' | 'tutorial' | 'test';

function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [userData, setUserData] = useState<UserData>({ version: null });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const onStart = (version: 'A' | 'B') => {
    setUserData({ version });
    setStage('tutorial');
  };

  const handleTutorialComplete = () => {
    setStage('test');
    setCurrentQuestion(1);
  };

  const handleAnswer = (answer: string) => {
    console.log(`User Answered Q${currentQuestion}: ${answer}`);
    
    if (currentQuestion < 30) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      alert("Test Complete!");
    }
  };

  return (
    <div className={styles.container}>
      {stage === 'welcome' && (
        <WelcomePage onStart={onStart} />
      )}

      {stage === 'tutorial' && (
        <TutorialPage onComplete={handleTutorialComplete} />
      )}

      {stage === 'test' && (
        <QuestionTemplate 
          questionId={`Q${currentQuestion}`} // Note the Q prefix here
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;