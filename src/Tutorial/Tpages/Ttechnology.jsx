import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import THeader from '../TComponents/THeader';
import Tfooter from '../TComponents/TFooter';
import {
  ChevronDown,
  ChevronUp,
  Home,
  Bookmark,
  Share2,
  MoreVertical,
  Copy,
  Check,
  Play,
  Menu,
  X,
  BookOpen,
  Loader2,
  Image as ImageIcon,
  Terminal,
  ExternalLink,
  AlertCircle,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Tutorial_Base } from '../../../baseURL';

const JUDGE0_BASE_URL = 'https://compiler.comsdesk.com';
const JUDGE0_AUTH_TOKEN = 'MeraSecretApiToken789!';

const LANGUAGE_MAP = {
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

const toBase64 = (str) => {
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

// --- Inline Compiler Block Component ---
function CodeSnippetCompiler({ initialCode, label, defaultLangId, techName }) {
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
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            onClick={() =>
              navigate(`/Compiler/${techName || 'javascript'}`, {
                state: { code }
              })
            }
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Full Editor
          </button>

          <button
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
            <div className="flex items-center gap-2 text-slate-800 font-INB text-[10px] uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-orange-400" /> Output Console
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              {executionTime && (
                <span className="text-slate-800 font-mono">
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
            <div className="flex items-center gap-2 text-slate-800 py-1 italic">
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

// --- Main Technology Page Component ---
export default function Ttechnology() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [groupedSections, setGroupedSections] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [activeTopicContent, setActiveTopicContent] = useState(null);

  const [isSidebarLoading, setIsSidebarLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [hasNoData, setHasNoData] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Security: Disable copy, paste, context menu, and DevTools shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
      }
      // Prevent Ctrl+U
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
      }
      // Prevent Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P
      if (e.ctrlKey && (e.key === 'C' || e.key === 'c' || e.key === 'V' || e.key === 'v' || e.key === 'X' || e.key === 'x' || e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const preventCopyPaste = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('cut', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
    };
  }, []);

  // Helper function to force scrolling to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    if (selectedTopicId) scrollToTop();
  }, [selectedTopicId]);

  useEffect(() => {
    if (activeTopicContent) scrollToTop();
  }, [activeTopicContent]);

  // Flattened array of all topics in exact sequence order for Previous/Next navigation
  const flattenedTopics = useMemo(() => {
    const list = [];
    groupedSections.forEach((section) => {
      section.items.forEach((item) => {
        list.push(item);
      });
    });
    return list;
  }, [groupedSections]);

  // Identify current topic index in the sequential list
  const currentTopicIndex = useMemo(() => {
    if (!selectedTopicId || flattenedTopics.length === 0) return -1;
    return flattenedTopics.findIndex(
      (item) => String(item.id || item.topicId) === String(selectedTopicId)
    );
  }, [selectedTopicId, flattenedTopics]);

  const prevTopic = currentTopicIndex > 0 ? flattenedTopics[currentTopicIndex - 1] : null;
  const nextTopic =
    currentTopicIndex >= 0 && currentTopicIndex < flattenedTopics.length - 1
      ? flattenedTopics[currentTopicIndex + 1]
      : null;

  // Take a Test Handler
  const handleTakeTest = () => {
    const storedUser = localStorage.getItem('user');
    const targetTechId = techId || activeTopicContent?.technologyId || '194';

    if (storedUser) {
      navigate('/Tquiz', { state: { techId: targetTechId } });
    } else {
      navigate('/TAuth', { 
        state: { 
          from: { pathname: '/Tquiz' },
          redirectTo: '/Tquiz', 
          techId: targetTechId 
        } 
      });
    }
  };

  // Select Topic and sync with URL query param so refresh keeps state
  const selectTopic = (topicItem) => {
    const itemId = String(topicItem.id || topicItem.topicId);
    setSelectedTopicId(itemId);
    setSearchParams({ topic: itemId }, { replace: true });
    setIsMobileDrawerOpen(false);
    scrollToTop();
  };

  // Fetch Sidebar Outline and Reset Stale State on Tech Change
  useEffect(() => {
    const fetchSidebar = async () => {
      setGroupedSections([]);
      setSelectedTopicId(null);
      setActiveTopicContent(null);
      setHasNoData(false);
      setIsSidebarLoading(true);

      try {
        const idToFetch = techId && !isNaN(techId) ? techId : '194';

        const topicsRes = await fetch(
          `${Tutorial_Base}/websiteModule/getTopicsByTechnologyId/${idToFetch}`
        );
        if (!topicsRes.ok) throw new Error('Failed to fetch topics');

        const topics = await topicsRes.json();
        if (!Array.isArray(topics) || topics.length === 0) {
          setHasNoData(true);
          setIsSidebarLoading(false);
          return;
        }

        const sections = await Promise.all(
          topics.map(async (topic) => {
            try {
              const subsRes = await fetch(
                `${Tutorial_Base}/websiteModule/byTopic/${topic.id}`
              );
              if (!subsRes.ok) throw new Error('Failed subtopics fetch');

              const subtopics = await subsRes.json();
              const sortedSubs = Array.isArray(subtopics)
                ? subtopics.sort((a, b) => (a.sequenceOrder || 0) - (b.sequenceOrder || 0))
                : [];

              return {
                id: `section-${topic.id}`,
                title: topic.mainTopic,
                topicId: topic.id,
                sequenceOrder: topic.sequenceOrder || 0,
                items: sortedSubs
              };
            } catch (err) {
              console.error(`Error fetching subtopics for topic ${topic.id}:`, err);
              return {
                id: `section-${topic.id}`,
                title: topic.mainTopic,
                topicId: topic.id,
                sequenceOrder: topic.sequenceOrder || 0,
                items: []
              };
            }
          })
        );

        sections.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
        setGroupedSections(sections);

        const initialOpenState = {};
        sections.forEach((sec) => (initialOpenState[sec.id] = true));
        setOpenSections(initialOpenState);

        const urlTopicId = searchParams.get('topic');
        let topicExists = false;
        let matchedId = null;

        if (urlTopicId) {
          for (const section of sections) {
            const found = section.items.find(
              (d) => String(d.id || d.topicId) === String(urlTopicId)
            );
            if (found) {
              topicExists = true;
              matchedId = String(found.id || found.topicId);
              break;
            }
          }
        }

        if (topicExists && matchedId) {
          setSelectedTopicId(matchedId);
        } else if (sections[0]?.items[0]) {
          const defaultId = String(sections[0].items[0].id);
          setSelectedTopicId(defaultId);
          setSearchParams({ topic: defaultId }, { replace: true });
        }
      } catch (err) {
        console.error('Error fetching sidebar:', err);
        setHasNoData(true);
      } finally {
        setIsSidebarLoading(false);
      }
    };

    fetchSidebar();
  }, [techId]);

  // Fetch Topic Content
  useEffect(() => {
    if (!selectedTopicId) return;

    const fetchTopicDetails = async () => {
      try {
        setIsContentLoading(true);

        const response = await fetch(
          `${Tutorial_Base}/websiteModule/${selectedTopicId}`
        );
        if (!response.ok) throw new Error('Failed topic details fetch');

        const data = await response.json();
        const topicDetail = Array.isArray(data) ? data[0] : data;
        setActiveTopicContent(topicDetail);
      } catch (err) {
        console.error('Error fetching topic detail:', err);
      } finally {
        setIsContentLoading(false);
      }
    };

    fetchTopicDetails();
  }, [selectedTopicId]);

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectTopicItem = (item) => {
    selectTopic(item);
  };

  // Dynamic Content Renderer
  const renderParsedContent = (htmlString, techName) => {
    if (!htmlString) return null;

    if (typeof window === 'undefined') {
      return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const snippetElements = Array.from(
      doc.querySelectorAll('.pi-code-snippet')
    );

    const baseProseClasses =
      "prose prose-slate max-w-none text-xs sm:text-sm text-gray-900 leading-relaxed space-y-4 " +
      "[&_pre]:bg-slate-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_code]:font-INB " +
      "[&_h1]:text-xl [&_h1]:text-slate-900 [&_h1]:font-INB [&_h1]:mt-6 [&_h1]:mb-3 " +
      "[&_h2]:text-lg [&_h2]:font-INB [&_h2]:mt-6 [&_h2]:mb-3 " +
      "[&_h3]:font-INB [&_h4]:font-INB [&_b]:font-INB [&_strong]:font-INB " +
      "[&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 " +
      "[&_table]:w-full [&_table]:border-collapse [&_table]:my-4 " +
      "[&_th]:border [&_th]:border-gray-300 [&_th]:bg-slate-100 [&_th]:p-2 [&_th]:text-left [&_th]:font-INB " +
      "[&_td]:border [&_td]:border-gray-300 [&_td]:p-2";

    if (snippetElements.length === 0) {
      return (
        <div
          className={`${baseProseClasses} mb-8 border-b border-gray-100 pb-8`}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      );
    }

    const defaultLangId =
      LANGUAGE_MAP[(techName || 'javascript').toLowerCase()] || 63;

    const blocks = [];
    let currentHtml = htmlString;
    

    snippetElements.forEach((snippetEl, index) => {
      const outerHtml = snippetEl.outerHTML;
      const splitIdx = currentHtml.indexOf(outerHtml);

      if (splitIdx !== -1) {
        const preHtml = currentHtml.substring(0, splitIdx);
        if (preHtml.trim()) {
          blocks.push(
            <div
              key={`html-${index}`}
              className={baseProseClasses}
              dangerouslySetInnerHTML={{ __html: preHtml }}
            />
          );
        }

        const labelEl = snippetEl.querySelector('.snippet-lang-label');
        const codeEl = snippetEl.querySelector('code');

        const label = labelEl ? labelEl.textContent : '';
        let codeText = codeEl ? codeEl.innerHTML : snippetEl.textContent;

        codeText = codeText
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();

        blocks.push(
          <CodeSnippetCompiler
            key={`snippet-${index}`}
            initialCode={codeText}
            label={label}
            defaultLangId={defaultLangId}
            techName={techName}
          />
        );

        currentHtml = currentHtml.substring(splitIdx + outerHtml.length);
      }
    });

    if (currentHtml.trim()) {
      blocks.push(
        <div
          key="html-tail"
          className={baseProseClasses}
          dangerouslySetInnerHTML={{ __html: currentHtml }}
        />
      );
    }

    return <div className="mb-8 border-b border-gray-100 pb-8">{blocks}</div>;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full min-h-0 overflow-hidden bg-white font-in">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white font-INB text-xs flex items-center justify-center shadow-xs">
            PI
          </div>
          <h2 className="font-INB text-black text-base tracking-tight">
            Course Outline
          </h2>
        </div>
        <button
          onClick={() => setIsMobileDrawerOpen(false)}
          className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg text-black hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="p-3 space-y-2 overflow-y-auto flex-1 overscroll-contain touch-pan-y"
        style={{ touchAction: 'pan-y' }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {isSidebarLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-800 text-xs gap-2 font-in">
            <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
            <span>Loading modules...</span>
          </div>
        ) : groupedSections.length === 0 ? (
          <div className="p-4 text-xs text-black text-center italic font-in">
            No modules available
          </div>
        ) : (
          groupedSections.map((section) => (
            <div key={section.id} className="rounded-xl">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-2.5 py-2.5 flex items-center justify-between text-sm font-INB text-black hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5 pr-2 truncate">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono shrink-0">
                    &lt;/&gt;
                  </span>
                  <span className="truncate">{section.title}</span>
                </div>
                {openSections[section.id] ? (
                  <ChevronUp className="w-4 h-4 text-black shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-black shrink-0" />
                )}
              </button>

              {openSections[section.id] && (
                <div className="mt-1 ml-4 pl-3 border-l border-gray-200 space-y-1 py-1">
                  {section.items.map((item) => {
                    const itemId = String(item.id || item.topicId);
                    const isActive = String(selectedTopicId) === itemId;
                    return (
                      <button
                        key={itemId}
                        onClick={() => handleSelectTopicItem(item)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center gap-2.5 relative ${
                          isActive
                            ? 'bg-blue-50/80 text-blue-700 font-INB shadow-2xs'
                            : 'text-gray-900 hover:text-black hover:bg-gray-50 font-in'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isActive ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-in flex flex-col justify-between select-none">
      <div>
        <THeader selectedTech={techId} />

        <div className="pt-24 sm:pt-28 max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:block w-[310px] bg-white rounded-2xl border border-gray-200/70 shadow-xs shrink-0 sticky top-28 h-[calc(100vh-140px)] overflow-hidden font-in">
              <SidebarContent />
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-6 lg:p-8 shadow-xs min-w-0 flex flex-col justify-between min-h-[500px]">
              {isSidebarLoading || isContentLoading ? (
                <div className="flex flex-col items-center justify-center my-auto py-24 text-slate-800 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  <span className="text-sm font-INB">
                    Fetching technology details...
                  </span>
                </div>
              ) : hasNoData ? (
                <div className="flex flex-col items-center justify-center my-auto py-16 px-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 border border-orange-100 shadow-xs">
                    <Layers className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-INB text-black mb-2">
                    No Content Available
                  </h2>
                  <p className="text-sm text-black max-w-md mb-6 leading-relaxed font-in">
                    This technology module doesn't have any tutorials or learning content created yet. Please select another technology to continue learning.
                  </p>
                </div>
              ) : activeTopicContent ? (
                <div>
                  {/* Breadcrumb Header */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <nav className="flex items-center text-xs text-black font-INB gap-1.5 truncate">
                      <Link
                        to="/Tutorials"
                        className="text-black hover:text-[#022f66] flex items-center gap-1 font-in shrink-0"
                      >
                        <Home className="w-3.5 h-3.5" /> Home
                      </Link>
                      <span className="text-black">&gt;</span>
                      <span className="capitalize font-INB truncate">
                        {activeTopicContent.technologyName || 'Tutorial'}
                      </span>
                      <span className="text-black">&gt;</span>
                      <span className="text-black font-in truncate">
                        {activeTopicContent.title}
                      </span>
                    </nav>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleTakeTest}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-INB transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Take a Test</span>
                      </button>

                      <button
                        onClick={() => setIsMobileDrawerOpen(true)}
                        className="lg:hidden flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-INB border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Topics</span>
                      </button>

                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-black transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-black transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-black transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title Banner */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-orange-500 py-2 text-white font-INB text-xs flex items-center justify-center shadow-xs shrink-0">
                      {(
                        activeTopicContent.technologyName || 'java'
                      )
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      {activeTopicContent.topicName && (
                        <span className="text-xs font-INB text-orange-600 tracking-wide uppercase">
                          {activeTopicContent.topicName}
                        </span>
                      )}
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-INB text-black tracking-tight">
                        {activeTopicContent.title}
                      </h1>
                    </div>
                  </div>

                  {/* Dynamic HTML & Inline Compilers */}
                  {renderParsedContent(
                    activeTopicContent.content,
                    activeTopicContent.technologyName
                  )}

                  {/* Topic Diagrams */}
                  {activeTopicContent.images &&
                    activeTopicContent.images.length > 0 && (
                      <div className="my-8 space-y-4">
                        <h3 className="text-xs font-INB uppercase tracking-wider text-black flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-orange-500" /> Topic
                          Diagrams & Visuals
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeTopicContent.images
                            .sort(
                              (a, b) =>
                                (a.imageSequence || 0) - (b.imageSequence || 0)
                            )
                            .map((img) => (
                              <div
                                key={img.id}
                                className="group relative rounded-xl overflow-hidden border border-gray-200/80 bg-slate-50/50 p-2 shadow-2xs hover:shadow-md transition-all"
                              >
                                <img
                                  src={img.imageUrl}
                                  alt={`Visual ${img.imageSequence || ''}`}
                                  className="w-full h-auto object-cover rounded-lg"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="p-8 text-center text-black text-sm my-auto font-in">
                  Select a topic from the sidebar.
                </div>
              )}

              {/* BOTTOM NAVIGATION (NEXT & PREVIOUS BUTTONS) */}
              {!hasNoData && activeTopicContent && (
                <div className="pt-6 mt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-in">
                  {prevTopic ? (
                    <button
                      onClick={() => selectTopic(prevTopic)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-black font-INB text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer group"
                    >
                      <ChevronLeft className="w-4 h-4 text-black group-hover:text-black transition-colors" />
                      <div className="text-left truncate max-w-[200px]">
                        <span className="block text-[10px] uppercase tracking-wider text-black font-INB">
                          Previous
                        </span>
                        <span className="truncate block font-in">
                          {prevTopic.title}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {nextTopic && (
                    <button
                      onClick={() => selectTopic(nextTopic)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer group ml-auto"
                    >
                      <div className="text-right truncate max-w-[200px]">
                        <span className="block text-[10px] uppercase tracking-wider text-orange-200 font-INB">
                          Next Topic
                        </span>
                        <span className="truncate block font-in">
                          {nextTopic.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-orange-200 group-hover:text-white transition-colors" />
                    </button>
                  )}
                </div>
              )}

              <div className="pt-4 text-xs text-black flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto font-in">
                <span className="font-INB">
                  Need help? Explore our interactive exercises.
                </span>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileDrawerOpen && (
        <div
          onClick={() => setIsMobileDrawerOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden transition-opacity"
        />
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl lg:hidden transform transition-transform duration-300 ease-out h-[75vh] flex flex-col overflow-hidden font-in ${
          isMobileDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div
          className="w-full flex justify-center pt-3 pb-1 cursor-pointer shrink-0"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <SidebarContent />
        </div>
      </div>

      {/* MOBILE TRIGGER BUTTON */}
      {!hasNoData && (
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#022f66] text-white p-3.5 rounded-full shadow-lg hover:bg-blue-900 active:scale-95 transition-all flex items-center justify-center gap-2 font-INB text-xs"
          aria-label="Open Topics Menu"
        >
          <Menu className="w-5 h-5" />
          <span className="pr-1">Topics</span>
        </button>
      )}

      <Tfooter />
    </div>
  );
}