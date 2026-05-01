import { useState, useEffect } from 'react';
import { mockDb, supabase } from '../lib/supabase';
import { generateQuestion } from '../features/mathEngine';

export const useGame = () => {
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('current_math_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (name) => {
    let userData = mockDb.getUser(name);
    if (!userData) {
      userData = mockDb.createUser(name);
    }
    setUser(userData);
    localStorage.setItem('current_math_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_math_user');
  };

  const nextQuestion = () => {
    if (user) {
      const q = generateQuestion(user.level);
      setCurrentQuestion(q);
      return q;
    }
  };

  const submitAnswer = (isCorrect, category) => {
    if (!user) return;

    let newXp = user.xp;
    let newLevel = user.level;
    let newStreak = streak;
    let newWrongStreak = wrongStreak;
    let totalAnswered = (user.total_answered || 0) + 1;
    let correctAnswered = (user.correct_answered || 0) + (isCorrect ? 1 : 0);

    if (isCorrect) {
      newXp += 10;
      newStreak += 1;
      newWrongStreak = 0;
      
      // Level up on 3 streak
      if (newStreak >= 3) {
        newLevel += 1;
        newStreak = 0;
      }
    } else {
      newXp = Math.max(0, newXp - 2);
      newStreak = 0;
      newWrongStreak += 1;

      // Decrease difficulty on 2 wrong streak
      if (newWrongStreak >= 2) {
        newLevel = Math.max(1, newLevel - 1);
        newWrongStreak = 0;
      }
    }

    const updates = {
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      total_answered: totalAnswered,
      correct_answered: correctAnswered
    };

    const updatedUser = mockDb.updateProgress(user.id, updates);
    setUser(updatedUser);
    localStorage.setItem('current_math_user', JSON.stringify(updatedUser));
    setStreak(newStreak);
    setWrongStreak(newWrongStreak);

    return { isCorrect, levelUp: newLevel > user.level, levelDown: newLevel < user.level };
  };

  return {
    user,
    currentQuestion,
    loading,
    login,
    logout,
    nextQuestion,
    submitAnswer,
    streak
  };
};
