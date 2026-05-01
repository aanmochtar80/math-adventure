import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { GamePage } from './pages/GamePage';
import { ParentDashboard } from './pages/ParentDashboard';
import { useGame } from './hooks/useGame';
import { playLevelUpSound } from './features/sounds';

function App() {
  const { 
    user, 
    login, 
    logout, 
    currentQuestion, 
    nextQuestion, 
    submitAnswer,
    streak 
  } = useGame();

  const [view, setView] = useState('home'); // 'home' | 'game' | 'parent'

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const handleStartGame = () => {
    nextQuestion();
    setView('game');
  };

  const handleAnswer = (isCorrect, category) => {
    const result = submitAnswer(isCorrect, category);
    
    if (result && result.levelUp) {
      playLevelUpSound();
    }
    
    nextQuestion();
  };

  return (
    <div className="font-sans antialiased">
      {view === 'home' && (
        <Dashboard 
          user={user} 
          onStartGame={handleStartGame} 
          onOpenParent={() => setView('parent')}
          onLogout={logout}
        />
      )}
      
      {view === 'game' && currentQuestion && (
        <GamePage 
          question={currentQuestion} 
          user={user}
          streak={streak}
          onAnswer={handleAnswer} 
          onBack={() => setView('home')} 
        />
      )}

      {view === 'parent' && (
        <ParentDashboard 
          user={user} 
          onBack={() => setView('home')} 
        />
      )}
    </div>
  );
}

export default App;
