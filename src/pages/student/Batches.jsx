import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Users, GraduationCap } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function Batches() {
  const { currentUser, colleges, faculty } = useAppContext();

  // Find enrolled batches
  let enrolledBatches = [];
  colleges.forEach(c => {
    c.specializations?.forEach(s => {
      s.years?.forEach(y => {
        y.batches?.forEach(b => {
          if (currentUser?.enrolledBatches.includes(b.id)) {
            const fac = faculty.find(f => f.id === b.facultyIds[0]);
            enrolledBatches.push({ ...b, faculty: fac, collegeName: c.name, specialization: s.name });
          }
        });
      });
    });
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Batches</h1>
        <button className="px-4 py-2 bg-university-600 text-white rounded-lg text-sm font-medium hover:bg-university-700 transition">
          Browse & Join More
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledBatches.map(batch => (
          <div key={batch.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-university-600 dark:text-university-400 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <Badge variant="primary">{batch.collegeName}</Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{batch.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{batch.specialization}</p>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                {batch.faculty?.name || 'Unassigned'}
              </div>
              <span className="text-sm font-medium text-gray-500">{batch.studentIds.length} Members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
