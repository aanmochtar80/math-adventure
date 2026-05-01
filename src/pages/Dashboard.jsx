import React from 'react';
import { Card, Button, ProgressBar } from '../components/UI';
import { User, Trophy, Star, Settings, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = ({ user, onStartGame, onOpenParent, onLogout }) => {
  const nextLevelXp = user.level * 100;
  const progress = (user.xp % 100); // Simple progress for UI demo

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">Halo, {user.name}! 👋</h2>
              <p className="text-slate-500 font-medium">Petualang Level {user.level}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onOpenParent} className="hidden md:flex items-center gap-2">
              <Settings size={20} />
              Orang Tua
            </Button>
            <Button variant="ghost" onClick={onLogout}>Keluar</Button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="flex flex-col items-center justify-center text-center p-10 bg-indigo-600 text-white">
            <div className="p-4 bg-white/20 rounded-2xl mb-4">
              <Trophy size={40} />
            </div>
            <h3 className="text-4xl font-black mb-1">{user.level}</h3>
            <p className="font-bold opacity-80 uppercase tracking-wider text-sm">Level Saat Ini</p>
          </Card>

          <Card className="flex flex-col items-center justify-center text-center p-10 bg-emerald-500 text-white">
            <div className="p-4 bg-white/20 rounded-2xl mb-4">
              <Star size={40} />
            </div>
            <h3 className="text-4xl font-black mb-1">{user.xp}</h3>
            <p className="font-bold opacity-80 uppercase tracking-wider text-sm">Total XP</p>
          </Card>

          <Card className="p-10 flex flex-col justify-center">
            <ProgressBar 
              progress={progress} 
              label="Progres Level" 
              color="bg-indigo-600"
            />
            <p className="mt-4 text-slate-500 text-sm font-bold text-center">
              {100 - progress} XP lagi untuk naik level!
            </p>
          </Card>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-3xl shadow-2xl shadow-indigo-200 flex items-center justify-center gap-6 transition-all hover:brightness-110"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Play size={48} fill="currentColor" />
            </div>
            <div className="text-left">
              <h3 className="text-4xl font-black mb-1">Mulai Bermain</h3>
              <p className="text-xl font-bold opacity-90">Kalahkan tantangan dan kumpulkan XP!</p>
            </div>
          </button>
        </motion.div>
        
        <div className="mt-8 text-center md:hidden">
            <Button variant="secondary" onClick={onOpenParent} className="w-full">
              Dashboard Orang Tua
            </Button>
        </div>
      </div>
    </div>
  );
};
