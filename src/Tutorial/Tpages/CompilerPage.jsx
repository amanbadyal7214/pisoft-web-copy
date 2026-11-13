import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import THeader from '../TComponents/THeader';
import TFooter from '../TComponents/TFooter';
import {
  Play,
  Download,
  Share2,
  Bookmark,
  Settings,
  Trash2,
  CheckCircle2,
  Clock,
  MoreVertical,
  Plus,
  X,
  AlertCircle,
  Loader2,
  Terminal,
  Sliders
} from 'lucide-react';

// Self-Hosted Judge0 Instance Configuration
const JUDGE0_BASE_URL = 'https://compiler.comsdesk.com';
const JUDGE0_AUTH_TOKEN = 'MeraSecretApiToken789!';

// Robust Base64 Helpers with UTF-8 Support
const toBase64 = (str) => {
  if (typeof str !== 'string') str = String(str || '');
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode('0x' + p1)
      )
    );
  } catch (err) {
    console.error('Base64 Encoding Error:', err);
    return '';
  }
};

const fromBase64 = (str) => {
  if (!str) return '';
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    try {
      return atob(str);
    } catch {
      return str;
    }
  }
};

// Judge0 CE language IDs mapping
const languageMap = {
  javascript: 63, // JavaScript (Node.js)
  js: 63,
  java: 62,   // Java (OpenJDK 13.0.1)
  python: 71, // Python (3.8.1)
  c: 50,      // C (GCC 9.2.0)
  cpp: 54     // C++ (GCC 9.2.0)
};

// Language configurations
const languagesMap = {
  javascript: {
    name: 'JavaScript',
    slug: 'javascript',
    short: 'JS',
    judge0Id: languageMap.javascript,
    bgColor: 'bg-amber-500',
    textColor: 'text-white',
    fileName: 'app.js',
    defaultCode: `console.log("Hello, World!");`
  },
  // js: {
  //   name: 'JavaScript',
  //   slug: 'js',
  //   short: 'JS',
  //   judge0Id: languageMap.js,
  //   bgColor: 'bg-amber-500',
  //   textColor: 'text-white',
  //   fileName: 'app.js',
  //   defaultCode: `console.log("Hello, World!");`
  // },
  c: {
    name: 'C',
    slug: 'c',
    short: 'C',
    judge0Id: languageMap.c,
    bgColor: 'bg-blue-700',
    textColor: 'text-white',
    fileName: 'main.c',
    defaultCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
  },
  cpp: {
    name: 'C++',
    slug: 'cpp',
    short: 'C++',
    judge0Id: languageMap.cpp,
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    fileName: 'main.cpp',
    defaultCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
  },
  java: {
    name: 'Java',
    slug: 'java',
    short: '☕',
    judge0Id: languageMap.java,
    bgColor: 'bg-orange-600',
    textColor: 'text-white',
    fileName: 'Main.java',
    defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
  },
  python: {
    name: 'Python',
    slug: 'python',
    short: 'PY',
    judge0Id: languageMap.python,
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    fileName: 'main.py',
    defaultCode: `print("Hello, World!")`
  }
};

