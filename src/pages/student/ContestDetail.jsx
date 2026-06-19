import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Send, Settings, Maximize2, Code2, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function ContestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('// Write your code here\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};');
  const [outputTab, setOutputTab] = useState('testcases'); // 'testcases' or 'result'
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [runStatus, setRunStatus] = useState(null); // 'success', 'error', null

  const handleRun = () => {
    setIsRunning(true);
    setRunStatus(null);
    setOutputTab('result');
    setIsConsoleOpen(true);
    
    // Mock run delay
    setTimeout(() => {
      setIsRunning(false);
      setRunStatus('success');
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-65px)] -m-4 sm:-m-6 lg:-m-8 bg-[#1e1e1e] text-gray-300 font-sans flex flex-col animate-in fade-in">
      
      {/* Top Navbar */}
      <div className="h-14 border-b border-[#333] bg-[#1a1a1a] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/student/contests')} className="text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">Problem 1: Two Sum</span>
            <Badge variant="success">Easy</Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-1.5 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] rounded-lg text-sm font-medium transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Settings</span>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-[#333] bg-[#111] overflow-y-auto">
          {/* Tabs */}
          <div className="flex items-center space-x-6 px-6 border-b border-[#333] bg-[#1a1a1a] shrink-0">
             <button className="py-3 text-sm font-bold text-white border-b-2 border-university-500 flex items-center">
               <FileTextIcon className="w-4 h-4 mr-2" /> Description
             </button>
             <button className="py-3 text-sm font-medium text-gray-500 hover:text-gray-300 flex items-center">
               <FlaskIcon className="w-4 h-4 mr-2" /> Solutions
             </button>
             <button className="py-3 text-sm font-medium text-gray-500 hover:text-gray-300 flex items-center">
               <ClockIcon className="w-4 h-4 mr-2" /> Submissions
             </button>
          </div>
          
          <div className="p-6 text-sm leading-relaxed text-gray-300 flex-1">
            <h1 className="text-2xl font-bold text-white mb-6">1. Two Sum</h1>
            
            <p className="mb-4">
              Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.
            </p>
            <p className="mb-4">
              You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the same element twice.
            </p>
            <p className="mb-8">
              You can return the answer in any order.
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-white mb-2">Example 1:</h3>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#333] font-mono text-xs">
                <p><span className="text-gray-500">Input:</span> nums = [2,7,11,15], target = 9</p>
                <p><span className="text-gray-500">Output:</span> [0,1]</p>
                <p><span className="text-gray-500">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-white mb-2">Example 2:</h3>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#333] font-mono text-xs">
                <p><span className="text-gray-500">Input:</span> nums = [3,2,4], target = 6</p>
                <p><span className="text-gray-500">Output:</span> [1,2]</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-white mb-2">Constraints:</h3>
              <ul className="list-disc pl-5 space-y-2 text-[#a3a3a3]">
                <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
                <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
                <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
                <li><strong>Only one valid answer exists.</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Pane: Code Editor & Console */}
        <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 h-12 border-b border-[#333] bg-[#1a1a1a] shrink-0">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#2a2a2a] border border-[#444] text-white text-xs rounded-lg px-3 py-1 outline-none focus:border-university-500"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript</option>
            </select>
            
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-white transition-colors" title="Format Code">
                <Code2 className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors" title="Reset to Default">
                <RefreshCwIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 outline-none resize-none no-scrollbar leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Console Area */}
          <div className={`border-t border-[#333] bg-[#1a1a1a] flex flex-col transition-all duration-300 ease-in-out ${isConsoleOpen ? 'h-64' : 'h-12'}`}>
            <div className="flex items-center justify-between px-4 h-12 border-b border-[#333] shrink-0 cursor-pointer" onClick={() => setIsConsoleOpen(!isConsoleOpen)}>
              <div className="flex items-center space-x-2 text-white font-medium text-sm">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span>Console</span>
              </div>
              <button className="text-gray-400 hover:text-white">
                {isConsoleOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
              </button>
            </div>
            
            {isConsoleOpen && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                <div className="flex space-x-6 border-b border-[#333] mb-4">
                  <button 
                    onClick={() => setOutputTab('testcases')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${outputTab === 'testcases' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                  >
                    Testcases
                  </button>
                  <button 
                    onClick={() => setOutputTab('result')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${outputTab === 'result' ? 'border-university-500 text-university-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                  >
                    Test Result
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {outputTab === 'testcases' && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-mono">nums =</p>
                        <div className="bg-[#2a2a2a] px-3 py-2 rounded-lg font-mono text-sm border border-[#444] inline-block">[2,7,11,15]</div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-mono">target =</p>
                        <div className="bg-[#2a2a2a] px-3 py-2 rounded-lg font-mono text-sm border border-[#444] inline-block">9</div>
                      </div>
                    </div>
                  )}

                  {outputTab === 'result' && (
                    <div className="h-full flex flex-col">
                      {isRunning ? (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                          <div className="w-6 h-6 border-2 border-university-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-sm text-gray-400">Judging...</p>
                        </div>
                      ) : runStatus === 'success' ? (
                        <div className="animate-in fade-in">
                          <div className="flex items-center space-x-2 text-green-500 mb-4">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-bold text-lg">Accepted</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                               <p className="text-xs text-gray-500 mb-1">Input</p>
                               <div className="bg-[#2a2a2a] p-2 rounded border border-[#444] font-mono text-xs truncate">nums = [2,7,11,15], target = 9</div>
                             </div>
                             <div>
                               <p className="text-xs text-gray-500 mb-1">Output</p>
                               <div className="bg-[#2a2a2a] p-2 rounded border border-[#444] font-mono text-xs text-green-400 truncate">[0,1]</div>
                             </div>
                             <div>
                               <p className="text-xs text-gray-500 mb-1">Expected</p>
                               <div className="bg-[#2a2a2a] p-2 rounded border border-[#444] font-mono text-xs truncate">[0,1]</div>
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                          Run code to see results
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="h-14 border-t border-[#333] bg-[#1a1a1a] flex items-center justify-between px-4 shrink-0">
             <div className="flex items-center space-x-2">
               <button className="text-xs font-medium text-gray-400 hover:text-white px-3 py-1.5 rounded bg-[#2a2a2a] hover:bg-[#333] transition-colors">
                 Console
               </button>
             </div>
             <div className="flex items-center space-x-3">
               <button 
                 onClick={handleRun}
                 className="flex items-center space-x-2 px-6 py-2 bg-[#2a2a2a] hover:bg-[#333] text-gray-200 rounded-xl text-sm font-bold transition-colors border border-[#444]"
               >
                 {isRunning ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div> : <Play className="w-4 h-4" fill="currentColor" />}
                 <span>Run</span>
               </button>
               <button 
                 onClick={handleRun}
                 className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors shadow-lg"
               >
                 <Send className="w-4 h-4" />
                 <span>Submit</span>
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Missing icons
function FileTextIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
}
function FlaskIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H15M10 3V8L3 20C2.5 20.7 3 22 4 22H20C21 22 21.5 20.7 21 20L14 8V3M10 14H14"/></svg>;
}
function ClockIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function RefreshCwIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
}
function ChevronUpIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
}
function ChevronDownIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
}
