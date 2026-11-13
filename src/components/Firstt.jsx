import React, {
  useRef,
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Button = lazy(() => import('./Button'))
const Marquee = lazy(() => import('./Marquee'))
const Horizontal = lazy(() => import('./HorizontalScroll'))
const ScrollT = lazy(() => import('./Page'))
const TrueFocus = lazy(() => import('./FocusText'))
const Footer = lazy(() => import('./Footer'))
const Hover = lazy(() => import('./HoverCard2'))
const SwipableCardCarousel = lazy(() => import('./SwipableCardCarousel'))
const AuthFloatingButtons = lazy(() => import('./AuthFloatingButtons'))
const Testimonial = lazy(() => import('./testimonial'))

import AccordionMenu from './ServiceCard'
import { NavbarDemo } from './navbar/Navbar2'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import CountUp from './Intern/counter'
import { Example } from './Corn'
import ScrollButtons from './TopBottomButtons'
import { Helmet } from 'react-helmet'

gsap.registerPlugin(ScrollTrigger)

const fallbackLoader = (
  <div className='h-10 w-full text-center text-blue-950'>Loading...</div>
)

export default function Firstt() {
  const svgRef = useRef(null)
  const staticTextRef = useRef(null)
  const outerref = useRef(null)
  const triggerRef = useRef(null)
  const textRef = useRef(null)

  function useArrayRef() {
    const letterRefs = useRef([])
    const setLetterRef = useCallback(node => {
      if (node && !letterRefs.current.includes(node)) {
        letterRefs.current.push(node)
      }
    }, [])
    return [letterRefs, setLetterRef]
  }

  const [letterRef, setLetterRef] = useArrayRef()

  useGSAP(() => {
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: value =>
        value !== undefined ? window.scrollTo(0, value) : window.scrollY,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }),
      pinType: document.body.style.transform ? 'transform' : 'fixed'
    })

    const isMobile = window.innerWidth < 768
    if (textRef.current) {
      textRef.current.setAttribute('y', isMobile ? '50%' : '45%')
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerref.current,
        start: 'top top',
        end: 'bottom+=10% top',
        pin: true,
        scrub: 0.7,
        scroller: document.body
      }
    })

    tl.fromTo(
      svgRef.current,
      { scale: 1, transformOrigin: 'center center' },
      { scale: 50, ease: 'power2.inOut' }
    )
    tl.to(staticTextRef.current, { opacity: 0, duration: 0.5 }, 0)

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 1,
        toggleActions: 'play none none reverse',
        scroller: document.body
      }
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  const [showAuthButtons, setShowAuthButtons] = useState(true)

  // useEffect(() => {
  //   const handleScroll = () => setShowAuthButtons(window.scrollY <= 100)
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  const stats = useMemo(
    () => [
      { to: 350, label: 'Total no. of Clients Served' },
      { to: 50, label: 'Ongoing Projects' },
      { to: 450, label: 'Total no. of Projects' }
    ],
    []
  )

  return (
    <div className='w-full overflow-clip'>
      <Helmet>
        <title>Pisoft Informatics | Custom Software, ERP, and IT Solutions</title>
        <meta
          name="description"
          content="Pisoft Informatics offers custom software, web & mobile app development, ERP solutions, and expert IT services. See how we are loading your business for growth."
        />
        <meta
          name="keywords"
          content="custom software development, ERP services, web development, mobile app development, IT services, business automation, tech solutions, Pisoft Informatics, services, loading, pisoft, software, solutions, erp, informatics, how"
        />
      </Helmet>

      <div
        ref={outerref}
        className='relative min-h-screen w-full flex justify-center overflow-hidden'
      >
        <div className='relative w-full h-screen overflow-hidden'>
          <div className='absolute top-0 left-0 w-full bg-gradient-to-br from-orange-50 via-orange-100 to-sky-100 h-full z-[-1] flex items-center justify-center'>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload='true'
              className='w-full h-[65vh] object-cover md:h-full bg-gradient-to-br from-orange-50 via-orange-100 to-sky-100 md:object-cover'
            >
              <source src='https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2Fp2.mp4?alt=media&token=ef681c2f-bf7a-4f77-8ab3-ae9f1554e20e' type='video/mp4' />
            </video>
            {/* Overlay to dim or fade video */}
            <div className='absolute top-0 left-0 w-full h-full bg-black/5 hidden md:block' />
          </div>

          {/* SVG Mask Text */}
          <svg className='relative w-screen max-w-screen h-full'>
            <defs>
              <linearGradient
                id='gradientFill'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#ffedd5' />
                <stop offset='50%' stopColor='#ffedd5' />
                <stop offset='100%' stopColor='#e0f2fe' />
              </linearGradient>
              <mask id='textmask'>
                <rect width='100vw' height='100%' fill='white' />
                <text
                  ref={textRef}
                  className='font-bebas select-none'
                  x='50%'
                  y='38%'
                  dominantBaseline='middle'
                  textAnchor='middle'
                  fill='black'
                  style={{ fontSize: '30vw' }}
                >
                  PISOFT
                </text>
              </mask>
            </defs>
            <rect
              ref={svgRef}
              width='100vw'
              height='100vh'
              fill='white'
              mask='url(#textmask)'
            />
          </svg>

          <div
            ref={staticTextRef}
            className='absolute bottom-15 left-4 sm:bottom-6 sm:left-6 md:bottom-9 md:left-8 p-2 sm:p-4 text-black z-10 max-w-[90%]'
          >
            <div className='font-in font-bold leading-snug text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4vw] flex flex-wrap'>
              <span className='text-[#F07C22] mr-2'>Engineering</span>
              Excellence in
            </div>
            <div className='font-in font-bold leading-snug text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[3.5vw] flex flex-wrap'>
              Every Line of <span className='ml-1'>Code...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className='w-full max-w-[1900px] px-5 mx-auto pt-16 rounded-t-2xl border-2 border-white'>
        <div className='flex flex-col md:flex-row justify-between gap-6'>
          <div className='w-full md:w-1/2 pl-2 md:pl-6'>
            <div className='font-INB text-[9vw] sm:text-[4vw] md:text-[5.5vw] lg:text-[4vw] text-blue-950 leading-tight'>
              Turning Code into
            </div>
            <div className='font-INB text-[9vw] sm:text-[4vw] md:text-[5.5vw] lg:text-[4vw] text-[#F07C22] leading-tight'>
              Impact.
            </div>
            <div className='mt-6 font-in text-base md:text-xl text-blue-950 text-justify'>
              <h3> Pisoft Informatics is a leading custom software
                development company specializing in product development, legacy
                system modernization, and data-driven eCommerce solutions. We also
                provide expert web and mobile app development, ERP implementation,
                and cloud-based software services. Our team is committed to
                delivering innovative, scalable, and tailored IT solutions to help
                businesses grow efficiently.</h3>
            </div>

            <div className='mt-6'>
              <Suspense fallback={fallbackLoader}>
                <Button />
              </Suspense>
            </div>
          </div>
          <div className='w-full md:w-1/2 mt-10'>
            <Suspense fallback={fallbackLoader}>
              <Hover />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Sticky Navbars */}
      <div className='fixed left-1 -top-2 z-50 lg:hidden'>
        <Navbar />
      </div>
      <div className='fixed top-4 right-4 z-50 lg:hidden'>
        <Example />
      </div>
      {showAuthButtons && (
        <div className='block lg:hidden'>
          <Suspense fallback={fallbackLoader}>
            <AuthFloatingButtons />
          </Suspense>
        </div>
      )}

      <ScrollButtons />

      {/* Desktop Navbar */}
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

        <div className='flex items-center justify-center lg:justify-center xl:justify-center'>
          <Navbar />
          <NavbarDemo />
        </div>
      </div>

      {/* Horizontal Scroll Projects */}
      <section className='mt-12'>
        <Suspense fallback={fallbackLoader}>
          <Horizontal />
        </Suspense>

        <div className='px-4 sm:px-6 md:px-8 mb-6'>
          <div className='flex justify-center mb-4 sm:mb-6'>
            <div className='text-md sm:text-base md:text-xl font-in text-center tracking-normal'>
              A Few of our National and International Project
            </div>
          </div>
          <Suspense fallback={fallbackLoader}>
            <TrueFocus
              sentence='Results Matters'
              manualMode={false}
              blurAmount={2}
              borderColor='#022f66'
              text='orange'
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </Suspense>

          <div className='mx-auto max-w-4xl mt-6 sm:mt-8 md:mt-10'>
            <div className='font-in text-base sm:text-lg md:text-xl text-justify font-normal mt-6 mb-15 sm:mt-8 md:text-center'>
              Discover how our customized software solutions have delivered
              measurable business outcomes for clients across diverse
              industries. Each case study highlights the strategic impact of our
              work, transforming challenges into growth opportunities.
            </div>
          </div>
        </div>
        <section className='px-4 sm:px-6 mt-12 lg:pt-20'>
          <Suspense fallback={fallbackLoader}>
            <ScrollT />
          </Suspense>
        </section>
      </section>

      {/* Marquee */}
      <div className='sm:pt-14 md:pt-1 lg:pt-15 lg:-mt-16'>
        <div className='text-orange-400'>
          <span className='block text-center lg:mt-5 lg:pt-2 xl:mt-15 ml-0 xl:ml-230 text-lg font-medium'>
            Many More...
          </span>
        </div>
        <div className='text-center font-INB pt-8 text-md md:text-2xl text-blue-950'>
          A Few of our Projects
        </div>
        <Suspense fallback={fallbackLoader}>
          <Marquee />
        </Suspense>
      </div>

      {/* Testimonials */}
      <div className='max-w-[2500px] mx-auto px-5 mt-10'>
        <Suspense fallback={fallbackLoader}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.6,
              ease: 'easeOut'
            }}
            className='text-2xl md:text-4xl font-INB text-center lg:text-left text-[#F07C22]'
          >
            A Word From Our Satisfied Clients
          </motion.h2>
        </Suspense>
        <p className='mt-10 font-in text-base sm:text-lg md:text-xl font-normal leading-6 text-black tracking-wider text-justify sm:text-left'>
          <h2>  Hear directly from our partners and clients about how our innovative
            solutions have made a lasting impact. We pride ourselves on building
            strong relationships that go beyond simply delivering projects.</h2>
        </p>

        <Suspense fallback={fallbackLoader}>
          <Testimonial />
        </Suspense>
      </div>

      {/* Latest Insights */}
      <section className='max-w-[2500px] mx-auto overflow-hidden px-10 mt-20'>
        <Suspense fallback={fallbackLoader}>
          <SwipableCardCarousel />
        </Suspense>
      </section>

      {/* FAQs and Accordion */}
      <section className='flex max-w-[2000px] mx-auto flex-col lg:flex-row justify-center items-center'>
        <div className='w-full md:w-1/2 hidden lg:block'>
          <img
            src='/FAQ.webp'
            alt='Illustration showing frequently asked questions'
            width='626'
            height='626'
            className='rounded-lg w-full object-contain'
            loading='lazy'
          />
        </div>
        <div className='w-full lg:w-1/2'>
          <AccordionMenu />
        </div>
      </section>

      {/* Stats / Counters */}
      <div className='flex flex-wrap justify-center gap-16 py-16 text-blue-950'>
        {stats.map(({ to, label }, idx) => (
          <div key={idx} className='flex flex-col items-center'>
            <div>
              <CountUp
                from={0}
                to={to}
                direction='up'
                duration={1}
                className='text-6xl font-extrabold text-[#F07C22]'
              />
              <span className='text-6xl font-extrabold text-[#F07C22]'>+</span>
            </div>
            <p className='mt-4 text-center text-lg sm:text-xl font-medium'>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Suspense fallback={fallbackLoader}>
        <Footer />
      </Suspense>
    </div>
  )
}
