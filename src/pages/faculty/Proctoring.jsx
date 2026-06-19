import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Eye, Filter, MonitorOff, Copy, FileWarning, Network } from 'lucide-react';
import Badge from '../../components/shared/Badge';

const mockReports = [
  { id: 1, student: "Rahul Verma", erp: "0221BCA045", contest: "DSA Mid-Term Coding Challenge", score: "95/100", trustScore: 32, warnings: ["Tab switched 12 times", "89% code similarity with 0221BCA099", "Pasted 40 lines of code at once"], status: 'Flagged' },
  { id: 2, student: "Sneha Patel", erp: "0221BCA089", contest: "DSA Mid-Term Coding Challenge", score: "88/100", trustScore: 98, warnings: [], status: 'Clean' },
  { id: 3, student: "Amit Kumar", erp: "0221BCA112", contest: "Weekly Coding #45", score: "45/100", trustScore: 85, warnings: ["Tab switched 1 time"], status: 'Clean' },
  { id: 4, student: "Priya Sharma", erp: "0221BCA056", contest: "Java Advanced Concepts", score: "100/100", trustScore: 12, warnings: ["Multiple faces detected on webcam", "Audio detected during exam", "Copy-pasted entire solution"], status: 'Critical' },
];

export default function Proctoring() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <ShieldAlert className="w-8 h-8 mr-3 text-red-500" /> AI Proctoring & Plagiarism
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Monitor assessment integrity, tab switching, and code similarity across your batches.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Filter className="w-4 h-4 mr-2" /> Filter Flags
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
            <FileWarning className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">Critical Flags</p>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">12</h3>
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Copy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">Plagiarism Cases</p>
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">4</h3>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400">
            <MonitorOff className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">Tab Switches (Avg)</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2.4 / student</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Network className="w-5 h-5 mr-2 text-university-600" /> AI Plagiarism Node Graph
            </h3>
            <p className="text-sm text-gray-500 mt-1">Visually identifies mass-copying rings by comparing syntax trees and mathematical similarity.</p>
          </div>
          <Badge variant="danger">High Risk Cluster Detected</Badge>
        </div>
        
        <div className="relative h-[300px] bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex items-center justify-center">
          {/* Mock Node Graph using SVG */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="4" className="opacity-80 animate-pulse" />
            <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="4" className="opacity-80 animate-pulse" />
            <line x1="50%" y1="70%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="4" className="opacity-80 animate-pulse" />
            
            <line x1="20%" y1="70%" x2="30%" y2="30%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="opacity-60" />
            <line x1="80%" y1="70%" x2="70%" y2="30%" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
          </svg>
          
          <div className="absolute top-[25%] left-[25%] w-12 h-12 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center font-bold text-red-700 z-10 shadow-lg" title="Rahul Verma (0221BCA045)">RV</div>
          <div className="absolute top-[25%] right-[25%] w-12 h-12 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center font-bold text-red-700 z-10 shadow-lg" title="Priya Sharma (0221BCA056)">PS</div>
          <div className="absolute bottom-[25%] left-[45%] w-14 h-14 bg-red-600 border-4 border-red-200 rounded-full flex items-center justify-center font-bold text-white z-10 shadow-xl ring-4 ring-red-500/30" title="Source Node: Unknown Original">src</div>
          
          <div className="absolute bottom-[25%] left-[15%] w-10 h-10 bg-orange-100 border-2 border-orange-500 rounded-full flex items-center justify-center font-bold text-orange-700 z-10 shadow-lg" title="Partial Match">AK</div>
          <div className="absolute bottom-[25%] right-[15%] w-10 h-10 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700 z-10 shadow-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300" title="Clean">SP</div>

          <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-xs">
            <div className="flex items-center space-x-2 mb-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span>90%+ Similarity (Copied)</span></div>
            <div className="flex items-center space-x-2 mb-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span>70%+ Similarity (Modified)</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-gray-300 rounded-full"></div><span>&lt;30% Similarity (Clean)</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ERP ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assessment</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Trust Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Warnings</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {mockReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                        {report.student.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{report.student}</div>
                        <div className="text-xs text-gray-500">{report.erp}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white font-medium">{report.contest}</span>
                    <p className="text-xs text-gray-500 mt-1">Score: {report.score}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold ${
                      report.trustScore >= 80 ? 'border-green-500 text-green-600 dark:text-green-400' :
                      report.trustScore >= 50 ? 'border-orange-500 text-orange-600 dark:text-orange-400' :
                      'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    }`}>
                      {report.trustScore}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {report.warnings.length === 0 ? (
                      <span className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> No suspicious activity
                      </span>
                    ) : (
                      <div className="space-y-1">
                        {report.warnings.map((w, i) => (
                          <span key={i} className="flex items-start text-xs text-red-600 dark:text-red-400">
                            <AlertTriangle className="w-3 h-3 mr-1 mt-0.5 shrink-0" /> {w}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-university-600 hover:bg-university-50 dark:hover:bg-university-900/20 rounded-lg transition" title="View Detailed Report">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
