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

function ERPSolution() {
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
        <title>ERP Solutions | Custom Enterprise Resource Planning | Pisoft</title>
        <meta
          name='description'
          content='Pisoft Informatics offers enterprise-grade ERP solutions designed to streamline operations, automate workflows, optimize supply chain management, and improve business efficiency.'
        />
        <meta
          name='keywords'
          content='ERP software, custom ERP development, enterprise resource planning, HRMS ERP, supply chain management, inventory management system, finance management, cloud ERP, software company Mohali, Pisoft Informatics'
        />
        <meta
          property='og:title'
          content='Custom Enterprise ERP Solutions | Pisoft Informatics'
        />
        <meta
          property='og:description'
          content='Transform your organization with custom ERP solutions from Pisoft Informatics. Streamline workflows, unify business data, and boost overall efficiency.'
        />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/ERPSolutions'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/ERPSolutions'
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
            ERP Solutions
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
                text='ERP Solutions'
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
                  As a leading provider of custom Enterprise Resource Planning (ERP) software, 
                  we deliver unified management systems that streamline complex business processes, 
                  enhance productivity, and accelerate growth across your entire organization.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  We build robust ERP solutions tailored to your operational workflows—spanning 
                  finance, human resources, supply chain, inventory, procurement, and customer 
                  relationship management. Our scalable architectures ensure smooth integrations 
                  with your existing software ecosystem.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  Leveraging modern cloud infrastructures, real-time analytics engines, and granular 
                  role-based security models, we empower decision-makers with live operational visibility. 
                  Whether you require an enterprise-wide cloud ERP, modular automation, or complex database 
                  consolidations, our engineering ensures high stability and speed.
                </p>

                <p className='text-lg md:text-lg font-in leading-relaxed text-justify mt-4'>
                  Partner with our ERP domain specialists to eliminate data silos, eliminate manual bottlenecks, 
                  and future-proof your organizational management. With continuous maintenance and dedicated support, 
                  your enterprise stays agile and scalable.
                </p>
              </motion.div>
            </div>
          </section>

          {/* <ClientProjects filterCategory="ERP" /> */}

          <div className='flex justify-center items-center'>
            <div className='flex flex-wrap max-w-[80vw] justify-center gap-8 m-8'>
              {/* Custom ERP Development */}
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
                  Custom ERP Development
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Tailored modular software modules</li>
                  <li>Scalable cloud/on-prem deployment</li>
                  <li>Role-based access control</li>
                  <li>Legacy database migration</li>
                </ul>
              </motion.div>

              {/* Supply Chain & Inventory Management */}
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
                  Supply Chain & Inventory
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Automated stock & warehouse tracking</li>
                  <li>Vendor & purchase order management</li>
                  <li>Demand forecasting algorithms</li>
                  <li>Logistics & fleet monitoring</li>
                </ul>
              </motion.div>

              {/* Human Resource Management (HRMS) */}
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
                  Human Capital Management
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Automated payroll & tax processing</li>
                  <li>Employee attendance & leave tracking</li>
                  <li>Performance appraisal systems</li>
                  <li>Recruitment & onboarding portals</li>
                </ul>
              </motion.div>

              {/* Financial & Accounting ERP */}
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
                  Financial & Accounting
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>General ledger & automated billing</li>
                  <li>Tax compliance & auditing tools</li>
                  <li>Budgeting & expense management</li>
                  <li>Real-time financial analytics</li>
                </ul>
              </motion.div>

              {/* CRM & Sales Integration */}
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
                  CRM & Sales Automation
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Lead pipeline & deal management</li>
                  <li>Customer ticketing & support desk</li>
                  <li>Sales force automation</li>
                  <li>Automated quote & invoice generation</li>
                </ul>
              </motion.div>

              {/* Business Intelligence & Dashboards */}
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
                  Business Intelligence
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Custom executive KPI dashboards</li>
                  <li>Predictive data analytics</li>
                  <li>Automated schedule reporting</li>
                  <li>Cross-departmental data visualization</li>
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

export default ERPSolution