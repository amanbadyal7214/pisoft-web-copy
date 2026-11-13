import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import ScrollToHashElement from '../components/ScrollToHash'
import { Example } from '../components/Corn'
import Navbar from '../components/Navbar'
import { NavbarDemo } from '../components/navbar/Navbar2'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import Footer from '../components/Footer'

function ProjectDrawer ({ project, onClose }) {
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className='fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm'
          />

          {/* Drawer Panel */}
          <motion.div
            key='drawer'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className='fixed top-0 right-0 z-[201] h-screen w-full max-w-2xl bg-white shadow-2xl flex flex-col'
          >
            {/* Header */}
            <div className='flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white sticky top-0 z-10'>
              <div className='flex items-center gap-2'>
                {project.category && (
                  <span className='px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 rounded-md border border-blue-100'>
                    {project.category}
                  </span>
                )}
                <span className='text-sm font-bold text-slate-800 line-clamp-1'>
                  {project.caption || 'Project Details'}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label='Close drawer'
                className='w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 text-slate-500 transition-colors'
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div
              className='flex-1 overflow-y-auto overscroll-contain'
              onWheel={e => e.stopPropagation()}
              onTouchMove={e => e.stopPropagation()}
            >
              {/* Project Image */}
              <div className='relative w-full aspect-video bg-slate-900 overflow-hidden'>
                <img
                  src={project.image_url}
                  alt={project.caption || 'Project'}
                  className='w-full h-full object-fit'
                />
                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
              </div>

              {/* Details */}
              <div className='p-6'>
                {/* Title */}
                <h2 className='text-xl font-INB text-slate-900 mb-3 leading-snug'>
                  {project.caption || 'Client Project'}
                </h2>

                {/* Divider */}
                <div className='w-12 h-1 rounded-full bg-orange-500 mb-4' />

                {/* Description */}
                <div className='mb-6'>
                  <h3 className='text-xs font-bold tracking-widest uppercase text-slate-400 mb-2'>
                    About this Project
                  </h3>
                  <p className='text-sm text-slate-600 leading-relaxed'>
                    {project.description ||
                      'Custom software solution engineered with high performance and modern standards.'}
                  </p>
                </div>

                {/* Meta info */}
                <div className='grid grid-cols-2 gap-3 mb-6'>
                  <div className='bg-slate-50 rounded-xl p-3 border border-slate-100'>
                    <p className='text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1'>Category</p>
                    <p className='text-sm font-bold text-slate-800'>{project.category || '—'}</p>
                  </div>
                  <div className='bg-slate-50 rounded-xl p-3 border border-slate-100'>
                    <p className='text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1'>Type</p>
                    <p className='text-sm font-bold text-slate-800'>
                      {project.website_url ? 'Live Website' : 'Internal App'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col gap-3'>
                  {project.website_url && (
                    <a
                      href={project.website_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-200'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                      </svg>
                      Visit Live Site
                    </a>
                  )}

                  {project.file_path && (
                    <a
                      href={project.file_path}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all border border-slate-200'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                      </svg>
                      Download Case Study
                    </a>
                  )}

                  {!project.website_url && !project.file_path && (
                    <p className='text-center text-sm text-slate-400 italic py-2'>No links available for this project.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const dummyProjects = [
  {
    id: 6,
    category: 'Website',
    caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: 'https://www.pisoftinformatics.com/',
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx'
  },
  {
    id: 7,
    category: 'Website',
  caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: 'https://www.pisoftinformatics.com/',
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx'
  },
  {
    id: 8,
    category: 'Website',
    caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: 'https://www.pisoftinformatics.com/',
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx'
  },
  {
    id: 9,
    category: 'Website',
    caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: 'https://www.pisoftinformatics.com/',
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx'
  },
  {
    id: 5,
    category: 'Website',
   caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: '',
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787373029/CaseStudies/Images/ur85zamgxxve1afz4eks.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787373030/CaseStudies/Docs/case_study_1787373030107-311028188.docx'
  },
  {
    id: 4,
    category: 'Portal',
    caption: 'xfdgxdfghdf',
    description: 'zsdgfsdgsdfh',
    website_url: null,
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787290343/CaseStudies/Images/y0asvwght4njeklmxf66.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787290343/CaseStudies/Docs/case_study_1787290341636-107446393.docx'
  },
  {
    id: 3,
    category: 'Portal',
    caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: null,
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787290239/CaseStudies/Images/fwrqttgc1lt5ziokii6h.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787290239/CaseStudies/Docs/case_study_1787290237589-13503753.docx'
  },
  {
    id: 2,
    category: 'App',
    caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: null,
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787290035/CaseStudies/Images/mljnwdb6k4vuokkksjdu.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787290035/CaseStudies/Docs/case_study_1787290033452-629295466.docx'
  },
  {
    id: 1,
    category: 'ERP',
    caption: 'SOFTWARE PRODUCT',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
    website_url: null,
    image_url:
      'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787289647/CaseStudies/Images/g3qosl6tani7hqlykuta.jpg',
    file_path:
      'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787289643/CaseStudies/Docs/case_study_1787289638876-126438062.docx'
  }
]

function AllProjects () {
  const [showAuthButtons, setShowAuthButtons] = useState(true)
  const [showLanyard, setShowLanyard] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get('category') || 'All'
  })

  const containerRef = useRef(null)

  // useEffect(() => {
  //   const onScroll = () => {
  //     const y = window.scrollY
  //     setShowAuthButtons(y <= 100)
  //     setShowLanyard(y <= 240 && window.innerWidth >= 768)
  //   }
  //   window.addEventListener('scroll', onScroll, { passive: true })
  //   onScroll()
  //   return () => window.removeEventListener('scroll', onScroll)
  // }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const xTransform = useTransform(scrollYProgress, [0, 1], [100, -300])

  const tabs = [
    { id: 'All', label: 'All Projects' },
    { id: 'Website', label: 'Website Application' },
    { id: 'App', label: 'Mobile App' },
    { id: 'Portal', label: 'Portal' },
    { id: 'ERP', label: 'ERP Solution' }
  ]

  const projectsToRender =
    activeTab === 'All'
      ? dummyProjects
      : dummyProjects.filter(p => p.category === activeTab)

  return (
    <div className='bg-[#f2f4f7] min-h-screen'>
      {/* Project Detail Drawer — rendered at root so it overlays everything */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <Helmet>
        <title>All Projects | PiSoft Informatics</title>
        <meta
          name='description'
          content='Explore all the stunning projects and case studies developed by PiSoft Informatics.'
        />
      </Helmet>

      <ScrollToHashElement />
      <Suspense fallback={null}>
        <SocialLinks className='hidden lg:block' />
      </Suspense>

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

      <main className='w-full overflow-hidden'>
        <div className='w-full flex flex-col bg-white relative rounded-2xl shadow-xl'>
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

          {/* Hero Section */}
          <div className='relative w-full overflow-hidden bg-[#fef5ec] rounded-t-2xl pb-16 md:pb-24'>
            {/* Background Geometric Line Overlay */}
            <svg
              className='absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-40 z-0'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 500 500'
              fill='none'
            >
              <path
                d='M100,50 L400,80 L450,350 L200,450 Z'
                stroke='#f97316'
                strokeWidth='0.8'
                strokeDasharray='4 4'
              />
              <path
                d='M150,100 L350,60 L420,280 L180,380 Z'
                stroke='#f97316'
                strokeWidth='0.8'
              />
              <path
                d='M50,150 L380,120 L480,400 L120,480 Z'
                stroke='#ea580c'
                strokeWidth='0.5'
              />
              <path
                d='M200,20 L480,150 L350,480 L80,250 Z'
                stroke='#f97316'
                strokeWidth='0.6'
              />
            </svg>

            {/* Soft Glow Blobs */}
            <div className='absolute top-0 left-0 w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none' />
            <div className='absolute bottom-10 right-10 w-[350px] h-[350px] bg-orange-300/20 rounded-full blur-3xl pointer-events-none' />

            <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 md:pt-40 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
              {/* Left Text */}
              <div className='text-center md:text-left'>
                <div className='inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 rounded-full px-4 py-1.5 mb-6'>
                  <span className='text-xs font-INB tracking-wide text-orange-800'>
                    Our Portfolio
                  </span>
                </div>

                <h1 className='text-4xl md:text-6xl lg:text-6xl font-INB mb-6 leading-[1.1] text-slate-900'>
                  Our Client <br />  
                  <span className='text-orange-500'>Masterpieces</span>
                </h1>

                <p className='text-slate-600 text-base md:text-lg max-w-lg mx-auto md:mx-0 font-in mb-8 leading-relaxed'>
                  Our client masterpieces showcase responsive web applications,
                  custom business dashboards, modern ecommerce portals, and
                  scalable cloud systems.
                </p>

                {/* Stats Row */}
                <div className='flex flex-wrap justify-center md:justify-start gap-10'>
                  {[
                    ['50+', 'Projects Delivered'],
                    ['10+', 'Industries Served'],
                    ['100%', 'Client Satisfaction']
                  ].map(([num, label]) => (
                    <div key={label} className='text-center md:text-left'>
                      <div className='text-3xl font-INB text-slate-900'>
                        {num}
                      </div>
                      <div className='text-xs font-in text-slate-500 mt-1'>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Framed Dashboard Preview */}
              <div className='flex items-center justify-center relative'>
                <div className='relative w-full max-w-lg bg-white p-1 md:p-2 rounded-2xl shadow-[0_20px_50px_rgba(249,115,22,0.15)] border border-slate-100'>
                  <div className='overflow-hidden rounded-xl bg-slate-900 aspect-[18/10] relative group'>
                    <img
                      src='./client.jfif'
                      alt='Featured Dashboard'
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Smooth Hero Bottom Wave */}
            <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-1'>
              <svg
                className='relative block w-full h-[50px] md:h-[80px]'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1200 120'
                preserveAspectRatio='none'
              >
                <path
                  d='M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z'
                  fill='#ffffff'
                ></path>
              </svg>
            </div>
          </div>

          {/* Grid Area with Scroll Section & Asymmetric Masonry */}
          <div
            ref={containerRef}
            className='py-8 bg-white rounded-b-2xl overflow-hidden'
          >
            {/* Centered Heading with Underline Accent */}
            <div className='flex flex-col items-center justify-center text-center mb-6 px-4'>
              <h2 className='text-3xl md:text-4xl font-INB text-slate-900 tracking-tight'>
                Our Completed Projects
              </h2>
              <svg
                className='w-48 md:w-64 h-3 mt-1.5 text-orange-500'
                viewBox='0 0 200 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2 9C50 3 150 2 198 8'
                  stroke='currentColor'
                  strokeWidth='3.5'
                  strokeLinecap='round'
                />
              </svg>
            </div>

            {/* Scroll Animated Marquee Bar */}
            <div className='w-full overflow-hidden mb-8 whitespace-nowrap'>
              <motion.div
                style={{ x: xTransform }}
                className='text-4xl md:text-5xl font-INB text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-900 tracking-tighter uppercase flex items-center space-x-8'
              >
                <span>OUR PROJECTS </span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS </span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
                <span className='text-blue-300 mx-4'>•</span>
                <span>OUR PROJECTS</span>
              </motion.div>
            </div>

            {/* Filter Buttons */}
            <div className='max-w-7xl mx-auto px-2 md:px-4'>
              <div className='flex flex-wrap justify-center gap-2 md:gap-4 mb-8'>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2.5 rounded-full font-INB text-xs md:text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-white text-blue-950 border border-blue-100 hover:bg-blue-50 shadow-sm'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Asymmetric Tight Grid Masonry */}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {projectsToRender.map((project, index) => {
                  // Alternate pure Blue & Orange accent backgrounds for top photo frame cutout
                  const accentColors = ['bg-orange-300/50', 'bg-orange-300/50']
                  const currentAccent =
                    accentColors[index % accentColors.length]

                  return (
                    <motion.div
                      key={`${project.id}-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedProject(project)}
                      className='group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer'
                    >
                      {/* Exact Photo Frame from Reference (Top-Left & Bottom-Right Arch Cutout) */}
                      <div
                        className={`relative w-full aspect-[4/3] ${currentAccent} p-1.5 overflow-hidden rounded-tl-[40px] rounded-br-[40px]`}
                      >
                        <div className='relative w-full h-full overflow-hidden rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md bg-slate-900 shadow-inner'>
                          <img
                            src={project.image_url}
                            alt={project.caption || 'Project Showcase'}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
                            loading='lazy'
                          />
                        </div>
                      </div>

                      {/* Improved & Polished Content Area */}
                      <div className='p-3.5 flex-1 flex flex-col justify-between bg-white'>
                        <div>
                          {/* Category Tag */}
                          {project.category && (
                            <span className='inline-block px-2.5 py-0.5 mb-2 text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 rounded-md border border-blue-100'>
                              {project.category}
                            </span>
                          )}

                          {/* Title */}
                          <h3 className='text-xs md:text-sm font-bold text-slate-900 mb-1 leading-snug group-hover:text-orange-500 transition-colors line-clamp-1'>
                            {project.caption || 'Client Project'}
                          </h3>

                          {/* Description */}
                          <p className='text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3'>
                            {project.description ||
                              'Custom software solution engineered with high performance and modern standards.'}
                          </p>
                        </div>

                        {/* Clean Interactive Action Buttons */}
                        <div className='pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2'>
                          {project.website_url ? (
                            <a
                              href={project.website_url}
                              target='_blank'
                              rel='noopener noreferrer'
                              onClick={e => e.stopPropagation()}
                              className='flex-1 py-1.5 px-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] rounded-lg text-center transition-all shadow-sm'
                            >
                              Visit Site &rarr;
                            </a>
                          ) : (
                            <span className='text-[10px] text-slate-400 italic font-medium'>
                              Internal App
                            </span>
                          )}

                          {project.file_path && (
                            <a
                              href={project.file_path}
                              target='_blank'
                              rel='noopener noreferrer'
                              onClick={e => e.stopPropagation()}
                              className='flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded-lg text-center transition-all'
                            >
                              Case Study
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AllProjects
