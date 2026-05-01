import React from 'react';
import { Card, Button, ProgressBar } from '../components/UI';
import { ChevronLeft, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';

export const ParentDashboard = ({ user, onBack }) => {
  const accuracy = user.total_answered > 0 
    ? (user.correct_answered / user.total_answered) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <Button variant="ghost" onClick={onBack} className="p-2 min-w-0">
            <ChevronLeft size={28} />
          </Button>
          <h2 className="text-3xl font-black text-slate-800">Laporan Progres Belajar</h2>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold">Statistik Umum</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Pertanyaan Dijawab</p>
                <p className="text-3xl font-black text-slate-800">{user.total_answered || 0}</p>
              </div>
              
              <ProgressBar 
                progress={accuracy} 
                label="Akurasi Jawaban" 
                color={accuracy > 70 ? 'bg-emerald-500' : 'bg-orange-500'} 
              />
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold">Topik yang Dikuasai</h3>
            </div>
            
            <div className="space-y-3">
              {user.level > 5 ? (
                <>
                   <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="font-bold text-slate-700">Penjumlahan & Pengurangan</span>
                  </div>
                  {user.level > 10 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="font-bold text-slate-700">Perkalian & Pembagian</span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-500 italic">Selesaikan lebih banyak level untuk melihat progres topik.</p>
              )}
            </div>
          </Card>
        </div>

        <Card className="bg-orange-50 border-orange-100">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-orange-800 mb-2">Saran Belajar</h3>
                    <p className="text-orange-700 font-medium">
                        {accuracy < 60 
                            ? "Fokus pada latihan dasar penjumlahan sebelum lanjut ke perkalian. Berikan pujian untuk setiap 3 jawaban benar berturut-turut!" 
                            : "Anak Anda melakukan pekerjaan yang luar biasa! Cobalah untuk menantang mereka dengan soal cerita untuk mengasah logika matematika."}
                    </p>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};
