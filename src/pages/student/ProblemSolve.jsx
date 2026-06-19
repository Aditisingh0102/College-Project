import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Badge from '../../components/shared/Badge';
import { Play, Send, CheckCircle2, XCircle, Sparkles, MessageSquare, ThumbsUp, History } from 'lucide-react';

export default function ProblemSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { problems, addToast } = useAppContext();
  
  const problem = problems.find(p => p.id === parseInt(id));
  const [code, setCode] = useState(problem?.starterCode || '');
  const [output, setOutput] = useState(null); // null, 'success', 'error'
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showAiHint, setShowAiHint] = useState(false);
  const [language, setLanguage] = useState('python');

  if (!problem) return <div className="p-8">Problem not found.</div>;

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('success'); // Mock success
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    handleRun();
    setTimeout(() => {
      addToast("Successfully submitted!", "success");
      navigate('/student/problems');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      {/* Left Panel: Description & Discussions */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'description' ? 'border-university-600 text-university-600 dark:text-university-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('discussions')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex justify-center items-center ${activeTab === 'discussions' ? 'border-university-600 text-university-600 dark:text-university-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <MessageSquare className="w-4 h-4 mr-2" /> Discussions
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'description' ? (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{problem.title}</h1>
                <div className="flex space-x-2">
                  <Badge variant={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'danger'}>
                    {problem.difficulty}
                  </Badge>
                  <Badge variant="default">{problem.type}</Badge>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{problem.description}</p>
                {problem.sampleTestCases && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-2">Sample Test Cases</h3>
                    <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                      {problem.sampleTestCases}
                    </pre>
                  </div>
                )}
                {problem.type === 'Objective' && problem.options && (
                  <div className="mt-6 space-y-3">
                    {problem.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <input type="radio" name="objective-answer" className="w-4 h-4 text-university-600 focus:ring-university-500" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Peer Discussions</h3>
                <button className="text-sm text-university-600 font-medium hover:underline">+ New Topic</button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="flex items-start space-x-3">
                  <img src="https://i.pravatar.cc/150?u=4" alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Rahul Verma</p>
                    <p className="text-xs text-gray-500 mb-2">2 hours ago</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Can we solve this in O(N) using a Hash Map instead of nested loops?</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <button className="text-xs text-gray-500 hover:text-university-600 flex items-center"><ThumbsUp className="w-3 h-3 mr-1" /> 24</button>
                      <button className="text-xs text-gray-500 hover:text-university-600 flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> 3 Replies</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-university-100 text-university-600 flex items-center justify-center font-bold text-xs">Dr</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Dr. Sharma <Badge variant="success" className="ml-2 text-[10px] py-0">Faculty</Badge></p>
                    <p className="text-xs text-gray-500 mb-2">5 hours ago</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Remember to consider edge cases!</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <button className="text-xs text-gray-500 hover:text-university-600 flex items-center"><ThumbsUp className="w-3 h-3 mr-1" /> 89</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Code Editor (Only for Coding problems) */}
      {problem.type === 'Coding' && (
        <div className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm">
          
          <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#1e1e1e] border border-[#404040] text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-university-500 outline-none text-white"
            >
              <option value="python">Python 3</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowAiHint(!showAiHint)}
                className="p-1.5 text-yellow-500 hover:bg-yellow-500/20 rounded-lg transition flex items-center text-sm font-bold" title="Get AI Hint"
              >
                <Sparkles className="w-4 h-4 mr-1" /> AI Hint
              </button>
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#404040] rounded-lg transition">
                <History className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {showAiHint && (
            <div className="p-4 bg-yellow-500/10 border-b border-yellow-500/20 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-yellow-400 mb-1">Platform AI Hint</p>
                <p className="text-sm text-yellow-200">Instead of nested loops (O(N²)), try storing numbers you've seen so far in a Hash Map. For each number, check if the complement exists in the map!</p>
              </div>
            </div>
          )}

          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none outline-none"
              spellCheck="false"
            />
          </div>

          <div className="p-4 bg-[#2d2d2d] border-t border-[#404040]">
            {output && (
              <div className={`mb-4 p-4 rounded-xl flex items-start space-x-3 ${output === 'success' ? 'bg-green-900/30 text-green-400 border border-green-800/50' : 'bg-red-900/30 text-red-400 border border-red-800/50'}`}>
                {output === 'success' ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <XCircle className="w-5 h-5 mt-0.5" />}
                <div>
                  <h4 className="font-bold mb-1">{output === 'success' ? 'Accepted' : 'Wrong Answer'}</h4>
                  <p className="text-sm opacity-80">{output === 'success' ? 'Runtime: 45ms (Beats 89%)' : 'Failed on test case 4/15'}</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center px-4 py-2 bg-[#404040] hover:bg-[#505050] text-white rounded-lg text-sm font-medium transition"
              >
                <Play className="w-4 h-4 mr-2" /> {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center px-4 py-2 bg-university-600 hover:bg-university-700 text-white rounded-lg text-sm font-medium transition"
              >
                <Send className="w-4 h-4 mr-2" /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
