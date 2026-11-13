import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  Play,
  Search,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Cpu,
  Award,
  ChevronRight,
  Copy,
  Star,
  Check
} from 'lucide-react'

// Ensure these path imports match your project layout
import THeader from '../TComponents/THeader'
import TFooter from '../TComponents/TFooter'
import {
  BlueDotGrid,
  CircleDot,
  DotGrid,
  StarShape
} from '../TComponents/DecorativeElement'
import ExploreTechnologies from '../TComponents/TexploreTechnology'

// Code snippets for the live interactive hero playground
const CODE_SNIPPETS = {
  react: {
    filename: 'InteractiveApp.jsx',
    language: 'JSX',
    code: `import React, { useState } from 'react';

export default function TechCard() {
  const [active, setActive] = useState(false);
  
  return (
    // Clean light card styling
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-950">Master FullStack </h3>
      <p className="text-gray-600 text-sm mt-2">Interactive hands-on learning</p>
      <button 
        onClick={() => setActive(!active)}
        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold"
      >
        {active ? ' Active Mode' : 'Click Me!'}
      </button>
    </div>
  );
}`
  },
  js: {
    filename: 'algorithm.js',
    language: 'JavaScript',
    code: `// Quick Sort Algorithm Implementation
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  
  for (const el of arr.slice(0, -1)) {
    el < pivot ? left.push(el) : right.push(el);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Result: [1, 2, 5, 6, 9]
console.log(quickSort([6, 2, 9, 1, 5]));`
  },
  python: {
    filename: 'ai_model.py',
    language: 'Python',
    code: `import numpy as np

# Quick AI Model Mock
def train_model(epochs=100):
    accuracy = 0.0
    for epoch in range(epochs):
        accuracy += 0.0095
        if epoch % 25 == 0:
            print(f"Epoch {epoch}: Accuracy = {accuracy:.2f}")
    return "Model Trained Successfully! "

print(train_model())`
  }
}

// Syntax highlighter helper
const highlightCode = codeStr => {
  // Step 1: Escape raw HTML entities so <div /> doesn't break rendering
  let line = codeStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Step 2: Handle full line comments (JS & Python)
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return `<span class="text-gray-400 italic">${line}</span>`;
  }

  // Step 3: Highlight Strings first (prevents matching keywords inside strings)
  line = line.replace(/('.*?'|".*?"|`.*?`)/g, '<span class="text-emerald-600">$1</span>');

  // Step 4: Highlight JSX Attributes (e.g. className=)
  line = line.replace(/\b(className)=/g, '<span class="text-teal-600">$1</span>=');

  // Step 5: Highlight Keywords (using negative lookahead to avoid matching inside HTML attributes)
  line = line.replace(
    /\b(class|function|return|import|from|const|let|var|export|default|def|if|for|in)\b(?![^<]*>)/g,
    '<span class="text-purple-600 font-semibold">$1</span>'
  );

  // Step 6: Highlight Booleans / Null / Undefined
  line = line.replace(
    /\b(true|false|null|undefined)\b(?![^<]*>)/g,
    '<span class="text-amber-600">$1</span>'
  );

  // Step 7: Highlight Function & Component Names
  line = line.replace(
    /\b(TechCard|quickSort|train_model|useState)\b(?![^<]*>)/g,
    '<span class="text-blue-600">$1</span>'
  );

  return line;
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
}

