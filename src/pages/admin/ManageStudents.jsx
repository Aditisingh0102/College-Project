import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Filter, ShieldAlert, Award } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function ManageStudents() {
  const { students } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.erpId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Students</h1>
          <p className="text-gray-500 dark:text-gray-400">Global table of all students with bulk actions.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by student name or ERP ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </button>
            <button className="flex items-center px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition">
              <ShieldAlert className="w-5 h-5 mr-2" /> Bulk Action
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4">
                  <input type="checkbox" className="rounded text-university-600" />
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ERP ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">College / Domain</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded text-university-600" />
                  </td>
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
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{student.college}</p>
                    <p className="text-xs text-gray-500">{student.specialization}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900 dark:text-white">{student.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No students found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
