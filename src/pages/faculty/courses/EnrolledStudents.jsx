import React from 'react';
import { Users, Search, Filter, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import Badge from '../../../components/shared/Badge';

export default function EnrolledStudents() {
  const students = [
    { id: 'STU001', name: 'Aarav Sharma', batch: 'B.Tech CSE 2026 Alpha', attendance: '92%', status: 'Active', grade: 'A' },
    { id: 'STU002', name: 'Priya Patel', batch: 'B.Tech CSE 2026 Alpha', attendance: '88%', status: 'Active', grade: 'B+' },
    { id: 'STU003', name: 'Rahul Verma', batch: 'B.Tech CSE 2026 Beta', attendance: '95%', status: 'Active', grade: 'A+' },
    { id: 'STU004', name: 'Sneha Gupta', batch: 'M.Tech AI 2024', attendance: '76%', status: 'Warning', grade: 'C' },
    { id: 'STU005', name: 'Vikram Singh', batch: 'B.Tech CSE 2026 Alpha', attendance: '85%', status: 'Active', grade: 'B' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="w-6 h-6 mr-3 text-teal-600" /> Enrolled Students
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all students assigned to your courses.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="p-4">Student Name</th>
                <th className="p-4">ID / Roll No</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Grade (Est)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">{student.name}</td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{student.id}</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{student.batch}</td>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-200">{student.attendance}</td>
                  <td className="p-4 font-bold text-teal-600 dark:text-teal-400">{student.grade}</td>
                  <td className="p-4">
                    {student.status === 'Active' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        <XCircle className="w-3 h-3 mr-1" /> Warning
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-teal-600 transition-colors rounded">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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
