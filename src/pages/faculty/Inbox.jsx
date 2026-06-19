import React, { useState } from 'react';
import { Inbox as InboxIcon, MessageSquare, ThumbsUp, Check, X, Search, Reply } from 'lucide-react';
import Badge from '../../components/shared/Badge';
import { useAppContext } from '../../context/AppContext';

const mockDoubts = [
  { id: 1, student: "Rahul Verma", batch: "CSE-B 2024", problem: "Two Sum", time: "2 hours ago", text: "Can we solve this in O(N) using a Hash Map instead of nested loops?", status: "unresolved" },
  { id: 2, student: "Priya Sharma", batch: "CSE-A 2024", problem: "Reverse Linked List", time: "5 hours ago", text: "I am getting a NullPointerException when trying to access next.next. Why?", status: "unresolved" },
  { id: 3, student: "Amit Kumar", batch: "ECE 2025", problem: "Binary Search", time: "1 day ago", text: "What is the difference between right = mid and right = mid - 1?", status: "resolved", reply: "If you use right = mid, you might get stuck in an infinite loop if left and right are adjacent." },
];

export default function Inbox() {
  const { addToast } = useAppContext();
  const [doubts, setDoubts] = useState(mockDoubts);
  const [replyText, setReplyText] = useState({});
  const [activeTab, setActiveTab] = useState('unresolved');

  const handleReply = (id) => {
    if (!replyText[id]) return;
    addToast("Reply posted successfully! +10 Mentor Points", "success");
    setDoubts(prev => prev.map(d => d.id === id ? { ...d, status: 'resolved', reply: replyText[id] } : d));
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  const filteredDoubts = doubts.filter(d => d.status === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <InboxIcon className="w-8 h-8 mr-3 text-university-600" /> Doubt Resolution Inbox
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Answer student queries from the peer discussion forums and earn Top Mentor badges.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-xl border border-yellow-200 dark:border-yellow-900/50">
          <ThumbsUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm font-bold text-yellow-800 dark:text-yellow-300">Top Mentor Score: 450</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <button 
            onClick={() => setActiveTab('unresolved')}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'unresolved' ? 'border-university-600 text-university-600 dark:text-university-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Unresolved ({doubts.filter(d=>d.status==='unresolved').length})
          </button>
          <button 
            onClick={() => setActiveTab('resolved')}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'resolved' ? 'border-university-600 text-university-600 dark:text-university-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Resolved
          </button>
        </div>

        <div className="p-6 flex-1 bg-gray-50/50 dark:bg-gray-900/50">
          {filteredDoubts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <Check className="w-12 h-12 mb-4 text-green-500 opacity-50" />
              <p className="text-lg font-medium">All caught up!</p>
              <p className="text-sm mt-1">There are no {activeTab} queries right now.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDoubts.map(doubt => (
                <div key={doubt.id} className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-university-100 dark:bg-university-900/40 text-university-600 dark:text-university-400 flex items-center justify-center font-bold">
                        {doubt.student.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{doubt.student} <span className="text-sm font-normal text-gray-500 ml-2">({doubt.batch})</span></h3>
                        <p className="text-xs text-gray-400">Asking about <span className="text-university-600 dark:text-university-400 font-medium">"{doubt.problem}"</span> • {doubt.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-xl mb-4">
                    <p className="text-gray-700 dark:text-gray-300">"{doubt.text}"</p>
                  </div>

                  {doubt.status === 'unresolved' ? (
                    <div className="flex items-start space-x-3">
                      <Reply className="w-5 h-5 text-gray-400 mt-3 shrink-0" />
                      <div className="flex-1 flex flex-col sm:flex-row gap-3">
                        <input 
                          type="text" 
                          placeholder="Type your explanation here..." 
                          value={replyText[doubt.id] || ''}
                          onChange={(e) => setReplyText(prev => ({...prev, [doubt.id]: e.target.value}))}
                          className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white text-sm" 
                        />
                        <button 
                          onClick={() => handleReply(doubt.id)}
                          className="px-6 py-2.5 bg-university-600 hover:bg-university-700 text-white font-medium rounded-xl transition"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs shrink-0">You</div>
                      <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 p-3 rounded-xl flex-1">
                        <p className="text-sm text-green-800 dark:text-green-400">{doubt.reply}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
