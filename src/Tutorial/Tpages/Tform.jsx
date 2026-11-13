import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Select, { components } from 'react-select'
import { baseURl } from '../../../baseURL'
import { toast, Toaster } from 'react-hot-toast'
import {
  User,
  Phone,
  GraduationCap,
  BookOpen,
  Code,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Loader2,
  ArrowRight,
  Sliders,
  MessageSquare
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import { NavbarDemo } from '../../components/navbar/Navbar2'
import { Example } from '../../components/Corn'
import Footer from '../../components/Footer'
import ScrollToHashElement from '../../components/ScrollToHash'
import SocialLinks from '../../components/SocialLinks'
import AuthFloatingButtons from '../../components/AuthFloatingButtons'
import { Tutorial_Base } from '../../../baseURL'
const ScrollButtons = lazy(() => import('../../components/TopBottomButtons'))

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '52px',
    borderRadius: '16px',
    borderColor: state.selectProps.hasError ? '#ef4444' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(255,107,0,0.2)' : 'none',
    '&:hover': {
      borderColor: '#ff6b00'
    },
    backgroundColor: '#f8fafc',
    paddingLeft: '6px',
    fontSize: '13px'
  }),

  placeholder: base => ({
    ...base,
    color: '#94a3b8'
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#ff6b00'
      : state.isFocused
      ? '#fff7ed'
      : '#fff',
    color: state.isSelected ? '#fff' : '#1e293b',
    cursor: 'pointer',
    fontSize: '13px'
  }),

  menu: base => ({
    ...base,
    borderRadius: '16px',
    overflow: 'hidden'
  }),

  valueContainer: base => ({
    ...base,
    padding: '2px 12px'
  }),

  indicatorSeparator: () => ({
    display: 'none'
  }),

  dropdownIndicator: base => ({
    ...base,
    color: '#94a3b8',
    '&:hover': {
      color: '#ff6b00'
    }
  })
}

// Custom MenuList to prevent page scrolling when the dropdown is scrolled
const MenuList = props => {
  const onWheel = e => {
    const el = e.currentTarget
    const atTop = el.scrollTop === 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
    const delta = e.deltaY

    // If the menu can scroll, prevent the window from scrolling when
    // the user reaches the top/bottom of the menu.
    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      e.preventDefault()
    }

    // Stop propagation so parent containers (window) don't handle the wheel
    e.stopPropagation()
  }

  return (
    <components.MenuList
      {...props}
      innerProps={{
        ...props.innerProps,
        onWheel
      }}
    >
      {props.children}
    </components.MenuList>
  )
}

// const API_BASE = "http://192.168.6.210:8027/pp/api"
const API_BASE = Tutorial_Base

