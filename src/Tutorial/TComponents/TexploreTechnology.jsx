import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ArrowRight,
  ChevronRight,
  Grid,
  Globe,
  Database,
  Infinity as DevOpsIcon,
  ChevronDown,
  BookOpen,
  FolderGit2,
  Sparkles
} from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'All Technologies', icon: Grid },
  { id: 'python', label: 'Python', badge: 'PY' },
  { id: 'java', label: 'Java', badge: '☕' },
  { id: 'javascript', label: 'JavaScript', badge: 'JS' },
  { id: 'web', label: 'Web Dev', icon: Globe },
  { id: 'databases', label: 'Databases', icon: Database },
  { id: 'devops', label: 'DevOps', icon: DevOpsIcon }
]

const SECTIONS = [
  {
    id: 'python',
    title: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    items: [
      {
        name: 'Django',
        tag: 'Framework',
        tagBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
        desc: 'The high-level Python web framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'
      },
      {
        name: 'Flask',
        tag: 'Micro Framework',
        tagBg: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
        desc: 'Lightweight WSGI web application framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg'
      },
      {
        name: 'NumPy',
        tag: 'Library',
        tagBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/50',
        desc: 'Fundamental package for scientific computing',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg'
      },
      {
        name: 'Pandas',
        tag: 'Library',
        tagBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/50',
        desc: 'Data analysis and manipulation tool',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg'
      },
      {
        name: 'TensorFlow',
        tag: 'Machine Learning',
        tagBg: 'bg-purple-500/10 text-purple-600 border-purple-200/50',
        desc: 'End-to-end machine learning platform',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'
      }
    ]
  },
  {
    id: 'java',
    title: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    items: [
      {
        name: 'Spring Boot',
        tag: 'Framework',
        tagBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
        desc: 'Build production-ready Spring applications',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
      },
      {
        name: 'Hibernate',
        tag: 'ORM',
        tagBg: 'bg-amber-500/10 text-amber-600 border-amber-200/50',
        desc: 'Object-relational mapping for Java applications',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
      },
      {
        name: 'Spring Framework',
        tag: 'Framework',
        tagBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
        desc: 'Core framework for enterprise Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
      },
      {
        name: 'Java Streams',
        tag: 'Core Java',
        tagBg: 'bg-orange-500/10 text-orange-600 border-orange-200/50',
        desc: 'Process collections of objects functionally',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
      },
      {
        name: 'Spring Security',
        tag: 'Security',
        tagBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
        desc: 'Authentication and access control framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
      }
    ]
  },
  {
    id: 'php',
    title: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    items: [
      {
        name: 'Laravel',
        tag: 'Framework',
        tagBg: 'bg-rose-500/10 text-rose-600 border-rose-200/50',
        desc: 'Elegant PHP web development framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
      },
      {
        name: 'CodeIgniter',
        tag: 'Framework',
        tagBg: 'bg-rose-500/10 text-rose-600 border-rose-200/50',
        desc: 'Simple and lightweight PHP framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg'
      },
      {
        name: 'Symfony',
        tag: 'Framework',
        tagBg: 'bg-rose-500/10 text-rose-600 border-rose-200/50',
        desc: 'Full-stack PHP framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg'
      },
      {
        name: 'PHPUnit',
        tag: 'Testing',
        tagBg: 'bg-amber-500/10 text-amber-600 border-amber-200/50',
        desc: 'Unit testing framework for PHP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
      },
      {
        name: 'Composer',
        tag: 'Tool',
        tagBg: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
        desc: 'Dependency manager for PHP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/composer/composer-original.svg'
      }
    ]
  }
]

