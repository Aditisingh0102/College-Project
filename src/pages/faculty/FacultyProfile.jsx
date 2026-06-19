import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, BookOpen, Building } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function FacultyProfile() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Cover & Profile Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="h-48 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex items-end space-x-5">
              <img 
                src={currentUser.photoUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl object-cover relative z-10 bg-white dark:bg-gray-800"
              />
              <div className="mb-2 hidden sm:block">
                <Badge variant="success" className="mb-2">Verified Faculty</Badge>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">{currentUser.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{currentUser.designation}</p>
              </div>
            </div>
            
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition-colors sm:mb-2 border border-gray-200 dark:border-gray-700">
              Edit Profile
            </button>
          </div>

          <div className="sm:hidden mb-6">
            <Badge variant="success" className="mb-2">Verified Faculty</Badge>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{currentUser.designation}</p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <Mail className="w-5 h-5 mr-3 text-teal-500" />
              <span className="text-sm font-medium">{currentUser.email}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <Building className="w-5 h-5 mr-3 text-teal-500" />
              <span className="text-sm font-medium">Dept. of {currentUser.department}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <MapPin className="w-5 h-5 mr-3 text-teal-500" />
              <span className="text-sm font-medium">Faculty Block B, Room 402</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Academic Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-teal-500" /> Professional Info
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">Employee ID</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">Joined Date</p>
                <p className="font-medium text-gray-900 dark:text-white">August 12, 2018</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">Primary Branch</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.branch}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-teal-500" /> Qualifications
            </h2>
            <div className="space-y-3">
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-bold text-gray-900 dark:text-white text-sm">Ph.D. in Computer Science</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Stanford University (2018)</p>
              </div>
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                <p className="font-bold text-gray-900 dark:text-white text-sm">M.Tech in Software Engineering</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">IIT Bombay (2014)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Teaching & Research */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-teal-500" /> Assigned Subjects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.subjectsTaught?.map(subject => (
                <div key={subject} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{subject}</span>
                  <Badge variant="info">Active</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-teal-500" /> Research & Publications
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Optimizing Graph Traversal Algorithms in Distributed Systems</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published in IEEE Transactions on Parallel and Distributed Systems • 2023</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300">Distributed Systems</span>
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300">Graph Theory</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Machine Learning Approaches for Predictive Syntax Analysis</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published in ACM Symposium on Applied Computing • 2021</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300">Machine Learning</span>
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300">Compilers</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
