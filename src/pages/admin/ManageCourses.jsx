import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { BookOpen, Search, Filter, Trash2, Eye, FileText, Video, PlayCircle } from 'lucide-react';
import Badge from '../../components/shared/Badge';

// Dummy Data
const initialCourses = [
  { id: 'c1', title: 'Summer Training: Full Stack Dev', type: 'Training', faculty: 'Dr. Vikram Singh', year: '3rd Year', batches: ['CSE-A', 'CSE-B'], studentsEnrolled: 120, modules: 15, date: '21/06/2026' },
  { id: 'c2', title: 'Data Structures Crash Course', type: 'Core Course', faculty: 'Prof. Neha Verma', year: '2nd Year', batches: ['All CSE'], studentsEnrolled: 450, modules: 8, date: '15/06/2026' },
  { id: 'c3', title: 'Machine Learning Bootcamp', type: 'Workshop', faculty: 'Dr. Arvind Gupta', year: '4th Year', batches: ['CSE-A', 'ECE-A'], studentsEnrolled: 85, modules: 5, date: '10/06/2026' },
  { id: 'c4', title: 'Winter Placement Prep', type: 'Training', faculty: 'Dr. Vikram Singh', year: '4th Year', batches: ['All'], studentsEnrolled: 600, modules: 20, date: '01/01/2026' }
];

export default function ManageCourses() {
  const { currentUser } = useAppContext();
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this course and all its modules? This action cannot be undone.')){
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Training & Courses</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor courses uploaded by faculty, manage summer trainings, and delete inappropriate content.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
            <BookOpen className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Total Courses</h3>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{courses.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
            <PlayCircle className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Summer Trainings</h3>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{courses.filter(c => c.type === 'Training').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center text-purple-600 dark:text-purple-400 mb-2">
            <Video className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Total Modules</h3>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">
            {courses.reduce((acc, curr) => acc + curr.modules, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by course title or faculty name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 transition">
            <Filter className="w-5 h-5 mr-2" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course / Training Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Target Audience</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCourses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-base group-hover:text-university-600 transition-colors">{course.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={course.type === 'Training' ? 'warning' : 'primary'} className="text-[10px] px-2">{course.type}</Badge>
                          <span className="text-xs text-gray-500">{course.modules} Modules</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{course.faculty}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Uploaded on {course.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{course.year}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{course.batches.join(', ')}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors" title="View Course Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors" title="Delete Course">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">No courses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