export default function ModernExploreTechnologies () {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter logic
  const filteredSections = SECTIONS.filter(sec => {
    if (activeCategory !== 'all' && sec.id !== activeCategory) return false
    if (!searchQuery) return true
    return sec.items.some(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <section className='py-10 bg-slate-50/70 text-slate-800 font-sans relative overflow-hidden'>
      {/* Background Subtle Grid & Light Orbs */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none' />
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-blue-200/30 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Search & Filter Header Section */}
        <div className='flex flex-col items-center mb-12'>
          <div className='text-center max-w-2xl mx-auto mb-8'>
            <h2 className='text-3xl sm:text-4xl font-INB text-slate-900 tracking-tight'>
              Explore <span className='text-orange-600'>Technologies</span>
            </h2>

            <p className='mt-3 text-slate-500 text-sm sm:text-base leading-relaxed'>
              Choose your technology and start your learning journey with our
              expert-curated tutorials
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full max-w-xl relative mb-6'
          >
            <div className='relative flex items-center bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 focus-within:bg-white'>
              <Search className='w-5 h-5 text-slate-400 ml-4 shrink-0' />
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search technologies, frameworks, tools...'
                className='w-full py-3.5 pl-3 pr-12 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none'
              />
            </div>
          </motion.div>

          {/* Filter Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='flex items-center gap-2 overflow-x-auto pb-2 max-w-full scrollbar-none'
          >
            {CATEGORIES.map(cat => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-md shadow-orange-500/20'
                      : 'bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200/70 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId='activeFilterBg'
                      className='absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                  <span className='relative z-10 flex items-center gap-2'>
                    {Icon && <Icon className='w-3.5 h-3.5' />}
                    {cat.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-INB ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {cat.badge}
                      </span>
                    )}
                    <span>{cat.label}</span>
                  </span>
                </button>
              )
            })}

            <button className='flex items-center gap-1 px-4 py-2 bg-white/80 border border-slate-200/70 text-slate-600 hover:bg-white text-xs font-semibold rounded-xl whitespace-nowrap transition-all'>
              More <ChevronDown className='w-3.5 h-3.5' />
            </button>
          </motion.div>
        </div>

        {/* Dynamic Technology Sections */}
        <AnimatePresence mode='wait'>
          <div className='space-y-12'>
            {filteredSections.map(section => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='relative'
              >
                {/* Section Title Bar */}
                <div className='flex items-center justify-between mb-5'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={section.icon}
                      alt={section.title}
                      className='w-7 h-7 object-contain'
                    />
                    <h3 className='text-xl font-INB text-slate-900 tracking-tight'>
                      {section.title}
                    </h3>
                  </div>

                  <a
                    href={`#${section.id}`}
                    className='group inline-flex items-center gap-1 text-xs font-INB text-orange-600 hover:text-orange-700 transition-colors'
                  >
                    View All
                    <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-1 transition-transform' />
                  </a>
                </div>

                {/* Grid with Interactive Cards */}
                <div className='relative group/carousel'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
                    {section.items.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className='bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 group/card relative overflow-hidden'
                      >
                        {/* Top Accent Line */}
                        <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover/card:opacity-100 transition-opacity' />

                        <div>
                          {/* Header: Icon, Name & Tag */}
                          <div className='flex items-start gap-3 mb-3'>
                            <div className='w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 p-2.5 flex items-center justify-center shrink-0 group-hover/card:scale-105 group-hover/card:bg-orange-50/50 transition-all'>
                              <img
                                src={item.icon}
                                alt={item.name}
                                className='w-full h-full object-contain'
                              />
                            </div>
                            <div className='min-w-0 flex-1'>
                              <h4 className='font-INB text-sm text-slate-900 group-hover/card:text-orange-600 transition-colors truncate'>
                                {item.name}
                              </h4>
                              <span
                                className={`inline-block text-[10px] font-INB px-2 py-0.5 rounded-md mt-1 border ${item.tagBg}`}
                              >
                                {item.tag}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className='text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4'>
                            {item.desc}
                          </p>
                        </div>

                        {/* Footer Stats & Action Button */}
                        <div>
                          <button className='w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-slate-50 group-hover/card:bg-orange-600 text-slate-700 group-hover/card:text-white text-xs font-INB transition-all duration-200'>
                            <span>Start Learning</span>
                            <ArrowRight className='w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform' />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Nav Button */}
                  <button className='hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-110 active:scale-95 transition-all z-20'>
                    <ChevronRight className='w-4 h-4' />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Bottom Request Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mt-14 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent rounded-2xl border border-orange-200/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm'
        >
          <div className='flex items-center gap-4 text-center sm:text-left'>
            <div className='w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20'>
              <Sparkles className='w-6 h-6' />
            </div>
            <div>
              <h4 className='text-base font-INB text-slate-900'>
                Can't find what you're looking for?
              </h4>
              <p className='text-xs sm:text-sm text-slate-500 mt-0.5'>
                Request a technology and we'll add it to our learning platform
              </p>
            </div>
          </div>

          <button className='px-5 py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-INB text-xs sm:text-sm rounded-xl shadow-md shadow-orange-600/20 transition-all shrink-0 flex items-center gap-2'>
            Request Technology <ArrowRight className='w-4 h-4' />
          </button>
        </motion.div>
      </div>
    </section>
  )
}