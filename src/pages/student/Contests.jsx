import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Trophy, Clock, ChevronLeft, ChevronRight, Bell, Shuffle } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Contests() {
  const { contests, submissions, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('Past Contests');
  const [now, setNow] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  // Re-evaluate statuses based on current time
  const evaluatedContests = contests
    .filter(c => {
      if (c.targetBatches && c.targetBatches.length > 0) {
        return c.targetBatches.some(b => currentUser?.enrolledBatches?.includes(b));
      }
      return true; // Fallback for legacy mock data without targetBatches
    })
    .map(c => {
      const startTime = new Date(c.scheduledStartTime || c.startTime); 
      const endTime = new Date(c.scheduledEndTime || c.endTime);
      let currentStatus = 'Scheduled';
      if (now >= startTime && now <= endTime) currentStatus = 'Live';
      else if (now > endTime) currentStatus = 'Ended';

      return { ...c, currentStatus, startTimeObj: startTime, endTimeObj: endTime };
    });

  const upcomingContests = evaluatedContests.filter(c => c.currentStatus === 'Scheduled' || c.currentStatus === 'Live').slice(0, 2);
  
  const endedContests = evaluatedContests.filter(c => c.currentStatus === 'Ended');
  const myContests = endedContests.filter(c => submissions.some(s => s.contestId === c.id && s.studentId === currentUser?.id));
  
  const displayContests = activeTab === 'Past Contests' ? endedContests : myContests;

  return (
    <div className="bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-white w-screen relative left-1/2 -ml-[50vw] -mt-4 sm:-mt-6 lg:-mt-8 min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 font-sans animate-in fade-in transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16 mt-8">
        <div className="bg-gradient-to-b from-yellow-400/20 to-transparent p-6 rounded-full mb-6 relative">
          <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>
          <Trophy className="w-16 h-16 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">University Contests</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Compete every week. Compete and see your ranking!</p>
      </div>

      {/* Upcoming Contests */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {upcomingContests.map((contest, idx) => {
          const isWeekly = contest.title.includes('Weekly') && !contest.title.includes('Biweekly');
          const gradient = isWeekly 
            ? 'bg-gradient-to-br from-orange-500/80 to-yellow-500/80' 
            : 'bg-gradient-to-br from-indigo-600/80 to-purple-600/80';
            
          return (
            <div 
              key={contest.id} 
              onClick={() => navigate(`/student/contests/${contest.id}/lobby`)}
              className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${gradient} h-56 flex flex-col justify-end p-8 group border border-black/5 dark:border-white/10`}
            >
              {contest.bgImage && (
                <img 
                  src={contest.bgImage} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              )}
              {/* Overlay gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              
              <div className="relative z-10 flex justify-between items-end w-full">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{contest.title}</h3>
                    {contest.currentStatus === 'Live' && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>}
                  </div>
                  <p className="text-gray-300 text-sm font-medium drop-shadow flex items-center bg-black/40 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                    <Clock className="w-4 h-4 mr-2" />
                    {contest.startTimeObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'})}, {contest.startTimeObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3.5 rounded-2xl transition-colors border border-white/20 flex-shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Past Contests Section */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-200 dark:border-[#333] shadow-xl dark:shadow-2xl transition-colors duration-300">
        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1a1a1a] px-6 pt-2 transition-colors duration-300">
          <div className="flex space-x-6">
            {['Past Contests', 'My Contests'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab 
                    ? 'text-university-600 dark:text-white' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-university-600 dark:bg-white rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
          <button className="p-2 mb-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 rounded-xl transition-colors bg-white dark:bg-[#252525] border border-gray-200 dark:border-transparent">
            <Shuffle className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100 dark:divide-[#333]">
          {displayContests.length === 0 ? (
             <div className="p-16 text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                <Trophy className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-700" />
                <p>No contests found.</p>
             </div>
          ) : (
            displayContests.map(contest => {
              const isBiweekly = contest.title.includes('Biweekly');
              
              return (
                <div key={contest.id} className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors group">
                  <div className="flex items-center space-x-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isBiweekly ? 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-500/30' : 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-500/30'}`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold text-lg cursor-pointer hover:text-university-600 dark:hover:text-blue-400 transition-colors" onClick={() => navigate(`/student/contests/${contest.id}/report`)}>
                        {contest.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {contest.startTimeObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'})}, {contest.startTimeObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="flex flex-col items-end">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-bold bg-gray-100 dark:bg-[#111] px-3 py-1 rounded-lg border border-gray-200 dark:border-[#333] transition-colors">
                        {contest.solvedCount !== undefined ? `${contest.solvedCount}/${contest.totalCount}` : '0/4'}
                      </span>
                    </div>
                    <button 
                      onClick={() => navigate(`/student/contests/${contest.id}/report`)}
                      className="px-6 py-2 rounded-xl border border-gray-300 dark:border-[#444] text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-gray-500 transition-all"
                    >
                      Virtual
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Mock */}
        <div className="flex items-center justify-center space-x-2 p-6 bg-gray-50 dark:bg-[#1a1a1a] transition-colors duration-300">
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-white dark:hover:bg-[#333] rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          {[1, 2, 3, 4, '...', 87].map((page, i) => (
            <button key={i} className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${page === 1 ? 'bg-university-600 text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#333] dark:hover:text-white'}`}>
              {page}
            </button>
          ))}
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-white dark:hover:bg-[#333] rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
