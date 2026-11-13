import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { Example } from '../components/Corn'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavbarDemo } from '../components/navbar/Navbar2'
import { motion, AnimatePresence } from 'framer-motion'
import TiltedCard from '../components/tiltedCard'
import BlurText from '../components/BlurText'
import ScrollButtons from '../components/TopBottomButtons'
import { Helmet } from 'react-helmet'
import ClientProjects from '../components/ClientProjects'

gsap.registerPlugin(ScrollTrigger)

function WebPortals() {
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const introRef = useRef(null)
  const heroRef = useRef(null)

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

  return (
    <main className='overflow-x-hidden max-w-screen'>
      <Helmet>
        <title>Portals Development | Enterprise & B2B Solutions | Pisoft</title>
        <meta
          name='description'
          content='Pisoft Informatics delivers secure, scalable portal development services. Enhance user engagement, streamline communication, and empower clients or employees with custom portal solutions.'
        />
        <meta
          name='keywords'
          content='portal development, enterprise portals, customer self-service portal, vendor portals, B2B portals, employee intranet portals, custom web applications, Pisoft Informatics Mohali'
        />
        <meta
          property='og:title'
          content='portal Development | Custom Enterprise Portals | Pisoft'
        />
        <meta
          property='og:description'
          content='Transform your organizational interactions with custom portals by Pisoft Informatics. Build secure, interactive, and high-performance portal solutions.'
        />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/WebPortals'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/WebPortals'
        />
      </Helmet>

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
            Portals
          </motion.h1>
        </div>
      )}

      {introComplete && (
        <>
          {/* Navbar + Auth Buttons */}
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

            <div
              className={`
          flex items-center 
          justify-end lg:justify-end xl:justify-center
          py-1
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

          <section className='relative h-[50vh] md:h-[75vh] overflow-hidden'>
            {/* Background */}
            <div
              className='absolute inset-0 bg-cover bg-center lg:mt-35'
              style={{
                backgroundImage:
                  "url('/WebApplication.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            ></div>
          </section>

          {/* Content */}
          <div className='relative z-10 flex items-center justify-center h-full px-4 mb-3 lg:mb-6'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 15 }}
              transition={{ duration: 1 }}
              className='relative text-center'
            >
              <BlurText
                text='PORTAL DEVELOPMENT'
                delay={200}
                animateBy='words'
                direction='top'
                className='mt-5 font-INB text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-blue-950 drop-shadow-md'
              />
            </motion.div>
          </div>

          <section className='py-10 px-6 md:px-5'>
            <div className='max-w-7xl mx-auto gap-4 grid lg:grid-cols-3 items-center'>
              <div className='hidden lg:flex mx-auto'>
                <TiltedCard
                  imageSrc='/WebApplication2.webp'
                  containerHeight='300px'
                  containerWidth='280px'
                  imageHeight='300px'
                  imageWidth='350px'
                  rotateAmplitude={12}
                  scaleOnHover={1.15}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                />
              </div>
              <motion.div
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className='text-blue-950 space-y-4 md:space-y-6 col-span-2'
              >
                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-6'>
                  As a custom portal development company, we specialize in 
                  delivering dynamic, secure, and interactive digital gateways that unify 
                  data, simplify communications, and enhance user engagement across 
                  your enterprise network.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  We design high-performance portals tailored for diverse user bases—including 
                  customers, vendors, employees, and business partners. Our portals offer seamless 
                  single sign-on (SSO), advanced access controls, and smooth API integrations with 
                  your existing back-office systems.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  Utilizing modern frontend frameworks, cloud technologies, and robust database 
                  architectures, we create self-service capabilities, interactive reporting dashboards, 
                  and real-time data synchronization. Whether you need a customer self-service portal, 
                  a vendor management system, or an employee intranet, our platforms scale effortlessly.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  Partner with our experienced engineering team to modernize your web interactions. 
                  Our emphasis on responsive UI design, multi-tenant security, fast rendering, and ongoing 
                  maintenance ensures your portal delivers an exceptional digital experience.
                </p>
              </motion.div>
            </div>
          </section>

          {/* <ClientProjects filterCategory="Portal" /> */}

          <div className='flex justify-center items-center'>
            <div className='flex flex-wrap max-w-[80vw] justify-center gap-8 m-8'>
              {/* Enterprise & Intranet Portals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className='bg-pink-100 rounded-3xl p-8 w-80'
              >
                <div className='text-xl md:text-2xl font-INB mb-4 text-blue-950'>
                  Enterprise Intranet Portals
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Internal employee communication hub</li>
                  <li>Document management & sharing</li>
                  <li>Centralized internal announcements</li>
                  <li>Workflow & task tracking tools</li>
                </ul>
              </motion.div>

              {/* Customer Self-Service Portals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className='bg-blue-100 rounded-3xl p-8 w-80'
              >
                <div className='text-xl md:text-2xl font-INB mb-4 text-blue-950'>
                  Customer Self-Service
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Account management & profile dashboards</li>
                  <li>Helpdesk ticket tracking & knowledgebase</li>
                  <li>Automated billing & statement downloads</li>
                  <li>Interactive service requests</li>
                </ul>
              </motion.div>

              {/* B2B & Vendor Portals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className='bg-green-50 rounded-3xl p-8 w-80'
              >
                <div className='text-xl md:text-2xl font-INB mb-4 text-blue-950'>
                  Vendor & Partner Portals
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Procurement & purchase order submission</li>
                  <li>Invoice submission & status tracking</li>
                  <li>Partner performance analytics</li>
                  <li>Secure document exchange</li>
                </ul>
              </motion.div>

              {/* E-Learning & Student Portals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className='bg-orange-100 rounded-3xl p-8 w-80'
              >
                <div className='text-xl md:text-2xl font-INB mb-4 text-blue-950'>
                  E-Learning & Education
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Course access & assignment tracking</li>
                  <li>Student gradebooks & attendance</li>
                  <li>Resource downloads & library portal</li>
                  <li>Live session links & schedules</li>
                </ul>
              </motion.div>

              {/* Patient & Healthcare Portals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className='bg-indigo-100 rounded-3xl p-8 w-80'
              >
                <div className='text-xl md:text-2xl font-INB mb-4 text-blue-950'>
                  Healthcare & Patient Portals
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Appointment scheduling & reminders</li>
                  <li>Medical record & lab result access</li>
                  <li>Secure doctor-patient messaging</li>
                  <li>Online prescription management</li>
                </ul>
              </motion.div>

              {/* Community & Membership Portals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.4 }}
                className='bg-purple-100 rounded-3xl p-8 w-80'
              >
                <div className='text-xl md:text-2xl font-INB mb-4 text-blue-950'>
                  Membership & Community
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Subscription management & renewals</li>
                  <li>Member directories & discussion forums</li>
                  <li>Exclusive content & resource access</li>
                  <li>Event registration & ticketing</li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  )
}

export default WebPortals