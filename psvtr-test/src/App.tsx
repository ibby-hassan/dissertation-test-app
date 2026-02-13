// src/App.tsx
import { useState } from "react";
import WelcomePage from "./components/WelcomePage";

// Define the shape of your user's session data
interface UserData {
  version: 'A' | 'B' | null;
  experience: string | null;
}

// Define valid stages for the app
type AppStage = 'welcome' | 'test';

function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [userData, setUserData] = useState<UserData>({ 
    version: null, 
    experience: null 
  });

  const handleStartTest = (version: 'A' | 'B', experience: string) => {
    setUserData({ version, experience });
    setStage('test');
    console.log(`Starting Test - Version: ${version}, Experience: ${experience}`);
  };

  return (
    <div>
      {stage === 'welcome' && (
        <WelcomePage onStart={handleStartTest} />
      )}

      {stage === 'test' && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          fontFamily: 'sans-serif' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Test Environment Active</h1>
            <p>Version: <strong>{userData.version}</strong></p>
            <p>Experience: {userData.experience}</p>
            <br />
            <em style={{ color: '#666' }}>Logic for the test questions will go here.</em>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;