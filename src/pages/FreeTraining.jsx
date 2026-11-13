import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet';
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
  Layers,
  GraduationCap,
  RotateCcw,
  Compass,
  FileCheck,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { FaJava, FaPython, FaReact } from 'react-icons/fa';
import { SiTensorflow } from 'react-icons/si';

const LINK = 'https://careerlief.com/tutorials';
const ease = [0.22, 1, 0.36, 1];

const technologies = [
  { name: 'Java', icon: FaJava },
  { name: 'Python', icon: FaPython },
  { name: 'Data Science', icon: Compass },
  { name: 'MERN Stack', icon: FaReact },
  { name: 'Web Development', icon: Code },
  { name: 'AI/ML', icon: SiTensorflow }
];


const technologies2 = [
  { title: 'Java Development', desc: 'Core Java, Spring Boot, Microservices & OOP architecture', icon: FaJava, tone: '#F07C22', tag: 'High Demand' },
  { title: 'Python Programming', desc: 'Data structures, scripting, automation & backend APIs', icon: FaPython, tone: '#2563EB', tag: 'Versatile' },
  { title: 'Data Science', desc: 'Statistical modeling, wrangling, Pandas, NumPy & visuals', icon: Compass, tone: '#059669', tag: 'Trending' },
  { title: 'MERN Stack', desc: 'Full stack with MongoDB, Express.js, React & Node.js', icon: FaReact, tone: '#0891B2', tag: 'Industry Standard' },
  { title: 'Web Development', desc: 'Modern HTML5, CSS3, Tailwind, JavaScript & web apps', icon: Code, tone: '#7C3AED', tag: 'Essential' },
  { title: 'AI & Machine Learning', desc: 'Neural networks, predictive models & TensorFlow', icon: SiTensorflow, tone: '#DB2777', tag: 'Future Tech' }
];

const features = [
  { text: 'Register and join this program any time', icon: Clock },
  { text: 'No need to attend regular classroom sessions', icon: Laptop }
];

const access = [
  { text: 'Complete online study access', icon: BookOpen },
  { text: 'Topic-wise learning resources', icon: Layers },
  { text: 'Level-wise syllabus', icon: GraduationCap },
  { text: 'Practice tests with no limit repetitions', icon: RotateCcw },
  { text: 'Level-wise online final tests (Two chances will be given to clear the final test)', icon: FileCheck },
  { text: 'On the basis of Level-wise final tests, certification will be done', icon: Award }
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease }
};

function SectionTitle({ children }) {
  return (
    <motion.div {...fadeUp}>
      <h2 className='font-INB text-xl text-[#0b1f4d] sm:text-2xl'>{children}</h2>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className='mt-2 block h-[3px] rounded-full bg-[#F07C22]'
      />
    </motion.div>
  );
}

