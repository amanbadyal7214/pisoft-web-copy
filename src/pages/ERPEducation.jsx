import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Example } from '../components/Corn'
import Footer from '../components/Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TypewriterEffectSmoothDemo } from '../components/Education/Text'
import { FollowingPointerDemo } from '../components/Education/FloatingPointer'
import { TypewriterEffect } from '../components/Finance/text2'
import { LayoutGridDemo } from '../components/Education/EDGrid'
import BlurText from '../components/BlurText'
import { ContainerScroll } from '../components/conatinerScroll'
import Threads from '../components/threads'
import { NavbarDemo } from '../components/navbar/Navbar2'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import { Helmet } from 'react-helmet'
import {useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function ERPEducation() {
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  const introRef = useRef(null)

  const sectionRefs = {
    type1: useRef(null),
    grid: useRef(null),
    type2: useRef(null),
    pointer: useRef(null)
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  useEffect(() => {
    gsap.fromTo(
      introRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 3,
        duration: 1.4,
        ease: 'power3.inOut',
        onComplete: () => setIntroComplete(true)
      }
    )
  }, [])

  const navigate = useNavigate();


  return (
    <main className='overflow-x-hidden max-w-screen'>
      <Helmet>
        <title>
          SCHOOL MANAGEMENT SYSTEM (SMS) | School & College Management Software | Pisoft
          Informatics | Cloud ERP Solutions
        </title>
        <meta
          name='description'
          content='SMS by Pisoft Informatics is a cloud-based education ERP designed for schools, colleges, and universities. Automate attendance, fee management, exams, communication, and academic workflows with a secure and user-friendly platform. Trusted education software provider in Mohali, Punjab, and across India.'
        />
        <meta
          name='keywords'
          content='education ERP, school management software, college ERP, university ERP system, cloud ERP for education, academic management software, attendance management system, fee collection software, exam scheduling ERP, custom ERP solutions India'
        />
        <meta
          property='og:title'
          content='Education ERP (SMS) | School & College Management Software | Pisoft Informatics | Cloud ERP Solutions'
        />
        <meta
          property='og:description'
          content='SMS by Pisoft Informatics enables schools, colleges, and universities to automate attendance, fees, exams, and communication. A cloud-based ERP solution trusted in Mohali, Punjab, and India.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/ERPservices/Education'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/ERPservices/Education'
        />
      </Helmet>

      <SocialLinks className='hidden lg:block' />

      {/* Intro Overlay */}
      {!introComplete && (
        <div
          ref={introRef}
          className='fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-br from-orange-200 via-white to-sky-200'
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-orange-400 drop-shadow-xl'
          >
            (SMS)
          </motion.h1>
        </div>
      )}

      {introComplete && (
        <div className='bg-white w-full overflow-x-hidden relative'>
          {/* Fixed Auth + Navbar */}
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

            <div className='flex items-center justify-center'>
              <Navbar className='hidden lg:block' />
              <NavbarDemo />
            </div>
          </div>

          {/* Mobile Navbar + Example + Auth */}
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

          {/* Hero Section */}
          <section className='relative h-[50vh] md:h-[70vh] overflow-hidden'>
            <div
              className='absolute inset-0 bg-cover bg-center lg:mt-35'
              style={{
                backgroundImage:
                  "url('/Education.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
          </section>

          {/* Intro Text */}
          <div className='relative z-10 flex items-center justify-center h-full px-4 mb-3 lg:mb-6'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 15 }}
              transition={{ duration: 1 }}
              className='relative text-center'
            >
              <h1>
                <BlurText
                  text='SCHOOL MANAGEMENT SYSTEM (SMS)'
                  delay={200}
                  animateBy='words'
                  direction='top'
                  className='mt-5 font-INB text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-950 drop-shadow-md'
                />
              </h1>
            </motion.div>
          </div>

          {/* About */}
          <div className='pt-10 md:pb-5 sm:pb-5 sm:px-6 md:px-12'>
            <div className='flex flex-wrap justify-left gap-2 px-4 text-justify'>
              <p className='font-in text-base sm:text-base md:text-md lg:text-lg font-normal leading-loose text-blue-950'>
                PisoftERP is a robust, cloud-based education management system
                developed by our expert software team in Mohali. Designed
                specifically for schools, colleges, and universities, this
                scalable ERP platform automates and simplifies core academic and
                administrative processes. From real-time attendance tracking and
                exam scheduling to fee management and communication between
                students, teachers, and parents, PisoftERP delivers a seamless,
                centralized solution that enhances operational efficiency and
                supports digital transformation in education institutions across
                Punjab and India.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex justify-center items-center mb-5 mt-4 md:mt-2">
            <motion.button
              onClick={() => navigate("/clientRegister")}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="
      relative px-10 py-4 rounded-full
      bg-gradient-to-r from-orange-400 to-rose-500
      text-white font-black uppercase tracking-widest
      shadow-[0_0_25px_rgba(249,115,22,0.5)]
      hover:shadow-[0_0_35px_rgba(249,115,22,0.6)]
      active:scale-95
      transition-all
    "
            >
              Take a Free Trial
            </motion.button>
          </div>


          {/* Sections */}
          <div ref={sectionRefs.type1} className='px-4 md:px-8 pt-5'>
            <TypewriterEffectSmoothDemo />
          </div>

          <ContainerScroll>
            <section className='w-full flex flex-wrap justify-center items-center text-center px-4 md:px-8 bg-gradient-to-r from-orange-50 via-orange-100 to-sky-200'>
              <LayoutGridDemo />
            </section>
          </ContainerScroll>

          <div ref={sectionRefs.type2} className='px-4 md:px-8'>
            <TypewriterEffect />
          </div>

          <section className='w-full'>
            <Threads color={[0.15, 0.51, 0.831]} />
          </section>

          <div ref={sectionRefs.pointer} className='px-4 md:px-8'>
            <FollowingPointerDemo />
          </div>

          <footer className='w-screen z-10'>
            <Footer />
          </footer>
        </div>
      )}
    </main>
  )
}

export default ERPEducation
