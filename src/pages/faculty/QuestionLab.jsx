import React, { useState } from 'react';
import { Beaker, Plus, Save, Play, Search, Code2, Copy, FileCode2 } from 'lucide-react';
import Badge from '../../components/shared/Badge';
import { useAppContext } from '../../context/AppContext';

export default function QuestionLab() {
  const { addToast } = useAppContext();
  const [activeTab, setActiveTab] = useState('editor');

  const handleSave = () => {
    addToast("Custom problem successfully added to University Question Bank!", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Beaker className="w-8 h-8 mr-3 text-university-600" /> Question Bank Lab
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Author custom coding problems, define hidden test cases, and publish to the repository.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleSave}
            className="flex items-center px-6 py-2.5 bg-university-600 hover:bg-university-700 text-white font-medium rounded-xl shadow-lg shadow-university-600/30 transition-all"
          >
            <Save className="w-4 h-4 mr-2" /> Publish to Bank
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left pane: Problem Details */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button className="flex-1 py-3 text-sm font-bold border-b-2 border-university-600 text-university-600 dark:text-university-400">
              Problem Description
            </button>
            <button className="flex-1 py-3 text-sm font-bold border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              Hidden Test Cases
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Problem Title</label>
              <input type="text" placeholder="e.g., Reverse Linked List II" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tags (Comma separated)</label>
                <input type="text" placeholder="Linked List, Pointers..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Problem Statement (Markdown Supported)</label>
              <textarea 
                className="w-full h-48 px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white resize-none font-mono text-sm"
                placeholder="Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Time Limit (ms)</label>
              <input type="number" defaultValue={2000} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Right pane: Code Editor (Solution Builder) */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#404040]">
            <div className="flex items-center space-x-2 text-white">
              <FileCode2 className="w-5 h-5 text-university-400" />
              <span className="font-bold text-sm">Author Solution Validator</span>
            </div>
            <select className="bg-[#1e1e1e] border border-[#404040] text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-university-500 outline-none text-white">
              <option value="python">Python 3</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              defaultValue={`class Solution:\n    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:\n        # Write your master solution here to validate test cases\n        pass`}
              className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none outline-none"
              spellCheck="false"
            />
          </div>

          <div className="p-4 bg-[#2d2d2d] border-t border-[#404040] flex justify-between items-center">
            <span className="text-xs text-gray-400">Code is auto-saved locally</span>
            <button className="flex items-center px-4 py-2 bg-[#404040] hover:bg-[#505050] text-white rounded-lg text-sm font-medium transition">
              <Play className="w-4 h-4 mr-2" /> Run Against Test Cases
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
