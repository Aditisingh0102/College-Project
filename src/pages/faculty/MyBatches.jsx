import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Users, Search, ChevronRight, User, BookOpen, AlertCircle, BarChart2, ArrowLeft } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function MyBatches() {
  const { currentUser, students } = useAppContext();
  const [selectedBatch, setSelectedBatch] = useState(null);

  if (!currentUser) return null;

  const batches = currentUser.assignedBatches || [];

  if (selectedBatch) {
    const batchStudents = students.filter(s => s.enrolledBatches.includes(selectedBatch));
    
    return (
      <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
        <button 
          onClick={() => setSelectedBatch(null)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-university-600 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all batches
        </button>
        
        <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Batch {selectedBatch}</h2>
            <p className="text-gray-500 mt-1">Detailed student roster and performance analytics.</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        {/* Skill Heatmap Panel */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-university-600" /> Batch Skill Heatmap
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Visual indicator of aggregate performance across key topics. Red indicates the batch is struggling and requires intervention.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4 rounded-xl text-center">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Arrays & Hashing</p>
              <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">85%</h4>
              <p className="text-xs text-green-700/70 dark:text-green-500 mt-1">Passing</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4 rounded-xl text-center">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Two Pointers</p>
              <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">72%</h4>
              <p className="text-xs text-green-700/70 dark:text-green-500 mt-1">Passing</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 p-4 rounded-xl text-center relative overflow-hidden">
              <p className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-1">Binary Trees</p>
              <h4 className="text-2xl font-bold text-orange-600 dark:text-orange-400">45%</h4>
              <p className="text-xs text-orange-700/70 dark:text-orange-500 mt-1">Needs Work</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4 rounded-xl text-center relative">
              <div className="absolute top-2 right-2"><AlertCircle className="w-4 h-4 text-red-500" /></div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Dynamic Prog</p>
              <h4 className="text-2xl font-bold text-red-600 dark:text-red-400">22%</h4>
              <p className="text-xs text-red-700/70 dark:text-red-500 mt-1">Critical Priority</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Student Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">ERP ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Year/Sem</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 text-right">Avg Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {batchStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={student.photoUrl} alt="" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
                        <span className="font-semibold text-gray-900 dark:text-white">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{student.erpId}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{student.year} - {student.semester}</td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant="success">{Math.floor(Math.random() * 20 + 75)}/100</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Allocated Batches</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Select a batch to view its student roster and performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map(batchId => {
          const batchStudents = students.filter(s => s.enrolledBatches.includes(batchId));
          return (
            <div 
              key={batchId} 
              onClick={() => setSelectedBatch(batchId)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:border-university-500 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-university-50 dark:bg-university-900/20 rounded-xl flex items-center justify-center group-hover:bg-university-600 group-hover:text-white transition-colors">
                  <Users className="w-6 h-6 text-university-600 dark:text-university-400 group-hover:text-white" />
                </div>
                <Badge variant="primary">Active</Badge>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Batch {batchId}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" /> {batchStudents.length} Enrolled Students
              </p>
            </div>
          );
        })}
        {batches.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            You currently have no batches assigned. Contact your HOD.
          </div>
        )}
      </div>
    </div>
  );
}
