import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { TrendingUp, TrendingDown, Users, Code2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Badge from '../../components/shared/Badge';

// Mock performance data over time for different batches
const performanceData = [
  { contest: 'Contest 1', batchB1: 65, batchB2: 58, batchB3: 70 },
  { contest: 'Contest 2', batchB1: 72, batchB2: 60, batchB3: 75 },
  { contest: 'Contest 3', batchB1: 78, batchB2: 65, batchB3: 72 },
  { contest: 'Contest 4', batchB1: 85, batchB2: 70, batchB3: 80 },
  { contest: 'Contest 5', batchB1: 88, batchB2: 78, batchB3: 82 },
];

export default function ManageBatches() {
  const { currentUser } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Batch Performance Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Track improvement and contest results across {currentUser.managedDepartment || 'all'} batches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart spanning 2 columns */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-university-600" /> Average Score Trend
            </h3>
            <select className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm rounded-lg px-3 py-1.5 outline-none">
              <option>Last 5 Contests</option>
              <option>Last 10 Contests</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="contest" stroke="#6b7280" tick={{fontSize: 12}} />
                <YAxis stroke="#6b7280" tick={{fontSize: 12}} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="batchB1" name="Batch CSE-B 2024" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="batchB2" name="Batch CSE-A 2023" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="batchB3" name="Batch ECE-A 2024" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Individual Batch Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Detailed Breakdown</h3>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:border-blue-500 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">CSE-B 2024</h4>
                <p className="text-xs text-gray-500">Dr. Vikram Singh</p>
              </div>
              <Badge variant="success" className="flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +23%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm mt-4 text-gray-600 dark:text-gray-400">
              <span className="flex items-center"><Users className="w-4 h-4 mr-1"/> 45 Students</span>
              <span className="flex items-center"><Code2 className="w-4 h-4 mr-1"/> Avg 88/100</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:border-purple-500 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">CSE-A 2023</h4>
                <p className="text-xs text-gray-500">Prof. Neha Verma</p>
              </div>
              <Badge variant="success" className="flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +20%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm mt-4 text-gray-600 dark:text-gray-400">
              <span className="flex items-center"><Users className="w-4 h-4 mr-1"/> 38 Students</span>
              <span className="flex items-center"><Code2 className="w-4 h-4 mr-1"/> Avg 78/100</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:border-green-500 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">ECE-A 2024</h4>
                <p className="text-xs text-gray-500">Dr. Sanjay Kumar</p>
              </div>
              <Badge variant="warning" className="flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm mt-4 text-gray-600 dark:text-gray-400">
              <span className="flex items-center"><Users className="w-4 h-4 mr-1"/> 60 Students</span>
              <span className="flex items-center"><Code2 className="w-4 h-4 mr-1"/> Avg 82/100</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
