import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { PowerOff, Search, Trophy } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function AllContests() {
  const { contests, faculty, addToast } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Contests & Assessments</h1>
          <p className="text-gray-500 dark:text-gray-400">University-wide record of all created contests.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by contest title..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contest Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Creator</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Admin Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {contests.map(contest => {
                const creator = faculty.find(f => f.id === contest.createdBy);
                return (
                  <tr key={contest.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{contest.title}</p>
                          <p className="text-xs text-gray-500">{new Date(contest.scheduledStartTime).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={contest.status === 'Ended' ? 'default' : contest.status === 'Live' ? 'danger' : 'primary'}>{contest.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{creator?.name}</p>
                      <p className="text-xs text-gray-500">{creator?.college}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900 dark:text-white">{contest.participantsCount}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {contest.status !== 'Ended' && (
                        <button 
                          onClick={() => addToast(`Contest "${contest.title}" deactivated successfully!`, 'error')}
                          className="flex items-center ml-auto px-3 py-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg text-sm font-medium transition"
                        >
                          <PowerOff className="w-4 h-4 mr-1" /> Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
