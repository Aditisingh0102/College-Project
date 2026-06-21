import React, { useState } from 'react';
import { Book, Download, Search, FileText, Filter, Folder, ExternalLink } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const mockResources = [
  { id: 'r1', title: 'Data Structures Complete Notes', type: 'PDF Notes', subject: 'Computer Science', year: '2nd Year', size: '2.4 MB', uploader: 'Dr. Vikram Singh', date: '10/06/2026' },
  { id: 'r2', title: 'DBMS Previous Year Paper (2025)', type: 'Exam Paper', subject: 'Computer Science', year: '3rd Year', size: '1.1 MB', uploader: 'Admin', date: '05/06/2026' },
  { id: 'r3', title: 'Operating Systems - Galvin (E-Book)', type: 'Reference Book', subject: 'Computer Science', year: '3rd Year', size: '15 MB', uploader: 'Prof. Neha Verma', date: '01/06/2026' },
  { id: 'r4', title: 'Machine Learning Algorithms Cheatsheet', type: 'PDF Notes', subject: 'Data Science', year: '4th Year', size: '0.8 MB', uploader: 'Dr. Arvind Gupta', date: '15/06/2026' },
  { id: 'r5', title: 'C Programming Lab Manual', type: 'Lab Manual', subject: 'Computer Science', year: '1st Year', size: '3.2 MB', uploader: 'Mr. Rajat Kumar', date: '20/06/2026' }
];

export default function ELibrary() {
  const { activeRole } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = mockResources.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Digital Library</h1>
          <p className="text-gray-500 dark:text-gray-400">Access and download study materials, previous papers, and reference books.</p>
        </div>
        {(activeRole === 'faculty' || activeRole === 'admin') && (
          <button className="flex items-center px-4 py-2 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
            <Book className="w-5 h-5 mr-2" /> Upload Material
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none shadow-sm">
              <option>All Types</option>
              <option>PDF Notes</option>
              <option>Exam Paper</option>
              <option>Reference Book</option>
            </select>
            <select className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none shadow-sm">
              <option>All Years</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="group border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800/50 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                    {resource.type === 'PDF Notes' ? <FileText className="w-6 h-6" /> : resource.type === 'Exam Paper' ? <ExternalLink className="w-6 h-6" /> : <Book className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">{resource.size}</span>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-university-600 transition-colors line-clamp-1">{resource.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{resource.subject} • {resource.year}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
                  <div className="text-xs text-gray-500">
                    <p>Uploaded by: <span className="font-semibold text-gray-700 dark:text-gray-300">{resource.uploader}</span></p>
                    <p>{resource.date}</p>
                  </div>
                  <button className="p-2 text-university-600 hover:bg-university-50 dark:hover:bg-university-900/30 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {filteredResources.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No resources found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
