import React from 'react';
import { FileEdit, Plus, Calendar, Clock, CheckCircle, Search } from 'lucide-react';
import Badge from '../../../components/shared/Badge';

export default function AssessmentManager() {
  const assessments = [
    { id: 1, title: 'Data Structures Mid-Term', batch: 'B.Tech CSE 2026 Alpha', dueDate: 'Oct 15, 2026', submitted: 62, total: 65, status: 'Grading' },
    { id: 2, title: 'Machine Learning Model Analysis', batch: 'M.Tech AI 2024', dueDate: 'Oct 20, 2026', submitted: 15, total: 28, status: 'Active' },
    { id: 3, title: 'Algorithm Complexity Assignment', batch: 'B.Tech CSE 2026 Beta', dueDate: 'Sep 30, 2026', submitted: 62, total: 62, status: 'Completed' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileEdit className="w-6 h-6 mr-3 text-teal-600" /> Assessment Manager
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create assignments, set rubrics, and grade student submissions.</p>
        </div>
        
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" /> New Assessment
        </button>
      </div>

      <div className="grid gap-4">
        {assessments.map(assessment => (
          <div key={assessment.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{assessment.title}</h3>
                <Badge variant={assessment.status === 'Active' ? 'warning' : assessment.status === 'Completed' ? 'success' : 'info'}>
                  {assessment.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{assessment.batch}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" /> Due: {assessment.dueDate}
                </div>
                <div className="flex items-center font-medium">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> {assessment.submitted} / {assessment.total} Submitted
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              {assessment.status === 'Grading' ? (
                <button className="w-full md:w-auto px-6 py-2 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 font-bold rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                  Grade Submissions
                </button>
              ) : assessment.status === 'Active' ? (
                <button className="w-full md:w-auto px-6 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Edit Details
                </button>
              ) : (
                <button className="w-full md:w-auto px-6 py-2 bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400 font-bold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                  View Results
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
