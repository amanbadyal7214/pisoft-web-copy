import React, { useEffect, useState, lazy, Suspense, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ScrollToHashElement from '../components/ScrollToHash'
import { baseURl } from '../../baseURL'
import { Example } from '../components/Corn'
import Navbar from '../components/Navbar'
import { NavbarDemo } from '../components/navbar/Navbar2'
import BlurText from '../components/BlurText'
import { Helmet } from 'react-helmet'

const Lanyard = lazy(() => import('../components/About/Lanyard'))
const Tech = lazy(() => import('../components/About/Tech'))
const Stepp = lazy(() => import('../components/About/Stepp'))
const Footer = lazy(() => import('../components/Footer'))
const AuthFloatingButtons = lazy(() =>
  import('../components/AuthFloatingButtons')
)
const Hover = lazy(() => import('../components/About/HoverCertificate'))
const SocialLinks = lazy(() => import('../components/SocialLinks'))
const ScrollButtons = lazy(() => import('../components/TopBottomButtons'))
const WhyUs = lazy(() => import('../components/About/WhyChooseUs'))
const OurValues = lazy(() => import('../components/About/Values'))
const OurExpertise = lazy(() => import('../components/About/Expertise'))

function About() {
  const navigate = useNavigate()

  const [showLanyard, setShowLanyard] = useState(false)
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [content, setContent] = useState({
    message: '',
    visions: '',
    missions: ''
  })

  // useEffect(() => {
  //   const onScroll = () => {
  //     const y = window.scrollY
  //     setShowAuthButtons(y <= 100)
  //     setShowLanyard(y <= 240 && window.innerWidth >= 768) // Disable on mobile
  //   }
  //   window.addEventListener('scroll', onScroll, { passive: true })
  //   onScroll() // Initial check
  //   return () => window.removeEventListener('scroll', onScroll)
  // }, [])

  useEffect(() => {
    const cleanHTML = html => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      doc.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'))
      return doc.body.innerHTML
    }

    async function fetchContent() {
      try {
        const endpoints = [
          `${baseURl}/org/about-us/modes/OFFLINE`,
          `${baseURl}/org/our-vision/modes/OFFLINE`,
          `${baseURl}/org/our-mission/modes/OFFLINE`
        ]
        const [aboutRes, visionRes, missionRes] = await Promise.all(
          endpoints.map(url => fetch(url))
        )
        const [aboutHTML, visionHTML, missionHTML] = await Promise.all([
          aboutRes.text(),
          visionRes.text(),
          missionRes.text()
        ])
        setContent({
          message: aboutHTML,
          visions: cleanHTML(visionHTML),
          missions: cleanHTML(missionHTML)
        })
      } catch (error) {
        console.error(error)
        setContent({
          message: '<p>Failed to load content.</p>',
          visions: '',
          missions: ''
        })
      }
    }

    fetchContent()
  }, [])

  const handleApplyClick = () => navigate('/applyforInternship')

  const memoizedMessage = useMemo(() => {
    return content.message
      .split('\n')
      .map((line, idx) => (
        <div
          key={idx}
          className='font-in text-base text-justify leading-relaxed sm:text-sm md:text-md lg:text-xl'
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))
  }, [content.message])

  return (
    <>
      <Helmet>
        <title>Pisoft Informatics: About Us | Custom Software & ERP Solutions</title>
        <meta
          name='description'
          content='Pisoft Informatics delivers custom software, web, and mobile app solutions. Learn how our IT services and ERP expertise are loading businesses for success.'
        />
        <meta
          name='keywords'
          content='Pisoft Informatics, IT company India, software development, custom software solutions, web development, mobile app development, business technology, digital transformation, IT consulting, tech company, services, loading, pisoft, software, solutions, erp, informatics, how'
        />
        <meta property='og:url' content='https://Pisoftinformatics.com/about' />
        <link rel='canonical' href='https://Pisoftinformatics.com/about' />
      </Helmet>

      <ScrollToHashElement />
      <Suspense fallback={null}>
        <SocialLinks className='hidden lg:block' />
      </Suspense>

      <main className='w-full overflow-hidden p-2 lg:p-4'>
        <div className='w-full flex flex-col bg-white relative'>
          {/* Navbar */}
          <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
            <AnimatePresence>
              {showAuthButtons && (
                <motion.div
                  initial={{ opacity: 1, y: 40 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Suspense fallback={null}>
                    <AuthFloatingButtons />
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>

            <div className='flex items-center justify-center'>
              <Navbar className='hidden lg:block' />
              <NavbarDemo />
            </div>
          </div>

          {/* Mobile Nav & Floating Btn */}
          <div className='fixed left-1 -top-2 z-50 lg:hidden'>
            <Navbar />
          </div>
          <div className='fixed top-4 right-4 z-50 max-w-[90%] sm:max-w-none lg:hidden'>
            <Example />
          </div>
          {showAuthButtons && (
            <div className='block lg:hidden'>
              <Suspense fallback={null}>
                <AuthFloatingButtons />
              </Suspense>
            </div>
          )}

          {/* Scroll buttons */}
          <Suspense fallback={null}>
            <ScrollButtons />
          </Suspense>

          {/* Lanyard animation (only desktop) */}
          <AnimatePresence>
            {showLanyard && (
              <motion.div
                className='absolute right-0  top-0 w-full md:w-1/2 lg:w-1/3 z-1 bg-transparent'
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6 }}
              >
                <Suspense fallback={null}>
                  <Lanyard position={[0, 0, 25]} gravity={[0, -50, 0]} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          {/* About Us */}
          <section
            id='about-us'
            className='min-h-auto max-w-[2000px] mx-auto relative z-10 px-4 pt-6'
          >
            <Suspense fallback={null}>
              <BlurText
                text='Bringing Ideas to Life'
                delay={200}
                animateBy='words'
                direction='top'
                className='mt-14 lg:mt-30 font-INB text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-950'
              />
              <h1>
                <BlurText
                  text='About Us'
                  delay={200}
                  animateBy='words'
                  direction='top'
                  className='mt-6 font-INB text-2xl sm:text-3xl md:text-4xl text-[#F07C22]'
                />
              </h1>
            </Suspense>

            <div className='mt-4 text-gray-800 font-in text-base leading-relaxed tracking-wider'>
              {memoizedMessage || (
                <p>
                  Founded in 2016, Pisoft Informatics was born
                  out of a vision to bridge the gap between technology and
                  business. Our team of experts brings decades of experience in
                  delivering cutting-edge IT solutions tailored to the unique
                  needs of our clients. From software development to ERP
                  solutions, we have built a reputation for quality,
                  reliability, and customer satisfaction.
                  <br />
                  <br />
                  At Pisoft Informatics, we are passionate about
                  harnessing the power of technology to drive innovation and
                  growth. As a leading IT solutions provider, we help businesses
                  and organizations thrive in the digital age.
                </p>
              )}
            </div>
          </section>

          {/* Lazy-load below-the-fold sections */}
          <Suspense className='z-20' fallback={null}>
            <Tech />
          </Suspense>

          <Suspense fallback={<div>Loading ...</div>}>
            <WhyUs />
            <OurValues />
            <OurExpertise />
          </Suspense>

          <div className='flex justify-center items-center'>
            <Suspense fallback={null}>
              <Stepp />
            </Suspense>
          </div>
          
          {/* Vision & Mission */}
          <section className='w-screen flex flex-col items-center justify-center mb-10 text-center overflow-hidden px-4'>
            {/* Vision */}
            <div className='max-w-[110rem] flex flex-col md:flex-row items-center justify-center md:space-x-8'>
              <div
                id='our-vision'
                className='md:w-2/3 text-center md:text-left'
              >
                <Suspense fallback={null}>
                  <BlurText
                    text='Our Vision'
                    delay={200}
                    animateBy='words'
                    direction='top'
                    className='mt-4 mb-5 font-INB text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-950'
                  />
                </Suspense>

                <div className='font-in text-base text-justify leading-relaxed sm:text-sm md:text-md lg:text-xl'>
                  <div dangerouslySetInnerHTML={{ __html: content.visions }} />
                </div>
              </div>

              <div className='md:w-1/3 hidden md:flex justify-center overflow-hidden rounded-lg aspect-[6/4]'>
                <img
                  src='/vision.webp'
                  loading='lazy'
                  alt='Vision'
                  className='w-full h-full object-contain rounded-lg'
                />
              </div>
            </div>

            {/* Mission */}
            <div className='max-w-[110rem] flex flex-col md:flex-row-reverse items-center justify-center md:space-x-8'>
              <div
                id='our-mission'
                className='md:w-2/3 text-center md:text-left'
              >
                <Suspense fallback={null}>
                  <BlurText
                    text='Our Mission'
                    delay={200}
                    animateBy='words'
                    direction='top'
                    className='mt-16 mb-5 font-INB text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-950'
                  />
                </Suspense>

                <div className='font-in text-base text-justify leading-relaxed sm:text-sm md:text-md lg:text-xl'>
                  <div dangerouslySetInnerHTML={{ __html: content.missions }} />
                </div>
              </div>

              <div className='md:w-1/3 hidden md:flex justify-center overflow-hidden rounded-lg aspect-[6/4]'>
                <img
                  src='/mission.webp'
                  loading='lazy'
                  alt='Mission'
                  className='w-full h-full object-contain rounded-lg'
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className='relative bg-white z-10'>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </footer>
    </>
  )
}

export default About
