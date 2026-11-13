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

function MobileApplication() {
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
        <title>Mobile App Development | Android & Custom Solutions | Pisoft</title>
        <meta
          name='description'
          content='Pisoft Informatics offers mobile app development services and custom software solutions. See how we can deliver scalable apps for e-commerce or health. We are loading your success!'
        />
        <meta
          name='keywords'
          content='mobile app development Mohali, Android app development, custom mobile apps, social media app development, e-commerce apps, healthcare mobile apps, education app development, on-demand app development, software development company Mohali, services, loading, pisoft, software, solutions, erp, informatics, how'
        />
        <meta
          property='og:title'
          content='Mobile App Development | Android & Custom Solutions | Pisoft'
        />
        <meta
          property='og:description'
          content='Pisoft Informatics offers mobile app development services and custom software solutions. See how we can deliver scalable apps for e-commerce or health. We are loading your success!'
        />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/MobileApplications'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/MobileApplications'
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
            MOBILE APPLICATION
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

            {/* ✅ Flex row: Navbar + NavbarDemo */}
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
                  "url('/MobileApplication.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            ></div>
            {/* <div className="absolute inset-0 bg-gradient-to-r from-sky-200/30 via-white/10 to-sky-200/30"></div> */}
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
                text='MOBILE APPLICATION DEVELOPMENT'
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
                  imageSrc='/MobileApplication2.webp'
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
                  As a top Android app development company, we specialize in
                  delivering custom mobile applications that drive business
                  growth and improve user engagement. Our expertise includes
                  developing scalable Android apps with Kotlin, Java, and
                  integrating cutting-edge technologies such as AI, machine
                  learning, and cloud services.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  We focus on creating high-performance Android applications
                  optimized for various devices including smartphones, tablets,
                  wearables, and Android TV. Our development process
                  incorporates agile methodologies, ensuring timely delivery and
                  continuous improvement.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  Leveraging Android Jetpack libraries, Material Design
                  principles, and Firebase backend services, we build intuitive
                  user interfaces and robust backend integrations. Whether you
                  need enterprise-grade business apps, e-commerce platforms, or
                  IoT solutions, our Android development services are tailored
                  to meet your unique needs.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  Partner with our experienced Android developers to transform
                  your app ideas into reality. Our focus on user-centric design,
                  seamless performance, and ongoing maintenance ensures your app
                  stands out in the competitive market.
                </p>
              </motion.div>
            </div>
          </section>

          {/* <ClientProjects filterCategory="App" /> */}

          <div className='flex justify-center items-center'>
            <div className='flex flex-wrap max-w-[80vw] justify-center gap-8 m-8'>
              {/* Custom App Development */}
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
                  Custom App Development
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Native Android apps using Kotlin</li>
                  <li>Jetpack, MVVM architecture</li>
                  <li>Scalable backend integration</li>
                  <li>Optimized for performance</li>
                </ul>
              </motion.div>

              {/* Social Media Applications */}
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
                  Social Media Applications
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Real-time messaging & notifications</li>
                  <li>Media sharing (images, videos, reels)</li>
                  <li>Custom feeds, likes & comments</li>
                  <li>Follower/following system</li>
                </ul>
              </motion.div>

              {/* E-Commerce Applications */}
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
                  E-Commerce Applications
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Product catalogs & categories</li>
                  <li>Cart & secure checkout</li>
                  <li>Payment gateway integration</li>
                  <li>Order tracking & management</li>
                </ul>
              </motion.div>

              {/* Healthcare & Fitness Apps */}
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
                  Healthcare & Fitness Apps
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Appointment booking & reminders</li>
                  <li>Workout tracking & meal plans</li>
                  <li>Health metrics monitoring</li>
                  <li>Secure health record storage</li>
                </ul>
              </motion.div>

              {/* Education & eLearning Apps */}
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
                  Education & eLearning Apps
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Video streaming & lesson modules</li>
                  <li>Quiz & test systems</li>
                  <li>Progress tracking dashboards</li>
                  <li>Push notifications & reminders</li>
                </ul>
              </motion.div>

              {/* On-Demand Service Apps */}
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
                  On-Demand Service Apps
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Service provider & user dashboards</li>
                  <li>Location-based bookings</li>
                  <li>Real-time tracking & status updates</li>
                  <li>Secure payments & reviews</li>
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

export default MobileApplication
