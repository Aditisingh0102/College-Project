import React, { useState } from 'react';
import { Trophy, Plus, Settings, PlayCircle, Users, Clock, AlertCircle, BarChart3, ChevronRight } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function ContestManager() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const contests = [
    { id: 1, title: 'Weekly Coding Challenge #45', date: 'Oct 15, 2026', time: '18:00 - 20:00', registered: 142, status: 'Upcoming', difficulty: 'Medium' },
    { id: 2, title: 'Freshers Debugging Contest', date: 'Oct 18, 2026', time: '14:00 - 16:00', registered: 315, status: 'Draft', difficulty: 'Easy' },
    { id: 3, title: 'Advanced Graph Algorithms', date: 'Oct 25, 2026', time: '20:00 - 23:00', registered: 89, status: 'Scheduled', difficulty: 'Hard' },
  ];

  const liveContest = {
    title: "Mid-Term Coding Assessment: DSA",
    timeRemaining: "45:20",
    activeParticipants: 218,
    averageScore: "68/100",
    leaderboard: [
      { rank: 1, name: "Aarav Sharma", score: 100, time: "32m 14s", status: "Finished" },
      { rank: 2, name: "Priya Patel", score: 100, time: "38m 05s", status: "Finished" },
      { rank: 3, name: "Rahul Verma", score: 85, time: "41m 22s", status: "Coding" },
      { rank: 4, name: "Neha Gupta", score: 70, time: "44m 10s", status: "Coding" },
      { rank: 5, name: "Vikram Singh", score: 65, time: "45m 00s", status: "Debugging" },
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-university-600" /> Contest Manager
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Design, schedule, and host competitive coding events with real-time tracking.</p>
        </div>
        
        <button className="px-5 py-2.5 bg-university-600 hover:bg-university-700 text-white font-medium rounded-xl shadow-lg shadow-university-600/30 transition-all flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Host New Contest
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Management */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl inline-flex">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'upcoming' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Scheduled Contests
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'past' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Past Events
            </button>
          </div>

          <div className="grid gap-4">
            {contests.map(contest => (
              <div key={contest.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md hover:border-university-300 dark:hover:border-university-700 transition-all group">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{contest.title}</h3>
                      <Badge variant={contest.status === 'Upcoming' ? 'info' : contest.status === 'Scheduled' ? 'success' : 'default'}>{contest.status}</Badge>
                      <Badge variant={contest.difficulty === 'Hard' ? 'danger' : contest.difficulty === 'Medium' ? 'warning' : 'success'}>{contest.difficulty}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-3">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-gray-400" /> {contest.date} • {contest.time}</span>
                      <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-gray-400" /> {contest.registered} Registered</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-full md:w-auto">
                    <button className="p-2.5 text-gray-500 hover:text-university-600 hover:bg-university-50 dark:hover:bg-university-900/30 rounded-lg transition-colors border border-transparent hover:border-university-200 dark:hover:border-university-800" title="Settings">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button className="flex-1 md:flex-none px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition-colors">
                      Manage Problems
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Tracking Widget */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-university-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
            
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-3">
                <PlayCircle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold tracking-wider text-white">LIVE CONTEST</span>
              </div>
              <h2 className="text-xl font-bold leading-tight">{liveContest.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-xs text-indigo-200 uppercase font-bold mb-1">Time Left</p>
                <p className="text-2xl font-mono font-bold text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-300" /> {liveContest.timeRemaining}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-xs text-indigo-200 uppercase font-bold mb-1">Active Users</p>
                <p className="text-2xl font-bold text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-indigo-300" /> {liveContest.activeParticipants}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-bold border-b border-white/20 pb-2">
                <span className="text-indigo-200">Live Leaderboard</span>
                <span className="text-indigo-200">Score</span>
              </div>
              {liveContest.leaderboard.map((student) => (
                <div key={student.rank} className="flex items-center justify-between text-sm bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors cursor-default">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${student.rank <= 3 ? 'bg-yellow-400/20 text-yellow-300' : 'bg-white/10 text-white'}`}>
                      {student.rank}
                    </span>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {student.status === 'Finished' ? (
                      <span className="text-xs text-emerald-400 hidden sm:inline-block">Done</span>
                    ) : (
                      <span className="text-xs text-amber-400 animate-pulse hidden sm:inline-block">{student.status}</span>
                    )}
                    <span className="font-bold font-mono">{student.score}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-white text-university-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <BarChart3 className="w-5 h-5 mr-2" /> Open Full Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
