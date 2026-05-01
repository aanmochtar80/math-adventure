import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200',
    secondary: 'bg-white text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-50',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100'
  };

  return (
    <button
      className={twMerge(
        'px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:active:scale-100',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export const Card = ({ className, children }) => (
  <div className={twMerge('glass-card p-8 bg-white/80', className)}>
    {children}
  </div>
);

export const ProgressBar = ({ progress, label, color = 'bg-indigo-500' }) => (
  <div className="w-full">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <span className="text-sm font-bold text-slate-600">{Math.round(progress)}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
      <div 
        className={twMerge('h-full transition-all duration-500 ease-out', color)} 
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
