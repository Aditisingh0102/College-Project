import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { GitBranch, Code2, Trophy, Flame, RefreshCw, CheckCircle2, Award } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Profile() {
  const { currentUser, addToast } = useAppContext();
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  if (!currentUser) return null;

  const handleConnectGithub = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsGithubConnected(true);
      addToast("Successfully linked GitHub Account!", "success");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
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
        
        <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl text-center flex-1 md:w-40 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 font-bold mb-1">Global Rank</p>
            <p className="text-2xl font-black text-university-600 dark:text-university-400">#42</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl text-center flex-1 md:w-40 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 font-bold mb-1">Platform Rating</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{currentUser.rating}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Coding Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex items-center"><Code2 className="w-4 h-4 mr-2"/> Problems Solved</span>
                <span className="font-bold text-gray-900 dark:text-white">{currentUser.problemsSolved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex items-center"><Flame className="w-4 h-4 mr-2 text-orange-500"/> Current Streak</span>
                <span className="font-bold text-gray-900 dark:text-white">{currentUser.streak} Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex items-center"><Trophy className="w-4 h-4 mr-2 text-yellow-500"/> Contests Won</span>
                <span className="font-bold text-gray-900 dark:text-white">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Integrations */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-xl text-white relative overflow-hidden border border-gray-800">
            <div className="absolute -right-10 -top-10 opacity-10">
              <GitBranch className="w-64 h-64" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <GitBranch className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Auto-GitHub Portfolio Sync</h2>
              </div>
              
              <p className="text-gray-400 mb-8 max-w-lg">
                Automatically push your successful code submissions, contest results, and beautifully formatted markdown explanations directly to your GitHub profile. Build your developer resume while you learn.
              </p>

              {!isGithubConnected ? (
                <button 
                  onClick={handleConnectGithub}
                  disabled={isSyncing}
                  className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-6 rounded-xl flex items-center transition-colors"
                >
                  {isSyncing ? (
                    <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Connecting...</>
                  ) : (
                    <><GitBranch className="w-5 h-5 mr-2" /> Connect GitHub Account</>
                  )}
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center text-green-400 font-bold bg-green-900/20 w-fit px-4 py-2 rounded-lg border border-green-900/50">
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Connected as @{currentUser.name.toLowerCase().replace(' ', '')}_dev
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <h4 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Recent Auto-Sync Activity</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1"><Code2 className="w-4 h-4 text-university-400" /></div>
                        <div>
                          <p className="text-sm font-medium">Synced "Two Sum" solution (O(N) HashMap)</p>
                          <p className="text-xs text-gray-500">Pushed to /leetcode-portfolio • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-1"><Trophy className="w-4 h-4 text-yellow-400" /></div>
                        <div>
                          <p className="text-sm font-medium">Updated Readme: Reached Top 50 Global Rank</p>
                          <p className="text-xs text-gray-500">Pushed to /profile-readme • 1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <RefreshCw className="w-3 h-3 mr-1" /> Last synced 5 minutes ago. Background syncing is active.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
