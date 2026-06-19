import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Filter, Mail, ChevronRight, Download, Eye, Sparkles } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function StudentRecords() {
  const { students, currentUser, addToast } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAiGrader, setShowAiGrader] = useState(false);

  // Get all students that belong to any of the faculty's assigned batches
  const assignedBatches = currentUser?.assignedBatches || [];
  
  const facultyStudents = students.filter(student => 
    student.enrolledBatches.some(batch => assignedBatches.includes(batch))
  );

  const filteredStudents = facultyStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.erpId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {!selectedStudent ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Records</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage and monitor students across your assigned batches.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name or ERP ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <Filter className="w-5 h-5 mr-2" /> Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Profile</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ERP ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Batches</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform Rating</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img src={student.photoUrl} alt="" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.year} - {student.semester}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{student.erpId}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.enrolledBatches.filter(b => assignedBatches.includes(b)).map(b => (
                            <span key={b} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">Batch {b}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900 dark:text-white">{student.rating}</span>
                          <Badge variant="warning">{student.problemsSolved} Solved</Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelectedStudent(student)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition" title="View Details">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-university-600 dark:hover:text-university-400 transition" title="Email Student">
                            <Mail className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
          <button 
            onClick={() => { setSelectedStudent(null); setShowAiGrader(false); }}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-university-600 transition"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back to records
          </button>
          
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <img src={selectedStudent.photoUrl} alt="Avatar" className="w-16 h-16 rounded-full border border-gray-200 dark:border-gray-800" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h2>
                <p className="text-gray-500">{selectedStudent.erpId} • {selectedStudent.year}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAiGrader(!showAiGrader)}
                className="flex items-center px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50 rounded-xl font-bold transition hover:bg-yellow-100"
              >
                <Sparkles className="w-5 h-5 mr-2" /> AI Auto-Grade
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <Download className="w-4 h-4 mr-2" /> Download Report
              </button>
            </div>
          </div>

          {showAiGrader && (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-900/50 rounded-3xl p-6 shadow-sm mb-6 animate-in zoom-in-95 duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-400 mb-2">Platform AI Grading Analysis</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-4">The AI has analyzed the student's recent coding submissions for time complexity, edge case handling, and best practices.</p>
                  
                  <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30 mb-4">
                    <ul className="space-y-2 text-sm text-yellow-900 dark:text-yellow-200">
                      <li>• <strong>Code Quality:</strong> Excellent (Clean variable naming, modular functions)</li>
                      <li>• <strong>Complexity:</strong> Used O(N) HashMap approach instead of O(N²) nested loops.</li>
                      <li>• <strong>Edge Cases:</strong> Failed 1 hidden test case out of 15 (Null Pointer on empty array).</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-yellow-900 dark:text-yellow-400">Suggested Score:</span>
                      <span className="px-3 py-1 bg-yellow-200 dark:bg-yellow-600/40 text-yellow-900 dark:text-yellow-100 rounded-lg font-bold">92 / 100</span>
                    </div>
                    <button 
                      onClick={() => {
                        addToast("Grade saved successfully!", "success");
                        setShowAiGrader(false);
                      }}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold shadow-md transition"
                    >
                      Approve & Save Grade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Recent Submissions</h3>
            <p className="text-gray-500 italic">Select an assessment to view detailed code execution logs.</p>
          </div>
        </div>
      )}
    </div>
  );
}
