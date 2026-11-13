import React, { useEffect, useRef } from 'react'
import { Suspense } from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import { Example } from '../components/Corn'
import HeroText from '../components/Intern/HeroText'
import ParallaxBackground from '../components/Intern/ParallaxBackground'
import { IconCloudDemo } from '../components/Intern/Clouddemo'
import Footer from '../components/Footer'
import CountUp from '../components/Intern/counter'
import { TimelineDemo } from '../components/Intern/timelineDemo'
import { NavbarDemo } from '../components/navbar/Navbar2'
import Technology from '../components/Intern/Technology'
import { motion, AnimatePresence } from 'framer-motion'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import BlurText from '../components/BlurText'
import { Helmet } from 'react-helmet'
import Hover from '../components/About/HoverCertificate'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Internship () {
  const [showAuthButtons, setShowAuthButtons] = useState(true)

  const handleApplyClick = () => {
    window.location.href = '/applyforinternship'
  }

  return (
    <main className={`relative w-full overflow-clip`}>
      <Helmet>
        <title>
          6-Month Internship Program | B.Tech & MCA Tech Training | Pisoft
        </title>
        <meta
          name='description'
          content='Join Pisoft Informatics’ 6-month tech internship. Gain software and coding skills. See how our services are loading the next generation of IT solutions. Ideal for B.Tech/MCA.'
        />
        <meta
          name='keywords'
          content='6-month internship program, tech internship, B.Tech internship, MCA internship, software development internship, coding training, industry internship, tech training program, Pisoft internship, IT internship Mohali, services, loading, pisoft, software, solutions, erp, informatics, how'
        />
        <meta
          property='og:url'
          content='https://Pisoftinformatics.com/InternshipProgram'
        />
        <link
          rel='canonical'
          href='https://Pisoftinformatics.com/InternshipProgram'
        />
      </Helmet>
      <SocialLinks className='hidden lg:block' />

      {/* Background */}
      <ParallaxBackground className={`mt-2 lg:mt-10 backdrop-blur-2xl`} />

      {/* Hero Section */}
      <div className={`relative z-20 pt-18 md:pt-2 bg-white/20 text-center`}>
        <HeroText />
      </div>

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

        <div
          className={`
      flex items-center 
      justify-center lg:justify-center xl:justify-center
    `}
        >
          <Navbar className='hidden lg:block' />
          <NavbarDemo />
        </div>
      </div>

      <div className='fixed left-1 -top-2 z-50000 lg:hidden'>
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

      {/* Text Reveal Section */}
      <section className='w-full max-w-[2000px] mx-auto flex flex-row flex-wrap justify-start items-start bg-transparent'>
        <div className='lg:w-2/3 pl-4 pr-4 w-full mt-15 md:mt-0'>
          <div className='mt-20 lg:mt-2 ml-0 lg:ml-4'>
            
            <BlurText
              text='Learn, Build, and Grow with Us!'
              delay={200}
              animateBy='words'
              direction='top'
              className='font-INB text-3xl sm:text-4xl md:text-5xl text-blue-950 mb-2'
            />
          </div>

          <div className='relative z-30 mx-auto md:px-5 rounded-xl max-w-screen sm:mt-5 text-start font-in text-blue-950'>
            {/* Learn, Build, and Grow with Us! */}
            <div className='mt-6 space-y-4'>
              <p className='font-in text-base md:text-lg lg:text-xl text-blue-950 leading-relaxed text-justify'>
                We offer free internship opportunities to aspiring professionals who want to enhance their technical skills and gain practical industry experience. Our program focuses on hands-on learning, technical development, and preparing candidates for real-world challenges.
              </p>
              <p className='font-in text-base md:text-lg lg:text-xl text-blue-950 leading-relaxed text-justify'>
                We select only <strong className='font-INB text-blue-950'>two interns per technology every year</strong>, ensuring focused learning and individual attention. <strong className='font-INB text-[#F07C22]'>Internship slots will be allotted on a first-come, first-served basis.</strong>
              </p>
            </div>

            {/* Selection Process */}
            <div className='mt-8'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-INB text-blue-950 mb-3'>
                Selection Process
              </h2>
              <p className='font-in text-base md:text-lg lg:text-xl text-blue-950 mb-4'>
                Candidates must successfully clear the following four stages:
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
                <div className='p-4 rounded-xl border border-blue-100 bg-white/80 shadow-xs flex items-start gap-3'>
                  <span className='flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-[#F07C22] font-INB text-base flex items-center justify-center mt-0.5'>
                    1
                  </span>
                  <div>
                    <h3 className='font-INB text-blue-950 text-base md:text-lg'>Online Test</h3>
                    <p className='font-in text-sm md:text-base text-blue-950/80 mt-0.5'>Evaluation of basic technical knowledge and logical aptitude.</p>
                  </div>
                </div>

                <div className='p-4 rounded-xl border border-blue-100 bg-white/80 shadow-xs flex items-start gap-3'>
                  <span className='flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-[#F07C22] font-INB text-base flex items-center justify-center mt-0.5'>
                    2
                  </span>
                  <div>
                    <h3 className='font-INB text-blue-950 text-base md:text-lg'>Technical Interview</h3>
                    <p className='font-in text-sm md:text-base text-blue-950/80 mt-0.5'>Assessment of technical understanding and problem-solving skills.</p>
                  </div>
                </div>

                <div className='p-4 rounded-xl border border-blue-100 bg-white/80 shadow-xs flex items-start gap-3'>
                  <span className='flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-[#F07C22] font-INB text-base flex items-center justify-center mt-0.5'>
                    3
                  </span>
                  <div>
                    <h3 className='font-INB text-blue-950 text-base md:text-lg'>Machine Round</h3>
                    <p className='font-in text-sm md:text-base text-blue-950/80 mt-0.5'>Practical evaluation of coding and implementation skills.</p>
                  </div>
                </div>

                <div className='p-4 rounded-xl border border-blue-100 bg-white/80 shadow-xs flex items-start gap-3'>
                  <span className='flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-[#F07C22] font-INB text-base flex items-center justify-center mt-0.5'>
                    4
                  </span>
                  <div>
                    <h3 className='font-INB text-blue-950 text-base md:text-lg'>HR Round</h3>
                    <p className='font-in text-sm md:text-base text-blue-950/80 mt-0.5'>Assessment of communication, attitude, and willingness to learn.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internship Duration & Evaluation */}
            <div className='mt-8'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-INB text-blue-950 mb-3'>
                Internship Duration &amp; Evaluation
              </h2>
              <p className='font-in text-base md:text-lg lg:text-xl text-blue-950 leading-relaxed text-justify mb-4'>
                Selected candidates will undergo a <strong className='font-INB text-blue-950'>six-month internship</strong> involving practical assignments, hands-on training, and multiple theoretical and practical assessment tests.
              </p>
              <div className='p-5 sm:p-6 rounded-xl border border-blue-100 bg-blue-50/50'>
                <p className='font-INB text-base md:text-lg text-blue-950 mb-3'>
                  After the first three months, candidates must meet the following criteria to become eligible for a stipend:
                </p>
                <ul className='space-y-2.5 mb-4'>
                  <li className='flex items-start gap-2.5 font-in text-base md:text-lg text-blue-950'>
                    <CheckCircle2 className='w-5 h-5 text-[#F07C22] flex-shrink-0 mt-0.5' />
                    <span>
                      Minimum <strong className='font-INB text-blue-950'>80% attendance</strong> during the first three months.
                    </span>
                  </li>
                  <li className='flex items-start gap-2.5 font-in text-base md:text-lg text-blue-950'>
                    <CheckCircle2 className='w-5 h-5 text-[#F07C22] flex-shrink-0 mt-0.5' />
                    <span>Satisfactory performance in regular assessments.</span>
                  </li>
                  <li className='flex items-start gap-2.5 font-in text-base md:text-lg text-blue-950'>
                    <CheckCircle2 className='w-5 h-5 text-[#F07C22] flex-shrink-0 mt-0.5' />
                    <span>Successful completion of a strict final assessment test.</span>
                  </li>
                </ul>
                <div className='pt-3 border-t border-blue-200/60'>
                  <p className='font-in text-base md:text-lg lg:text-xl text-blue-950'>
                    Candidates who clear the evaluation will receive a <strong className='font-INB text-[#F07C22]'>minimum stipend of ₹10,000 per month</strong> for the remaining three months.
                  </p>
                </div>
              </div>
            </div>

            {/* Career Opportunities */}
            <div className='mt-8'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-INB text-blue-950 mb-3'>
                Career Opportunities
              </h2>
              <p className='font-in text-base md:text-lg lg:text-xl text-blue-950 leading-relaxed text-justify'>
                After successfully completing the internship, candidates may get an opportunity to join our company as permanent employees, depending on vacancies in their respective technologies, overall performance, and company policies.
              </p>
            </div>

            {/* Start Your Journey With Us! */}
            <div className='mt-8 mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-50 via-white to-blue-50 border border-orange-200'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-INB text-[#F07C22] mb-2'>
                Start Your Journey With Us!
              </h2>
              <p className='font-in text-base md:text-lg lg:text-xl text-blue-950 leading-relaxed mb-5'>
                If you are passionate about technology and eager to learn, challenge yourself, and build practical skills, apply for our internship program and take your first step towards a rewarding career!
              </p>
              <button
                onClick={handleApplyClick}
                className='inline-flex items-center gap-2 bg-[#F07C22] hover:bg-orange-600 text-white font-INB px-6 py-3 rounded-lg shadow-md transition hover:scale-105 cursor-pointer text-base md:text-lg'
              >
                Apply for Internship
                <ArrowRight className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
        <div className='lg:w-1/3 hidden lg:block sticky top-28 self-start pt-8'>
          <IconCloudDemo />
        </div>
      </section>

      {/* technologies */}
      <section className='max-w-[2000px] mx-auto'>
        <Technology />
      </section>

      {/* benefits */}
      <section className='w-screen'>
        <TimelineDemo />
      </section>

      {/* Certificate Section */}
      <div className='text-center space-y-1 w-full overflow-hidden'>
        <div className='font-INB text-blue-950 text-2xl md:text-3xl lg:text-4xl leading-tight'>
          Get a specialization certificate
        </div>
        <div className='font-INB text-blue-950 text-2xl md:text-3xl lg:text-4xl leading-tight'>
          upon completing your Internship.
        </div>
      </div>

      <section className='relative z-10 bg-transparent py-7 lg:py-16 px-4 sm:px-8 lg:px-32 text-center'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left'>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='inline-block mb-4 bg-blue-100 text-blue-950 px-4 py-2 lg:px-6 lg:py-4 rounded-full text-md font-Cr'>
              Internship Certificate
            </div>
            <div className='text-lg lg:text-4xl font-INB text-orange-500 mb-4 leading-tight'>
              Showcase Your Success
            </div>
            <p className='text-lg font-in text-blue-950 mb-6'>
              Gain recognition for your hands-on experience with a certificate
              that highlights your skills and dedication.
            </p>
            <ul className='space-y-3 text-blue-950 font-in text-center'>
              {[
                'Verified by industry experts',
                'Shareable on LinkedIn and your resume',
                'Available in digital and printable formats'
              ].map((item, idx) => (
                <li key={idx} className='flex items-start gap-2'>
                  <span className='text-orange-400 mt-1'>✔</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <motion.div className='flex justify-center'>
            <Suspense fallback={null}>
              <Hover />
            </Suspense>
          </motion.div>
        </div>

        <motion.button
          onClick={handleApplyClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='mt-12 mb-5 md:mb-0 bg-blue-950 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-800 transition hover:scale-110'
        >
          Apply Today
        </motion.button>
      </section>

      {/* counters */}
      <div className='w-full flex flex-wrap justify-center items-center gap-16 py-16 text-blue-950'>
        {/* Counter 1 */}
        <div className='flex flex-col items-center'>
          <div>
            <CountUp
              from={0}
              to={3400}
              separator=','
              direction='up'
              duration={1}
              className='text-6xl font-extrabold text-[#F07C22]'
            />
            <span className='text-6xl font-extrabold text-[#F07C22]'>+</span>
          </div>
          <p className='mt-4 text-center text-lg sm:text-xl font-medium'>
            Above No. of Trainee Trained
          </p>
        </div>

        {/* Counter 2 */}
        <div className='flex flex-col items-center'>
          <div>
            <CountUp
              from={0}
              to={84}
              separator=','
              direction='up'
              duration={1}
              className='text-6xl font-extrabold text-[#F07C22]'
            />
            <span className='text-6xl font-extrabold text-[#F07C22]'>+</span>
          </div>
          <p className='mt-4 text-center text-lg sm:text-xl font-medium'>
            Industry Tie Ups
          </p>
        </div>

        {/* Counter 4 */}
        <div className='flex flex-col items-center'>
          <div>
            <CountUp
              from={0}
              to={254}
              separator=','
              direction='up'
              duration={1}
              className='text-6xl font-extrabold text-[#F07C22]'
            />
            <span className='text-6xl font-extrabold text-[#F07C22]'>+</span>
          </div>
          <p className='mt-4 text-center text-lg sm:text-xl font-medium'>
            Academic Tie Ups
          </p>
        </div>
      </div>

      {/* footer */}
      <footer className='w-full'>
        <Footer />
      </footer>
    </main>
  )
}
