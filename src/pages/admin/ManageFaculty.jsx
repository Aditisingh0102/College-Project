import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { UserPlus, Edit, Trash2, X, GraduationCap, CheckCircle2 } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function ManageFaculty() {
  const { currentUser, faculty } = useAppContext();
  
  // Scope faculty to HOD's department if HOD, else show all
  const isHOD = currentUser?.roleLevel === 'HOD';
  const scopedFaculty = isHOD 
    ? faculty.filter(f => f.department === currentUser.managedDepartment)
    : faculty;

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock list of all possible batches in the department
  const allBatches = ["b1", "b2", "b3", "b4", "b5"];
  
  const openModal = (fac) => {
    setSelectedFaculty(fac);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFaculty(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Faculty</h1>
          <p className="text-gray-500 dark:text-gray-400">View records and manage batch assignments.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" /> Add Faculty
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Faculty Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Branch & Subjects</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned Batches</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {scopedFaculty.map((fac) => (
                <tr key={fac.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={fac.photoUrl} alt="" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{fac.name}</p>
                        <p className="text-xs text-gray-500">{fac.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center mb-1">
                      <GraduationCap className="w-4 h-4 mr-1 text-gray-400" /> {fac.branch}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {fac.subjectsTaught?.map(sub => (
                        <span key={sub} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700">{sub}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {fac.assignedBatches?.map(b => (
                        <Badge key={b} variant="primary">Batch {b}</Badge>
                      ))}
                      {(!fac.assignedBatches || fac.assignedBatches.length === 0) && (
                        <span className="text-sm text-gray-400 italic">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openModal(fac)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition"
                    >
                      Manage Assignments
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Modal */}
      {isModalOpen && selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Manage Batches</h3>
                <p className="text-sm text-gray-500">Assign or remove batches for {selectedFaculty.name}</p>
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Currently Assigned</h4>
                <div className="space-y-2">
                  {selectedFaculty.assignedBatches?.map(batchId => (
                    <div key={batchId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <span className="flex items-center font-medium text-gray-900 dark:text-white">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                        Batch {batchId}
                      </span>
                      <button className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Remove Batch">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {(!selectedFaculty.assignedBatches || selectedFaculty.assignedBatches.length === 0) && (
                    <p className="text-sm text-gray-500 italic p-3">No batches currently assigned.</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Available to Assign</h4>
                <div className="grid grid-cols-2 gap-3">
                  {allBatches.filter(b => !selectedFaculty.assignedBatches?.includes(b)).map(batchId => (
                    <div key={batchId} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-university-500 transition cursor-pointer group">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Batch {batchId}</span>
                      <button className="text-university-600 dark:text-university-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                        + Assign
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button onClick={closeModal} className="px-6 py-2 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
