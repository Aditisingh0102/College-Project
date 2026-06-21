import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Filter, ShieldAlert, Award, Plus, Trash2, Edit, ChevronDown, CheckCircle, MoreHorizontal, GraduationCap, X, UserCheck } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function ManageStudents() {
  const { currentUser, students } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [yearFilter, setYearFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [batchFilter, setBatchFilter] = useState('All');

  const isVC = currentUser?.roleLevel === 'VC';
  const isDean = currentUser?.roleLevel === 'Dean';
  const isHOD = currentUser?.roleLevel === 'HOD';

  // Base scope filter
  const scopedStudents = useMemo(() => {
    if (isVC) return students;
    return students.filter(s => 
      s.college === currentUser.managedCollege && 
      (isHOD ? s.specialization.includes(currentUser.managedDepartment) || s.specialization.includes("CSE") : true)
    );
  }, [students, currentUser, isVC, isHOD]);

  // Apply UI Filters
  const filteredStudents = useMemo(() => {
    return scopedStudents.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.erpId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = yearFilter === 'All' || s.year === yearFilter;
      const matchesBranch = branchFilter === 'All' || s.specialization.includes(branchFilter);
      const matchesBatch = batchFilter === 'All' || s.enrolledBatches.includes(batchFilter);
      return matchesSearch && matchesYear && matchesBranch && matchesBatch;
    });
  }, [scopedStudents, searchTerm, yearFilter, branchFilter, batchFilter]);

  // Action states
  const [selectedStudents, setSelectedStudents] = useState([]);
  const toggleSelect = (id) => {
    if (selectedStudents.includes(id)) setSelectedStudents(selectedStudents.filter(sId => sId !== id));
    else setSelectedStudents([...selectedStudents, id]);
  };
  const toggleAll = () => {
    if (selectedStudents.length === filteredStudents.length) setSelectedStudents([]);
    else setSelectedStudents(filteredStudents.map(s => s.id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Students</h1>
          <p className="text-gray-500 dark:text-gray-400 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            {isVC ? "Global Student Directory" : isDean ? `${currentUser?.managedCollege} Students` : `${currentUser?.managedDepartment} Department Students`}
            <span className="ml-3 px-2 py-0.5 bg-university-100 dark:bg-university-900/30 text-university-700 font-bold rounded-md text-sm">{filteredStudents.length} Total</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium transition-colors shadow-sm text-sm">
            Import CSV
          </button>
          <button className="flex items-center justify-center bg-university-600 hover:bg-university-700 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col xl:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by student name or ERP ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none"
            >
              <option value="All">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            
            <select 
              value={branchFilter} 
              onChange={(e) => setBranchFilter(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none"
            >
              <option value="All">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="Mech">Mechanical</option>
              <option value="ECE">ECE</option>
              <option value="Civil">Civil</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
            
            <select 
              value={batchFilter} 
              onChange={(e) => setBatchFilter(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none"
            >
              <option value="All">All Batches</option>
              <option value="b1">Batch B1</option>
              <option value="b2">Batch B2</option>
              <option value="b3">Batch B3</option>
            </select>

            {selectedStudents.length > 0 && (
              <div className="flex items-center px-4 py-2 bg-university-50 dark:bg-university-900/30 border border-university-200 dark:border-university-800 rounded-xl ml-auto">
                <span className="text-sm font-bold text-university-700 dark:text-university-400 mr-4">{selectedStudents.length} Selected</span>
                <button className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded hover:bg-gray-50 mr-2">Shift Batch</button>
                <button className="text-sm bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-100">Remove</button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 w-12">
                  <input type="checkbox" checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0} onChange={toggleAll} className="rounded text-university-600 w-4 h-4" />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Academic Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Platform Stats</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selectedStudents.includes(student.id)} onChange={() => toggleSelect(student.id)} className="rounded text-university-600 w-4 h-4" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={student.photoUrl} alt="" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-base group-hover:text-university-600 transition-colors">{student.name}</p>
                        <p className="text-sm font-mono text-gray-500">{student.erpId}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <span className="inline-flex w-fit px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-100 dark:border-blue-800">
                        {student.specialization}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {student.year} • {student.semester}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Batches:</span>
                        {student.enrolledBatches.map(b => (
                          <Badge key={b} variant="primary" className="text-[10px] px-1.5 py-0">{b.toUpperCase()}</Badge>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      
                      
                      <p className="text-xs text-gray-500 font-medium">{student.problemsSolved} Solved • {student.contestsParticipated} Contests</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-university-600 hover:bg-university-50 dark:hover:bg-university-900/20 p-2 rounded-lg transition-colors flex items-center justify-center" title="Edit Student">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors flex items-center justify-center" title="Shift Batch">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors flex items-center justify-center" title="Remove Student">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Fallback for mobile/non-hover state */}
                    <div className="md:hidden flex justify-end">
                      <button className="p-2"><MoreHorizontal className="w-5 h-5 text-gray-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white">No students found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
                      <button 
                        onClick={() => { setSearchTerm(''); setYearFilter('All'); setBranchFilter('All'); setBatchFilter('All'); }}
                        className="mt-4 text-university-600 hover:underline text-sm font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900 dark:text-white">1</span> to <span className="font-medium text-gray-900 dark:text-white">{Math.min(10, filteredStudents.length)}</span> of <span className="font-medium text-gray-900 dark:text-white">{filteredStudents.length}</span> results</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-500 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-university-200 bg-university-50 dark:bg-university-900/30 dark:border-university-800 rounded-md text-sm text-university-700 dark:text-university-400 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
