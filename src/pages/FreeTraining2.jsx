import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion
} from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Example } from '../components/Corn';
import { NavbarDemo } from '../components/navbar/Navbar2';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import ScrollButtons from '../components/TopBottomButtons';
import SocialLinks from '../components/SocialLinks';
import Footer from '../components/Footer';
import BlurText from '../components/BlurText';
import {
  ExternalLink,
  Award,
  BookOpen,
  Clock,
  Code,
  Laptop,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Layers,
  GraduationCap,
  RotateCcw,
  Compass,
  Briefcase,
  Stamp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { FaJava, FaPython, FaReact } from 'react-icons/fa';
import { SiTensorflow } from 'react-icons/si';

/* ---------- Data ---------- */

const technologies = [
  { title: 'Java Development', desc: 'Core Java, Spring Boot, Microservices & OOP architecture', icon: FaJava, tone: '#F07C22', tag: 'High Demand' },
  { title: 'Python Programming', desc: 'Data structures, scripting, automation & backend APIs', icon: FaPython, tone: '#2563EB', tag: 'Versatile' },
  { title: 'Data Science', desc: 'Statistical modeling, wrangling, Pandas, NumPy & visuals', icon: Compass, tone: '#059669', tag: 'Trending' },
  { title: 'MERN Stack', desc: 'Full stack with MongoDB, Express.js, React & Node.js', icon: FaReact, tone: '#0891B2', tag: 'Industry Standard' },
  { title: 'Web Development', desc: 'Modern HTML5, CSS3, Tailwind, JavaScript & web apps', icon: Code, tone: '#7C3AED', tag: 'Essential' },
  { title: 'AI & Machine Learning', desc: 'Neural networks, predictive models & TensorFlow', icon: SiTensorflow, tone: '#DB2777', tag: 'Future Tech' }
];

const perks = [
  {
    title: 'Register and join this program any time',
    text: 'Open enrollment with no admission deadlines. Start when you are ready.',
    icon: Clock
  },
  {
    title: 'No need to attend regular classroom sessions',
    text: 'Study from home at your own pace, with no fixed class hours.',
    icon: Laptop
  },
  {
    title: 'No Registration Fee, No Course Fee',
    text: 'Free IT education for every student who wants to build a tech career.',
    icon: ShieldCheck
  },
  {
    title: 'Real projects from day one',
    text: 'Certified Technology Experts work on real projects with industry expert guidance from day one.',
    icon: Briefcase
  }
];

const path = [
  {
    title: 'Complete online study access',
    text: '24/7 web portal access to complete learning resources, anytime, anywhere.',
    icon: BookOpen
  },
  {
    title: 'Topic-wise learning resources',
    text: 'Structured learning resources, modular lessons, and code examples broken down topic by topic.',
    icon: Layers
  },
  {
    title: 'Level-wise syllabus',
    text: 'A structured syllabus that takes you from fundamentals to advanced concepts.',
    icon: GraduationCap
  },
  {
    title: 'Practice tests with no limit repetitions',
    text: 'Practice tests with no limit repetitions — retake tests as many times as you need until you feel confident.',
    icon: RotateCcw
  },
  {
    title: 'Level-wise online final tests',
    text: 'Each level ends with an online final test. Two chances will be given to clear the final test.',
    icon: FileCheck
  },
  {
    title: 'Certification based on Level-wise final tests',
    text: 'On the basis of Level-wise final tests, certification will be done.',
    icon: Award
  }
];

/* ---------- Small pieces ---------- */

const ease = [0.22, 1, 0.36, 1];

/* Hero centrepiece: an interactive certificate card */
function CertificateCard() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 14 });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={onLeave} className='relative mx-auto w-full max-w-sm'>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className='relative rounded-2xl border-2 border-[#081f5c] bg-white p-5 sm:p-6 shadow-[6px_6px_0_#081f5c]'
      >
        <div className='flex items-center justify-between font-in text-xs text-[#081f5c]/70'>
          <span>Certificate of Completion</span>
          <span>careerlief.com</span>
        </div>
        <p className='mt-5 font-in text-xs text-slate-500 font-semibold uppercase tracking-wider'>This certifies that</p>
        <div className='mt-1 border-b-2 border-dashed border-slate-300 pb-1 font-INB text-2xl text-[#081f5c]'>
          You, soon
        </div>
        <p className='mt-3 font-in text-xs leading-relaxed text-slate-600'>
          Has cleared every level-wise final test and is a <strong className='text-[#081f5c]'>Certified Technology Expert</strong>.
        </p>

        <div className='mt-5 flex items-end justify-between'>
          <div className='flex flex-wrap gap-1.5'>
            {['Java', 'Python', 'MERN', 'AI/ML'].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.12, type: 'spring', stiffness: 300, damping: 18 }}
                className='rounded-full bg-[#eef3ff] px-2.5 py-1 font-in text-xs font-semibold text-[#081f5c]'
              >
                {t}
              </motion.span>
            ))}
          </div>

          <motion.div
            style={{ translateZ: 50 }}
            initial={{ opacity: 0, scale: 2.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -14 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 14 }}
            className='flex h-20 w-20 flex-col items-center justify-center rounded-full border-[3px] border-[#F07C22] text-[#F07C22]'
          >
            <Stamp className='h-6 w-6' />
            <span className='mt-1 font-INB text-[11px] leading-tight font-bold'>CERTIFIED</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className='absolute -left-3 -top-4 rounded-xl border-2 border-[#081f5c] bg-[#F07C22] px-3.5 py-1.5 font-INB text-xs sm:text-sm text-white sm:-left-5 shadow-sm'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, rotate: -3 }}
        transition={{ delay: 1, duration: 0.6, ease }}
      >
        ₹0 Registration • ₹0 Course Fee
      </motion.div>
    </div>
  );
}