export default function CompilerPage() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Selected language sync
  const currentSlug = techId ? techId.toLowerCase() : 'c';
  const activeLang = languagesMap[currentSlug] || languagesMap.c;

  // Code & Execution States
  const initialCode = location.state?.code || activeLang.defaultCode;
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState('0.00s');
  const [executionStatus, setExecutionStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('Idle');
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const pollTimerRef = useRef(null);

  const clearPollTimer = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearPollTimer();
  }, []);

  // Update editor state when route parameter or location state changes
  useEffect(() => {
    setCode(location.state?.code || activeLang.defaultCode);
    setOutput('');
    setExecutionStatus('idle');
    setStatusMessage('Idle');
    setExecutionTime('0.00s');
    clearPollTimer();
  }, [currentSlug, location.state]);

  // Poll Judge0 for execution status/results
  const pollForResult = async (token) => {
    let attempts = 0;
    const maxAttempts = 30;
    clearPollTimer();

    pollTimerRef.current = setInterval(async () => {
      attempts += 1;
      console.log(`[Judge0] Polling submission (Attempt ${attempts})...`);

      try {
        const response = await fetch(
          `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=true`,
          {
            method: 'GET',
            headers: { 
              'X-Auth-Token': JUDGE0_AUTH_TOKEN 
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Status polling failed with HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('[Judge0] Poll Response Data:', data);

        const statusId = data.status?.id;

        // Status 1 = In Queue, Status 2 = Processing
        if (statusId !== 1 && statusId !== 2) {
          clearPollTimer();
          setIsExecuting(false);
          setExecutionTime(data.time ? `${data.time}s` : '0.00s');

          const stdout = fromBase64(data.stdout);
          const stderr = fromBase64(data.stderr);
          const compileOutput = fromBase64(data.compile_output);

          if (compileOutput) {
            setOutput(`Compilation Error:\n${compileOutput}`);
            setExecutionStatus('error');
            setStatusMessage('Compilation Error');
          } else if (stderr || statusId >= 6) {
            setOutput(`Runtime Error:\n${stderr || data.status?.description}`);
            setExecutionStatus('error');
            setStatusMessage(data.status?.description || 'Runtime Error');
          } else if (stdout) {
            setOutput(stdout);
            setExecutionStatus('success');
            setStatusMessage(data.status?.description || 'Executed successfully');
          } else {
            setOutput('Program finished with no output.');
            setExecutionStatus('success');
            setStatusMessage('Completed');
          }
        }

        if (attempts >= maxAttempts) {
          clearPollTimer();
          setIsExecuting(false);
          setExecutionStatus('error');
          setStatusMessage('Timed Out');
          setOutput('Execution timed out waiting for execution server.');
        }
      } catch (err) {
        console.error('[Judge0] Polling Error:', err);
        clearPollTimer();
        setIsExecuting(false);
        setExecutionStatus('error');
        setStatusMessage('Error');
        setOutput(`Execution error: ${err.message}`);
      }
    }, 1000);
  };

  // Submit code to backend
  const handleRunCode = async () => {
    console.log('[Compiler] Run Code Triggered');

    if (!code || !code.trim()) {
      setOutput('Error: Code editor cannot be empty.');
      setExecutionStatus('error');
      return;
    }

    if (isExecuting) return;

    setIsExecuting(true);
    setOutput('Compiling and executing code...');
    setExecutionStatus('running');
    setStatusMessage('Submitting...');
    clearPollTimer();

    try {
      const encodedSourceCode = toBase64(code);
      const encodedStdin = stdin ? toBase64(stdin) : undefined;

      console.log('[Judge0] Submitting POST payload to:', `${JUDGE0_BASE_URL}/submissions`);

      const response = await fetch(
        `${JUDGE0_BASE_URL}/submissions?wait=false&base64_encoded=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': JUDGE0_AUTH_TOKEN
          },
          body: JSON.stringify({
            source_code: encodedSourceCode,
            language_id: activeLang.judge0Id,
            stdin: encodedStdin
          })
        }
      );

      console.log('[Judge0] Submission HTTP Response Code:', response.status);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText || response.statusText}`);
      }

      const data = await response.json();
      console.log('[Judge0] Submission Token Created:', data);

      if (data.token) {
        setStatusMessage('Processing...');
        pollForResult(data.token);
      } else {
        throw new Error('Server returned empty submission token');
      }
    } catch (err) {
      console.error('[Judge0] Submission Failed:', err);
      setIsExecuting(false);
      setExecutionStatus('error');
      setStatusMessage('Error');
      setOutput(`Failed to execute code: ${err.message}`);
    }
  };

  // Cursor position tracker
  const handleTextareaSelect = (e) => {
    const text = e.target.value;
    const selectionStart = e.target.selectionStart;
    const lines = text.substring(0, selectionStart).split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  // Download Code File
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = activeLang.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSelectLanguage = (slug) => {
    navigate(`/Compiler/${slug}`);
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-IN flex flex-col">
      {/* Top Header */}
      {/* <THeader selectedTech={currentSlug} onSelectTech={handleSelectLanguage} /> */}
      <THeader  />

      {/* Main Compiler Workspace */}
      <div className="pt-40 px-4 sm:px-6 lg:px-8 md:pt-35 pb-6 flex-1 flex flex-col max-w-[1600px] mx-auto w-full">
        
        {/* Compiler Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${activeLang.bgColor} ${activeLang.textColor} font-INB text-xs flex items-center justify-center shadow-xs`}>
              {activeLang.short}
            </div>
            <h1 className="text-xl font-INB text-gray-900 tracking-tight">
              Online {activeLang.name} Compiler
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-INB rounded-xl shadow-xs transition-all cursor-pointer">
              <Share2 className="w-3.5 h-3.5 text-gray-500" /> Share
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-INB rounded-xl shadow-xs transition-all cursor-pointer">
              <Bookmark className="w-3.5 h-3.5 text-gray-500" /> Save
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-INB rounded-xl shadow-xs transition-all cursor-pointer">
              <Settings className="w-3.5 h-3.5 text-gray-500" /> Settings
            </button>
          </div>
        </div>

        {/* Workspace Split Layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 items-stretch min-h-[620px]">

          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="w-full lg:w-48 bg-white rounded-2xl border border-gray-200/70 p-2 shadow-xs flex-shrink-0 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto">
            {Object.values(languagesMap).map((lang) => {
              const isActive = lang.slug === currentSlug;
              return (
                <button
                  key={lang.slug}
                  onClick={() => handleSelectLanguage(lang.slug)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-INB transition-all flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-700 border border-amber-400/40 shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-md ${lang.bgColor} ${lang.textColor} flex items-center justify-center text-[10px] font-INB shadow-xs`}>
                    {lang.short}
                  </span>
                  <span>{lang.name}</span>
                </button>
              );
            })}
          </aside>

          {/* ================= MIDDLE CODE EDITOR ================= */}
          <section className="flex-1 bg-white rounded-2xl border border-gray-200/70 shadow-xs flex flex-col overflow-hidden min-w-0">
            {/* Editor Action Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-slate-50/50">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-INB text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" /> Download
                </button>
                <button 
                  onClick={() => setShowStdin(!showStdin)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-INB rounded-lg transition-colors cursor-pointer ${
                    showStdin ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-600" /> Custom Input (stdin)
                </button>
              </div>

              {/* Primary Run Button */}
              <button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-INB text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                {isExecuting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Running...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Run
                  </>
                )}
              </button>
            </div>

            {/* File Tab Strip */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-2">
              <div className="flex items-center gap-1 pt-1">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-t border-x border-gray-200/80 rounded-t-lg text-xs font-INB text-gray-800 shadow-2xs">
                  <span className={`w-4 h-4 rounded ${activeLang.bgColor} ${activeLang.textColor} text-[9px] flex items-center justify-center font-INB`}>
                    {activeLang.short}
                  </span>
                  <span>{activeLang.fileName}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer ml-1" />
                </div>
                <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button className="p-1 text-gray-400 hover:text-gray-600 mr-2">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Text Editor Container */}
            <div className="flex-1 p-4 font-mono text-xs leading-relaxed flex gap-3 overflow-auto bg-white">
              {/* Line Numbers */}
              <div className="select-none text-slate-300 text-right pr-3 border-r border-gray-100 font-mono min-w-[2rem]">
                {lineNumbers.map((num) => (
                  <div key={num}>{num}</div>
                ))}
              </div>

              {/* Code Area */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onSelect={handleTextareaSelect}
                onClick={handleTextareaSelect}
                onKeyUp={handleTextareaSelect}
                spellCheck="false"
                className="w-full bg-transparent text-slate-800 font-mono focus:outline-none resize-none leading-relaxed border-none p-0 selection:bg-blue-100 min-h-[300px]"
              />
            </div>

            {/* Expandable Standard Input Box */}
            {showStdin && (
              <div className="border-t border-gray-100 bg-slate-50 p-3">
                <div className="text-[11px] font-INB text-gray-500 mb-1 flex items-center justify-between">
                  <span>Standard Input (stdin):</span>
                  <span className="text-[10px] font-normal text-gray-400">Passed to your program at execution</span>
                </div>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter inputs line by line..."
                  className="w-full h-20 bg-white border border-gray-200 rounded-lg p-2 font-mono text-xs text-slate-800 focus:outline-none focus:border-blue-400"
                />
              </div>
            )}

            {/* Editor Footer Info Bar */}
            <div className="px-4 py-2 border-t border-gray-100 bg-slate-50/50 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span className="text-blue-600 font-medium">{activeLang.name}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready
              </div>
            </div>
          </section>

          {/* ================= RIGHT OUTPUT CONSOLE ================= */}
          <section className="w-full lg:w-[480px] bg-white rounded-2xl border border-gray-200/70 shadow-xs flex flex-col overflow-hidden flex-shrink-0">
            {/* Output Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-500" />
                <h3 className="font-INB text-xs text-gray-900 tracking-wide">Output</h3>
              </div>
              <button
                onClick={() => {
                  setOutput('');
                  setExecutionStatus('idle');
                  setStatusMessage('Idle');
                }}
                className="flex items-center gap-1 px-2.5 py-1 border border-gray-200 hover:border-gray-300 text-gray-600 text-xs rounded-lg transition-colors font-IN cursor-pointer"
              >
                <Trash2 className="w-3 h-3 text-gray-400" /> Clear
              </button>
            </div>

            {/* Console Output Screen */}
            <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-white border-b border-gray-100">
              {isExecuting ? (
                <div className="flex items-center gap-2 text-slate-500 font-mono py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Compiling and running your code...</span>
                </div>
              ) : output ? (
                <pre className={`whitespace-pre-wrap font-mono leading-relaxed ${
                  executionStatus === 'error' ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  {output}
                </pre>
              ) : (
                <div className="text-gray-400 font-INB text-sm italic">
                  Click 'Run' to compile and execute your code...
                </div>
              )}
            </div>

            {/* Output Status Bar */}
            <div className="px-4 py-2.5 bg-slate-50/50 flex items-center justify-between text-xs text-gray-500">
              {executionStatus === 'success' && (
                <div className="flex items-center gap-1.5 text-emerald-600 font-INB">
                  <CheckCircle2 className="w-4 h-4" /> {statusMessage}
                </div>
              )}
              {executionStatus === 'error' && (
                <div className="flex items-center gap-1.5 text-rose-600 font-INB">
                  <AlertCircle className="w-4 h-4" /> {statusMessage}
                </div>
              )}
              {executionStatus === 'running' && (
                <div className="flex items-center gap-1.5 text-blue-600 font-INB">
                  <Loader2 className="w-4 h-4 animate-spin" /> {statusMessage}
                </div>
              )}
              {executionStatus === 'idle' && (
                <div className="text-gray-400 font-IN">Status: Idle</div>
              )}
              
              <div className="flex items-center gap-1 text-gray-400 font-mono">
                <Clock className="w-3.5 h-3.5" /> {executionTime}
              </div>
            </div>
          </section>

        </div>
      </div>
      <TFooter />
    </div>
  );
}