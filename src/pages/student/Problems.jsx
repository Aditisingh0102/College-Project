import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Badge from '../../components/shared/Badge';
import { Search, Filter, CheckCircle2, Circle } from 'lucide-react';

export default function Problems() {
  const { problems } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Problems</h1>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search problems or tags..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-university-500 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Acceptance</th>
                <th className="px-6 py-4 font-medium">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredProblems.map((problem) => (
                <tr key={problem.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    {problem.status === 'Solved' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/student/problems/${problem.id}`} className="font-medium text-gray-900 dark:text-white hover:text-university-600 dark:hover:text-university-400">
                      {problem.title}
                    </Link>
                    <div className="flex space-x-2 mt-1">
                      {problem.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {problem.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {problem.acceptance || '--'}%
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'danger'}>
                      {problem.difficulty}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No problems found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
