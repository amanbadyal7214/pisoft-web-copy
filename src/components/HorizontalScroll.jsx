import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
const BloomrStyleCards = lazy(() => import('./BloomrStyleCard'))
const BlurText = lazy(() => import('./BlurText'))

const Horizontal = () => {
  return (
    <div className="w-full text-center">
      <div className="flex items-center justify-center mb-6">
        <Suspense fallback={<div />}>
          <BlurText
            text="Your Vision, Our Innovation"
            delay={150}
            animateBy="words"
            direction="top"
            className="font-in text-lg sm:text-lg md:text-2xl font-semibold text-black px-4"
          />
        </Suspense>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <BlurText
            text="Elevate Your Business with"
            delay={100}
            animateBy="words"
            direction="top"
            className="font-INB mb-1 text-xl sm:text-2xl md:text-4xl font-semibold md:tracking-wider text-black px-4"
          />
          <BlurText
            text="Pisoft Informatics's"
            delay={100}
            animateBy="words"
            direction="top"
            className="font-INB text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight md:tracking-wider text-black"
          />
          <BlurText
            text="Dynamic & Innovative Services"
            delay={100}
            animateBy="words"
            direction="top"
            className="font-INB mt-2 text-2xl mb-4 sm:text-3xl md:text-5xl font-semibold text-[#F07C22] tracking-tight md:tracking-wider"
          />
        </Suspense>
        <Suspense fallback={<div />}>
          <HorizontalScrollCarousel />
        </Suspense>
      </div>
    </div>
  )
}

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef })

  const [xRange, setXRange] = useState(['0%', '-78%'])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const updateRange = e => {
      if (e.matches) {
        setXRange(['0%', '-71%'])
      } else {
        setXRange(['0%', '-78%'])
      }
    }

    updateRange(mediaQuery) // Initial check
    mediaQuery.addListener(updateRange) // Listen for screen changes

    return () => mediaQuery.removeListener(updateRange)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], xRange)

  return (
    <div
      ref={targetRef}
      style={{
        backgroundImage: `url('/services9.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='relative mb-8 sm:mb-12 md:mb-16 h-[140vh] sm:h-[170vh] md:h-[180vh] w-full'
    >
      <div className='sticky top-0 flex h-screen items-center overflow-hidden w-full'>
        <motion.div
          style={{ x }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className='flex gap-4 sm:gap-2 md:gap-8 lg:gap-12 px-4'
        >
          {cards.map(card => (
            <div
              key={card.id}
              className='
                min-w-[70vw] 
                sm:min-w-[70vw] 
                md:min-w-[65vw] 
                lg:min-w-[50vw] 
                xl:min-w-[45vw] 
                mr-1 ml-1
                md:mr-2 lg:mr-3 lg:ml-4
                max-h-[92vh] overflow-y-auto
                text-center'
            >
              <Suspense fallback={<div />}>
                {' '}
                <BloomrStyleCards {...card} />
              </Suspense>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Horizontal

const cards = [
  {
    id: 1,
    subtitle: 'ERP Solutions',
    title: 'Make your website a sales engine.',
    description:
      'We deliver scalable, low-cost ERP solutions for industries such as Education, Real Estate, Automotive, and Transportation. Our platforms centralize operations, automate workflows, and improve decision-making through real-time data and advanced analytics.',
    videosrc: 'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2Ferp3.webp?alt=media&token=fa64d965-71c6-4d09-b41c-44c1b3b7dd04',
    url: 'https://st2.depositphotos.com/1388768/47560/i/450/depositphotos_475602666-stock-photo-business-technology-internet-network-concept.jpg',
    bgClass: 'white border-white border-1'
  },
  {
    id: 2,
    subtitle: 'Software Development',
    title: 'Deliver Exceptional Digital Experiences',
    description:
      'We offer end-to-end custom software development—from business analysis and system architecture to full-stack development and ongoing support. Our team builds secure, high-performance applications tailored to your business goals.',
    videosrc: 'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2Fsoftvid.webp?alt=media&token=69e4c718-d5a9-400e-b2b7-41f75d40ca5f',
    url: 'https://www.devprojournal.com/wp-content/uploads/2020/05/software-development-tools.jpg',
    bgClass: 'white border-white border-1'
  },
  {
    id: 3,
    subtitle: 'Web Development',
    title: 'From Concept to Code to Scalable Web Solutions',
    description:
      'We develop responsive, high-performance web applications and websites that deliver exceptional user experiences. Our solutions are built to scale, maintain, and evolve with your business—using the latest frameworks and technologies.',
    videosrc: 'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2Fweb.webp?alt=media&token=7b0e4e23-ea7a-4c3f-b75c-9bcb9ae59bd2',
    url: 'https://d2nzy1qhita6w.cloudfront.net/media/magefan_blog/Web_Development_Technologies_Evolution.jpg',
    bgClass: 'white border-white border-1'
  },
  {
    id: 4,
    subtitle: 'App Development',
    title: 'Build User-Centric Mobile and Web Applications',
    description:
      'We design and develop cross-platform and native mobile applications with a focus on performance, usability, and scalability. From strategy and design to launch and support, we create apps that connect and engage users.',
    videosrc: 'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FMD.webp?alt=media&token=1c95e250-36a5-4bc0-8887-dae95e417d77',
    url: 'https://sundancecollege.com/wp-content/uploads/2024/06/mobile-app-developer-looking-at-multiple-screens.webp',
    bgClass: 'white border-white border-1'
  },
  {
    id: 5,
    subtitle: 'Digital Marketing',
    title: 'Maximize Visibility and Drive Results',
    description:
      'We help brands grow through strategic SEO, paid advertising, content marketing, and data-driven campaigns. Our digital marketing solutions increase your online visibility and generate qualified leads across all digital channels.',
    videosrc: 'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FDM.webp?alt=media&token=4e25759b-7b47-4b1b-9b9a-72ae8ae1ea4d',
    url: 'https://www.intellibright.com/wp-content/uploads/2025/04/Search-Engine-Optimization.jpg',
    bgClass: 'white border-white border-1'
  },
  {
    id: 6,
    subtitle: 'Technical Support',
    title: 'Reliable Support for Seamless Operations',
    description:
      'We provide 24/7 technical support covering networking, cloud infrastructure, cybersecurity, and system maintenance. Our expert team ensures your IT environment runs smoothly, minimizing downtime and maximizing efficiency.',
    videosrc: 'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FTC.webp?alt=media&token=862a7073-d99f-4ed3-8b58-614f464fb5ed',
    url: 'https://staticlearn.shine.com/l/m/images/blog/mobile/technical_support_engineer.webp',
    bgClass: 'white border-white border-1'
  }
]
