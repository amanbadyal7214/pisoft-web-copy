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

function DigitalMarketing() {
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const [heroBgUrl, setHeroBgUrl] = useState('/digitalmarket.webp')
  const introRef = useRef(null)

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
          Digital Marketing Agency | SEO, PPC & Social Media Services | Pisoft
        </title>
        <meta
          name='description'
          content='Pisoft Informatics is a top digital marketing agency delivering custom growth strategies. See how our services drive traffic, leads, and sales for your business.'
        />
        <meta
          property='og:title'
          content='Digital Marketing Agency | SEO, PPC & Social Media Services | Pisoft'
        />
        <meta
          property='og:description'
          content='Pisoft Informatics is a top digital marketing agency delivering custom growth strategies. See how our services drive traffic, leads, and sales for your business.'
        />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/DigitalMarketing'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/DigitalMarketing'
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
            className='text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-900 drop-shadow-xl text-center px-4'
          >
            DIGITAL MARKETING
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
            {/* Hidden image element to test image availability and trigger fallback */}
            <img
              src={heroBgUrl}
              alt='Digital Marketing Banner'
              className='hidden'
              onError={() =>
                setHeroBgUrl(
                  './digitalmarket.webp'
                )
              }
            />
            {/* Background */}
            <div
              className='absolute inset-0 bg-cover bg-center lg:mt-35'
              style={{
                backgroundImage: `url('${heroBgUrl}')`,
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
                text='DIGITAL MARKETING SERVICES'
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
                  imageSrc='/digital.webp'
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
                  As a leading digital marketing agency in Mohali, we engineer
                  data-driven digital strategies that convert search traffic
                  into long-term customer revenue. Our tailored digital
                  campaigns blend organic Search Engine Optimization (SEO),
                  high-ROI Pay-Per-Click (PPC) ads, and compelling social media
                  engagements to position your brand directly in front of target
                  buyers.
                </p>

                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-4'>
                  Leveraging cutting-edge marketing stacks, real-time funnel
                  analytics, and competitive intelligence, we optimize your
                  market presence across Google, Meta, LinkedIn, and major ad
                  networks. We prioritize targeted audience segmentation,
                  high-converting copy, and fast landing pages to ensure your
                  campaign ad spend delivers measurable ROI.
                </p>

                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-4'>
                  We specialize in growth strategies tailored to B2B SaaS,
                  e-commerce storefronts, and local enterprises. Whether you
                  require search engine market domination, viral brand
                  storytelling, or performance retargeting, our expert
                  marketers combine continuous A/B testing with market agility to
                  keep your business ahead of competitors.
                </p>

                <p className='text-lg md:text-xl font-in leading-relaxed text-justify mt-4'>
                  Partner with us for full-spectrum marketing services
                  including keyword strategy, content creation, social
                  community building, lead capture funnels, and continuous
                  conversion rate optimization (CRO). Our commitment to data
                  transparency ensures every ad dollar spent is tracked and
                  maximized.
                </p>
              </motion.div>
            </div>
          </section>

          {/* OUR PORTFOLIOS/ PROJECTS / CASE STUDIES.. */}
          {/* <ClientProjects filterCategory='Digital Marketing' /> */}

          {/* Digital Marketing Services */}
          <div className='flex justify-center items-center'>
            <div className='flex flex-wrap max-w-[80vw] justify-center gap-8 m-8'>
              {/* Search Engine Optimization (SEO) */}
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
                  Search Engine Optimization (SEO)
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Keyword research & On-page/Off-page SEO</li>
                  <li>Technical SEO & Site speed audit</li>
                  <li>Local SEO & Google Business Profile</li>
                  <li>High-quality backlink building</li>
                </ul>
              </motion.div>

              {/* Pay-Per-Click (PPC) Advertising */}
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
                  Pay-Per-Click (PPC) Advertising
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Google Ads & Bing Search campaigns</li>
                  <li>Remarketing & Display Advertising</li>
                  <li>Conversion rate tracking & A/B testing</li>
                  <li>High ROI keyword bidding</li>
                </ul>
              </motion.div>

              {/* Social Media Marketing (SMM) */}
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
                  Social Media Marketing (SMM)
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Targeted Meta, LinkedIn & Twitter campaigns</li>
                  <li>Creative content creation & visual design</li>
                  <li>Community management & engagement</li>
                  <li>Influencer partnerships & paid social</li>
                </ul>
              </motion.div>

              {/* Content Marketing & Copywriting */}
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
                  Content Marketing & Copywriting
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>SEO-driven blog posts & thought leadership</li>
                  <li>High-converting landing page copy</li>
                  <li>E-books, whitepapers & case studies</li>
                  <li>Email newsletter & nurture funnels</li>
                </ul>
              </motion.div>

              {/* Brand Positioning & Management */}
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
                  Brand Positioning & Management
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Brand identity & market positioning</li>
                  <li>Online reputation & review curation</li>
                  <li>Video marketing & Reels strategy</li>
                  <li>Multi-channel editorial calendars</li>
                </ul>
              </motion.div>

              {/* Analytics & CRO */}
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
                  Analytics & CRO
                </div>
                <ul className='text-base md:text-md font-in text-blue-950 space-y-2 list-disc list-outside pl-5'>
                  <li>Google Analytics 4 (GA4) setup & tracking</li>
                  <li>User heatmap & behavior analysis</li>
                  <li>Funnel optimization & page tweaks</li>
                  <li>Data-driven ROI reporting</li>
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

export default DigitalMarketing