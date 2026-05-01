import React, { useState } from 'react';
import { Card, Button } from '../components/UI';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="inline-flex p-4 bg-indigo-100 rounded-2xl mb-6">
            <Rocket className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">Math Adventure</h1>
          <p className="text-slate-500 mb-8">Siap untuk petualangan matematika seru?</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nama Kamu</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan namamu..."
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:outline-none transition-all text-lg font-medium"
                required
              />
            </div>
            <Button type="submit" className="w-full text-lg py-4">
              Mulai Petualangan!
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
