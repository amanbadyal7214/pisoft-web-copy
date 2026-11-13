import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code2,
  Server,
  Zap,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail,
  Sparkles,
  Lock,
  Building2,
  ChevronDown,
  Smartphone,
  Send,
  CheckCircle,
  Workflow,
  ShieldCheck,
  Play,
  Layers,
  Cpu,
  Monitor
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

export default function WebApplication() {
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
    appCategory: 'Full MERN Stack Web Platform (MongoDB, Express, React, Node)',
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
            subject: `Web Engineering Inquiry: ${formData.appCategory} (${formData.organization || 'Direct'})`,
            message: `Organization: ${formData.organization}\nApplication Category: ${formData.appCategory}\nTarget Horizon: ${formData.timeline}\nScope Notes: ${formData.message}`
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
          appCategory: 'Full MERN Stack Web Platform (MongoDB, Express, React, Node)',
          timeline: 'Within 4-8 Weeks',
          message: ''
        })
      } else {
        setFormError('Could not send message automatically. Please reach our engineering leads directly at +91 97818 20044.')
      }
    } catch (err) {
      console.error(err)
      setFormError('Submission failed. Please connect with us directly via phone or email.')
    } finally {
      setFormSubmitting(false)
    }
  }

  // 4 Core Technology Pillars Data
  const techPillars = [
    {
      id: 'mern',
      title: 'MERN Full-Stack Development',
      badge: 'Primary Web Stack',
      icon: Code2,
      tagline: 'MongoDB • Express.js • React 19 • Node.js',
      desc: 'We engineer high-performance Single Page Applications (SPAs) and real-time cloud portals using React 19 and Node.js async event loops.',
      capabilities: [
        'React 19 with Vite & modern component architecture',
        'Node.js & Express async microservices with WebSockets',
        'MongoDB Atlas clustering with replica set sharding',
        'Clean REST & GraphQL APIs with JWT session security'
      ],
      metrics: [
        { val: '< 0.6s', label: 'Load Speed' },
        { val: '100%', label: 'Type Safety' },
        { val: '10k+', label: 'Concurrent Users' }
      ]
    },
    {
      id: 'reactnative',
      title: 'React Native Mobile & Web',
      badge: 'Universal Mobile',
      icon: Smartphone,
      tagline: 'React Native • iOS • Android • Web',
      desc: 'Build once and deploy across iOS, Android, and web browsers, slashing dual development costs while delivering fluid 60 FPS native performance.',
      capabilities: [
        'Over 90% codebase sharing between Android, iOS, and Web',
        'Native device sensors: Camera, GPS, Biometrics & Push',
        'Offline-first data caching with SQLite & background sync',
        'Automated App Store & Google Play Store release pipelines'
      ],
      metrics: [
        { val: '2-in-1', label: 'iOS + Android' },
        { val: '60 FPS', label: 'Native Fluidity' },
        { val: '-50%', label: 'Dev Overhead' }
      ]
    },
    {
      id: 'springboot',
      title: 'Java & Spring Boot Enterprise',
      badge: 'Enterprise Backend',
      icon: Server,
      tagline: 'Java 21 LTS • Spring Boot 3 • JPA / Hibernate',
      desc: 'For mission-critical banking, credit society software, and complex ERP systems, our senior Java architects engineer zero-downtime microservices.',
      capabilities: [
        'Spring Boot 3 cloud-native microservices with Docker',
        'Spring Security with OAuth2, JWT & multi-tenant isolation',
        'Hibernate & Spring Data JPA for complex relational data',
        'Asynchronous Kafka / RabbitMQ event-driven messaging'
      ],
      metrics: [
        { val: '99.99%', label: 'Cloud Uptime' },
        { val: '100%', label: 'ACID Ready' },
        { val: 'SOC-2', label: 'Hardened' }
      ]
    },
    {
      id: 'python',
      title: 'Python (Django, FastAPI & Flask)',
      badge: 'Async & AI Ready',
      icon: Zap,
      tagline: 'FastAPI Async • Django MVC • Flask Microservices',
      desc: 'Harness the Python web ecosystem for blazing-fast async REST endpoints with FastAPI, enterprise admin backbones with Django, and AI-ready pipelines.',
      capabilities: [
        'FastAPI for high-throughput async microservices (<5ms latency)',
        'Django for robust enterprise admin dashboards and ORM models',
        'Flask for lightweight decoupled serverless webhooks',
        'Seamless integration with AI models, analytics & automation'
      ],
      metrics: [
        { val: '< 5ms', label: 'API Latency' },
        { val: 'Async', label: 'Non-Blocking' },
        { val: 'AI Ready', label: 'ML Hooks' }
      ]
    }
  ]

  // Concise Executive FAQs
  const executiveFaqs = [
    {
      q: 'Do we receive 100% ownership of the source code and IP?',
      a: 'Yes, unconditionally. Upon milestone completion, you receive complete ownership of all Git repositories, Docker containers, deployment configurations, database schemas, and documentation with zero recurring proprietary lock-in.'
    },
    {
      q: 'Which backend stack should we choose: MERN, Java Spring Boot, or Python?',
      a: 'If you need rapid startup prototyping, real-time collaboration, or a unified JavaScript codebase, MERN Stack is ideal. For mission-critical banking, financial accounting, and high-throughput corporate microservices, Java Spring Boot is the gold standard. For high-speed async APIs or AI-integrated platforms, Python (FastAPI/Django) offers unmatched speed and flexibility.'
    },
    {
      q: 'Can React Native really share code between Mobile (iOS/Android) and Web?',
      a: 'Yes. React Native enables 90%+ code sharing across iOS, Android, and Web platforms. You maintain a single codebase for business logic, state management, and user authentication, cutting your development and ongoing maintenance costs by up to 50%.'
    },
    {
      q: 'What is your agile sprint cadence and how will we track development progress?',
      a: 'We operate on structured 2-week Agile sprints. Every sprint concludes with a live video demonstration of working features on a private cloud staging server. You receive direct access to our project boards and direct communication with senior software engineers in Mohali.'
    }
  ]

  return (
    <main className='overflow-x-hidden w-full max-w-full bg-white font-in text-slate-800 selection:bg-orange-500 selection:text-white'>
      <Helmet>
        <title>Web & Mobile Application Engineering | MERN, Java Spring Boot, Python, React Native | Pisoft Mohali</title>
        <meta
          name='description'
          content='Pisoft Informatics is a premier software engineering company building high-speed web and cross-platform mobile applications using MERN Stack, React Native, Java Spring Boot, and Python in Mohali, Punjab.'
        />
        <meta
          name='keywords'
          content='MERN stack development Mohali, React Native developers Punjab, Java Spring Boot microservices, Python Django FastAPI Flask company India, custom software engineering Pisoft Informatics'
        />
        <meta property='og:title' content='Web & Mobile Application Engineering | MERN, Java Spring Boot, Python | Pisoft Informatics' />
        <meta
          property='og:description'
          content='Engineered with MERN, Java Spring Boot, Python & React Native. Explore Pisoft Informatics custom web engineering and full-stack microservices.'
        />
        <meta property='og:url' content='https://Pisoftinformatics.com/WebApplications' />
        <link rel='canonical' href='https://Pisoftinformatics.com/WebApplications' />
      </Helmet>

      {/* GSAP Intro Splash */}
      {!introComplete && (
        <div
          ref={introRef}
          className='fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white'
        >
          <div className='text-center px-4'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3 border border-orange-500/30'>
              <Code2 size={14} />
              <span>Pisoft Digital Engineering</span>
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-INB tracking-tight text-white'>
              SOFTWARE ENGINEERING
            </h1>
            <p className='text-slate-300 text-xs sm:text-sm mt-2 font-mono'>
              MERN Stack • React Native • Java Spring Boot • Python (Django, FastAPI, Flask)
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

          {/* Floating Controls */}
          <ScrollButtons />
          <div className='hidden lg:block'>
            <SocialLinks />
          </div>

          {/* =========================================================================
              1. HERO: BRIGHT LIGHT-THEME (WHITE) WITH DEVELOPMENT BACKGROUND VIDEO
                 - Video playing in background with luminous light/white frosted overlay
                 - Deep navy / Pisoft orange typography for razor-sharp readability
                 - Clean, official, enterprise IT agency feel in light theme
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
                poster='/website-Photo.webp'
                className='w-full h-full object-cover object-center scale-105 opacity-80 filter contrast-[1.06] brightness-[1.02]'
              >
                {/* Official engineering video */}
                <source
                  src='https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2Fp2.mp4?alt=media&token=ef681c2f-bf7a-4f77-8ab3-ae9f1554e20e'
                  type='video/mp4'
                />
              </video>

              {/* Translucent Frosted Glass Overlay (Video is clearly visible underneath) */}
              <div className='absolute inset-0 bg-gradient-to-b from-white/78 via-white/60 to-white/82 backdrop-blur-[1.5px]' />
              <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/35 via-transparent to-transparent pointer-events-none' />

              {/* Subtle Tech Hex/Grid Pattern */}
              <div
                className='absolute inset-0 opacity-15 pointer-events-none'
                style={{
                  backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.2) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />
            </div>

            {/* Foreground Content (Translucent IT Professional Presentation) */}
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
                <span>Pisoft Digital Labs • Enterprise Software Engineering Hub</span>
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
                  Web & Mobile Applications
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
                Pisoft Informatics is a premier software engineering firm delivering custom cloud portals and universal mobile apps. Handcrafted with <strong>MERN Stack</strong>, <strong>React Native</strong>, <strong>Java Spring Boot</strong>, and <strong>Python (Django, FastAPI, Flask)</strong> in Mohali, Punjab.
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
                  <span>Start Your Web Project / Quote</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href='tel:+919781820044'
                  className='w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#182b67] border border-slate-200/90 font-bold text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2.5 shadow-sm'
                >
                  <PhoneCall size={15} className='text-orange-500' />
                  <span>Call Architects: +91 97818 20044</span>
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
                  <span>100% IP & Git Ownership</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-orange-500'></span>
                  <span>Direct Senior Mohali Engineers</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-[#182b67]'></span>
                  <span>OWASP Bank-Grade Security</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-indigo-500'></span>
                  <span>2-Week Agile Sprints</span>
                </div>
              </motion.div>

            </div>
          </header>

          {/* =========================================================================
              2. THE 4 CORE TECHNOLOGY PILLARS (DEEP DIVE MATRIX)
             ========================================================================= */}
          <section id='tech-stacks' className='py-14 sm:py-20 bg-gradient-to-b from-[#182b67]/5 via-slate-50/60 to-white border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12'>
                <div className='max-w-3xl'>
                  <span className='text-[#182b67] font-bold uppercase tracking-wider text-xs'>
                    Core Engineering Stacks
                  </span>
                  <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-[#182b67] mt-1'>
                    Modern, Production-Hardened Technologies We Excel In
                  </h2>
                  <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                    We specialize in 4 industry-standard development ecosystems. Every line of code is handwritten for speed, clean architecture, and 100% intellectual property ownership.
                  </p>
                </div>

                <a
                  href='#project-consultation'
                  className='hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-[#182b67] hover:text-orange-500 transition'
                >
                  <span>Request Stack Recommendation</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* 4 Tech Pillars Cards Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                {techPillars.map((pillar) => {
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
             ========================================================================= */}
          <section className='py-16 sm:py-24 bg-gradient-to-br from-[#182b67] via-[#101e4a] to-[#0c1636] text-white border-y border-[#182b67]/60 relative overflow-hidden'>
            {/* Ambient corporate blue glow: rgb(24, 43, 103) */}
            <div className='absolute -top-32 -left-32 w-96 h-96 bg-[#182b67]/60 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-[#182b67]/40 rounded-full blur-3xl pointer-events-none' />

            <div className='relative z-10 w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='max-w-4xl mb-10 sm:mb-12 text-center sm:text-left'>
                <span className='px-3.5 py-1 rounded-full bg-white/15 text-white border border-white/25 text-xs font-bold uppercase tracking-wider inline-block mb-3'>
                  Engineering Guarantees
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-white mt-1'>
                  Why Growing Businesses Partner with Pisoft
                </h2>
                <p className='text-blue-100/80 mt-2 text-sm sm:text-base'>
                  We eliminate vendor lock-in, communication friction, and security compromises. You work directly with experienced software engineers who deliver on time.
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Lock size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>100% IP Handover</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Complete ownership of all Git repositories, Docker containers, database schemas, and documentation. Zero proprietary royalties.
                  </p>
                </div>

                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Building2 size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>Direct Mohali Engineers</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Collaborate directly with our senior full-stack developers in Mohali, Punjab. No account managers or outsourced intermediaries.
                  </p>
                </div>

                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <ShieldCheck size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>OWASP Bank-Grade Security</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Parameterized queries, CSRF defenses, JWT session tokens, and automated penetration testing before every production deployment.
                  </p>
                </div>

                <div className='p-6 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-300 shadow-xl'>
                  <div className='w-12 h-12 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center font-bold mb-4 shadow-sm'>
                    <Workflow size={22} />
                  </div>
                  <h3 className='font-INB text-lg text-white mb-1.5'>2-Week Sprints & Staging</h3>
                  <p className='text-xs sm:text-sm text-blue-100/75 leading-relaxed'>
                    Structured 14-day development cycles. Every sprint concludes with working software demonstrated on private cloud staging servers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. OFFICIAL CONSULTATION & RFP SUBMISSION HUB (BRAND BLUE ACCENTS)
             ========================================================================= */}
          <section id='project-consultation' className='py-14 sm:py-20 bg-gradient-to-b from-white via-[#182b67]/5 to-slate-50 border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='text-center max-w-4xl mx-auto mb-10 sm:mb-12'>
                <span className='inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#182b67]/10 text-[#182b67] border border-[#182b67]/20 mb-2'>
                  Technical Discovery Call
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-[#182b67] leading-tight'>
                  Initiate Your Web & Mobile Project Discovery <br />
                  <span className='text-orange-500'>Direct with Software Architects in Mohali</span>
                </h2>
                <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                  Submit your technical requirements below. We provide thorough architecture reviews, sprint horizon estimates, and an NDA-backed consultation within 24 hours.
                </p>
              </div>

              {/* Consultation Dual Cards */}
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-full'>
                {/* Form Card (7 Cols) */}
                <div className='lg:col-span-7 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-md flex flex-col justify-between'>
                  <div>
                    <h3 className='text-xl sm:text-2xl font-INB text-[#182b67] mb-1'>
                      Web & Mobile Project Specification Form
                    </h3>
                    <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-5'>
                      Share your target application parameters to connect with our senior engineering team.
                    </p>

                    {formSubmitted ? (
                      <div className='p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-3'>
                        <div className='w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2'>
                          <CheckCircle2 size={28} />
                        </div>
                        <h4 className='font-INB text-xl text-emerald-950'>Specifications Received</h4>
                        <p className='text-sm text-emerald-700 max-w-md mx-auto'>
                          Thank you for connecting with Pisoft Informatics. Our software engineering team in Mohali will review your technical specifications and contact you shortly.
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
                              Application Category
                            </label>
                            <select
                              name='appCategory'
                              value={formData.appCategory}
                              onChange={handleFormChange}
                              className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition bg-white'
                            >
                              <option>Full MERN Stack Web Platform (MongoDB, Express, React, Node)</option>
                              <option>Java & Spring Boot Enterprise Microservices</option>
                              <option>Python Web System (Django / FastAPI / Flask)</option>
                              <option>React Native Universal App (iOS, Android & Web)</option>
                              <option>Custom SaaS & Multi-Tenant Cloud Platform</option>
                              <option>Headless E-Commerce & Marketplace Architecture</option>
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
                            Technical Overview & Functional Notes
                          </label>
                          <textarea
                            name='message'
                            rows='3'
                            value={formData.message}
                            onChange={handleFormChange}
                            placeholder='Tell us about your expected users, required integrations, third-party APIs, and deployment preferences...'
                            className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#182b67] focus:ring-2 focus:ring-[#182b67]/20 text-sm outline-none transition resize-none'
                          ></textarea>
                        </div>

                        <button
                          type='submit'
                          disabled={formSubmitting}
                          className='w-full py-3.5 px-6 rounded-xl bg-[#182b67] hover:bg-[#101f4c] disabled:bg-[#182b67]/50 text-white font-INB text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#182b67]/25 transition cursor-pointer flex items-center justify-center gap-2'
                        >
                          {formSubmitting ? (
                            <span>Submitting Technical Scope...</span>
                          ) : (
                            <>
                              <Send size={15} />
                              <span>Submit Technical Scope for Review</span>
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
                      Mohali Software Center
                    </span>
                    <h3 className='text-xl sm:text-2xl font-INB mt-3 mb-2 text-white'>
                      Direct Software Engineering Hub
                    </h3>
                    <p className='text-blue-100/80 text-xs sm:text-sm leading-relaxed mb-6'>
                      Have detailed software architecture specifications or need an urgent technical discovery discussion? Connect directly with our engineering leadership in Mohali.
                    </p>

                    <div className='space-y-4 mb-6'>
                      <div className='flex items-start gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white flex-shrink-0'>
                          <PhoneCall size={18} />
                        </div>
                        <div>
                          <div className='text-[11px] text-blue-200/70 uppercase tracking-wider'>Direct Engineering Line</div>
                          <a href='tel:+919781820044' className='text-sm sm:text-base font-bold text-white hover:text-orange-400 transition'>
                            +91 97818 20044
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
                            Plot C-127, Phase 8, Industrial Area,<br />
                            Mohali, Punjab 160071, India
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='pt-4 border-t border-white/15 text-xs text-blue-200/70 flex items-center justify-between'>
                    <span>Mon - Sat: 9:30 AM to 6:30 PM IST</span>
                    <span className='text-emerald-400 font-bold'>● Engineers Available</span>
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
                    Straightforward answers about source code ownership, performance guarantees, technology selection, and sprint delivery horizons.
                  </p>

                  <div className='p-5 sm:p-6 rounded-2xl bg-[#182b67]/5 border border-[#182b67]/15'>
                    <h4 className='font-INB text-sm text-[#182b67] mb-1'>Need direct technical clarification?</h4>
                    <p className='text-xs text-slate-500 mb-4'>Speak directly with our senior software engineering team in Mohali.</p>
                    <a
                      href='tel:+919781820044'
                      className='w-full py-2.5 px-4 rounded-xl bg-[#182b67] hover:bg-[#101f4c] text-white font-INB text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 mb-2.5 shadow-sm'
                    >
                      <PhoneCall size={14} />
                      <span>+91 97818 20044</span>
                    </a>
                    <a
                      href='#project-consultation'
                      className='w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#182b67] font-bold text-xs uppercase tracking-wider border border-[#182b67]/20 transition flex items-center justify-center gap-2'
                    >
                      <span>Submit Technical RFP</span>
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