/* Infinite technology ticker */
function Ticker() {
  const items = [...technologies2, ...technologies2];
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

export default function FreeTraining() {
  const [showAuthButtons] = useState(true);

  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const { scrollYProgress: page } = useScroll();
  const bar = useSpring(page, { stiffness: 120, damping: 25 });

  return (
    <main className='relative w-full overflow-clip bg-slate-50 text-slate-800 selection:bg-[#F07C22] selection:text-white'>
      <Helmet>
        <title>Free Training Program | Be Certified Technology Expert | Pisoft Informatics</title>
        <meta
          name='description'
          content='Be Certified Technology Expert. Build your own real projects online. Join the Free Self Learning Program from Pisoft Informatics. No registration fee, no course fee.'
        />
        <meta
          name='keywords'
          content='free training, free self learning program, pisoft informatics, certified technology expert, Java, Python, Data Science, MERN Stack, Web Development, AI ML'
        />
        <meta property='og:title' content='Be Certified Technology Expert - Pisoft Informatics' />
        <meta property='og:description' content='No Registration Fee, No Course Fee. Join our Free Self Learning Program.' />
        <meta property='og:url' content='https://pisoftinformatics.com/FreeTraining' />
        <link rel='canonical' href='https://pisoftinformatics.com/FreeTraining' />
      </Helmet>

      <motion.div style={{ scaleX: bar }} className='fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-[#F07C22]' />

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
      <section className='relative border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 pb-12 pt-18 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36'>
        <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_1fr]'>
          <div>
            <BlurText
              text='Be Certified Technology Expert'
              delay={120}
              animateBy='words'
              direction='top'
              className='flex flex-wrap font-INB text-3xl leading-tight tracking-tight text-[#0b1f4d] sm:text-4xl lg:text-5xl'
            />
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className='mt-3 font-in text-base font-semibold text-[#d9650f] sm:text-xl'
            >
              Build your own Real Projects online
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6, ease }}
            >
              <p className='mt-5 font-in text-sm font-semibold sm:text-base'>
                <a
                  href={LINK}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#0b1f4d] underline decoration-[#F07C22] decoration-2 underline-offset-4 transition hover:text-[#d9650f]'
                >
                  Join our Free Self Learning Program
                </a>
              </p>
              <p className='mt-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-in text-sm font-semibold text-emerald-700'>
                <CheckCircle2 className='h-4 w-4' />
                No Registration Fee, No course Fee.
              </p>
              <p className='mt-4 max-w-xl text-justify font-in text-sm leading-relaxed text-slate-600 sm:text-base'>
                If you are a student and wants to make a career in Java, Python, Data Science, MERN Stack, Web
                Development, AI/ML or other IT technologies then our online venture,{' '}
                <a
                  href={LINK}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-[#0b1f4d] underline decoration-[#F07C22] decoration-2 underline-offset-4 transition hover:text-[#d9650f]'
                >
                  a self learning portal
                </a>{' '}
                is the right place for you.
              </p>
              <motion.a
                href={LINK}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='mt-6 inline-flex items-center gap-2 rounded-lg bg-[#F07C22] px-6 py-3 font-INB text-sm text-white shadow-md shadow-orange-500/25 transition-colors hover:bg-[#dd6b12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1f4d] sm:text-base'
              >
                Join our Free Self Learning Program
                <ArrowUpRight className='h-4 w-4' />
              </motion.a>
            </motion.div>
          </div>

          {/* Technology panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease }}
            className='mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70'
          >
            <div className='h-1 w-full bg-gradient-to-r from-[#F07C22] to-[#0b1f4d]' />
            <ul className='divide-y divide-slate-100'>
              {technologies.map((t, i) => (
                <motion.li
                  key={t.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.07, duration: 0.45, ease }}
                  whileHover={{ backgroundColor: '#f8fafc' }}
                  className='flex items-center gap-3 px-5 py-3'
                >
                  <span className='flex h-8 w-8 items-center justify-center rounded-md bg-[#0b1f4d]/5 text-[#0b1f4d]'>
                    <t.icon className='h-4 w-4' />
                  </span>
                  <span className='font-INB text-sm text-[#0b1f4d]'>{t.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      <Ticker />

      {/* About */}
      <section className='px-4 py-10 sm:px-6 sm:py-12 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]'>
          <motion.div {...fadeUp} className='space-y-3 text-justify font-in text-sm leading-relaxed text-slate-600 sm:text-base'>
            <p>
              We, at <strong className='text-[#0b1f4d]'>Pisoft Informatics Private Limited</strong>, are always
              concerned about enhancing your technical skills. In today’s cut throat competition and very fast growth
              and changes in technologies and invention of new technologies, it has become very difficult to keep
              yourself updated and pace with technologies.
            </p>
            <p>
              We are bringing <strong className='text-[#0b1f4d]'>Free Self Learning Program</strong> as a great
              opportunity for students to learn from the comfort of their homes, study at their own pace, test their
              knowledge and be a Certified Technology Expert much before your actual training starts.
            </p>
            <p className='border-l-4 border-[#F07C22] bg-white py-3 pl-4 pr-3 text-[#0b1f4d] shadow-sm'>
              Certified Technology Experts shall work on real projects with industry expert’s guidance from the day one
              when their actual training starts.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className='self-start rounded-xl bg-[#0b1f4d] p-5 text-white shadow-lg shadow-slate-300/60'>
            <h3 className='font-INB text-lg'>No cost Self Learning Online Program</h3>
            <span className='mt-2 block h-[3px] w-10 rounded-full bg-[#F07C22]' />
            <p className='mt-3 text-justify font-in text-sm leading-relaxed text-white/85'>
              To make IT education accessible to more students, our No cost Self Learning Online Program is live now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features + access */}
      <section className='border-t border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]'>
          <div>
            <SectionTitle>Features:</SectionTitle>
            <ul className='mt-5 space-y-3'>
              {features.map((f, i) => (
                <motion.li
                  key={f.text}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5'
                >
                  <span className='flex h-9 w-9 flex-none items-center justify-center rounded-md bg-[#0b1f4d] text-white'>
                    <f.icon className='h-4 w-4' />
                  </span>
                  <span className='font-in text-sm text-slate-700 sm:text-base'>{f.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle>After registration you get access to:</SectionTitle>
            <div ref={listRef} className='relative mt-5'>
              <div className='absolute bottom-5 left-[17px] top-5 w-px bg-slate-200' />
              <motion.div
                style={{ scaleY: line }}
                className='absolute bottom-5 left-[16px] top-5 w-[3px] origin-top rounded bg-[#F07C22]'
              />
              <ol className='space-y-3'>
                {access.map((a) => (
                  <motion.li
                    key={a.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ duration: 0.5, ease }}
                    className='relative flex items-center gap-4'
                  >
                    <span className='relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-slate-300 bg-white text-[#F07C22] shadow-sm'>
                      <a.icon className='h-4 w-4' />
                    </span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className='flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 font-in text-sm text-slate-700 shadow-sm sm:text-base'
                    >
                      {a.text}
                    </motion.div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Closing bar */}
      <section className='px-4 py-8 sm:px-6 lg:px-8'>
        <motion.div
          {...fadeUp}
          className='mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-xl bg-[#0b1f4d] p-5 text-white shadow-lg shadow-slate-300/60 sm:flex-row sm:px-8'
        > 
          <p className='flex items-center gap-2 font- INB text-base sm:text-lg'>
            <CheckCircle2 className='h-5 w-5 text-[#F07C22]' />
            No Registration Fee, No course Fee.
          </p>
          <motion.a
            href={LINK}
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className='inline-flex items-center gap-2 rounded-lg bg-[#F07C22] px-5 py-2.5 font-INB text-sm text-white transition-colors hover:bg-[#dd6b12]'
          >
            Join our Free Self Learning Program
            <ExternalLink className='h-4 w-4' />
          </motion.a>
        </motion.div>
      </section>

      <footer className='mt-4 w-full'>
        <Footer />
      </footer>
    </main>
  );
}
