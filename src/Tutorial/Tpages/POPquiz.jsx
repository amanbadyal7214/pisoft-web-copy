import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  lazy,
  Suspense
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import {
  Code2,
  Clock,
  Award,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  AlertCircle,
  Loader2,
  ShieldAlert,
  FileText,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  CopyX,
  XCircle,
  RotateCcw,
  BookOpen,
  Zap,
  Lock,
  Layers,
  ArrowRight,
  Terminal,
  CalendarCheck
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import { NavbarDemo } from '../../components/navbar/Navbar2'
import { Example } from '../../components/Corn'
import Footer from '../../components/Footer'
import ScrollToHashElement from '../../components/ScrollToHash'
import SocialLinks from '../../components/SocialLinks'
import AuthFloatingButtons from '../../components/AuthFloatingButtons'
const ScrollButtons = lazy(() => import('../../components/TopBottomButtons'))
import TSlot from '../TComponents/TSlot'
import { Tutorial_Base } from '../../../baseURL'

const TOTAL_DURATION_SECONDS = 20 * 60 // 20 Minutes

// Holds the initial duration for the currently-running test (seconds).
// This allows dynamic durations per test fetched from the backend.
const initialDurationRef = { current: TOTAL_DURATION_SECONDS }

// Judge0 Compiler Configuration
const JUDGE0_BASE_URL = 'https://compiler.comsdesk.com'
const JUDGE0_AUTH_TOKEN = 'MeraSecretApiToken789!'

const LANGUAGE_MAP = {
  javascript: 63,
  js: 63,
  python: 71,
  python3: 71,
  java: 62,
  cpp: 54,
  'c++': 54,
  c: 50,
  csharp: 51,
  'c#': 51,
  go: 60,
  php: 68,
  ruby: 72,
  typescript: 74,
  ts: 74
}

const toBase64 = str => {
  if (typeof str !== 'string') str = String(str || '')
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode('0x' + p1)
      )
    )
  } catch (err) {
    return ''
  }
}

