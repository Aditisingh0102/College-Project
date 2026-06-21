import React, { useState } from 'react';
import { Users, BookOpen, GraduationCap, Clock, Filter, Plus, UserPlus, FileText, CheckCircle2 } from 'lucide-react';

const departmentData = [
  {
    year: '1st Year',
    batches: [
      {
        id: 'b1', name: 'CSE-A', section: 'A', students: 60,
        subjects: [
          { name: 'C Programming', faculty: 'Mr. Rajat Kumar', progress: 85, totalClasses: 40, classesDone: 34 },
          { name: 'Mathematics I', faculty: 'Dr. S.K. Sharma', progress: 90, totalClasses: 50, classesDone: 45 },
          { name: 'Communication Skills', faculty: 'Ms. Priya', progress: 100, totalClasses: 30, classesDone: 30 }
        ]
      },
      {
        id: 'b2', name: 'ECE-A', section: 'A', students: 55,
        subjects: [
          { name: 'Basic Electronics', faculty: 'Dr. Amit Jain', progress: 70, totalClasses: 40, classesDone: 28 },
          { name: 'Mathematics I', faculty: 'Dr. S.K. Sharma', progress: 85, totalClasses: 50, classesDone: 42 }
        ]
      }
    ]
  },
  {
    year: '2nd Year',
    batches: [
      {
        id: 'b3', name: 'CSE-A', section: 'A', students: 65,
        subjects: [
          { name: 'Data Structures', faculty: 'Dr. Vikram Singh', progress: 75, totalClasses: 45, classesDone: 34 },
          { name: 'Digital Logic', faculty: 'Prof. Neha Verma', progress: 60, totalClasses: 40, classesDone: 24 },
          { name: 'Computer Organization', faculty: 'Dr. R.K. Das', progress: 80, totalClasses: 40, classesDone: 32 }
        ]
      },
      {
        id: 'b4', name: 'CSE-B', section: 'B', students: 62,
        subjects: [
          { name: 'Data Structures', faculty: 'Dr. Sanjay Kumar', progress: 85, totalClasses: 45, classesDone: 38 },
          { name: 'Digital Logic', faculty: 'Prof. Neha Verma', progress: 55, totalClasses: 40, classesDone: 22 }
        ]
      }
    ]
  },
  {
    year: '3rd Year',
    batches: [
      {
        id: 'b5', name: 'CSE-A', section: 'A', students: 58,
        subjects: [
          { name: 'Operating Systems', faculty: 'Dr. Vikram Singh', progress: 40, totalClasses: 50, classesDone: 20 },
          { name: 'Database Systems', faculty: 'Prof. Anjali Gupta', progress: 95, totalClasses: 45, classesDone: 43 }
        ]
      }
    ]
  },
  {
    year: '4th Year',
    batches: [
      {
        id: 'b6', name: 'AI/DS-A', section: 'A', students: 45,
        subjects: [
          { name: 'Machine Learning', faculty: 'Dr. Arvind Gupta', progress: 65, totalClasses: 50, classesDone: 32 },
          { name: 'Cloud Computing', faculty: 'Dr. R.K. Das', progress: 90, totalClasses: 40, classesDone: 36 }
        ]
      }
    ]
  }
];

export default function ManageBatches() {
  const [selectedYear, setSelectedYear] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const years = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];
  
  const displayedData = selectedYear === 'All' 
    ? departmentData 
    : departmentData.filter(d => d.year === selectedYear);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Year-Wise Batch Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Track syllabus progress, faculty allocation, and ongoing sections.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-5 py-2.5 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" /> Create New Batch
        </button>
      </div>

      {/* Year Filter Tabs */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-2 inline-flex overflow-x-auto w-full sm:w-auto shadow-sm">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all \${
              selectedYear === year 
                ? 'bg-university-100 dark:bg-university-900/40 text-university-600 dark:text-university-400 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="space-y-10">
        {displayedData.map((yearGroup) => (
          <div key={yearGroup.year} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">{yearGroup.year}</h2>
              <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {yearGroup.batches.map(batch => (
                <div key={batch.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Batch Header */}
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start bg-gray-50/50 dark:bg-gray-900/50">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{batch.name}</h3>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold">Sec {batch.section}</span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center"><Users className="w-4 h-4 mr-1"/> {batch.students} Students Enrolled</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-university-600 bg-university-50 dark:bg-university-900/30 hover:bg-university-100 rounded-xl transition-colors" title="Allocate Students">
                        <UserPlus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Subjects Progress */}
                  <div className="p-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center"><BookOpen className="w-4 h-4 mr-2"/> Ongoing Subjects & Process</h4>
                    <div className="space-y-5">
                      {batch.subjects.map((subject, idx) => (
                        <div key={idx} className="relative">
                          <div className="flex justify-between items-end mb-2">
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white text-sm">{subject.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Faculty: <span className="font-medium text-gray-700 dark:text-gray-300">{subject.faculty}</span></p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-black \${subject.progress >= 90 ? 'text-green-500' : subject.progress >= 60 ? 'text-university-500' : 'text-orange-500'}`}>
                                {subject.progress}%
                              </span>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{subject.classesDone}/{subject.totalClasses} Lectures</p>
                            </div>
                          </div>
                          <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 \${subject.progress >= 90 ? 'bg-green-500' : subject.progress >= 60 ? 'bg-university-500' : 'bg-orange-500'}`} 
                              style={{ width: `\${subject.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer Actions */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                     <button className="text-sm font-bold text-university-600 hover:text-university-700 flex items-center transition-colors">
                       Assign New Faculty <Plus className="w-4 h-4 ml-1" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Create Batch Modal Mock */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6">
             <h2 className="text-xl font-bold mb-4 dark:text-white">Create New Batch</h2>
             <p className="text-gray-500 mb-6">Allocate a new section and assign subjects.</p>
             <button onClick={() => setShowCreateModal(false)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold transition-colors">Close</button>
           </div>
        </div>
      )}
    </div>
  );
}
