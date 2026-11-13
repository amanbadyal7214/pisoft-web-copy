import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NavbarDemo } from '../components/navbar/Navbar2'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { AnimatePresence, motion } from 'framer-motion'
import { Example } from '../components/Corn'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import { baseURl } from '../../baseURL'

export default function RegisterUser () {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    categoryCode: 1
  })

  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Email OTP state
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailOtp, setEmailOtp] = useState('')
  const [emailOtpFromServer, setEmailOtpFromServer] = useState('')
  const [emailOtpVerified, setEmailOtpVerified] = useState(false)
  const [emailOtpError, setEmailOtpError] = useState('')
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false)

  // Mobile OTP state
  const [mobileOtpSent, setMobileOtpSent] = useState(false)
  const [mobileOtp, setMobileOtp] = useState('')
  const [mobileOtpFromServer, setMobileOtpFromServer] = useState('')
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false)
  const [mobileOtpError, setMobileOtpError] = useState('')
  const [sendingMobileOtp, setSendingMobileOtp] = useState(false)

  const [verifyingEmailOtp, setVerifyingEmailOtp] = useState(false)
  const [verifyingMobileOtp, setVerifyingMobileOtp] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    const trimmedValue = name === 'contact' ? value.trim() : value
    setFormData(prev => ({ ...prev, [name]: trimmedValue }))

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        if (value !== formData.confirmPassword) {
          setPasswordError('Passwords do not match.')
        } else {
          setPasswordError('')
        }
      }
      if (name === 'confirmPassword') {
        if (value !== formData.password) {
          setPasswordError('Passwords do not match.')
        } else {
          setPasswordError('')
        }
      }
    }

    if (name === 'email') {
      setEmailOtpSent(false)
      setEmailOtpVerified(false)
      setEmailOtp('')
      setEmailOtpError('')
      setEmailOtpFromServer('')
    }

    if (name === 'contact') {
      setMobileOtpSent(false)
      setMobileOtpVerified(false)
      setMobileOtp('')
      setMobileOtpError('')
      setMobileOtpFromServer('')
    }
  }

  const checkEmailExists = async email => {
    try {
      await axios.post(`${baseURl}/website-users/exists`, { email })
      return { exists: false }
    } catch (err) {
      const msg = err.response?.data?.email
      if (msg) return { exists: true, message: msg }
      return { exists: true, message: 'Email check failed.' }
    }
  }

 const checkMobileExists = async mobile => {
  try {
    await axios.post(`${baseURl}/website-users/exists`, { contact: mobile })
    return { exists: false }
  } catch (err) {
    const msg = err.response?.data?.mobile || err.response?.data?.contact
    if (msg) return { exists: true, message: msg }
    return { exists: true, message: 'Mobile number check failed.' }
  }
}


  const sendEmailOtp = async () => {
    if (!formData.email) {
      setEmailOtpError('Please enter your email.')
      return
    }

    const { exists, message } = await checkEmailExists(formData.email)
    if (exists) {
      setEmailOtpError(message || 'Email is already registered.')
      return
    }

    setSendingEmailOtp(true)
    setEmailOtpError('')

    try {
      const res = await axios.get(`${baseURl}/otp/emails`, {
        params: { email: formData.email },
        responseType: 'text'
      })
      const otpString = res.data.trim()
      if (otpString && /^\d+$/.test(otpString)) {
        setEmailOtpFromServer(otpString)
        setEmailOtpSent(true)
      } else {
        setEmailOtpError('Failed to get valid OTP from server.')
      }
    } catch (err) {
      setEmailOtpError('Failed to send email OTP.')
    } finally {
      setSendingEmailOtp(false)
    }
  }

  const sendMobileOtp = async () => {
    if (!formData.contact) {
      setMobileOtpError('Please enter your mobile number.')
      return
    }

    const { exists, message } = await checkMobileExists(formData.contact)
    if (exists) {
      setMobileOtpError(message || 'Mobile number is already registered.')
      return
    }

    setSendingMobileOtp(true)
    setMobileOtpError('')

    try {
      const res = await axios.get(`${baseURl}/otp/sms`, {
        params: { mobile: formData.contact }
      })

      const otpString = res.data.otp?.toString().trim()
      if (otpString && /^\d+$/.test(otpString)) {
        setMobileOtpFromServer(otpString)
        setMobileOtpSent(true)
      } else {
        setMobileOtpError('Failed to get valid OTP from server.')
      }
    } catch (err) {
      setMobileOtpError('Failed to send mobile OTP.')
    } finally {
      setSendingMobileOtp(false)
    }
  }

  const verifyEmailOtp = () => {
    if (!emailOtp) {
      setEmailOtpError('Please enter the OTP.')
      return
    }
    setVerifyingEmailOtp(true)

    if (emailOtp.trim() === emailOtpFromServer) {
      setEmailOtpVerified(true)
      setEmailOtpError('')
    } else {
      setEmailOtpError('Invalid OTP.')
    }

    setVerifyingEmailOtp(false)
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
    } else {
      setMobileOtpError('Invalid OTP.')
    }

    setVerifyingMobileOtp(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!emailOtpVerified || !mobileOtpVerified) {
      setError('Please verify both email and mobile number.')
      return
    }

    if (passwordError) {
      setError('Please fix the password errors before submitting.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { confirmPassword, ...userData } = formData
      await axios.post(`${baseURl}/website-users/signup`, userData)
      alert('Registration Successful!')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const [showAuthButtons, setShowAuthButtons] = useState(true)
  useEffect(() => {
    const onScroll = () => setShowAuthButtons(window.scrollY <= 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className='bg-white min-h-screen flex flex-col justify-between overflow-hidden'>
      <SocialLinks className='hidden lg:block' />
      {/* Navbars and Auth Buttons */}
      <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
        <AnimatePresence>
          {showAuthButtons && (
            <motion.div
              initial={{ opacity: 1, y: 40, x: -50 }}
              exit={{ opacity: 0, y: -50, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AuthFloatingButtons />
            </motion.div>
          )}
        </AnimatePresence>
        <div className='flex items-center justify-end lg:justify-end xl:justify-center px-2 py-2'>
          <Navbar className='hidden lg:block' />
          <NavbarDemo />
        </div>
      </div>
      <div className='fixed left-1 -top-2 z-50000 lg:hidden'>
        <Navbar />
      </div>
      <div className='fixed top-4 right-4 z-50 max-w-[90%] sm:max-w-none lg:hidden'>
        <Example />
      </div>
      {showAuthButtons && (
        <div className='block lg:hidden'>
          <AuthFloatingButtons />
        </div>
      )}
      <ScrollButtons />

      <main className='flex-grow flex items-center justify-center mt-5 pt-15 lg:mt-10 lg:pt-30 pb-10 px-4'>
        <div className='w-full max-w-2xl bg-blue-950 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl shadow-orange-300'>
          <div className='text-2xl md:text-3xl font-semibold text-center text-orange-400 font-INB mb-6'>
            Create Account
          </div>
          <form onSubmit={handleSubmit} className='max-w-xl mx-auto space-y-6'>
            {/* Name */}
            <div>
              <label className='block mb-1 font-medium text-white'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-[12px]  border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all duration-200 bg-white text-black'
              />
            </div>

            {/* Email + OTP */}
            <div>
              <label className='block mb-1 font-medium text-white'>Email</label>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  disabled={emailOtpVerified}
                  required
                  className='w-full px-4 py-2 rounded-[12px] border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all duration-200 bg-white text-black'
                />
                {!emailOtpVerified && (
                  <button
                    type='button'
                    onClick={sendEmailOtp}
                    disabled={sendingEmailOtp}
                    className='bg-orange-500 text-white px-4 py-2 rounded-[12px] hover:bg-orange-600 text-sm whitespace-nowrap transition-all duration-150'
                  >
                    {sendingEmailOtp ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>

              {emailOtpSent && !emailOtpVerified && (
                <div className='grid grid-cols-2 gap-2 items-center mt-2'>
                  <input
                    placeholder='Enter OTP'
                    value={emailOtp}
                    onChange={e => setEmailOtp(e.target.value)}
                    className='w-full px-4 py-2 rounded-[12px] border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200 bg-white text-black'
                  />
                  <button
                    type='button'
                    onClick={verifyEmailOtp}
                    disabled={verifyingEmailOtp}
                    className='bg-green-500 text-white px-4 py-2 rounded-[12px] hover:bg-green-600 text-sm whitespace-nowrap transition-all duration-150'
                  >
                    {verifyingEmailOtp ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              )}

              {emailOtpError && (
                <p className='text-sm text-red-500 mt-1'>{emailOtpError}</p>
              )}
            </div>

            {/* Mobile + OTP */}
            <div>
              <label className='block mb-1 font-medium text-white'>
                Mobile
              </label>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='text'
                  name='contact'
                  value={formData.contact}
                  onChange={handleChange}
                  disabled={mobileOtpVerified}
                  required
                  className='w-full px-4 py-2 rounded-[12px] border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all duration-200 bg-white text-black'
                />
                {!mobileOtpVerified && (
                  <button
                    type='button'
                    onClick={sendMobileOtp}
                    disabled={sendingMobileOtp}
                    className='bg-orange-500 text-white px-4 py-2 rounded-[12px] hover:bg-orange-600 text-sm whitespace-nowrap transition-all duration-150'
                  >
                    {sendingMobileOtp ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>

              {mobileOtpSent && !mobileOtpVerified && (
                <div className='grid grid-cols-2 gap-2 items-center mt-2'>
                  <input
                    placeholder='Enter OTP'
                    value={mobileOtp}
                    onChange={e => setMobileOtp(e.target.value)}
                    className='w-full px-4 py-2 rounded-[12px] border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200 bg-white text-black'
                  />
                  <button
                    type='button'
                    onClick={verifyMobileOtp}
                    disabled={verifyingMobileOtp}
                    className='bg-green-500 text-white px-4 py-2 rounded-[12px] hover:bg-green-600 text-sm whitespace-nowrap transition-all duration-150'
                  >
                    {verifyingMobileOtp ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              )}

              {mobileOtpError && (
                <p className='text-sm text-red-500 mt-1'>{mobileOtpError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className='block mb-1 font-medium text-white'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-[12px] border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all duration-200 bg-white text-black'
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block mb-1 font-medium text-white'>
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-[12px] border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all duration-200 bg-white text-black'
              />
              {passwordError && (
                <p className='text-sm text-red-500 mt-1'>{passwordError}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className='text-sm text-red-600 text-center font-medium'>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={
                loading ||
                passwordError ||
                !emailOtpVerified ||
                !mobileOtpVerified
              }
              className='w-full py-2 bg-orange-600 text-white rounded-[12px] font-semibold hover:bg-orange-700 disabled:opacity-60 transition duration-150'
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            {/* Login Link */}
            <p className='text-sm text-center text-gray-300 mt-4'>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/LoginRegisterUser')}
                className='text-orange-400 hover:text-orange-500 underline cursor-pointer'
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </section>
  )
}
