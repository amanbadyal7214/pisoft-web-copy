import React, { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Building2,
  GraduationCap,
  Coins,
  Stethoscope,
  Wrench,
  Plane,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Database,
  Server,
  Users,
  BarChart3,
  Lock,
  Workflow,
  Headphones,
  FileSpreadsheet,
  TrendingUp,
  Check,
  ExternalLink,
  Calendar,
  Zap,
  Settings,
  ShieldAlert,
  FileText,
  HelpCircle,
  PhoneCall,
  ArrowUpRight,
  ChevronDown,
  MonitorCheck,
  FileCode2,
  Send,
  Layers,
  Award,
  Boxes,
  UserCheck
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavbarDemo } from '../components/navbar/Navbar2'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import { Example } from '../components/Corn'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import BlurText from '../components/BlurText'
import TiltedCard from '../components/tiltedCard'
import { baseURl } from '../../baseURL'

gsap.registerPlugin(ScrollTrigger)

export default function ERPSolutions() {
  const navigate = useNavigate()
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const [activeTab, setActiveTab] = useState('real-estate')
  const [heroFeatured, setHeroFeatured] = useState('overview')
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  // Configurator state
  const [cfgSector, setCfgSector] = useState('real-estate')
  const [cfgUsers, setCfgUsers] = useState('16-50')
  const [cfgDeployment, setCfgDeployment] = useState('cloud')

  // Quick inquiry form state
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    sector: 'Real Estate ERP (REMS)',
    message: ''
  })

  // Support direct hash navigation (#real-estate, #education, #inventory, #crm, #hr)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (['real-estate', 'education', 'inventory', 'crm', 'hr'].includes(hash)) {
        setActiveTab(hash)
        setHeroFeatured(hash)
        setTimeout(() => {
          const el = document.getElementById('industry-suites')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 200)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const introRef = useRef(null)

  // Splash intro animation
  useEffect(() => {
    if (introRef.current) {
      gsap.fromTo(
        introRef.current,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 3,
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => setIntroComplete(true)
        }
      )
    } else {
      setIntroComplete(true)
    }
  }, [])

  // Scroll listener for sticky CTA bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInquiryChange = (e) => {
    const { name, value } = e.target
    setInquiryData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    if (!inquiryData.name || !inquiryData.phone || !inquiryData.email) {
      setFormError('Please fill in your name, email, and contact number.')
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
            name: inquiryData.name,
            email: inquiryData.email,
            mobileNo: inquiryData.phone,
            subject: `ERP Inquiry: ${inquiryData.sector} (${inquiryData.organization || 'General'})`,
            message: `Organization: ${inquiryData.organization}\nSector: ${inquiryData.sector}\nNotes: ${inquiryData.message}`
          }
        })
      })
      if (response.ok) {
        setFormSubmitted(true)
        setInquiryData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          sector: 'Education ERP',
          message: ''
        })
      } else {
        setFormError('Could not send message automatically. Please call us directly or use Client Register.')
      }
    } catch (err) {
      console.error(err)
      setFormError('Could not submit. You can register directly on our Client Portal below.')
    } finally {
      setFormSubmitting(false)
    }
  }

  // Data for Industry ERP Suites - ONLY Real Estate, Education, Inventory, CRM, and HR
  const erpSuites = useMemo(() => [
    {
      id: 'real-estate',
      title: 'Real Estate & Property Management ERP',
      shortTitle: 'Real Estate ERP (REMS)',
      code: 'REMS',
      badge: 'Real Estate & Builder ERP',
      icon: Building2,
      accentColor: 'from-amber-500 to-rose-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      mainImage: '/pibuilding.avif',
      subImage: '/LeadManagement.webp',
      subImageLabel: 'Property Booking & Inventory Console',
      pageUrl: '/clientRegister',
      tagline: 'End-to-End Property Sales, Unit Inventory, Booking Portals & Tenant Management',
      overview:
        'Pisoft Real Estate ERP is engineered specifically for builders, real estate developers, property management firms, and real estate brokers. From master layout planning, block/unit inventory status, site visit booking, to payment milestone scheduling, automated commission disbursements, and tenant lease agreements, our platform simplifies complex real estate operations with 100% RERA compliance.',
      metrics: [
        { label: 'Unit Booking Velocity', value: '4x Faster' },
        { label: 'Payment Milestone Tracking', value: '100% Automated' },
        { label: 'RERA & GST Compliance', value: 'Built-in & Ready' }
      ],
      modules: [
        {
          name: 'Interactive Unit Layout & Inventory',
          desc: 'Visual interactive floor plans, tower/phase categorization, live unit booking status (Available, Blocked, Booked, Registered), and rate card configuration.'
        },
        {
          name: 'Lead Capture & Site Visit CRM',
          desc: 'Omnichannel lead aggregation (99acres, MagicBricks, Meta ads, calls), automatic sales executive assignment, and site visit GPS check-in.'
        },
        {
          name: 'Payment Milestone & Demand Letters',
          desc: 'Automated milestone triggers (slab casting, brickwork, finishing), demand letter generation, GST calculations, and payment gateway links.'
        },
        {
          name: 'Broker & Channel Partner Management',
          desc: 'Channel partner registration, tiered commission tracking, payout reconciliation, and digital broker portal.'
        },
        {
          name: 'Legal, RERA & Agreement Vault',
          desc: 'Builder-buyer agreement generation, RERA project compliance tracking, stamp duty logs, and digital document locker.'
        },
        {
          name: 'Tenant Lease & Property Maintenance',
          desc: 'Lease agreement renewals, rent collection automation, society maintenance billing, visitor management, and maintenance work orders.'
        }
      ]
    },
    {
      id: 'education',
      title: 'School Management System',
      shortTitle: 'School ERP (SMS)',
      code: 'SMS',
      badge: 'Education Sector ERP',
      icon: GraduationCap,
      accentColor: 'from-orange-500 to-rose-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      mainImage: '/SCHOOL.webp',
      subImage: '/Education.webp',
      subImageLabel: 'Campus Cloud Portal',
      pageUrl: '/ERPservices/Education',
      tagline: 'Comprehensive Campus Automation from Admissions to Examinations',
      overview:
        'Pisoft SMS is a cloud-native education management ERP engineered for schools, colleges, and university campuses. Built in Mohali, Punjab, this centralized platform eliminates paper logbooks, simplifies fee reconciliation, automates CBSE/ICSE exam scoring, and connects teachers, students, and parents in real time.',
      metrics: [
        { label: 'Fee Collection Speed', value: '3x Faster' },
        { label: 'Parent Engagement', value: '98% Portal Sync' },
        { label: 'Report Generation', value: 'Instant & Accurate' }
      ],
      modules: [
        {
          name: 'Student 360 & Admissions',
          desc: 'End-to-end digital admission forms, document vault, batch allocations, and profile tracking across all academic years.'
        },
        {
          name: 'Automated Fee Management',
          desc: 'Configurable fee slabs, installment schedules, fine automation, online payment gateway, and instant SMS receipts.'
        },
        {
          name: 'CBSE/ICSE Grading & Exams',
          desc: 'Dynamic grade cards, date-sheet generation, faculty mark entries, and automated percentage calculation compliant with board standards.'
        },
        {
          name: 'Biometric & Bus RFID Attendance',
          desc: 'Daily attendance with automated SMS to parents for absentees, integrated with biometric devices and school bus RFID tags.'
        },
        {
          name: 'Student & Parent Portals',
          desc: 'Dedicated web and Android application for homework, notices, fee receipts, timetable, and direct teacher communication.'
        },
        {
          name: 'Financial Ledger & Daybook',
          desc: 'Integrated institutional accounting, fee head allocations, expense vouchers, salary disbursements, and annual audit reports.'
        }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory & Warehouse Management ERP',
      shortTitle: 'Inventory ERP (WMS)',
      code: 'WMS',
      badge: 'Inventory & Supply Chain ERP',
      icon: Boxes,
      accentColor: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      mainImage: '/InventoryManagement.webp',
      subImage: '/Stocks.webp',
      subImageLabel: 'Warehouse Stock & Barcode Console',
      pageUrl: '/clientRegister',
      tagline: 'Real-Time Multi-Warehouse Stock Control, Barcode Tracking & Procurement',
      overview:
        'Pisoft Inventory & Warehouse Management ERP optimizes your entire supply chain with multi-warehouse tracking, automated reorder thresholds, batch/serial lifecycle traceability, and purchase order fulfillment. Eliminate stockouts, prevent inventory shrinkage, and gain complete visibility into raw materials and finished goods.',
      metrics: [
        { label: 'Stock Audit Time', value: '-70% Reduction' },
        { label: 'Inventory Accuracy', value: '99.8% Barcode Sync' },
        { label: 'Dead Stock Prevention', value: 'Automated Alerts' }
      ],
      modules: [
        {
          name: 'Multi-Warehouse & Bin Management',
          desc: 'Track stock across central hubs, branch godowns, transit bins, and retail locations with dynamic inter-warehouse transfer slips.'
        },
        {
          name: 'Barcode & QR Code Scanning',
          desc: 'Instant goods receipt note (GRN) generation, barcode labeling, handheld scanner integration, and fast stock audits.'
        },
        {
          name: 'Batch, Lot & Expiry Traceability',
          desc: 'Granular batch tracking for perishables and raw items with FIFO/LIFO dispatch logic and proactive expiry alerts.'
        },
        {
          name: 'Automated Purchase Orders & Reorders',
          desc: 'Set safety stock and minimum reorder levels per SKU with automatic vendor RFQs, purchase orders, and supplier rate contracts.'
        },
        {
          name: 'Bill of Materials (BOM) & Kitting',
          desc: 'Multi-level BOM for assembly lines, work order issuance, raw material consumption tracking, and finished goods valuation.'
        },
        {
          name: 'Stock Ageing & Valuation Analytics',
          desc: 'Detailed reports on fast vs slow-moving stock, holding costs, dead stock depreciation, and 100% GST-compliant e-way bill generation.'
        }
      ]
    },
    {
      id: 'crm',
      title: 'Enterprise CRM & Sales Pipeline ERP',
      shortTitle: 'Enterprise CRM',
      code: 'CRM',
      badge: 'Customer & Sales Pipeline ERP',
      icon: Users,
      accentColor: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      mainImage: '/CRM.webp',
      subImage: '/LeadManagement.webp',
      subImageLabel: 'Omnichannel Pipeline & Deal Flow',
      pageUrl: '/clientRegister',
      tagline: 'Lead Nurturing, Deal Velocity, Omnichannel Communication & Client Lifecycle Automation',
      overview:
        'Pisoft Enterprise CRM empowers high-performance sales and service teams to capture, qualify, and convert leads with precision. From multi-channel marketing attribution (Google, Meta, WhatsApp, Web forms) to visual Kanban pipelines, automated deal reminders, and customer support ticketing, close deals faster and build enduring customer relationships.',
      metrics: [
        { label: 'Lead Response Time', value: '< 5 Minutes' },
        { label: 'Deal Conversion Rate', value: '+42% Pipeline Speed' },
        { label: 'Customer Retention', value: '94% Repeat Engagement' }
      ],
      modules: [
        {
          name: 'Omnichannel Lead Capture',
          desc: 'Aggregate enquiries instantly from web forms, WhatsApp Business API, incoming phone calls, and digital ad campaigns without duplicate entries.'
        },
        {
          name: 'Visual Kanban Pipeline & Deal Stages',
          desc: 'Drag-and-drop deals across customized sales stages with win-probability forecasting and revenue projection dashboards.'
        },
        {
          name: 'Automated Follow-ups & Reminders',
          desc: 'Smart drip campaigns, automated email/WhatsApp sequences, and salesperson task alerts so no customer enquiry ever goes cold.'
        },
        {
          name: 'Quotation & Proposal Engine',
          desc: 'Generate professional branded PDF quotations, apply volume discounts, track client view timestamps, and capture digital signatures.'
        },
        {
          name: 'Customer Support & Helpdesk Tickets',
          desc: 'Post-sale service ticketing, SLA escalation matrices, customer issue tracking, and knowledge base integration.'
        },
        {
          name: 'Sales Performance & Commission MIS',
          desc: 'Real-time executive performance leaderboards, target vs achievement graphs, and automated sales commission calculations.'
        }
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources & Biometric Payroll ERP (HRMS)',
      shortTitle: 'HRMS & Payroll ERP',
      code: 'HRMS',
      badge: 'Workforce & Payroll ERP',
      icon: UserCheck,
      accentColor: 'from-violet-600 to-purple-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      textColor: 'text-violet-700',
      mainImage: '/HR.webp',
      subImage: '/TaskManagement.webp',
      subImageLabel: 'Employee Self-Service & Shift Desk',
      pageUrl: '/clientRegister',
      tagline: 'End-to-End Employee Lifecycle, Biometric Attendance, Compliance & 1-Click Payroll',
      overview:
        'Pisoft HRMS is an all-in-one workforce management ERP designed for modern Indian enterprises. Simplify recruitment onboarding, capture biometric and geofenced attendance, automate complex shift rosters, manage leaves, and execute 1-click payroll compliant with statutory PF, ESI, Professional Tax, and TDS regulations.',
      metrics: [
        { label: 'Payroll Processing Time', value: '10 Mins vs 3 Days' },
        { label: 'Attendance Discrepancy', value: '0% Biometric Sync' },
        { label: 'Statutory Compliance', value: '100% PF, ESI & TDS Ready' }
      ],
      modules: [
        {
          name: 'Employee 360 & Digital Onboarding',
          desc: 'Paperless candidate onboarding, digital document locker, employment contract generation, and asset assignment tracking.'
        },
        {
          name: 'Biometric & Geo-Fenced Attendance',
          desc: 'Real-time sync with fingerprint/face-recognition hardware, mobile app check-in with GPS geofencing, and automated late-mark logic.'
        },
        {
          name: 'Leave Management & Shift Rosters',
          desc: 'Multi-tier leave approval hierarchies, compensatory off rules, paid leaves, and flexible rotational shift scheduling.'
        },
        {
          name: '1-Click Statutory Payroll Engine',
          desc: 'Automated salary computation with allowances, deductions, OT hours, PF (Provident Fund), ESIC, Professional Tax, and TDS calculations.'
        },
        {
          name: 'Employee Self-Service (ESS) Portal',
          desc: 'Web and Android portal for employees to download payslips, submit tax declarations (Form 16/12BB), and request leaves.'
        },
        {
          name: 'Performance Appraisals & OKRs',
          desc: '360-degree review cycles, goal/KPI tracking, continuous feedback loops, and appraisal hike recommendation matrices.'
        }
      ]
    }
  ], [])

  const currentSuite = useMemo(() => {
    return erpSuites.find((s) => s.id === activeTab) || erpSuites[0]
  }, [activeTab, erpSuites])

  // Configurator summary calculation
  const configuratorInfo = useMemo(() => {
    const timelines = {
      '1-15': '7 to 12 Working Days',
      '16-50': '14 to 21 Working Days',
      '51-200': '25 to 35 Working Days',
      '200+': '35 to 50 Working Days'
    }
    const modulesCount = {
      '1-15': '6 Core Modules Included',
      '16-50': '8 Core + 4 Add-ons Included',
      '51-200': 'Full Enterprise Suite + Multi-Branch',
      '200+': 'Unlimited Modular Deployment'
    }
    const sectorLabels = {
      'real-estate': 'Real Estate & Properties (REMS)',
      education: 'School & College Management (SMS)',
      inventory: 'Inventory & Warehouse Management (WMS)',
      crm: 'Enterprise Sales & Deal CRM',
      hr: 'HRMS & Biometric Payroll (HRMS)'
    }
    return {
      sectorName: sectorLabels[cfgSector] || 'Enterprise ERP',
      timeline: timelines[cfgUsers] || '14 to 21 Working Days',
      modules: modulesCount[cfgUsers] || '8 Modules Included',
      hostingType: cfgDeployment === 'cloud' ? 'Managed Cloud (99.9% SLA)' : 'Local On-Premises Intranet Server'
    }
  }, [cfgSector, cfgUsers, cfgDeployment])

  const faqs = [
    {
      q: 'How does Pisoft ERP handle data migration from our existing Excel sheets or legacy software?',
      a: 'We provide 100% zero-data-loss migration. Our engineering team in Mohali analyzes your existing files—whether Excel spreadsheets, Access databases, Tally data, or older desktop software—and builds automated sanitization scripts to migrate members, students, inventory, patient records, and opening balances directly into your new Pisoft ERP database.'
    },
    {
      q: 'Why should we choose Pisoft ERP instead of off-the-shelf software like SAP or Salesforce?',
      a: 'Off-the-shelf generic ERPs charge astronomical recurring per-user fees, enforce rigid overseas workflows, and require costly consultants for even tiny adjustments. Pisoft builds modular, practical ERP software tailored specifically to Indian operational and statutory needs (GST, CBSE/ICSE rules, Cooperative Society bylaws, Ayushman Bharat TPA). You only pay for what you use, and you get direct phone access to the software engineers who built it.'
    },
    {
      q: 'Can the ERP run on our local office server without relying on the internet?',
      a: 'Yes. While 90% of our clients prefer our high-speed, automated cloud hosting with daily backups, we also offer complete on-premises deployment on your local office intranet server with offline failover capability, ideal for institutions or credit societies with strict local data storage requirements.'
    },
    {
      q: 'How do our non-technical staff members learn to use the system?',
      a: 'We design our ERP interfaces for real human operators—cashiers, teachers, mechanics, and receptionists—with clean layouts, minimum clicks, and multi-language support. As part of our deployment, we conduct dedicated hands-on training sessions (both in-person in North India and live video), and provide easy-to-follow video manuals and 24/7 dedicated support.'
    },
    {
      q: 'What happens when I register on the Client Register portal (/clientRegister)?',
      a: 'Our Client Registration portal (/clientRegister) allows you to select your exact business nature (Real Estate, Education, Inventory, CRM, HRMS), pick the modular features you need, check initial licensing costs, and register your organization profile. Once submitted, our senior solution architects review your parameters, set up your preview instance, and reach out to schedule an architecture walkthrough.'
    },
    {
      q: 'Can we start with basic modules and activate advanced modules later as we grow?',
      a: 'Absolutely. Pisoft ERP is completely modular. A school can start with Admissions and Fee Management in year one, then seamlessly activate the Bus GPS and Parent Mobile App in year two. A credit society can start with Member KYC and Daily Pigmy collections, then activate Gold Loans later. The database is unified from day one.'
    }
  ]

  return (
    <main className='overflow-x-hidden w-full max-w-full bg-white font-in text-slate-800 selection:bg-orange-500 selection:text-white'>
      <Helmet>
        <title>Enterprise ERP Solutions & Services | Pisoft Informatics Mohali</title>
        <meta
          name='description'
          content='Transform your organization with custom enterprise ERP software from Pisoft Informatics. Specialized ERP solutions for Real Estate, Education, Inventory Management, CRM, and HR & Payroll. Contact our ERP specialists or register online.'
        />
        <meta
          name='keywords'
          content='ERP solutions, custom ERP services, real estate ERP, school management software Mohali, inventory warehouse ERP, CRM pipeline system, HRMS payroll software, enterprise resource planning, Pisoft Informatics client register, custom software development Mohali'
        />
        <meta property='og:title' content='Enterprise ERP Solutions & Services | Pisoft Informatics' />
        <meta
          property='og:description'
          content='Streamline your entire business with unified, modular ERP systems engineered by Pisoft Informatics for Real Estate, Education, Inventory, CRM, and HR & Payroll. Register today for a live demo and architecture consultation.'
        />
        <meta property='og:url' content='https://pisoftinformatics.com/ERPSolutions' />
        <link rel='canonical' href='https://pisoftinformatics.com/ERPSolutions' />
      </Helmet>

      {/* GSAP Intro Splash */}
      {!introComplete && (
        <div
          ref={introRef}
          className='fixed inset-0 flex items-center justify-center z-[9999] bg-white text-blue-950'
        >
          <div className='text-center px-4'>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className='inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-orange-100 text-orange-600 mb-3'>
                Enterprise Resource Planning
              </span>
              <h1 className='text-3xl sm:text-5xl md:text-6xl font-INB text-blue-950 tracking-tight'>
                ERP Solutions & Services
              </h1>
              <p className='text-slate-500 text-xs sm:text-sm mt-2'>
                Pisoft Informatics • Mohali, Punjab
              </p>
            </motion.div>
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

          {/* Scroll to Top/Bottom & Social Links (SocialLinks hidden on mobile to prevent overlay) */}
          <ScrollButtons />
          <div className='hidden lg:block'>
            <SocialLinks />
          </div>

          {/* LIGHT THEME HERO SECTION WITH EXPANSIVE FULL-WIDTH RESPONSIVE LAYOUT */}
          <header className='relative pt-24 sm:pt-28 md:pt-30 lg:pt-34 xl:pt-36 pb-8 sm:pb-12 bg-white overflow-hidden border-b border-slate-100 w-full'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center w-full min-w-0'>
                {/* Left Column: Heading, Value Proposition & Prominent CTAs */}
                <div className='w-full min-w-0 max-w-full lg:col-span-6 xl:col-span-6 text-center lg:text-left'>
                  {/* Badge */}
                  <div className='inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 border border-orange-200/80 shadow-xs max-w-full'>
                    <Sparkles size={13} className='text-orange-500 flex-shrink-0' />
                    <span className='truncate sm:hidden'>Custom Enterprise ERP</span>
                    <span className='hidden sm:inline'>Custom Enterprise ERP Software • Mohali, Punjab</span>
                  </div>

                  {/* Title */}
                  <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3.25rem] 2xl:text-[3.75rem] font-INB text-blue-950 leading-[1.22] sm:leading-[1.14] tracking-tight mb-3.5 sm:mb-4 w-full min-w-0 break-words'>
                    Unified ERP Systems <br />
                    <span className='text-orange-500'>Engineered for Growth</span> <br className='sm:hidden' />
                    <span className='block sm:inline mt-1 sm:mt-0'>& Complete Automation</span>
                  </h1>

                  {/* Value Proposition */}
                  <p className='text-slate-600 text-xs sm:text-sm md:text-base lg:text-[17px] font-in leading-relaxed mb-5 sm:mb-6 w-full min-w-0 max-w-full break-words'>
                    Replace disconnected spreadsheets, fragile accounting files, and manual departmental bottlenecks with a unified enterprise operating system. Pisoft Informatics engineers custom, high-speed ERP software tailored for Real Estate & Builders, Educational Campuses, Multi-Warehouse Inventory, High-Velocity CRM Pipelines, and Enterprise HRMS & Payroll across India.
                  </p>

                  {/* Dual Action Buttons (Highlighting /clientRegister) */}
                  <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mb-5 sm:mb-6 w-full min-w-0'>
                    <motion.button
                      onClick={() => navigate('/clientRegister')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full sm:w-auto px-4 sm:px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer'
                    >
                      <span className='sm:hidden'>Take a Free Trial / Register</span>
                      <span className='hidden sm:inline'>Take a Free Trial / Client Register</span>
                      <ArrowRight size={16} className='flex-shrink-0' />
                    </motion.button>

                    <a
                      href='tel:+918288029916'
                      className='w-full sm:w-auto px-4 sm:px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2'
                    >
                      <PhoneCall size={15} className='text-orange-500 flex-shrink-0' />
                      <span>+91 82880 29916</span>
                    </a>
                  </div>

                  {/* Feature Pillars */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium mb-5 sm:mb-6 pt-1 text-left w-full min-w-0 max-w-full'>
                    <div className='flex items-center gap-2 min-w-0'>
                      <CheckCircle2 size={15} className='text-emerald-600 flex-shrink-0' />
                      <span className='truncate sm:whitespace-normal'>Role-based web & mobile apps</span>
                    </div>
                    <div className='flex items-center gap-2 min-w-0'>
                      <CheckCircle2 size={15} className='text-emerald-600 flex-shrink-0' />
                      <span className='truncate sm:whitespace-normal'>100% Indian GST & audit ready</span>
                    </div>
                    <div className='flex items-center gap-2 min-w-0'>
                      <CheckCircle2 size={15} className='text-emerald-600 flex-shrink-0' />
                      <span className='truncate sm:whitespace-normal'>Direct developer support in Mohali</span>
                    </div>
                    <div className='flex items-center gap-2 min-w-0'>
                      <CheckCircle2 size={15} className='text-emerald-600 flex-shrink-0' />
                      <span className='truncate sm:whitespace-normal'>Zero data lock-in • Full ownership</span>
                    </div>
                  </div>

                  {/* Trust markers */}
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-3.5 sm:pt-4 border-t border-slate-200 text-left w-full min-w-0'>
                    <div className='p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0'>
                      <div className='font-INB text-base sm:text-lg text-blue-950 truncate'>12+ Yrs</div>
                      <div className='text-[10px] sm:text-[11px] text-slate-500 leading-tight truncate'>Mohali Engineering</div>
                    </div>
                    <div className='p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0'>
                      <div className='font-INB text-base sm:text-lg text-emerald-600 truncate'>500+</div>
                      <div className='text-[10px] sm:text-[11px] text-slate-500 leading-tight truncate'>Deployments</div>
                    </div>
                    <div className='p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0'>
                      <div className='font-INB text-base sm:text-lg text-sky-600 truncate'>99.9%</div>
                      <div className='text-[10px] sm:text-[11px] text-slate-500 leading-tight truncate'>Cloud Uptime</div>
                    </div>
                    <div className='p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0'>
                      <div className='font-INB text-base sm:text-lg text-orange-600 truncate'>100%</div>
                      <div className='text-[10px] sm:text-[11px] text-slate-500 leading-tight truncate'>GST / Audit Ready</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Multi-Image Hero Composition */}
                <div className='w-full min-w-0 max-w-full lg:col-span-6 xl:col-span-6 relative mt-6 lg:mt-0'>
                  {/* Industry Quick-Tab Selector to inspect live ERP suites */}
                  <div className='flex items-center justify-start sm:justify-between bg-slate-100/90 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-200 mb-2.5 sm:mb-3 overflow-x-auto scrollbar-none gap-1 shadow-2xs -mx-1 sm:mx-0 px-1 sm:px-1.5'>
                    {[
                      { id: 'overview', label: 'Command Center', tag: 'Overview' },
                      { id: 'real-estate', label: 'Real Estate', tag: 'REMS' },
                      { id: 'education', label: 'School ERP', tag: 'SMS' },
                      { id: 'inventory', label: 'Inventory', tag: 'WMS' },
                      { id: 'crm', label: 'CRM', tag: 'CRM' },
                      { id: 'hr', label: 'HR & Payroll', tag: 'HRMS' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setHeroFeatured(item.id)
                          if (item.id !== 'overview') setActiveTab(item.id)
                        }}
                        className={`px-2.5 py-1.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                          heroFeatured === item.id
                            ? 'bg-orange-500 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:text-blue-950 hover:bg-slate-200/60 border border-slate-200/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Main Enterprise Browser Showcase */}
                  <div className='relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200 bg-white w-full'>
                    {/* Browser Bar */}
                    <div className='h-8 sm:h-9 bg-slate-100 flex items-center justify-between px-3 sm:px-4 border-b border-slate-200'>
                      <div className='flex items-center gap-1 sm:gap-1.5'>
                        <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400' />
                        <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400' />
                        <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400' />
                        <span className='text-[10px] sm:text-[11px] text-slate-400 font-mono ml-1.5 sm:ml-2'>
                          pisoft-erp/{heroFeatured}
                        </span>
                      </div>
                      <div className='flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] sm:text-[10px] font-bold'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
                        <span>LIVE SYSTEM</span>
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div className='relative w-full overflow-hidden bg-slate-100'>
                      <img
                        src={
                          heroFeatured === 'real-estate'
                            ? '/pibuilding.avif'
                            : heroFeatured === 'education'
                            ? '/SCHOOL.webp'
                            : heroFeatured === 'inventory'
                            ? '/InventoryManagement.webp'
                            : heroFeatured === 'crm'
                            ? '/CRM.webp'
                            : heroFeatured === 'hr'
                            ? '/HR.webp'
                            : '/erp3.webp'
                        }
                        alt='Pisoft Enterprise ERP Interface'
                        className='w-full h-[210px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[460px] 2xl:h-[490px] object-cover object-top transition-all duration-500'
                        loading='eager'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* RESPONSIVE 5-INDUSTRY VISUAL IMAGE CARDS ROW */}
          <section className='py-8 sm:py-12 bg-slate-50/70 border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 text-center sm:text-left'>
                <div>
                  <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                    Specialized Industry Solutions
                  </span>
                  <h2 className='text-2xl sm:text-3xl font-INB text-blue-950 mt-0.5'>
                    Proven ERP Platforms for Your Sector
                  </h2>
                </div>
                <button
                  onClick={() => navigate('/clientRegister')}
                  className='text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition cursor-pointer'
                >
                  <span>Register Your Industry Profile</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Cards Grid: 1 col on mobile, 2 on tablet, 5 on desktop */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 xl:gap-6'>
                {[
                  {
                    id: 'real-estate',
                    title: 'Real Estate & Property',
                    badge: 'Real Estate REMS',
                    image: '/pibuilding.avif',
                    link: '/clientRegister',
                    highlight: 'Units, Bookings, Milestones & RERA Agreements'
                  },
                  {
                    id: 'education',
                    title: 'School Management',
                    badge: 'Education SMS',
                    image: '/SCHOOL.webp',
                    link: '/ERPservices/Education',
                    highlight: 'Admissions, Fees, Exams & Student Portals'
                  },
                  {
                    id: 'inventory',
                    title: 'Inventory & Warehouse',
                    badge: 'Inventory WMS',
                    image: '/InventoryManagement.webp',
                    link: '/clientRegister',
                    highlight: 'Multi-Warehouse, Barcode Scanning & Reorders'
                  },
                  {
                    id: 'crm',
                    title: 'Enterprise Sales CRM',
                    badge: 'Pipeline CRM',
                    image: '/CRM.webp',
                    link: '/clientRegister',
                    highlight: 'Lead Capture, Deal Stages & Quotations'
                  },
                  {
                    id: 'hr',
                    title: 'HRMS & Payroll ERP',
                    badge: 'Workforce HRMS',
                    image: '/HR.webp',
                    link: '/clientRegister',
                    highlight: 'Biometric Attendance, Shifts & 1-Click Payroll'
                  }
                ].map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      setActiveTab(card.id)
                      const el = document.getElementById('industry-suites')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className='group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col'
                  >
                    <div className='relative h-36 w-full overflow-hidden bg-slate-100'>
                      <img
                        src={card.image}
                        alt={card.title}
                        className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
                        loading='lazy'
                      />
                      <span className='absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-blue-950 border border-slate-200 shadow-xs'>
                        {card.badge}
                      </span>
                    </div>
                    <div className='p-4 flex flex-col justify-between flex-grow'>
                      <div>
                        <h4 className='font-INB text-sm sm:text-base text-blue-950 group-hover:text-orange-600 transition-colors'>
                          {card.title}
                        </h4>
                        <p className='text-xs text-slate-500 mt-1 leading-snug'>
                          {card.highlight}
                        </p>
                      </div>
                      <div className='mt-4 flex items-center justify-between text-xs text-blue-950 font-bold group-hover:text-orange-600 pt-2 border-t border-slate-100'>
                        <span>Explore Suite</span>
                        <ArrowRight size={13} className='group-hover:translate-x-1 transition-transform' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REALITY CHECK: WHY CHOOSE PISOFT ERP (ALL LIGHT THEME) */}
          <section className='py-12 sm:py-16 bg-white border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='max-w-4xl mb-12 text-center sm:text-left'>
                <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                  The Practical Choice
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-blue-950 mt-1'>
                  Why Organizations Choose Pisoft Over Generic Tools
                </h2>
                <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                  Most teams get stuck between overpriced global SaaS tools and error-prone Excel spreadsheets. We deliver an owned, modular system tailored to Indian business realities.
                </p>
              </div>

              <div className='grid md:grid-cols-3 gap-6 sm:gap-8'>
                {/* Card 1 */}
                <div className='p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition'>
                  <div className='w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg mb-5'>
                    <ShieldAlert size={24} />
                  </div>
                  <h3 className='text-lg sm:text-xl font-INB text-blue-950 mb-2'>Off-The-Shelf SaaS Is Rigid</h3>
                  <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-4'>
                    Global platforms enforce overseas workflows, charge recurring seat fees for every user, and demand expensive consultants for simple modifications.
                  </p>
                  <ul className='space-y-2 text-xs text-slate-500'>
                    <li className='flex items-center gap-2'>
                      <span className='text-rose-500 font-bold'>✕</span> Rigid, locked forms
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-rose-500 font-bold'>✕</span> Expensive per-user licensing traps
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-rose-500 font-bold'>✕</span> No Indian regulatory tailoring
                    </li>
                  </ul>
                </div>

                {/* Card 2 */}
                <div className='p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition'>
                  <div className='w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-5'>
                    <FileSpreadsheet size={24} />
                  </div>
                  <h3 className='text-lg sm:text-xl font-INB text-blue-950 mb-2'>Spreadsheets Create Silos</h3>
                  <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-4'>
                    Excel files and standalone desktop accounting fail as soon as you have multiple branches, cashiers, or field collection staff.
                  </p>
                  <ul className='space-y-2 text-xs text-slate-500'>
                    <li className='flex items-center gap-2'>
                      <span className='text-rose-500 font-bold'>✕</span> Accidental file overwrites
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-rose-500 font-bold'>✕</span> No role-based access security
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-rose-500 font-bold'>✕</span> Zero live visibility for directors
                    </li>
                  </ul>
                </div>

                {/* Card 3: Pisoft Solution (Clean White with Orange Accent) */}
                <div className='p-6 sm:p-8 rounded-2xl bg-orange-50/50 border-2 border-orange-300 shadow-md relative overflow-hidden'>
                  <div className='w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg mb-5'>
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className='text-lg sm:text-xl font-INB text-blue-950 mb-2'>The Pisoft ERP Advantage</h3>
                  <p className='text-slate-700 text-xs sm:text-sm leading-relaxed mb-4'>
                    We engineer an owned, modular ERP precisely tuned to your industry rules. You choose your modules, own your data, and enjoy direct technical support from engineers in Mohali.
                  </p>
                  <ul className='space-y-2 text-xs text-slate-700 font-medium'>
                    <li className='flex items-center gap-2'>
                      <Check size={14} className='text-orange-600' /> Indian statutory & GST/tax compliant
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check size={14} className='text-orange-600' /> Modular: activate only what you use
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check size={14} className='text-orange-600' /> Direct call support from real developers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE INDUSTRY ERP SUITES EXPLORER (LIGHT THEME) */}
          <section id='industry-suites' className='py-14 sm:py-20 bg-slate-50/60'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='text-center max-w-4xl mx-auto mb-10'>
                <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                  Deep Dive Explorer
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-blue-950 mt-1'>
                  Explore Detailed Industry Modules
                </h2>
                <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                  Select an industry tab to examine concrete features, real operational outcomes, and request onboarding via our client register.
                </p>
              </div>

              {/* TAB BUTTONS */}
              <div className='flex items-center justify-start lg:justify-center overflow-x-auto pb-3 gap-2 scrollbar-none mb-8'>
                {erpSuites.map((suite) => {
                  const Icon = suite.icon
                  const isActive = activeTab === suite.id
                  return (
                    <button
                      key={suite.id}
                      onClick={() => setActiveTab(suite.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-INB text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-950 text-white shadow-md ring-2 ring-orange-400'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-orange-400' : 'text-slate-500'} />
                      <span>{suite.shortTitle}</span>
                    </button>
                  )
                })}
              </div>

              {/* ACTIVE SUITE DISPLAY CARD (LIGHT THEME) */}
              <div className='bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden'>
                <div className='grid lg:grid-cols-12 gap-0'>
                  {/* Left Column: Real Photographic Preview & Metrics */}
                  <div className='lg:col-span-5 p-6 sm:p-8 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between'>
                    <div>
                      {/* Real Image */}
                      <div className='relative rounded-2xl overflow-hidden mb-6 aspect-video sm:aspect-auto sm:h-64 border border-slate-200 shadow-sm'>
                        <img
                          src={currentSuite.mainImage}
                          alt={currentSuite.title}
                          className='w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700'
                          loading='lazy'
                        />
                        <div className='absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-blue-950 text-xs font-bold border border-slate-200 shadow-xs'>
                          {currentSuite.code} Suite
                        </div>
                      </div>

                      {/* Operational Metrics */}
                      <div className='mb-6'>
                        <div className='text-xs uppercase tracking-wider text-orange-600 font-bold mb-3'>
                          Operational Impact Metrics
                        </div>
                        <div className='grid grid-cols-3 gap-2 text-center'>
                          {currentSuite.metrics.map((m, idx) => (
                            <div key={idx} className='p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs'>
                              <div className='text-sm sm:text-base font-INB text-blue-950'>{m.value}</div>
                              <div className='text-[10px] text-slate-500 mt-0.5 leading-tight'>{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sub-module thumbnail card */}
                    <div className='p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-2xs'>
                      <img
                        src={currentSuite.subImage}
                        alt='Module preview'
                        className='w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0'
                        loading='lazy'
                      />
                      <div className='text-xs'>
                        <div className='font-bold text-blue-950'>{currentSuite.subImageLabel}</div>
                        <div className='text-slate-500 text-[11px]'>Integrated module & reporting engine</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Module Details & Actions */}
                  <div className='lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between'>
                    <div>
                      {/* Badge & Link */}
                      <div className='flex flex-wrap items-center justify-between gap-2 mb-3'>
                        <span className='px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200'>
                          {currentSuite.badge}
                        </span>
                        <Link
                          to={currentSuite.pageUrl}
                          className='text-xs text-blue-950 font-bold hover:text-orange-600 flex items-center gap-1 transition'
                        >
                          <span>Dedicated Sector Page</span>
                          <ExternalLink size={13} />
                        </Link>
                      </div>

                      <h3 className='text-2xl sm:text-3xl font-INB text-blue-950 mb-1'>
                        {currentSuite.title}
                      </h3>
                      <p className='text-orange-600 font-semibold text-xs sm:text-sm mb-4'>
                        {currentSuite.tagline}
                      </p>

                      <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6'>
                        {currentSuite.overview}
                      </p>

                      {/* 6 Core Functional Modules Grid */}
                      <div className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-3'>
                        Core Functional Modules
                      </div>
                      <div className='grid sm:grid-cols-2 gap-3 mb-6'>
                        {currentSuite.modules.map((mod, i) => (
                          <div
                            key={i}
                            className='p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition'
                          >
                            <div className='flex items-start gap-2.5'>
                              <span className='w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5'>
                                ✓
                              </span>
                              <div>
                                <h5 className='font-bold text-blue-950 text-xs sm:text-sm'>{mod.name}</h5>
                                <p className='text-slate-500 text-[11px] sm:text-xs mt-0.5 leading-snug'>{mod.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action Buttons (Highlighting /clientRegister) */}
                    <div className='pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3'>
                      <button
                        onClick={() => navigate('/clientRegister')}
                        className='w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
                      >
                        <Sparkles size={15} />
                        <span>Request Demo & Register on Client Portal</span>
                        <ArrowRight size={14} />
                      </button>

                      <Link
                        to={currentSuite.pageUrl}
                        className='w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-950 font-bold text-xs text-center transition'
                      >
                        View Full Architecture
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE ERP SCOPE ESTIMATOR (ALL LIGHT THEME) */}
          <section className='py-14 sm:py-20 bg-white border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='max-w-4xl mx-auto text-center mb-10'>
                <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                  Interactive Architecture Planner
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-blue-950 mt-1'>
                  Estimate Your ERP Requirements
                </h2>
                <p className='text-slate-600 mt-2 text-xs sm:text-sm sm:text-base'>
                  Select your operational parameters below to preview the recommended architecture, deployment timeline, and transition into our Client Registration Portal.
                </p>
              </div>

              <div className='bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 w-full max-w-6xl mx-auto shadow-sm'>
                <div className='grid md:grid-cols-3 gap-6 pb-8 border-b border-slate-200'>
                  {/* Step 1: Business Sector */}
                  <div>
                    <label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3'>
                      1. Business Sector
                    </label>
                    <div className='space-y-2'>
                      {[
                        { id: 'real-estate', name: 'Real Estate & Properties (REMS)' },
                        { id: 'education', name: 'School / College Education (SMS)' },
                        { id: 'inventory', name: 'Inventory & Warehouse (WMS)' },
                        { id: 'crm', name: 'Enterprise Sales CRM' },
                        { id: 'hr', name: 'HRMS & Biometric Payroll' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setCfgSector(s.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                            cfgSector === s.id
                              ? 'bg-orange-500 text-white font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span>{s.name}</span>
                          {cfgSector === s.id && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: User Scale */}
                  <div>
                    <label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3'>
                      2. Active Staff / Operators
                    </label>
                    <div className='space-y-2'>
                      {[
                        { id: '1-15', label: '1 to 15 Users', desc: 'Single location branch' },
                        { id: '16-50', label: '16 to 50 Users', desc: 'Growing multi-counter enterprise' },
                        { id: '51-200', label: '51 to 200 Users', desc: 'Large campus / multi-branch' },
                        { id: '200+', label: '200+ Enterprise', desc: 'Multi-entity corporate network' }
                      ].map((u) => (
                        <button
                          key={u.id}
                          onClick={() => setCfgUsers(u.id)}
                          className={`w-full text-left p-3 rounded-lg text-xs transition cursor-pointer ${
                            cfgUsers === u.id
                              ? 'bg-orange-500 text-white font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <div className='flex items-center justify-between font-bold'>
                            <span>{u.label}</span>
                            {cfgUsers === u.id && <Check size={14} />}
                          </div>
                          <div className={cfgUsers === u.id ? 'text-white/80' : 'text-slate-400'}>{u.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Deployment Mode */}
                  <div>
                    <label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3'>
                      3. Preferred Hosting
                    </label>
                    <div className='space-y-3'>
                      <button
                        onClick={() => setCfgDeployment('cloud')}
                        className={`w-full text-left p-3.5 rounded-xl text-xs transition cursor-pointer border ${
                          cfgDeployment === 'cloud'
                            ? 'bg-white border-2 border-orange-500 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className='font-bold text-blue-950 flex items-center justify-between'>
                          <span>Managed Cloud (99.9% SLA)</span>
                          {cfgDeployment === 'cloud' && <Check size={14} className='text-orange-500' />}
                        </div>
                        <p className='text-slate-500 text-[11px] mt-1'>
                          Automated daily backups, SSL encryption, zero local hardware maintenance.
                        </p>
                      </button>

                      <button
                        onClick={() => setCfgDeployment('onprem')}
                        className={`w-full text-left p-3.5 rounded-xl text-xs transition cursor-pointer border ${
                          cfgDeployment === 'onprem'
                            ? 'bg-white border-2 border-orange-500 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className='font-bold text-blue-950 flex items-center justify-between'>
                          <span>On-Premises Local Server</span>
                          {cfgDeployment === 'onprem' && <Check size={14} className='text-orange-500' />}
                        </div>
                        <p className='text-slate-500 text-[11px] mt-1'>
                          Installed on your local office server for private air-gapped data retention.
                        </p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Estimate Summary & Direct Link to Client Register */}
                <div className='pt-6 flex flex-col lg:flex-row items-center justify-between gap-6'>
                  <div className='space-y-1 text-center lg:text-left'>
                    <div className='text-xs uppercase tracking-wider text-orange-600 font-bold'>
                      Selected Architecture Plan
                    </div>
                    <div className='text-base sm:text-lg font-INB text-blue-950'>
                      {configuratorInfo.sectorName} • {configuratorInfo.modules}
                    </div>
                    <div className='text-xs text-slate-500 flex flex-wrap gap-4 justify-center lg:justify-start'>
                      <span>⏱ Est. Go-Live: <strong>{configuratorInfo.timeline}</strong></span>
                      <span>🌐 Hosting: <strong>{configuratorInfo.hostingType}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/clientRegister')}
                    className='w-full sm:w-auto px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer'
                  >
                    <span>Configure in Client Portal (/clientRegister)</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CROSS-PLATFORM ARCHITECTURAL CAPABILITIES (LIGHT THEME) */}
          <section className='py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='max-w-4xl mb-12 text-center sm:text-left'>
                <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                  Architectural Foundation
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-blue-950 mt-1'>
                  Core Capabilities Built Into Every System
                </h2>
                <p className='text-slate-600 mt-2 text-sm sm:text-base'>
                  Every ERP deployment includes fine-grained security, multi-channel messaging, and Indian statutory compliance out-of-the-box.
                </p>
              </div>

              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[
                  {
                    icon: Lock,
                    title: 'Role-Based Access Control (RBAC)',
                    desc: 'Granular permissions for Cashiers, Accountants, Teachers, Doctors, Mechanics, and Directors with immutable audit logs.'
                  },
                  {
                    icon: Zap,
                    title: 'Automated WhatsApp & SMS Gateway',
                    desc: 'Instant alerts for fee receipts, loan EMI schedules, patient OPD tokens, and vehicle delivery notices sent to client phones.'
                  },
                  {
                    icon: MonitorCheck,
                    title: 'Biometric & IoT Hardware Sync',
                    desc: 'Direct plug-and-play drivers for fingerprint scanners, facial recognition cameras, barcode scanners, and thermal receipt printers.'
                  },
                  {
                    icon: FileText,
                    title: 'Statutory GST & Tax Compliance',
                    desc: 'Built-in GST e-invoices, HSN/SAC mapping, TDS deduction calculators, profit & loss, and trial balance reports ready for statutory audits.'
                  },
                  {
                    icon: Building2,
                    title: 'Multi-Branch & Campus Sync',
                    desc: 'Connect geographically separated branches, warehouses, or schools with centralized executive visibility and inter-branch inventory logs.'
                  },
                  {
                    icon: Server,
                    title: 'Encrypted Daily Cloud Backups',
                    desc: 'Automated snapshot backups stored on ISO-certified servers with one-click disaster recovery and 99.9% uptime availability.'
                  }
                ].map((cap, i) => {
                  const Icon = cap.icon
                  return (
                    <div
                      key={i}
                      className='p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300'
                    >
                      <div className='w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4'>
                        <Icon size={20} />
                      </div>
                      <h3 className='text-base font-INB text-blue-950 mb-1.5'>{cap.title}</h3>
                      <p className='text-slate-600 text-xs sm:text-sm leading-relaxed'>{cap.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* 4-STAGE ROADMAP (LIGHT THEME) */}
          <section className='py-14 sm:py-20 bg-white border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='text-center max-w-4xl mx-auto mb-12'>
                <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                  Transparent Execution
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-blue-950 mt-1'>
                  4-Stage Deployment Roadmap
                </h2>
                <p className='text-slate-600 mt-2 text-xs sm:text-sm sm:text-base'>
                  We ensure zero operational disruption through milestone-driven data migration and staff onboarding.
                </p>
              </div>

              <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {[
                  {
                    step: '01',
                    phase: 'Discovery & Audit',
                    days: 'Days 1 to 5',
                    desc: 'Mapping your existing spreadsheets, workflows, and user permission hierarchy.'
                  },
                  {
                    step: '02',
                    phase: 'Architecture Tailoring',
                    days: 'Days 6 to 18',
                    desc: 'Configuring fee slabs, loan parameters, parts heads, and branding elements.'
                  },
                  {
                    step: '03',
                    phase: 'Migration & Training',
                    days: 'Days 19 to 27',
                    desc: 'Sanitizing historical records into the ERP and conducting hands-on training for staff.'
                  },
                  {
                    step: '04',
                    phase: 'Go-Live & Dedicated SLA',
                    days: 'Day 28+',
                    desc: 'Parallel run verification, seamless cutover, and ongoing priority technical assistance from Mohali.'
                  }
                ].map((s, idx) => (
                  <div key={idx} className='p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs'>
                    <div className='text-3xl font-black text-slate-300 mb-2'>{s.step}</div>
                    <div className='text-xs font-bold uppercase tracking-wider text-orange-600 mb-1'>{s.days}</div>
                    <h3 className='text-base font-INB text-blue-950 mb-1'>{s.phase}</h3>
                    <p className='text-slate-600 text-xs leading-relaxed'>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DEDICATED "CONTACT US FOR OUR ERP SERVICES" (ALL LIGHT THEME) */}
          <section id='contact-erp' className='py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-orange-50/30 border-b border-slate-200'>
            <div className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
              <div className='text-center max-w-4xl mx-auto mb-14'>
                <span className='inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 mb-3'>
                  Get Started With Pisoft ERP
                </span>
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-INB text-blue-950 leading-tight'>
                  Ready to Automate Your Operations? <br />
                  <span className='text-orange-500'>Contact Us for ERP Services</span>
                </h2>
                <p className='text-slate-600 mt-3 text-sm sm:text-base'>
                  Use our self-service Client Registration portal to configure your modules directly, or connect with our software architects in Mohali for a personalized walkthrough.
                </p>
              </div>

              {/* DUAL CARDS (ALL LIGHT THEME) */}
              <div className='grid lg:grid-cols-12 gap-8 items-stretch'>
                {/* CARD 1: CLIENT REGISTRATION GATEWAY */}
                <div className='lg:col-span-6 rounded-3xl p-6 sm:p-10 bg-white border-2 border-orange-400 shadow-xl flex flex-col justify-between relative'>
                  <div className='absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs'>
                    Recommended Direct Route
                  </div>

                  <div>
                    <div className='w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5'>
                      <Building2 size={26} />
                    </div>

                    <h3 className='text-xl sm:text-2xl font-INB text-blue-950 mb-2'>
                      Client Registration & Onboarding Portal
                    </h3>
                    <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6'>
                      Configure your system in minutes. Access our dedicated client registration gateway to choose your business profile, pick mandatory and optional modules, view pricing, and submit your enterprise parameters.
                    </p>

                    <div className='space-y-3 mb-8'>
                      {[
                        'Choose exact industry profile (Real Estate, Education, Inventory, CRM, HRMS)',
                        'Real-time module selection and transparent license fee calculator',
                        'Direct integration with our Mohali engineering deployment queue',
                        'Free architecture walkthrough and preview instance setup'
                      ].map((item, idx) => (
                        <div key={idx} className='flex items-start gap-2.5'>
                          <CheckCircle2 size={16} className='text-emerald-600 flex-shrink-0 mt-0.5' />
                          <span className='text-slate-700 text-xs sm:text-sm font-medium'>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='pt-6 border-t border-slate-100'>
                    <button
                      onClick={() => navigate('/clientRegister')}
                      className='w-full py-4 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer'
                    >
                      <span>Proceed to Client Registration Portal</span>
                      <ArrowRight size={17} />
                    </button>
                    <p className='text-center text-xs text-slate-400 mt-2'>
                      Access portal at: <code className='text-blue-950 font-bold'>/clientRegister</code>
                    </p>
                  </div>
                </div>

                {/* CARD 2: DIRECT CONSULTATION DESK */}
                <div className='lg:col-span-6 rounded-3xl p-6 sm:p-10 bg-white border border-slate-200 shadow-md flex flex-col justify-between'>
                  <div>
                    <div className='w-12 h-12 rounded-2xl bg-blue-100 text-blue-950 flex items-center justify-center mb-5'>
                      <Headphones size={26} />
                    </div>

                    <h3 className='text-xl sm:text-2xl font-INB text-blue-950 mb-2'>
                      Direct Architecture Consultation Desk
                    </h3>
                    <p className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6'>
                      Prefer to speak directly with an enterprise ERP architect before registering? Call us, email our office in Mohali, or submit a callback request below.
                    </p>

                    {/* Direct Contact Pills */}
                    <div className='grid sm:grid-cols-2 gap-3 mb-6'>
                      <a
                        href='tel:+918288029916'
                        className='p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition flex items-center gap-3'
                      >
                        <div className='w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0'>
                          <Phone size={17} />
                        </div>
                        <div className='overflow-hidden'>
                          <div className='text-[10px] uppercase text-slate-500 font-bold'>Call ERP Team</div>
                          <div className='text-xs sm:text-sm font-bold text-blue-950 truncate'>+91 82880 29916</div>
                        </div>
                      </a>

                      <a
                        href='mailto:contact@pisoftinformatics.com'
                        className='p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition flex items-center gap-3'
                      >
                        <div className='w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0'>
                          <Mail size={17} />
                        </div>
                        <div className='overflow-hidden'>
                          <div className='text-[10px] uppercase text-slate-500 font-bold'>Email Us</div>
                          <div className='text-xs sm:text-sm font-bold text-blue-950 truncate'>contact@pisoftinformatics.com</div>
                        </div>
                      </a>
                    </div>

                    {/* Quick Callback Form */}
                    {formSubmitted ? (
                      <div className='p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center my-4'>
                        <CheckCircle2 size={32} className='text-emerald-600 mx-auto mb-2' />
                        <h4 className='text-base font-bold text-blue-950'>Inquiry Received!</h4>
                        <p className='text-slate-600 text-xs mt-1'>
                          Our ERP architects will review your parameters and call you back shortly.
                        </p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className='mt-3 text-xs text-orange-600 underline font-bold cursor-pointer'
                        >
                          Submit another inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className='space-y-3'>
                        <div className='grid sm:grid-cols-2 gap-3'>
                          <input
                            type='text'
                            name='name'
                            placeholder='Your Name *'
                            value={inquiryData.name}
                            onChange={handleInquiryChange}
                            className='w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500'
                            required
                          />
                          <input
                            type='tel'
                            name='phone'
                            placeholder='Phone / WhatsApp *'
                            value={inquiryData.phone}
                            onChange={handleInquiryChange}
                            className='w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500'
                            required
                          />
                        </div>

                        <div className='grid sm:grid-cols-2 gap-3'>
                          <input
                            type='email'
                            name='email'
                            placeholder='Email Address *'
                            value={inquiryData.email}
                            onChange={handleInquiryChange}
                            className='w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500'
                            required
                          />
                          <input
                            type='text'
                            name='organization'
                            placeholder='Organization Name'
                            value={inquiryData.organization}
                            onChange={handleInquiryChange}
                            className='w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500'
                          />
                        </div>

                        <div className='grid sm:grid-cols-2 gap-3'>
                          <select
                            name='sector'
                            value={inquiryData.sector}
                            onChange={handleInquiryChange}
                            className='w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:border-orange-500'
                          >
                            <option value='Real Estate ERP (REMS)'>Real Estate ERP (REMS)</option>
                            <option value='School / College ERP (SMS)'>School / College ERP (SMS)</option>
                            <option value='Inventory & Warehouse ERP (WMS)'>Inventory & Warehouse ERP (WMS)</option>
                            <option value='Enterprise Sales CRM'>Enterprise Sales CRM</option>
                            <option value='HRMS & Biometric Payroll ERP'>HRMS & Biometric Payroll ERP</option>
                          </select>
                          <input
                            type='text'
                            name='message'
                            placeholder='Specific requirements?'
                            value={inquiryData.message}
                            onChange={handleInquiryChange}
                            className='w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500'
                          />
                        </div>

                        {formError && <p className='text-xs text-rose-500'>{formError}</p>}

                        <button
                          type='submit'
                          disabled={formSubmitting}
                          className='w-full py-3 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer'
                        >
                          <Send size={14} className='text-orange-400' />
                          <span>{formSubmitting ? 'Submitting...' : 'Request Architecture Consultation Callback'}</span>
                        </button>
                      </form>
                    )}
                  </div>

                  <div className='pt-4 border-t border-slate-100 mt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5'>
                    <MapPin size={13} className='text-orange-500' />
                    <span>Pisoft Informatics • F-468, Industrial Focal Point, Phase 8-B, S.A.S. Nagar, Mohali, Punjab, 140307, India</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FREQUENTLY ASKED QUESTIONS (LIGHT THEME) */}
          <section className='py-14 sm:py-20 bg-white'>
            <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10'>
              <div className='text-center mb-10'>
                <span className='text-orange-600 font-bold uppercase tracking-wider text-xs'>
                  Clear Answers
                </span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-INB text-blue-950 mt-1'>
                  Frequently Asked Questions
                </h2>
                <p className='text-slate-600 mt-2 text-xs sm:text-sm sm:text-base'>
                  Straightforward answers about our ERP architecture, migration protocols, and client onboarding.
                </p>
              </div>

              <div className='space-y-3.5'>
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div
                      key={index}
                      className='rounded-2xl border border-slate-200 overflow-hidden transition-colors'
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className='w-full p-4 sm:p-5 text-left font-INB text-blue-950 hover:text-orange-600 transition flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100 cursor-pointer'
                      >
                        <span className='text-sm sm:text-base leading-snug'>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-orange-500' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className='p-4 sm:p-5 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed bg-white border-t border-slate-100'>
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* STICKY BOTTOM CONVERSION DOCK (LIGHT THEME) */}
          <AnimatePresence>
            {showStickyBar && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40'
              >
                <div className='p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl flex items-center justify-between gap-3'>
                  <div>
                    <div className='text-xs font-bold text-orange-600 flex items-center gap-1.5'>
                      <span className='w-2 h-2 rounded-full bg-orange-500 animate-ping' />
                      <span>Ready to Deploy Your ERP?</span>
                    </div>
                    <div className='text-xs text-slate-500 truncate'>Call: +91 82880 29916</div>
                  </div>
                  <button
                    onClick={() => navigate('/clientRegister')}
                    className='px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer'
                  >
                    <span>Register Now</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FOOTER */}
          <Footer />
        </>
      )}
    </main>
  )
}
