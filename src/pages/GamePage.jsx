import React, { useState } from 'react';
import { Card, Button, ProgressBar } from '../components/UI';
import { ChevronLeft, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playCorrectSound, playWrongSound } from '../features/sounds';

export const GamePage = ({ question, user, onAnswer, onBack, streak }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fillValue, setFillValue] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChoice = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    checkAnswer(option);
  };

  const handleFillSubmit = (e) => {
    e.preventDefault();
    if (feedback || !fillValue) return;
    checkAnswer(fillValue);
  };

  const checkAnswer = (answer) => {
    const isCorrect = answer.toString().trim().toLowerCase() === question.answer.toLowerCase();
    
    if (isCorrect) {
      playCorrectSound();
      setFeedback('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });
    } else {
      playWrongSound();
      setFeedback('wrong');
    }

    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onAnswer(isCorrect, question.category);
        setFeedback(null);
        setSelectedOption(null);
        setFillValue('');
        setIsTransitioning(false);
      }, 500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col">
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="p-2 min-w-0">
          <ChevronLeft size={28} />
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Streak</p>
            <div className="flex items-center gap-1 text-orange-500 font-black text-2xl">
              <Zap size={24} fill="currentColor" />
              {streak}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={question.question}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-black uppercase tracking-wider mb-4 inline-block">
                  {question.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
                  {question.question}
                </h2>
              </div>

              <Card className={`relative overflow-hidden transition-all duration-300 ${feedback === 'wrong' ? 'animate-shake border-rose-500 shadow-rose-100' : feedback === 'correct' ? 'border-emerald-500 shadow-emerald-100' : ''}`}>
                {question.type === 'multiple-choice' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleChoice(opt)}
                        disabled={!!feedback}
                        className={`p-6 rounded-2xl text-2xl font-black transition-all border-2 ${
                          selectedOption === opt
                            ? (opt === question.answer ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                            : 'bg-white border-slate-100 hover:border-indigo-500 text-slate-700'
                        } ${feedback && opt === question.answer ? 'bg-emerald-500 border-emerald-500 text-white' : ''}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleFillSubmit} className="space-y-6">
                    <input
                      type="text"
                      autoFocus
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={fillValue}
                      onChange={(e) => setFillValue(e.target.value.replace(/[^0-9.-]/g, ''))}
                      disabled={!!feedback}
                      placeholder="Ketik jawabanmu..."
                      className="w-full p-8 text-center text-4xl font-black text-slate-800 bg-slate-50 border-4 border-slate-100 rounded-3xl focus:border-indigo-500 focus:outline-none transition-all"
                    />
                    <Button type="submit" className="w-full text-xl py-6" disabled={!!feedback || !fillValue}>
                      Kirim Jawaban
                    </Button>
                  </form>
                )}

                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm ${feedback === 'correct' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                    >
                      {feedback === 'correct' ? (
                        <div className="text-center text-emerald-600">
                          <CheckCircle2 size={120} className="mx-auto mb-4" />
                          <h3 className="text-4xl font-black">Luar Biasa!</h3>
                          <p className="text-xl font-bold">+10 XP</p>
                        </div>
                      ) : (
                        <div className="text-center text-rose-600">
                          <XCircle size={120} className="mx-auto mb-4" />
                          <h3 className="text-4xl font-black">Oopps!</h3>
                          <p className="text-xl font-bold">Coba lagi ya!</p>
                          <p className="font-bold opacity-60">Jawaban benar: {question.answer}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl w-full mx-auto mt-8">
         <ProgressBar progress={(streak / 3) * 100} label="Streak untuk Naik Level" color="bg-orange-500" />
      </footer>
    </div>
  );
};
