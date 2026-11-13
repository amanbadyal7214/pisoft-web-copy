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
import SocialLinks from '../components/SocialLinks'
import { Helmet } from 'react-helmet'
import ClientProjects from '../components/ClientProjects'

gsap.registerPlugin(ScrollTrigger)

function WebApplication() {
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
        <title>
          Web Development Company | Custom Software & ERP Solutions | Pisoft
        </title>
        <meta
          name='description'
          content='Pisoft Informatics is a web development company delivering custom software solutions. See how our services use React/Node.js to load your business with secure, scalable apps.'
        />
        <meta
          property='og:title'
          content='Web Development Company | Custom Software & ERP Solutions | Pisoft'
        />
        <meta
          property='og:description'
          content='Pisoft Informatics is a web development company delivering custom software solutions. See how our services use React/Node.js to load your business with secure, scalable apps.'
        />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/WebApplications'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/WebApplications'
        />
      </Helmet>
      <SocialLinks className='hidden lg:block' />
      {!introComplete && (
        <div
          ref={introRef}
          className='fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-br from-blue-200 via-white to-sky-200'
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-900 drop-shadow-xl'
          >
            WEBSITES
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
          justify-end lg:justify-center xl:justify-center
        `}
            >
              <Navbar className='hidden lg:block' />
              <NavbarDemo />
            </div>
          </div>

          <div className='fixed left-2 top-2 z-50000 lg:hidden'>
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

          <section className='relative h-[50vh] md:h-[70vh] overflow-hidden'>
            {/* Background */}
            <div
              className='absolute inset-0 bg-cover bg-center lg:mt-35'
              style={{
                backgroundImage: "url('/WebApplication.webp')",
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
                text='WEBSITES'
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
                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-6'>
                  As a top web development company in Mohali, we deliver
                  tailor-made web solutions that empower businesses across
                  industries. Our expertise covers front-end and back-end
                  development, e-commerce platforms, CMS integration, and
                  progressive web apps (PWAs) designed to engage users and
                  increase conversions.
                </p>

                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-4'>
                  Utilizing cutting-edge frameworks such as React.js, Next.js,
                  and Node.js, we create responsive, mobile-friendly websites
                  with optimized loading speeds and SEO-friendly architecture.
                  Our team prioritizes clean code, security best practices, and
                  seamless API integrations to ensure your web applications are
                  reliable and scalable.
                </p>

                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-4'>
                  We specialize in custom software development solutions that
                  align with your business goals. Whether you require CRM
                  systems, SaaS platforms, or enterprise applications, our
                  developers combine innovation and agility to deliver software
                  that drives growth and operational efficiency.
                </p>

                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-4'>
                  Partner with us to benefit from full-cycle web development
                  services including UI/UX design, development, testing,
                  deployment, and ongoing maintenance. Our commitment to SEO
                  best practices and accessibility standards ensures your
                  digital presence is competitive and future-proof.
                </p>
              </motion.div>
            </div>
          </section>

          {/* OUR PORTFOLIOS/ PROJECTS / CASE STUDIES.. */}
          {/* <ClientProjects filterCategory="Website" /> */}

          {/* Web Development Services */}
          <div className='flex justify-center items-center'>
            <div className='flex flex-wrap max-w-[80vw] justify-center gap-8 m-8'>
              {/* Custom Web App Development */}
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
                  Custom Web App Development
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Responsive & mobile-friendly UIs</li>
                  <li>React, Angular, or Vue.js</li>
                  <li>Scalable architecture</li>
                  <li>Cross-browser compatibility</li>
                </ul>
              </motion.div>

              {/* E-commerce Solutions */}
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
                  E-commerce Solutions
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Custom storefronts (Shopify, WooCommerce)</li>
                  <li>Payment gateway integration</li>
                  <li>Inventory & order management</li>
                  <li>Secure user authentication</li>
                </ul>
              </motion.div>

              {/* API Development & Integration */}
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
                  API Development & Integration
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>RESTful & GraphQL APIs</li>
                  <li>Secure endpoints with JWT</li>
                  <li>Third-party API integration</li>
                  <li>Node.js, Express, Laravel</li>
                </ul>
              </motion.div>

              {/* Social Application */}
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
                  Social Application
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Real-time messaging & notifications</li>
                  <li>Multimedia sharing & user profiles</li>
                  <li>Community groups & event management</li>
                  <li>Scalable & secure platform architecture</li>
                </ul>
              </motion.div>

              {/* Website Maintenance */}
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
                  Website Maintenance
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Security patching & backups</li>
                  <li>Bug fixes & enhancements</li>
                  <li>Content & feature updates</li>
                  <li>24/7 uptime monitoring</li>
                </ul>
              </motion.div>

              {/* Performance Optimization */}
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
                  Performance Optimization
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Code splitting & lazy loading</li>
                  <li>Image and asset optimization</li>
                  <li>Core Web Vitals improvement</li>
                  <li>PageSpeed Insights compliance</li>
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

export default WebApplication
