import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Timer, CalendarDays, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function ContestLobby() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contests } = useAppContext();
  const contest = contests.find(c => c.id === id);

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!contest) return;
    const target = new Date(contest.scheduledStartTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        navigate(`/student/contests/${id}`);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [contest, id, navigate]);

  if (!contest) return null;

  return (
    <div className="max-w-3xl mx-auto mt-12 animate-in fade-in zoom-in-95 duration-500">
      <button onClick={() => navigate('/student/contests')} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Contests
      </button>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 text-center shadow-xl">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Timer className="w-10 h-10 text-university-600 dark:text-university-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{contest.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">The contest has not started yet. You will be automatically redirected when the time comes.</p>

        <div className="inline-flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800 mb-10 min-w-[300px]">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Starts In</p>
          <div className="text-5xl font-mono font-bold text-university-600 dark:text-university-400 tabular-nums">
            {timeLeft}
          </div>
        </div>

        <div className="flex flex-col items-start bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-6 text-left">
          <h4 className="flex items-center font-bold text-amber-800 dark:text-amber-400 mb-3"><ShieldAlert className="w-5 h-5 mr-2" /> Contest Rules</h4>
          <ul className="text-sm text-amber-700 dark:text-amber-500/80 space-y-2 list-disc list-inside">
            <li>Ensure you have a stable internet connection.</li>
            <li>Once the contest begins, the timer cannot be paused.</li>
            <li>Your code will be automatically submitted when the duration ({contest.durationMins} mins) ends.</li>
            <li>Solution editorials and videos will be unlocked immediately after the contest concludes globally.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
