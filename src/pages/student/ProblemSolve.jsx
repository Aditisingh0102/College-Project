import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Badge from '../../components/shared/Badge';
import { Play, Send, CheckCircle2, XCircle } from 'lucide-react';

export default function ProblemSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { problems } = useAppContext();
  const problem = problems.find(p => p.id === id);

  const [code, setCode] = useState(problem?.starterCode || '');
  const [output, setOutput] = useState(null); // null, 'success', 'error'
  const [isRunning, setIsRunning] = useState(false);

  if (!problem) return <div className="p-8">Problem not found.</div>;

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('success');
      setIsRunning(false);
    }, 800);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('success');
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-in fade-in duration-500">
      {/* Left Panel: Description */}
      <div className="w-1/2 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{problem.title}</h1>
            <div className="flex space-x-2">
              <Badge variant={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'danger'}>
                {problem.difficulty}
              </Badge>
              <Badge variant="default">{problem.type}</Badge>
            </div>
          </div>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
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
                    <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Editor or Output */}
      <div className="w-1/2 flex flex-col gap-4">
        {/* Editor */}
        <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col shadow-sm">
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <select className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none">
              {(problem.languages || ['text']).map(lang => (
                <option key={lang} value={lang} className="bg-white dark:bg-gray-900">{lang.toUpperCase()}</option>
              ))}
            </select>
          </div>
          {problem.type !== 'Objective' ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-[#d4d4d4] font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
              No code editor needed for objective questions.
            </div>
          )}
        </div>

        {/* Output Panel & Actions */}
        <div className="h-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-t-2xl">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Test Results</span>
            <div className="flex space-x-3">
              <button 
                onClick={handleRun}
                disabled={isRunning || problem.type === 'Objective'}
                className="flex items-center px-4 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4 mr-2" /> Run
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center px-4 py-1.5 bg-university-600 hover:bg-university-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" /> Submit
              </button>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 rounded-b-2xl">
            {isRunning ? (
              <div className="flex items-center justify-center h-full text-gray-500">Evaluating...</div>
            ) : output === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <h3 className="text-lg font-bold text-green-600 dark:text-green-400">Accepted!</h3>
                <p className="text-sm text-gray-500">Runtime: 42ms • Memory: 34.2MB</p>
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                Run or submit your solution to see results here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
