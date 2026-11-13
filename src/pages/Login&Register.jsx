import React, { useState } from 'react'
import { NavbarDemo } from '../components/navbar/Navbar2'
import { Example } from '../components/Corn'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import { baseURl } from '../../baseURL'

export default function LoginRegisterUser () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        `${baseURl}/website-users/signin`,
        formData
      )
      alert('Login Successful!')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const [showAuthButtons, setShowAuthButtons] = useState(true)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setShowAuthButtons(false)
  //     } else {
  //       setShowAuthButtons(true)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <section className='overflow-hidden bg-white min-h-screen flex flex-col justify-between'>
      <SocialLinks className='hidden lg:block' />
      {/* === Navbar === */}
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

        {/* ✅ Flex row: Navbar + NavbarDemo */}
        <div
          className={`
      flex items-center 
      justify-end lg:justify-end xl:justify-center
      px-2 py-2
    `}
        >
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

      <div>
        <ScrollButtons />
      </div>

      {/* === Login Form === */}
      <main className='flex-grow flex items-center justify-center mt-5 pt-15 lg:mt-10 lg:pt-30 pb-10 px-4'>
        <div className=' backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-md shadow-2xl bg-blue-950 shadow-blue-950'>
          <div className='text-2xl md:text-3xl font-INB text-center text-orange-400 mb-6 '>
            Login
          </div>

          <form onSubmit={handleSubmit} className='space-y-5 max-w-md mx-auto'>
            {/* Email */}
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='email'
                className='text-sm text-orange-300 font-in'
              >
                Email<span className='text-red-500'> *</span>
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='h-8 px-3 py-1 text-sm border border-orange-300 rounded-md bg-white text-black 
                 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 
                 transition-all duration-200 shadow-sm'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='password'
                className='text-sm text-orange-300 font-in'
              >
                Password<span className='text-red-500'> *</span>
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='h-8 px-3 py-1 text-sm border border-orange-300 rounded-md bg-white text-black 
                 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 
                 transition-all duration-200 shadow-sm'
              />
            </div>

            {/* Error message */}
            {error && (
              <p className='text-sm text-red-500 text-center'>{error}</p>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full h-10 text-sm font-in rounded-md text-white 
               bg-gradient-to-r from-orange-500 to-orange-400 
               hover:from-orange-600 hover:to-orange-500 
               transition-all shadow-lg hover:scale-105 disabled:opacity-60'
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            {/* Register link */}
            <p className='text-sm text-center text-orange-300 font-in mt-4'>
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/RegisterUser')}
                className='text-yellow-400 underline cursor-pointer hover:text-orange-500'
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </main>

      {/* === Footer === */}
      <Footer />
    </section>
  )
}