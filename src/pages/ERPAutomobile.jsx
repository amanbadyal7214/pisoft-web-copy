import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Example } from '../components/Corn'
import Footer from '../components/Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TypewriterEffectSmoothDemo } from '../components/Education/Text'
import { FollowingPointerDemo } from '../components/Automobile/AutoFloatingPointer'
import { TypewriterEffect } from '../components/Finance/text2'
import { LayoutGridDemo } from '../components/Automobile/AutoGrid'
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

function ERPAutoMobile() {
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const introRef = useRef(null)

  const sectionRefs = {
    hero: useRef(null),
    type1: useRef(null),
    grid: useRef(null),
    type2: useRef(null),
    pointer: useRef(null)
  }

  // Show/Hide Auth Buttons on Scroll
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

  useGSAP(() => {
    Object.values(sectionRefs).forEach(r => {
      if (!r.current) return
      gsap.from(r.current, {
        scrollTrigger: {
          trigger: r.current,
          start: 'top 85%'
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out'
      })
    })
  }, [])

  const navigate = useNavigate();

  return (
    <main className='overflow-x-hidden max-w-screen'>
      <Helmet>
        <title>VWMS:Vehicle Workshop Management System | Pisoft</title>
        <meta
          name='description'
          content='VWMS by Pisoft Informatics is the best ERP solution for vehicle workshops. Automate job cards, billing, and inventory. See how our services are loading better automotive software.'
        />
        <meta
          name='keywords'
          content='automobile ERP, workshop management software, vehicle service automation, automotive business software, ERP for workshops, garage management system, inventory management, billing software, automotive workflow automation, custom ERP India, services, loading, pisoft, software, solutions, erp, informatics, how'
        />
        <meta
          property='og:title'
          content='VWMS: Vehicle Workshop Management System | Pisoft'
        />
        <meta
          property='og:description'
          content='VWMS by Pisoft Informatics is the best ERP solution for vehicle workshops. Automate job cards, billing, and inventory. See how our services are loading better automotive software.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/ERPservices/AutoMobile'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/ERPservices/AutoMobile'
        />
      </Helmet>

      <SocialLinks className='hidden lg:block' />

      {/* Intro screen */}
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
            (VWMS)
          </motion.h1>
        </div>
      )}

      {introComplete && (
        <div className='bg-white w-full overflow-x-hidden'>
          {/* Navbar & Auth Buttons */}
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

            <div className='flex items-center justify-center gap-0'>
              <Navbar className='hidden lg:block' />
              <NavbarDemo />
            </div>
          </div>

          {/* Mobile Navbar + Example */}
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
                  "url('/AutoMobile.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
          </section>

          {/* Title */}
          <div className='relative z-10 flex items-center justify-center h-full px-4 mb-3 lg:mb-6'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 15 }}
              transition={{ duration: 1 }}
              className='relative text-center'
            >
              <BlurText
                text='VEHICLE WORKSHOP MANAGEMENT SYSTEM  (VWMS)'
                delay={200}
                animateBy='words'
                direction='top'
                className='mt-5 font-INB text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-950 drop-shadow-md'
              />
            </motion.div>
          </div>

          {/* Description */}
          <div className='pt-10 md:pb-5 sm:pb-5 sm:px-6 md:px-12'>
            <div className='flex flex-wrap justify-left gap-2 px-4 text-justify'>
              <p className='font-in text-base sm:text-base md:text-md lg:text-lg font-normal leading-loose text-blue-950'>
                VWMS, our cutting-edge Vehicle Workshop Management System
                developed by Pisoft Informatics in Punjab, offers a
                comprehensive digital solution to automate and streamline daily
                operations of vehicle service centers. This all-in-one platform
                simplifies job card management, inventory control, billing, and
                customer service workflows—eliminating manual paperwork and
                accelerating service delivery. Tailored specifically for
                automotive workshops and mechanical service providers, VWMS
                empowers businesses to enhance operational efficiency, improve
                customer satisfaction, and drive growth through intuitive,
                centralized software.
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

          {/* Features Sections */}
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

          <div ref={sectionRefs.pointer} className='px-4 md:px-8 py-8 md:py-12'>
            <FollowingPointerDemo />
          </div>

          <footer className='relative z-10'>
            <Footer />
          </footer>
        </div>
      )}
    </main>
  )
}

export default ERPAutoMobile
