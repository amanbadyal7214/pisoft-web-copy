import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Smartphone,
  Apple,
  Play,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail,
  Sparkles,
  Lock,
  Building2,
  ChevronDown,
  Send,
  CheckCircle,
  Workflow,
  ShieldCheck,
  Cpu,
  Activity,
  Award
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavbarDemo } from '../components/navbar/Navbar2'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { Example } from '../components/Corn'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import { baseURl } from '../../baseURL'

gsap.registerPlugin(ScrollTrigger)

export default function MobileApplication() {
  const navigate = useNavigate()
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const introRef = useRef(null)

  // Consultation Form State
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    appCategory: 'React Native Universal App (iOS & Android)',
    timeline: 'Within 4-8 Weeks',
    message: ''
  })

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0)

  // GSAP Intro Splash
  useEffect(() => {
    if (introRef.current) {
      gsap.fromTo(
        introRef.current,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 2.2,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => setIntroComplete(true)
        }
      )
    } else {
      setIntroComplete(true)
    }
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError('Please enter your full name, work email, and phone number.')
      return
    }
    setFormSubmitting(true)
    setFormError('')
    try {
      const response = await fetch(`${baseURl}/saveContactUs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            name: formData.name,
            email: formData.email,
            mobileNo: formData.phone,
            subject: `Mobile App Engineering Inquiry: ${formData.appCategory} (${formData.organization || 'Direct'})`,
            message: `Organization: ${formData.organization}\nMobile Category: ${formData.appCategory}\nTarget Horizon: ${formData.timeline}\nScope Notes: ${formData.message}`
          }
        })
      })
      if (response.ok) {
        setFormSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          appCategory: 'React Native Universal App (iOS & Android)',
          timeline: 'Within 4-8 Weeks',
          message: ''
        })
      } else {
        setFormError('Could not send message automatically. Please reach our engineering leads directly at +91 82880 29916.')
      }
    } catch (err) {
      console.error(err)
      setFormError('Submission failed. Please connect with us directly via phone or email.')
    } finally {
      setFormSubmitting(false)
    }
  }

  // 3 Core Mobile Technology Pillars Data
  const mobilePillars = [
    {
      id: 'reactnative',
      title: 'React Native Universal Apps',
      badge: 'Cross-Platform Primary',
      icon: Smartphone,
      tagline: 'React Native 0.76+ • TypeScript • Expo • Reanimated',
      desc: 'We engineer universal mobile apps with fluid 60 FPS native performance, sharing 90%+ core business logic across iOS and Android while slashing ongoing maintenance overhead.',
      capabilities: [
        'React Native New Architecture (Fabric & TurboModules)',
        'TypeScript type-safe state management with Zustand & Redux',
        'Offline-first data sync with SQLite & WatermelonDB',
        'Direct hardware access: Biometrics, GPS, BLE & Camera'
      ],
      metrics: [
        { val: '60 FPS', label: 'Fluidity' },
        { val: '90%+', label: 'Code Sharing' },
        { val: '-50%', label: 'Dev Overhead' }
      ]
    },
    {
      id: 'swift',
      title: 'Native Apple iOS Development',
      badge: 'Apple Ecosystem',
      icon: Apple,
      tagline: 'Swift 6 • SwiftUI • UIKit • CoreData • StoreKit',
      desc: 'Handcrafted native Apple iOS applications engineered strictly to Apple Human Interface Guidelines with Apple Pay, FaceID, WidgetKit, and App Store optimization.',
      capabilities: [
        'SwiftUI declarative UI architecture with UIKit interoperability',
        'CoreData & SwiftData persistent offline storage',
        'Apple Pay, Face ID / Touch ID biometric authentication',
        'Apple Watch & iPad universal layout extensions'
      ],
      metrics: [
        { val: '100%', label: 'HIG Compliant' },
        { val: 'Swift 6', label: 'Memory Safe' },
        { val: 'Zero', label: 'Rejection SLA' }
      ]
    },
    {
      id: 'kotlin',
      title: 'Native Android Development',
      badge: 'Google Ecosystem',
      icon: Play,
      tagline: 'Kotlin 2.x • Jetpack Compose • Coroutines • Room DB',
      desc: 'Mission-critical Android applications engineered with modern Jetpack libraries, MVVM architecture, material dynamic theming, and multi-device tablet / TV support.',
      capabilities: [
        'Jetpack Compose reactive UI with Kotlin Coroutines & Flow',
        'Room database with SQLCipher encryption at rest',
        'Google Play In-App Billing, FCM Push & Location Services',
        'Android 15 edge-to-edge support & battery optimization'
      ],
      metrics: [
        { val: '99.9%', label: 'Crash-Free Users' },
        { val: 'MVVM', label: 'Clean Code' },
        { val: 'AES-256', label: 'Encrypted DB' }
      ]
    }
  ]

  // Concise Executive Mobile FAQs
  const executiveFaqs = [
    {
      q: 'Should we choose React Native or Native iOS/Android (Swift/Kotlin) for our app?',
      a: 'If your priority is faster time-to-market and cost efficiency without sacrificing native feel, React Native is the ideal choice with 90%+ shared code between iOS and Android. If your application demands deep OS-specific widgets, low-level hardware control, or specialized Apple/Google platform APIs, dedicated native Swift (iOS) and Kotlin (Android) development provides maximum control and raw hardware performance.'
    },
    {
      q: 'Do you handle App Store and Google Play Store deployment and approval?',
      a: 'Yes, end-to-end. We manage the entire store submission lifecycle—including metadata preparation, privacy manifests, screenshot assets, app signing, TestFlight external beta review, and Google Play Console review. We guarantee 100% compliance with Apple HIG and Google Developer policies with zero rejections.'
    },
    {
      q: 'Do we receive 100% ownership of the mobile source code and developer accounts?',
      a: 'Yes, unconditionally. All source code, Git repositories, deployment configurations, certificates, keystores, and provisioning profiles are delivered directly to you. Your application is signed directly under your Apple Developer and Google Play Console accounts with zero vendor lock-in.'
    },
    {
      q: 'How do you handle OS upgrades (iOS 18+ / Android 15+) and ongoing app maintenance?',
      a: 'We provide structured post-launch SLAs covering new OS version compatibility, third-party API deprecations, crash monitoring via Firebase Crashlytics, and performance optimization so your app remains stable across every new flagship device release.'
    }
  ]

  return (
    <main className='overflow-x-hidden w-full max-w-full bg-white font-in text-slate-800 selection:bg-orange-500 selection:text-white'>
      <Helmet>
        <title>Mobile App Development Company | iOS, Android, React Native | Pisoft Mohali</title>
        <meta
          name='description'
          content='Pisoft Informatics is a premier mobile app development company building high-speed native and cross-platform mobile applications using React Native, Swift (iOS), and Kotlin (Android) in Mohali, Punjab.'
        />
        <meta
          name='keywords'
          content='mobile app development Mohali, iOS app development Punjab, Android app developers India, React Native mobile apps, Swift SwiftUI developers, Kotlin Android apps, custom mobile software engineering Pisoft Informatics'
        />
        <meta property='og:title' content='Mobile App Development Company | iOS, Android, React Native | Pisoft Informatics' />
        <meta
          property='og:description'
          content='Engineered with React Native, Swift (iOS) & Kotlin (Android). Explore Pisoft Informatics custom iOS, Android, and cross-platform mobile engineering.'
        />
        <meta property='og:url' content='https://Pisoftinformatics.com/MobileApplications' />
        <link rel='canonical' href='https://Pisoftinformatics.com/MobileApplications' />
      </Helmet>

      {/* GSAP Intro Splash */}
      {!introComplete && (
        <div
          ref={introRef}
          className='fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white'
        >
          <div className='text-center px-4'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3 border border-orange-500/30'>
              <Smartphone size={14} />
              <span>Pisoft Mobile Engineering</span>
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-INB tracking-tight text-white'>
              MOBILE APPLICATIONS
            </h1>
            <p className='text-slate-300 text-xs sm:text-sm mt-2 font-mono'>
              React Native • Swift (iOS) • Kotlin (Android)
            </p>
          </div>
        </div>
      )}

      {introComplete && (
        <>
          {/* Desktop Navbars */}
          <div className='fixed -top-9 left-0 w-full z-40 hidden lg:block'>
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

          {/* Mobile Navbars */}
          <div className='fixed left-1 -top-2 z-50 lg:hidden'>
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

          {/* Floating Utilities */}
          <div>
            <ScrollButtons />
          </div>
          <SocialLinks className='hidden lg:block' />

          {/* =========================================================================
              1. HERO: BRIGHT LIGHT-THEME (WHITE) WITH DEVELOPMENT BACKGROUND VIDEO
                 - Translucent frosted overlay (video clearly visible underneath)
                 - Deep brand blue rgb(24, 43, 103) / Pisoft orange typography
                 - Spacious, clean, enterprise IT agency feel
                 - Navbar clearance: pt-32 sm:pt-36 lg:pt-40 xl:pt-44
             ========================================================================= */}
          <header className='relative min-h-[75vh] lg:min-h-[82vh] w-full flex items-center justify-center overflow-hidden bg-white pt-32 sm:pt-36 lg:pt-40 xl:pt-44 pb-16 sm:pb-20 border-b border-slate-200/80'>
            
            {/* Background Development Video with Luminous Translucent White Overlay */}
            <div className='absolute inset-0 w-full h-full overflow-hidden z-0'>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload='auto'
                poster='/MobileApplication.webp'
                className='w-full h-full object-cover object-center scale-105 opacity-95 filter contrast-[1.08] brightness-[1.01]'
              >
                <source
                  src='https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2Fp2.mp4?alt=media&token=ef681c2f-bf7a-4f77-8ab3-ae9f1554e20e'
                  type='video/mp4'
                />
              </video>

              {/* Translucent Frosted Glass Overlay (Video is clearly visible underneath) */}
              <div className='absolute inset-0 bg-gradient-to-b from-white/55 via-white/38 to-white/60 backdrop-blur-[0.5px]' />
              <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/25 via-transparent to-transparent pointer-events-none' />

              {/* Subtle Tech Hex/Grid Pattern */}
              <div
                className='absolute inset-0 opacity-10 pointer-events-none'
                style={{
                  backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.2) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />
            </div>

            {/* Foreground Content */}
            <div className='relative z-10 w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center'>
              
              {/* Luminous Enterprise Badge with Live Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-orange-700 text-xs font-bold uppercase tracking-wider mb-5 border border-orange-200/90 shadow-sm'
              >
                <span className='relative flex h-2 w-2'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-600'></span>
                </span>
                <span>Pisoft Mobile Digital Labs • Enterprise iOS & Android Hub</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-INB text-[#182b67] leading-[1.14] sm:leading-[1.10] tracking-tight mb-5 max-w-5xl mx-auto drop-shadow-xs'
              >
                Engineering High-Performance <br />
                <span className='text-orange-500'>
                  iOS & Android Mobile Applications
                </span> <br />
                for Enterprise Scale
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='text-slate-700 text-sm sm:text-base md:text-lg lg:text-xl font-in leading-relaxed mb-7 max-w-3xl mx-auto drop-shadow-2xs'
              >
                Pisoft Informatics is a premier mobile engineering company crafting fluid native and universal apps. Handcrafted with <strong>React Native</strong>, <strong>Swift (iOS)</strong>, and <strong>Kotlin (Android)</strong> in Mohali, Punjab.
              </motion.p>

              {/* Dual Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-9'
              >
                <a
                  href='#project-consultation'
                  className='w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5'
                >
                  <span>Start Your Mobile Project / Quote</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href='tel:+918288029916'
                  className='w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#182b67] border border-slate-200/90 font-bold text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2.5 shadow-sm'
                >
                  <PhoneCall size={15} className='text-orange-500' />
                  <span>Call Architects: +91 82880 29916</span>
                </a>
              </motion.div>

              {/* Direct Trust Credentials Strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className='flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-semibold text-slate-700 max-w-4xl mx-auto'
              >
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                  <span>100% IP & Keystore Ownership</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-orange-500'></span>
                  <span>Direct Senior Mohali Engineers</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-[#182b67]'></span>
                  <span>App Store & Play Store Approval Guarantee</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-indigo-500'></span>
                  <span>2-Week Agile Sprints & TestFlight</span>
                </div>
              </motion.div>

            </div>
          </header>

          {/* =========================================================================
              2. THE 4 CORE MOBILE TECHNOLOGY PILLARS (DEEP DIVE MATRIX)
                 - Brand Blue: rgb(24, 43, 103)
             ========================================================================= */}
          <section id='mobile-stacks' className='py-14 sm:py-20 bg-gradient-to-b from-[#182b67]/5 via-slate-50/60 to-white border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12'>
                <div className='max-w-3xl'>
                  <span className='text-[#182b67] font-bold uppercase tracking-wider text-xs'>
                    Core Mobile Stacks
                  </span>
                  <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-[#182b67] mt-1'>
                    Modern, Production-Hardened Mobile Technologies We Excel In
                  </h2>
                  <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                    We specialize in 3 industry-leading mobile development ecosystems: React Native, Native Apple iOS (Swift), and Native Google Android (Kotlin). Every line of code is handwritten for fluid 60 FPS performance, offline reliability, and 100% intellectual property ownership.
                  </p>
                </div>

                <a
                  href='#project-consultation'
                  className='hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-[#182b67] hover:text-orange-500 transition'
                >
                  <span>Request Architecture Recommendation</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* 3 Tech Pillars Cards Grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
                {mobilePillars.map((pillar) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.id}
                      className='p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#182b67]/15 hover:border-[#182b67] shadow-sm hover:shadow-xl hover:shadow-[#182b67]/15 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden'
                    >
                      {/* Top Brand Blue Accent Bar: rgb(24, 43, 103) */}
                      <div className='absolute top-0 left-0 right-0 h-1.5 bg-[#182b67]'></div>

                      <div>
                        {/* Top Badge & Icon */}
                        <div className='flex items-center justify-between gap-2 mb-4 pt-1'>
                          <div className='w-12 h-12 rounded-2xl bg-[#182b67]/10 text-[#182b67] border border-[#182b67]/20 flex items-center justify-center group-hover:scale-105 transition-transform'>
                            <Icon size={24} />
                          </div>
                          <span className='px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#182b67]/10 border border-[#182b67]/20 text-[#182b67] font-mono'>
                            {pillar.badge}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className='font-INB text-lg sm:text-xl text-[#182b67] mb-1'>
                          {pillar.title}
                        </h3>
                        <p className='text-[#182b67]/80 text-xs font-semibold mb-3'>
                          {pillar.tagline}
                        </p>

                        <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-4'>
                          {pillar.desc}
                        </p>

                        {/* Concrete Deliverables */}
                        <div className='space-y-2 mb-4'>
                          {pillar.capabilities.map((cap, i) => (
                            <div key={i} className='flex items-start gap-2 text-xs text-slate-700'>
                              <CheckCircle size={14} className='text-emerald-600 flex-shrink-0 mt-0.5' />
                              <span className='leading-tight'>{cap}</span>
                            </div>
                          ))}
                        </div>

                        {/* 3 Metric Pills */}
                        <div className='grid grid-cols-3 gap-1.5 py-3 border-y border-slate-200 text-center mb-5'>
                          {pillar.metrics.map((m, idx) => (
                            <div key={idx} className='p-2 rounded-xl bg-[#182b67]/5 border border-[#182b67]/15'>
                              <div className='font-INB text-xs text-[#182b67]'>{m.val}</div>
                              <div className='text-[9px] text-[#182b67]/70 leading-tight mt-0.5'>{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href='#project-consultation'
                        className='w-full py-2.5 px-4 rounded-xl bg-[#182b67] hover:bg-[#101f4c] text-white font-INB text-xs uppercase tracking-wider border border-[#182b67] transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#182b67]/20'
                      >
                        <span>Build with {pillar.badge}</span>
                        <ArrowRight size={13} className='text-white/80' />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. ENGINEERING RIGOR & GUARANTEES (THE 4 TRUST PILLARS) - SIGNATURE BLUE BAND
                 - Brand Blue: rgb(24, 43, 103)
             ========================================================================= */}
          <section className='py-16 sm:py-24 bg-gradient-to-br from-[#182b67] via-[#101e4a] to-[#0c1636] text-white border-y border-[#182b67]/60 relative overflow-hidden'>
            {/* Ambient corporate blue glow */}
            <div className='absolute -top-32 -left-32 w-96 h-96 bg-[#182b67]/60 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-[#182b67]/40 rounded-full blur-3xl pointer-events-none' />

            <div className='relative z-10 w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='max-w-4xl mb-10 sm:mb-12 text-center sm:text-left'>
                <span className='px-3.5 py-1 rounded-full bg-white/15 text-white border border-white/25 text-xs font-bold uppercase tracking-wider inline-block mb-3'>
                  Mobile Engineering Guarantees
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-white mt-1'>
                  Why Growing Brands Partner with Pisoft for Mobile
                </h2>
                <p className='text-blue-100/80 mt-2 text-sm sm:text-base'>
                  We eliminate vendor lock-in, store rejection anxiety, and device performance bottlenecks. You work directly with experienced mobile engineers who deliver on time.
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Lock size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>100% IP & Store Handover</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Complete ownership of all Git repositories, signing certificates, keystores, and Apple & Google Play developer account transfers. Zero proprietary royalties.
                  </p>
                </div>

                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Building2 size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>Direct Mohali Mobile Engineers</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Collaborate directly with our senior iOS, Android, and cross-platform architects in Mohali, Punjab. No account managers or outsourced intermediaries.
                  </p>
                </div>

                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Award size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>App Store & Play Store Guarantee</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Strict adherence to Apple Human Interface Guidelines and Google Play Developer policies. We guarantee zero rejection and handle the review process until publication.
                  </p>
                </div>

                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Workflow size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>2-Week Sprints & TestFlight</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Structured 14-day development cycles. Every sprint concludes with testable builds deployed to Apple TestFlight and Firebase App Distribution for immediate live testing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. OFFICIAL CONSULTATION & RFP SUBMISSION HUB (BRAND BLUE ACCENTS)
                 - Brand Blue: rgb(24, 43, 103)
             ========================================================================= */}
          <section id='project-consultation' className='py-14 sm:py-20 bg-gradient-to-b from-white via-[#182b67]/5 to-slate-50 border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='text-center max-w-4xl mx-auto mb-10 sm:mb-12'>
                <span className='inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#182b67]/10 text-[#182b67] border border-[#182b67]/20 mb-2'>
                  Technical Discovery Call
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-[#182b67] leading-tight'>
                  Initiate Your Mobile App Project Discovery <br />
                  <span className='text-orange-500'>Direct with Software Architects in Mohali</span>
                </h2>
                <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                  Submit your mobile application requirements below. We provide thorough architecture reviews, device compatibility maps, sprint horizon estimates, and an NDA-backed consultation within 24 hours.
                </p>
              </div>

              {/* Consultation Dual Cards */}
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-full'>
                {/* Form Card (7 Cols) */}
                <div className='lg:col-span-7 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-md flex flex-col justify-between'>
                  <div>
                    <h3 className='text-xl sm:text-2xl font-INB text-[#182b67] mb-1'>
                      Mobile App Project Specification Form
                    </h3>
                    <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-5'>
                      Share your target mobile app parameters to connect with our senior mobile engineering team.
                    </p>

                    {formSubmitted ? (
                      <div className='p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-3'>
                        <div className='w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2'>
                          <CheckCircle2 size={28} />
                        </div>
                        <h4 className='font-INB text-xl text-emerald-950'>Specifications Received</h4>
                        <p className='text-sm text-emerald-700 max-w-md mx-auto'>
                          Thank you for connecting with Pisoft Informatics. Our mobile engineering team in Mohali will review your technical specifications and contact you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className='space-y-4'>
                        {formError && (
                          <div className='p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium'>
                            {formError}
                          </div>
                        )}

                        <div className='grid sm:grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                              Full Name *
                            </label>
                            <input
                              type='text'
                              name='name'
                              value={formData.name}
                              onChange={handleFormChange}
                              required
                              placeholder='e.g. Alok Verma'
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition'
                            />
                          </div>
                          <div>
                            <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                              Work Email *
                            </label>
                            <input
                              type='email'
                              name='email'
                              value={formData.email}
                              onChange={handleFormChange}
                              required
                              placeholder='alok@company.com'
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition'
                            />
                          </div>
                        </div>

                        <div className='grid sm:grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                              Contact Number *
                            </label>
                            <input
                              type='tel'
                              name='phone'
                              value={formData.phone}
                              onChange={handleFormChange}
                              required
                              placeholder='+91 98765 43210'
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition'
                            />
                          </div>
                          <div>
                            <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                              Company / Organization
                            </label>
                            <input
                              type='text'
                              name='organization'
                              value={formData.organization}
                              onChange={handleFormChange}
                              placeholder='Global Ventures Inc.'
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition'
                            />
                          </div>
                        </div>

                        <div className='grid sm:grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                              Mobile Architecture Category
                            </label>
                            <select
                              name='appCategory'
                              value={formData.appCategory}
                              onChange={handleFormChange}
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition bg-white'
                            >
                              <option>React Native Universal App (iOS & Android)</option>
                              <option>Native Apple iOS App (Swift & SwiftUI)</option>
                              <option>Native Google Android App (Kotlin & Jetpack)</option>
                              <option>Dual Native Build (Swift iOS + Kotlin Android)</option>
                              <option>Enterprise Mobile ERP & Field Workforce Solution</option>
                            </select>
                          </div>
                          <div>
                            <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                              Target Horizon
                            </label>
                            <select
                              name='timeline'
                              value={formData.timeline}
                              onChange={handleFormChange}
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition bg-white'
                            >
                              <option>Within 4-8 Weeks</option>
                              <option>Within 2-3 Months</option>
                              <option>Quarterly (3+ Months)</option>
                              <option>Consultation & Scoping Phase</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                            Technical Overview & Device Features
                          </label>
                          <textarea
                            name='message'
                            rows='3'
                            value={formData.message}
                            onChange={handleFormChange}
                            placeholder='Tell us about your target OS versions, required device features (GPS, camera, BLE, push notifications, offline mode), and backend API readiness...'
                            className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition resize-none'
                          ></textarea>
                        </div>

                        <button
                          type='submit'
                          disabled={formSubmitting}
                          className='w-full py-3.5 px-6 rounded-xl bg-[#182b67] hover:bg-[#101f4c] disabled:bg-[#182b67]/50 text-white font-INB text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#182b67]/25 transition cursor-pointer flex items-center justify-center gap-2'
                        >
                          {formSubmitting ? (
                            <span>Submitting Mobile Scope...</span>
                          ) : (
                            <>
                              <Send size={15} />
                              <span>Submit Mobile Scope for Review</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Direct Engineering Channel Card (5 Cols) - Deep Brand Blue Design: rgb(24, 43, 103) */}
                <div className='lg:col-span-5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#182b67] via-[#122254] to-[#0c1636] border border-[#182b67]/60 shadow-xl shadow-[#182b67]/20 text-white flex flex-col justify-between'>
                  <div>
                    <span className='px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25'>
                      Mohali Mobile Center
                    </span>
                    <h3 className='text-xl sm:text-2xl font-INB mt-3 mb-2 text-white'>
                      Direct Mobile Engineering Hub
                    </h3>
                    <p className='text-blue-100/80 text-xs sm:text-sm leading-relaxed mb-6'>
                      Have detailed mobile architecture specifications or need an urgent technical discovery discussion? Connect directly with our mobile engineering leadership in Mohali.
                    </p>

                    <div className='space-y-4 mb-6'>
                      <div className='flex items-start gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white flex-shrink-0'>
                          <PhoneCall size={18} />
                        </div>
                        <div>
                          <div className='text-[11px] text-blue-200/70 uppercase tracking-wider'>Direct Engineering Line</div>
                          <a href='tel:+918288029916' className='text-sm sm:text-base font-bold text-white hover:text-orange-400 transition'>
                            +91 82880 29916
                          </a>
                        </div>
                      </div>

                      <div className='flex items-start gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white flex-shrink-0'>
                          <Mail size={18} />
                        </div>
                        <div>
                          <div className='text-[11px] text-blue-200/70 uppercase tracking-wider'>Technical Inquiries</div>
                          <a href='mailto:info@pisoftinformatics.com' className='text-sm sm:text-base font-bold text-white hover:text-orange-400 transition'>
                            info@pisoftinformatics.com
                          </a>
                        </div>
                      </div>

                      <div className='flex items-start gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white flex-shrink-0'>
                          <Building2 size={18} />
                        </div>
                        <div>
                          <div className='text-[11px] text-blue-200/70 uppercase tracking-wider'>Development Center</div>
                          <div className='text-xs sm:text-sm text-blue-100/80 leading-snug'>
                            Pisoft Informatics Pvt. Ltd.<br />
                            F-468, Industrial Focal Point, Phase 8-B,<br />
                            S.A.S. Nagar, Mohali, Punjab, 140307, India
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='pt-4 border-t border-white/15 text-xs text-blue-200/70 flex items-center justify-between'>
                    <span>Mon - Sat: 9:30 AM to 6:30 PM IST</span>
                    <span className='text-emerald-400 font-bold'>● Mobile Engineers Available</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              5. EXECUTIVE FAQS (CONCISE & ESSENTIAL)
             ========================================================================= */}
          <section className='py-14 sm:py-20 bg-white'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full'>
                {/* Left Column: Context & Support Card */}
                <div className='lg:col-span-4'>
                  <span className='text-[#182b67] font-bold uppercase tracking-wider text-xs'>
                    Executive Answers
                  </span>
                  <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-[#182b67] mt-1 mb-2'>
                    Frequently Asked Questions
                  </h2>
                  <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6'>
                    Straightforward answers about mobile code ownership, App Store & Google Play submission, device performance, and post-launch OS maintenance.
                  </p>

                  <div className='p-5 sm:p-6 rounded-2xl bg-[#182b67]/5 border border-[#182b67]/15'>
                    <h4 className='font-INB text-sm text-[#182b67] mb-1'>Need direct mobile clarification?</h4>
                    <p className='text-xs text-slate-500 mb-4'>Speak directly with our senior mobile software engineering team in Mohali.</p>
                    <a
                      href='tel:+918288029916'
                      className='w-full py-2.5 px-4 rounded-xl bg-[#182b67] hover:bg-[#101f4c] text-white font-INB text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 mb-2.5 shadow-sm'
                    >
                      <PhoneCall size={14} />
                      <span>+91 82880 29916</span>
                    </a>
                    <a
                      href='#project-consultation'
                      className='w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#182b67] font-bold text-xs uppercase tracking-wider border border-[#182b67]/20 transition flex items-center justify-center gap-2'
                    >
                      <span>Submit Mobile RFP</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Accordion FAQ List */}
                <div className='lg:col-span-8 space-y-3'>
                  {executiveFaqs.map((faq, index) => {
                    const isOpen = openFaq === index
                    return (
                      <div
                        key={index}
                        className='rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden transition-colors hover:border-[#182b67]/40'
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className='w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer'
                        >
                          <span className={`font-INB text-sm sm:text-base ${isOpen ? 'text-[#182b67]' : 'text-slate-800'}`}>
                            {faq.q}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-[#182b67]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className='px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50'>
                            {faq.a}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  )
}