export default function TForm () {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Field-specific validation error states
  const [fieldErrors, setFieldErrors] = useState({})

  // Mobile OTP state
  const [mobileOtpSent, setMobileOtpSent] = useState(false)
  const [mobileOtp, setMobileOtp] = useState('')
  const [mobileOtpFromServer, setMobileOtpFromServer] = useState('')
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false)
  const [mobileOtpError, setMobileOtpError] = useState('')
  const [sendingMobileOtp, setSendingMobileOtp] = useState(false)
  const [verifyingMobileOtp, setVerifyingMobileOtp] = useState(false)
  // `mobileExists` indicates the placement API returned exists=true for this mobile
  const [mobileExists, setMobileExists] = useState(false)
  const [mobileAlreadyExistsMessage, setMobileAlreadyExistsMessage] =
    useState('')
  const mobileInputRef = useRef(null)
  const mobileOtpInputRef = useRef(null)
  const isFormLocked = !mobileOtpVerified
  const nameFieldDisabled = false

  // API Lists states
  const [universities, setUniversities] = useState([])
  const [fetchingUnis, setFetchingUnis] = useState(false)

  const [classesList, setClassesList] = useState([])
  const [fetchingClasses, setFetchingClasses] = useState(false)

  const [technologiesList, setTechnologiesList] = useState([])
  const [fetchingTech, setFetchingTech] = useState(false)

  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [skillTags, setSkillTags] = useState([])
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      skills: skillTags.join(', ')
    }))
  }, [skillTags])
  const handleSkillKeyDown = e => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault()

      const value = e.target.value.trim().replace(/,$/, '')

      if (!value) return

      // Avoid duplicate tags
      if (!skillTags.includes(value)) {
        setSkillTags(prev => [...prev, value])
      }

      e.target.value = ''
    }
  }

  const removeSkill = index => {
    setSkillTags(prev => prev.filter((_, i) => i !== index))
  }

  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    collegeId: '',
    otherCollegeUniversity: '',
    classId: '',
    educationStatus: 'pursuing',
    skills: '',
    technologyId: '',
    technologyRating: 5,
    communicationSkillsRating: 5,
    lookingForJob: true,
    wantsToGainAdvancedTechSkills: true
  })

  useEffect(() => {
    const mobile = formData.mobileNo.trim()

    setMobileOtpSent(false)
    setMobileOtpVerified(false)
    setMobileOtp('')
    setMobileOtpError('')
    setMobileExists(false)
    setMobileAlreadyExistsMessage('')

    if (!/^\d{10}$/.test(mobile)) return

    const timer = setTimeout(async () => {
      const result = await checkPlacementExists(mobile)

      if (result.exists) {
        // User already registered
        setMobileExists(true)
        setMobileAlreadyExistsMessage(
          result.message || 'You have already filled the form.'
        )
        return
      }

      // New user -> Send OTP automatically
      setMobileExists(false)
      setMobileAlreadyExistsMessage('')

      await sendMobileOtp()
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.mobileNo])
  // Helper to dynamically check if the selected college object represents "Other"
  const selectedCollegeObj = universities.find(
    uni => String(uni.id || uni._id) === String(formData.collegeId)
  )
  const isOtherCollege =
    selectedCollegeObj &&
    String(
      selectedCollegeObj.name ||
        selectedCollegeObj.universityName ||
        selectedCollegeObj ||
        ''
    )
      .trim()
      .toLowerCase() === 'others'

  // Find the selected technology name for dynamic slider label
  const selectedTechObj = technologiesList.find(
    tech => String(tech.id || tech._id) === String(formData.technologyId)
  )
  const selectedTechName = selectedTechObj
    ? selectedTechObj.name || selectedTechObj.technologyName || selectedTechObj
    : ''

  const selectInputClasses = `w-full rounded-2xl bg-white border border-slate-200 text-sm font-in text-slate-900 appearance-none focus:outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all cursor-pointer pl-4 pr-11 py-3 shadow-sm min-h-[44px]`

  const normalizeApiFieldErrors = errors => {
    if (!errors || typeof errors !== 'object') return {}

    const normalized = {}
    if (Array.isArray(errors)) {
      errors.forEach(errorItem => {
        if (typeof errorItem === 'string') return
        if (errorItem.field && errorItem.message) {
          normalized[errorItem.field] = errorItem.message
        } else if (typeof errorItem === 'object') {
          Object.entries(errorItem).forEach(([key, value]) => {
            normalized[key] =
              typeof value === 'string' ? value : JSON.stringify(value)
          })
        }
      })
    } else {
      Object.entries(errors).forEach(([key, value]) => {
        normalized[key] =
          typeof value === 'string' ? value : JSON.stringify(value)
      })
    }

    return normalized
  }

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      // 1. Fetch Colleges
      setFetchingUnis(true)
      try {
        const res = await fetch(
          `${API_BASE}/placementOrientedProgram/collegeUniversities`
        )
        const data = await res.json()
        const uniList = Array.isArray(data)
          ? data
          : data.universities || data.data || []
        setUniversities(uniList)
      } catch (err) {
        console.error('Failed to fetch colleges:', err)
      } finally {
        setFetchingUnis(false)
      }

      // 2. Fetch Classes
      setFetchingClasses(true)
      try {
        const res = await fetch(`${API_BASE}/placementOrientedProgram/classes`)
        const data = await res.json()
        const classList = Array.isArray(data)
          ? data
          : data.classes || data.data || []
        setClassesList(classList)
      } catch (err) {
        console.error('Failed to fetch classes:', err)
      } finally {
        setFetchingClasses(false)
      }

      // 3. Fetch Technologies
      setFetchingTech(true)
      try {
        const res = await fetch(`${API_BASE}/placementOrientedProgram/getTechnologiedForPOP`)
        const data = await res.json()
        const techList = Array.isArray(data)
          ? data
          : data.technologies || data.data || []
        setTechnologiesList(techList)
      } catch (err) {
        console.error('Failed to fetch technologies:', err)
      } finally {
        setFetchingTech(false)
      }
    }

    fetchDropdownData()
  }, [])

  const validateField = (
    name,
    value,
    currentCollegeObj = selectedCollegeObj
  ) => {
    let error = ''
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Full name is required.'
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long.'
        } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          error = 'Name contains invalid characters.'
        }
        break
      case 'mobileNo':
        if (!value.trim()) {
          error = 'Mobile number is required.'
        } else if (!/^\d{10}$/.test(value.trim())) {
          error = 'Mobile number must be exactly 10 digits.'
        }
        break
      case 'collegeId':
        if (!value) {
          error = 'Please select a college or university.'
        }
        break
      case 'otherCollegeUniversity': {
        const isOther =
          currentCollegeObj &&
          String(
            currentCollegeObj.name ||
              currentCollegeObj.universityName ||
              currentCollegeObj ||
              ''
          )
            .trim()
            .toLowerCase() === 'other'
        if (isOther && !String(value).trim()) {
          error = 'Please specify your custom college name.'
        }
        break
      }
      case 'classId':
        if (!value) {
          error = 'Please select your class & stream.'
        }
        break
      case 'technologyId':
        if (!value) {
          error = 'Please select a target technology.'
        }
        break
      case 'skills':
        if (value.length > 500) {
          error = 'Skills description cannot exceed 500 characters.'
        }
        break
      default:
        break
    }
    return error
  }

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target
    let val = type === 'checkbox' ? checked : value
    if (name === 'mobileNo') {
      val = String(val).replace(/\D/g, '')
    }

    setFormData(prev => {
      const updated = { ...prev, [name]: val }

      if (name === 'mobileNo') {
        setMobileOtpSent(false)
        setMobileOtpVerified(false)
        setMobileOtp('')
        setMobileOtpError('')
        setMobileOtpFromServer('')
        setMobileExists(false)
        setMobileAlreadyExistsMessage('')
      }

      // If changing college away from "Other", clear out the custom name field & error
      if (name === 'collegeId') {
        const newlySelectedUni = universities.find(
          uni => String(uni.id || uni._id) === String(val)
        )
        const newlyIsOther =
          newlySelectedUni &&
          String(
            newlySelectedUni.name ||
              newlySelectedUni.universityName ||
              newlySelectedUni ||
              ''
          )
            .trim()
            .toLowerCase() === 'other'

        if (!newlyIsOther) {
          updated.otherCollegeUniversity = ''
          setFieldErrors(errs => ({ ...errs, otherCollegeUniversity: '' }))
        }
      }

      // Compute inline field error
      const fieldError = validateField(
        name,
        val,
        universities.find(
          uni => String(uni.id || uni._id) === String(updated.collegeId)
        )
      )
      setFieldErrors(errs => ({ ...errs, [name]: fieldError }))

      return updated
    })

    if (errorMessage) setErrorMessage('')
  }

  // optional: pre-check on blur to inform user early
  const handleMobileBlur = async () => {
    const mobile = String(formData.mobileNo || '').trim()
    if (!mobile) return
    const validationError = validateField('mobileNo', mobile)
    if (validationError) {
      setFieldErrors(prev => ({ ...prev, mobileNo: validationError }))
      return
    }

    const existsResult = await checkPlacementExists(mobile)
    if (existsResult.exists) {
      setMobileExists(true)
      setMobileAlreadyExistsMessage(existsResult.message || '')
    } else {
      setMobileExists(false)
      setMobileAlreadyExistsMessage('')
    }
  }

  const checkPlacementExists = async mobile => {
    try {
      const url = new URL(
        `${API_BASE}/placementOrientedProgram/IsAlreadyExists`
      )

      url.searchParams.set('mobile', mobile)

      const response = await fetch(url.toString())

      const data = await response.json()

      console.log('IsAlreadyExists API response:', data)

      return {
        exists: Boolean(data), // handles true/false response
        message: ''
      }
    } catch (err) {
      console.error(err)

      return {
        exists: false,
        message: ''
      }
    }
  }
  const sendMobileOtp = async () => {
    const mobile = formData.mobileNo.trim()
    if (!mobile) {
      setMobileOtpError('Please enter your mobile number.')
      mobileInputRef.current?.focus()
      return
    }

    const validationError = validateField('mobileNo', mobile)
    if (validationError) {
      setFieldErrors(prev => ({ ...prev, mobileNo: validationError }))
      setMobileOtpError(validationError)
      mobileInputRef.current?.focus()
      return
    }

    setSendingMobileOtp(true)
    setMobileOtpError('')
    setMobileExists(false)
    setMobileAlreadyExistsMessage('')

    try {
      // double-check placement existence just before sending OTP
      const existsResult = await checkPlacementExists(mobile)

      if (existsResult.exists) {
        setMobileExists(true)
        setMobileAlreadyExistsMessage(
          existsResult.message || 'You Have already filled the form.'
        )
        return
      }

      setMobileExists(false)
      setMobileAlreadyExistsMessage('')

      const response = await fetch(
        `${baseURl}/otp/sms?mobile=${encodeURIComponent(mobile)}`
      )
      if (!response.ok) {
        throw new Error(`Failed to send mobile OTP (HTTP ${response.status})`)
      }

      const data = await response.json()
      const otpString =
        data?.otp?.toString().trim() || data?.data?.otp?.toString().trim() || ''

      if (!otpString || !/^\d+$/.test(otpString)) {
        throw new Error('Failed to get valid OTP from server.')
      }

      setMobileOtpFromServer(otpString)
      setMobileOtpSent(true)
      setMobileOtpError('')

      console.log('OTP sent state:', true, otpString)

      toast.success('OTP sent to your mobile number.')

      mobileOtpInputRef.current?.focus()
    } catch (err) {
      console.error('Mobile OTP send error:', err)
      const message =
        err.message || 'Failed to send mobile OTP. Please try again.'
      setMobileOtpError(message)
      if (message) mobileInputRef.current?.focus()
    } finally {
      setSendingMobileOtp(false)
    }
  }

  const verifyMobileOtp = () => {
    if (!mobileOtp) {
      setMobileOtpError('Please enter the OTP.')
      return
    }

    setVerifyingMobileOtp(true)

    const entered = mobileOtp.toString().trim()
    const expected = mobileOtpFromServer.toString().trim()

    if (entered === expected) {
      setMobileOtpVerified(true)
      setMobileOtpError('')
      toast.success('Mobile number verified.')
    } else {
      setMobileOtpError('Invalid OTP.')
    }

    setVerifyingMobileOtp(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMessage('')

    if (!mobileOtpVerified) {
      setErrorMessage(
        'Please verify your mobile number before submitting the form.'
      )
      return
    }

    setLoading(true)

    try {
      const submissionPayload = {
        name: formData.name.trim(),
        mobileNo: formData.mobileNo.trim(),
        classId: formData.classId ? Number(formData.classId) : null,
        collegeId: formData.collegeId ? Number(formData.collegeId) : null,
        otherCollegeUniversity: isOtherCollege
          ? formData.otherCollegeUniversity.trim()
          : null,
        educationStatus: formData.educationStatus,
        skills: formData.skills.trim(),
        technologyId: formData.technologyId
          ? Number(formData.technologyId)
          : null,
        technologyRating: Number(formData.technologyRating),
        communicationSkillsRating: Number(formData.communicationSkillsRating),
        lookingForJob: Boolean(formData.lookingForJob),
        wantsToGainAdvancedTechSkills: Boolean(
          formData.wantsToGainAdvancedTechSkills
        )
      }

      const response = await fetch(
        `${API_BASE}/placementOrientedProgram/save`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionPayload)
        }
      )

      const rawText = await response.text()

      let responseData = {}

      try {
        responseData = JSON.parse(rawText || '{}')
      } catch {
        responseData = {
          message: rawText
        }
      }

      // --------------------------------------------------
      // HANDLE API ERROR
      // --------------------------------------------------
      if (!response.ok) {
        const apiMessage =
          responseData.message ||
          responseData.error ||
          responseData.detail ||
          responseData.msg ||
          rawText ||
          'Failed to submit the form. Please try again.'

        const apiFieldErrors =
          responseData.errors ||
          responseData.fieldErrors ||
          responseData.validationErrors

        if (apiFieldErrors && typeof apiFieldErrors === 'object') {
          setFieldErrors(prev => ({
            ...prev,
            ...normalizeApiFieldErrors(apiFieldErrors)
          }))
        }

        throw new Error(apiMessage)
      }

      // --------------------------------------------------
      // SUCCESS
      // --------------------------------------------------

      // Technology ID comes directly from the submitted form.
      const popTechId = formData.technologyId
        ? Number(formData.technologyId)
        : null

      // Try the common response structures for userId.
      const popUserId =
        responseData.id ||
        responseData.data?.id ||
        responseData.user?.id ||
        responseData.data?.user?.id ||
        null

      // Make sure we have the values required by POPquiz.
      if (!popUserId) {
        throw new Error(
          'Form submitted successfully, but the user ID was not returned by the server. Please contact support.'
        )
      }

      if (!popTechId) {
        throw new Error(
          'Form submitted successfully, but no technology was selected.'
        )
      }

      // --------------------------------------------------
      // SAVE IDs FOR POPQUIZ
      // POPquiz reads these exact localStorage keys.
      // --------------------------------------------------
      localStorage.setItem('pop_user_id', String(popUserId))

      localStorage.setItem('pop_tech_id', String(popTechId))

      // Optional: keep the complete response if you need it later.
      // localStorage.setItem(
      //   'pop_submission_response',
      //   JSON.stringify(responseData)
      // )

      setSuccess(true)
      navigate('/POPQuiz')
    } catch (err) {
      console.error('Placement form submission error:', err)

      setErrorMessage(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => setShowAuthButtons(window.scrollY <= 100)
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

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
            <Motion.div
              initial={{ opacity: 1, y: 40, x: -50 }}
              exit={{ opacity: 0, y: -50, x: -50 }}
            >
              <Suspense fallback={null}>
                <AuthFloatingButtons />
              </Suspense>
            </Motion.div>
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

      <div className='min-h-screen w-full bg-[#FAF9F5] py-12 pt-20 lg:pt-30 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-in'>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-4xl w-full bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden'
        >
          {/* Header Banner */}
          <div className='bg-[#16224f] px-8 py-8 text-white relative overflow-hidden'>
            <div className='absolute -right-10 -bottom-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none' />
            <h2 className='text-2xl sm:text-3xl font-INB tracking-tight'>
              Placement Oriented Program (POP)
            </h2>
            <p className='text-slate-300 text-xs sm:text-sm mt-1 font-in'>
              Fill out your academic and career preferences to customize your
              learning journey with Pisoft.
            </p>
          </div>

          {/* Form Body */}
          <div className='p-6 sm:p-10'>
            <AnimatePresence mode='wait'>
              {success ? (
                <Motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='py-16 text-center space-y-4'
                >
                  <div className='w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto'>
                    <CheckCircle2 className='w-8 h-8' />
                  </div>
                  <h3 className='text-xl font-INB text-slate-900'>
                    Application Submitted Successfully!
                  </h3>
                  <p className='text-slate-500 text-sm max-w-md mx-auto font-in'>
                    Redirecting you to your assessment quiz...
                  </p>
                </Motion.div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Error Banner */}
                  {errorMessage && (
                    <Motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-INB'
                    >
                      <AlertCircle className='w-4 h-4 shrink-0 text-red-500' />
                      <span>{errorMessage}</span>
                    </Motion.div>
                  )}

                  {/* Row: Name & Mobile */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-1.5 text-left'>
                      <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                        <User className='w-3.5 h-3.5 text-[#ff6b00]' /> Full
                        Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='e.g. Alex Morgan'
                        disabled={nameFieldDisabled}
                        className={`w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-in text-slate-900 border ${
                          fieldErrors.name
                            ? 'border-red-500'
                            : 'border-slate-200'
                        } focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all ${
                          nameFieldDisabled
                            ? 'opacity-60 cursor-not-allowed'
                            : ''
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className='text-[10px] text-red-500 mt-1 font-in'>
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className='space-y-1.5 text-left'>
                      <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                        <Phone className='w-3.5 h-3.5 text-[#ff6b00]' /> Mobile
                        Number <span className='text-red-500'>*</span>
                      </label>
                      <input
                        ref={mobileInputRef}
                        type='tel'
                        name='mobileNo'
                        maxLength={10}
                        inputMode='numeric'
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        onBlur={handleMobileBlur}
                        placeholder='10-digit mobile number'
                        disabled={mobileOtpVerified}
                        className={`w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-in text-slate-900 border ${
                          fieldErrors.mobileNo
                            ? 'border-red-500'
                            : 'border-slate-200'
                        } focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all ${
                          mobileOtpVerified
                            ? 'opacity-60 cursor-not-allowed'
                            : ''
                        }`}
                      />
                      {fieldErrors.mobileNo && (
                        <p className='text-[10px] text-red-500 mt-1 font-in'>
                          {fieldErrors.mobileNo}
                        </p>
                      )}

                      {!mobileOtpVerified && mobileOtpSent && (
                        <div className='mt-3 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3'>
                          <button
                            type='button'
                            onClick={sendMobileOtp}
                            disabled={sendingMobileOtp || !formData.mobileNo}
                            className='w-full sm:w-auto px-4 py-3 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            {sendingMobileOtp
                              ? 'Sending OTP...'
                              : mobileOtpSent
                              ? 'Resend OTP'
                              : 'Send OTP'}
                          </button>
                          <div className='relative'>
                            <input
                              ref={mobileOtpInputRef}
                              type='text'
                              name='mobileOtp'
                              value={mobileOtp}
                              onChange={e =>
                                setMobileOtp(
                                  e.target.value.replace(/[^0-9]/g, '')
                                )
                              }
                              placeholder='Enter OTP'
                              disabled={!mobileOtpSent}
                              className={`w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-in text-slate-900 border ${
                                mobileOtpError
                                  ? 'border-red-500'
                                  : 'border-slate-200'
                              } focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all ${
                                !mobileOtpSent
                                  ? 'opacity-60 cursor-not-allowed'
                                  : ''
                              }`}
                            />
                            {mobileOtpVerified && (
                              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 text-xs font-semibold'>
                                Verified
                              </span>
                            )}
                          </div>
                          <button
                            type='button'
                            onClick={verifyMobileOtp}
                            disabled={verifyingMobileOtp || !mobileOtpSent}
                            className='w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            {verifyingMobileOtp ? 'Verifying...' : 'Verify OTP'}
                          </button>
                        </div>
                      )}

                      {mobileOtpError && (
                        <p className='text-[10px] text-red-500 mt-1 font-in'>
                          {mobileOtpError}
                        </p>
                      )}
                      {mobileAlreadyExistsMessage && (
                        <p className='text-[10px] text-red-600 mt-1 font-INB'>
                          {mobileAlreadyExistsMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* College Name Selection */}
                  <div className='space-y-1.5 text-left'>
                    <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                      <GraduationCap className='w-3.5 h-3.5 text-[#ff6b00]' />
                      College / University Name
                      <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      classNamePrefix='react-select'
                      isDisabled={isFormLocked}
                      options={universities.map(uni => ({
                        value: uni.id || uni._id,
                        label: uni.name || uni.universityName || uni
                      }))}
                      value={
                        universities
                          .map(uni => ({
                            value: uni.id || uni._id,
                            label: uni.name || uni.universityName || uni
                          }))
                          .find(
                            option =>
                              String(option.value) ===
                              String(formData.collegeId)
                          ) || null
                      }
                      onChange={selected => {
                        const value = selected ? selected.value : ''

                        const newlySelectedUni = universities.find(
                          uni => String(uni.id || uni._id) === String(value)
                        )

                        const newlyIsOther =
                          newlySelectedUni &&
                          String(
                            newlySelectedUni.name ||
                              newlySelectedUni.universityName ||
                              newlySelectedUni
                          )
                            .trim()
                            .toLowerCase() === 'other'

                        setFormData(prev => ({
                          ...prev,
                          collegeId: value,
                          otherCollegeUniversity: newlyIsOther
                            ? prev.otherCollegeUniversity
                            : ''
                        }))

                        setFieldErrors(prev => ({
                          ...prev,
                          collegeId: validateField(
                            'collegeId',
                            value,
                            newlySelectedUni
                          ),
                          ...(newlyIsOther
                            ? {}
                            : {
                                otherCollegeUniversity: ''
                              })
                        }))

                        if (errorMessage) setErrorMessage('')
                      }}
                      placeholder={
                        fetchingUnis
                          ? 'Loading colleges...'
                          : 'Select College / University'
                      }
                      isLoading={fetchingUnis}
                      isSearchable
                      isClearable
                      maxMenuHeight={250}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: 52,
                          borderRadius: 16,
                          backgroundColor: '#f8fafc',
                          borderColor: fieldErrors.collegeId
                            ? '#ef4444'
                            : '#e2e8f0',
                          boxShadow: state.isFocused
                            ? '0 0 0 2px rgba(255,107,0,.2)'
                            : 'none',
                          '&:hover': {
                            borderColor: '#ff6b00'
                          }
                        }),

                        valueContainer: base => ({
                          ...base,
                          padding: '4px 14px'
                        }),

                        input: base => ({
                          ...base,
                          color: '#0f172a'
                        }),

                        placeholder: base => ({
                          ...base,
                          color: '#94a3b8',
                          fontSize: '13px'
                        }),

                        singleValue: base => ({
                          ...base,
                          fontSize: '13px',
                          color: '#0f172a'
                        }),

                        option: (base, state) => ({
                          ...base,
                          fontSize: '13px',
                          cursor: 'pointer',
                          padding: '12px 16px',
                          backgroundColor: state.isSelected
                            ? '#ff6b00'
                            : state.isFocused
                            ? '#fff7ed'
                            : '#ffffff',
                          color: state.isSelected ? '#ffffff' : '#1e293b'
                        }),

                        menu: base => ({
                          ...base,
                          borderRadius: 16,
                          overflow: 'hidden'
                        }),

                        menuList: base => ({
                          ...base,
                          maxHeight: 250,
                          overflowY: 'auto'
                        }),

                        menuPortal: base => ({
                          ...base
                        }),

                        indicatorSeparator: () => ({
                          display: 'none'
                        }),

                        dropdownIndicator: base => ({
                          ...base,
                          color: '#94a3b8',
                          '&:hover': {
                            color: '#ff6b00'
                          }
                        })
                      }}
                      components={{ MenuList }}
                      menuPortalTarget={document.body}
                      menuPosition='fixed'
                      menuPlacement='auto'
                      menuShouldScrollIntoView={false}
                    />

                    {fieldErrors.collegeId && (
                      <p className='text-[10px] text-red-500 mt-1 font-in'>
                        {fieldErrors.collegeId}
                      </p>
                    )}

                    {isOtherCollege && (
                      <Motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-3'
                      >
                        <input
                          type='text'
                          name='otherCollegeUniversity'
                          value={formData.otherCollegeUniversity}
                          onChange={handleInputChange}
                          disabled={isFormLocked}
                          placeholder='Please specify your custom college name'
                          className={`w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-in text-slate-900 border ${
                            fieldErrors.otherCollegeUniversity
                              ? 'border-red-500'
                              : 'border-slate-200'
                          } focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all ${
                            isFormLocked ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                        />

                        {fieldErrors.otherCollegeUniversity && (
                          <p className='text-[10px] text-red-500 mt-1 font-in'>
                            {fieldErrors.otherCollegeUniversity}
                          </p>
                        )}
                      </Motion.div>
                    )}
                  </div>

                  {/* Row: Class/Stream & Status */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-1.5 text-left'>
                      <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                        <BookOpen className='w-3.5 h-3.5 text-[#ff6b00]' />
                        Class & Stream
                        <span className='text-red-500'>*</span>
                      </label>

                      <Select
                        isDisabled={isFormLocked}
                        options={classesList.map(cls => ({
                          value: cls.id || cls._id,
                          label: cls.name || cls.className || cls
                        }))}
                        value={
                          classesList
                            .map(cls => ({
                              value: cls.id || cls._id,
                              label: cls.name || cls.className || cls
                            }))
                            .find(
                              option =>
                                String(option.value) ===
                                String(formData.classId)
                            ) || null
                        }
                        onChange={selected => {
                          const value = selected ? selected.value : ''

                          setFormData(prev => ({
                            ...prev,
                            classId: value
                          }))

                          setFieldErrors(prev => ({
                            ...prev,
                            classId: validateField('classId', value)
                          }))

                          if (errorMessage) setErrorMessage('')
                        }}
                        placeholder={
                          fetchingClasses
                            ? 'Loading classes...'
                            : 'Select Class & Stream'
                        }
                        isLoading={fetchingClasses}
                        isClearable
                        styles={selectStyles}
                        hasError={!!fieldErrors.classId}
                        components={{ MenuList }}
                        menuPortalTarget={document.body}
                        menuPosition='fixed'
                        menuPlacement='auto'
                        menuShouldScrollIntoView={false}
                      />

                      {fieldErrors.classId && (
                        <p className='text-[10px] text-red-500 mt-1 font-in'>
                          {fieldErrors.classId}
                        </p>
                      )}
                    </div>

                    <div className='space-y-1.5 text-left'>
                      {' '}
                      <label className='text-xs font-INB text-slate-900 block'>
                        {' '}
                        Education Status <span className='text-red-500'>
                          *
                        </span>{' '}
                      </label>{' '}
                      <div className='flex items-center gap-6 pt-3'>
                        {' '}
                        <label className='flex items-center gap-2 text-xs font-in text-slate-900 cursor-pointer'>
                          {' '}
                          <input
                            type='radio'
                            name='educationStatus'
                            value='pursuing'
                            checked={formData.educationStatus === 'pursuing'}
                            onChange={handleInputChange}
                            disabled={isFormLocked}
                            className='text-[#ff6b00] focus:ring-[#ff6b00]'
                          />{' '}
                          Pursuing{' '}
                        </label>{' '}
                        <label className='flex items-center gap-2 text-xs font-in text-slate-900 cursor-pointer'>
                          {' '}
                          <input
                            type='radio'
                            name='educationStatus'
                            value='passed out'
                            checked={formData.educationStatus === 'passed out'}
                            onChange={handleInputChange}
                            disabled={isFormLocked}
                            className='text-[#ff6b00] focus:ring-[#ff6b00]'
                          />{' '}
                          Passed Out{' '}
                        </label>{' '}
                      </div>{' '}
                    </div>
                  </div>

                  {/* Row: Target Technology */}
                  <div className='space-y-1.5 text-left'>
                    <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                      <Code className='w-3.5 h-3.5 text-[#ff6b00]' />
                      Target Technology Career
                      <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      isDisabled={isFormLocked}
                      options={technologiesList.map(tech => ({
                        value: tech.id || tech._id,
                        label: tech.name || tech.technologyName || tech
                      }))}
                      value={
                        technologiesList
                          .map(tech => ({
                            value: tech.id || tech._id,
                            label: tech.name || tech.technologyName || tech
                          }))
                          .find(
                            option =>
                              String(option.value) ===
                              String(formData.technologyId)
                          ) || null
                      }
                      onChange={selected => {
                        const value = selected ? selected.value : ''

                        setFormData(prev => ({
                          ...prev,
                          technologyId: value
                        }))

                        setFieldErrors(prev => ({
                          ...prev,
                          technologyId: validateField('technologyId', value)
                        }))

                        if (errorMessage) setErrorMessage('')
                      }}
                      placeholder={
                        fetchingTech
                          ? 'Loading technologies...'
                          : 'Select Technology'
                      }
                      isLoading={fetchingTech}
                      isClearable
                      styles={selectStyles}
                      hasError={!!fieldErrors.technologyId}
                      components={{ MenuList }}
                      menuPortalTarget={document.body}
                      menuPosition='fixed'
                      menuPlacement='auto'
                      menuShouldScrollIntoView={false}
                    />

                    {fieldErrors.technologyId && (
                      <p className='text-[10px] text-red-500 mt-1 font-in'>
                        {fieldErrors.technologyId}
                      </p>
                    )}
                  </div>

                  {/* Row: Current Skills Textarea */}
                  <div className='space-y-1.5 text-left'>
                    <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                      <Briefcase className='w-3.5 h-3.5 text-[#ff6b00]' />{' '}
                      Current Skills
                    </label>
                    <div
                      className={`w-full min-h-[110px] bg-slate-50 rounded-xl border ${
                        fieldErrors.skills
                          ? 'border-red-500'
                          : 'border-slate-200'
                      } focus-within:ring-2 focus-within:ring-[#ff6b00] p-3`}
                    >
                      <div className='flex flex-wrap gap-2 mb-2'>
                        {skillTags.map((skill, index) => (
                          <span
                            key={index}
                            className='flex items-center gap-2 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-medium'
                          >
                            {skill}

                            <button
                              type='button'
                              onClick={() => removeSkill(index)}
                              className='text-white hover:text-red-400 transition-all text-sm font-bold focus:outline-none'
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <input
                        type='text'
                        placeholder='Type a skill and press , or Enter'
                        onKeyDown={handleSkillKeyDown}
                        disabled={isFormLocked}
                        className={`w-full bg-transparent outline-none text-sm ${
                          isFormLocked ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    {fieldErrors.skills && (
                      <p className='text-[10px] text-red-500 mt-1 font-in'>
                        {fieldErrors.skills}
                      </p>
                    )}
                  </div>
                  <div className='font-INB bg-orange-50 py-2 px-4 rounded-full inline-block text-blue-900'>
                    Rate Yourself in below fields
                  </div>

                  {/* Row: Sliders for Technical & Communication Rating */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100'>
                      <div className='flex justify-between items-center'>
                        <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                          <Sliders className='w-3.5 h-3.5 text-[#ff6b00]' />{' '}
                          {selectedTechName
                            ? `Technical Skills in ${selectedTechName}`
                            : 'Technology Rating'}
                        </label>
                        <span className='px-2 py-0.5 bg-orange-100 text-[#ff6b00] font-INB text-xs rounded-md'>
                          {formData.technologyRating} / 10
                        </span>
                      </div>
                      <input
                        type='range'
                        name='technologyRating'
                        min='0'
                        max='10'
                        value={formData.technologyRating}
                        onChange={handleInputChange}
                        disabled={isFormLocked}
                        className={`w-full accent-[#ff6b00] ${
                          isFormLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      />
                      <div className='flex justify-between text-[10px] text-slate-400 font-in'>
                        <span>0 (Beginner)</span>
                        <span>5 (Average)</span>
                        <span>10 (Expert)</span>
                      </div>
                    </div>

                    <div className='space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100'>
                      <div className='flex justify-between items-center'>
                        <label className='text-xs font-INB text-slate-900 flex items-center gap-1.5'>
                          <MessageSquare className='w-3.5 h-3.5 text-[#ff6b00]' />{' '}
                          Communication Skills Rating
                        </label>
                        <span className='px-2 py-0.5 bg-orange-100 text-[#ff6b00] font-INB text-xs rounded-md'>
                          {formData.communicationSkillsRating} / 10
                        </span>
                      </div>
                      <input
                        type='range'
                        name='communicationSkillsRating'
                        min='0'
                        max='10'
                        value={formData.communicationSkillsRating}
                        onChange={handleInputChange}
                        disabled={isFormLocked}
                        className={`w-full accent-[#ff6b00] ${
                          isFormLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      />
                      <div className='flex justify-between text-[10px] text-slate-400 font-in'>
                        <span>0 (Basic)</span>
                        <span>5 (Good)</span>
                        <span>10 (Fluent)</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: Job & Advance Skills Toggles */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100'>
                    <div className='space-y-1.5 text-left'>
                      <label className='text-xs font-INB text-slate-900 block'>
                        Are you looking for a job?
                      </label>
                      <div className='flex items-center gap-6 pt-1'>
                        <label className='flex items-center gap-2 text-xs font-in text-slate-900 cursor-pointer'>
                          <input
                            type='radio'
                            name='lookingForJob'
                            checked={formData.lookingForJob === true}
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                lookingForJob: true
                              }))
                            }
                            disabled={isFormLocked}
                            className='text-[#ff6b00]'
                          />
                          Yes
                        </label>
                        <label className='flex items-center gap-2 text-xs font-in text-slate-900 cursor-pointer'>
                          <input
                            type='radio'
                            name='lookingForJob'
                            checked={formData.lookingForJob === false}
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                lookingForJob: false
                              }))
                            }
                            disabled={isFormLocked}
                            className='text-[#ff6b00]'
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <div className='space-y-1.5 text-left'>
                      <label className='text-xs font-INB text-slate-900 block'>
                        Do you want to gain advanced technical skills?
                      </label>
                      <div className='flex items-center gap-6 pt-1'>
                        <label className='flex items-center gap-2 text-xs font-in text-slate-900 cursor-pointer'>
                          <input
                            type='radio'
                            name='wantsToGainAdvancedTechSkills'
                            checked={
                              formData.wantsToGainAdvancedTechSkills === true
                            }
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                wantsToGainAdvancedTechSkills: true
                              }))
                            }
                            disabled={isFormLocked}
                            className='text-[#ff6b00]'
                          />
                          Yes
                        </label>
                        <label className='flex items-center gap-2 text-xs font-in text-slate-900 cursor-pointer'>
                          <input
                            type='radio'
                            name='wantsToGainAdvancedTechSkills'
                            checked={
                              formData.wantsToGainAdvancedTechSkills === false
                            }
                            onChange={() =>
                              setFormData(prev => ({
                                ...prev,
                                wantsToGainAdvancedTechSkills: false
                              }))
                            }
                            disabled={isFormLocked}
                            className='text-[#ff6b00]'
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className='pt-4'>
                    <button
                      type='submit'
                      disabled={loading || isFormLocked}
                      className='w-full py-4 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-INB text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {loading ? (
                        <>
                          <Loader2 className='w-4 h-4 animate-spin' />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight className='w-4 h-4' />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </Motion.div>
      </div>
      {/* Already filled modal */}
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '13px'
          }
        }}
      />
      <Footer />
    </>
  )
}
