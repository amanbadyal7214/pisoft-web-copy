import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Copy,
  ExternalLink,
  Play,
  Loader2,
  Terminal,
  AlertCircle
} from 'lucide-react';

export const JUDGE0_BASE_URL = 'https://compiler.comsdesk.com';
export const JUDGE0_AUTH_TOKEN = 'MeraSecretApiToken789!';

export const LANGUAGE_MAP = {
  javascript: 63,
  js: 63,
  python: 71,
  python3: 71,
  java: 62,
  cpp: 54,
  c: 50,
  csharp: 51,
  go: 60,
  php: 68,
  ruby: 72,
  typescript: 74,
  ts: 74
};

export const toBase64 = (str) => {
  try {
    return btoa(
      encodeURIComponent(str || '').replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode('0x' + p1)
      )
    );
  } catch {
    return '';
  }
};

export const fromBase64 = (str) => {
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

export default function CodeSnippetCompiler({
  initialCode,
  label,
  defaultLangId,
  techName
}) {
  const navigate = useNavigate();
  const [code, setCode] = useState(initialCode || '');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [executionTime, setExecutionTime] = useState(null);

  const pollTimerRef = useRef(null);

  const clearPollTimer = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearPollTimer();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pollForResult = async (token) => {
    let attempts = 0;
    const maxAttempts = 25;
    clearPollTimer();

    pollTimerRef.current = setInterval(async () => {
      attempts += 1;
      try {
        const response = await fetch(
          `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=true`,
          {
            headers: { 'X-Auth-Token': JUDGE0_AUTH_TOKEN }
          }
        );

        if (!response.ok) throw new Error('Failed to fetch execution status');

        const data = await response.json();
        const statusId = data.status?.id;

        if (statusId !== 1 && statusId !== 2) {
          clearPollTimer();
          setIsRunning(false);
          setStatus(data.status?.description || 'Finished');
          setExecutionTime(data.time ? `${data.time}s` : null);

          const stdout = fromBase64(data.stdout);
          const stderr = fromBase64(data.stderr);
          const compileOutput = fromBase64(data.compile_output);

          if (stderr || compileOutput || statusId >= 6) {
            setError(
              stderr ||
                compileOutput ||
                `Execution failed with status: ${data.status?.description}`
            );
            setOutput(stdout || null);
          } else {
            setOutput(stdout || 'Program executed successfully with no output.');
            setError(null);
          }
        }

        if (attempts >= maxAttempts) {
          clearPollTimer();
          setIsRunning(false);
          setError('Execution timed out while waiting for server.');
        }
      } catch (err) {
        clearPollTimer();
        setIsRunning(false);
        setError(`Compiler error: ${err.message}`);
      }
    }, 1000);
  };

  const handleRunCode = async () => {
    if (!code.trim() || isRunning) return;

    setIsRunning(true);
    setOutput(null);
    setError(null);
    setStatus('Submitting...');

    try {
      const response = await fetch(
        `${JUDGE0_BASE_URL}/submissions?wait=false&base64_encoded=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': JUDGE0_AUTH_TOKEN
          },
          body: JSON.stringify({
            source_code: toBase64(code),
            language_id: defaultLangId || 63
          })
        }
      );

      if (!response.ok) throw new Error('Failed to submit code for execution');

      const data = await response.json();
      if (data.token) {
        setStatus('Running...');
        pollForResult(data.token);
      } else {
        throw new Error('No execution token returned');
      }
    } catch (err) {
      setIsRunning(false);
      setError(`Failed to run code: ${err.message}`);
    }
  };

  const lineNumbers = code
    ? code.split('\n').map((_, index) => index + 1)
    : [1];

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-[#0d1117] text-gray-200 border border-slate-800 shadow-md">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 bg-[#161b22] border-b border-slate-800 text-xs gap-2">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-orange-500 text-white font-INB text-[8px] flex items-center justify-center">
            &lt;&gt;
          </span>
          <span className="text-slate-300 font-INB truncate">
            {label || `${techName || 'Code'} Snippet`}
          </span>
        </div>

        <div className="flex items-center gap-2 font-in">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/Compiler/${techName || 'javascript'}`, {
                state: { code }
              })
            }
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" /> Full Editor
          </button>

          <button
            type="button"
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/60 text-white font-INB text-xs rounded shadow-xs transition-all cursor-pointer"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Textarea Editor */}
      <div className="p-3 font-mono text-xs leading-relaxed flex gap-3 bg-[#0d1117] overflow-x-auto min-h-[120px]">
        <div className="select-none text-slate-400 text-right pr-2 border-r border-slate-800/80 font-mono">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          rows={Math.max(4, lineNumbers.length)}
          className="w-full bg-transparent text-slate-100 font-mono focus:outline-none resize-none leading-relaxed border-none p-0 selection:bg-orange-500/30"
        />
      </div>

      {/* Output Screen */}
      {(output !== null || error !== null || isRunning) && (
        <div className="border-t border-slate-800 bg-[#090d12] p-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-slate-400 font-INB text-[10px] uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-orange-400" /> Output Console
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              {executionTime && (
                <span className="text-slate-400 font-mono">
                  Time: {executionTime}
                </span>
              )}
              {status && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-INB ${
                    error
                      ? 'bg-red-950/80 text-red-400 border border-red-800/50'
                      : 'bg-green-950/80 text-green-400 border border-green-800/50'
                  }`}
                >
                  {status}
                </span>
              )}
            </div>
          </div>

          {isRunning && (
            <div className="flex items-center gap-2 text-slate-400 py-1 italic">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500" />
              <span>Compiling and executing code...</span>
            </div>
          )}

          {error && (
            <div className="text-red-400 whitespace-pre-wrap flex gap-2 items-start bg-red-950/20 p-2 rounded border border-red-900/30">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div className="flex-1 overflow-x-auto">{error}</div>
            </div>
          )}

          {output && (
            <pre className="text-emerald-400 whitespace-pre-wrap overflow-x-auto py-1 font-mono">
              {output}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
