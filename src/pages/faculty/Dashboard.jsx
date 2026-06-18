import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import { Users, BookOpen, FileEdit, Award, GraduationCap, LayoutList } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Dashboard() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Professional Profile Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg text-white">
        <div className="flex items-center space-x-6">
          <img src={currentUser.photoUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-xl" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.name}</h1>
            <p className="text-gray-300 font-medium">{currentUser.designation} • Department of {currentUser.department}</p>
          </div>
        </div>
        
        <div className="bg-gray-800/50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-700/50 backdrop-blur-sm min-w-[250px]">
          <div className="mb-3">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Branch</p>
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-university-400" />
              <span className="font-medium text-gray-100">{currentUser.branch}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2">Assigned Subjects</p>
            <div className="flex flex-wrap gap-2">
              {currentUser.subjectsTaught?.map(sub => (
                <span key={sub} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-md border border-gray-600">{sub}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="My Batches" value={currentUser.assignedBatches?.length || 0} icon={Users} colorClass="text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard title="Total Students" value="125" icon={Award} colorClass="text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400" />
        <StatCard title="Lectures Uploaded" value={currentUser.lecturesUploaded || 0} icon={BookOpen} colorClass="text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" />
        <StatCard title="Assessments Created" value={currentUser.assessmentsCreated || 0} icon={FileEdit} colorClass="text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><LayoutList className="w-5 h-5 mr-2 text-university-600" /> Quick Actions</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Create time-locked scheduled contests specific to your assigned subjects.</p>
          <button className="w-full py-3 bg-university-600 hover:bg-university-700 text-white font-medium rounded-xl transition-colors shadow-sm mb-3">
            Create Scheduled Contest
          </button>
          <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition-colors">
            Upload Subject Lecture
          </button>
        </div>
      </div>
    </div>
  );
}
