import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Users, BookOpen, GraduationCap, ArrowLeft } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function MyBatches() {
  const { currentUser, students } = useAppContext();
  const [selectedBatch, setSelectedBatch] = useState(null);

  if (!currentUser) return null;

  const batches = currentUser.assignedBatches || [];

  if (selectedBatch) {
    const batchStudents = students.filter(s => s.enrolledBatches.includes(selectedBatch));
    
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <button onClick={() => setSelectedBatch(null)} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Batches
        </button>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Batch {selectedBatch} Roster</h2>
              <p className="text-gray-500 dark:text-gray-400">Total {batchStudents.length} Students</p>
            </div>
          </div>
          
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
                {batchStudents.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No students enrolled yet.</td>
                  </tr>
                )}
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
