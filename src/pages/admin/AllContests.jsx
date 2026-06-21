import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { PowerOff, Search, Trophy, Clock, Users, Activity, FileCode2, UserCheck, Calendar, ShieldAlert, CheckCircle2, X } from 'lucide-react';
import Badge from '../../components/shared/Badge';

// Detailed Mock Data for HOD View
const liveContests = [
  {
    id: 'lc1',
    title: 'Code Alpha 2026',
    topic: 'Data Structures & Algorithms',
    durationHours: 3,
    enrolled: 1200,
    activeNow: 850,
    startTime: new Date(Date.now() - 1000 * 60 * 45), // Started 45 mins ago
    faculty: 'Dr. Vikram Singh',
    batches: ['CSE-A', 'CSE-B', 'ECE-A']
  }
];

const upcomingContests = [
  {
    id: 'uc1',
    title: 'Weekly Contest 507',
    topic: 'Dynamic Programming & Graphs',
    durationHours: 2,
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    faculty: 'Prof. Neha Verma',
    batches: ['3rd Year CSE'],
    questions: [
      { id: 'q1', type: 'Easy', name: 'Two Sum Variant' },
      { id: 'q2', type: 'Medium', name: 'Knapsack Problem' },
      { id: 'q3', type: 'Medium', name: 'Graph Traversal' },
      { id: 'q4', type: 'Hard', name: 'Dijkstra on Grid' }
    ]
  },
  {
    id: 'uc2',
    title: 'Summer Prep Test 1',
    topic: 'Core CS Subjects (OS, DBMS)',
    durationHours: 1.5,
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 72), // 3 Days later
    faculty: 'Dr. Sanjay Kumar',
    batches: ['2nd Year All Branches'],
    questions: [
      { id: 'q1', type: 'MCQ', count: 30 },
      { id: 'q2', type: 'Subjective', count: 2 }
    ]
  }
];

const pastContests = [
  {
    id: 'pc1',
    title: 'Mid-Term Coding Assessment',
    topic: 'Arrays & Strings',
    date: '10/06/2026',
    enrolled: 450,
    submissions: 412,
    plagiarismFlags: 14,
    highestSimilarity: '92%'
  }
];

export default function AllContests() {
  const [showPlagiarismReport, setShowPlagiarismReport] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const { addToast } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contest Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Deep dive into live contest telemetry and upcoming assessment details.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search contests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white shadow-sm"
          />
        </div>
      </div>

      {/* Live Contests Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Contests Tracking</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {liveContests.map(contest => (
            <div key={contest.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Activity className="w-32 h-32 text-red-500" />
              </div>
              
              <div className="flex flex-col xl:flex-row justify-between gap-8 relative z-10">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="danger" className="animate-pulse flex items-center"><Activity className="w-3 h-3 mr-1" /> LIVE NOW</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{contest.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{contest.topic} • Assigned to: {contest.batches.join(', ')}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-bold text-gray-900 dark:text-white">{contest.durationHours} Hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Supervisor</p>
                        <p className="font-bold text-gray-900 dark:text-white">{contest.faculty}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-gray-50 dark:bg-gray-950 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Real-time Telemetry</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1 flex items-center"><Users className="w-4 h-4 mr-1"/> Enrolled</p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">{contest.enrolled}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                      <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold mb-1 flex items-center"><Activity className="w-4 h-4 mr-1"/> Active Now</p>
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{contest.activeNow}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                      <span>Participation Rate</span>
                      <span className="text-blue-600 dark:text-blue-400">{Math.round((contest.activeNow / contest.enrolled) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(contest.activeNow / contest.enrolled) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end xl:w-48">
                  <button 
                    onClick={() => addToast('Emergency override triggered. Contest paused.', 'error')}
                    className="w-full py-4 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-xl font-bold transition-colors flex items-center justify-center dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/40"
                  >
                    <PowerOff className="w-5 h-5 mr-2" /> Pause Contest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Assessments Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-university-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Assessments</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingContests.map(contest => (
            <div key={contest.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{contest.title}</h3>
                  <p className="text-sm text-gray-500">{contest.topic}</p>
                </div>
                <Badge variant="warning">{contest.scheduledFor.toLocaleDateString()}</Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-950 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5"/> {contest.durationHours} Hours</span>
                <span className="flex items-center"><UserCheck className="w-4 h-4 mr-1.5"/> By {contest.faculty}</span>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center"><FileCode2 className="w-4 h-4 mr-2" /> Questions Breakdown</p>
                <div className="space-y-2">
                  {contest.questions.map((q, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800/50 rounded-lg hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                      {q.name ? (
                        <>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-university-400 mr-2"></div>{q.name}</span>
                          <Badge variant={q.type === 'Hard' ? 'danger' : q.type === 'Medium' ? 'warning' : 'success'} className="text-[10px] shadow-sm">{q.type}</Badge>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>{q.type} Section</span>
                          <span className="text-xs font-bold text-gray-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow-sm border border-gray-200 dark:border-gray-700">{q.count} Qs</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Contests & Plagiarism Section */}
      <section>
        <div className="flex items-center gap-3 mb-6 mt-8">
          <ShieldAlert className="w-6 h-6 text-university-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Past Contests & AI Proctoring</h2>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contest Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Submissions</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">AI Flags</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {pastContests.map(contest => (
                <tr key={contest.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{contest.title}</p>
                    <p className="text-xs text-gray-500">{contest.date} • {contest.topic}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{contest.submissions} / {contest.enrolled}</p>
                    <p className="text-xs text-gray-500">Completion Rate: {Math.round((contest.submissions/contest.enrolled)*100)}%</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={contest.plagiarismFlags > 0 ? 'danger' : 'success'}>
                      {contest.plagiarismFlags} Flagged
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => { setSelectedContest(contest); setShowPlagiarismReport(true); }}
                      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold transition flex items-center ml-auto"
                    >
                      <ShieldAlert className="w-4 h-4 mr-2" /> View AI Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Plagiarism Modal */}
      {showPlagiarismReport && selectedContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800 bg-red-50 dark:bg-red-900/10">
              <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
                <ShieldAlert className="w-8 h-8" />
                <div>
                  <h2 className="text-xl font-bold">AI Plagiarism Report</h2>
                  <p className="text-sm">{selectedContest.title}</p>
                </div>
              </div>
              <button onClick={() => setShowPlagiarismReport(false)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-xl transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="text-center">
                  <p className="text-2xl font-black text-red-600">{selectedContest.plagiarismFlags}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase">Suspicious Matches</p>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
                <div className="text-center">
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{selectedContest.highestSimilarity}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase">Max Similarity</p>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
                <div className="text-center">
                  <p className="text-2xl font-black text-green-600">398</p>
                  <p className="text-xs font-bold text-gray-500 uppercase">Clean Submissions</p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Top Matches Detected</h3>
              <div className="space-y-3">
                <div className="p-4 border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Rohan Gupta <span className="text-gray-400 mx-2">↔</span> Priya Patel</p>
                    <p className="text-xs text-gray-500 mt-1">Question: Two Sum Variant</p>
                  </div>
                  <Badge variant="danger" className="text-sm">92% Match</Badge>
                </div>
                <div className="p-4 border border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Aditi Sharma <span className="text-gray-400 mx-2">↔</span> Karan Verma</p>
                    <p className="text-xs text-gray-500 mt-1">Question: Sliding Window Maximum</p>
                  </div>
                  <Badge variant="warning" className="text-sm">78% Match</Badge>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setShowPlagiarismReport(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">Discard Report</button>
                <button onClick={() => setShowPlagiarismReport(false)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-2" /> Penalize Students
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
