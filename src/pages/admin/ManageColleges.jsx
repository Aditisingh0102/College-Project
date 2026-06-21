import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Building2, ChevronDown, ChevronRight, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Badge from '../../components/shared/Badge';

// Mock Recharts Data
const performanceData = [
  { contest: 'C1', score: 65 }, { contest: 'C2', score: 72 }, { contest: 'C3', score: 78 }, { contest: 'C4', score: 85 },
];

export default function ManageColleges() {
  const { currentUser, colleges, faculty, students } = useAppContext();
  const isVC = currentUser?.roleLevel === 'VC';
  
  const [selectedCollegeId, setSelectedCollegeId] = useState(isVC ? colleges[0].id : currentUser.managedCollege);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const selectedCollege = colleges.find(c => c.id === selectedCollegeId) || colleges[0];

  // Helper to extract all batches in a college
  const getBatchesForCollege = (col) => {
    let batches = [];
    col.specializations?.forEach(s => {
      s.years?.forEach(y => {
        y.batches?.forEach(b => batches.push({...b, specialization: s.name, year: y.label}));
      });
    });
    return batches;
  };

  const collegeBatches = getBatchesForCollege(selectedCollege);

  const handleBatchClick = (bId) => {
    setSelectedBatchId(selectedBatchId === bId ? null : bId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Colleges & Hierarchy</h1>
          <p className="text-gray-500 dark:text-gray-400">Drill down from College to Batch level performance.</p>
        </div>
        
        {/* VC College Selector */}
        {isVC && (
          <div className="relative min-w-[250px]">
            <Building2 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={selectedCollegeId}
              onChange={(e) => {
                setSelectedCollegeId(e.target.value);
                setSelectedBatchId(null);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white font-medium shadow-sm appearance-none cursor-pointer"
            >
              {colleges.map(c => <option key={c.id} value={c.id}>{c.fullName} ({c.name})</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>

      {selectedCollege.placeholder ? (
        <div className="py-20 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl">
          <Building2 className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedCollege.fullName} Data Not Initialized</h2>
          <p className="text-gray-500 dark:text-gray-400">This college exists in the hierarchy but has no active mock records yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Col: Hierarchy List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm overflow-y-auto max-h-[800px]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Active Batches ({selectedCollege.name})</h3>
            <div className="space-y-3">
              {collegeBatches.map(b => (
                <div 
                  key={b.id} 
                  onClick={() => handleBatchClick(b.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedBatchId === b.id ? 'border-university-500 bg-university-50 dark:bg-university-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-bold ${selectedBatchId === b.id ? 'text-university-700 dark:text-university-300' : 'text-gray-900 dark:text-white'}`}>{b.name}</h4>
                    <ChevronRight className={`w-4 h-4 ${selectedBatchId === b.id ? 'text-university-500' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-xs text-gray-500">{b.specialization} • {b.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Drilldown Detail */}
          <div className="lg:col-span-2">
            {!selectedBatchId ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select a Batch</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">Click on any batch from the hierarchy list on the left to drill down into its performance and roster data.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                {/* Performance Graph */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
                    <TrendingUp className="w-5 h-5 mr-2 text-university-600" /> Batch Average Performance
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="contest" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Faculty & Students Tabs */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="font-bold text-gray-900 dark:text-white">Batch Configuration Data</h3>
                  </div>
                  <div className="p-6 space-y-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Allocated Faculty</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {faculty.filter(f => f.assignedBatches?.includes(selectedBatchId)).map(f => (
                          <div key={f.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <img src={f.photoUrl} alt="" className="w-10 h-10 rounded-full" />
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{f.name}</p>
                              <p className="text-xs text-gray-500">{f.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Enrolled Students</h4>
                      <div className="space-y-2">
                        {students.filter(s => s.enrolledBatches?.includes(selectedBatchId)).map(s => (
                          <div key={s.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</span>
                              <span className="text-xs text-gray-500 font-mono">{s.erpId}</span>
                            </div>
                            
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
