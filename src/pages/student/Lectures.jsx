import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { PlayCircle } from 'lucide-react';

export default function Lectures() {
  const { lectures, faculty } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recorded Lectures</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map(lecture => {
          const fac = faculty.find(f => f.id === lecture.facultyId);
          return (
            <div key={lecture.id} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                <img src={lecture.thumbnailUrl} alt={lecture.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded-md text-xs text-white font-medium">
                  {lecture.durationMins}:00
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-university-600 dark:text-university-400 uppercase tracking-wider">{lecture.subject}</span>
                  <span className="text-xs text-gray-500">{new Date(lecture.uploadDate).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">{lecture.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{lecture.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={fac?.photoUrl} alt="Faculty" className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{fac?.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{lecture.views} views</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