/* Infinite technology ticker */
function Ticker() {
  const items = [...technologies, ...technologies];
  return (
    <div className='overflow-hidden border-y-2 border-[#081f5c] bg-[#081f5c] py-2.5'>
      <motion.div
        className='flex w-max gap-8'
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {items.map((t, i) => (
          <span key={i} className='flex items-center gap-2 font-INB text-sm text-white'>
            <t.icon className='h-5 w-5 text-[#F07C22]' />
            {t.title}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* Technology row that expands on click */
function TechRow({ tech, open, onToggle }) {
  const Icon = tech.icon;
  return (
    <motion.li layout className='border-b-2 border-[#081f5c]/15'>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className='flex w-full items-center gap-4 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F07C22]'
      >
        <motion.span
          animate={{ backgroundColor: open ? tech.tone : '#eef3ff', color: open ? '#fff' : tech.tone }}
          className='flex h-10 w-10 flex-none items-center justify-center rounded-xl transition-colors'
        >
          <Icon className='h-6 w-6' />
        </motion.span>
        <span className='flex-1 font-INB text-base text-[#081f5c] sm:text-lg'>{tech.title}</span>
        <span className='hidden rounded-full border border-[#081f5c]/25 px-2.5 py-0.5 font-in text-xs text-[#081f5c]/70 sm:block'>
          {tech.tag}
        </span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} className='text-[#F07C22]'>
          <ArrowRight className='h-4 w-4' />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className='overflow-hidden pl-14 pr-4 font-in text-sm text-slate-600'
          >
            <span className='block pb-3.5'>{tech.desc}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

/* ---------- Page ---------- */

export default function FreeTraining() {
  const [showAuthButtons] = useState(true);
  const [openTech, setOpenTech] = useState(0);

  const pathRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ['start 70%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  const { scrollYProgress: pageProgress } = useScroll();
  const bar = useSpring(pageProgress, { stiffness: 120, damping: 25 });

  return (
    <main className='relative w-full overflow-clip bg-[#f5f8ff] text-[#081f5c] selection:bg-[#F07C22] selection:text-white'>
      <Helmet>
        <title>Free Training Program | Be Certified Technology Expert | Pisoft Informatics</title>
        <meta
          name='description'
          content='Join Pisoft Informatics Free Self Learning Program at careerlief.com. No registration fee, no course fee. Learn Java, Python, AI/ML, MERN, Data Science & build real projects online.'
        />
        <meta
          name='keywords'
          content='free training, free self learning program, careerlief, pisoft informatics, certified technology expert, Java, Python, Data Science, MERN stack, Web Development, AI/ML'
        />
        <meta property='og:title' content='Free Self Learning Program - Pisoft Informatics' />
        <meta property='og:description' content='No Registration Fee, No Course Fee. Join our Free Self Learning Program and become a Certified Technology Expert.' />
        <meta property='og:url' content='https://pisoftinformatics.com/free-training' />
        <link rel='canonical' href='https://pisoftinformatics.com/free-training' />
      </Helmet>

      {/* Reading progress */}
      <motion.div style={{ scaleX: bar }} className='fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-[#F07C22]' />

      <SocialLinks className='hidden lg:block' />

      {/* Desktop header */}
      <div className='fixed -top-9 left-0 z-50 hidden w-full lg:block'>
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
        <div className='flex items-center justify-center py-2'>
          <Navbar className='hidden lg:block' />
          <NavbarDemo />
        </div>
      </div>

      {/* Mobile header */}
      <div className='fixed -top-2 left-1 z-50 lg:hidden'>
        <Navbar />
      </div>
      <div className='fixed right-4 top-4 z-50 max-w-[90%] sm:max-w-none lg:hidden'>
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

      {/* Hero */}
      <section
        className='relative px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36'
        style={{
          backgroundImage: 'radial-gradient(#081f5c22 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px'
        }}
      >
        <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_1fr]'>
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className='mb-4 inline-flex items-center gap-2 rounded-full border border-[#F07C22]/30 bg-orange-50 px-4 py-1.5 font-INB text-xs text-[#c2560a]'
            >
              <Sparkles className='h-3.5 w-3.5 text-[#F07C22]' />
              <span>No Registration Fee, No course Fee.</span>
            </motion.div>

            <BlurText
              text='Be Certified Technology Expert'
              delay={130}
              animateBy='words'
              direction='top'
              className='flex flex-wrap font-INB text-3xl leading-tight tracking-tight text-[#081f5c] sm:text-4xl lg:text-5xl'
            />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease }}
              className='mt-3 font-INB text-lg text-[#F07C22] sm:text-2xl'
            >
              Build your own Real Projects online
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease }}
              className='mt-4 max-w-xl font-in text-sm leading-relaxed text-slate-700 sm:text-base'
            >
              If you are a student and wants to make a career in <strong className='text-[#081f5c]'>Java, Python, Data Science, MERN Stack, Web Development, AI/ML</strong> or other IT technologies then our online venture, a self learning portal{' '}
              <a
                href='https://www.careerlief.com'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-[#F07C22] underline underline-offset-4 hover:text-[#081f5c] transition'
              >
                www.careerlief.com
              </a>{' '}
              is the right place for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease }}
              className='mt-7 flex flex-col gap-3 sm:flex-row sm:items-center'
            >
              <motion.a
                href='https://www.careerlief.com'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ x: -2, y: -2, boxShadow: '5px 5px 0 #081f5c' }}
                whileTap={{ x: 2, y: 2, boxShadow: '0px 0px 0 #081f5c' }}
                initial={false}
                style={{ boxShadow: '3px 3px 0 #081f5c' }}
                className='inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#081f5c] bg-[#F07C22] px-6 py-3.5 font-INB text-sm text-white sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#081f5c]'
              >
                Join our Free Self Learning Program
                <ExternalLink className='h-4 w-4' />
              </motion.a>
              <a
                href='#features'
                className='inline-flex items-center gap-2 px-3 py-2 font-in text-sm font-semibold text-[#081f5c] hover:text-[#F07C22] transition'
              >
                Explore Features & Access
                <ArrowRight className='h-4 w-4' />
              </a>
            </motion.div>
          </div>

          <CertificateCard />
        </div>
      </section>

      <Ticker />

      {/* About & Context */}
      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 items-center'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className='inline-block rounded-full bg-[#081f5c]/10 px-3 py-1 font-in text-xs font-semibold text-[#081f5c] uppercase tracking-wider mb-2'>
              No cost Self Learning Online Program
            </span>
            <h3 className='font-INB text-2xl leading-tight text-[#081f5c] sm:text-3xl lg:text-4xl'>
              To make IT education accessible to more students, our No cost Self Learning Online Program is live now.
            </h3>
            <div className='mt-4 max-w-xl space-y-3.5 font-in text-sm leading-relaxed text-slate-700 sm:text-base'>
              <p>
                We, at <strong className='text-[#081f5c]'>Pisoft Informatics Private Limited</strong>, are always concerned about enhancing your technical skills. In today’s cut throat competition and very fast growth and changes in technologies and invention of new technologies, it has become very difficult to keep yourself updated and pace with technologies.
              </p>
              <p>
                We are bringing <strong>Free Self Learning Program</strong> as a great opportunity for students to learn from the comfort of their homes, study at their own pace, test their knowledge and be a <strong>Certified Technology Expert</strong> much before your actual training starts.
              </p>
              <div className='rounded-xl border-l-4 border-[#F07C22] bg-orange-50/80 p-4 text-[#081f5c] font-medium'>
                Certified Technology Experts shall work on real projects with industry expert’s guidance from the day one when their actual training starts.
              </div>
            </div>
          </motion.div>

          {/* Features Column */}
          <div id='features' className='space-y-4'>
            <div className='flex items-center gap-2 mb-3'>
              <CheckCircle2 className='h-6 w-6 text-[#F07C22]' />
              <h4 className='font-INB text-xl sm:text-2xl text-[#081f5c]'>Features:</h4>
            </div>

            <ul className='space-y-3'>
              {perks.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className='flex items-start gap-4 rounded-2xl border-2 border-[#081f5c]/15 bg-white p-4 shadow-sm transition hover:shadow-md'
                >
                  <span className='flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#081f5c] text-[#F07C22]'>
                    <p.icon className='h-5 w-5' />
                  </span>
                  <div>
                    <h5 className='font-INB text-base text-[#081f5c]'>• {p.title}</h5>
                    <p className='mt-0.5 font-in text-sm text-slate-600 leading-relaxed'>{p.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className='bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 border-y-2 border-[#081f5c]/10'>
        <div className='mx-auto max-w-4xl'>
          <div className='text-center mb-8'>
            <span className='inline-block rounded-full bg-orange-100 px-3 py-1 font-INB text-xs text-[#c2560a] uppercase tracking-wider mb-2'>
              Technologies
            </span>
            <h2 className='font-INB text-2xl sm:text-3xl text-[#081f5c]'>Pick a technology. Start learning.</h2>
            <p className='mt-1.5 font-in text-sm text-slate-600'>Tap a course below to see what it covers.</p>
          </div>

          <ul className='border-t border-[#081f5c]/15 rounded-2xl bg-[#f8faff] p-4 sm:p-6 shadow-sm border'>
            {technologies.map((t, i) => (
              <TechRow key={t.title} tech={t} open={openTech === i} onToggle={() => setOpenTech(openTech === i ? -1 : i)} />
            ))}
          </ul>
        </div>
      </section>

      {/* After registration you get access to */}
      <section id='learning-path' className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 bg-[#f5f8ff]'>
        <div className='mx-auto max-w-4xl'>
          <div className='flex items-center gap-2 mb-2'>
            <Award className='h-6 w-6 text-[#F07C22]' />
            <h2 className='font-INB text-2xl sm:text-3xl text-[#081f5c]'>After registration you get access to:</h2>
          </div>
          <p className='max-w-xl font-in text-sm text-slate-600'>
            Your structured path from enrollment to official certification.
          </p>

          <div ref={pathRef} className='relative mt-8'>
            <div className='absolute bottom-0 left-[21px] top-0 w-0.5 rounded bg-[#081f5c]/10' />
            <motion.div
              style={{ scaleY: line }}
              className='absolute bottom-0 left-[21px] top-0 w-0.5 origin-top rounded bg-[#F07C22]'
            />

            <ol className='space-y-6'>
              {path.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-25% 0px -25% 0px' }}
                  transition={{ duration: 0.6, ease }}
                  className='relative flex gap-4 pl-0'
                >
                  <motion.span
                    initial={{ scale: 0.6, backgroundColor: '#ffffff' }}
                    whileInView={{ scale: 1, backgroundColor: '#F07C22' }}
                    viewport={{ once: true, margin: '-25% 0px -25% 0px' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    className='relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-[#081f5c] text-white'
                  >
                    <s.icon className='h-5 w-5' />
                  </motion.span>
                  <div className='flex-1 rounded-xl border border-[#081f5c]/20 bg-white p-4 shadow-sm'>
                    <p className='font-in text-xs font-semibold text-[#c2560a] uppercase tracking-wide'>Step {i + 1}</p>
                    <h3 className='mt-0.5 font-INB text-base sm:text-lg text-[#081f5c]'>• {s.title}</h3>
                    <p className='mt-1 font-in text-sm leading-relaxed text-slate-600'>{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='px-4 pb-14 pt-8 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className='relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#081f5c] p-7 text-center text-white sm:p-12 shadow-xl'
        >
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[3px] border-dashed border-[#F07C22]/50'
          />
          <h2 className='relative font-INB text-2xl leading-tight sm:text-3xl lg:text-4xl'>
            Be Certified Technology Expert
          </h2>
          <p className='relative font-INB text-base sm:text-lg text-[#F07C22] mt-2'>
            Build your own Real Projects online
          </p>
          <p className='relative mx-auto mt-3 max-w-xl font-in text-sm text-white/85 leading-relaxed'>
            No Registration Fee, No course Fee. Study at your own pace, get certified, and work on real projects with industry expert guidance from day one.
          </p>

          <div className='relative mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <motion.a
              href='https://www.careerlief.com'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F07C22] px-7 py-3.5 font-INB text-sm text-white sm:w-auto shadow-lg'
            >
              Join our Free Self Learning Program
              <ExternalLink className='h-4 w-4' />
            </motion.a>
          </div>
        </motion.div>
      </section>

      <footer className='w-full'>
        <Footer />
      </footer>
    </main>
  );
}