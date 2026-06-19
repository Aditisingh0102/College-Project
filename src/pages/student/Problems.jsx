import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Badge from '../../components/shared/Badge';
import { Search, Filter, CheckCircle2, Circle, ChevronDown, Code2, PlayCircle, BookOpen, Database, Lock, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const continuePracticing = [
  { id: 1, language: 'Java', icon: '☕', progress: 85, color: 'bg-green-500' },
  { id: 2, language: 'Python', icon: '🐍', progress: 60, color: 'bg-blue-500' },
  { id: 3, language: 'C++', icon: '⚙️', progress: 30, color: 'bg-university-500' },
];

const practiceSkills = [
  { id: 'algos', name: 'Algorithms', icon: '➗' },
  { id: 'ds', name: 'Data Structures', icon: '🧊' },
  { id: 'math', name: 'Mathematics', icon: '∑' },
  { id: 'ai', name: 'Machine Learning', icon: '🤖' },
  { id: 'db', name: 'Databases', icon: '🗄️' },
  { id: 'sys', name: 'System Design', icon: '🏗️' },
];

const topRecruiters = [
  { id: 'google', name: 'Google', count: 120 },
  { id: 'amazon', name: 'Amazon', count: 95 },
  { id: 'microsoft', name: 'Microsoft', count: 80 },
  { id: 'meta', name: 'Meta', count: 75 },
  { id: 'apple', name: 'Apple', count: 40 },
  { id: 'goldman', name: 'Goldman Sachs', count: 65 },
  { id: 'adobe', name: 'Adobe', count: 45 },
];

const dummyProblems = [
  { id: 101, title: 'Array Manipulation Basics', tags: ['Array', 'Math'], acceptance: '85.2', difficulty: 'Easy', status: 'Unsolved' },
  { id: 102, title: 'String Reversal Techniques', tags: ['String', 'Two Pointers'], acceptance: '76.4', difficulty: 'Easy', status: 'Solved' },
  { id: 103, title: 'Optimizing Database Queries', tags: ['Database', 'SQL'], acceptance: '45.1', difficulty: 'Medium', status: 'Unsolved' },
  { id: 104, title: 'Dynamic Programming for Finance', tags: ['DP', 'Math'], acceptance: '32.8', difficulty: 'Hard', status: 'Solved' },
  { id: 105, title: 'Building a Simple Hash Map', tags: ['Hash Table', 'Design'], acceptance: '58.9', difficulty: 'Medium', status: 'Unsolved' },
  { id: 106, title: 'Graph Traversal (BFS & DFS)', tags: ['Graph', 'Algorithms'], acceptance: '41.2', difficulty: 'Medium', status: 'Unsolved' },
  { id: 107, title: 'Advanced Tree Balancing', tags: ['Tree', 'Advanced'], acceptance: '22.5', difficulty: 'Hard', status: 'Unsolved' },
];

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companySearch, setCompanySearch] = useState('');

  const filteredProblems = dummyProblems.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Problems</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sharpen your coding skills with our curated problem set.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Continue Practicing Section */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Continue Practicing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {continuePracticing.map(lang => (
                <div key={lang.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{lang.icon}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{lang.language}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${lang.color} rounded-full`} style={{ width: `${lang.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {lang.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Problem List Section */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            
            {/* Top Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-4 py-2 bg-university-50 dark:bg-university-900/30 text-university-600 dark:text-university-400 rounded-full text-sm font-semibold hover:bg-university-100 dark:hover:bg-university-900/50 transition">
                All Topics
              </button>
              <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Algorithms
              </button>
              <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Database
              </button>
              <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Data Structures
              </button>
            </div>

            {/* Search & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search problems..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-university-500 text-gray-900 dark:text-white transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                 <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Circle className="w-4 h-4 text-green-500" /> 
                    <span>12/150 Solved</span>
                 </div>
                 <button className="p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                   <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                 </button>
              </div>
            </div>

            {/* Problems Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                    <th className="px-4 py-3 font-medium w-16">Status</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium w-24">Acceptance</th>
                    <th className="px-4 py-3 font-medium w-28">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredProblems.map((problem) => (
                    <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition group">
                      <td className="px-4 py-4">
                        {problem.status === 'Solved' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <Link to={`/student/problems/${problem.id}`} className="font-bold text-gray-900 dark:text-white hover:text-university-600 dark:hover:text-university-400 transition flex items-center">
                          {problem.title}
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {problem.tags.map(tag => (
                            <button key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                              {tag}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {problem.acceptance || '55.2'}%
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'danger'}>
                          {problem.difficulty}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredProblems.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                        No problems found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Practice Skills */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Practice Skills</h2>
            <div className="grid grid-cols-1 gap-2">
              {practiceSkills.map(skill => (
                <button key={skill.id} className="flex items-center justify-start p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700 rounded-xl transition text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <span className="mr-3 text-base">{skill.icon}</span>
                  <span className="truncate">{skill.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Top Recruiters */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Recruiters</h2>
            
            <div className="relative mb-5">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search companies..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-university-500 rounded-xl text-sm focus:outline-none text-gray-900 dark:text-white transition"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {topRecruiters
                .filter(c => c.name.toLowerCase().includes(companySearch.toLowerCase()))
                .map(company => (
                <button key={company.id} className="flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full transition text-sm font-medium text-gray-700 dark:text-gray-300">
                  {company.name} 
                  <span className="ml-2 bg-university-100 dark:bg-university-900/30 text-university-700 dark:text-university-400 px-1.5 py-0.5 rounded-full text-xs font-bold">
                    {company.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
