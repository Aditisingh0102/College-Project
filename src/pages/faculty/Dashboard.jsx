import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import Badge from '../../components/shared/Badge';
import { Users, BookOpen, FileEdit, Calendar, AlertCircle, CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  const activeBatches = [
    { id: 1, name: 'B.Tech CSE 2026 Alpha', students: 65, nextClass: 'Tomorrow, 10:00 AM', subject: 'Data Structures' },
    { id: 2, name: 'B.Tech CSE 2026 Beta', students: 62, nextClass: 'Today, 2:00 PM', subject: 'Data Structures' },
    { id: 3, name: 'M.Tech AI 2024', students: 28, nextClass: 'Thursday, 11:30 AM', subject: 'Machine Learning' },
  ];

  const actionItems = [
    { id: 1, text: '3 Unapproved submissions in DSA Assignment', type: 'urgent', time: '2 hours ago' },
    { id: 2, text: 'Upcoming Quiz: Graph Theory tomorrow', type: 'warning', time: '5 hours ago' },
    { id: 3, text: 'Upload Week 4 Lecture Notes', type: 'info', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Teaching Tracker Banner */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-6">
            <img src={currentUser.photoUrl} alt="Avatar" className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-lg object-cover" />
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-50">Faculty Portal</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-1">Welcome, Prof. {currentUser.name.split(' ')[0]}</h1>
              <p className="text-teal-100 font-medium opacity-90">{currentUser.designation} • Dept of {currentUser.department}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 transition-colors text-sm font-bold flex items-center shadow-lg">
              <PlayCircle className="w-5 h-5 mr-2 text-teal-200" /> Start Live Class
            </button>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Batches Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Batches</h2>
            <Link to="/faculty/batches" className="text-sm text-teal-600 dark:text-teal-400 hover:underline font-medium">View All Batches</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeBatches.map(batch => (
              <div key={batch.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <Badge variant="success">{batch.students} Students</Badge>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{batch.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{batch.subject}</p>
                
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <Calendar className="w-4 h-4 mr-1.5" /> {batch.nextClass}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors" />
                </div>
              </div>
            ))}
            
            {/* Create New Batch Card */}
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer min-h-[200px]">
              <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm mb-3">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Create New Batch</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[200px]">Set up a new classroom and invite students.</p>
            </div>
          </div>
        </div>

        {/* To-Do / Action Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Action Items</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-2">
            {actionItems.map((item, i) => (
              <div key={item.id} className={`flex items-start p-4 ${i !== actionItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''} hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer`}>
                <div className="mt-0.5 mr-4">
                  {item.type === 'urgent' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  {item.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500" />}
                  {item.type === 'info' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors text-sm">
            View All Tasks
          </button>
        </div>

      </div>
    </div>
  );
}
