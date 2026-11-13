import React, { useState, Suspense, lazy, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  BookOpen,
  Code2,
  Bot,
  Target,
  Loader2,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Building2
} from 'lucide-react'

// Standard Component Imports
import Navbar from '../../components/Navbar'
import { NavbarDemo } from '../../components/navbar/Navbar2'
import { Example } from '../../components/Corn'
import Footer from '../../components/Footer'
import ScrollToHashElement from '../../components/ScrollToHash'
import SocialLinks from '../../components/SocialLinks'
import { Tutorial_Base } from '../../../baseURL'
import Select, { components } from 'react-select'

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 50,
    backgroundColor: '#e8f0fe',
    border: 'none',
    borderRadius: 12,
    boxShadow: state.isFocused ? '0 0 0 2px #ff6b00' : 'none',
    '&:hover': {
      border: 'none'
    },
    cursor: 'pointer'
  }),

  valueContainer: base => ({
    ...base,
    padding: '0 14px'
  }),

  placeholder: base => ({
    ...base,
    color: '#64748b',
    fontSize: 12
  }),

  singleValue: base => ({
    ...base,
    color: '#0f172a',
    fontSize: 12
  }),

  indicatorSeparator: () => ({
    display: 'none'
  }),

  dropdownIndicator: base => ({
    ...base,
    color: '#ff6b00'
  }),

  menuPortal: base => ({
  ...base,
  zIndex: 99999
}),

menu: base => ({
  ...base,
  zIndex: 99999
}),

  menuList: base => ({
    ...base,
    maxHeight: 220,
    overflowY: 'auto',
    paddingTop: 4,
    paddingBottom: 4
  }),

  option: (base, state) => ({
    ...base,
    fontSize: 12,
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? '#ff6b00'
      : state.isFocused
      ? '#fff4eb'
      : '#fff',
    color: state.isSelected ? '#fff' : '#0f172a',
    ':active': {
      backgroundColor: '#ff6b00'
    }
  })
}

// Lazy-loaded components
const AuthFloatingButtons = lazy(() =>
  import('../../components/AuthFloatingButtons')
)
const ScrollButtons = lazy(() => import('../../components/TopBottomButtons'))

// Robust MenuList: attaches non-passive wheel and touch listeners to the menu
// so scrolling inside the menu does not propagate to the window (works on mobile).
const MenuList = props => {
  const ref = useRef(null)
  const touchStartY = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onWheel = e => {
      const atTop = el.scrollTop === 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      const delta = e.deltaY

      if ((atTop && delta < 0) || (atBottom && delta > 0)) {
        e.preventDefault()
      }
      e.stopPropagation()
    }

    const onTouchStart = e => {
      touchStartY.current = e.touches ? e.touches[0].clientY : 0
    }

    const onTouchMove = e => {
      const currentY = e.touches ? e.touches[0].clientY : 0
      const delta = touchStartY.current - currentY
      const atTop = el.scrollTop === 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1

      if ((atTop && delta < 0) || (atBottom && delta > 0)) {
        e.preventDefault()
      }
      e.stopPropagation()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <components.MenuList {...props} innerRef={ref}>
      {props.children}
    </components.MenuList>
  )
}