export default function THome () {
  const [activeTab, setActiveTab] = useState('react')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden'>
      <THeader />

      {/* ================= HERO SECTION ================= */}
      <section className='relative pt-40 pb-8 md:pt-45 md:pb-15 overflow-hidden bg-gray-50/50'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-orange-100/50 to-transparent blur-[120px] rounded-full pointer-events-none' />

        <motion.div
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'
          initial='hidden'
          animate='visible'
          variants={containerVariants}
        >
          {/* Top Hero Layout Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
            {/* Left Column: Headline & CTA */}
            <div className='lg:col-span-6 space-y-6 text-left'>
              {/* Main Headline */}
              <motion.div variants={itemVariants} className='space-y-4'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-Cr tracking-normal leading-[1.30] text-gray-950'>
                  Code Smarter. <br />
                  <span className='bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent'>
                    Build Faster.
                  </span>{' '}
                  Succeed Today.
                </h1>

                <p className='text-sm md:text-base text-gray-600 font-normal leading-relaxed max-w-xl'>
                  Master hands-on programming with interactive tutorials, live
                  code sandboxes, and real-world interview challenges engineered
                  for real growth.
                </p>
              </motion.div>

              {/* Search Bar Container */}
              <motion.div variants={itemVariants} className='pt-2'>
                <div className='relative flex items-center bg-white border border-gray-200 rounded-full p-1.5 shadow-md focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition duration-300 max-w-xl'>
                  <Search className='w-4 h-4 text-gray-400 ml-3 shrink-0' />
                  <input
                    type='text'
                    placeholder='Search tutorials (e.g. React, DSA, System Design...)'
                    className='w-full bg-transparent px-3 py-2 text-xs md:text-sm text-gray-900 placeholder-gray-400 focus:outline-none'
                  />
                  <button className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs px-4 py-2.5 md:px-5 md:py-2.5 rounded-full transition shadow-md shrink-0 flex items-center gap-1.5'>
                    <span>Search</span>
                    <ArrowRight className='w-3.5 h-3.5' />
                  </button>
                </div>

                {/* Quick Tags */}
                <div className='flex flex-wrap items-center gap-1.5 mt-4 text-xs text-gray-600'>
                  <span className='text-gray-400 font-medium text-[11px]'>
                    Popular:
                  </span>
                  {['React', 'Python', 'DSA Sheet', 'System Design', 'SQL'].map(
                    tag => (
                      <button
                        key={tag}
                        className='px-2.5 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-200/60 rounded-full text-gray-700 transition text-[11px]'
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </motion.div>

              {/* Social Proof Stats Mini Strip */}
              <motion.div
                variants={itemVariants}
                className='pt-2 flex items-center gap-6 border-t border-gray-100'
              >
                <div className='flex -space-x-2'>
                  <span className='inline-block w-8 h-8 rounded-full ring-2 ring-white bg-gray-200 overflow-hidden'>
                    <img
                      src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </span>
                  <span className='inline-block w-8 h-8 rounded-full ring-2 ring-white bg-gray-300 overflow-hidden'>
                    <img
                      src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </span>
                  <span className='inline-block w-8 h-8 rounded-full ring-2 ring-white bg-gray-400 overflow-hidden'>
                    <img
                      src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </span>
                </div>
                <div>
                  <div className='flex items-center gap-1 text-amber-500'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-3.5 h-3.5 fill-current' />
                    ))}
                    <span className='text-xs font-bold text-gray-900 ml-1'>
                      4.9/5
                    </span>
                  </div>
                  <p className='text-[11px] text-gray-500 mt-0.5'>
                    Trusted by over 100,000+ developers
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Image Container */}
            <motion.div
              variants={itemVariants}
              className='lg:col-span-6 relative'
            >
              <div className='relative hidden md:block'>
                {/* Hero Banner Image */}
                <div className='relative h-[280px] sm:h-[340px] md:h-[380px] w-full overflow-hidden'>
                  <img
                    src='/tbanner.png'
                    alt='Developers collaborating'
                    className='w-auto mx-auto h-full object-fit object-center group-hover:scale-105 transition-transform duration-700 ease-out'
                  />
                </div>
                <DotGrid className='absolute -bottom-5 left-10 animate-pulse text-teal-400/10 scale-150  opacity-40' />
                <BlueDotGrid className='absolute top-5 right-0 animate-pulse text-teal-400/10 scale-150  opacity-40' />
                <StarShape className='absolute top-10 left-10 text-teal-400/10 scale-150  opacity-40' />
                <CircleDot className='absolute bottom-10 right-5 text-teal-400/10 scale-150  opacity-40' />
              </div>
            </motion.div>
          </div>

          {/* ================= INTERACTIVE CODE & ASSET STAGE ================= */}
          <motion.div
            variants={itemVariants}
            className='mt-16 md:mt-30 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'
          >
            {/* Left: Code Sandbox Editor */}
            <div className='lg:col-span-7 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl'>
              {/* Window Bar Header */}
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0'>
                <div className='flex items-center gap-1.5'>
                  <div className='flex items-center gap-1.5'>
                    <span className='w-3 h-3 rounded-full bg-red-400/80 inline-block' />
                    <span className='w-3 h-3 rounded-full bg-amber-400/80 inline-block' />
                    <span className='w-3 h-3 rounded-full bg-green-400/80 inline-block' />
                  </div>
                  <span className='ml-3 text-xs text-gray-500 font-mono flex items-center gap-2'>
                    <Terminal className='w-3.5 h-3.5 text-orange-500' />
                    {CODE_SNIPPETS[activeTab].filename}
                  </span>
                </div>

                {/* Tabs */}
                <div className='flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-center'>
                  {Object.keys(CODE_SNIPPETS).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 md:px-4 md:py-1.5 rounded-md text-xs font-semibold capitalize transition ${
                        activeTab === tab
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Area */}
              <div className='p-5 md:p-7 font-mono text-[12px] md:text-sm leading-relaxed overflow-x-auto relative min-h-[280px] bg-white'>
                <button
                  onClick={handleCopy}
                  className='absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition z-10'
                  title='Copy code'
                >
                  {copied ? (
                    <Check className='w-4 h-4 text-green-600' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                </button>

                <AnimatePresence mode='wait'>
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className='text-gray-700'
                  >
                    <code className='block whitespace-pre'>
                      {CODE_SNIPPETS[activeTab].code
                        .split('\n')
                        .map((line, i) => (
                          <span key={i} className='table-row'>
                            <span className='table-cell text-gray-300 pr-4 text-right select-none w-5'>
                              {i + 1}
                            </span>
                            <span
                              className='table-cell'
                              dangerouslySetInnerHTML={{
                                __html: highlightCode(line)
                              }}
                            />
                          </span>
                        ))}
                    </code>
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Floating Interactive Stage */}
            <div className='lg:col-span-5 relative h-[380px] md:h-[450px] lg:h-[480px] flex items-center justify-center'>
              {/* Globe Background Stage */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                className='absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] pointer-events-none'
              >
                <img
                  src='/globe.png'
                  alt='Globe Stage'
                  className='w-full h-full object-contain'
                />
              </motion.div>

              {/* React Badge */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className='absolute top-6 left-6 md:top-10 md:left-10 p-3 md:p-4 bg-white border border-gray-100 rounded-xl shadow-lg flex items-center gap-3 z-10'
              >
                <img
                  src='/treact.webp'
                  alt='React'
                  className='w-8 h-8 md:w-10 md:h-10 object-contain'
                />
                <div>
                  <h4 className='text-xs md:text-sm font-bold text-gray-950'>
                    React 19
                  </h4>
                  <p className='text-[10px] md:text-xs text-gray-600'>
                    Advanced Tutorials
                  </p>
                </div>
              </motion.div>

              {/* JS Badge */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                className='absolute top-16 right-6 md:top-20 md:right-10 p-3 md:p-4 bg-white border border-gray-100 rounded-xl shadow-lg flex items-center gap-3 z-10'
              >
                <img
                  src='/tjs.webp'
                  alt='JavaScript'
                  className='w-8 h-8 md:w-10 md:h-10 object-contain'
                />
                <div>
                  <h4 className='text-xs md:text-sm font-bold text-gray-950'>
                    ES6+ Standard
                  </h4>
                  <p className='text-[10px] md:text-xs text-gray-600'>
                    Modern Syntax
                  </p>
                </div>
              </motion.div>

              {/* Floating Center Badge */}

              {/* Python Badge */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2
                }}
                className='absolute bottom-6 left-8 md:bottom-10 md:left-12 p-3 md:p-4 bg-white border border-gray-100 rounded-xl shadow-lg flex items-center gap-3 z-10'
              >
                <img
                  src='/tpython.webp'
                  alt='Python'
                  className='w-7 h-7 md:w-9 md:h-9 object-contain'
                />
                <div>
                  <h4 className='text-xs md:text-sm font-bold text-gray-950'>
                    Python & AI
                  </h4>
                  <p className='text-[10px] md:text-xs text-gray-600'>
                    Data Science
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= EXPLORE TECHNOLOGY ================= */}
      <ExploreTechnologies />


      {/* ================= FEATURED LEARNING PATHS ================= */}
      <section className='py-5 md:py-5 max-w-7xl mx-auto px-6 lg:px-8 mb-7'>
        <div className='text-center max-w-3xl mx-auto mb-10 space-y-3'>
          <h2 className='text-sm font-bold uppercase tracking-wider text-orange-600'>
            Structured Learning Paths
          </h2>
          <p className='text-3xl font-semibold font-INB text-gray-950 sm:text-4xl lg:text-5xl tracking-tight'>
            Everything You Need to Get Hired
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10'>
          {[
            {
              title: 'Full-Stack Web Dev',
              desc: 'Master React, Node.js, Next.js & PostgreSQL by building 10 real-world production apps.',
              tag: 'Most Popular',
              color: 'border-orange-200',
              bgColor: 'hover:border-orange-300 hover:bg-orange-50/50'
            },
            {
              title: 'Data Structures & Algo',
              desc: 'Crack top tech interviews with 300+ handpicked, deeply explained problem breakdowns.',
              tag: 'Essential',
              color: 'border-blue-200',
              bgColor: 'hover:border-blue-300 hover:bg-blue-50/50'
            },
            {
              title: 'System Design & Cloud',
              desc: 'Learn microservices, caching, load balancing, and AWS infrastructure scaling fundamentals.',
              tag: 'Advanced',
              color: 'border-purple-200',
              bgColor: 'hover:border-purple-300 hover:bg-purple-50/50'
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className={`bg-white border ${card.color} ${card.bgColor} rounded-3xl p-4 shadow-lg shadow-gray-500/5 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <span className='inline-block px-3.5 py-1.5 bg-gray-100 text-gray-800 text-xs font-IN rounded-full border border-gray-200'>
                  {card.tag}
                </span>
                <h3 className='text-2xl font-INB text-gray-950 mt-5 tracking-tight'>
                  {card.title}
                </h3>
                <p className='text-sm text-gray-700 mt-3 leading-relaxed'>
                  {card.desc}
                </p>
              </div>

              <div className='mt-10 pt-5 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-orange-600 hover:text-orange-700 cursor-pointer group'>
                <span>Start Learning Path</span>
                <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1.5' />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TFooter />
    </div>
  )
}
