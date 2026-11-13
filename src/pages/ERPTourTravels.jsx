import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Example } from '../components/Corn'
import Footer from '../components/Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TypewriterEffectSmoothDemo } from '../components/Education/Text'
import { FollowingPointerDemo } from '../components/Tours&Travels/ToursFloatingPointer'
import { TypewriterEffect } from '../components/Finance/text2'
import { LayoutGridDemo } from '../components/Finance/FiGrid'
import BlurText from '../components/BlurText'
import { ContainerScroll } from '../components/conatinerScroll'
import Threads from '../components/threads'
import { NavbarDemo } from '../components/navbar/Navbar2'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function ERPTourTravels() {
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  const sectionRefs = {
    hero: useRef(null),
    type1: useRef(null),
    grid: useRef(null),
    type2: useRef(null),
    pointer: useRef(null)
  }

  const introRef = useRef(null)

  // Helper hook for array of refs (used for stagger animation)
  function useArrayRef() {
    const r = useRef([])
    r.current = []
    return [r, el => el && r.current.push(el)]
  }

  // Show/hide Auth Buttons on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  // Intro animation on mount
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
        <title>TTSME: Tours & Travel ERP | Booking Management Software | Pisoft</title>
        <meta
          name="description"
          content="TTSME by Pisoft Informatics is a powerful travel ERP solution. Automate bookings, itineraries, and packages. See how our services are loading better travel software solutions."
        />
        <meta
          name="keywords"
          content="tours and travel ERP, travel management software, booking automation, itinerary planning software, travel agency ERP, travel package management, mobile app development Mohali, travel software solutions, business automation for travel agencies, travel CRM software, services, loading, pisoft, software, solutions, erp, informatics, how"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/ERPservices/TourTravels" />
        <link rel="canonical" href="https://Pisoftinformatics.com/ERPservices/TourTravels" />
      </Helmet>

      <SocialLinks className='hidden lg:block' />

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
            (TTSME)
          </motion.h1>
        </div>
      )}

      {introComplete && (
        <div className='bg-white w-full overflow-x-hidden'>
          {/* Auth buttons + Navbar (desktop) */}
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

            <div className='flex items-center justify-center lg:justify-center xl:justify-center'>
              <Navbar className='hidden lg:block' />
              <NavbarDemo />
            </div>
          </div>

          {/* Navbar mobile */}
          <div className='fixed left-1 -top-2 z-50000 lg:hidden'>
            <Navbar />
          </div>

          {/* Example button on mobile */}
          <div className='fixed top-4 right-4 z-50 max-w-[90%] sm:max-w-none lg:hidden'>
            <Example />
          </div>

          {/* Auth buttons mobile */}
          {showAuthButtons && (
            <div className='block lg:hidden'>
              <AuthFloatingButtons />
            </div>
          )}

          {/* Scroll buttons */}
          <ScrollButtons />

          {/* Hero Section */}
          <section
            className='relative h-[50vh] md:h-[70vh] overflow-hidden'
          >
            <div
              className='absolute inset-0 bg-cover bg-center lg:mt-35'
              style={{
                backgroundImage:
                  "url('/Tour.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
          </section>

          {/* Hero Title */}
          <div className='relative z-10 flex items-center justify-center px-4 mb-3 lg:mb-6'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 15 }}
              transition={{ duration: 1 }}
              className='relative text-center'
            >
              <h1>
                <BlurText
                  text='TOURS AND TRAVEL SYSTEM MANAGEMENT ERP (TTSME)'
                  delay={200}
                  animateBy='words'
                  direction='top'
                  className='mt-5 font-INB text-2xl sm:text-2xl md:text-3xl lg:text-3xl text-blue-950 drop-shadow-md'
                />
              </h1>
            </motion.div>
          </div>

          {/* Description */}
          <div className='pt-10 md:pb-5 sm:pb-5 sm:px-6 md:px-12'>
            <div className='flex flex-wrap justify-left gap-2 px-4 text-justify'>
              <p className='font-in text-base sm:text-base md:text-md lg:text-lg font-normal leading-loose text-blue-950'>
                Our Tour and Travels Management System is a user-friendly,
                efficient solution created by our web & mobile app development
                team, designed to automate and streamline the entire travel
                business process. From managing bookings, itineraries, and
                customer profiles to handling payments, cancellations, and
                package customization, this system covers all aspects of travel
                management. It helps travel agencies provide seamless services
                by simplifying reservation management, generating travel
                documents, and offering real-time updates on travel schedules.
                With integrated reporting and analytics, businesses can enhance
                customer satisfaction, optimize resources, and grow their
                operations effortlessly.
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

          {/* Typewriter & Layout */}
          <div ref={sectionRefs.type1} className='px-4 md:px-8 pt-5'>
            <TypewriterEffectSmoothDemo />
          </div>

          <ContainerScroll>
            <section className='w-full text-center px-4 md:px-8 bg-gradient-to-r from-orange-50 via-orange-100 to-sky-200'>
              <LayoutGridDemo />
            </section>
          </ContainerScroll>

          <div ref={sectionRefs.type2} className='px-4 md:px-8'>
            <TypewriterEffect />
          </div>

          {/* Threads animation */}
          <section className='w-full'>
            <Threads color={[0.15, 0.51, 0.831]} />
          </section>

          {/* Following Pointer */}
          <div ref={sectionRefs.pointer} className='px-4 md:px-8 py-8 md:py-12'>
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

export default ERPTourTravels