// Helper utilities for managing cookies safely
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(
    typeof value === 'object' ? JSON.stringify(value) : value
  )}; expires=${expires}; path=/; SameSite=Lax`
}

export const getCookie = name => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export default function TAuth () {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/tutorials'

  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // University dropdown state
  const [universities, setUniversities] = useState([])
  const [fetchingUniversities, setFetchingUniversities] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    selectedUniversity: '',
    otherUniversity: ''
  })

  // Helper check if selected university is 'Others'
  const selectedUniObj = universities.find(
    u => String(u.id || u._id) === String(formData.selectedUniversity)
  )
  const isOthersSelected =
    selectedUniObj &&
    (selectedUniObj.name?.trim().toLowerCase() === 'others' ||
      selectedUniObj.name?.trim().toLowerCase() === 'other')

  // Fetch Universities list when registering
  useEffect(() => {
    const fetchUniversities = async () => {
      setFetchingUniversities(true)
      try {
        const response = await fetch(
          `${Tutorial_Base}/learner/getAllCollegeUniversities`
        )
        if (response.ok) {
          const data = await response.json()
          setUniversities(Array.isArray(data) ? data : data.universities || [])
        }
      } catch (error) {
        console.error('Failed to fetch universities:', error)
      } finally {
        setFetchingUniversities(false)
      }
    }

    if (activeTab === 'register') {
      fetchUniversities()
    }
  }, [activeTab])

  const handleInputChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (errorMessage) setErrorMessage('')
  }

  const handleTabSwitch = tab => {
    setActiveTab(tab)
    setErrorMessage('')
  }

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRegex = /^\d{10}$/

    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return false
    }

    if (activeTab === 'register') {
      if (!formData.fullName.trim()) {
        setErrorMessage('Please enter your full name.')
        return false
      }
      if (!mobileRegex.test(formData.mobile.trim())) {
        setErrorMessage('Mobile number must be exactly 10 digits.')
        return false
      }
      if (!formData.selectedUniversity) {
        setErrorMessage('Please select a university.')
        return false
      }
      if (isOthersSelected && !formData.otherUniversity.trim()) {
        setErrorMessage('Please enter your university name.')
        return false
      }
    }

    if (formData.password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.')
      return false
    }

    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const endpoint =
        activeTab === 'login'
          ? `${Tutorial_Base}/learner/login`
          : `${Tutorial_Base}/learner/register`

      // Dynamic payload construction based on tab & university selection
      let payload = {}

      if (activeTab === 'login') {
        payload = {
          email: formData.email.trim(),
          password: formData.password
        }
      } else {
        payload = {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          mobile: formData.mobile.trim(),
          universityId: formData.selectedUniversity
            ? Number(formData.selectedUniversity)
            : 0,
          otherUniversity: isOthersSelected
            ? formData.otherUniversity.trim()
            : ''
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Authentication failed. Please try again.'
        )
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        setCookie('authToken', data.token, 7)
      }

      const userData = {
        userId: data.userId || data.id,
        name: data.name || formData.fullName,
        email: data.email || formData.email,
        mobile: data.mobile || formData.mobile
      }

      setCookie('user_session', userData, 7)
      setCookie('userId', userData.userId, 7)
      localStorage.setItem('user', JSON.stringify(userData))

      const targetPath =
        location.state?.redirectTo ||
        location.state?.from?.pathname ||
        from ||
        '/tutorials'
      const targetTechId = location.state?.techId

      window.dispatchEvent(new Event('authChange'))

      if (targetPath === '/Tquiz' || targetPath === '/TQuiz') {
        navigate('/Tquiz', {
          state: { techId: targetTechId || '194' },
          replace: true
        })
      } else {
        navigate(targetPath, { replace: true })
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <div className='min-h-screen w-full bg-[#FAF9F5] flex flex-col justify-between font-sans relative overflow-hidden selection:bg-orange-500/20'>
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

      {/* Ambient Visual Accents */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden z-0'>
        <div className='absolute -top-24 -left-24 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl' />
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute -bottom-20 -left-16 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl'
        />
        <div className='absolute top-1/3 left-1/3 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl' />
      </div>

      <header className='w-full max-w-7xl mx-auto px-6 py-5 lg:py-15 flex items-center justify-between relative z-10' />

      {/* MAIN CONTENT AREA */}
      <main className='flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex items-center relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-8'>
          {/* LEFT PANEL */}
          <div className='hidden lg:block lg:col-span-6 space-y-8 relative'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='space-y-3'
            >
              <h1 className='text-3xl sm:text-5xl font-INB text-slate-900 tracking-tight leading-[1.15]'>
                Learn Today. <br />
                <span className='text-orange-500'>Build Tomorrow.</span>
              </h1>
              <p className='text-slate-500 text-sm sm:text-base leading-relaxed max-w-md'>
                Join thousands of developers learning and building their future
                with <span className='font-INB text-orange-500'>Pisoft</span>.
              </p>
            </motion.div>

            <div className='relative min-h-[340px] flex flex-col justify-between'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='space-y-4 max-w-[240px] relative z-20'
              >
                <div className='flex items-center gap-3'>
                  <div className='p-2.5 rounded-2xl bg-orange-100 text-orange-500 shrink-0'>
                    <BookOpen className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-INB text-slate-900 text-xs sm:text-sm'>
                      5,000+ Tutorials
                    </h4>
                    <p className='text-[11px] text-slate-400'>
                      From beginner to advanced
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='p-2.5 rounded-2xl bg-blue-100 text-blue-600 shrink-0'>
                    <Code2 className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-INB text-slate-900 text-xs sm:text-sm'>
                      Live Compiler
                    </h4>
                    <p className='text-[11px] text-slate-400'>
                      Code, run & learn in real-time
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='p-2.5 rounded-2xl bg-orange-100/80 text-orange-500 shrink-0'>
                    <Bot className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-INB text-slate-900 text-xs sm:text-sm'>
                      AI Mentor
                    </h4>
                    <p className='text-[11px] text-slate-400'>
                      Get help. Solve better. Learn faster.
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='p-2.5 rounded-2xl bg-indigo-100 text-indigo-600 shrink-0'>
                    <Target className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-INB text-slate-900 text-xs sm:text-sm'>
                      Interview Prep
                    </h4>
                    <p className='text-[11px] text-slate-400'>
                      Practice. Prepare. Get hired.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Orbit Graphics */}
              <div className='absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 w-64 h-64 sm:w-70 sm:h-70 pointer-events-none'>
                <motion.img
                  src='/globe.png'
                  alt='Globe'
                  className='w-full h-full object-contain opacity-90'
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <div className='absolute inset-x-[-15%] top-[45%] h-20 border-2 border-orange-400/40 rounded-[100%] rotate-[-12deg] pointer-events-none' />

                <motion.img
                  src='/treact.webp'
                  alt='React'
                  className='absolute -top-3 left-1/2 -translate-x-1/2 w-11 h-11 drop-shadow-md'
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.img
                  src='/tjs.webp'
                  alt='JS'
                  className='absolute top-12 -right-4 w-12 h-12 drop-shadow-md'
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                />
                <motion.img
                  src='/tpython.webp'
                  alt='Python'
                  className='absolute bottom-12 -left-2 w-12 h-12 drop-shadow-md'
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.2
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Navy Form Card */}
          <div className='lg:col-span-6 flex justify-center lg:justify-end'>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='w-full max-w-[420px] bg-[#16224f] rounded-[2rem] p-7 sm:p-9 shadow-2xl shadow-slate-900/40 relative z-20 text-white'
            >
              {/* TAB SWITCHER */}
              <div className='p-1 bg-[#0e1738] rounded-2xl flex items-center mb-8 relative border border-slate-700/50'>
                <button
                  type='button'
                  onClick={() => handleTabSwitch('login')}
                  className='flex-1 py-2.5 text-xs font-INB rounded-xl transition-all relative z-10 text-white'
                >
                  Login
                </button>
                <button
                  type='button'
                  onClick={() => handleTabSwitch('register')}
                  className='flex-1 py-2.5 text-xs font-INB rounded-xl transition-all relative z-10 text-white'
                >
                  Register
                </button>

                <motion.div
                  className='absolute top-1 bottom-1 bg-[#ff6b00] rounded-xl shadow-md'
                  initial={false}
                  animate={{
                    left: activeTab === 'login' ? '4px' : 'calc(50% + 2px)',
                    width: 'calc(50% - 6px)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              </div>

              {/* Error Alert */}
              <AnimatePresence mode='wait'>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className='mb-5 p-3 bg-red-500/20 border border-red-500/40 rounded-xl flex items-center gap-2 text-red-200 text-xs font-medium'
                  >
                    <AlertCircle className='w-4 h-4 shrink-0 text-red-400' />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className='space-y-4'>
                <AnimatePresence mode='wait'>
                  {activeTab === 'register' && (
                    <motion.div
                      key='register-fields'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className='space-y-4 overflow-hidden'
                    >
                      {/* Full Name */}
                      <div className='space-y-1.5 text-left'>
                        <label className='text-xs font-INB text-slate-200 block'>
                          Full Name <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                          <input
                            type='text'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder='John Doe'
                            className='w-full px-4 py-3 bg-[#e8f0fe] rounded-xl text-xs font-medium text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all placeholder:text-slate-400'
                            required={activeTab === 'register'}
                          />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div className='space-y-1.5 text-left'>
                        <label className='text-xs font-INB text-slate-200 block'>
                          Mobile Number <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                          <input
                            type='tel'
                            name='mobile'
                            maxLength={10}
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder='10-digit mobile number'
                            className='w-full px-4 py-3 bg-[#e8f0fe] rounded-xl text-xs font-medium text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all placeholder:text-slate-400'
                            required={activeTab === 'register'}
                          />
                        </div>
                      </div>

                      {/* University Selection Section */}
                      {/* University Selection */}
                      <div className='space-y-2 text-left'>
                        <label className='text-xs font-INB text-slate-200 block'>
                          University <span className='text-red-500'>*</span>
                        </label>

                        <Select
                          options={universities.map(uni => ({
                            value: uni.id || uni._id,
                            label: uni.name || uni.universityName
                          }))}
                          value={
                            universities
                              .map(uni => ({
                                value: uni.id || uni._id,
                                label: uni.name || uni.universityName
                              }))
                              .find(
                                option =>
                                  String(option.value) ===
                                  String(formData.selectedUniversity)
                              ) || null
                          }
                          onChange={selected => {
                            setFormData(prev => ({
                              ...prev,
                              selectedUniversity: selected
                                ? selected.value
                                : '',
                              otherUniversity:
                                selected?.label?.toLowerCase() === 'others' ||
                                selected?.label?.toLowerCase() === 'other'
                                  ? prev.otherUniversity
                                  : ''
                            }))

                            if (errorMessage) setErrorMessage('')
                          }}
                          placeholder={
                            fetchingUniversities
                              ? 'Loading universities...'
                              : 'Select University'
                          }
                          isLoading={fetchingUniversities}
                          isSearchable
                          isClearable
                          menuPortalTarget={document.body}
                          menuPosition='fixed'
                          menuShouldBlockScroll={true}
                          captureMenuScroll={true}
                          components={{ MenuList }}
                          classNamePrefix='react-select'
                          styles={selectStyles}
                        />

                        {isOthersSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='pt-2'
                          >
                            <label className='text-xs font-INB text-slate-200 block mb-1'>
                              University Name{' '}
                              <span className='text-red-500'>*</span>
                            </label>

                            <input
                              type='text'
                              name='otherUniversity'
                              value={formData.otherUniversity}
                              onChange={handleInputChange}
                              placeholder='Enter university name'
                              className='w-full px-4 py-3 bg-[#e8f0fe] rounded-xl text-xs font-medium text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b00]'
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div className='space-y-1.5 text-left'>
                  <label className='text-xs font-INB text-slate-200 block'>
                    Email <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='you@example.com'
                      className='w-full px-4 py-3 bg-[#e8f0fe] rounded-xl text-xs font-medium text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all placeholder:text-slate-400'
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className='space-y-1.5 text-left'>
                  <label className='text-xs font-INB text-slate-200 block'>
                    Password <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder='••••••••••••'
                      className='w-full pl-4 pr-10 py-3 bg-[#e8f0fe] rounded-xl text-xs font-medium text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all placeholder:text-slate-400'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors'
                    >
                      {showPassword ? (
                        <EyeOff className='w-4 h-4' />
                      ) : (
                        <Eye className='w-4 h-4' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full py-3.5 px-4 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-INB text-sm rounded-xl shadow-lg transition-all mt-6 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed'
                >
                  {loading ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin text-white' />
                      <span>
                        {activeTab === 'login'
                          ? 'Logging in...'
                          : 'Creating Account...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {activeTab === 'login' ? 'Login' : 'Register'}
                      </span>
                      <ArrowRight className='w-4 h-4 stroke-[2.5]' />
                    </>
                  )}
                </button>
              </form>

              {/* Context Switcher Prompt */}
              <div className='mt-6 text-center text-xs text-slate-300 font-medium'>
                {activeTab === 'login' ? (
                  <>
                    Need an account?{' '}
                    <button
                      type='button'
                      onClick={() => handleTabSwitch('register')}
                      className='font-INB text-[#ff6b00] hover:underline underline-offset-2 transition-all ml-1'
                    >
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{' '}
                    <button
                      type='button'
                      onClick={() => handleTabSwitch('login')}
                      className='font-INB text-[#ff6b00] hover:underline underline-offset-2 transition-all ml-1'
                    >
                      Login here
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
