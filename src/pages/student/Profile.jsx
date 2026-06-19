import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { GitBranch, Code2, Trophy, Flame, CheckCircle2, Award, MapPin, Mail, Calendar, BookOpen, Star, Target } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Profile() {
  const { currentUser, addToast } = useAppContext();
  
  if (!currentUser) return null;

  // Mock Activity Graph Data (7 rows x 20 cols)
  const generateActivityMap = () => {
    const grid = [];
    for (let row = 0; row < 7; row++) {
      const rowData = [];
      for (let col = 0; col < 20; col++) {
        // Random intensity 0-4
        const intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
        rowData.push(intensity);
      }
      grid.push(rowData);
    }
    return grid;
  };
  
  const activityGrid = generateActivityMap();

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Cover & Profile Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className="flex justify-between items-end -mt-16 md:-mt-20 mb-4">
            <div className="relative">
              <img 
                src={currentUser.photoUrl} 
                alt="Profile" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 md:border-8 border-white dark:border-gray-900 shadow-xl object-cover bg-white dark:bg-gray-800" 
              />
              <div className="absolute bottom-2 right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg border-2 border-white dark:border-gray-900" title="Top 5% Performer">
                <Award className="w-5 h-5" />
              </div>
            </div>
            
            <button className="px-6 py-2.5 bg-university-600 hover:bg-university-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors">
              Edit Profile
            </button>
          </div>
          
          {/* Info */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{currentUser.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-4 flex items-center gap-2">
                {currentUser.specialization}
                <span className="text-gray-300 dark:text-gray-700">•</span> 
                {currentUser.college} 
                <span className="text-gray-300 dark:text-gray-700">•</span> 
                Year {currentUser.year}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> Campus B</div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-1.5" /> {currentUser.erpId.toLowerCase()}@university.edu</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Joined Aug 2024</div>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Enrolled Batches</div>
              <div className="flex gap-2">
                {currentUser.enrolledBatches?.map(b => (
                  <Badge key={b} variant="primary">Batch {b.toUpperCase()}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Skills */}
        <div className="space-y-8">
          {/* Stats Box */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Coding Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl"><Code2 className="w-5 h-5" /></div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Problems Solved</span>
                </div>
                <span className="text-2xl font-black text-gray-900 dark:text-white">{currentUser.problemsSolved || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl"><Flame className="w-5 h-5" /></div>
                  <span className="font-semibold text-orange-900 dark:text-orange-100">Current Streak</span>
                </div>
                <span className="text-2xl font-black text-orange-600 dark:text-orange-400">{currentUser.streak || 0}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl"><Trophy className="w-5 h-5" /></div>
                  <span className="font-semibold text-yellow-900 dark:text-yellow-100">Contests Joined</span>
                </div>
                <span className="text-2xl font-black text-yellow-600 dark:text-yellow-400">{currentUser.contestsParticipated || 0}</span>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Skills</h3>
            <div className="space-y-5">
              {[
                { name: 'Java', value: 85, color: 'bg-green-500' },
                { name: 'Data Structures', value: 70, color: 'bg-blue-500' },
                { name: 'SQL', value: 60, color: 'bg-purple-500' },
                { name: 'React', value: 45, color: 'bg-sky-500' }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm font-semibold mb-1.5">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">{skill.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div className={`${skill.color} h-2 rounded-full`} style={{ width: `${skill.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Achievements */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Activity Graph */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
              <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-lg px-3 py-1.5 outline-none text-gray-700 dark:text-gray-300">
                <option>Last 6 Months</option>
                <option>2025</option>
              </select>
            </div>
            
            <div className="overflow-x-auto no-scrollbar pb-4">
              <div className="inline-grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 md:gap-2">
                {activityGrid[0].map((_, colIdx) => (
                  <React.Fragment key={colIdx}>
                    {activityGrid.map((row, rowIdx) => {
                      const intensity = row[colIdx];
                      let colorClass = 'bg-gray-100 dark:bg-gray-800'; // 0
                      if (intensity === 1) colorClass = 'bg-green-200 dark:bg-green-900/40';
                      if (intensity === 2) colorClass = 'bg-green-400 dark:bg-green-700/60';
                      if (intensity === 3) colorClass = 'bg-green-500 dark:bg-green-500';
                      if (intensity === 4) colorClass = 'bg-green-600 dark:bg-green-400';
                      
                      return (
                        <div 
                          key={`${rowIdx}-${colIdx}`} 
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${colorClass} hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all cursor-pointer`}
                          title={`${intensity} submissions`}
                        ></div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
              <span className="mr-2">Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900/40"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700/60"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-400"></div>
              </div>
              <span className="ml-2">More</span>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700/50 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-md mb-0.5">7-Day Streak</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Consistently solved problems for a week.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-md mb-0.5">Problem Solver I</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Solved your first 50 problems successfully.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700/50 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-md mb-0.5">Contest Winner</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Placed Top 10 in Weekly Challenge #45.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
