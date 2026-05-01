import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Mock storage for development if Supabase is not configured
 */
export const mockDb = {
  getUser: (name) => {
    const users = JSON.parse(localStorage.getItem('math_users') || '[]');
    return users.find(u => u.name.toLowerCase() === name.toLowerCase());
  },
  createUser: (name) => {
    const users = JSON.parse(localStorage.getItem('math_users') || '[]');
    const newUser = { 
      id: Math.random().toString(36).substr(2, 9), 
      name, 
      level: 1, 
      xp: 0, 
      streak: 0,
      total_answered: 0,
      correct_answered: 0,
      weak_topics: []
    };
    users.push(newUser);
    localStorage.setItem('math_users', JSON.stringify(users));
    return newUser;
  },
  updateProgress: (userId, updates) => {
    const users = JSON.parse(localStorage.getItem('math_users') || '[]');
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem('math_users', JSON.stringify(users));
      return users[index];
    }
    return null;
  }
};
