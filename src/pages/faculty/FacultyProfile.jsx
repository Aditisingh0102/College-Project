import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, BookOpen, Building, ExternalLink, Edit3, Plus } from 'lucide-react';
import Badge from '../../components/shared/Badge';
import { Link } from 'react-router-dom';

export default function FacultyProfile() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  const handleEdit = () => {
    alert("Edit Profile modal would open here");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Cover & Profile Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
        <div className="h-48 bg-gradient-to-r from-university-700 via-university-600 to-indigo-800 relative cursor-pointer group" title="Click to change cover photo">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute right-4 bottom-4 bg-white/20 backdrop-blur-md p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex items-end space-x-5">
              <div className="relative group cursor-pointer" title="Click to change profile photo">
                <img 
                  src={currentUser.photoUrl} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl object-cover relative z-10 bg-white dark:bg-gray-800 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-20 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mb-2 hidden sm:block">
                <Badge variant="success" className="mb-2 cursor-pointer hover:bg-green-200 transition-colors">Verified Faculty</Badge>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight cursor-text">{currentUser.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium cursor-text">{currentUser.designation}</p>
              </div>
            </div>
            
            <button onClick={handleEdit} className="px-6 py-2.5 bg-university-600 hover:bg-university-700 text-white font-medium rounded-xl transition-all sm:mb-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0">
              Edit Profile
            </button>
          </div>

          <div className="sm:hidden mb-6">
            <Badge variant="success" className="mb-2 cursor-pointer">Verified Faculty</Badge>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{currentUser.designation}</p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <a href={`mailto:${currentUser.email}`} className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 hover:bg-university-50 dark:hover:bg-university-900/20 p-3 rounded-xl transition-colors cursor-pointer group">
              <Mail className="w-5 h-5 mr-3 text-university-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{currentUser.email}</span>
            </a>
            <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 hover:bg-university-50 dark:hover:bg-university-900/20 p-3 rounded-xl transition-colors cursor-pointer group">
              <Building className="w-5 h-5 mr-3 text-university-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Dept. of {currentUser.department}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 hover:bg-university-50 dark:hover:bg-university-900/20 p-3 rounded-xl transition-colors cursor-pointer group">
              <MapPin className="w-5 h-5 mr-3 text-university-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Faculty Block B, Room 402</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Academic Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center cursor-default">
                <Briefcase className="w-5 h-5 mr-2 text-university-500" /> Professional Info
              </h2>
              <button className="text-gray-400 hover:text-university-600 transition-colors" title="Edit Professional Info"><Edit3 className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="cursor-pointer group">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-university-500 transition-colors">Employee ID</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.id}</p>
              </div>
              <div className="cursor-pointer group">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-university-500 transition-colors">Joined Date</p>
                <p className="font-medium text-gray-900 dark:text-white">August 12, 2018</p>
              </div>
              <div className="cursor-pointer group">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-university-500 transition-colors">Primary Branch</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.branch}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center cursor-default">
                <GraduationCap className="w-5 h-5 mr-2 text-university-500" /> Qualifications
              </h2>
              <button className="text-gray-400 hover:text-university-600 transition-colors" title="Edit Qualifications"><Edit3 className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-university-500 pl-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -ml-2 rounded-r-lg transition-colors">
                <p className="font-bold text-gray-900 dark:text-white text-sm">Ph.D. in Computer Science</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Stanford University (2018)</p>
              </div>
              <div className="border-l-2 border-indigo-400 pl-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -ml-2 rounded-r-lg transition-colors">
                <p className="font-bold text-gray-900 dark:text-white text-sm">M.Tech in Software Engineering</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">IIT Bombay (2014)</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -ml-2 rounded-r-lg transition-colors">
                <p className="font-bold text-gray-900 dark:text-white text-sm">B.Tech in Computer Science</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Delhi University (2012)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Teaching & Research */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center cursor-default">
                <BookOpen className="w-5 h-5 mr-2 text-university-500" /> Assigned Subjects
              </h2>
              <Link to="/faculty/courses" className="text-sm font-bold text-university-600 hover:underline">Manage</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.subjectsTaught?.map(subject => (
                <Link to="/faculty/courses" key={subject} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-university-400 hover:bg-university-50 dark:hover:bg-university-900/20 p-3 rounded-xl flex items-center justify-between group transition-all cursor-pointer">
                  <span className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-university-700 dark:group-hover:text-university-400 transition-colors">{subject}</span>
                  <Badge variant="info" className="group-hover:bg-university-200 dark:group-hover:bg-university-800 transition-colors">Active</Badge>
                </Link>
              ))}
              {(!currentUser.subjectsTaught || currentUser.subjectsTaught.length === 0) && (
                 <div className="col-span-2 text-center py-4 text-gray-500 italic text-sm">No active subjects assigned.</div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center cursor-default">
                <Award className="w-5 h-5 mr-2 text-university-500" /> Research & Publications
              </h2>
              <button className="text-sm font-bold text-university-600 hover:underline flex items-center"><Plus className="w-4 h-4 mr-1"/> Add New</button>
            </div>
            <div className="space-y-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="block bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-university-300 dark:hover:border-university-700 hover:shadow-sm transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-university-600 dark:group-hover:text-university-400 transition-colors">Optimizing Graph Traversal Algorithms in Distributed Systems</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published in IEEE Transactions on Parallel and Distributed Systems • 2023</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-university-500" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-university-100 dark:hover:bg-university-900/50 cursor-pointer transition-colors">Distributed Systems</span>
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-university-100 dark:hover:bg-university-900/50 cursor-pointer transition-colors">Graph Theory</span>
                </div>
              </a>
              
              <a href="#" onClick={(e) => e.preventDefault()} className="block bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-university-300 dark:hover:border-university-700 hover:shadow-sm transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-university-600 dark:group-hover:text-university-400 transition-colors">Machine Learning Approaches for Predictive Syntax Analysis</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published in ACM Symposium on Applied Computing • 2021</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-university-500" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-university-100 dark:hover:bg-university-900/50 cursor-pointer transition-colors">Machine Learning</span>
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-university-100 dark:hover:bg-university-900/50 cursor-pointer transition-colors">Compilers</span>
                </div>
              </a>

              <a href="#" onClick={(e) => e.preventDefault()} className="block bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-university-300 dark:hover:border-university-700 hover:shadow-sm transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-university-600 dark:group-hover:text-university-400 transition-colors">Advanced Memory Management in Modern OS</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published in Journal of Computer Systems • 2019</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-university-500" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-university-100 dark:hover:bg-university-900/50 cursor-pointer transition-colors">Operating Systems</span>
                  <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-university-100 dark:hover:bg-university-900/50 cursor-pointer transition-colors">Memory Management</span>
                </div>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
