import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { GitBranch, Code2, Trophy, Flame, RefreshCw, CheckCircle2, Award } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Profile() {
  const { currentUser, addToast } = useAppContext();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative">
          <img src={currentUser.photoUrl} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-950 shadow-lg object-cover" />
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg border-2 border-white dark:border-gray-950">
            <Award className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentUser.name}</h1>
          <p className="text-gray-500 text-lg mb-4">{currentUser.erpId} • {currentUser.college} • Year {currentUser.year}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {currentUser.enrolledBatches?.map(b => (
              <Badge key={b} variant="primary">Batch {b}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Coding Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            <Code2 className="w-8 h-8 mx-auto mb-3 text-university-500" />
            <p className="text-gray-500 text-sm font-medium">Problems Solved</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{currentUser.problemsSolved}</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-200 dark:border-orange-900/30 text-center">
            <Flame className="w-8 h-8 mx-auto mb-3 text-orange-500" />
            <p className="text-orange-800 dark:text-orange-300 text-sm font-medium">Current Streak</p>
            <p className="text-3xl font-black text-orange-900 dark:text-orange-100 mt-1">{currentUser.streak} Days</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-900/30 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
            <p className="text-yellow-800 dark:text-yellow-300 text-sm font-medium">Contests Won</p>
            <p className="text-3xl font-black text-yellow-900 dark:text-yellow-100 mt-1">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