const fromBase64 = str => {
  if (!str) return ''
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  } catch {
    try {
      return atob(str)
    } catch {
      return str
    }
  }
}
const cleanQuestionText = (text = '') => {
  if (text === null || text === undefined) return ''

  return (
    String(text)
      // Convert line breaks
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\t/g, ' ')

      // Remove markdown bold markers
      .replace(/\*\*/g, '')

      // Decode common HTML entities
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")

      // Remove HTML tags such as <p>, </p>, <br>, <strong>, etc.
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
      .replace(/<[^>]*>/g, '')

      // Clean excessive blank lines
      .replace(/\n\s*\n\s*\n+/g, '\n\n')

      .trim()
  )
}
// Integrated Interactive Compiler Runner for CODING Questions
function QuizCodingRunner ({
  questionId,
  initialCode,
  starterCode,
  languageName,
  onCodeChange
}) {
  const [code, setCode] = useState(initialCode || starterCode || '')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('')
  const [executionTime, setExecutionTime] = useState(null)
  const pollTimerRef = useRef(null)

  useEffect(() => {
    setCode(initialCode || starterCode || '')
    setOutput(null)
    setError(null)
    setStatus('')
  }, [questionId, initialCode, starterCode])

  const clearPollTimer = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }

  useEffect(() => {
    return () => clearPollTimer()
  }, [])

  const handleTextChange = e => {
    const val = e.target.value
    setCode(val)
    if (onCodeChange) onCodeChange(val)
  }

  const handleReset = () => {
    const defaultVal = initialCode || starterCode || ' // write your code here'
    setCode(defaultVal)
    if (onCodeChange) onCodeChange(defaultVal)
    setOutput(null)
    setError(null)
    setStatus('')
  }

  const pollForResult = async token => {
    let attempts = 0
    const maxAttempts = 25
    clearPollTimer()

    pollTimerRef.current = setInterval(async () => {
      attempts += 1
      try {
        const response = await fetch(
          `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=true`,
          {
            headers: { 'X-Auth-Token': JUDGE0_AUTH_TOKEN }
          }
        )

        if (!response.ok) throw new Error('Failed to fetch execution status')

        const data = await response.json()
        const statusId = data.status?.id

        if (statusId !== 1 && statusId !== 2) {
          clearPollTimer()
          setIsRunning(false)
          setStatus(data.status?.description || 'Finished')
          setExecutionTime(data.time ? `${data.time}s` : null)

          const stdout = fromBase64(data.stdout)
          const stderr = fromBase64(data.stderr)
          const compileOutput = fromBase64(data.compile_output)

          const finalOutput = (stdout || stderr || compileOutput || '').trim()

          if (stderr || compileOutput || statusId >= 6) {
            setError(
              stderr ||
                compileOutput ||
                `Execution failed with status: ${data.status?.description}`
            )
            setOutput(stdout || null)
          } else {
            setOutput(stdout || 'Program executed successfully with no output.')
            setError(null)
          }

          // Pass compilation output to be stored as the submitted answer
          if (onCodeChange) {
            onCodeChange(code, finalOutput || stdout || code)
          }
        }

        if (attempts >= maxAttempts) {
          clearPollTimer()
          setIsRunning(false)
          setError('Execution timed out while waiting for server.')
        }
      } catch (err) {
        clearPollTimer()
        setIsRunning(false)
        setError(`Compiler error: ${err.message}`)
      }
    }, 1000)
  }

  const handleRunCode = async () => {
    if (!code.trim() || isRunning) return

    setIsRunning(true)
    setOutput(null)
    setError(null)
    setStatus('Submitting...')

    const normalizedLangKey = (languageName || 'java').toLowerCase().trim()
    const langId = LANGUAGE_MAP[normalizedLangKey] || 62

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
            language_id: langId
          })
        }
      )

      if (!response.ok) throw new Error('Failed to submit code for execution')

      const data = await response.json()
      if (data.token) {
        setStatus('Running...')
        pollForResult(data.token)
      } else {
        throw new Error('No execution token returned')
      }
    } catch (err) {
      setIsRunning(false)
      setError(`Failed to run code: ${err.message}`)
    }
  }

  // const cleanQuestionText = (text = '') => {
  //   return (
  //     text
  //       // Remove Windows line breaks
  //       .replace(/\r\n/g, '\n')
  //       .replace(/\r/g, '\n')

  //       // Convert tabs into spaces
  //       .replace(/\t/g, ' ')

  //       // Remove markdown bold markers
  //       .replace(/\*\*/g, '')

  //       // Decode common HTML entities
  //       .replace(/&nbsp;/g, ' ')

  //       // Remove excessive blank lines
  //       .replace(/\n\s*\n\s*\n/g, '\n\n')

  //       .trim()
  //   )
  // }

  return (
    <div className='mb-4 space-y-3 font-sans select-text'>
      <div className='flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-100/80 px-3 py-2 rounded-lg border border-slate-200'>
        <div className='flex items-center gap-2'>
          <Code2 className='w-4 h-4 text-orange-500' />
          <span>
            Language:{' '}
            <strong className='text-slate-900 capitalize'>
              {languageName || 'Java'}
            </strong>
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={handleReset}
            className='px-2.5 py-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-600 text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1'
          >
            <RotateCcw className='w-3 h-3' />
            Reset
          </button>

          <button
            type='button'
            onClick={handleRunCode}
            disabled={isRunning}
            className='px-3.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-2xs'
          >
            {isRunning ? (
              <>
                <Loader2 className='w-3.5 h-3.5 animate-spin' />
                {status || 'Running...'}
              </>
            ) : (
              <>
                <PlayCircle className='w-3.5 h-3.5' />
                Run & Test Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Starter Code Reference (only shown if provided) */}
      {/* {starterCode && starterCode.trim() !== '' && (
        <div className='relative bg-[#1e232a] rounded-lg border border-slate-700 px-4 py-3 font-mono text-xs text-slate-300 overflow-x-auto'>
          <div className='flex items-center justify-between gap-2 mb-2 text-slate-500 text-[10px] border-b border-slate-700/60 pb-1.5'>
            <span className='flex items-center gap-1 font-semibold text-slate-400'>
              <Code2 className='w-3 h-3 text-orange-400' />
              Starter Code / Reference
            </span>
            <span className='bg-slate-700/80 px-1.5 py-0.5 rounded text-slate-400 text-[10px]'>Read-only</span>
          </div>
          <pre className='leading-relaxed whitespace-pre-wrap select-none text-slate-200 text-xs'>
            {starterCode}
          </pre>
        </div>
      )} */}

      {/* Code Editor Box */}
      <div className='relative rounded-xl border border-slate-700 overflow-hidden bg-[#1e232a] shadow-inner'>
        <div className='flex items-center justify-between px-3 py-1.5 bg-[#282c34] border-b border-slate-700 text-[10px] text-slate-400 font-mono'>
          <span className='flex items-center gap-1.5'>
            <span className='w-2.5 h-2.5 rounded-full bg-red-500/70' />
            <span className='w-2.5 h-2.5 rounded-full bg-yellow-500/70' />
            <span className='w-2.5 h-2.5 rounded-full bg-green-500/70' />
            <span className='ml-2 text-slate-300 font-semibold'>
              Source Code Editor
            </span>
          </span>
          {code.trim() ? (
            <span className='text-emerald-400 font-semibold flex items-center gap-1'>
              <Check className='w-3 h-3' /> Code Saved
            </span>
          ) : (
            <span className='text-slate-400'>Write solution</span>
          )}
        </div>

        <textarea
          style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
          onCopy={e => e.stopPropagation()}
          onCut={e => e.stopPropagation()}
          onPaste={e => e.stopPropagation()}
          onContextMenu={e => e.stopPropagation()}
          value={code}
          onChange={handleTextChange}
          placeholder='// Write your code solution here...\n'
          rows={12}
          spellCheck={false}
          className='w-full p-4 bg-[#1e232a] font-mono text-xs sm:text-sm text-slate-100 leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-orange-500/50 placeholder-slate-600'
        />
      </div>

      {/* Output Console Window */}
      {(output || error || isRunning) && (
        <div className='bg-[#181b20] border border-slate-800 rounded-xl p-3.5 font-mono text-xs space-y-2 text-slate-200 select-text'>
          <div className='flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5'>
            <span className='flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]'>
              <Terminal className='w-3.5 h-3.5 text-orange-400' />
              Execution Output
            </span>
            {executionTime && (
              <span className='text-slate-400 text-[10px]'>
                Time: {executionTime}
              </span>
            )}
          </div>

          {isRunning && (
            <div className='flex items-center gap-2 text-amber-400 py-1'>
              <Loader2 className='w-3.5 h-3.5 animate-spin' />
              <span>{status || 'Compiling & executing code...'}</span>
            </div>
          )}

          {error && (
            <div className='p-2.5 bg-red-950/60 border border-red-800/80 rounded-lg text-red-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed'>
              <strong className='block text-red-400 mb-1'>
                Error / Stderr:
              </strong>
              {error}
            </div>
          )}

          {output && (
            <div className='p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg text-emerald-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed'>
              <strong className='block text-slate-400 mb-1 text-[10px] uppercase'>
                Stdout:
              </strong>
              {output}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


export default function POPquiz ({
  userId: propsUserId,
  technologyId: propsTechId
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const HandleHomeClick = () => {
    navigate('/')
  }

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch (e) {
      return null
    }
  })

  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const userId =
    propsUserId ||
    location.state?.userId ||
    searchParams.get('userId') ||
    localStorage.getItem('pop_user_id') ||
    user?.userId ||
    user?.id ||
    null

  const technologyId =
    propsTechId ||
    location.state?.technologyId ||
    location.state?.techId ||
    searchParams.get('technologyId') ||
    localStorage.getItem('pop_tech_id') ||
    null

  // Flow State: 'INSTRUCTIONS' | 'TEST'
  const [testStage, setTestStage] = useState('INSTRUCTIONS')

  // Test Data States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [testId, setTestId] = useState(null)
  const [questions, setQuestions] = useState([])

  // User Interactive States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [reviewMarks, setReviewMarks] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [resultData, setResultData] = useState(null)
  const [codingAnswers, setCodingAnswers] = useState({})

  // Slot Booking modal state
  const [showSlotBooking, setShowSlotBooking] = useState(false)

  // Proctoring / Anti-Cheat States
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const [showWarningModal, setShowWarningModal] = useState(false)

  // Timer Management
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION_SECONDS)
  const startTimeRef = useRef(null)
  const [instructionDurationSeconds, setInstructionDurationSeconds] = useState(
    TOTAL_DURATION_SECONDS
  )
  const [instructionQuestionCount, setInstructionQuestionCount] = useState(null)
  const [prefetchLoading, setPrefetchLoading] = useState(false)
  const [prefetchedQuestions, setPrefetchedQuestions] = useState([])
  const [prefetchedTestId, setPrefetchedTestId] = useState(null)
  const [prefetchAttempted, setPrefetchAttempted] = useState(false)
  const [showPreviewErrorModal, setShowPreviewErrorModal] = useState(false)
  const [noTestAvailable, setNoTestAvailable] = useState(false)

  // Storage key for persistence across refresh/close
  const STORAGE_KEY =
    userId && technologyId ? `test_session_${userId}_${technologyId}` : null

  const clearAssessmentStorage = useCallback(() => {
    try {
      if (STORAGE_KEY) {
        localStorage.removeItem(STORAGE_KEY)
      }

      localStorage.removeItem('pop_user_id')
      localStorage.removeItem('pop_tech_id')
    } catch (err) {
      console.error('Failed to clear assessment localStorage:', err)
    }
  }, [STORAGE_KEY])

  // Toast Alert State
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'warning') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev))
    }, 4500)
  }, [])

  useEffect(() => {
    if (!STORAGE_KEY) return

    const savedSessionRaw = localStorage.getItem(STORAGE_KEY)
    if (savedSessionRaw) {
      try {
        const session = JSON.parse(savedSessionRaw)
        const now = Date.now()
        const elapsedSeconds = Math.floor((now - session.startTime) / 1000)
        const calculatedTimeLeft =
          (session.initialTimeLeft || TOTAL_DURATION_SECONDS) - elapsedSeconds

        if (
          calculatedTimeLeft > 0 &&
          !session.isCompleted &&
          session.questions?.length > 0
        ) {
          setTestId(session.testId)
          setQuestions(session.questions || [])
          setUserAnswers(session.userAnswers || {})
          setReviewMarks(session.reviewMarks || {})
          setCodingAnswers(session.codingAnswers || {})
          setTimeLeft(calculatedTimeLeft)
          setTabSwitchCount(session.tabSwitchCount || 0)
          startTimeRef.current = session.startTime
          if (typeof session.currentQuestionIdx === 'number') {
            setCurrentQuestionIdx(session.currentQuestionIdx)
          }
          setTestStage('TEST')
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (err) {
        console.error('Failed to parse saved session:', err)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [STORAGE_KEY])

  useEffect(() => {
    if (testStage !== 'INSTRUCTIONS') return
    if (!userId || !technologyId) return
    if (prefetchLoading) return
    if (prefetchAttempted) return

    const loadPreview = async () => {
      try {
        setPrefetchLoading(true)
        setError(null)

        const response = await fetch(
          `${Tutorial_Base}/placementProgram/start`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: Number(userId),
              technologyId: Number(technologyId)
            })
          }
        )

        if (!response.ok) {
          if (response.status === 403) {
            clearAssessmentStorage()

            setNoTestAvailable(true)
            setShowPreviewErrorModal(true)

            setError(
              'Thank you for your response. We will contact you soon. There is no test present for this technology.'
            )

            return
          }

          throw new Error(
            `Failed to load assessment preview (HTTP ${response.status}).`
          )
        }

        const data = await response.json()
        const fetchedQuestions =
          data.questions ||
          data.data?.questions ||
          (Array.isArray(data) ? data : [])
        const resolvedTestId =
          data.testId || data.data?.testId || data.id || technologyId
        const durationSeconds =
          (Number(data.durationInMinutes) || TOTAL_DURATION_SECONDS / 60) * 60

        if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {
          throw new Error(
            'No questions were found for the placement program preview.'
          )
        }

        setInstructionDurationSeconds(durationSeconds)
        setInstructionQuestionCount(fetchedQuestions.length)
        setPrefetchedQuestions(fetchedQuestions)
        setPrefetchedTestId(resolvedTestId)
      } catch (err) {
        console.error('Placement Program preview error:', err)
        setError(err.message || 'Unable to load assessment preview.')
        setShowPreviewErrorModal(true)
      } finally {
        setPrefetchAttempted(true)
        setPrefetchLoading(false)
      }
    }

    loadPreview()
  }, [
    testStage,
    userId,
    technologyId,
    prefetchLoading,
    prefetchAttempted,
    clearAssessmentStorage
  ])

  useEffect(() => {
    if (!noTestAvailable || !showPreviewErrorModal) return

    const timer = setTimeout(() => {
      clearAssessmentStorage()
      setShowPreviewErrorModal(false)
      navigate('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [noTestAvailable, showPreviewErrorModal, clearAssessmentStorage, navigate])

  useEffect(() => {
    setPrefetchAttempted(false)
    setShowPreviewErrorModal(false)
  }, [technologyId])

  const handleStartTest = async () => {
    if (noTestAvailable) {
      clearAssessmentStorage()
      navigate('/')
      return
    }

    if (!userId || !technologyId) {
      setError('Missing user or technology identification. Cannot start test.')
      return
    }

    let fetchedQuestions = prefetchedQuestions
    let resolvedTestId = prefetchedTestId
    let durationSeconds = instructionDurationSeconds
    const now = Date.now()
    const needsFetch =
      !Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0

    try {
      setLoading(true)
      setError(null)

      if (needsFetch) {
        const qResponse = await fetch(
          `${Tutorial_Base}/placementProgram/start`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: Number(userId),
              technologyId: Number(technologyId)
            })
          }
        )

        if (!qResponse.ok) {
          throw new Error(
            `Failed to start test session (HTTP ${qResponse.status}).`
          )
        }

        const qData = await qResponse.json()
        fetchedQuestions =
          qData.questions ||
          qData.data?.questions ||
          (Array.isArray(qData) ? qData : [])
        resolvedTestId =
          qData.testId || qData.data?.testId || qData.id || technologyId
        durationSeconds =
          (Number(qData.durationInMinutes) || TOTAL_DURATION_SECONDS / 60) * 60

        if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {
          clearAssessmentStorage()

          setNoTestAvailable(true)
          setShowPreviewErrorModal(true)

          setError(
            'Thank you for your response. We will contact you soon. There is no test present for this technology.'
          )

          return
        }

        setInstructionDurationSeconds(durationSeconds)
        setInstructionQuestionCount(fetchedQuestions.length)
        setPrefetchedQuestions(fetchedQuestions)
        setPrefetchedTestId(resolvedTestId)
      }

      setTestId(resolvedTestId)
      setQuestions(fetchedQuestions)
      setTimeLeft(durationSeconds)
      initialDurationRef.current = durationSeconds
      startTimeRef.current = now
      setTabSwitchCount(0)
      setUserAnswers({})
      setReviewMarks({})
      setCodingAnswers({})
      setCurrentQuestionIdx(0)

      if (STORAGE_KEY) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            testId: resolvedTestId,
            questions: fetchedQuestions,
            userAnswers: {},
            reviewMarks: {},
            codingAnswers: {},
            currentQuestionIdx: 0,
            startTime: now,
            initialTimeLeft: durationSeconds,
            tabSwitchCount: 0
          })
        )
      }

      setTestStage('TEST')
    } catch (err) {
      setError(err.message || 'Error initializing the test. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitTest = useCallback(
    async (autoSubmitted = false) => {
      if (isSubmitting || isCompleted) return
      setIsSubmitting(true)

      const timeTakenSeconds =
        (initialDurationRef.current || TOTAL_DURATION_SECONDS) - timeLeft

      const formattedAnswers = [
        ...Object.entries(userAnswers).map(([qId, submittedAnsKey]) => ({
          questionId: Number(qId),
          submittedAnswer: String(submittedAnsKey)
        })),
        ...Object.entries(codingAnswers).map(([qId, code]) => ({
          questionId: Number(qId),
          submittedAnswer: String(code)
        }))
      ]

      const payload = {
        userId: Number(userId),
        testId: Number(testId || 465374),
        timeTakenSeconds: Math.max(0, timeTakenSeconds),
        answers: formattedAnswers
      }

      try {
        const response = await fetch(
          `${Tutorial_Base}/placementProgram/submitTestPlacementProgram`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }
        )

        if (!response.ok) {
          throw new Error('Failed to submit test response.')
        }

        const data = await response.json()
        setResultData(data)
        clearAssessmentStorage()
        setIsCompleted(true)

        if (autoSubmitted) {
          showToast(
            'Test auto-submitted due to tab switching or time expiration.',
            'warning'
          )
        }
      } catch (err) {
        console.error('Submission Error:', err)
        alert('There was an issue submitting your test. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      userId,
      testId,
      timeLeft,
      userAnswers,
      codingAnswers,
      isSubmitting,
      isCompleted,
      STORAGE_KEY,
      clearAssessmentStorage,
      showToast
    ]
  )

  useEffect(() => {
    if (testStage === 'TEST' && testId && questions.length > 0 && STORAGE_KEY) {
      const savedSessionRaw = localStorage.getItem(STORAGE_KEY)
      if (savedSessionRaw) {
        try {
          const session = JSON.parse(savedSessionRaw)
          session.userAnswers = userAnswers
          session.reviewMarks = reviewMarks
          session.codingAnswers = codingAnswers
          session.tabSwitchCount = tabSwitchCount
          session.currentQuestionIdx = currentQuestionIdx
          localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
        } catch (e) {
          console.error('Error updating localStorage:', e)
        }
      }
    }
  }, [
    userAnswers,
    reviewMarks,
    codingAnswers,
    tabSwitchCount,
    currentQuestionIdx,
    testStage,
    testId,
    questions,
    STORAGE_KEY
  ])

  useEffect(() => {
    if (testStage !== 'TEST' || isCompleted) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStage, isCompleted, handleSubmitTest])

  useEffect(() => {
    if (testStage !== 'TEST' || isCompleted) return

    // Prevent copy, cut, paste, context menu, text selection
    const preventAction = e => {
      e.preventDefault()
      return false
    }

    const preventKeyShortcuts = e => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'x', 'a', 'u', 's'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault()
      }
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i')
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener('copy', preventAction)
    document.addEventListener('cut', preventAction)
    document.addEventListener('paste', preventAction)
    document.addEventListener('contextmenu', preventAction)
    document.addEventListener('selectstart', preventAction)
    document.addEventListener('dragstart', preventAction)
    document.addEventListener('keydown', preventKeyShortcuts)

    // Tab Switch / Visibility Change Handler
    const handleVisibilityChange = () => {
      if (document.hidden && !isCompleted) {
        setTabSwitchCount(prev => {
          const updatedCount = prev + 1
          if (updatedCount === 1) {
            setShowWarningModal(true)
          } else if (updatedCount >= 2) {
            handleSubmitTest(true)
          }
          return updatedCount
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('copy', preventAction)
      document.removeEventListener('cut', preventAction)
      document.removeEventListener('paste', preventAction)
      document.removeEventListener('contextmenu', preventAction)
      document.removeEventListener('selectstart', preventAction)
      document.removeEventListener('dragstart', preventAction)
      document.removeEventListener('keydown', preventKeyShortcuts)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [testStage, isCompleted, handleSubmitTest])

  // Formatting timer
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`

  const activeQuestion = questions[currentQuestionIdx]
  const answeredCount =
    Object.keys(userAnswers).length + Object.keys(codingAnswers).length
  const questionCount = questions.length
  const progressPercent =
    questionCount > 0 ? Math.round((answeredCount / questionCount) * 100) : 0

  const handleOptionSelect = (qId, optionKey) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionKey }))
  }

  const handleCodingAnswer = (qId, codeVal, compiledOutput) => {
    const answerToSubmit =
      compiledOutput !== undefined &&
      compiledOutput !== null &&
      String(compiledOutput).trim() !== ''
        ? String(compiledOutput).trim()
        : String(codeVal || '').trim()

    setCodingAnswers(prev => ({ ...prev, [qId]: answerToSubmit }))
  }

  const toggleBookmark = index => {
    setReviewMarks(prev => ({ ...prev, [index]: !prev[index] }))
  }

  if (isCompleted) {
    return (
      <>
        <ScrollToHashElement />
        <SocialLinks className='hidden lg:block' />

        {/* Background Effects */}
        <div className='hidden md:fixed inset-0 pointer-events-none overflow-hidden z-0'>
          <div className='absolute w-[800px] h-[800px] bg-blue-600/5 -top-40 -right-40 blur-[120px] rounded-full' />
          <div className='absolute w-[600px] h-[600px] bg-orange-500/5 bottom-0 left-0 blur-[120px] rounded-full' />
        </div>

        {/* Header Navigation */}
        <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
          <AnimatePresence>
            {showAuthButtons && (
              <motion.div
                initial={{ opacity: 1, y: 40, x: -50 }}
                exit={{ opacity: 0, y: -50, x: -50 }}
              >
                <Suspense fallback={null}>
                  <AuthFloatingButtons />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='flex items-center justify-end lg:justify-end xl:justify-center px-2 py-1'>
            <Navbar className='hidden lg:block' />
            <NavbarDemo />
          </div>
        </div>

        <div className='fixed left-1 -top-2 z-[60] lg:hidden'>
          <Navbar />
        </div>
        <div className='fixed top-4 right-4 z-[60] lg:hidden'>
          <Example />
        </div>

        {showAuthButtons && (
          <div className='block lg:hidden'>
            <Suspense fallback={null}>
              <AuthFloatingButtons />
            </Suspense>
          </div>
        )}

        <Suspense fallback={null}>
          <ScrollButtons />
        </Suspense>
        {/* Toast overlay for results screen */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.message}
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              className={`fixed top-20 left-1/2 z-[200] -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold min-w-[280px] max-w-sm border ${
                toast.type === 'info'
                  ? 'bg-blue-600 text-white border-blue-700'
                  : toast.type === 'success'
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-amber-500 text-white border-amber-600'
              }`}
            >
              <span className='shrink-0 text-lg'>
                {toast.type === 'info'
                  ? '🔒'
                  : toast.type === 'success'
                  ? '✅'
                  : '⚠️'}
              </span>
              <span className='leading-snug'>{toast.message}</span>
              <button
                onClick={() => setToast(null)}
                className='ml-auto opacity-70 hover:opacity-100 text-white font-bold text-base leading-none'
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='min-h-[100vh] flex flex-col items-center justify-center p-4 sm:p-20 select-none font-sans pt-24'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6'
          >
            <div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md bg-emerald-100 text-emerald-600'>
              <CheckCircle2 className='w-10 h-10' />
            </div>

            <div>
              <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2'>
                We will contact you in short time!
              </h2>
              <p className='text-sm text-slate-500 max-w-md mx-auto mt-3 leading-relaxed'>
                Your test has been submitted successfully. Our team will review
                your responses and reach out to you shortly.
              </p>

              <button
                className='mt-4 bg-blue-900 text-white py-2 px-4 hover:bg-blue-700 hover:scale-103 transform transition-all ease-in-out rounded-full'
                onClick={HandleHomeClick}
              >
                Go to Home
              </button>
            </div>
          </motion.div>
        </div>

        {/* Slot Booking Modal */}
        <AnimatePresence>
          {showSlotBooking && (
            <div className='fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4'>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className='bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200/80 overflow-y-auto max-h-[90vh] relative'
              >
                <button
                  onClick={() => setShowSlotBooking(false)}
                  className='absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all cursor-pointer z-10'
                >
                  ✕
                </button>
                <TSlot
                  userId={userId}
                  technologyId={technologyId}
                  technologyName={location.state?.techName || ''}
                  onClose={() => {
                    setShowSlotBooking(false)
                    navigate(`/Tutorials/${technologyId}`)
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
      </>
    )
  }

  if (testStage === 'INSTRUCTIONS') {
    return (
      <>
        <ScrollToHashElement />
        <SocialLinks className='hidden lg:block' />

        {/* Background Effects */}
        <div className='hidden md:fixed inset-0 pointer-events-none overflow-hidden z-0'>
          <div className='absolute w-[800px] h-[800px] bg-blue-600/5 -top-40 -right-40 blur-[120px] rounded-full' />
          <div className='absolute w-[600px] h-[600px] bg-orange-500/5 bottom-0 left-0 blur-[120px] rounded-full' />
        </div>

        {/* Header Navigation */}
        <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
          <AnimatePresence>
            {showAuthButtons && (
              <motion.div
                initial={{ opacity: 1, y: 40, x: -50 }}
                exit={{ opacity: 0, y: -50, x: -50 }}
              >
                <Suspense fallback={null}>
                  <AuthFloatingButtons />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='flex items-center justify-end lg:justify-end xl:justify-center px-2 py-1'>
            <Navbar className='hidden lg:block' />
            <NavbarDemo />
          </div>
        </div>

        <div className='fixed left-1 -top-2 z-[60] lg:hidden'>
          <Navbar />
        </div>
        <div className='fixed top-4 right-4 z-[60] lg:hidden'>
          <Example />
        </div>

        {showAuthButtons && (
          <div className='block lg:hidden'>
            <Suspense fallback={null}>
              <AuthFloatingButtons />
            </Suspense>
          </div>
        )}

        <Suspense fallback={null}>
          <ScrollButtons />
        </Suspense>
        <div className='min-h-screen bg-[#FAF9F6] py-10 md:py-25 px-4 flex flex-col items-center justify-start select-none font-sans pt-24'>
          <div className='max-w-3xl w-full bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 md:15 shadow-sm space-y-6 my-6'>
            {/* Header */}
            <div className='border-b border-slate-100 pb-5 flex items-center justify-between'>
              <div>
                <span className='px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 font-semibold text-xs border border-orange-200/60 inline-block mb-2'>
                  Placement Program
                </span>
                <h1 className='text-xl sm:text-2xl font-bold text-slate-900'>
                  Technical Assessment Guidelines
                </h1>
              </div>
              <FileText className='w-10 h-10 text-orange-500/20 hidden sm:block' />
            </div>

            {/* Assessment Quick Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 text-xs'>
              <div className='space-y-1'>
                <span className='text-slate-400 font-medium text-[11px] uppercase tracking-wider block'>
                  Duration
                </span>
                <div className='font-semibold text-slate-800 flex items-center gap-1.5 text-sm'>
                  <Clock className='w-4 h-4 text-orange-500' />
                  {prefetchLoading
                    ? 'Loading...'
                    : `${Math.floor(instructionDurationSeconds / 60)} Minutes`}
                </div>
              </div>

              <div className='space-y-1'>
                <span className='text-slate-400 font-medium text-[11px] uppercase tracking-wider block'>
                  Questions
                </span>
                <div className='font-semibold text-slate-800 text-sm'>
                  {instructionQuestionCount != null
                    ? instructionQuestionCount
                    : prefetchLoading
                    ? 'Loading...'
                    : '—'}
                </div>
              </div>

              <div className='space-y-1'>
                <span className='text-slate-400 font-medium text-[11px] uppercase tracking-wider block'>
                  Proctoring
                </span>
                <div className='font-semibold text-slate-800 flex items-center gap-1.5 text-sm'>
                  <ShieldAlert className='w-4 h-4 text-orange-500' />
                  Strict Anti-Cheat
                </div>
              </div>

              <div className='space-y-1'>
                <span className='text-slate-400 font-medium text-[11px] uppercase tracking-wider block'>
                  Format
                </span>
                <div className='font-semibold text-slate-800 flex items-center gap-1.5 text-sm'>
                  <Award className='w-4 h-4 text-orange-500' />
                  Multiple Choice / Coding
                </div>
              </div>
            </div>

            {/* Rules List */}
            <div className='space-y-3 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-4'>
              <h3 className='font-semibold text-slate-900 text-sm flex items-center gap-2'>
                <AlertCircle className='w-4 h-4 text-orange-500' />
                Proctoring Rules & Instructions:
              </h3>

              <ul className='space-y-2.5 pl-1'>
                <li className='flex items-start gap-2.5'>
                  <CopyX className='w-4 h-4 text-red-500 shrink-0 mt-0.5' />
                  <span>
                    <strong className='font-semibold text-slate-900'>
                      Copy-Paste Disabled:
                    </strong>{' '}
                    Copying, pasting, cutting, text selection, keyboard
                    shortcuts, and right-click context menu are completely
                    disabled.
                  </span>
                </li>

                <li className='flex items-start gap-2.5'>
                  <AlertTriangle className='w-4 h-4 text-amber-500 shrink-0 mt-0.5' />
                  <span>
                    <strong className='font-semibold text-slate-900'>
                      Tab Switch Enforcement:
                    </strong>{' '}
                    Navigating away from the test tab will trigger{' '}
                    <strong className='text-red-600 font-semibold'>
                      ONE warning
                    </strong>
                    . A second tab switch will immediately auto-submit your
                    test.
                  </span>
                </li>

                <li className='flex items-start gap-2.5'>
                  <CheckCircle2 className='w-4 h-4 text-emerald-500 shrink-0 mt-0.5' />
                  <span>
                    <strong className='font-semibold text-slate-900'>
                      Session Timer Recovery:
                    </strong>{' '}
                    If your tab is closed or restored, your{' '}
                    {Math.floor(instructionDurationSeconds / 60)}-minute timer
                    will seamlessly continue from where it was left and your
                    selected answers will be preserved.
                  </span>
                </li>
              </ul>
            </div>

            {error && (
              <div className='p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs flex items-center gap-2 font-semibold'>
                <AlertCircle className='w-4 h-4 shrink-0' />
                {error}
              </div>
            )}

            {/* CTA Button */}
            <div className='pt-4 border-t border-slate-100 flex items-center justify-end'>
              <button
                type='button'
                onClick={handleStartTest}
                disabled={loading || noTestAvailable}
                className='px-6 py-3 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500'
              >
                {loading ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Loading Questions...
                  </>
                ) : noTestAvailable ? (
                  <>
                    No Assessment Available
                    <Lock className='w-4 h-4' />
                  </>
                ) : (
                  <>
                    Begin Assessment
                    <PlayCircle className='w-4 h-4' />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Toast overlay for instructions screen */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.message}
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              className={`fixed top-20 left-1/2 z-[200] -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold min-w-[280px] max-w-sm border ${
                toast.type === 'info'
                  ? 'bg-blue-600 text-white border-blue-700'
                  : toast.type === 'success'
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-amber-500 text-white border-amber-600'
              }`}
            >
              <span className='shrink-0 text-lg'>
                {toast.type === 'info'
                  ? '🔒'
                  : toast.type === 'success'
                  ? '✅'
                  : '⚠️'}
              </span>
              <span className='leading-snug'>{toast.message}</span>
              <button
                onClick={() => setToast(null)}
                className='ml-auto opacity-70 hover:opacity-100 text-white font-bold text-base leading-none'
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Preview Error Modal */}
        <AnimatePresence>
          {showPreviewErrorModal && (
            <div className='fixed inset-0 z-[210] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4'>
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className='bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 text-center'
              >
                <div className='mx-auto mb-4 w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center'>
                  <AlertCircle className='w-6 h-6' />
                </div>
                <h3 className='text-lg font-bold text-slate-900'>
                  Thank you for your response
                </h3>
                <p className='mt-3 text-sm text-slate-600 leading-relaxed'>
                  We will contact you soon. There is no test present for this
                  technology.
                </p>
                <button
                  type='button'
                  onClick={() => {
                    clearAssessmentStorage()
                    setShowPreviewErrorModal(false)
                    navigate('/')
                  }}
                  className='mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition'
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Slot Booking Modal */}
        <AnimatePresence>
          {showSlotBooking && (
            <div className='fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4'>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className='bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200/80 overflow-y-auto max-h-[90vh] relative'
              >
                <button
                  onClick={() => setShowSlotBooking(false)}
                  className='absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all cursor-pointer z-10'
                >
                  ✕
                </button>
                <TSlot
                  userId={userId}
                  technologyId={technologyId}
                  technologyName={location.state?.techName || ''}
                  onClose={() => {
                    setShowSlotBooking(false)
                    navigate(`/Tutorials/${technologyId}`)
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
      </>
    )
  }

  // -------------------------------------------------------------
  // RENDER: ACTIVE ASSESSMENT INTERFACE
  // -------------------------------------------------------------
  return (
    <>
      <ScrollToHashElement />
      <SocialLinks className='hidden lg:block' />

      {/* Background Effects */}
      <div className='hidden md:fixed inset-0 pointer-events-none overflow-hidden z-0'>
        <div className='absolute w-[800px] h-[800px] bg-blue-600/5 -top-40 -right-40 blur-[120px] rounded-full' />
        <div className='absolute w-[600px] h-[600px] bg-orange-500/5 bottom-0 left-0 blur-[120px] rounded-full' />
      </div>

      {/* Header Navigation */}
      <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
        <AnimatePresence>
          {showAuthButtons && (
            <motion.div
              initial={{ opacity: 1, y: 40, x: -50 }}
              exit={{ opacity: 0, y: -50, x: -50 }}
            >
              <Suspense fallback={null}>
                <AuthFloatingButtons />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex items-center justify-end lg:justify-end xl:justify-center px-2 py-1'>
          <Navbar className='hidden lg:block' />
          <NavbarDemo />
        </div>
      </div>

      <div className='fixed left-1 -top-2 z-[60] lg:hidden'>
        <Navbar />
      </div>
      <div className='fixed top-4 right-4 z-[60] lg:hidden'>
        <Example />
      </div>

      {showAuthButtons && (
        <div className='block lg:hidden'>
          <Suspense fallback={null}>
            <AuthFloatingButtons />
          </Suspense>
        </div>
      )}

      <Suspense fallback={null}>
        <ScrollButtons />
      </Suspense>

      {/* WARNING MODAL FOR TAB SWITCH */}
      <AnimatePresence>
        {showWarningModal && (
          <div className='fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-red-200 text-center space-y-4 font-sans'
            >
              <div className='w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto'>
                <ShieldAlert className='w-6 h-6' />
              </div>
              <h3 className='text-lg font-bold text-slate-900'>
                Proctoring Warning!
              </h3>
              <p className='text-xs text-slate-600 leading-relaxed'>
                You navigated away from the test tab.{' '}
                <strong className='text-red-500 font-semibold'>
                  Switching tabs once more will automatically submit your test.
                </strong>
              </p>
              <button
                onClick={() => setShowWarningModal(false)}
                className='w-full py-2.5 bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md hover:bg-orange-600 transition-all cursor-pointer'
              >
                I Understand & Return to Test
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div
        className='min-h-screen w-full bg-[#FAF9F6] text-slate-800 font-sans p-3 sm:p-4 md:mt-14 lg:mt-0 lg:p-5 flex flex-col items-center justify-start relative select-none pt-24'
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* TOP BAR */}
        <header className='w-full max-w-7xl my-3 lg:mt-28 bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs'>
          <div className='flex items-center gap-3'>
            <h2 className='text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2'>
              Technical Assessment
              <span className='text-[10px] font-semibold bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md border border-orange-200/60'>
                Placement Program
              </span>
            </h2>
          </div>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => handleSubmitTest(false)}
              disabled={isSubmitting}
              className='px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer'
            >
              {isSubmitting ? (
                <Loader2 className='w-3 h-3 animate-spin' />
              ) : (
                <Send className='w-3 h-3' />
              )}
              Submit Test
            </button>
          </div>
        </header>

        {/* MAIN LAYOUT GRID */}
        <div className='w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 items-start'>
          {/* LEFT PANEL: Question & Choices */}
          <div className='lg:col-span-8 space-y-3'>
            {activeQuestion && (
              <motion.div
                key={
                  activeQuestion.id ||
                  activeQuestion.questionId ||
                  currentQuestionIdx
                }
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className='bg-white rounded-xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs relative'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <span className='px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-600 font-bold text-xs border border-orange-200/60'>
                      Q{currentQuestionIdx + 1} / {questionCount}
                    </span>
                    <span className='text-xs text-slate-400 hidden sm:inline-block'>
                      {activeQuestion.questionType || 'Single Choice'}
                    </span>
                  </div>

                  <button
                    type='button'
                    onClick={() => toggleBookmark(currentQuestionIdx)}
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      reviewMarks[currentQuestionIdx]
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        reviewMarks[currentQuestionIdx]
                          ? 'fill-amber-500 text-amber-500'
                          : ''
                      }`}
                    />
                    {reviewMarks[currentQuestionIdx]
                      ? 'Bookmarked'
                      : 'Review Later'}
                  </button>
                </div>

                <h3 className='text-sm sm:text-base font-bold text-slate-900 mb-4 leading-relaxed whitespace-pre-line'>
                  {cleanQuestionText(
                    activeQuestion.questionText || activeQuestion.question || ''
                  )}
                </h3>

                {/* Legacy codeSnippet (read-only display) */}
                {activeQuestion.codeSnippet && (
                  <div className='relative bg-[#1e232a] rounded-lg border border-slate-800 p-3 font-mono text-xs text-slate-100 mb-4 overflow-x-auto select-none'>
                    <div className='flex items-center justify-between pb-1.5 mb-2 border-b border-slate-700/60 text-slate-400 text-[10px]'>
                      <span className='flex items-center gap-1'>
                        <Code2 className='w-3 h-3 text-orange-400' />
                        Code Sample
                      </span>
                    </div>
                    <pre className='leading-tight font-mono select-none'>
                      {activeQuestion.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* CODING question type: integrated Judge0 compiler editor */}
                {activeQuestion.questionType === 'CODING' ? (
                  <QuizCodingRunner
                    questionId={activeQuestion.id || activeQuestion.questionId}
                    initialCode={
                      codingAnswers[
                        activeQuestion.id || activeQuestion.questionId
                      ]
                    }
                    starterCode={activeQuestion.codingMeta?.starterCode}
                    languageName={
                      activeQuestion.codingMeta?.language ||
                      activeQuestion.technologyName
                    }
                    onCodeChange={(code, output) =>
                      handleCodingAnswer(
                        activeQuestion.id || activeQuestion.questionId,
                        code,
                        output
                      )
                    }
                  />
                ) : (
                  /* MCQ / TRUE_FALSE options */
                  <div className='space-y-2.5 mb-4'>
                    {(activeQuestion.options || []).map((option, oIdx) => {
                      const displayKey = String.fromCharCode(65 + oIdx) // UI key A,B,C,D
                      const backendKey = option.key // submit this

                      const optionText = cleanQuestionText(
                        option.text || option.optionText || option
                      )

                      const currentQId =
                        activeQuestion.id || activeQuestion.questionId

                      const isSelected = userAnswers[currentQId] === backendKey

                      return (
                        <button
                          key={backendKey || displayKey}
                          type='button'
                          onClick={() =>
                            handleOptionSelect(currentQId, backendKey)
                          }
                          className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-orange-50/90 border-orange-500 text-slate-900 shadow-2xs font-semibold'
                              : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/60 text-slate-700'
                          }`}
                        >
                          <div className='flex items-center gap-3'>
                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                                isSelected
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {displayKey}
                            </div>
                            <span className='text-xs sm:text-sm text-slate-800 leading-snug'>
                              {optionText}
                            </span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                              isSelected
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && (
                              <div className='w-1.5 h-1.5 bg-white rounded-full' />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Navigation Prev / Next / Submit */}
                <div className='mt-6 pt-4 border-t border-slate-100 flex items-center justify-between'>
                  <button
                    type='button'
                    onClick={() =>
                      setCurrentQuestionIdx(prev => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestionIdx === 0}
                    className='px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer'
                  >
                    <ChevronLeft className='w-4 h-4' />
                    Prev
                  </button>

                  <button
                    type='button'
                    onClick={() => {
                      if (currentQuestionIdx < questionCount - 1) {
                        setCurrentQuestionIdx(prev => prev + 1)
                      } else {
                        handleSubmitTest(false)
                      }
                    }}
                    className='px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer'
                  >
                    {currentQuestionIdx < questionCount - 1 ? (
                      <>
                        Next
                        <ChevronRight className='w-4 h-4' />
                      </>
                    ) : (
                      <>
                        Submit Test
                        <Send className='w-4 h-4' />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className='lg:col-span-4 space-y-3'>
            {/* Timer Box */}
            <div className='bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-center justify-between'>
              <div>
                <div className='flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1'>
                  <Clock className='w-3.5 h-3.5 text-orange-500' />
                  Time Remaining
                </div>
                <div
                  className={`text-2xl font-extrabold ${
                    timeLeft <= 180
                      ? 'text-red-500 animate-pulse'
                      : 'text-slate-900'
                  }`}
                >
                  {formattedTime}
                </div>
              </div>

              <div className='relative w-12 h-12 flex items-center justify-center shrink-0'>
                <svg className='w-full h-full transform -rotate-90'>
                  <circle
                    cx='24'
                    cy='24'
                    r='19'
                    stroke='currentColor'
                    strokeWidth='4'
                    className='text-slate-100'
                    fill='transparent'
                  />
                  <circle
                    cx='24'
                    cy='24'
                    r='19'
                    stroke='currentColor'
                    strokeWidth='4'
                    className='text-orange-500 transition-all duration-300'
                    fill='transparent'
                    strokeDasharray={2 * Math.PI * 19}
                    strokeDashoffset={
                      2 * Math.PI * 19 * (1 - progressPercent / 100)
                    }
                    strokeLinecap='round'
                  />
                </svg>
                <span className='absolute text-[10px] font-extrabold text-slate-800'>
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Question Matrix */}
            <div className='bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3'>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2.5'>
                <h4 className='font-bold text-slate-900 text-xs'>
                  Question Palette
                </h4>
                <span className='text-[11px] text-slate-500'>
                  <strong className='text-slate-900 font-extrabold'>
                    {answeredCount}
                  </strong>
                  /{questionCount} Answered
                </span>
              </div>

              <div className='grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-500 border-b border-slate-100 pb-2.5'>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-md bg-emerald-500' />
                  Answered
                </div>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-md bg-orange-500' />
                  Current
                </div>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-md bg-amber-400' />
                  Bookmarked
                </div>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-md bg-slate-200' />
                  Unvisited
                </div>
              </div>

              <div className='grid grid-cols-5 gap-1.5'>
                {questions.map((q, index) => {
                  const qId = q.id || q.questionId
                  const isCurrent = currentQuestionIdx === index
                  const isAnswered =
                    userAnswers[qId] !== undefined ||
                    (codingAnswers[qId] !== undefined &&
                      String(codingAnswers[qId]).trim() !== '')
                  const isBookmarked = reviewMarks[index]

                  let style =
                    'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border-transparent'

                  if (isCurrent) {
                    style =
                      'bg-orange-500 text-white font-extrabold shadow-2xs border-orange-600'
                  } else if (isAnswered) {
                    style =
                      'bg-emerald-100 text-emerald-800 font-bold border-emerald-200'
                  } else if (isBookmarked) {
                    style =
                      'bg-amber-100 text-amber-800 font-bold border-amber-200'
                  }

                  return (
                    <button
                      key={qId || index}
                      type='button'
                      onClick={() => setCurrentQuestionIdx(index)}
                      className={`h-8 rounded-lg text-xs border transition-all flex items-center justify-center relative cursor-pointer ${style}`}
                    >
                      {index + 1}
                      {isBookmarked && !isCurrent && (
                        <span className='absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full' />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
