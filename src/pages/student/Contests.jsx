import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Trophy, Clock, Users, CalendarDays, CheckCircle2 } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Contests() {
  const { contests, submissions, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [now, setNow] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  // Re-evaluate statuses based on current time
  const evaluatedContests = contests.map(c => {
    const startTime = new Date(c.scheduledStartTime);
    const endTime = new Date(c.scheduledEndTime);
    let currentStatus = 'Scheduled';
    if (now >= startTime && now <= endTime) currentStatus = 'Live';
    else if (now > endTime) currentStatus = 'Ended';

    return { ...c, currentStatus, startTimeObj: startTime, endTimeObj: endTime };
  });

  const filteredContests = evaluatedContests.filter(c => c.currentStatus === activeTab);

  const handleActionClick = (contest) => {
    if (contest.currentStatus === 'Scheduled') {
      navigate(`/student/contests/${contest.id}/lobby`);
    } else if (contest.currentStatus === 'Live') {
      navigate(`/student/contests/${contest.id}`);
    } else {
      navigate(`/student/contests/${contest.id}/report`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contests</h1>

      <div className="flex border-b border-gray-200 dark:border-gray-800">
        {['Scheduled', 'Live', 'Ended'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-university-600 text-university-600 dark:text-university-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredContests.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
            No {activeTab.toLowerCase()} contests found.
          </div>
        ) : (
          filteredContests.map(contest => {
            const hasSubmitted = submissions.some(s => s.contestId === contest.id && s.studentId === currentUser?.id);
            
            return (
              <div key={contest.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`p-4 rounded-xl ${
                    contest.currentStatus === 'Live' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    contest.currentStatus === 'Scheduled' ? 'bg-university-100 text-university-600 dark:bg-university-900/30 dark:text-university-400' :
                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{contest.title}</h3>
                      {contest.currentStatus === 'Live' && <Badge variant="danger"><span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>Live Now</span></Badge>}
                      {hasSubmitted && <Badge variant="success"><span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Completed</span></Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> {contest.startTimeObj.toLocaleDateString()}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {contest.startTimeObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {contest.durationMins} mins</span>
                      <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {contest.participantsCount} Registered</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => handleActionClick(contest)}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all w-full md:w-auto ${
                      contest.currentStatus === 'Live' ? 'bg-university-600 hover:bg-university-700 text-white shadow-md hover:shadow-lg' :
                      contest.currentStatus === 'Scheduled' ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white' :
                      'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {contest.currentStatus === 'Live' ? 'Enter Contest' : contest.currentStatus === 'Scheduled' ? 'Go to Lobby' : 'View Report & Solutions'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
