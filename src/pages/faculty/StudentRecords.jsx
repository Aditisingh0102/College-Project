import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Filter, Mail } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function StudentRecords() {
  const { currentUser, students } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Get all students that belong to any of the faculty's assigned batches
  const assignedBatches = currentUser?.assignedBatches || [];
  const facultyStudents = students.filter(s => s.enrolledBatches.some(b => assignedBatches.includes(b)));

  const filteredStudents = facultyStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.erpId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Records</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and monitor students across your assigned batches.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or ERP ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <Filter className="w-5 h-5 mr-2" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Profile</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ERP ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Batches</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform Rating</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={student.photoUrl} alt="" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.year} - {student.semester}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{student.erpId}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledBatches.filter(b => assignedBatches.includes(b)).map(b => (
                        <span key={b} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">Batch {b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900 dark:text-white">{student.rating}</span>
                      <Badge variant="warning">{student.problemsSolved} Solved</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-university-600 dark:hover:text-university-400 transition" title="Email Student">
                      <Mail className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No students found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
