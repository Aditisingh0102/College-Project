import React from 'react';
import { HelpCircle, Plus, Settings, Play, Clock, BarChart } from 'lucide-react';
import Badge from '../../../components/shared/Badge';

export default function QuizCreator() {
  const quizzes = [
    { id: 1, title: 'Weekly Conceptual Quiz #4', course: 'Data Structures', scheduledFor: 'Oct 12, 2026 10:00 AM', duration: '30 mins', status: 'Scheduled' },
    { id: 2, pop: true, title: 'Pop Quiz: Trees & Graphs', course: 'Data Structures', scheduledFor: 'Unscheduled', duration: '15 mins', status: 'Draft' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <HelpCircle className="w-6 h-6 mr-3 text-teal-600" /> Quiz Creator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Build, schedule, and analyze automated quizzes for your batches.</p>
        </div>
        
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Create New Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Quizzes</h2>
          
          <div className="grid gap-4">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{quiz.title}</h3>
                    <Badge variant={quiz.status === 'Scheduled' ? 'success' : 'default'}>{quiz.status}</Badge>
                    {quiz.pop && <Badge variant="warning">Pop Quiz</Badge>}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {quiz.scheduledFor}</span>
                    <span className="flex items-center">⏱️ {quiz.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors" title="Settings">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors">
                    Edit Questions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quick Tools</h2>
          
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-100 dark:border-teal-800/50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
            <Play className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
            <h3 className="font-bold text-teal-900 dark:text-teal-100 text-lg mb-2">Launch Pop Quiz</h3>
            <p className="text-sm text-teal-700 dark:text-teal-300">Instantly push a short quiz to an active live lecture session.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <BarChart className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Performance Analytics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">View aggregate score distributions and identify weak conceptual areas across batches.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
